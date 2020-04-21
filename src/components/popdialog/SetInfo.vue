<template>
  <div class="personal-info">
    <h2>个人信息</h2>
    <p class="minisize-p">姓名、学号、手机号将会显示在班级通讯录</p>
    <p class="user-id minisize-p">ID:{{id}}</p>
    <div class="avatar-wrap">
      <el-upload
        class="avatar-uploader"
        :action="avatar_dir"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
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
    </div>
  </div>
</template>

<script>
import { avatarUpload, baseDir } from '@/api/user.js'
export default {
  data () {
    return {
      // avatar_url: this.$store.state.user.userAvatar,
      id: this.$store.state.user.userId,
      avatar_dir: baseDir.url
    }
  },
  methods: {
    handleAvatarSuccess (res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
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
        console.log(file)
        console.log(fd)

        // post上传图片
        const _this = this
        new Promise(function (resolve, reject) {
          avatarUpload(fd)
            .then(response => {
              console.log(response.data)
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
      return false// 阻止自动上传
    }
  }
}
</script>

<style lang="scss" scoped>
.personal-info {
  text-align: center;
  h2 {
    margin-top: 0;
  }
  .user-id {
    font-weight: bold;
  }

  .minisize-p {
    margin: 0;
    font-size: 12px;
    padding: 4px 0;
  }
  .avatar-wrap {
    img {
      width: 60px;
      height: 60px;
    }
  }
}
</style>
