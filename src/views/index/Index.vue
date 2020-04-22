<template>
  <div class="content-box">
    <el-row
      type="flex"
      class="main-container"
      justify="space-between"
    >
      <el-col :span="18">
        <div class="grid-content bg-purple activity-list">
          <div class="list-wrap border-radius">
            <router-view></router-view>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple-light router-wrap">
          <div class="nav-wrap">
            <router-card
              :ismanagement="true"
              v-if="$store.state.user.ifCreate"
              :name="$store.state.user.create_calssname"
              :id="$store.state.user.create_calss"
              :power="3"
            ></router-card>
            <router-card
              :ismanagement="false"
              v-if="$store.state.user.ifJoin"
              :name="$store.state.user.join_calssname"
              :id="$store.state.user.join_calss"
              :power="$store.state.user.join_power"
            ></router-card>
            <hot-content></hot-content>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import RouterCard from '@/components/RouterCard.vue'
import HotContent from '@/components/HotContent.vue'

export default {
  data () {
    return {}
  },
  components: {
    'router-card': RouterCard,
    'hot-content': HotContent
  }
}
</script>
<style lang="scss" scoped>
.main-container {
  padding: 16px 0px;
  .activity-list {
    padding: 0 10px;
    .list-wrap {
      padding: 10px 6px;
    }
  }
}
</style>
