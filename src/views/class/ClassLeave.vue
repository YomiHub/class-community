<template>
  <div class="content-box">
    <div class="main-container">
      <div class="leave-board border-radius">
        <header>
          <div class="leave-origin class-origin">
            <router-link
              :to="'/index/classpage/'+class_id"
              tag="div"
              class="avater"
            >

              <img
                :src="classAvatar"
                alt="logo"
              >
            </router-link>
            <p class="origin-name">
              {{className}}
            </p>
          </div>
        </header>
        <div class="write-box">
          <h1>留言板</h1>
          <el-form>
            <el-input
              type="textarea"
              :rows="6"
              v-model="leaveContent"
              placeholder="在这里共享你的资源、提出你的宝贵建议~"
              class="text-input"
            ></el-input>
            <el-upload
              ref="upload"
              :action="leaveFileDir"
              :limit="1"
              :auto-upload="false"
              :before-upload="beforeFileUpload"
              :on-change="handleChange"
              name="file"
            >
              <el-button
                slot="trigger"
                size="mini"
                type="primary"
                plain
              >选取文件</el-button>
            </el-upload>
            <div class="btn-wrap">
              <el-button
                style="margin-left: 10px;"
                size="small"
                type="success"
                @click="leaveUpload"
              >发表留言</el-button>
            </div>
          </el-form>
        </div>

      </div>
      <div class="leave-list">
        <div
          v-for="(item,index) in leaveList"
          :key="item.id"
          class="leave-item"
        >
          <el-row
            class="meta-box"
            type="flex"
            align="center"
          >
            <router-link
              :to="'/index/userpage/'+item.user_id"
              tag="div"
              class="leave-origin user-origin"
            >
              <div class="avater">
                <el-image
                  :src="item.avatar_url"
                  alt="logo"
                  fit="cover"
                >
                </el-image>
              </div>
              <p class="origin-name">
                {{item.user_name}}
              </p>
            </router-link>
          </el-row>
          <el-row class="content-wrap">
            <div class="content">
              {{item.content}}
            </div>
            <div class="time">
              <time class="info-meta">
                {{item.leave_time | dateFormat('yyyy-MM-dd hh:mm')}}
              </time>
            </div>
            <div class="operation">
              <a
                :href="item.leave_file"
                target="_blank"
                v-if="item.leave_file!=null"
              >下载附件</a>
              <!-- <a :href="'http://view.officeapps.live.com/op/view.aspx?src='+encodeURIComponent(item.leave_file)" target="_blank" v-if="item.leave_file!=null">预览</a>  -->
              <a
                href="javascript:;"
                v-if="item.user_id==$store.state.user.userId"
                @click="netDelLeave(index,item.id)"
              >删除</a>
            </div>
          </el-row>
        </div>
        <div class="load-more">
          <el-button
            plain
            v-show="moreBtnShow"
            @click="getMore"
          >加载更多</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { dateFormat } from '@/utils/filter.js'
