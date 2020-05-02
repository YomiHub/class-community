<template>
  <div class="content-box">
    <div class="main-container">
      <div class="class-info">
        <div class="block flex-center">
          <el-avatar
            size="large"
            :src="classInfo.logo_url"
          ></el-avatar>

        </div>
        <p class="minisize-p text-center">{{classInfo.name}}</p>
        <div class="flex-center">
          <P class="class-brief border-radius">{{classInfo.brief}}</P>
        </div>
        <div class="btn-wrap flex-center">
          <div class="btn">
            <el-button
              type="primary"
              size="medium"
              plain
              @click="classSupport"
            >
              点赞
            </el-button>
            <p class="minisize-p">点赞：{{classInfo.support_count}}</p>
          </div>
          <div class="btn">
            <el-button
              type="primary"
              size="medium"
              plain
              v-if="classInfo.if_focus==0"
              @click="addFocus(classInfo.id)"
            >
              关注
            </el-button>
            <el-button
              type="primary"
              size="medium"
              plain
              v-else
              @click="removeFocus(classInfo.id)"
            >
              取消
            </el-button>
            <p class="minisize-p">关注：{{classInfo.focus_count}}</p>
          </div>
        </div>
      </div>
      <div class="content">
        <el-tabs
          tab-position="left"
          stretch
        >
          <el-tab-pane label="班级风采">
            <div class="list-wrap">
              <list-item
                :featureList="featureList"
                :moreBtnShow="moreBtnShow"
                :tipShow="tipShow"
                @getMore="getMore"
              ></list-item>
            </div>
          </el-tab-pane>
          <el-tab-pane label="班级相册">
            <div class="list-wrap">
              <el-collapse
                v-model="activeItem"
                accordion
                @change="handleChange"
              >
                <el-collapse-item
                  v-for="(item,index) in albumArr"
                  :title="item.album_name"
                  :name="index"
                  :key="item.id"
                  class="border-radius album-item"
                >
                  <album-list
                    :albumid="item.openId"
                    :haspower="hasPower"
                    :ifLazy="false"
                  ></album-list>
                </el-collapse-item>
              </el-collapse>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import ListItem from '@/components/ListItem.vue'
import { getClassFeature, addFocus, removeFocus } from '@/api/feature.js'
import { getAlbum, getClassInfo, classSupport } from '@/api/organize.js'
import AlbumList from '@/components/album/AlbumList.vue'
export default {
  name: 'ClassPage',
  data () {
    return {
      id: this.$route.params.id, // class_id
      classInfo: {},
      activeName: 'first',
      pagesize: 2,
      pageindex: 1,
      featureTotal: 0,
      featureList: [],
      moreBtnShow: true,
      tipShow: false,
      activeItem: -1,
      albumArr: [],
      hasPower: false
    }
  },
  created () {
    this.getClassInfo()
    this.getClassFeature()
    this.initAlbum()
  },
  methods: {
    getClassFeature () {
      getClassFeature({
        class_id: this.id,
        pagesize: this.pagesize,
        pageindex: this.pageindex
      })
        .then(result => {
          this.featureTotal = result.total
          this.featureList = this.featureList.concat(result.data)

          if (
            result.total === 0 ||
            this.pageindex === Math.ceil(this.featureTotal / this.pagesize)
          ) {
            this.moreBtnShow = false
          }

          if (result.total === 0) {
            this.tipShow = true
          } else {
            this.tipShow = false
          }
        })
        .catch(error => {
          this.$message(error)
        })
    },
    getMore () {
      this.pageindex++
      this.getClassFeature()
    },
    initAlbum () {
      getAlbum({
        user_id: this.$store.state.user.userId,
        class_id: this.id
      })
        .then(result => {
          if (result.status === 0) {
            this.albumArr = result.data
            // this.hasPower = result.hasPower
            this.hasPower = false // 班级主页不进行编辑操作
            // 打开第一个相册
            if (this.albumArr.length !== 0) {
              this.albumArr[0].openId = this.albumArr[0].id
              this.activeItem = 0
            }
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    getClassInfo () {
      getClassInfo({
        class_id: this.id,
        user_id: this.$store.state.user.userId
      }).then(result => {
        if (result.status === 0) {
          this.classInfo = result.data
        } else {
          this.$message('网络请求错误')
        }
      })
    },
    addFocus (classId) {
      addFocus({ class_id: classId, user_id: this.$store.state.user.userId })
        .then(result => {
          if (result.status === 0) {
            this.classInfo.if_focus = 1 // 设置为已关注
            this.classInfo.focus_count += 1
          } else {
            this.$message('网络请求出错')
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    removeFocus (classId) {
      removeFocus({ class_id: classId, user_id: this.$store.state.user.userId })
        .then(result => {
          if (result.status === 0) {
            this.classInfo.if_focus = 0
            this.classInfo.focus_count -= 1
          } else {
            this.$message('网络请求出错')
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    handleChange (val) {
      // 打开相册时显示图
      if (val.length !== 0) {
        this.albumArr[val].openId = this.albumArr[val].id
      }
    },
    classSupport () {
      classSupport({ class_id: this.id }).then(result => {
        if (result.status === 0) {
          this.classInfo.support_count += 1
        } else {
          this.$message('点赞失败')
        }
      })
    }
  },
  components: {
    'list-item': ListItem,
    'album-list': AlbumList
  }
}
</script>

<style lang="scss" scoped>
.content-box {
  padding: 14px;
}
.main-container {
  min-height: 800px;
  border: 1px solid #ccc;
  .flex-center {
    display: flex;
    justify-content: center;
  }
  .class-info {
    padding: 20px 0;
    border-bottom: 1px dotted #ccc;
    .class-brief {
      width: 260px;
      padding: 10px;
      font-size: 14px;
      line-height: 22px;
    }
    .btn {
      text-align: center;
      padding: 0 4px;
    }
  }
  .content {
    padding: 10px 10px;
    .list-wrap {
      border: 1px solid #ccc;
      padding: 14px;
    }
    .album-item {
      padding: 0 10px;
      margin-bottom: 6px;
    }
  }
}
</style>

<style lang="scss">
.content {
  .el-tabs__nav {
    flex-direction: column;
  }
  .el-tabs__header {
    height: 80px;
  }
}
</style>
