import { login } from '@/api/user.js'
import { getToken, setToken, removeToken, getUserName, getUserId, getUserAvater, setUser, removeUser } from '@/utils/authority.js'
import { resetRouter } from '@/router'

export default {
  namespaced: true,
  state: {
    token: getToken(),
    userName: getUserName(),
    userId: getUserId(),
    userAvater: getUserAvater()
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_USERNAME: (state, name) => {
      state.userName = name
    },
    SET_USERID: (state, id) => {
      state.userId = id
    },
    SET_USERAVATER: (state, avater) => {
      state.userAvater = avater
    },
    LOGOUT: (state) => {
      state.token = ''
      state.userName = ''
      state.userId = ''
      state.userAvater = ''

      removeToken()
      removeUser()
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
          commit('SET_USERAVATER', data.data.avatar_url)
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
      // 请求 logout 接口
      return new Promise((resolve, reject) => {
        commit('LOGOUT')
        resetRouter()
        resolve()
      })
    }
  }
}