import {
  leaveFileDir,
  leaveFileUpload,
  leaveUpload,
  getLeaveList,
  getClassInfo,
  delLeave
} from '@/api/organize.js'
export default {
  data () {
    return {
      leaveContent: '',
      leaveFileDir: leaveFileDir.url,
      containFile: false,
      pagesize: 2,
      pageindex: 1,
      leaveTotal: 0,
      moreBtnShow: true,
      leaveList: [],
      className: '',
      classAvatar: ''
    }
  },
  created () {
    if (this.class_id) {
      this.getLeaveList()
      this.initClassInfo()
    } else {
      this.$message('没有绑定班级，请从应用首页进入或班级主页查看')
      this.$router.replace('/index')
    }
  },
  methods: {
    initClassInfo () {
      getClassInfo({
        class_id: this.class_id,
        user_id: this.$store.state.user.userId
      })
        .then(result => {
          if (result.status === 0) {
            this.className = result.data.name
            this.classAvatar = result.data.logo_url
          } else {
            this.$message('网络请求有误！')
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    getLeaveList () {
      getLeaveList({
        class_id: this.class_id,
        pagesize: this.pagesize,
        pageindex: this.pageindex
      })
        .then(result => {
          if (result.status === 0) {
            this.leaveTotal = result.total
            this.leaveList = this.leaveList.concat(result.data)
            if (
              result.total === 0 ||
              this.pageindex === Math.ceil(result.total / this.pagesize)
            ) {
              this.moreBtnShow = false
            }
          } else {
            this.$message('网络请求有误！')
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    getMore () {
      this.pageindex++
      this.getLeaveList()
    },
    handleChange (file, fileList) {
      if (file) {
        this.containFile = true
      } else {
        this.containFile = false
      }
    },
    beforeFileUpload (file) {
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('上传文件大小不能超过 2MB!')
      }
      // 校验文件
      if (isLt2M) {
        // 将文件转化为formdata数据上传
        const fd = new FormData()
        fd.append('file', file)
        // post上传
        leaveFileUpload(fd)
          .then(res => {
            if (res.status === 0) {
              var filePath = res.data.url
              if (this.leaveContent.length !== 0) {
                this.uploadContent(filePath)
              } else {
                this.$message('信息填写不完整')
              }
            } else {
              this.$message(res.message)
            }
          })
          // eslint-disable-next-line handle-callback-err
          .catch(error => {
            console.log('文件上传失败，请重新上传!')
          })
      }
      return false // 阻止自动上传
    },
    uploadContent (filePath) {
      leaveUpload({
        user_id: this.$store.state.user.userId,
        class_id: this.class_id,
        content: this.leaveContent,
        leave_file: filePath,
        leave_time: new Date().toUTCString()
      })
        .then(result => {
          if (result.status === 0) {
            this.leaveList.unshift(result.data)
            this.$message('发表成功')
            this.content = ''
            console.log(result)
          } else {
            this.$message(result.message)
          }
        })
        // eslint-disable-next-line handle-callback-err
        .catch(error => {
          console.log('发表失败!')
        })
    },
    leaveUpload () {
      if (this.containFile) {
        this.$refs.upload.submit()
      } else {
        this.uploadContent(null)
      }
    },
    netDelLeave (index, id) {
      delLeave({ leave_id: id, user_id: this.$store.state.user.userId })
        .then(result => {
          console.log(result)
          if (result.status === 0) {
            this.leaveList.splice(index, 1)
          } else {
            this.$message('删除失败')
          }
        })
        // eslint-disable-next-line handle-callback-err
        .catch(error => {
          console.log('留言删除失败!')
        })
    }
  },
  filters: {
    dateFormat: dateFormat // dataFormat('yyyy-MM-dd hh:mm:ss')
  },
  props: ['class_id']
}
</script>

<style lang="scss" scoped>
.main-container {
  border: 1px dotted #ccc;
  min-height: 600px;
  margin: 10px 0;
  padding: 18px;
  .leave-origin {
    display: flex;
    align-items: center;
    p {
      margin: 0 0 0 6px;
      font-size: 16px;
      color: #b2bac2;
    }
  }
  .leave-board {
    padding: 10px 10px 20px;

    .class-origin {
      border-bottom: 1px dotted #ccc;

      img {
        width: 2em;
        height: 2em;
        cursor: pointer;
        border-radius: 50%;
      }
    }
    .write-box {
      padding: 0 10px;
      h1 {
        font-size: 16px;
        text-align: center;
      }
      .btn-wrap {
        text-align: right;
        margin-top: 6px;
      }
      .text-input {
        margin-bottom: 10px;
      }
    }
  }
  .leave-list {
    padding: 10px 20px;
    .leave-item {
      border: 1px dotted #ccc;
      padding: 10px;
      margin-bottom: 10px;
    }
    .content-wrap {
      padding-left: 24px;
      .content {
        line-height: 22px;
      }
      .time,
      .operation {
        text-align: right;
        padding: 4px 0;
      }
      .time {
        color: #ccc;
      }
      .operation {
        a {
          padding-left: 6px;
          color: #00bbdd;
        }
      }
    }
    .load-more {
      text-align: center;
    }
  }
}
</style>

<style lang="scss">
.user-origin {
  img {
    width: 24px;
    height: 24px;
    cursor: pointer;
    border-radius: 50%;
  }
}
</style>
