<template>
  <div class="base-header">
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
        <el-input
          placeholder="请输入内容"
          v-model="search"
          class="search-input"
          size="medium"
        >
          <router-link
            tag="i"
            to="/index/search"
            slot="suffix"
            class="el-input__icon el-icon-search"
          >
          </router-link>

        </el-input>
        <div class="operation">
          <el-dropdown @command="handleCommand">
            <div class="el-dropdown-link">
              <img
                :src="$store.state.user.userAvatar"
                alt=""
              >
            </div>

            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="set">设置</el-dropdown-item>
              <el-dropdown-item command="gopage">我的主页</el-dropdown-item>
              <el-dropdown-item
                command="change"
                :disabled="!isManage"
              >转让班级</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <a
            href="javascript:;"
            @click="logout"
          >退出</a>
        </div>
      </div>
    </header>
    <el-dialog
      title="设置个人信息"
      :visible.sync="ifSetInfoShow"
    >
      <set-info></set-info>
    </el-dialog>
    <el-dialog
      title="转让班级"
      :visible.sync="ifChangeShow"
    >
      <change-class></change-class>
    </el-dialog>

  </div>
</template>

<script>
import SetInfo from '@/components/popdialog/SetInfo.vue'
import ChangeClass from '@/components/popdialog/ChangeClass.vue'
export default {
  name: 'Header',

  data () {
    return {
      search: '',
      isManage: true,
      avatar_url: this.$store.state.user.userAvatar,
      ifSetInfoShow: false,
      ifChangeShow: false
    }
  },
  methods: {
    logout () {
      this.$store
        .dispatch('user/logout')
        .then(() => {
          this.$router.push({ path: '/login' })
        })
        .catch(() => {})
    },
    handleCommand (command) {
      console.log(command === 'set')
      switch (command) {
        case 'set':
          this.ifSetInfoShow = true
          break
        case 'gopage':
          this.$router.push({ path: '/' })
          break
        case 'change':
          this.ifChangeShow = true
          break
        default:
          break
      }
    }
  },
  components: {
    'set-info': SetInfo,
    'change-class': ChangeClass
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import '~@/assets/styles/variables.scss';
@import '~@/assets/styles/mixin.scss';
@import '~@/assets/styles/element-ui.scss';
header {
  box-shadow: 0 1px 3px #ccc;
}
.content-box {
  @include flexSet($justify: space-between, $align: center);
  a {
    display: block;
  }
  .search-input {
    width: 326px;
    .el-input__icon {
      color: #000;
    }
  }
  .operation {
    @include flexSet($justify: center, $align: center);
    img {
      width: 2em;
      height: 2em;
      cursor: pointer;
    }
    a {
      margin-left: 10px;
      font-size: 14px;
      color: $fontColor;
    }
  }
}
</style>
