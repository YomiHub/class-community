<template>
  <div class="album-list-wrap">
    <div
      class="album-img-list"
      scroll-container
    >
      <p class="tip" v-if="photo_list.length===0">暂时没有图片~</p>
      <ul v-else>
        <el-col
          :span="6"
          tag="li"
          v-for="(item,index) in photo_list"
          :key="item.id"
        >
          <a
            :href="item.photo_url"
            target="_blank"
          >
            <el-image
              :src="item.photo_url"
              fit="cover"
              :lazy="ifLazy"
            >
            </el-image>
          </a>
          <span class="del-btn" v-if="haspower" @click="delPhoto(item.id,index)">
            <i class="el-icon-delete"></i>
          </span>
        </el-col>
      </ul>

      <el-col
          :span="6"
          tag="div"
          class="upload-img"
          v-if="haspower&&hasalbum">
        <el-upload
          list-type="picture-card"
          :action="photoDir"
          :show-file-list="false"
          :before-upload="beforeLogoUpload"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-col>

    </div>
  </div>
</template>

<script>
import { photoUpload, getPhoto, photoDir, delPhoto } from '@/api/organize.js'
export default {
  data () {
    return {
      photoDir: photoDir.url,
      dialogImageUrl: '',
      dialogVisible: false,
      photo_list: []
    }
  },
  created () {
    if (this.albumid) {
      this.getPhotos(this.albumid)
    }
  },
  methods: {
    getPhotos (newId) {
      getPhoto({ album_id: newId }).then(result => {
        if (result.status === 0) {
          this.photo_list = result.data
        } else {
          this.$message('网络请求出错')
        }
      }).catch(error => {
        console.log(error)
      })
    },
    delPhoto (photoId, index) {
      console.log(photoId)
      delPhoto({ photo_id: photoId }).then(result => {
        if (result.status === 0) {
          this.photo_list.splice(index, 1)
          this.$message('删除成功')
        } else {
          this.$message('删除失败')
        }
      })
    },
    beforeLogoUpload (file) {
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      // 校验文件
      if (isLt2M) {
        // 将文件转化为formdata数据上传
        const fd = new FormData()
        fd.append('file', file)
        fd.append('album_id', this.albumid)

        // post上传图片
        photoUpload(fd)
          .then(res => {
            if (res.status === 0) {
              this.$message('图片上传成功')
              this.photo_list.push(res.data)
            } else {
              this.$message(res.message)
            }
          })
          // eslint-disable-next-line handle-callback-err
          .catch(error => {
            console.log('图片上传失败，请重新上传!')
          })
      }
      return false // 阻止自动上传
    }
  },
  watch: {
    albumid: function (newId, oldId) {
      this.getPhotos(newId)
    }
  },
  props: ['albumid', 'haspower', 'ifLazy', 'hasalbum']
}
</script>

<style lang="scss" scoped>
.album-img-list {
  position: relative;
  height: 500px;
  overflow: auto;
  .upload-img {
    padding: 0 16px;
  }

  .del-btn {
    position: relative;
    left: 16px;
    z-index: 10;
    cursor: pointer;
  }
  .tip{
    text-align:center;
  }
}
</style>

<style lang="scss">
.album-img-list {
  .el-image {
    padding: 10px 16px 0;
    height: 100px;
  }
  .upload-img {
    .el-upload {
      margin-top: 10px;
    }
  }
}
</style>
