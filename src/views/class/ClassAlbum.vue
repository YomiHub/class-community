<template>
  <div class="content-box">
    <el-row
      type="flex"
      class="main-container"
      justify="space-between"
    >
      <el-col :span="5">
        <div class="album-wrap">
          <div class="create-wrap" v-if="hasPower">
            <el-form class="create-album border-radius">
              <p>新建相册</p>
              <el-input
                placeholder="小于10个字符"
                maxlength="10"
                v-model="albumName"
              ></el-input>
              <el-button
                type="primary"
                @click="createAlbum"
              >确定</el-button>
            </el-form>
          </div>
          <p
            class="tip"
            v-if="albumArr.length===0"
          >暂时没有创建相册~</p>
          <el-menu
            v-else
            :default-active="openId.toString()"
            class="el-menu-vertical-demo album-list"
            background-color="#F4F4F4"
            @select="changeAlbum"
          >
            <el-menu-item
              v-for="item in albumArr"
              :key="item.id"
              :index="item.id.toString()"
            >
              <span slot="title">{{item.album_name}}</span>
              <i class="el-icon-d-arrow-right"></i>
            </el-menu-item>
          </el-menu>
        </div>
      </el-col>
      <el-col :span="18">
        <div class="grid-content">
          <div class="list-wrap">
            <album-list :albumid="openId" :haspower="hasPower" :ifLazy="true"></album-list>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { createAlbum, getAlbum } from '@/api/organize.js'
import AlbumList from '@/components/album/AlbumList.vue'
export default {
  data () {
    return {
      openId: 1,
      albumName: '',
      albumArr: [],
      hasPower: false
    }
  },
  created () {
    if (this.class_id) {
      this.initAlbum()
    } else {
      this.$message('没有绑定班级，请从应用首页进入或班级主页查看')
      this.$router.replace('/index')
    }
  },
  methods: {
    initAlbum () {
      getAlbum({
        user_id: this.$store.state.user.userId,
        class_id: this.class_id
      })
        .then(result => {
          if (result.status === 0) {
            this.albumArr = result.data
            this.hasPower = result.hasPower
            if (result.data.length !== 0) {
              this.openId = result.data[0].id
            }
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    changeAlbum (index) {
      this.openId = index
    },
    createAlbum () {
      if (this.albumName.length === 0) {
        this.$message('相册名称不能为空')
        return
      }
      createAlbum({ class_id: this.class_id, album_name: this.albumName })
        .then(result => {
          if (result.status === 0) {
            this.albumName = ''
            this.albumArr.push(result.data)
          } else {
            this.$message(result.message)
          }
        })
        .catch(error => {
          console.log(error)
        })
    }
  },
  components: {
    'album-list': AlbumList
  },
  props: ['class_id']
}
</script>

<style lang="scss" scoped>
.content-box {
  min-height: 500px;
  padding: 20px;
  .album-wrap {
    padding: 10px 0 20px;
    border: 1px solid #ccc;
    .create-wrap {
      padding: 0 10px;
    }
    .create-album {
      padding: 10px 20px;
      margin-bottom: 20px;
      text-align: center;
      p {
        margin: 0;
        font-size: 14px;
        padding: 6px 0;
      }
    }
  }
  .list-wrap {
    border: 1px solid #ccc;
    padding: 10px 20px;
  }
  .tip {
    text-align: center;
  }
}
</style>

<style lang="scss">
.create-album {
  .el-input__inner {
    height: 28px;
    line-height: 28px;
  }

  .el-button {
    margin-top: 10px;
    padding: 6px;
  }
}
.album-list {
  .el-menu-item {
    height: 36px;
    line-height: 36px;
  }
  .el-menu-item.is-active {
    background-color: #87d0aa !important;
    color: #000000;
  }
  .el-menu-item {
    border-bottom: 2px solid #ccc;
  }
}
</style>
