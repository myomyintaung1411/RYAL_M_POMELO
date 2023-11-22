<template>
    <div class="w-full h-screen relative overflow-y-auto sm:max-w-md sm:mx-auto _bg_img">
      <div class="flex flex-col items-center justify-center h-full w-full px-4">
        <div class="absolute top-20">
          <img src="@/assets/logo.png" alt="logoPng" class="w-20">
        </div>
        <form @click.prevent class=" w-full bg-[#4e6c50] bg-opacity-20  px-5 rounded-lg pb-10">
            <div class="text-center text-xl py-5 font-bold text-white">后台登录</div>
            <div class="flex items-center w-full relative h-12 rounded-md bg-white">
            <div
              class="border-none w-full h-full text-base flex justify-center items-center relative"
            >
              <input
                v-model.trim="loginForm.username"
                type="text"
                maxlength="18"
                min="11"
                minlength="11"
                placeholder="请输入用户名"
                class="input-name text-[#524d4d] bg-transparent placeholder:tracking-wider px-3 border-none outline-none focus:outline-none focus:border-none w-full h-full"
              />
            </div>
          </div>
          <div class="flex items-center w-full relative h-12 rounded-md bg-white mt-5">
            <div
              class="border-none w-full h-full text-base flex justify-center items-center relative"
            >
              <input
                v-model.trim="loginForm.password" autocomplete="off"
                type="password"
                maxlength="30"
                min="6"
                minlength="6"
                placeholder="请输入密码"
                class="input-name text-[#524d4d] bg-transparent placeholder:tracking-wider px-3 border-none outline-none focus:outline-none focus:border-none w-full h-full"
              />
            </div>
          </div>
          <div class="flex items-center w-full relative h-12 rounded-md bg-white mt-5">
            <div
              class="border-none w-full h-full text-base flex justify-center items-center relative"
            >
              <input
                v-model.trim="loginForm.icode" autocomplete="off"
                type="number"
                maxlength="5"
                min="6"
                minlength="6"
                placeholder="请输入密码"
                class="input-name text-[#524d4d] bg-transparent placeholder:tracking-wider px-3 border-none outline-none focus:outline-none focus:border-none w-full h-full"
              />
              <div class="absolute right-0 h-full  " @click="refreshCode">
                <Identify :identify-code="identifyCode" />
              </div>
            </div>
          </div>
          <div class="flex items-center w-full relative  rounded-md  mt-5 text-white">
            <van-checkbox checked-color="#0ba360" v-model="checked" shape="square" style="color:#fff !important" class="text-white tracking-widest" >自动登录</van-checkbox>
          </div>

          <div class="mt-5 flex items-center w-full relative text-base">
            <van-button
            @click.native.prevent="handleLogin"
              :loading="loading"
              class="back_muli rounded "
              style="
                background-color: #4e6c50;
                border: none;
                color: #fff;
                height: 50px;
                font-size: 16px;
                letter-spacing: 1px;
                width: 100%;
              "
            >
            登录
            </van-button>
          </div>
        </form>
      </div>
      <!-- <Gauth ref="gRef" :g-data="gData" @AuthEmit="AuthEmit" /> -->
    </div>
  </template>
  
  <script>
import { setAutoLogin, setHtInfo, getAutoLogin } from '@/utils/auth'
import Identify from "../../components/Identity/index.vue"
// import AgentTree from '@/components/AgentTree'
import { mapGetters } from 'vuex'
import { debounce } from '@/utils/index'
import AES from '@/api/aes'

