<template>
  <div class="container">
    <van-tabs v-model="activeIndex" animated>
      <!-- 导航菜单 -->
      <van-tab v-for="channel in channels" :title="channel.name" :key="channel.id">
        <!-- 菜单下面的内容 -->
        <article-list :channel_id="channel.id" @openAction="openAction"></article-list>
      </van-tab>
    </van-tabs>
    <span class="bar_btn" @click="showChannelEdit =true">
      <van-icon name="wap-nav" />
    </span>
    <van-popup :style="{ width: '80%' }" v-model="showMoreAction">
      <more-action @dislike="dislikeOrReport($event,'dislike')" @report="dislikeOrReport($event,'report')"></more-action>
    </van-popup>
    <van-action-sheet :round="false" title="编辑频道" v-model="showChannelEdit">
      <channel-edit></channel-edit>
 </van-action-sheet><channel-edit v-model="showChannelEdit"></channel-edit>
  </div>
</template>

<script>
import ArticleList from './component/articlelist'
import { getChannel } from '@/api/channel'
import MoreAction from './component/moreAction'
import { dislikeArt, reportArt } from '@/api/articles'
import eventBus from '@/utils/eventBus'
import ChannelEdit from './channel-edit'
export default {
  name: 'home',
  components: {
    ArticleList,
    MoreAction,
    ChannelEdit
  },
  data () {
    return {
      activeIndex: '',
      upLoading: false,
      finished: false,
      channels: [],
      showMoreAction: false,
      articleId: null,
      showChannelEdit: false// 是否显示编辑频道
    }
  },
  methods: {
    async getChannel () {
      const data = await getChannel()
      // console.log(data)
      this.channels = data.channels
    },
    openAction (artId) {
      this.showMoreAction = true
      this.articleId = artId
      // console.log(this.articleId)
    },
    // 不喜欢
    async dislikeOrReport (params, operatetype) {
      try {
        if (this.articleId) {
          operatetype === 'dislike'
            ? await dislikeArt({
              target: this.articleId
            }) : await reportArt({
              target: this.articleId,
              type: params
            })
          this.$gnotify({ type: 'success', message: '操作成功' })
          eventBus.$emit('delArticle', this.articleId, this.channels[this.activeIndex].id)
          this.showMoreAction = false
        }
      } catch (error) {
        this.$gnotify({ type: 'danger', message: '操作失败' })
      }
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
.van-action-sheet {
  max-height: 100%;
  height: 100%;
  .van-action-sheet__header {
    background: #3296fa;
    color: #fff;
    .van-icon-close {
      color: #fff;
    }
  }
}
</style>
