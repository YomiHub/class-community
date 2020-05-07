<template>
  <div class="content-box">
    <el-row
      type="flex"
      class="main-container"
      justify="space-between"
    >
      <el-col :span="18">
        <div class="grid-content bg-purple activity-list">
          <div class="list-wrap border-radius">
            <router-view></router-view>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple-light router-wrap">
          <div class="nav-wrap">
            <router-card
              :ismanagement="true"
              v-if="$store.state.user.ifCreate"
              :name="$store.state.user.create_calssname"
              :id="$store.state.user.create_calss"
              :power="3"
            ></router-card>
            <router-card
              :ismanagement="false"
              v-if="$store.state.user.ifJoin"
              :name="$store.state.user.join_calssname"
              :id="$store.state.user.join_calss"
              :power="$store.state.user.join_power"
            ></router-card>
            <hot-content></hot-content>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-button
      type="primary"
      icon="el-icon-message"
      circle
      class="comin-btn"
      @click="showRoom"
    ></el-button>
    <el-dialog
      :title="'聊天室('+$store.state.socket.onlineCount+'人在线)'"
      :visible.sync="ifRoomShow"
      :before-close="handleClose"
    >
      <chat-room
        v-if="ifRoomShow"
        @closeRoom="closeRoom"
      >
      </chat-room>
    </el-dialog>

  </div>
</template>
<script>
import RouterCard from '@/components/RouterCard.vue'
import HotContent from '@/components/HotContent.vue'
import Communication from '@/components/popdialog/Communication.vue'

export default {
  data () {
    return {
      ifRoomShow: false
    }
  },
  methods: {
    showRoom () {
      this.ifRoomShow = true
    },
    closeRoom () {
      this.ifRoomShow = false
    },
    handleClose (done) {
      // 点击关闭按钮获遮罩时触发
      this.$store.dispatch('socket/closeSocket') // 关闭SocketIO
      done()
    }
  },
  components: {
    'router-card': RouterCard,
    'hot-content': HotContent,
    'chat-room': Communication
  }
}
</script>
<style lang="scss" scoped>
.main-container {
  padding: 16px 0px;
  .activity-list {
    padding: 0 10px;
    .list-wrap {
      padding: 10px 6px;
      min-height: 500px;
    }
  }
}
</style>

<style lang="scss">
.comin-btn {
  position: fixed;
  top: 50%;
  right: 10px;
}

  .el-dialog {
    background: #fafafa;
  }

</style>
