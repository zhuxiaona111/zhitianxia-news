<template>
  <div class="channel-edit">
    <div class="channel">
      <div class="tit">
        我的频道：
        <span class="tip">点击可进入频道</span>
        <van-button v-if="!editing" @click="editing=true" size="mini" type="info" plain>编辑</van-button>
        <van-button v-else @click="editing=false" size="mini" type="danger" plain>完成</van-button>
      </div>
      <van-grid class="van-hairline--left">
        <van-grid-item v-for="(channel,i) in channels" :key="channel.id">
          <span :class="{red:i===activeIndex}" @click="$emit('selectChannel',channel.id)" class="f12">{{channel.name}}</span>
          <van-icon v-if="i!=0" v-show="editing" class="btn" name="cross"></van-icon>
        </van-grid-item>
      </van-grid>
    </div>
    <div class="channel">
      <div class="tit">可选频道：</div>
      <van-grid class="van-hairline--left">
        <van-grid-item v-for="channel in optionChannels" :key="channel.id">
          <span class="f12" @click="$emit('selectChannel',item.id)">{{channel.name}}</span>
          <van-icon class="btn" name="plus"></van-icon>
        </van-grid-item>
      </van-grid>
    </div>
  </div>
</template>

<script>
import { getMyChannel } from '@/api/channel'
export default {
  props: {
    channels: {
      type: Array,
      default: () => []
    },
    activeIndex: {
      type: Number
    }
  },
  data () {
    return {
      editing: false,
      allChannels: []

    }
  },
  methods: {
    async getMyChannel () {
      // console.log(this.channels)
      const data = await getMyChannel()
      this.allChannels = data.channels
    }
  },
  computed: {
    optionChannels () {
      return this.allChannels.filter(item => !this.channels.some(o => o.id === item.id))
    }
  },
  created () {
    this.getMyChannel()
    // console.log(this.channels)
  }
}
</script>

<style lang="less" scoped>
.channel-edit {
  .channel {
    padding: 10px;
    .tit {
      line-height: 3;
      .tip {
        font-size: 10px;
        color: #999;
      }
    }
    .van-button {
      float: right;
      margin-top: 7px;
    }
    .btn {
      position: absolute;
      bottom: 0;
      right: 0;
      background: #ddd;
      font-size: 12px;
      color: #fff;
    }
    .f12 {
      font-size: 12px;
      color: #555;
    }
    .red {
      color: red;
    }
  }
}
</style>
