<template>
  <div class="w-full h-full pb-10 relative">
    <div class="h-full pt-2 px-3 pb-3">
      <!-- <div class="flex justify-end items-center w-full space-x-2">
        <button @click="requestGAuth"
          class="outline-none px-3 py-1 bg-red-500 text-white text-sm rounded tracking-wider"
        >
          立即绑定
        </button>
        <button
          @click="change_pass_dialog = true"
          class="outline-none px-3 py-1 bg-[#4e6c50] text-white text-sm rounded tracking-wider"
        >
          修改登录密码
        </button>
        <van-icon @click="logout" name="info" size="25" color="#4e6c50" />
      </div> -->
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-2  text-[#4e6c50] font-semibold"> 
          <img src="@/assets/logo.png" alt="logo" class="w-9">
          <span>管 理</span>
        </div>
        <van-badge v-if="info.gx.split('^').length <= 3" :content="count" max="9" >
          <div @click="goTo()" class="text-sm tracking-wider text-[#4e6c50] font-semibold pt-1">未处理提现</div>
        <!-- <el-button size="small" type="text" @click="goTo()">未处理提现</el-button> -->
        </van-badge>

      </div>
      <div class="py-2 w-full">
        <van-notice-bar
          left-icon="info-o"
          scrollable
          text="为了保护您的账号和资金安全, 请不要设置过于简单的密码
      例如：888888/111111/12345678/和用户名相同等...
      请使用 英文字母大小写+数字+特殊字符串(8位数以上)
      建议您 15天 更换一次密码 ( 密码不要过于简单哦 )"
          color="#4e6c50"
          background="#fff"
        />
      </div>

      <section class="pt-2 relative">
        <van-row gutter="10">
          <van-col span="12">
            <div
            
              class="grident_bg px-2 h-20 items-center space-y-1 rounded flex flex-col text-white justify-center"
            >
              <p class="text-base">代理总数</p>
              <p>{{ deshBoard.total_agent || 0 }}</p>
            </div>
          </van-col>
          <van-col span="12">
            <div
             
              class="grident_bg px-2 h-20 items-center rounded  text-white flex flex-col justify-center"
            >
              <p class="text-base">今日新增代理数</p>
              <p>{{ deshBoard.today_inc_agent || 0 }}</p>
            </div>
          </van-col>
        </van-row>
        <div class="py-3">
          <van-row gutter="10">
            <van-col span="12">
              <div
              
                class="grident_bg px-2 h-20 items-center text-white rounded flex flex-col justify-center"
              >
                <p class="text-base">会员总数</p>
                
                <p>{{ deshBoard.total_player || 0 }}</p>
              </div>
            </van-col>
            <van-col span="12">
              <div
               
                class="grident_bg px-2 h-20 items-center rounded  flex flex-col justify-center text-white"
              >
                <p class="text-base">今日新增会员数</p>
                <p>{{ deshBoard.today_inc_player || 0 }}</p>
              </div>
            </van-col>
          </van-row>
        </div>
      </section>
     

      <div class="py-2 w-full">
        <span class="text-base tracking-wide text-[#4e6c50] font-bold"> 账号信息</span>
        <section class="py-2">
          <div class="py-2 w-full px-3 bg-white shadow">
            <div class="flex items-center w-full">
              <div class="w-[100px] text-sm text-[#4e6c50]">账号</div>
              <div>{{ info.username }}</div>
            </div>
          </div>
          <div class="py-2 w-full px-3 bg-white shadow">
            <div class="flex items-center w-full">
              <div class="w-[100px] text-sm text-[#4e6c50]">余额</div>
              <div>{{ info.ye | toThousandFilter }}</div>
            </div>
          </div>
          <div class="py-2 w-full px-3 bg-white shadow">
            <div class="flex items-center w-full">
              <div class="w-[100px] text-sm text-[#4e6c50]">占成比</div>
              <div>{{ info.zc }}</div>
            </div>
          </div>
          <div class="py-2 w-full px-3 bg-white shadow">
            <div class="flex items-center w-full">
              <div class="w-[100px] text-sm text-[#4e6c50]">洗码比</div>
              <div>{{ info.xmb_s }}</div>
            </div>
          </div>
          <div class="py-2 w-full px-3 bg-white shadow">
            <div class="flex items-center w-full">
              <div class="w-[100px] text-sm text-[#4e6c50]">登录IP</div>
              <div> {{ info.loginip }}</div>
            </div>
          </div>
        </section>
      </div>
      <section class=" py-1 relative">
        <div @click="goSetting(1)" class="flex items-center justify-between px-3 py-3 tracking-wider bg-white shadow rounded">
          <div class="flex items-center space-x-2">
            <img src="@/assets/settings.svg" alt="settings" class="w-7">
            <span>公共设置</span>
          </div>
          <span>
            <van-icon name="arrow" color="#0ba360"></van-icon>
          </span>
        </div>
        <div @click="goSetting(2)" class="flex items-center justify-between px-3 py-3 tracking-wider bg-white shadow rounded mt-2">
          <!-- <span>客服绑定</span>
          <span>
            <van-icon name="arrow" color="#0ba360"></van-icon>
          </span> -->
          <div class="flex items-center space-x-2">
            <img src="@/assets/msg.svg" alt="settings" class="w-7">
            <span>客服绑定</span>
          </div>
          <span>
            <van-icon name="arrow" color="#0ba360"></van-icon>
          </span>
        </div>
        <div @click="goSetting(3)" class="flex items-center justify-between px-3 py-3 tracking-wider bg-white shadow rounded mt-2">
          <div class="flex items-center space-x-2">
            <img src="@/assets/query.svg" alt="settings" class="w-7">
            <span>路单查询</span>
          </div>
          <span>
            <van-icon name="arrow" color="#0ba360"></van-icon>
          </span>
        </div>
        <div v-if="!info.googleAuthSecret" @click="requestGAuth" class="flex items-center justify-between px-3 py-3 tracking-wider bg-white shadow rounded mt-2">
          <div class="flex items-center space-x-2">
            <img src="@/assets/auth.svg" alt="settings" class="w-7">
            <span>立即绑定</span>
          </div>
          <span>
            <van-icon name="arrow" color="#0ba360"></van-icon>
          </span>
        </div>
        <div  v-else @click="cancelGAuth" class="flex items-center justify-between px-3 py-3 tracking-wider bg-white shadow rounded mt-2">
          <div class="flex items-center space-x-2">
            <img src="@/assets/auth.svg" alt="settings" class="w-7">
            <span>取消验证</span>
          </div>
          <span>
            <van-icon name="arrow" color="#0ba360"></van-icon>
          </span>
        </div>

        <div @click="change_pass_dialog = true" class="flex items-center justify-between px-3 py-3 tracking-wider bg-white shadow rounded mt-2">
          <div class="flex items-center space-x-2">
            <img src="@/assets/lock.svg" alt="settings" class="w-7">
            <span>修改登录密码</span>
          </div>
          <span>
            <van-icon name="arrow" color="#0ba360"></van-icon>
          </span>
        </div>

        <div @click="logout" class="flex items-center justify-between px-3 py-3 tracking-wider bg-white shadow rounded mt-2">
          <div class="flex items-center space-x-2">
            <img src="@/assets/logout.svg" alt="settings" class="w-7">
            <span>退出登录</span>
          </div>
          <span>
            <van-icon name="arrow" color="#0ba360"></van-icon>
          </span>
        </div>

      </section>
    </div>
    <van-popup
      v-model="change_pass_dialog"
      closeable
      position="bottom"
      :style="{ height: '50%' }"
    >
      <div class="py-10 px-5 w-full relative">
        <form @click.prevent class="w-full rounded-lg">
          <div class="pb-1">原始密码</div>
          <div class="flex items-center w-full relative h-12 rounded-md bg-[#dddddd]">
            <div
              class="border-none w-full h-full text-base flex justify-center items-center relative"
            >
              <input
                v-model.trim="oldPass"
                type="text" autocomplete="off"
                maxlength="18"
                min="11"
                minlength="11"
                placeholder="请输入原始密码"
                class="input-name text-[#524d4d] bg-transparent placeholder:tracking-wider px-3 border-none outline-none focus:outline-none focus:border-none w-full h-full"
              />
            </div>
          </div>
          <div class="pt-3 pb-1">新密码</div>
          <div class="flex items-center w-full relative h-12 rounded-md bg-[#dddddd]">
            <div
              class="border-none w-full h-full text-base flex justify-center items-center relative"
            >
              <input
                v-model.trim="newpass"
                type="text" autocomplete="off"
                maxlength="18"
                min="11"
                minlength="11"
                placeholder="请输入新密码"
                class="input-name text-[#524d4d] bg-transparent placeholder:tracking-wider px-3 border-none outline-none focus:outline-none focus:border-none w-full h-full"
              />
            </div>
          </div>
          <div class="pt-3 pb-1">确认密码</div>
          <div class="flex items-center w-full relative h-12 rounded-md bg-[#dddddd]">
            <div
              class="border-none w-full h-full text-base flex justify-center items-center relative"
            >
              <input
                v-model.trim="confirmpass"
                type="text" autocomplete="off"
                maxlength="18"
                min="11"
                minlength="11"
                placeholder="请输入确认密码"
                class="input-name text-[#524d4d] bg-transparent placeholder:tracking-wider px-3 border-none outline-none focus:outline-none focus:border-none w-full h-full"
              />
            </div>
          </div>
          <div class="mt-5 flex items-center w-full relative text-base">
            <van-button
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
              @click="changePass"
            >
              登录
            </van-button>
          </div>
        </form>
      </div>
    </van-popup>

    <van-popup  v-model="bindAuth_dialog" closeable
      position="bottom"
      :style="{ height: '50%' }">
        <div class="px-3 py-10 w-full relative">
            <span class="font-bold text-lg">绑定谷歌验证器</span>
            <form @click.prevent class="w-full rounded-lg flex flex-col justify-center items-center ">
       <div class="p-3 rounded bg-[#cec9c9] my-3">
        <img :src="gData.url" alt="image" class="h-40">
       </div>
        <div class="flex items-center w-full relative h-12 rounded-md bg-[#dddddd] px-5">
            <div
              class="border-none w-full h-full text-base flex justify-center items-center relative"
            >
              <input
                v-model.trim="bind_code"
                type="text" autocomplete="off"
                maxlength="18"
                min="11"
                minlength="11"
                placeholder="请输入验证码"
                class="input-name text-[#524d4d] bg-transparent placeholder:tracking-wider px-3 border-none outline-none focus:outline-none focus:border-none w-full h-full"
              />
            </div>
          </div>
          <div class="mt-5 flex items-center w-full relative text-base">
            <van-button
             :loading="loading"
             :disabled="loading"
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
              @click="onConfirmGAuth"
            >
            确认
            </van-button>
          </div>
        </form>
        </div>

    </van-popup>
    <van-popup  v-model="cancelAuth_dialog" closeable
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
                v-model.trim="code"
                type="text" autocomplete="off"
                maxlength="11"
                min="11"
                minlength="11"
                placeholder="谷歌验证器验证码"
                class="input-name text-[#524d4d] bg-transparent placeholder:tracking-wider px-3 border-none outline-none focus:outline-none focus:border-none w-full h-full"
              />
            </div>
          </div>
          <div class="mt-5 flex items-center w-full relative text-base">
            <van-button
             :loading="loading"
             :disabled="loading"
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
              @click="confirmRemoveGAuth"
            >
            确认
            </van-button>
          </div>
        </form>
        </div>

    </van-popup>
  </div>
</template>
  
<script>
import { mapState } from 'vuex'
// import { chagePasswordApi } from '@/api/user'
import { getWithdrawTodoApi,bindGauthApi } from '@/api/ht'
import audio from '@/assets/req_sound.mp3'
import { requestGAuthApi, GetDashboardApi,removeOwnGauthApi} from '../../api/ht'
export default {
  data() {
    return {
      change_pass_dialog: false,
      bindAuth_dialog: false,
      cancelAuth_dialog:false,
      oldPass: '',
      confirmpass: '',
      newpass: '',
      audioUrl: audio,
      old_count: 0,
      interval: null,
      gData: {},
      bind_code:'',
      loading:false,
      code: '',

    }
  },
  computed: {
    ...mapState({
      deshBoard: (state) => state.ht.deshBoardData,
      info: (state) => state.user.info,
      isSub: (state) => state.user.isSubAccount,
      subInfo: (state) => state.user.subInfo,
      count: state => state.ht.withdrawTodoCount

    }),
  },
  created() {
    this.startFunc()
    this.GetDashboardData()
  },
  destroyed() {
    clearInterval(this.interval)
    this.interval = null
  },
  beforeDestroy() {
    // 清除定时器
    clearInterval(this.interval)
    this.interval = null
  },
  methods: {
    cancelGAuth(){
      this.cancelAuth_dialog = true
    },
    confirmRemoveGAuth(){
      const sendStr = {
          opt_id: this.info.Id,
          opt_name: this.info.username,
          Id: this.info.Id,
          username: this.info.username,
          level: this.info.level,
          auth_code: this.code
        }
      this.loading = true
      this.$toast.loading({
            message: '请稍后...',
            forbidClick: true,
            duration: 1000,
        })
      removeOwnGauthApi(sendStr).then(res => {
        this.loading = false
        if (res.code === 0) {
          this.$notify({type:'success',message:res?.msg,duration: 1500,})

          this.cancelAuth_dialog = false
        }
      }).catch(e => {
        this.loading = false
        console.error('e ', e, e?.message)
      })
    },
    logout(){
      this.$dialog.confirm({
      title: '是否确认退出？',
    })
      .then(() => {
        // on confirm
        this.$store.dispatch('user/logout')
        setTimeout(() => {
          this.$router.push(`/login?redirect=${this.$route.fullPath}`)
          window.location.reload(true)
        }, 500);
      })
      .catch(() => {
        // on cancel
      });
    },
    goSetting(number){
      switch (number) {
        case 1:
          this.$router.push('/base-setting/base-setting')
          break;
        case 2:
          this.$router.push('/service-bind/service-bind')
          break;
        case 3:
          this.$router.push('/hg-manage/road-list')
          break;
      
        default:
          break;
      }
    },
    GetDashboardData() {
      GetDashboardApi().then(res => {
        if (res.code === 0) {
          this.$store.commit('ht/SET_DESHBOARD_DATA', res?.data)
        }
      }).catch((e) => {
        console.error(e)
      })
    },
    requestGAuth(){
        requestGAuthApi({ Id: this.info.Id }).then(res => {
        if (res.code === 0) {
          this.gData = res.data
         this.bindAuth_dialog = true
        }
      }).catch((e)=>{
        console.log(e);
      })
    },
    onConfirmGAuth() {
      if (this.bind_code === '') return this.$toast('请输入验证码')

      const send_ = {
        userId: this.info.Id,
        username: this.info.username,
        auth_code: this.bind_code
      }
      this.loading = true
      this.$toast.loading({
            message: '请稍后...',
            forbidClick: true,
            duration: 1000,
        })
      bindGauthApi(send_).then(res => {
        if (res.code === 0) {
          this.$toast.success(res.msg)
        } else {
          this.$toast.fail(res.msg)
        }
        this.loading = false
      }).catch(e => {
        console.log(e);
        this.loading = false
      })
    },
    changePass() {
      if (this.oldPass == '' || this.newpass == '' || this.confirmpass == '')
        return this.$toast('密码或确认密码不能为空')
      if (this.newpass.length < 6) return this.$toast('密码不能小于6位数')
      if (this.newpass !== this.confirmpass) return this.$toast('两次输入密码不一致')
      if (this.oldPass == this.newpass) return this.$toast('请更换与原密码不同的密码')
      if (/\d/.test(this.newpass) && /[a-zA-Z]/.test(this.newpass)) {
        const sendStr = {
          id: this.isSub ? this.subInfo.id : this.info.Id,
          username: this.info.username,
          old_password: this.oldPass,
          new_password: this.newpass,
          confirm_password: this.confirmpass,
        }
        chagePasswordApi(sendStr)
          .then((res) => {
            this.$toast.success(res?.data?.msg || '修改失败')
            if (res.code === 0) {
              this.oldPass = ''
              this.newpass = ''
              this.confirmpass = ''
            } else {
              this.$toast.fail(res?.data?.msg || '修改失败')
            }
          })
          .catch((e) => {
            console.log(e)
          })
      } else {
        return this.$toast('密码必须包含数字和英文字母')
      }
    },
    getWithdrawToDo() {
      const sendStr = {
        opt_id: this.info.Id
      }
      getWithdrawTodoApi(sendStr).then((res) => {
        if (res.code === 0) {
          this.$store.commit('ht/setWithdrawToDoCount', res?.data)
          if (res?.data > 0 && this.old_count < res?.data) {
            this.old_count = res?.data?.count
            const audio = new Audio(this.audioUrl)
            audio.play()
          }
        }
      }).catch((e) => {
        console.error(e)
      })
    },
    goTo() {
      this.$router.push('/record/withdraw-records')
    },
    startFunc() {
      if (this.info.gx.split('^').length <= 4 && !this.info.gx.includes('^5^')) {
        this.getWithdrawToDo()
        this.interval = setInterval(this.getWithdrawToDo, 10000)
      }
    },
  },
}
</script>
  
  <style scoped>
.main {
  position: relative;
  height: 100vh;
}
</style>