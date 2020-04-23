<template>
  <div>
    <add-btn v-if="!this.$store.state.user.ifCreate" btn-tip="创建" btn-type="create"></add-btn>
    <feature-list v-else :type="2" keyword=""></feature-list>
  </div>
</template>
<script>
import List from '../List.vue'
import AddBtn from './AddBtn.vue'
export default {
  data () {
    return {}
  },
  components: {
    'feature-list': List,
    'add-btn': AddBtn
  }
}
</script>
<style lang="scss" scoped>

</style>
