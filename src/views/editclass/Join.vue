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
export default {
  data () {
    return {
      joinLoading: false,
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
  methods: {
    sendJoinInfo () {
      this.$refs.joinform.validate(valid => {
        if (valid) {

        } else {

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
    text-align:center;
    padding:80px 0 200px 0;
    .join-form {
      width:30%;
      margin:0 auto;
      padding:50px 60px;
    }
    .tip{
      padding:0 0 10px 0;
    }
    .btn-wrap{
      text-align:right;
    }
  }
}
</style>
