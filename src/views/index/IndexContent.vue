<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick" stretch id="index-tab">
      <el-tab-pane label="班级风采" name="first">
        <all-feature></all-feature>
      </el-tab-pane>
      <el-tab-pane label="加入班级" name="second">
        <join-feature></join-feature>
      </el-tab-pane>
      <el-tab-pane label="创建班级" name="third">
        <create-feature></create-feature>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import AllFeature from '@/components/indextab/AllFeature.vue'
import JoinFeature from '@/components/indextab/JoinFeature.vue'
import CreateFeature from '@/components/indextab/CreateFeature.vue'

export default {
  data () {
    return {
      activeName: 'first'
    }
  },
  methods: {
    handleClick (tab, event) {
      // console.log(tab.name)
    }
  },
  components: {
    'all-feature': AllFeature,
    'join-feature': JoinFeature,
    'create-feature': CreateFeature
  }
}
</script>

<style lang="scss" scoped>

</style>

<style lang="scss">
#index-tab{
  .el-tabs__header {
    padding-right:60%;
  }
  .el-tabs__item{
    padding:0 6px;
  }
}
</style>
