<template>
  <div class="page-footer">
    <footer class="footer">
      <div class="item">
        <ul>
          <li class="add-dot"><a href="https://github.com/YomiHub">github地址</a></li>
          <li class="add-dot"><a href="https://blog.csdn.net/YanMeiHe">CSDN博客</a></li>
          <li><a href="https://juejin.im/user/5bf965eb6fb9a049d37ec2dc">掘金</a></li>
        </ul>
      </div>
      <div class="item"><span>2020广东海洋大学毕业课设</span></div>
      <div class="item"><a href="mailto:yanmei98@foxmail.com"><span>yanmei98@foxmail.com</span></a></div>
    </footer>
  </div>
</template>
<script>
export default {

}
</script>
<style lang="scss" socped>
@import "~@/assets/styles/variables.scss";
@import "~@/assets/styles/mixin.scss";
.footer{
   width:224px;
   margin:0 auto;
   font-size:14px;
   line-height: 20px;
  .item{
    text-align:center;
    padding:6px 0 0 0;
    ul{
      padding-left:16px;
      @include clearfix;
      li{
        float:left;
        a{
          padding:0 4px;
          color:$fontColor;
        }
      }
      li.add-dot{
        &::after{
          content:"·"
        }
      }
    }
  }
}
</style>
