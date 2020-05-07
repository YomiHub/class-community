<template>
  <div class="chat-room">
    <ul class="chat-list">
      <li
        v-for="(item,index) in $store.state.socket.mesList"
        :key="index"
      >
        <template v-if="item.type===-1">
          <p class="minisize-p">{{item.user_name}}离开了聊天室</p>
        </template>
        <template v-else-if="item.type===0">
          <p class="minisize-p">{{item.user_name}}加入了聊天室</p>
        </template>
        <template v-else>
          <el-row :class="{'flex-end':$store.state.user.userId==item.userid,'mes-item':true}">
            <div class="avatar">
              <el-avatar
                :size="30"
                :src="item.avatar_url"
              ></el-avatar>
            </div>
            <div class="mes-content">
              <el-row
                tag="span"
                class="mes-meta"
              >{{item.user_name}}</el-row>
              <el-row
                tag="span"
                class="mes-time"
              >{{item.send_time | dateFormat('yyyy-MM-dd hh:mm')}}</el-row>
              <el-row
                tag="div"
                :class="{'author':$store.state.user.userId==item.userid}"
              >{{item.message}}</el-row>
            </div>
          </el-row>
        </template>
      </li>
    </ul>
    <div class="send-wrap">
      <el-row>

          <el-input
            placeholder="请输入内容"
            v-model="message"
          >
            <i
              slot="suffix"
              class="el-input__icon el-icon-s-promotion send-mes"
              @click="sendMessage"
            ></i>
          </el-input>

      </el-row>
    </div>
  </div>
</template>

<script>
import { dateFormat } from '@/utils/filter.js'
export default {
  name: 'Communication',
  data () {
    return {
      socket: null,
      user_id: this.$store.state.user.userId,
      name: this.$store.state.user.userName,
      avatar: this.$store.state.user.userAvatar,
      message: ''
    }
  },
  created () {
    this.$store.dispatch('socket/initSocket').then(res => {
      // 创建socket连接，发送新增用户信息type=0
      var userInfo = { userid: this.user_id, user_name: this.name }
      this.$store.dispatch('socket/connectSocket', userInfo).then(data => {
        // data 为新加入用户的信息
        this.$message(userInfo.user_name + '已进入聊天室')
      })
    }, err => {
      this.$message(err)
    }) // 创建SocketIO
  },
  /* sockets: {
    // vue-socket.io中自带的几个事件connect、disconnect、reconnect
      connect: function () { // 这里是监听connect事件
        console.log('connect~~~~')
      },
      disconnect: function () {
        console.log('socket连接断开')
      },
      reconnect: function (data) {
        console.log('重连')
      }
    }
  }, */
  methods: {
    sendMessage () {
      if (this.message.length === 0) {
        this.$message('不能发送空消息~')
        return
      }
      var mesInfo = { type: 1, userid: this.user_id, user_name: this.name, avatar_url: this.avatar, send_time: new Date().toUTCString(), message: this.message }
      // 推送消息给后台
      this.$store.dispatch('socket/sendMessage', mesInfo).then(res => {
        this.message = ''
      })
    }
  },
  components: {},
  filters: {
    dateFormat: dateFormat // dataFormat('yyyy-MM-dd hh:mm:ss')
  }
}
</script>

<style scoped lang="scss">
.chat-room {
  padding: 0 20px;
  .chat-list {
    height:300px;
    position: relative;
    overflow: auto;
  }
  p {
    color: #ccc;
    text-align: center;
  }
  .flex-end {
    flex-direction: row-reverse;
    .mes-content {
      text-align: right;
    }
  }
  .mes-item {
    display: flex;
    .avatar {
      padding: 10px;
    }
    .mes-time {
      font-size: 12px;
      color: #ccc;
    }
    .mes-content {
      div {
        background: #fff;
        padding: 4px;
        border-radius: 4px;
        margin-bottom:10px;
      }
      .author {
        background: #00ff80;
      }
    }
  }
  .send-wrap{
    margin-top:10px;
    .send-mes{
      font-size:24px;
      color:#00ff80;
      cursor: pointer;
    }
  }
}
</style>
