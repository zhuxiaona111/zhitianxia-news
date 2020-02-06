<template>
 <div class="container">
    <van-nav-bar left-arrow @click-left="$router.back()" title="编辑资料" right-text="保存" ></van-nav-bar>
    <van-cell-group>
      <van-cell is-link title="头像"  center>
        <van-image
          slot="default"
          width="1.5rem"
          height="1.5rem"
          fit="cover"
          round
          src="https://img.yzcdn.cn/vant/cat.jpeg"
          @click="showPhoto=true"
        />
      </van-cell>
      <van-cell @click="showName=true" is-link title="名称" :value="user.name" />
      <van-cell @click="showGender=true" is-link title="性别" :value="user.gender ===0?'男':'女'"/>
      <van-cell @click="showBirthday=true" is-link title="生日" :value="user.birthday" />
    </van-cell-group>
    <!-- 头像弹层 -->
    <van-popup v-model="showPhoto" style="width:80%">
      <van-cell is-link title="本地相册"></van-cell>
      <van-cell is-link title="拍照"></van-cell>
    </van-popup>
    <!-- 昵称弹层 -->
    <van-popup v-model="showName" style="width:80%">
      <van-field label="名字"  type="textarea" v-model="user.name"  rows="4"></van-field>
    </van-popup>
    <!-- 性别选择弹层 -->
    <van-action-sheet :actions="actions" cancel-text="取消" v-model="showGender"></van-action-sheet>
  <!-- 日期选择弹层 -->
  <van-popup v-model="showBirthday" position="bottom">
    <van-datetime-picker
  v-model="currentDate"
  type="date"
  :min-date="minDate"
/>
  </van-popup>
  </div>
</template>

<script>
export default {
  name: 'profile',
  data () {
    return {
      minDate: new Date(1900, 1, 1), // 最小时间
      // maxDate: new Date(2020, 10, 1), // 最大时间
      currentDate: new Date(), // 当前时间
      showPhoto: false, // 是否显示显示头像编辑弹层
      showName: false, // 是否显示编辑昵称弹层
      showGender: false,
      showBirthday: false,
      user: {
        name: '123',
        gender: 0,
        birthday: '2019-08-08'
      },
      actions: [{ name: '男' }, { name: '女' }]
    }
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
</style>
