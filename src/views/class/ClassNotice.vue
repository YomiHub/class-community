<template>
  <div class="content-box">
    <el-row
      type="flex"
      class="main-container"
      justify="space-between"
    >
      <el-col :span="16">
        <div class="edit-wrap">
          <el-form
            ref="form"
            :model="form"
            :rules="rules"
            label-width="64px"
            label-position="left"
            class="form-wrap border-radius"
            v-if="canpush"
          >
            <el-form-item
              label="标题："
              prop="title"
            >
              <el-input
                v-model="form.title"
                maxlength="20"
                placeholder="少于等于20个字符"
              ></el-input>
            </el-form-item>
            <el-form-item
              label-width="0px"
              prop="content"
            >
              <p class="content-tip">公告内容：</p>
              <el-input
                type="textarea"
                v-model="form.content"
                :rows="6"
              ></el-input>
            </el-form-item>
            <el-upload
              ref="upload"
              :action="noticeFileDir"
              :limit="1"
              :file-list="fileList"
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
                @click="noticeUpload"
              >发布公告</el-button>
            </div>

          </el-form>
          <div class="recent-wrap"  v-if="Object.keys(recentContent).length!=0">
            <div class="recent-notice">
              <div class="bar">
                最近公告
              </div>
              <div class="notice-content">
                <h1 class="minisize-h">{{recentContent.title}}</h1>
                <p>{{recentContent.content}}</p>
                <div class="meta-box">
                  <span class="class-name">{{recentContent.user_name}}</span>
                  <span class="time"><time datetime="2020-03-07  07:32">{{recentContent.add_time | dateFormat('yyyy-MM-dd hh:mm')}}</time></span>
                </div>
                <div class="btn">
                  <el-link target="_blank" :href="recentContent.notice_file">
                    <el-button
                      size="mini"
                      type="primary"
                      class="btn-margin"
                      v-if="recentContent.notice_file!=null"
                    >下载附件</el-button>
                  </el-link>
                  <el-button
                    size="mini"
                    type="primary"
                    class="btn-margin"
                    @click="readNotice(recentContent.id,recentContent.unread)"
                    v-if="!alreadyRead"
                  >已阅</el-button>
                  <el-button
                    size="mini"
                    type="primary"
                    class="btn-margin"
                    v-if="recentContent.user_id==$store.state.user.userId"
                    @click="netDelNotice(0,recentContent.id,true)"
                  >删除</el-button>
                </div>
              </div>
            </div>
            <div class="recent-noread">
              <div class="bar">
                未读列表
              </div>
              <div class="unread-list">
                <div v-if="!recentContent.unread">
                  本班学生均已阅
                </div>
                <div v-else>
                  {{recentContent.unread}}
                </div>
              </div>
            </div>
          </div>
        </div>

      </el-col>
      <el-col
        :span="8"
        class="notice-list"
      >
        <div class="bar">
          公告列表
        </div>
        <div class="content-list">
          <div
            class="content-item border-radius"
            v-for="(item,index) in noticeList"
            :key="index"
          >
            <h1 class="minisize-h ">{{item.title}}</h1>
            <p>{{item.content}}</p>
            <div class="meta-box">
              <span class="class-name">{{item.user_name}}</span>
              <span class="time"><time datetime="2020-03-07  07:32">{{item.add_time | dateFormat('yyyy-MM-dd hh:mm')}}</time></span>
            </div>
            <div class="operation">
              <a
                :href="item.notice_file"
                target="_blank"
                v-if="item.notice_file!=null"
              >下载附件</a>
              <a
                href="javascript:;"
                v-if="item.user_id==$store.state.user.userId"
                @click="netDelNotice(index,item.id,false)"
              >删除</a>
            </div>
          </div>
          <el-pagination
            background
            layout="prev, pager, next"
            :total="noticeTotal"
            :page-size="pagesize"
            class="page"
            @current-change="changePage"
          >
          </el-pagination>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {
  noticeFileDir,
  getNoticeList,
  getRecentNotice,
  noticeFileUpload,
  noticeUpload,
  delNotice,
  readNotice
} from '@/api/organize.js'
import { dateFormat } from '@/utils/filter.js'
export default {
  data () {
    return {
      form: {
        title: '',
        content: ''
      },
      fileList: [],
      pageindex: 1,
      pagesize: 2,
      noticeFileDir: noticeFileDir.url,
      canpush: true,
      containFile: false,
      recentContent: {},
      noticeList: [],
      noticeTotal: 0,
      alreadyRead: false,
      rules: {
        content: [
          { required: true, message: '请输入公告内容', trigger: 'blur' }
        ],
        title: [{ required: true, message: '请输入标题', trigger: 'blur' }]
      }
    }
  },
  created () {
    if (this.class_id) {
      this.getRecent()
      this.getNoticeList()
    } else {
      this.$message('没有绑定班级，请从应用首页进入或班级主页查看')
      this.$router.replace('/index')
    }
  },
  methods: {
    getRecent () {
      getRecentNotice({
        user_id: this.$store.state.user.userId,
        class_id: this.class_id
      })
        .then(result => {
          if (result.status === 0) {
            if (parseInt(result.data.can_push) !== 1) {
              this.canpush = false
            }

            if (result.data.unread !== null) {
              this.alreadyRead =
                result.data.unread.split(' ').indexOf(this.$store.state.user.userName) < 0
            }
            this.recentContent = result.data
          } else {
            this.$message('网络请求出错')
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    getNoticeList () {
      getNoticeList({
        user_id: this.$store.state.user.userId,
        class_id: this.class_id,
        pageindex: this.pageindex,
        pagesize: this.pagesize
      })
        .then(result => {
          this.noticeList = result.data
          this.noticeTotal = result.total
        })
        .catch(err => {
          console.log(err)
        })
    },
    changePage (val) {
      this.pageindex = val
      this.getNoticeList()
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
        noticeFileUpload(fd)
          .then(res => {
            if (res.status === 0) {
              var filePath = res.data.url
              this.$refs.form.validate(valid => {
                if (valid) {
                  this.uploadContent(filePath)
                } else {
                  this.$message('请填写完整')
                }
              })
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
      this.$refs.createform.validate(valid => {
        if (valid) {
          noticeUpload({
            user_id: this.$store.state.user.userId,
            class_id: this.class_id,
            title: this.form.title,
            content: this.form.content,
            notice_file: filePath,
            add_time: new Date().toUTCString()
          })
            .then(result => {
              if (result.status === 0) {
                this.$message('发布成功')
                this.$refs.form.resetFields()
                if (result.data.unread !== null) {
                  this.alreadyRead =
                  result.data.unread.split(' ').indexOf(result.data.user_name) > 0
                }
                this.recentContent = result.data
                this.noticeList.unshift(result.data) // 历史公告
                this.noticeTotal++
                console.log(result)
              } else {
                this.$message(result.message)
              }
            })
          // eslint-disable-next-line handle-callback-err
            .catch(error => {
              console.log('发布失败!')
            })
        } else {
          this.$message('信息填写不完整')
        }
      })
    },
    noticeUpload () {
      if (this.containFile) {
        this.$refs.upload.submit()
      } else {
        this.uploadContent(null)
      }
    },
    readNotice (noticeId, unread) {
      var startIndex = unread.split(' ').indexOf(this.$store.state.user.userName)
      if (startIndex >= 0) {
        var arr = unread.split(' ')
        arr.splice(startIndex, 1)
        readNotice({ notice_id: noticeId, notice_unread: arr.join(' ') }).then(res => {
          if (res.status === 0) {
            this.alreadyRead = true
            this.recentContent.unread = arr.join(' ')
          } else {
            this.$message('网络请求出错')
          }
        })
      } else {
        this.$message('您无需关注该通知')
      }
    },
    netDelNotice (index, noticeId, ifDelRecent) {
      delNotice({ notice_id: noticeId, user_id: this.$store.state.user.userId }).then(res => {
        if (res.status === 0) {
          this.$message('删除成功')
          this.noticeTotal--
          this.noticeList.splice(index, 1)
          if (ifDelRecent || index === 0) {
            // 删除最近公告
            if (this.noticeList.length !== 0) {
              this.recentContent = this.noticeList[0]
              this.alreadyRead =
                this.noticeList[0].unread.split(' ').indexOf(this.$store.state.user.userName) < 0
            } else {
              this.recentContent = {}
            }
          }
        } else {
          this.$message('删除失败')
        }
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
.content-box {
  min-height: 500px;
  padding: 20px;
  .bar {
    border-left: 3px solid #00bbdd;
    padding: 6px 4px;
    font-size: 14px;
    margin-bottom: 6px;
  }
  .meta-box {
    font-size: 14px;
    color: #a5a5a5;
    text-align: right;
    span {
      padding-left: 6px;
    }
  }
  .btn-wrap {
    text-align: right;
    margin-top: 6px;
  }
  .edit-wrap {
    padding: 20px;
    border: 1px dotted #ccc;
    margin-right: 10px;
    .form-wrap {
      padding: 30px 50px;
      margin-bottom: 20px;
    }
    .content-tip {
      margin: 0;
      padding: 0;
    }

    .notice-content {
      border: 1px solid #ccc;
      padding: 10px 20px;
      margin-bottom: 10px;
      h1 {
        text-align: center;
      }
      p {
        font-size: 14px;
        line-height: 18px;
      }
      .btn {
        text-align: right;
        padding-top: 10px;
        a{
          vertical-align:top;
          margin-right:10px;
        }
      }
    }
    .recent-noread {
      .bar {
        border-left: 3px solid #dd0000;
      }
      .unread-list {
        border-top: 1px solid #ccc;
        padding: 10px 20px;
      }
    }
  }

  .notice-list {
    border: 1px solid #ccc;
    padding: 10px 10px;
    h1 {
      margin: 0;
    }
    p {
      font-size: 14px;
      line-height: 22px;
      margin: 4px 0;
    }
    .content-item {
      padding: 10px 16px;
      margin-bottom: 10px;
    }
    .operation {
      text-align: right;
      color: #4e71fe;
      font-size: 14px;
      padding-top: 6px;
      a {
        margin-left: 6px;
      }
    }
    .page {
      text-align: center;
    }
  }
}
</style>
