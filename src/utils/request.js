/*
 axios实例封装
 （1） 拦截请求：发送request之前在header中添加token字段
 （2） 拦截响应，200返回result、401 token过期，跳转到登录、其余响应错误显示响应的消息提示
 （3） 使用qs插件对post put patch请求参数格式化
 （4） 控制请求时，进度条的显示状态
*/
import Axios from 'axios'
import qs from 'qs'
import { MessageBox, Message } from 'element-ui'

import NProgress from '@/utils/nprogress.js'
import store from '@/store'
import { getToken } from '@/utils/authority.js'

/**
 * Request基本参数
 */
const OPTION = {
  // 得到的是接口基础路径和配置代理的路径
  // url = base url + request url
  baseURL: process.env.NODE_ENV === 'development' ? process.env.VUE_APP_BASE_API : process.env.VUE_APP_BASE_API_URL_REAL,
  // 超时时间
  timeout: 30000,
  // 请求头
  // 请求头信息中不能出现中文
  headers: {
    // 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' // form data格式
    'Content-Type': 'application/json;charset=UTF-8' // json格式
  }
}

/**
 * 未登录提示
 */
function goLogin () {
  MessageBox.alert('您未登录或登录超时，请重新登录', '未登录', {
    confirmButtonText: '去登录',
    type: 'warning'
  }).then(() => {
    store.dispatch('user/logout').then(() => {
      location.reload()
    })
  })
}

/**
 * 参数转换为Form Data格式
 * 使用QS插件
 *
 * @param {Object} data
 * @returns Form Data
 */
function qsStringify (data) {
  data = qs.stringify(data, {
    encode: false
  })
  return data
}

const AXIOS_BASE = Axios.create(OPTION)

// 请求拦截
AXIOS_BASE.interceptors.request.use(
  (config) => {
    // 在发送请求头之间添加token
    if (getToken()) {
      config.headers[process.env.VUE_APP_HEADERS_TOKEN] = 'Bearer ' + getToken()
    }
    return config
  },
  (error) => {
    Promise.reject(error) // 对请求错误处理
  }
)

// 响应拦截
AXIOS_BASE.interceptors.response.use(
  // 对响应数据处理
  (response) => {
    const res = response.data
    if ([200, '200'].includes(res.code)) {
      // 接口状态为0，成功
      console.log('200')
      return res
    } else if ([401, '401'].includes(res.code)) {
      goLogin()
    } else {
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })
    }
    return Promise.reject(new Error(res.message || 'Error'))
  },
  (error) => {
    // 对响应错误处理
    if (error.message.includes('timeout')) {
      error.message = '请求超时'
    }

    if (error && error.response) {
      /* eslint-disable */
        switch (error.response.status) {
          case 400:
            error.message = '请求错误';
            break;
          case 401:
            error.message = '未登录或登录超时，请重新登录';
            break;
          case 403:
            error.message = '拒绝访问';
            break;
          case 404:
            error.message = `请求地址出错：${error.response.config.url}`;
            break;
          case 408:
            error.message = '请求超时';
            break;
          case 413:
            error.message = '解析失败';
            break;
          case 500:
            error.message = '服务器内部错误';
            break;
          case 501:
            error.message = '服务未实现';
            break;
          case 502:
            error.message = '网关错误';
            break;
          case 503:
            error.message = '服务不可用';
            break;
          case 504:
            error.message = '网关超时';
            break;
          case 505:
            error.message = 'HTTP版本不受支持';
            break;
          default:
            error.message = '请求错误';
        }
        /* eslint-enable */
    }

    if (process.env.NODE_ENV === 'development') {
        console.error(`错误信息：${error.message}`); // eslint-disable-line
    }

    if (error.response.status === 401) {
      goLogin()
    } else {
      Message({
        message: error.message,
        type: 'error',
        duration: 5 * 1000
      })
    }
    return Promise.reject(error)
  }
)

/**
 * 对POST、PUT请求，参数格式化
 * @param {Object} data：需要格式化的对象
 * @param {*} dataType：form | json
 * @returns
 */
function formatParams (data, dataType) {
  // dataType 优先级最高
  if (dataType === 'form') {
    data = qsStringify(data)
    return data
  } else if (dataType === 'json') {
    return data
  }

  // axios全局配置 优先级次之
  if (
    OPTION &&
    OPTION.headers &&
    OPTION.headers['Content-Type'] &&
    OPTION.headers['Content-Type'].includes(
      'application/x-www-form-urlencoded'
    )
  ) {
    data = qsStringify(data)
  }
  return data
}

/**
 * axios请求
 * @param {Object} object：options
 * @returns {Promise} Promise
 */

export default async function ({
  baseURL = null,
  url,
  method = 'get',
  data = {},
  dataType = '',
  headers = {},
  loading = false
}) {
  loading === true && NProgress.start()
  method = method.toLowerCase() // 请求方法
  let params = {} // 与请求一起发送的 URL 参数

  // Content-Type
  const contentType = headers['Content-Type'] || headers['content-type'] || headers['Content-type'] || headers['content-Type'] || null
  if (contentType) {
    if (contentType.includes('application/x-www-form-urlencoded')) {
      dataType = 'form'
    } else if (contentType.includes('application/json')) {
      dataType = 'json'
    } else if (contentType.includes('multipart/form-data')) {
      dataType = 'file'
    }
  }

  // 设置请求头的编码类型
  if (dataType === 'form') {
    headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
  } else if (dataType === 'json') {
    headers['Content-Type'] = 'application/json;charset=UTF-8'
  } else if (dataType === 'file') {
    headers['Content-Type'] = 'multipart/form-data'
  }

  // 请求参数
  if (['get', 'delete'].includes(method)) {
    params = data
    data = {}
  } else if (['post', 'put', 'patch'].includes(method)) {
    data = formatParams(data, dataType)
  } else {
    console.error(`${url}接口请求方法错误：${method}`); // eslint-disable-line
    return
  }

  // request 参数
  const option = {
    url,
    method,
    params,
    data,
    headers
  }

  // baseURL
  baseURL && (option.baseURL = baseURL)

  return new Promise((resolve, reject) => {
    AXIOS_BASE.request(option)
      .then(
        (response) => {
          loading === true && NProgress.done()
          console.log(response)
          resolve(response)
        },
        (error) => {
          loading === true && NProgress.done()
          console.log(error)
          reject(error)
        }
      )
      .catch((error) => {
        loading === true && NProgress.done()
        console.log(error)
        reject(error)
      })
  })
}
