import SocketIO from 'socket.io-client'

export default {
  namespaced: true,
  state: {
    socket: null,
    mesList: [],
    onlineCount: 0
  },
  mutations: {
    INIT_SOCKET: (state, socket) => {
      state.socket = socket
    },
    CLOSE_SOCKET: (state, socket) => {
      state.socket.close()
      state.socket = null
      state.mesList = []
    }
  },
  actions: {
    initSocket ({ commit, state }) {
      return new Promise((resolve, reject) => {
        var create = SocketIO(process.env.VUE_APP_BASE_SOCKET_URL)
        // console.log(create)
        if (create) {
          commit('INIT_SOCKET', create)
          resolve()
        } else {
          reject(new Error('连接失败'))
        }
      })
    },
    closeSocket ({ commit, state }) {
      return new Promise((resolve, reject) => {
        commit('CLOSE_SOCKET')
        resolve()
      })
    },
    connectSocket ({ commit, state }, userInfo) {
      return new Promise((resolve, reject) => {
        state.socket.emit('login', userInfo)

        // 登录之后执行监听
        state.socket.on('loginSucess', (data) => {
          state.mesList.push(data.user)
          state.onlineCount = data.onlineCount
        })

        // 当有消息时
        state.socket.on('newMessage', (data) => {
          console.log(data)
          state.mesList.push(data) // 发送消息成功后，服务端向所有用户发送该消息
        })
        // 当有用户退出登录时
        state.socket.on('logout', (data) => {
          state.mesList.push(data.user)
          state.onlineCount = data.onlineCount
        })
        resolve()
      })
    },
    sendMessage ({ commit, state }, mesInfo) {
      return new Promise((resolve, reject) => {
        state.socket.emit('message', mesInfo)
        resolve(mesInfo)
      })
    }
  }
}
