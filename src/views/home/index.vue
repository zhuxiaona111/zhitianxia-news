<template>
  <div class="container">
    <van-tabs v-model="activeIndex" animated>
      <!-- 导航菜单 -->
      <van-tab v-for="channel in channels" :title="channel.name" :key="channel.id">
        <!-- 菜单下面的内容 -->
        <article-list></article-list>
      </van-tab>
    </van-tabs>
    <span class="bar_btn">
      <van-icon name="wap-nav" />
    </span>
  </div>
</template>

<script>
import ArticleList from './component/article-list'
import { getChannel } from '@/api/channel'
export default {
  name: 'home',
  components: {
    ArticleList
  },
  data () {
    return {
      activeIndex: '',
      upLoading: false,
      finished: false,
      channels: []
    }
  },
  methods: {
    async getChannel () {
      const data = await getChannel()
      console.log(data)
      this.channels = data.channels
    }

  },
  created () {
    this.getChannel()
  }
}
</script>

<style lang="less" scoped>
.van-tabs {
  height: 100%;
  display: flex;
  flex-direction: column;
  /deep/ .van-tabs__wrap {
    height: 36px;
    padding-right: 36px;
    .van-tab {
      line-height: 36px;
    }
    .van-tabs__line {
      background-color: #8f7eee;
      height: 2px;
    }
  }
  /deep/ .van-tabs__content {
    flex: 1;
    overflow: hidden;
  }
  /deep/ .van-tab__pane {
    height: 100%;
    .scroll-wrapper {
      height: 100%;
      overflow-y: auto;
    }
  }
}
.bar_btn {
  width: 36px;
  height: 35px;
  position: absolute;
  top: 0;
  right: 0;
  &::before {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 999;
    box-shadow: 0 0 10px #999;
    transform: scale(1, 0.6);
  }
  .van-icon-wap-nav {
    width: 100%;
    height: 100%;
    background: #fff;
    text-align: center;
    line-height: 35px;
    position: relative;
    z-index: 1000;
    &::before {
      font-size: 20px;
    }
  }
}
</style>
