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
          <i
            slot="suffix"
            class="el-input__icon el-icon-search searchicon-btn"
            @click="toSearch"
          >
          </i>

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
                :disabled="!$store.state.user.ifCreate"
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
      <set-info
        v-if="ifSetInfoShow"
        @setInfoClose="setInfoClose"
      ></set-info>
    </el-dialog>
    <el-dialog
      title="转让班级"
      :visible.sync="ifChangeShow"
    >
      <change-class
        v-if="ifChangeShow"
        @changeClass="changeClass"
      ></change-class>
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
      switch (command) {
        case 'set':
          this.ifSetInfoShow = true
          break
        case 'gopage':
          this.$router.push({ path: '/index/userpage/' + this.$store.state.user.userId })
          break
        case 'change':
          this.ifChangeShow = true
          break
        default:
          break
      }
    },
    toSearch () {
      if (this.search.length === 0) {
        this.$message({ message: '搜索关键词不能为空', duration: 1000 })
        return
      }
      // eslint-disable-next-line no-unused-expressions
      // this.$router.push('/index/search/' + keyword).catch(err => err)
      if (this.$route.name === 'Search') {
        // 已经在搜索页，更新数据
        this.$store.commit('user/SET_SEARCHKEY', this.search)
      } else {
        // 跳转到搜索页
        this.$router.replace({
          name: 'Search',
          params: { keyword: this.search }
        })
      }
    },
    setInfoClose () {
      this.ifSetInfoShow = false
    },
    changeClass () {
      this.ifChangeShow = false
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
      cursor: pointer;
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
