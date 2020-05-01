import { login, getClassRelation } from '@/api/user.js'
import { getToken, setToken, removeToken, getUserName, getUserId, getUserAvatar, setAvatar, setUserName, setUser, removeUser } from '@/utils/authority.js'
import { resetRouter } from '@/router'

export default {
  namespaced: true,
  state: {
    token: getToken(),
    userName: getUserName(),
    userId: getUserId(),
    userAvatar: getUserAvatar(),
    ifCreate: false,
    ifJoin: false,
    create_calss: '',
    create_calssname: '',
    join_calss: '',
    join_calssname: '',
    join_power: 1, // 加入班级的权限，默认为普通成员
    search_key: ''
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_USERNAME: (state, name) => {
      state.userName = name
      setUserName(name)
    },
    SET_USERID: (state, id) => {
      state.userId = id
    },
    SET_USERAVATAR: (state, avatar) => {
      state.userAvatar = avatar
      setAvatar(avatar)
    },
    LOGOUT: (state) => {
      state.token = ''
      state.userName = ''
      state.userId = ''
      state.userAvatar = ''

      removeToken()
      removeUser()
    },
    SET_CLASSINFO: (state, classInfo) => {
      state.ifCreate = classInfo.ifCreate
      state.ifJoin = classInfo.ifJoin
      state.create_calss = classInfo.create_class
      state.create_calssname = classInfo.create_classname
      state.join_calss = classInfo.join_class
      state.join_calssname = classInfo.join_classname
      state.join_power = classInfo.join_power
    },
    SET_SEARCHKEY: (state, key) => {
      state.search_key = key
    }
  },
  actions: {
    login ({ commit }, userInfo) {
      // 登录接口，缓存token以及用户信息
      return new Promise((resolve, reject) => {
        login(userInfo).then(data => {
          // 登录成功
          commit('SET_TOKEN', data.token)
          commit('SET_USERNAME', data.data.user_name)
          commit('SET_USERID', data.data.id)
          commit('SET_USERAVATAR', data.data.avatar_url)
          setToken(data.token)
          setUser(data.data.user_name, data.data.id, data.data.avatar_url)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 退出
    logout ({ commit, state }) {
      return new Promise((resolve, reject) => {
        commit('LOGOUT')
        resetRouter()
        resolve()
      })
    },
    // 获取创建、加入的班级
    getClassRelation ({ commit, state }) {
      // 请求 getClassRelation 接口
      return new Promise((resolve, reject) => {
        getClassRelation({ id: state.userId }).then(data => {
          commit('SET_CLASSINFO', data.data)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}
