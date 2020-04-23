<template>
  <div>
    <feature-list
      :type="3"
      :keyword="keyword"
    ></feature-list>
  </div>
</template>
<script>
import List from '@/components/List.vue'
export default {
  data () {
    return {
      // search: this.$route.query.keyword // 使用路由+/:keyword可以通过$route.params.keyword
    }
  },
  components: {
    'feature-list': List
  },
  props: [
    'keyword'
  ]
}
</script>
<style lang="scss" scoped>
</style>
