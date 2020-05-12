<template>
  <div class="content-box">
    <div class="join-wrap">
      <h3>加入班级</h3>
      <el-form
        label-width="70px"
        :model="joinForm"
        :rules="rules"
        ref="joinform"
        class="join-form border-radius"
      >
        <el-form-item
          label="班级ID"
          prop="class_id"
        >
          <el-input v-model="joinForm.class_id"></el-input>
        </el-form-item>
        <el-form-item
          label="验证码"
          prop="class_pass"
        >
          <el-input v-model="joinForm.class_pass"></el-input>
        </el-form-item>
        <p class="tip minisize-p">*联系班级管理员获得验证码</p>
        <el-form-item label="身份选择">
          <el-radio
            v-model="identity"
            :label="1"
          >学生</el-radio>
          <el-radio
            v-model="identity"
            :label="2"
          >教师</el-radio>
          <el-radio
            v-model="identity"
            :label="0"
          >家长</el-radio>
        </el-form-item>
        <el-form-item class="btn-wrap">
          <el-button
            plain
            type="primary"
            :loading="joinLoading"
            @click.native.prevent="sendJoinInfo"
          >提交</el-button>
          <el-button
            plain
            type="primary"
            :loading="joinLoading"
            @click.native.prevent="back"
          >取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { joinClass } from '@/api/organize.js'
export default {
  data () {
    return {
      joinLoading: false,
      identity: 1,
      joinForm: {
        class_id: '',
        class_pass: ''
      },
      rules: {
        class_id: [
          { required: true, message: '请输入想要加入的班级ID', trigger: 'blur' }
        ],
        class_pass: [
          { required: true, message: '请输入班级验证码', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    if (this.$store.state.user.ifJoin) {
      // 已经创建过班级
      this.$message('已经加入过班级，不可再次加入')
      this.$router.replace('/index')
    }
  },
  methods: {
    sendJoinInfo () {
      this.$refs.joinform.validate(valid => {
        if (valid) {
          this.joinLoading = true
          const joinInfo = {
            user_id: this.$store.state.user.userId,
            class_id: this.joinForm.class_id,
            class_pass: this.joinForm.class_pass,
            identity: this.identity
          }
          joinClass(joinInfo)
            .then(result => {
              if (result.status === 0) {
                this.$message('加入成功')
                this.$store
                  .dispatch('user/getClassRelation')
                  .then(() => { this.$router.replace('/index') })
                  .catch(error => {
                    this.$message('班级信息获取失败~')
                    console.log(error)
                  })
              } else {
                this.$message(result.message)
              }
              this.joinLoading = false
            })
            .catch(err => {
              console.log(err)
              this.joinLoading = false
            })
        } else {
          this.$message('请填入有效信息！')
        }
      })
    },
    back () {
      this.$router.replace('/index')
    }
  }
}
</script>
<style lang="scss" scoped>
.content-box {
  padding: 10px 0;
  .join-wrap {
    border: 1px solid #ccc;
    text-align: center;
    padding: 80px 0 200px 0;
    .join-form {
      width: 30%;
      margin: 0 auto;
      padding: 50px 60px;
    }
    .tip {
      padding: 0 0 10px 0;
    }
    .btn-wrap {
      text-align: right;
    }
  }
}
</style>
