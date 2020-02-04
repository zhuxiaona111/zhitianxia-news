<template>
  <div class="container">
    <van-nav-bar title="登录" left-arrow @click-left="$router.back()"></van-nav-bar>
    <van-cell-group>
      <!-- 手机号 -->
      <van-field
        @blur="checkMobile"
        :error-message="errorMsg.mobile"
        v-model.trim="userForm.mobile"
        label="手机号"
        placeholder="请输入手机号"
      ></van-field>
      <!-- 验证码 -->
      <van-field
        @blur="checkCode"
        :error-message="errorMsg.code"
        v-model.trim="userForm.code"
        label="验证码"
        placeholder="请输入验证码"
      >
        <!-- 验证码按钮 -->
        <van-button
          class="p10"
          slot="button"
          size="mini"
          color="linear-gradient(to right, #4bb0ff, #6149f6)"
        >发送验证码</van-button>
      </van-field>
      <!-- 登录按钮 -->
      <div class="btn-box">
        <van-button
          @click="login"
          color="linear-gradient(to right, #4bb0ff, #6149f6)"
          size="small"
          round
          block
        >登录</van-button>
      </div>
    </van-cell-group>
  </div>
</template>

<script>
import { login } from '@/api/user'
import { mapMutations } from 'vuex'
export default {
  name: 'login',
  data () {
    return {
      userForm: {
        mobile: '18810086387',
        code: '246810'
      },
      errorMsg: {
        mobile: '',
        code: ''
      }
    }
  },
  methods: {
    checkMobile () {
      if (!this.userForm.mobile) {
        this.errorMsg.mobile = '手机号不能为空'
        return false
      }
      if (!/^1[3-9]\d{9}$/.test(this.userForm.mobile)) {
        this.errorMsg.mobile = '手机号格式错误'
        return false
      }
      this.errorMsg.code = '' // 清空信息
      return true
    },
    checkCode () {
      if (!this.userForm.code) {
        this.errorMsg.code = '验证码不能为空'
        return false
      }
      if (!/^\d{6}$/.test(this.userForm.code)) {
        this.errorMsg.code = '验证码必须是六位'
        return false
      }
      this.errorMsg.code = '' // 清空信息
      return true
    },
    ...mapMutations(['updateUser']),
    async login () {
      if (this.checkMobile() && this.checkCode()) {
        const data = await login(this.userForm)
        console.log(data)
        this.updateUser({ user: data })
        this.$gnotify({ type: 'success', message: '登陆成功' })
        let { redirectUrl } = this.$route.query
        this.$router.push(redirectUrl || '/')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.btn-box {
  padding: 20px;
}
</style>
