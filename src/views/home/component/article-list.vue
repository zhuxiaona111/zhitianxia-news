<template>
  <div class="scroll-wrapper">
    <!-- 下拉刷新 -->
    <van-pull-refresh v-model="downLading" @refresh="onRefresh" :success-text="refreshSuccessText">
    <!-- 实现上拉加载 -->
    <van-list v-model="upLoading" :finished="finished" @load="onLoad">
      <van-cell v-for="article in articles" :key="article" :title="article"></van-cell>
    </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
export default {
  name: 'article-list',
  data () {
    return {
      upLoading: false,
      finished: false,
      articles: [],
      downLading: false,
      refreshSuccessText: '更新成功'
    }
  },
  methods: {
    onLoad () {
      console.log('开始加载数据')
      setTimeout(() => {
        if (this.articles.length === 50) {
          this.finished = true
        } else {
          let arr = Array.from(
            Array(10),
            (value, index) => index + this.articles.length + 1
          )
          this.articles.push(...arr)
          this.upLoading = false
        }
      }, 3000)
    },
    onRefresh () {
      console.log('下拉刷新')
      setTimeout(() => {
        let arr = Array.from(
          Array(10),
          (value, index) => index + this.articles.length + 1
        )
        this.articles.push(...arr)
        this.downLading = false
        this.refreshSuccessText = `更新了${arr.length}条数据`
      }, 3000)
    }
  }
}
</script>

<style lang="less" scoped>
</style>
