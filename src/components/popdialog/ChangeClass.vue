<template>
  <div class="class-change text-center">
    <h2>转让班级</h2>
    <p class="minisize-p">通过对方账号ID和您的登录密码转让班级</p>
    <el-form
      label-width="120px"
      :model="classForm"
      :rules="rules"
      ref="classform"
      class="popinform-wrap"
    >
      <el-form-item
        label="对方账号ID"
        prop="other_id"
      >
        <el-input v-model="classForm.other_id"></el-input>
      </el-form-item>
      <el-form-item
        label="你的登录密码"
        prop="user_pass"
      >
        <el-input
          v-model="classForm.user_pass"
          type="password"
        ></el-input>
      </el-form-item>
    </el-form>
    <p class="minisize-p info-tip">提示：账号ID可以在 “头像”》“设置” 中查看 </p>
    <el-button
      type="primary"
      plain
      :loading="changeInfoLoading"
      @click.native.prevent="changeClassInfo"
      class="change-btn"
    >提交</el-button>
  </div>
</template>

<script>
import { changeClass } from '@/api/user.js'
export default {
  data () {
    return {
      changeInfoLoading: false,
      classForm: {
        other_id: '',
        user_pass: ''
      },
      rules: {
        // 在el-form-item用prop属性指明规则
        other_id: [
          { required: true, message: '请输入对方账号ID', trigger: 'blur' }
        ],
        user_pass: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    changeClassInfo () {
      this.$refs.classform.validate(valid => {
        if (valid) {
          this.changeInfoLoading = true
          this.classForm.id = this.$store.state.user.userId
          // this.classForm.class_id = this.$store.state.user.create_calss
          changeClass(this.classForm)
            .then(data => {
              if (data.status === 0) {
                this.$emit('changeClass')
                this.$message('转让成功~')
                this.$store
                  .dispatch('user/getClassRelation')
                  .then(() => {
                  })
                  .catch((error) => {
                    this.$message('班级信息获取失败~')
                    console.log(error)
                  })
              } else {
                this.$message(data.message)
              }
              this.changeInfoLoading = false
            })
            .catch(error => {
              console.log(error)
              this.changeInfoLoading = false
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
.info-tip{
  padding:0 0 20px 0;
}
</style>
