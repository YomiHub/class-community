<template>
  <div>
    <feature-list
      :type="3"
      :keyword="search"
      ref="list"
    ></feature-list>
  </div>
</template>
<script>
import List from '@/components/List.vue'
export default {
  data () {
    return {
      search: this.keyword // 使用路由+/:keyword可以通过$route.params.keyword
    }
  },
  components: {
    'feature-list': List
  },
  methods: {},
  watch: {
    '$store.state.user.search_key' (newWord, oldWord) {
      // this.$router.replace(to.path)
      // this.$router.replace({ path: '/index/search', query: { keyword: this.search } })
      this.search = newWord
      this.$refs.list.getList(newWord) // 重新加载数据
    }
  },
  props: ['keyword']
}
</script>
<style lang="scss" scoped>
</style>
