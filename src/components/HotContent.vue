<template>
  <div class="card-wrap">
    <div class="card-tag">
      <svg-icon icon-class="hot"></svg-icon>
      <span>最近热门</span>
    </div>
    <div class="hot-message">
      <router-link
        :to="'/index/featuredetail/'+item.id"
        tag="div"
        class="hot-item"
        v-for="(item) in hotList"
        :key="item.id"
      >
        <h4 class="text1-overflow">{{item.title }}</h4>
        <div class="describe">
          <span>点击量 {{item.clicks}}</span>
          <span>点赞数 {{item.likes}}</span>
        </div>
      </router-link>
    </div>
  </div>

</template>

<script>
import { getHotFeature } from '@/api/feature.js'
export default {
  data () {
    return {
      hotList: []
    }
  },
  created () {
    this.getHotList()
  },
  methods: {
    getHotList () {
      getHotFeature().then(result => {
        this.hotList = result.data
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/styles/mixin.scss';
.card-wrap {
  border: 1px solid #ccc;
  padding: 0 6px 6px;
  margin-bottom: 14px;
  .card-tag {
    @include flexSet($justify: flex-start, $align: center);
    font-size: 26px;
    height: 36px;
    border-bottom: 1px solid #ccc;
    span {
      padding-left: 4px;
      font-size: 14px;
    }
  }
  .hot-message {
    font-size: 14px;
    padding: 6px 10px;
    .hot-item {
      padding: 4px 10px;
      cursor: pointer;
      border-bottom: 2px solid #ccc;
      &:hover {
        box-shadow: 0 1px 3px #ccc;
      }
      h4 {
        margin: 0;
        padding: 4px 0;
      }
      .describe {
        font-size: 12px;
        color: #b2bac2;
        span {
          padding-right: 12px;
        }
      }
    }
  }
}
</style>
