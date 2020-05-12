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
        <el-upload
          class="avatar-uploader logo-wrap"
          :action="logoDir"
          :show-file-list="false"
          :before-upload="beforeLogoUpload"
          name="logo"
        >
          <img
            v-if="logo_url"
            :src="logo_url"
            class="avatar"
          >
          <i
            v-else
            class="el-icon-plus avatar-uploader-icon"
          ></i>
        </el-upload>
        <el-form-item
          label="班级昵称"
          prop="name"
        >
          <el-input
            v-model="createForm.name"
            placeholder="字母、中文或数字"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="验证码"
          prop="pass"
        >
          <el-input
            v-model.number="createForm.pass"
            placeholder="1~8位"
            maxlength="8"
          ></el-input>
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
import { logoUpload, createClass, logoDir } from '@/api/organize.js'
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
      logoDir: logoDir.url,
      createLoading: false,
      logo_url: '',
      createForm: {
        name: '',
        pass: '',
        brief: ''
      },
      rules: {
        name: [{ required: true, trigger: 'blur', validator: validateName }],
        pass: [
          { required: true, message: '请输入班级验证码', trigger: 'blur' }
        ],
        brief: [
          { required: true, message: '请输入200字内的简介', trigger: 'blur' },
          {
            min: 1,
            max: 200,
            message: '长度在 1 到 200 个字符',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  created () {
    if (this.$store.state.user.ifCreate) {
      // 已经创建过班级
      this.$message('已经创建过班级，不可重复创建')
      this.$router.replace('/index')
    }
  },
  methods: {
    beforeLogoUpload (file) {
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      // 校验文件
      if (isLt2M) {
        // 创建临时的路径来展示图片
        // var windowURL = window.URL || window.webkitURL
        // this.avatar_url = windowURL.createObjectURL(file)

        // 将文件转化为formdata数据上传
        const fd = new FormData()
        fd.append('file', file)

        // post上传图片
        logoUpload(fd)
          .then(res => {
            if (res.status === 0) {
              this.logo_url = res.logo_url
              this.$message('头像上传成功')
            }
          })
          // eslint-disable-next-line handle-callback-err
          .catch(error => {
            console.log('头像上传失败，请重新上传!')
          })
      }
      return false // 阻止自动上传
    },
    sendCreateInfo () {
      this.$refs.createform.validate(valid => {
        if (valid && this.logo_url.length !== 0) {
          this.createForm.user_id = this.$store.state.user.userId
          this.createForm.logo_url = this.logo_url
          createClass(this.createForm)
            .then(result => {
              console.log(result)
              if (result.status === 0) {
                this.$message('创建成功')
                this.$store
                  .dispatch('user/getClassRelation')
                  .then(() => {
                    this.$router.replace('/index')
                  })
                  .catch(error => {
                    this.$message('班级信息获取失败~')
                    console.log(error)
                  })
              } else {
                this.$message(result.message)
              }
            })
            .catch(error => {
              console.log(error)
            })
        } else {
          this.$message('请填写有效信息！')
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
      .logo-wrap {
        margin-bottom: 20px;
        font-size: 30px;

        img,
        i {
          width: 60px;
          height: 60px;
          line-height: 60px;
          text-align: center;
          border: 1px solid #ccc;
        }
      }
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
