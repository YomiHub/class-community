<template>
  <div v-if="tipShow">
    <p class="tip">内容暂时为空~</p>
  </div>
  <div v-else>
    <div
      v-for="item in featureList"
      v-bind:key="item.id"
      class="item-wrap"
    >
      <router-link
        :to="'/index/classpage/'+item.id"
        tag="div"
      >
        <div class="item-origin">
          <div class="avater">
            <img
              :src="item.logo_url"
              alt=""
            >
          </div>
          <p class="origin-name">
            {{item.name}}
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
              :src="item.cover_img"
              alt=""
            >
          </el-col>
          <el-col
            :span="20"
            class="feature-content"
          >
            <router-link :to="'/index/featuredetail/'+item.id">
              <h4>{{item.title}}</h4>
              <p class="text1-overflow">{{item.brief}}</p>
            </router-link>

            <ul class="item-icon">
              <li>
                <a href="javascript:;">
                  <svg-icon icon-class="support"></svg-icon>
                  <span>{{item.likes}}</span>
                </a>
              </li>
              <li>
                <a href="javascript:;">
                  <svg-icon icon-class="collect"></svg-icon>
                  <span>{{item.collect_count}}</span>
                </a>
              </li>
            </ul>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="load-more">
      <el-button
        plain
        v-show="moreBtnShow"
        @click="getMore"
      >加载更多</el-button>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {}
  },
  methods: {
    getMore () {
      this.$emit('getMore')
    }
  },
  props: {
    featureList: Array,
    moreBtnShow: Boolean,
    tipShow: Boolean
  }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/styles/mixin.scss';
.tip {
  padding: 30px 0;
  text-align: center;
}
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
      color: #b2bac2;
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
      a {
        color: #2e3135;
      }
      h4,
      p {
        margin: 0;
      }
      p {
        padding: 8px 0;
        font-size: 14px;
      }
      .item-icon {
        @include flexSet($justify: flex-start, $align: center);
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
  }
}
.load-more {
  @include flexSet($justify: center, $align: center);
  margin-top: 20px;
}
</style>
