<template>
  <div>
    <div class="item-wrap">
      <router-link
        to="/"
        tag="div"
      >
        <div class="item-origin">
          <div class="avater">
            <img
              src="http://localhost:3000/www/useravatar/avatar.webp"
              alt=""
            >
          </div>
          <p class="origin-name">
            信管1162班
          </p>
        </div>
      </router-link>
      <div class="content-wrap">
        <el-row
          type="flex"
          justify="space-between"
        >
          <el-col
            :span="3"
            :offset="1"
            class="feature-img"
          >
            <img
              src="http://localhost:3000/www/useravatar/avatar.webp"
              alt=""
            >
          </el-col>
          <el-col
            :span="20"
            class="feature-content"
          >
            <router-link to="/">
              <h4>信管新生联谊活动</h4>
              <p class="text1-overflow">这是一次印象深刻且非常有意义的联谊，在活动中不仅结交了很多新朋友，而且了解到了很多好玩的游戏，如果你觉得我的简介过长，那就省略吧</p>
            </router-link>

            <ul class="item-icon">
              <li>
                <a href="javascript:;">
                  <svg-icon icon-class="support"></svg-icon>
                  <span>200</span>
                </a>
              </li>
              <li>
                <a href="javascript:;">
                  <svg-icon icon-class="collect"></svg-icon>
                  <span>200</span>
                </a>
              </li>
            </ul>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="item-wrap">
      <router-link
        to="/"
        tag="div"
      >
        <div class="item-origin">
          <div class="avater">
            <img
              src="http://localhost:3000/www/useravatar/avatar.webp"
              alt=""
            >
          </div>
          <p class="origin-name">
            信管1162班
          </p>
        </div>
      </router-link>
      <div class="content-wrap">
        <el-row
          type="flex"
          justify="space-between"
        >
          <el-col
            :span="3"
            :offset="1"
            class="feature-img"
          >
            <img
              src="http://localhost:3000/www/useravatar/avatar.webp"
              alt=""
            >
          </el-col>
          <el-col
            :span="20"
            class="feature-content"
          >
          <router-link to="/index?id=1243">
            <h4>信管新生联谊活动</h4>
            <p class="text1-overflow">这是一次印象深刻且非常有意义的联谊，在活动中不仅结交了很多新朋友，而且了解到了很多好玩的游戏，如果你觉得我的简介过长，那就省略吧</p>
          </router-link>
            <ul class="item-icon">
              <li>
                <a href="javascript:;">
                  <svg-icon icon-class="support"></svg-icon>
                  <span>200</span>
                </a>
              </li>
              <li>
                <a href="javascript:;">
                  <svg-icon icon-class="collect"></svg-icon>
                  <span>200</span>
                </a>
              </li>
            </ul>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="load-more">
      <el-button plain>加载更多</el-button>
    </div>
  </div>
</template>
<script>
export default {}
</script>

<style lang="scss" scoped>
@import '~@/assets/styles/mixin.scss';
.item-wrap {
  margin-top: 10px;
  padding: 10px 20px;
  box-shadow: 0 1px 3px #ccc;
  .item-origin {
    @include flexSet($justify: flex-start, $align: center);
    img {
      width: 2em;
      height: 2em;
      cursor: pointer;
      border-radius: 50%;
    }
    p {
      margin: 0 0 0 6px;
      font-size: 14px;
      color:#b2bac2;
    }
  }
  .content-wrap {
    .feature-img {
      overflow: hidden;
      img {
        width: 80%;
      }
    }
    .feature-content {
      a{
        color:#2e3135;
      }
      h4,p{
        margin: 0;
      }
      p{
        padding:8px 0;
        font-size:14px;
      }
      .item-icon {
        @include flexSet($justify: flex-start, $align: center);
        li {
          padding: 0 20px 0 0;
          span{
            font-size:14px;
            color:#b2bac2;
            padding-left:4px;
          }
        }
      }
    }
  }
}
.load-more{
    @include flexSet($justify: center, $align: center);
    margin-top:20px;
  }
</style>
