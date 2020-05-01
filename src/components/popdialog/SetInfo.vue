<template>
  <div class="personal-info text-center">
    <h2>个人信息</h2>
    <p class="minisize-p">姓名、学号、手机号将会显示在班级通讯录</p>
    <p class="user-id minisize-p">ID:{{id}}</p>
    <div class="avatar-wrap">
      <el-upload
        class="avatar-uploader"
        :action="avatar_dir"
        :show-file-list="false"
        :before-upload="beforeAvatarUpload"
        name="avatar"
      >
        <img
          v-if="$store.state.user.userAvatar"
          :src="$store.state.user.userAvatar"
          class="avatar"
        >
        <i
          v-else
          class="el-icon-plus avatar-uploader-icon"
        ></i>
      </el-upload>
      <p class="minisize-p">点击头像设置</p>
      <el-form
        label-width="70px"
        :model="userForm"
        :rules="rules"
        ref="infoform"
        class="popinform-wrap"
      >
        <el-form-item
          label="姓名"
          prop="user_name"
        >
          <el-input v-model="userForm.user_name"></el-input>
        </el-form-item>
        <el-form-item
          label="学号"
          prop="user_num"
        >
          <el-input v-model="userForm.user_num"></el-input>
        </el-form-item>
        <el-form-item
          label="手机号"
          prop="user_phone"
        >
          <el-input v-model="userForm.user_phone"></el-input>
        </el-form-item>
        <el-button
          type="primary"
          plain
          :loading="setInfoLoading"
          @click.native.prevent="setUserInfo"
        >提交信息</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
import {
  avatarUpload,
  baseDir,
  updateUserInfo,
  getUserInfo
} from '@/api/user.js'
export default {
  data () {
    return {
      // avatar_url: this.$store.state.user.userAvatar,
      id: this.$store.state.user.userId,
      avatar_dir: baseDir.url,
      userForm: {
        user_name: '',
        user_num: '',
        user_phone: ''
      },
      setInfoLoading: false,
      rules: {
        // 在el-form-item用prop属性指明规则
        user_name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        user_num: [
          { required: true, message: '请输入学工号', trigger: 'blur' },
          {
            min: 12,
            max: 20,
            message: '长度在 12 到 20 个字符',
            trigger: 'blur'
          }
        ],
        user_phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          {
            min: 7,
            max: 15,
            message: '长度在 7 到 15 个字符',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  created () {
    // 请求个人信息
    this.getUserInfo()
  },
  methods: {
    beforeAvatarUpload (file) {
      // const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      // if (!isJPG) {
      //   this.$message.error('上传头像图片只能是 JPG 格式!')
      // }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      // 校验成功上传文件
      if (isLt2M) {
        // 创建临时的路径来展示图片
        // var windowURL = window.URL || window.webkitURL
        // this.avatar_url = windowURL.createObjectURL(file)

        // 将文件转化为formdata数据上传
        const fd = new FormData()
        fd.append('file', file)
        fd.append('user_id', this.id)
        // console.log(file)
        // console.log(fd)

        // post上传图片
        const _this = this
        new Promise(function (resolve, reject) {
          avatarUpload(fd)
            .then(response => {
              // console.log(response.data)
              resolve(response.data)
            })
            // eslint-disable-next-line handle-callback-err
            .catch(error => {
              _this.$message.error('头像上传失败，请重新上传!')
            })
        }).then(function (result) {
          _this.$store.commit('user/SET_USERAVATAR', result.avatar_url) // 将最新的头像更新到store、cookie
          // console.log('store' + _this.$store.state.user.userAvatar)
          // console.log('vue avatar_url' + _this.avatar_url)
        })
      }
      return false // 阻止自动上传
    },
    getUserInfo () {
      getUserInfo(this.id).then(data => {
        if (data.status === 0) {
          this.userForm.user_name = data.data.user_name
          this.userForm.user_num = data.data.user_num
          this.userForm.user_phone = data.data.user_phone
        } else {
          this.$message('网络请求错误！')
        }
      })
    },
    setUserInfo () {
      this.$refs.infoform.validate(valid => {
        if (valid) {
          this.setinfoLoading = true
          this.userForm.id = this.id
          updateUserInfo(this.userForm)
            .then(data => {
              if (data.status === 0) {
                this.$emit('setInfoClose')
                this.$store.commit('user/SET_USERNAME', this.userForm.user_name) // 将最新的头像更新到store、cookie
                this.$message('信息设置成功~')
              } else {
                this.$message(data.message)
              }
              this.setinfoLoading = false
            })
            .catch(error => {
              console.log(error)
              this.setinfoLoading = false
            })
        } else {
          this.$message('提交信息有误！')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.personal-info {
  h2 {
    margin-top: 0;
  }
  .user-id {
    font-weight: bold;
  }

  .avatar-wrap {
    img {
      width: 60px;
      height: 60px;
    }
  }
}
</style>
