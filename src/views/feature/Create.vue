<template>
  <div class="content-box border-radius">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="0px"
      class="feature-form"
    >
      <el-form-item prop="title">
        <el-input
          v-model="ruleForm.title"
          placeholder="请输入标题"
          maxlength="15"
          class="tile-input"
        ></el-input>
      </el-form-item>
      <el-form-item prop="brief">
        <el-input
          type="textarea"
          v-model="ruleForm.brief"
          rows="4"
          class="brief-input"
          placeholder="请输入200字以内的简介"
          maxlength="200"
        ></el-input>
      </el-form-item>
      <quill-editor
        :options="quillOption"
        v-model="ruleForm.content"
        ref="myQuillEditor"
      >
      </quill-editor>
      <div class="cover-box">
        <el-upload
          class="avatar-uploader cover-wrap"
          :action="uploadUrl"
          :show-file-list="false"
          :before-upload="beforeCoverUpload"
          name="cover"
        >
          <img
            v-if="ruleForm.cover_img"
            :src="ruleForm.cover_img"
            class="avatar"
          >
          <i
            v-else
            class="el-icon-plus avatar-uploader-icon"
          ></i>
        </el-upload>
        <p class="minisize-p">点击选择封面图</p>
      </div>
      <el-form-item class="submit-btn">
        <el-button
          type="primary"
          @click="onSubmit"
        >立即创建</el-button>
        <el-button @click="back">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { quillEditor } from 'vue-quill-editor'
import quillConfig from '@/utils/quillEditConfig.js'
import { uploadUrl, uploadImg, uploadFeature } from '@/api/feature.js'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
export default {
  data () {
    return {
      uploadUrl: uploadUrl.featureUrl,
      quillOption: quillConfig,
      ruleForm: {
        title: '',
        brief: '',
        content: '',
        cover_img: ''
      },
      rules: {
        title: [
          { required: true, message: '请输入内容标题', trigger: 'blur' },
          { min: 1, max: 15, message: '长度在 1 到 15 个字符', trigger: 'blur' }
        ],
        brief: [
          { required: true, message: '请输入简介', trigger: 'blur' },
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
  methods: {
    onSubmit () {
      this.$refs.ruleForm.validate(valid => {
        if (
          valid &&
          this.ruleForm.content.length !== 0 &&
          this.ruleForm.cover_img.length !== 0
        ) {
          if (this.class_id && this.class_id.length === 0) {
            this.$message('没有绑定上传的班级，请从首页入口进入~')
            return
          }
          this.ruleForm.user_id = this.$store.state.user.userId
          this.ruleForm.class_id = this.class_id
          uploadFeature(this.ruleForm).then(result => {
            if (result.data.status === 0) {
              this.$message('发布成功')
              this.$refs.ruleForm.resetFields()
              this.$router.replace('/index')
            } else {
              this.$message('发布失败')
            }
          }).catch(err => {
            console.log(err)
          })
        } else {
          this.$message('信息填写不完整')
        }
      })
      // console.log('submit!')
    },
    beforeCoverUpload (file) {
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!')
      }
      // 校验文件
      if (isLt2M) {
        const fd = new FormData()
        fd.append('file', file)

        // post上传图片
        uploadImg(fd)
          .then(res => {
            if (res.status === 0) {
              this.ruleForm.cover_img = res.logo_url
              this.$message('封面图上传成功')
            }
          })
          // eslint-disable-next-line handle-callback-err
          .catch(error => {
            console.log('封面图上传失败，请重新上传!')
          })
      }
      return false // 阻止自动上传
    },
    back () {
      this.$router.replace('/index')
    }
  },
  components: {
    'quill-editor': quillEditor
  },
  props: ['class_id']
}
</script>

<style lang="scss" scoped>
.content-box {
  margin-top: 20px;
  .feature-form {
    padding: 30px 20px;
    .tile-input {
      border-bottom: 2px solid #ccc;
    }
    .submit-btn {
      padding-top: 20px;
    }
    .cover-box{
      p{
        text-align:center;
      }
    }
    .cover-wrap {
      margin: 20px 0;
      font-size: 30px;
      overflow: hidden;
      text-align:center;
      img{
        width:200px;
      }
      i {
        width: 200px;
        height: 120px;
        line-height: 120px;
        text-align: center;
        border: 1px solid #ccc;
      }

    }
  }
}
</style>
<style lang="scss">
.tile-input input {
  border: none;
  font-size: 18px;
  text-align: center;
}
.el-form-item__error {
  left: 50%;
  transform: translateX(-50%);
}
.el-form-item__content {
  text-align: center;
}
.brief-input {
  width: 70%;
  margin: 0 auto;
}
.edit_container {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.ql-editor {
  height: 600px;
}
</style>
