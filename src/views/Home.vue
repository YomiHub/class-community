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
  components: {
    'base-header': Header,
    'base-footer': Footer
  }
}
</script>