export default {
  name: 'Login',
  components: {
    Identify
    // AgentTree
  },
  data() {
    return {
      loginForm: {
        username: 'zikeAD',
        password: '123zzz',
        icode: ''
      },
      passwordType: 'password',
      // 图片验证码
      identifyCode: '',
      // 验证码规则
      identifyCodes: '123567890',
      capsTooltip: false,
      loading: false,
      showDialog: false,
      redirect: undefined,
      otherQuery: {},
      checked: true,
      showGDialog: false,
      gloading: false,
      ga_code: '',
      terminal: ''
      // m_login_logo: require('../../assets/images/m_login_logo.png')
    }
  },
  computed: {
    ...mapGetters([
      'agentTree',
      'token'
    ])
  },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  created() {
    console.log('login created:::::::::::::::::::::')
    // window.addEventListener('storage', this.afterQRScan)
    if (localStorage._SinDds_ && getAutoLogin()) {
      // const info = getHtInfo()
      // this.localLogin(JSON.parse(info))
    } else {
      localStorage.removeItem('_SinDds_')
    }
  },
  mounted() {
    console.log('login mounted::::::::::::::::')
    if (this.loginForm.username === '') {
      this.$refs.username.focus()
    } else if (this.loginForm.password === '') {
      this.$refs.password.focus()
    }
    this.identifyCode = ''
    this.makeCode(this.identifyCodes, 4)
    // 设置登录时的，系统默认语言
  },
  destroyed() {
    // window.removeEventListener('storage', this.afterQRScan)
  },
  methods: {
    checkCapslock(e) {
      const { key } = e
      this.capsTooltip = key && key.length === 1 && (key >= 'A' && key <= 'Z')
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min)
    },
    // 切换验证码
    refreshCode() {
      this.identifyCode = ''
      this.makeCode(this.identifyCodes, 4)
    },
    // 生成随机验证码
    makeCode(o, len) {
      for (let i = 0; i < len; i++) {
        this.identifyCode += this.identifyCodes[this.randomNum(0, this.identifyCodes.length)]
      }
    },
    downApp() {
      const ua = navigator.userAgent
      // Android终端
      const isAndroid = ua.indexOf('Android') > -1 || ua.indexOf('Adr') > -1
      // Ios终端
      const isiOS = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
      if (isAndroid) {
        this.terminal = 'ht-android'
      } else if (isiOS) {
        this.terminal = 'ht-ios'
      } else {
        this.terminal = 'ht-pc'
      }
    },
    handleLogin: debounce(function() {

      if(this.loginForm.username == '' || this.loginForm.password == '' || this.loginForm.icode == '') return this.$toast('请输入完整的登录信息')
      if (this.loginForm.icode.toLowerCase() !== this.identifyCode.toLowerCase()) {
        this.identifyCode = ''
        this.makeCode(this.identifyCodes, 4)
        this.$toast('提示: 验证码不正确!')
      }
          this.downApp()
          this.loading = true
          const sendStr = {
            router: 'Login',
            JsonData: { name: this.loginForm.username, password: this.$md5(this.loginForm.password), ip: '', terminal: this.terminal || 'ht-pc' }
          }
          this.$toast.loading({
            message: '请稍后...',
            forbidClick: true,
            duration: 2000,
        })
          // console.log('sendStr ', sendStr)
          this.$store.dispatch('user/login', sendStr)
            .then((msg) => {
              this.$pomelo.conn((err, res) => {
                if (err) console.error(err)
                if (res.code === 200) {
                  const en = this.$Global.en
                  this.$Global.Pass = this.loginForm.password
                  const _XForIn_ = { account: this.loginForm.username, password: this.loginForm.password }
                  if (this.checked) {
                    setHtInfo(AES.encrypt(JSON.stringify(_XForIn_), en))
                    setAutoLogin('true')
                  }
                  // this.$nextTick(() => {
                  //   this.$refs.agentTree.getRelations()
                  // })
                  this.$store.dispatch('user/getRelations')
                  // this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
                  if (msg.JsonData.securityLevel === 1 && msg.JsonData.gauth === 1) {
                    this.$router.push({ path: '/google-auth-login' })
                  } else {
                    this.$router.push({ path: '/dashboard' })
                  }
                  // this.$router.push({ path: '/dashboard' })
                  this.loading = false
                }
              })
              setTimeout(() => {
                this.loading = false
              }, 1000)
              this.refreshCode()
            })
            .catch(() => {
              this.loading = false
              this.refreshCode()
            })
        

    }, 500, true),
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    },
    localLogin(info) {
      this.loading = true
      const sendStr = {
        router: 'Login',
        JsonData: { name: info.account, password: this.$md5(info.password), ip: '', terminal: 'pc' }
      }
      this.$store.dispatch('user/login', sendStr)
        .then(() => {
          this.$pomelo.conn((err, res) => {
            if (err) console.error(err)
            if (res.code === 200) {
              this.$Global.Pass = info.password
              // this.$nextTick(() => {
              //   this.$refs.agentTree.getRelations()
              // })
              this.$store.dispatch('user/getRelations')
              this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
              this.loading = false
            }
          })
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    }
  }
}
</script>

  
  <style scoped>
  ._bg_img{
    background-image: url(@/assets/login.jpg);
    background-size: 100% 100%;
    /* width: 100%; */
    background-repeat: no-repeat;
  }

  </style>

  <style>
  .van-checkbox__label{
    color: #fff;
  }
</style>
  