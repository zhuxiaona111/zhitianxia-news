<template>
  <div class="container">
    <van-nav-bar fixed title="文章详情" left-arrow @click-left="$router.back()" />
    <div class="detail">
      <h3 class="title">{{article.title}}</h3>
      <div class="author">
        <van-image
          round
          width="1rem"
          height="1rem"
          fit="fill"
          src="https://img.yzcdn.cn/vant/cat.jpeg"
        />
        <div class="text">
          <p class="name">{{article.aut_name}}</p>
          <p class="time">{{article.pubdate | relTime}}</p>
        </div>
        <van-button @click="follow()" round size="small" color="linear-gradient(to right, #4bb0ff, #6149f6)">{{article.is_followed?'已关注':'+ 关注'}}</van-button>
      </div>
      <div class="content">
        <p v-html="article.content"></p>
      </div>
      <div class="zan">
        <van-button round size="small" class="active" plain icon="like-o">点赞</van-button>&nbsp;&nbsp;&nbsp;&nbsp;
        <van-button round size="small" plain icon="delete">不喜欢</van-button>
      </div>
    </div>
    <comment></comment>
  </div>
</template>

<script>
import { getArticlesDetial } from '@/api/articles'
import { followUser, unFollowUser } from '@/api/user'
import Comment from './component/comment'
export default {
  name: 'articles',
  components: {
    Comment
  },
  data () {
    return {
      article: []
    }
  },
  methods: {
    async follow () {
      try {
        if (this.article.is_followed) {
          await unFollowUser(this.article.aut_id)
        } else {
          await followUser({ target: this.article.aut_id })
        }
        this.article.is_followed = !this.article.is_followed
        this.$gnotify({ type: 'success', message: '操作成功' })
      } catch (error) {
        this.$gnotify({ type: 'danger', message: '操作失败' })
      }
    },
    async getArticlesDetial () {
      const { articleId } = this.$route.query
      this.article = await getArticlesDetial(articleId)
      // console.log(this.article)
    }
  },
  created () {
    this.getArticlesDetial()
  }
}
</script>

<style lang="less" scoped>
.container {
  height: 100%;
  overflow-y: auto;
  box-sizing: border-box;
}
.detail {
  padding: 46px 10px 44px;
  .title {
    font-size: 18px;
    line-height: 2;
  }
  .zan {
    text-align: center;
    padding: 10px 0;
    .active {
      border-color: red;
      color: red;
    }
  }
  .author {
    padding: 10px 0;
    display: flex;
    position: sticky;
    background-color: #fff;
    top: 46px;
    .text {
      flex: 1;
      padding-left: 10px;
      line-height: 1.5;
      .name {
        font-size: 14px;
        margin: 0;
      }
      .time {
        margin: 0;
        font-size: 12px;
        color: #999;
      }
    }
  }
  .content {
    padding: 20px 0;
    overflow: hidden;
    white-space: pre-wrap;
    word-break: break-all;
    /deep/ img {
      max-width: 100%;
      background: #f9f9f9;
    }
    /deep/ code {
      white-space: pre-wrap;
    }
  }
}
</style>
