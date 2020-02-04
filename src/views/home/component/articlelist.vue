<template>
  <div class="scroll-wrapper">
    <!-- 下拉刷新 -->
    <van-pull-refresh v-model="downLoading" @refresh="onRefresh" :success-text="refreshSuccessText">
      <!-- 实现上拉加载 -->
      <van-list v-model="upLoading" :finished="finished" @load="onLoad">
        <van-cell v-for="article in articles" :key="article.art_id.toString()">
          <div class="article_item">
            <h3 class="van-ellipsis">{{article.title}}</h3>
            <!-- 三张图模式 -->
            <div class="img_box" v-if="article.cover.type===3">
              <van-image lazy-load class="w33" fit="cover" :src="article.cover.images[0]" />
              <van-image lazy-load class="w33" fit="cover" :src="article.cover.images[1]" />
              <van-image lazy-load class="w33" fit="cover" :src="article.cover.images[2]" />
            </div>
            <!-- 一张图模式 -->
            <div class="img_box" v-if="article.cover.type===1">
              <van-image lazy-load class="w100" fit="cover" :src="article.cover.images[0]" />
            </div>
            <div class="info_box">
              <span>{{ article.aut_name }}</span>
              <span>{{ article.comm_count }}评论</span>
              <span>{{ article.pubdate | relTime }}</span>
              <span class="close" v-if="user.token" @click="$emit('openAction',article.art_id.toString())">
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
import { getArticles } from '@/api/articles'
import { mapState } from 'vuex'
export default {
  name: 'article-list',
  data () {
    return {
      upLoading: false,
      finished: false,
      articles: [],
      downLoading: false,
      refreshSuccessText: '',
      timestamp: null
    }
  },
  computed: {
    ...mapState(['user'])
  },
  props: {
    channel_id: {
      required: true,
      type: Number,
      default: null
    }
  },
  methods: {
    async onLoad () {
      await this.$sleep()
      let data = await getArticles({
        channel_id: this.channel_id,
        timestamp: this.timestamp || Date.now()
      })
      // console.log(this.timestamp)
      this.articles.push(...data.results)
      // 关闭加载状态
      this.upLoading = false
      if (data.pre_timestamp) {
        // 如果有
        this.timestamp = data.pre_timestamp
        // console.log(this.timestamp)
      } else {
        this.finished = true // 没有数据了
      }
    },
    // 下拉刷新方法
    async onRefresh () {
      // await this.$sleep()
      // 下拉刷新永远拉取的是最新的数据
      const data = await getArticles({
        channel_id: this.channel_id,
        timestamp: Date.now()
      })
      // console.log(data)
      this.downLoading = false // 关掉下拉状态
      // 有可能 最新没有推荐数据
      if (data.results.length) {
        // 如果长度大于0 表示有数据
        this.articles = data.results // 将历史数据全都覆盖掉了
        // 假如你之前 已经将 上拉加载设置成finished设置成true了
        // 表示 我们还需要继续往下拉 就需要把原来的状态再次打开
        this.finished = false
        // 注意我们依然需要获取此次的历史事件戳
        this.timestamp = data.pre_timestamp // 赋值历史时间戳 因为当你下拉刷新之后 上拉加载的时候 要用到这个历史事件戳
        this.refreshSuccessText = `更新了${data.results.length}条数据`
      } else {
        //  如果没有数据更新  什么都不需要变化
        this.refreshSuccessText = '已是最新数据'
      }
    }
  }
}
</script>

<style lang="less" scoped>
.article_item {
  h3 {
    font-weight: normal;
    line-height: 2;
  }
  .img_box {
    display: flex;
    justify-content: space-between;
    .w33 {
      width: 33%;
      height: 90px;
    }
    .w100 {
      width: 100%;
      height: 180px;
    }
  }
  .info_box {
    color: #999;
    line-height: 2;
    position: relative;
    font-size: 12px;
    span {
      padding-right: 10px;
      &.close {
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
