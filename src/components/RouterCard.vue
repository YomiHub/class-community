<template>
  <div class="card-wrap">
    <div class="card-tag">
      <i class="el-icon-caret-right"></i>
      <span v-if="ismanagement">我的创建</span>
      <span v-else>我的加入</span>
    </div>
    <div class="card-router">
      <el-row
        type="flex"
        justify="space-between"
      >
        <el-col
          :span="8"
          class="icon-btn"
        >
          <router-link to="/">
            <span>
              <svg-icon icon-class="upload"></svg-icon>
            </span>
            <p>发布风采</p>
          </router-link>
        </el-col>
        <el-col
          :span="8"
          class="icon-btn"
        >
          <router-link to="/">
            <span>
              <svg-icon icon-class="message"></svg-icon>
            </span>
            <p>班级公告</p>
          </router-link>
        </el-col>
        <el-col
          :span="8"
          class="icon-btn"
        >
          <router-link to="/">
            <span>
              <svg-icon icon-class="picture"></svg-icon>
            </span>
            <p>班级相册</p>
          </router-link>
        </el-col>
      </el-row>
      <el-row
        type="flex"
        justify="space-between"
      >
        <el-col
          :span="8"
          class="icon-btn"
        >
          <router-link to="/">
            <span>
              <svg-icon icon-class="member"></svg-icon>
            </span>
            <p>班级成员</p>
          </router-link>
        </el-col>
        <el-col
          :span="8"
          class="icon-btn"
        >
          <router-link to="/">
            <span>
              <svg-icon icon-class="leaveword"></svg-icon>
            </span>
            <p>班级留言</p>
          </router-link>
        </el-col>
        <el-col
          v-if="ismanagement"
          :span="8"
          class="icon-btn"
        >
          <router-link to="/">
            <span>
              <svg-icon icon-class="check"></svg-icon>
            </span>
            <p>权限审核</p>
          </router-link>
        </el-col>
        <el-col
          v-else
          :span="8"
          class="icon-btn"
        >
          <router-link to="/">
            <span>
              <svg-icon icon-class="apply"></svg-icon>
            </span>
            <p>申请权限</p>
          </router-link>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  props: ['ismanagement']
}
</script>

<style lang="scss" scoped>
@import '~@/assets/styles/mixin.scss';
.card-wrap {
  border: 1px solid #ccc;
  margin-bottom:14px;
  .card-tag {
    @include flexSet($justify: flex-start, $align: center);
    height: 36px;
    border-bottom: 1px solid #ccc;
    span {
      font-size: 14px;
    }
  }
  .card-router {
    .icon-btn {
      text-align: center;
      padding: 10px 0;
      a {
        color: #2e3135;

        span {
          font-size: 24px;
        }
        p {
          font-size: 14px;
          margin: 0;
          padding: 6px 0;
          &:hover{
          color:#00BBDD;
        }
        }

      }
    }
  }
}
</style>
<style lang="scss">
.card-tag {
  i {
    font-size: 20px;
  }
}
</style>
