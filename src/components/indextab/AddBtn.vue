<template>
  <div class="add-btn">
    <div
      class="create-btn text-center"
    >
      <span class="create-icon"><i class="el-icon-circle-plus-outline" @click="toDetail "></i></span>
      <p>点击{{btnTip}}班级</p>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  methods: {
    toDetail () {
      if (this.btnType === 'create') {
        this.$router.push('/index/createclass')
      } else {
        this.$router.push('/index/joinclass')
      }
    }
  },
  props: {
    btnTip: String,
    btnType: String
  }
}
</script>

<style lang="scss" scoped>
.create-btn {
  padding: 100px 0;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  font-size:14px;
  .create-icon{
    font-size:46px;
    cursor: pointer;
  }
}

</style>
