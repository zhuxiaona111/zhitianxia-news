<template>
  <div class="container">
    <div class="split"></div>
    <van-skeleton title avatar :row="3" />
    <div class="split"></div>
    <van-skeleton title avatar :row="3" />
    <div class="split"></div>
    <van-skeleton title avatar :row="3" />
  </div>
</template>

<script>
export default {
  name: 'videoes'
}
</script>

<style lang="less" scoped>
.split{
height: 20px;
}
</style>
