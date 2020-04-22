<template>
  <div class="home">
    <base-header></base-header>
    <router-view></router-view>
    <base-footer></base-footer>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
export default {
  name: 'Home',
  data () {
    return {

    }
  },
  created () {
    this.getRelation()
  },
  methods: {
    getRelation () {
      var _this = this
      this.$store
        .dispatch('user/getClassRelation')
        .then(() => {
        })
        .catch((error) => {
          _this.$message('班级信息获取失败~')
          console.log(error)
        })
    }
  },
  components: {
    'base-header': Header,
    'base-footer': Footer
  }
}
</script>
