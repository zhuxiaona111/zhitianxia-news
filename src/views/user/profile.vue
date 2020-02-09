<template>
  <div class="container">
    <van-nav-bar left-arrow @click-left="$router.back()" title="编辑资料" right-text="保存"></van-nav-bar>
    <van-cell-group>
      <van-cell is-link title="头像" center>
        <van-image
          slot="default"
          width="1.5rem"
          height="1.5rem"
          fit="cover"
          round
          :src="user.photo"
          @click="showPhoto=true"
        />
      </van-cell>
      <van-cell @click="showName=true" is-link title="名称" :value="user.name" />
      <van-cell @click="showGender=true" is-link title="性别" :value="user.gender ===0?'男':'女'" />
      <van-cell @click="showDate" is-link title="生日" :value="user.birthday" />
    </van-cell-group>
    <!-- 头像弹层 -->
    <van-popup v-model="showPhoto" style="width:80%">
      <van-cell @click="openChangeFile" is-link title="本地相册"></van-cell>
      <van-cell is-link title="拍照"></van-cell>
    </van-popup>
     <input ref="file" @change="upload()" type="file" style="display:none" />

    <!-- 昵称弹层 -->
    <van-popup round :close-on-click-overlay="false" v-model="showName" style="width:80%">
      <van-field
        :errorMessage="nameMssage"
        placeholder="请输入用户名"
        label="名字"
        type="textarea"
        v-model.trim="user.name"
        rows="4"
      ></van-field>
      <van-button
        @click="btnName"
        color="linear-gradient(to right, #4bb0ff, #6149f6)"
        size="large"
      >确定</van-button>
    </van-popup>
    <!-- 性别选择弹层 -->
    <van-action-sheet @select="selectItem" :actions="actions" cancel-text="取消" v-model="showGender"></van-action-sheet>
    <!-- 日期选择弹层 -->
    <van-popup v-model="showBirthday" position="bottom">
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        :min-date="minDate"
        @cancel="showBirthDay=false"
        @confirm="confirmDate"
      />
    </van-popup>
  </div>
</template>

<script>
import { getUserProfile, updateImg } from '@/api/user'
import dayjs from 'dayjs'
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
      actions: [{ name: '男' }, { name: '女' }],
      nameMssage: ''
    }
  },
  created () {
    this.getUserProfile()
  },
  methods: {
    selectItem (item) {
      // console.log(item)
      this.user.gender = item.name === '男' ? 0 : 1
      this.showGender = false
    },
    btnName () {
      if (this.user.name.length < 1 || this.user.name.length > 7) {
        this.nameMssage = '您的用户昵称不符合1-7的长度要求'
        return false
      }
      this.nameMssage = ''
      this.showName = false
    },
    confirmDate (data) {
      this.user.birthday = dayjs(data).format('YYYY-MM-DD')
      this.showBirthday = false
    },
    showDate () {
      this.currentDate = new Date(this.user.birthday)
      this.showBirthday = true
    },
    async getUserProfile () {
      let data = await getUserProfile()
      // console.log(data)
      this.user = data
    },
    openChangeFile () {
      this.$refs.file.click()
    },
    async upload () {
      let data = new FormData()
      data.append('photo', this.$refs.file.files[0])
      let result = await updateImg(data)
      this.user.photo = result.photo
      this.showPhoto = false
    }

  }
}
</script>

<style lang="less" scoped>
</style>
