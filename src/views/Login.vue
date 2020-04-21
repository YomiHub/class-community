<template>
  <div class="container">
    <header>
      <div class="content-box">
        <a
          href="/"
          class="logo"
        >
          <img
            src="../assets/logo.png"
            alt="logo"
          >
        </a>
        <a
          href="https://github.com/YomiHub"
          target="_blank"
          class="icon-base"
        >
          <svg-icon icon-class="github"></svg-icon>
          <span>github</span>
        </a>
      </div>
    </header>
    <section class="main-content">
      <div class="main-wrap">
        <div class="slogan">
          <h1>班桥</h1>
          <p>高校建设特色班级</p>
        </div>
        <div class="login-wrap">
          <div class="login-component">
            <el-tabs
              v-model="activeName"
              stretch
              id="login-tab"
            >
              <el-tab-pane
                label="登录"
                name="login"
              >
                <el-form
                  ref="loginform"
                  :model="loginForm"
                  :rules="rules"
                  label-width="80px"
                  class="form-wrap"
                >
                  <el-form-item
                    prop="phone_num"
                    label-width="0"
                  >
                    <el-input
                      v-model="loginForm.phone_num"
                      placeholder="手机号"
                      class="input-wrap"
                    >
                      <i
                        slot="prefix"
                        class="el-input__icon el-icon-mobile"
                      ></i>
                    </el-input>
                  </el-form-item>
                  <el-form-item
                    prop="user_pass"
                    label-width="0"
                  >
                    <el-input
                      v-model="loginForm.user_pass"
                      type="password"
                      placeholder="密码"
                    >
                      <i
                        slot="prefix"
                        class="el-input__icon el-icon-lock"
                      ></i>
                    </el-input>
                  </el-form-item>
                  <el-button
                    :loading="loginLoading"
                    type="primary"
                    plain
                    class="form-btn"
                    @click.native.prevent="toLogin"
                  >登录</el-button>
                </el-form>
              </el-tab-pane>
              <el-tab-pane
                label="注册"
                name="register"
              >
                <el-form
                  ref="registerform"
                  :model="registerForm"
                  :rules="rules"
                  label-width="80px"
                  class="form-wrap"
                >
                  <el-form-item
                    prop="user_name"
                    label-width="0"
                  >
                    <el-input
                      v-model="registerForm.user_name"
                      placeholder="姓名"
                      class="input-wrap"
                    >
                      <i
                        slot="prefix"
                        class="el-input__icon el-icon-user-solid"
                      ></i>
                    </el-input>
                  </el-form-item>
                  <el-form-item
                    prop="phone_num"
                    label-width="0"
                  >
                    <el-input
                      v-model="registerForm.phone_num"
                      placeholder="手机号"
                      class="input-wrap"
                    >
                      <i
                        slot="prefix"
                        class="el-input__icon el-icon-mobile"
                      ></i>
                    </el-input>
                  </el-form-item>
                  <el-form-item
                    prop="user_pass"
                    label-width="0"
                  >
                    <el-input
                      v-model="registerForm.user_pass"
                      type="password"
                      placeholder="密码"
                    >
                      <i
                        slot="prefix"
                        class="el-input__icon el-icon-lock"
                      ></i>
                    </el-input>
                  </el-form-item>
                  <el-button
                    :loading="registerLoading"
                    type="primary"
                    plain
                    class="form-btn"
                    @click.native.prevent="toRegister"
                  >注册</el-button>
                </el-form>
              </el-tab-pane>
            </el-tabs>
          </div>
        </div>
      </div>
    </section>
    <base-footer></base-footer>
  </div>
</template>

<script>
// @ is an alias to /src
import Footer from '@/components/Footer.vue'
import { register } from '@/api/user.js'
export default {
  name: 'Login',
  data () {
    return {
      activeName: 'login',
      loginLoading: false,
      registerLoading: false,
      loginForm: {
        phone_num: '',
        user_pass: ''
      },
      registerForm: {
        user_name: '',
        user_pass: '',
        phone_num: ''
      },
      rules: {
        // 在el-form-item用prop属性指明规则
        user_name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        user_pass: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
        ],
        phone_num: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          {
            min: 11,
            max: 15,
            message: '长度在 11 到 15 个字符',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    toRegister () {
      this.$refs.registerform.validate(valid => {
        if (valid) {
          this.registerLoading = true
          register(this.registerForm).then(
            data => {
              // 注册成功
              this.$message('注册成功')
              this.$refs.registerform.resetFields() // 重置表单
              this.registerLoading = false
              this.activeName = 'login'
            },
            erro => {
              this.registerLoading = false
            }
          )
        } else {
          this.$message('注册信息有误')
          return false
        }
      })
    },
    toLogin () {
      this.$refs.loginform.validate(valid => {
        if (valid) {
          this.loginLoading = true
          this.$store
            .dispatch('user/login', this.loginForm)
            .then(() => {
              this.$router.push({ path: this.redirect || '/' })
              this.loginLoading = false
            })
            .catch(() => {
              this.loginLoading = false
            })
        } else {
          this.$message('登录信息有误')
          return false
        }
      })
    }
  },
  components: {
    'base-footer': Footer
  }
}
</script>

<style scoped lang="scss">
@import '~@/assets/styles/variables.scss';
@import '~@/assets/styles/mixin.scss';
@import '~@/assets/styles/element-ui.scss';
.content-box {
  @include flexSet($justify: space-between, $align: center);
  a {
    display: block;
    padding: 0 40px;
  }
  .icon-base span {
    display: inline-block;
    height: 100%;
    vertical-align: middle;
    font-size: 16px;
  }
}

.main-content {
  background-color: $appColor;
  padding: 88px 0px 0px 0px;
  .main-wrap {
    @include flexSet($justify: space-between, $align: flex-start);
    padding-bottom: 80px;
    position: relative;
    overflow: hidden;
    .slogan {
      color: #fff;
      padding-top: -20px;
      padding-left: 220px;
      h1 {
        text-align: center;
        font-size: 38px;
        margin: 0 0;
      }
      p {
        font-size: 28px;
      }
    }
    .login-wrap {
      padding-top: 40px;
      position: relative;
      padding-right: 180px;
      z-index: 2;
      .login-component {
        width: 308px;
        height: 398px;
        padding: 20px 20px 0 20px;
        background: $baseBackg;
        .form-wrap {
          padding: 40px 20px 20px 20px;
          .form-btn {
            margin-top: 40px;
            margin-left: 50%;
            transform: translateX(-50%);
          }
        }
      }
    }

    &::after {
      content: '';
      width: 640px;
      height: 493px;
      position: absolute;
      z-index: 1;
      display: block;
      background-repeat: no-repeat;
      background-size: cover;
      background-image: url('~@/assets/images/backg_image.png');
      transform: rotate(-30deg) translateY(220px) translateX(180px);
    }
  }
}
</style>
<style lang="scss">
#login-tab {
  .el-tabs__header {
    padding: 0 100px;
  }
  .el-tabs__item {
    padding: 0 6px;
  }
}
.el-form-item__content {
  margin-left: 0px !important;
}
</style>
