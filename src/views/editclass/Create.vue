<template>
  <div class="content-box">
    <div class="create-wrap">
      <h3>创建班级</h3>
      <el-form
        label-width="80px"
        :model="createForm"
        :rules="rules"
        ref="createform"
        class="create-form border-radius"
      >
        <el-form-item
          label="班级昵称"
          prop="name"
        >
          <el-input v-model="createForm.name" placeholder="字母、中文或数字"></el-input>
        </el-form-item>
        <el-form-item
          label="验证码"
          prop="pass"
        >
          <el-input v-model.number="createForm.pass" placeholder="6~8位数字"></el-input>
        </el-form-item>
        <p class="tip minisize-p">*用户加入班级时需填该验证码</p>
        <el-form-item
          label="班级简介"
          prop="brief"
        >
          <el-input
            type="textarea"
            v-model="createForm.brief"
            placeholder="200个字符以内的介绍噢~"
            :rows="3"
          ></el-input>
        </el-form-item>
        <el-form-item class="btn-wrap">
          <el-button
            plain
            type="primary"
            :loading="createLoading"
            @click.native.prevent="sendCreateInfo"
          >提交</el-button>
          <el-button
            plain
            type="primary"
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
    var validateName = (rule, value, callback) => {
      var reg = new RegExp('^[\u4E00-\u9FA5A-Za-z0-9]+$')
      if (value === '') {
        callback(new Error('请输入班级名称'))
      } else {
        if (!reg.test(value)) {
          callback(new Error('请输入字母、中文或数字'))
        } else {
          callback()
        }
      }
    }
    return {
      createLoading: false,
      createForm: {
        name: '',
        pass: '',
        brief: ''
      },
      rules: {
        name: [{ required: true, trigger: 'blur', validator: validateName }],
        pass: [
          { required: true, message: '请输入班级验证码', trigger: 'blur' },
          { min: 6, max: 8, message: '长度在 6 到 8 个字符', trigger: 'blur' },
          { type: 'number', message: '验证码必须为数字值' }
        ],
        brief: [
          { required: true, message: '请输入200字内的简介', trigger: 'blur' },
          { min: 1, max: 200, message: '长度在 1 到 200 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    sendCreateInfo () {
      this.$refs.createform.validate(valid => {
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
  .create-wrap {
    border: 1px solid #ccc;
    text-align: center;
    padding: 60px 0 150px 0;
    .create-form {
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
