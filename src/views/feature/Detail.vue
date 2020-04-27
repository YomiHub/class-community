<template>
  <div class="content-box">
    <el-row
      type="flex"
      class="container"
      justify="space-between"
    >
      <el-col :span="17">
        <div class="grid-content bg-purple activity-list">
          <div class="detail-wrap">
            <div class="header">
              <h1>{{featureDetail.title}}</h1>
              <div class="meta-box">
                <span class="time">发布时间：<time :datetime="featureDetail.add_time">{{featureDetail.add_time | dateFormat('yyyy-MM-dd hh:mm')}}</time></span>
                <span class="class-name">来源：{{featureDetail.name}}</span>
              </div>
            </div>
            <div class="brief-wrap">
              <p class="border-radius brief base-word">
                {{featureDetail.brief}}
              </p>
            </div>
            <div
              class="content base-word"
              v-html="featureDetail.content"
            ></div>
            <div class="operation">
              <ul class="item-icon">
                <li>
                  <a
                    href="javascript:;"
                    @click="addLike"
                  >
                    <svg-icon :icon-class="supportIcon"></svg-icon>
                    <span>{{featureDetail.likes}}</span>
                  </a>
                </li>
                <li>
                  <a
                    href="javascript:;"
                    @click="addCollect"
                  >
                    <svg-icon :icon-class="featureDetail.if_collect===0?'un_collect':'collect'"></svg-icon>
                    <span>{{featureDetail.collect_count}}</span>
                  </a>
                </li>
                <li>
                  <a href="javascript:;">
                    <svg-icon icon-class="share"></svg-icon>
                    <span>分享</span>
                  </a>
                </li>
                <li v-if="featureDetail.user_id==$store.state.user.userId">
                  <a
                    href="javascript:;"
                    @click="deleteFeture"
                  >
                    <svg-icon icon-class="delete"></svg-icon>
                    <span>删除</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </el-col>
      <el-col
        :span="7"
        class="other-info"
      >
        <div class="info-wrap">
          <div class="class-info">
            <div class="item-origin">
              <div class="avater">
                <img
                  :src="featureDetail.logo_url"
                  :alt="featureDetail.name"
                >
              </div>
              <p class="origin-name">
                {{featureDetail.name}}
              </p>
            </div>
            <el-row class="brief-wrap">
              <el-col :span="5">简介：</el-col>
              <el-col
                class="brief"
                :span="19"
              >{{featureDetail.class_brief}}</el-col>
            </el-row>
            <div class="class-btn">
              <el-button
                type="primary"
                plain
              >查看主页</el-button>
              <el-button
                v-if="featureDetail.if_focus==1"
                type="primary"
                plain
                @click="removeFocus(featureDetail.class_id)"
              >取消关注</el-button>
              <el-button
                v-else
                type="primary"
                plain
                @click="addFocus(featureDetail.class_id)"
              >关注班级</el-button>
            </div>
          </div>
          <div class="comment-info">
            <div class="bar">
              <span class="bar-icon">评论列表</span>
            </div>
            <div class="comment-box">
              <el-form
                :model="commentForm"
                ref="commentform"
                :rules="rules"
                label-width="0"
                class="comment-form"
              >
                <el-form-item prop="content">
                  <el-input
                    type="textarea"
                    v-model="commentForm.content"
                    :rows="3"
                    class="border-radius"
                  ></el-input>
                </el-form-item>
                <el-button
                  type="primary"
                  plain
                  class="push"
                  @click="sendComment"
                >发表评论</el-button>
              </el-form>

              <div
                v-for="(item,i) in comments"
                :key="i"
                class="reply-father"
              >
                <el-row class="author-info">
                  <el-col :span="3">
                    <el-avatar
                      :size="30"
                      :src="item.avatar_url"
                    ></el-avatar>
                  </el-col>

                  <el-col :span="21">
                    <el-row class="info-meta">{{item.user_name}}</el-row>
                    <el-row>
                      <el-col
                        class="info-meta"
                        :span="14"
                      >
                        {{item.comment_time | dateFormat('yyyy-MM-dd hh:mm')}}
                      </el-col>
                      <el-col :span="10">
                        <div class="icon-btn">
                          <span
                            @click="showReplyInput(i,item.user_name,item.id)"
                            class="operate-icon"
                          ><i class="iconfont el-icon-s-comment"></i>{{item.commentNum}}</span>
                          <span
                            class="operate-icon"
                            @click="supportComment(i,item.id)"
                          ><i class="iconfont el-icon-caret-top"></i>{{item.comment_likes}}</span>
                          <span
                            class="operate-icon"
                            @click="deleteComment(i,item.id)"
                            v-if="item.comment_user==$store.state.user.userId"
                          ><i class="iconfont el-icon-delete"></i></span>
                        </div>
                      </el-col>
                    </el-row>
                    <el-row>
                      <div>
                        <p class="minisize-p">
                          <span class="reply-content">{{item.comment}}</span>
                        </p>
                      </div>
                      <div class="reply-box">
                        <div
                          v-for="(reply,j) in item.reply"
                          :key="j"
                          class="reply-wrap"
                        >
                          <el-row>
                            <el-col :span="3">
                              <el-avatar
                                :size="20"
                                :src="reply.avatar_url"
                              ></el-avatar>
                            </el-col>

                            <el-col :span="21">
                              <el-row class="info-meta">{{reply.user_name}}</el-row>
                              <el-row>
                                <el-col
                                  class="info-meta"
                                  :span="16"
                                >
                                  {{reply.reply_time | dateFormat('yyyy-MM-dd hh:mm')}}
                                </el-col>
                                <el-col :span="8">
                                  <div class="icon-btn">
                                    <span
                                      class="operate-icon"
                                      @click="showReplyInput(i,reply.user_name,reply.id)"
                                    ><i class="iconfont el-icon-s-comment"></i>{{reply.commentNum}}</span>
                                    <span
                                      class="operate-icon"
                                      @click="supportReply(i,j,reply.id)"
                                    ><i class="iconfont el-icon-caret-top"></i>{{reply.reply_likes}}</span>
                                  </div>
                                </el-col>
                              </el-row>

                              <el-row>
                                <p class="minisize-p">
                                  <span>回复 {{reply.user_name}}:</span>
                                  <span class="reply-content">{{reply.reply_content}}</span>
                                </p>
                              </el-row>
                            </el-col>

                          </el-row>

                        </div>
                      </div>
                      <el-row v-show="_inputShow(i)">
                        <el-col :span="4">
                          <el-avatar
                            :size="30"
                            :src="myHeader"
                          ></el-avatar>
                        </el-col>
                        <el-col
                          :span="20"
                          class="comment-reply"
                        >
                          <el-input
                            type="textarea"
                            tabindex="0"
                            contenteditable="true"
                            spellcheck="false"
                            placeholder="输入评论..."
                            v-model="replyComment"
                          ></el-input>
                          <div>
                            <el-button
                              size="mini"
                              @click="sendCommentReply(i)"
                              type="primary"
                              class="btn-margin"
                            >回复</el-button>
                            <el-button
                              size="mini"
                              @click="cancelCommentReply(i)"
                              type="primary"
                              class="btn-margin"
                            >取消</el-button>
                          </div>
                        </el-col>

                      </el-row>
                    </el-row>
                  </el-col>
                </el-row>
              </div>

              <div class="load-more">
                <el-button
                  plain
                  v-show="moreBtnShow"
                  size="mini"
                  @click="getMore"
                >加载更多</el-button>
              </div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {
  getDetail,
  getComment,
  sendComment,
  sendCommentReply,
  addFeatureLike,
  addCollect,
  deleteFeture,
  supportComment,
  supportReply,
  deleteComment,
  addFocus,
  removeFocus
} from '@/api/feature.js'
import { dateFormat } from '@/utils/filter.js'
export default {
  data () {
    return {
      id: this.$route.params.id,
      pagesize: 2,
      pageindex: 1,
      commentTotal: 0,
      moreBtnShow: true,
      featureDetail: {},
      rules: {
        content: [
          { requires: true, message: '请输入评论内容', trigger: 'blur' }
        ]
      },
      commentForm: {
        content: ''
      },
      replyComment: '', // 评论回复的内容
      index: '0',
      myHeader: this.$store.state.user.userAvatar,
      comments: [],
      supportIcon: 'un_support',
      pageForm: '',
      redirect: '',
      ifFocus: false
    }
  },
  created () {
    this.initData()
    this.getComment()
  },
  methods: {
    initData () {
      getDetail({ user_id: this.$store.state.user.userId, feature_id: this.id })
        .then(result => {
          if (result.status === 0) {
            this.featureDetail = result.data
          } else {
            this.$message('网络请求错误~')
            this.$route.replace('/index')
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    getComment () {
      getComment({
        feature_id: this.id,
        pagesize: this.pagesize,
        pageindex: this.pageindex
      })
        .then(result => {
          if (result.status === 0) {
            this.commmentTotal = result.total

            if (
              result.total === 0 ||
              this.pageindex === Math.ceil(this.commmentTotal / this.pagesize)
            ) {
              this.moreBtnShow = false
            }

            this.comments = this.comments.concat(result.data)
          } else {
            this.$message('网络请求错误~')
            this.$route.replace('/index')
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    getMore () {
      this.pageindex++
      this.getComment()
    },
    showReplyInput (i, name, id) {
      this.$set(this.comments[this.index], 'inputShow', false)
      this.index = i
      this.$set(this.comments[i], 'inputShow', true)
      this.to = name
      this.toId = id
    },
    _inputShow (i) {
      return this.comments[i].inputShow
    },
    sendComment () {
      this.$refs.commentform.validate(valid => {
        if (valid) {
          sendComment({
            comment_user: this.$store.state.user.userId,
            feature_id: this.id,
            comment: this.commentForm.content,
            comment_time: new Date().toUTCString()
          })
            .then(result => {
              if (result.status === 0) {
                this.comments.unshift(result.data)
              } else {
                this.$message('网络请求出错')
              }
              this.commentForm.content = ''
            })
            .catch(err => {
              console.log(err)
            })
        } else {
          this.$message('评论内容不能为空')
        }
      })
    },
    sendCommentReply (i) {
      if (!this.replyComment) {
        this.$message({
          showClose: true,
          type: 'warning',
          message: '评论不能为空'
        })
      } else {
        sendCommentReply({
          comment_id: this.toId,
          reply_for_user: this.to,
          reply_user: this.$store.state.user.userId,
          reply_content: this.replyComment,
          reply_time: new Date().toUTCString()
        })
          .then(result => {
            if (result.status === 0) {
              this.comments[i].reply.unshift(result.data)
              this.replyComment = ''
            } else {
              this.$message('网络请求出错')
            }
            this.commentForm.content = ''
          })
          .catch(err => {
            console.log(err)
          })
      }
    },
    cancelCommentReply (i) {
      this.comments[this.index].inputShow = false
    },
    addLike () {
      addFeatureLike({ feature_id: this.id }).then(result => {
        if (result.status === 0) {
          this.featureDetail.likes += 1
          this.supportIcon = 'support'
        } else {
          this.$message('网络请求出错')
        }
      })
    },
    addCollect () {
      addCollect({
        feature_id: this.id,
        user_id: this.$store.state.user.userId
      }).then(result => {
        if (result.status === 0) {
          this.featureDetail.if_collect = 1
          this.featureDetail.collect_count = result.data.collect_total
        } else {
          this.$message('网络请求出错')
        }
      })
    },
    deleteFeture () {
      deleteFeture({
        user_id: this.$store.state.user.userId,
        feature_id: this.id
      }).then(result => {
        if (result.status === 0) {
          this.$message('删除成功')
          this.$router.replace('/index')
        } else {
          this.$message('网络请求出错')
        }
      })
    },
    supportComment (index, id) {
      supportComment({ comment_id: id }).then(result => {
        if (result.status === 0) {
          this.comments[index].comment_likes += 1
        } else {
          this.$message('网络请求出错')
        }
      })
    },
    supportReply (i, j, id) {
      supportReply({ reply_id: id }).then(result => {
        if (result.status === 0) {
          this.comments[i].reply[j].reply_likes += 1
        } else {
          this.$message('网络请求出错')
        }
      })
    },
    deleteComment (index, commentId) {
      deleteComment({
        user_id: this.$store.state.user.userId,
        comment_id: commentId
      }).then(result => {
        if (result.status === 0) {
          this.comments.splice(index, 1)
          this.$message('删除成功')
        } else {
          this.$message('网络请求出错')
        }
      })
    },
    addFocus (classId) {
      addFocus({ class_id: classId, user_id: this.$store.state.user.userId }).then(result => {
        if (result.status === 0) {
          this.featureDetail.if_focus = 1
        } else {
          this.$message('网络请求出错')
        }
      }).catch(err => {
        console.log(err)
      })
    },
    removeFocus (classId) {
      removeFocus({ class_id: classId, user_id: this.$store.state.user.userId }).then(result => {
        if (result.status === 0) {
          this.featureDetail.if_focus = 0
        } else {
          this.$message('网络请求出错')
        }
      }).catch(err => {
        console.log(err)
      })
    }
  },
  filters: {
    dateFormat: dateFormat // dataFormat('yyyy-MM-dd hh:mm:ss')
  }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/styles/mixin.scss';
.content-box {
  padding: 20px 0;
  min-height: 500px;
  .detail-wrap {
    border: 1px solid #ccc;
    .header {
      text-align: center;
      border-bottom: 1px dotted #ccc;
      padding: 4px;
      h1 {
        margin: 0;
        padding: 10px 0;
        font-size: 18px;
        font-weight: 400;
      }
      span {
        font-size: 14px;
        color: #ccc;
      }
      .time {
        padding-right: 10px;
      }
      .class-name {
        padding-left: 10px;
      }
    }
    .brief-wrap {
      padding: 24px 36px;
      .brief {
        padding: 10px 26px;
      }
    }
    .content {
      padding: 0 20px;
    }
    .operation {
      width: 100%;
      height: 38px;
      margin-top: 20px;
      line-height: 38px;
      border: 1px solid #ccc;
      box-shadow: 0 1px 3px #ccc;
      .item-icon {
        @include flexSet($justify: flex-end, $align: center);
        li {
          padding: 0 20px 0 0;
          span {
            font-size: 14px;
            color: #b2bac2;
            padding-left: 4px;
          }
        }
      }
    }
    .base-word {
      line-height: 24px;
      font-size: 14px;
    }
  }
  .other-info {
    padding: 0 10px;
    .info-wrap {
      .class-info {
        border: 1px solid #ccc;
        padding: 10px;
        .item-origin {
          @include flexSet($justify: flex-start, $align: center);
          border-bottom: 1px solid #ccc;
          img {
            width: 2em;
            height: 2em;
            border-radius: 50%;
          }
          p {
            margin: 0 0 0 6px;
            font-size: 16px;
            color: #b2bac2;
          }
        }
        .brief-wrap {
          font-size: 14px;

          padding: 10px 4px;
          .brief {
            line-height: 18px;
          }
        }
        .class-btn {
          text-align: center;
          button {
            padding: 6px;
          }
        }
      }
      .comment-info {
        margin-top: 20px;
        border: 1px solid #ccc;
        position: relative;
        height: 800px;
        overflow: auto;
        .bar {
          border-bottom: 1px solid #ccc;
          padding: 8px 8px;
          span {
            border-left: 3px solid #00bbdd;
            height: 36px;
            padding: 4px;
            font-size: 14px;
          }
        }
        .comment-box {
          padding: 10px 6px;
          .comment-form {
            text-align: right;
            padding-bottom: 10px;
          }
          .push {
            padding: 4px;
          }
          .author-info {
            font-size: 14px;
          }
          .info-meta {
            color: #949494;
          }
          .reply-father {
            border-top: 1px solid #ccc;
            padding-top: 10px;
          }
          .reply-content {
            font-size: 14px;
            line-height: 20px;
          }
          .reply-box {
            margin-bottom: 10px;
            .reply-wrap {
              background-color: #efefef;
              border-bottom: 1px solid #ccc;
              padding: 4px;
            }
          }
          .comment-reply {
            text-align: right;
            .btn-margin {
              margin: 8px 0;
              margin-right: 4px;
            }
          }
          .operate-icon {
            padding-right: 2px;
            i {
              cursor: pointer;
            }
          }
          .load-more {
            text-align: center;
          }
        }
      }
    }
  }
}
</style>
