<template>
  <div class="content-box">
    <div class="main-container">
      <div class="user-info">
        <el-avatar
          size="large"
          :src="$store.state.user.userAvatar"
        ></el-avatar>
        <h2>{{$store.state.user.userName}}的个人主页</h2>
      </div>
      <div class="content">
        <el-tabs
          tab-position="left"
          stretch
        >
          <el-tab-pane label="收藏">
            <div class="list-wrap">
              <list-item
                :featureList="featureList"
                :moreBtnShow="moreBtnShow"
                :tipShow="tipShow"
                @getMore="getMore"
              ></list-item>
            </div>
          </el-tab-pane>
          <el-tab-pane label="关注">
            <div class="list-wrap">
              <router-link
                class="list-item border-radius"
                :to="'/index/classpage/'+item.id"
                v-for="item in foucesList"
                :key="item.id"
              >
                <div class="base-info">
                  <el-avatar
                    size="medium"
                    :src="item.logo_url"
                  ></el-avatar>
                  <span>{{item.name}}</span>
                </div>
                <div class="count-info">
                  <span class="minisize-span">点赞：{{item.support_count}}</span>
                  <span class="minisize-span">关注：{{item.focus_count}}</span>
                </div>
              </router-link>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import ListItem from '@/components/ListItem.vue'
import { getCollectFeature } from '@/api/feature.js'
import { getUserFocus } from '@/api/user.js'
export default {
  name: 'UserPage',
  data () {
    return {
      id: this.$route.params.id, // user_id
      activeName: 'first',
      pagesize: 2,
      pageindex: 1,
      featureTotal: 0,
      featureList: [],
      moreBtnShow: true,
      tipShow: false,
      foucesList: []
    }
  },
  created () {
    this.getCollectFeature()
    this.getFocusClass()
  },
  methods: {
    getCollectFeature () {
      getCollectFeature({
        user_id: this.id,
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
    getFocusClass () {
      getUserFocus({ user_id: this.$store.state.user.userId }).then(result => {
        if (result.status === 0) {
          this.foucesList = result.data
        } else {
          this.$message('网络请求错误')
        }
      })
    },
    getMore () {
      this.pageindex++
      this.getCollectFeature()
    }
  },
  components: {
    'list-item': ListItem
  }
}
</script>

<style lang="scss" scoped>
.content-box {
  padding: 16px 0;
}
.main-container {
  .user-info {
    color: #fff;
    background: #00bbdd;
    display: flex;
    align-items: center;
    padding: 20px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    h2 {
      font-size: 16px;
      padding-left: 10px;
    }
  }
  .content {
    min-height: 500px;
    border: 1px solid #ccc;
    border-top: none;
    padding: 16px;
    .list-wrap {
      border: 1px solid #ccc;
      padding: 14px;
      .list-item {
        display: flex;
        justify-content: space-between;
        padding: 2px 12px;
        margin-bottom: 10px;
        .base-info,
        .count-info {
          display: flex;
          align-items: center;
          span {
            margin-left: 6px;
          }
          .minisize-span {
            font-size: 14px;
            color: #ccc;
          }
        }
        .base-info {
          color: #000;
        }
      }
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
