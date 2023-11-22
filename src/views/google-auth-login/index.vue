<template>
  <!-- <div class="login-container">
    <el-dialog
      v-el-drag-dialog
      title="请输入谷歌验证器里生成的数字"
      :visible.sync="showGDialog"
      :close-on-click-modal="false"
      :show-close="false"
      width="450px"
    >

      <input v-model="ga_code" class="cus_input" placeholder="请输入谷歌验证码">

      <el-button type="primary" :loading="gloading" @click="authLogin()">提交</el-button>
      <el-button type="danger" :loading="gloading" @click="logout()">退出</el-button>

    </el-dialog>
  </div> -->

  <van-popup  v-model="showGDialog" @click-close-icon="close"  closeable
      position="bottom"
      :style="{ height: '40%' }">
        <div class="px-3 py-10 w-full relative">
            <span class="font-bold text-lg">您确认要移除验证登录吗？</span>
            <form @click.prevent class="w-full rounded-lg flex flex-col justify-center items-center pt-3 ">
        <div class="flex items-center w-full relative h-12 rounded-md bg-[#dddddd] px-5">
            <div
              class="border-none w-full h-full text-base flex justify-center items-center relative"
            >
              <input
                v-model.trim="ga_code"
                type="text" autocomplete="off"
                maxlength="11"
                min="11"
                minlength="11"
                placeholder="请输入谷歌验证码"
                class="input-name text-[#524d4d] bg-transparent placeholder:tracking-wider px-3 border-none outline-none focus:outline-none focus:border-none w-full h-full"
              />
            </div>
          </div>
          <div class="mt-5 flex items-center w-full relative text-base">
            <van-button
             :loading="gloading"
             :disabled="gloading"
              class="rounded"
              style="
                background-color: #4e6c50;
                border: none;
                color: #fff;
                height: 50px;
                font-size: 16px;
                letter-spacing: 1px;
                width: 100%;
              "
              @click="authLogin"
            >
            确认
            </van-button>
          </div>
        </form>
        </div>

    </van-popup>
</template>

<script>
import { setGoogleAuth } from '@/utils/auth'
// import AgentTree from '@/components/AgentTree'
import { mapGetters, mapState } from 'vuex'
// import AES from '@/api/aes'

export default {
  name: 'GoogleAuthLogin',
  data() {
    return {
      showGDialog: true,
      gloading: false,
      ga_code: ''
    }
  },
  computed: {
    ...mapGetters([
      'agentTree',
      'token'
    ]),
    ...mapState({
      isSub: state => state.user.isSubAccount,
      subInfo: state => state.user.subInfo
    })
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
    // if (getGoogleAuth()) {
    //   const info = getHtInfo()
    //   this.localLogin(JSON.parse(info))
    // } else {
    //   localStorage.removeItem('_SinDds_')
    // }
  },
  destroyed() {
    // window.removeEventListener('storage', this.afterQRScan)
  },
  methods: {
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
    },
    authLogin() {
      if (this.ga_code === '') return this.$toast('请输入谷歌验证器数码')
      if (this.ga_code.toString().length !== 6) return this.$toast('谷歌验证器数码不正确')

      const data = {
        username: this.isSub ? this.subInfo.name : this.$Global.optioner.UserName,
        Id: this.isSub ? this.subInfo.id : this.$Global.optioner.Id,
        userId: this.isSub ? this.subInfo.id : this.$Global.optioner.Id,
        level: this.isSub ? 4 : this.$Global.optioner.level,
        token: this.$Global.optioner.token,
        code: this.ga_code
      }
      this.$toast.loading({
            message: '请稍后...',
            forbidClick: true,
            duration: 2000,
        })
      // console.log('send data ', data)
      this.$store.dispatch('user/googleLogin', data).then(res => {
        if (res?.JsonData?.result === 'ok') {
          this.showGDialog = false
          this.$toast('验证成功')
          setGoogleAuth(true)
          setTimeout(() => {
            this.$router.push({ path: '/dashboard' })
          }, 1000)
        } else {
          this.$toast(res?.JsonData?.msg || '验证失败')
        }
      }).catch(e => {
        console.error(e)
      })
    },
    close() {
      this.$store.dispatch('user/logout')
      this.$router.push(`/login`)
    }
  }
}
</script>
