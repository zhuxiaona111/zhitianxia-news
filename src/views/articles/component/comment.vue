<template>
  <div class="comment">
    <van-list @load="onLoad" v-model="loading" :finished="finished" finished-text="没有更多了">
      <div class="item van-hairline--bottom van-hairline--top" v-for="comment in comments" :key="comment.com_id.toString()">
        <van-image
          round
          width="1rem"
          height="1rem"
          fit="fill"
          :src="comment.aut_photo"
        />
        <div class="info">
          <p>
            <span class="name">{{ comment.aut_name }}</span>
            <span style="float:right">
              <span class="van-icon van-icon-good-job-o zan"></span>
              <span class="count">{{ comment.like_count }}</span>
            </span>
          </p>
          <p>{{ comment.content }}</p>
          <p>
            <span class="time">{{ comment.pubdate | relTime }}</span>&nbsp;
            <van-tag plain @click="openReply(comment.com_id)">{{ comment.reply_count }} 回复</van-tag>
          </p>
        </div>
      </div>
    </van-list>
     <!-- 回复 -->
    <van-action-sheet :round="false"  v-model="showReply" class="reply_dailog" title="回复评论">
      <van-list @load="getReply" :immediate-check="false" v-model="reply.loading" :finished="reply.finished" finished-text="没有更多了">
        <div class="item van-hairline--bottom van-hairline--top" v-for="item in reply.list" :key="item.com_id.toString()">
          <van-image round width="1rem" height="1rem" fit="fill" :src="item.aut_photo" />
          <div class="info">
            <p><span class="name">{{item.aut_name}}</span></p>
            <p>{{item.content}}</p>
            <p><span class="time">{{item.pubdate | relTime}}</span></p>
          </div>
        </div>
      </van-list>
    </van-action-sheet>
    <div class="reply-container van-hairline--top">
      <van-field v-model="value" placeholder="写评论...">
        <van-loading v-if="submiting" slot="button" type="spinner" size="16px"></van-loading>
        <span class="submit" v-else slot="button">提交</span>
      </van-field>
    </div>
  </div>
</template>

<script>
import { getComments } from '@/api/articles'
export default {
  name: 'comment',
  data () {
    return {
      loading: false,
      finished: false,
      value: '',
      submiting: false,
      comments: [],
      offset: null,
      showReply: false,
      reply: {
        loading: false,
        finished: false,
        offset: null,
        list: [],
        commentId: null
      }
    }
  },
  methods: {
    async onLoad () {
      // console.log('加载数据')
      let data = await getComments({
        type: 'a',
        offset: this.offset,
        source: this.$route.query.articleId
      })
      this.comments.push(...data.results)
      this.loading = false
      this.finished = data.last_id === data.end_id
      if (!this.finished) {
        this.offset = data.last_id
      }
    },
    openReply (commentId) {
      this.showReply = true
      this.reply.commentId = commentId
      this.reply.finished = false
      this.reply.loading = true
      this.reply.list = []
      this.reply.offset = null
      this.getReply()
    },
    async getReply () {
      const data = await getComments({ source: this.reply.commentId.toString(), type: 'c', offset: this.reply.offset })
      console.log(data)
      this.reply.list.unshift(...data.results)
      this.reply.loading = false
      if (data.end_id < data.last_id) {
        this.reply.offset = data.last_id
      } else {
        this.reply.finished = true
      }
    }
  }
}
</script>

<style lang='less' scoped>
.comment {
  margin-top: 10px;
  /deep/ .item {
    display: flex;
    padding: 10px 0;
    .info {
      flex: 1;
      padding-left: 10px;
      .name{
        color:#069;
      }
      .zan{
        vertical-align:middle;
        padding-right:2px;
      }
      .count{
        vertical-align:middle;
        font-size:10px;
        color: #666;
      }
      .time{
        color: #666;
      }
      p {
        padding: 5px 0;
        margin: 0;
      }
    }
  }
  /deep/ .van-button:active::before {
    background: transparent;
  }
}
.reply-container {
  position: fixed;
  left: 0;
  bottom: 0;
  height: 44px;
  width: 100%;
  background: #f5f5f5;
  z-index: 9999;
  .submit {
    font-size: 12px;
    color: #3296fa;
  }
}
.reply_dailog {
  height: 100%;
  max-height: 100%;
  display: flex;
  overflow: hidden;
  flex-direction: column;
  .van-action-sheet__header {
    background: #3296fa;
    color: #fff;
    .van-icon-close {
      color: #fff;
    }
  }
  .van-action-sheet__content{
    flex: 1;
    overflow-y: auto;
    padding: 0 10px 44px;
  }
}
</style>
