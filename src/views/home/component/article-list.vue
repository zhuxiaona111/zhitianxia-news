<template>
  <div class="scroll-wrapper">
    <!-- 下拉刷新 -->
    <van-pull-refresh v-model="downLading" @refresh="onRefresh" :success-text="refreshSuccessText">
      <!-- 实现上拉加载 -->
      <van-list v-model="upLoading" :finished="finished" @load="onLoad">
        <van-cell v-for="article in articles" :key="article" >
          <div class="article_item">
            <h3 class="van-ellipsis">PullRefresh下拉刷新PullRefresh下拉刷新下拉刷新下拉刷新</h3>
            <!-- 三张图模式 -->
            <div class="img_box">
              <van-image class="w33" fit="cover" src="https://img.yzcdn.cn/vant/cat.jpeg" />
              <van-image class="w33" fit="cover" src="https://img.yzcdn.cn/vant/cat.jpeg" />
              <van-image class="w33" fit="cover" src="https://img.yzcdn.cn/vant/cat.jpeg" />
            </div>
            <!-- 一张图模式 -->
            <div class="img_box">
      <van-image class="w100" fit="cover" src="https://img.yzcdn.cn/vant/cat.jpeg"/>
  </div>
            <div class="info_box">
              <span>你像一阵风</span>
              <span>8评论</span>
              <span>10分钟前</span>
              <span class="close">
                <van-icon name="cross"></van-icon>
              </span>
            </div>
          </div>
        </van-cell>
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
      refreshSuccessText: '更新成功',
      timestamp: null
    }
  },
  props: {
    channel_id: {
      required: true,
      type: Number,
      default: null
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
        this.articles.unshift(...arr)
        this.downLading = false
        this.refreshSuccessText = `更新了${arr.length}条数据`
      }, 3000)
    }
  }
}
</script>

<style lang="less" scoped>
.article_item{
  h3{
    font-weight: normal;
    line-height: 2;
  }
  .img_box{
    display: flex;
    justify-content: space-between;
    .w33{
      width: 33%;
      height: 90px;
    }
    .w100{
      width: 100%;
      height: 180px;
    }
  }
  .info_box{
    color: #999;
    line-height: 2;
    position: relative;
    font-size: 12px;
    span{
      padding-right: 10px;
      &.close{
        border: 1px solid #ddd;
        border-radius: 2px;
        line-height: 15px;
        height: 12px;
        width: 16px;
        text-align: center;
        padding-right: 0;
        font-size: 8px;
        position: absolute;
        right: 0;
        top: 7px;
      }
    }
  }
}
</style>
