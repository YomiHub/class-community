<template>
  <div class="apply-box text-center">
    <h2>申请权限</h2>
    <p class="minisize-p">成为管理员可以管理公告、风采、相册以及班级成员</p>
    <div class="info" v-if="alreadyApply">已经提交申请~</div>
    <div class="apply" v-else>
      <p>申请“ <span>{{class_name}}</span> ”管理权限</p>
      <p>申请人“ <span>{{$store.state.user.userName}}</span> ”</p>
      <div class="tip">*提示：申请人为个人信息中设置的姓名，将会在权限审核中显示</div>
      <el-button type="primary" class="btn" @click="sendApply">
        提交申请
      </el-button>
    </div>
  </div>
</template>

<script>
import { getApplyStatus, sendApply } from '@/api/user.js'
export default {
  name: 'PowerApply',
  data () {
    return {
      alreadyApply: true
    }
  },
  created () {
    this.getApplyStatus()
  },
  methods: {
    getApplyStatus () {
      getApplyStatus({ user_id: this.$store.state.user.userId, class_id: this.class_id }).then(result => {
        if (result.status === 0) {
          if (result.data.length > 0) {
            this.alreadyApply = true
          } else {
            this.alreadyApply = false
          }
          // if (result.data[0].power === 2) { console.log('已经是管理员') }
        } else {
          this.$message('网络请求出错')
        }
      }
      )
    },
    sendApply () {
      sendApply({ user_id: this.$store.state.user.userId, class_id: this.class_id }).then(result => {
        if (result.status === 0) {
          this.alreadyApply = true
        } else {
          this.$message('网络请求出错')
        }
      })
    }
  },
  components: {},
  props: ['class_id', 'class_name']
}
</script>

<style lang="scss" scoped>
.apply-box{
  h2{
    margin-top:0
  }
  .apply{

    p{
      padding:10px;
      color:#000;
    }
    span{
      text-decoration: underline;
      font-weight: bold;
      font-size:16px;
      padding:0 4px;
    }
    .tip{
      color:#ff0000;
      font-size:13px;
    }
    .btn{
      margin-top:10px;
    }
  }
  .info{
    color:#ff0000;
    padding:10px;
  }
}
</style>
