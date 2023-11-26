<template>
  <div class="w-full h-full pb-10 relative">
    <div class="h-full pt-2 px-3 pb-3">

      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-2  text-[#4e6c50] font-semibold"> 
          <img src="@/assets/logo.png" alt="logo" class="w-9">
          <span>管 理</span>
        </div>
        <div class="flex items-center space-x-2">
            <van-badge v-if="this.$Global.gxLength <= 3" :content="count" max="9" >
            <div @click="goTo()" class="text-sm tracking-wider text-[#4e6c50] font-semibold pt-1">未处理提现</div>
          </van-badge>
          <van-badge v-if="this.$Global.gxLength <= 3" :content="lcount" max="9" >
            <div @click="goToL()" class="text-sm tracking-wider text-[#4e6c50] font-semibold pt-1">未处理提现</div>
          </van-badge>
        </div>
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
              <p>{{ myCenter.totalAgentNum || 0 }}</p>
            </div>
          </van-col>
          <van-col span="12">
            <div
              class="grident_bg px-2 h-20 items-center rounded  text-white flex flex-col justify-center"
            >
              <p class="text-base">今日新增代理数</p>
              <p>{{ myCenter.agentAddNum || 0 }}</p>
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
                
                <p>{{ myCenter.totalMemberNum || 0 }}</p>
              </div>
            </van-col>
            <van-col span="12">
              <div
               
                class="grident_bg px-2 h-20 items-center rounded  flex flex-col justify-center text-white"
              >
                <p class="text-base">今日新增会员数</p>
                <p>{{ myCenter.memberAddNum || 0 }}</p>
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
              <div>{{ isSub ? subInfo.name : myCenter.userValue[0].name }}</div>
            </div>
          </div>
          <div class="py-2 w-full px-3 bg-white shadow">
            <div class="flex items-center w-full">
              <div class="w-[100px] text-sm text-[#4e6c50]">余额</div>
              <div>{{ myCenter.userValue[0].ye | toThousandFilter }}</div>
            </div>
          </div>
          <div class="py-2 w-full px-3 bg-white shadow">
            <div class="flex items-center w-full">
              <div class="w-[100px] text-sm text-[#4e6c50]">占成比</div>
              <div>{{ myCenter.userValue[0].zcb }}</div>
            </div>
          </div>
          <div class="py-2 w-full px-3 bg-white shadow">
            <div class="flex items-center w-full">
              <div class="w-[100px] text-sm text-[#4e6c50]">洗码比</div>
              <div>{{ myCenter.userValue[0].xmb }}</div>
            </div>
          </div>
          <div class="py-2 w-full px-3 bg-white shadow">
            <div class="flex items-center w-full">
              <div class="w-[100px] text-sm text-[#4e6c50]">登录IP</div>
              <div> {{ myCenter.userValue[0].ip }}</div>
            </div>
          </div>
        </section>
      </div>
      <!-- <div v-if="this.$Global.optioner.gauth === 1 && this.$Global.optioner.securityLevel === 1" class="py-2 relative w-full">
        <div class="py-2 w-full px-3 bg-white shadow">
          <span style="font-size: 16px; font-weight: bold;">账号已绑定谷歌验证器登录功能</span>
         <span style="font-size: 14px; color: #21212160; margin-left: 10px; cursor: pointer;" @click="show = true">解除绑定(不安全)</span>

          </div>
      </div>
      <div v-if="this.$Global.optioner.securityLevel === 0" class="py-2 relative w-full">
        <div class="py-2 w-full px-3 bg-white shadow">
          <span style="font-size: 16px; font-weight: bold;">您的账号尚未绑定谷歌验证器, 请绑定验证器!</span>
         <a @click="showBind = true" style="font-size: 14px; color: #d11515; margin-left: 10px; cursor: pointer;" >立即绑定</a>

          </div>
      </div> -->
      <div  class="py-1 relative w-full">
        <div class="py-3 w-full px-3 bg-white shadow">
          <span style="font-size: 14px; font-weight: bold;">后台操作文档介绍</span>
         <a href="https://hj7777.vip/dashboard-document.pdf" target="_blank" style="font-size: 14px; color: #d11515; margin-left: 10px; cursor: pointer;" >点击下载</a>

          </div>
      </div>
      <section class=" py-1 relative">
        <div v-if="this.$Global.optioner.gauth === 1 && this.$Global.optioner.securityLevel === 1" @click="show = true" class="flex items-center justify-between px-3 py-3 tracking-wider bg-white shadow rounded mt-2">
          <div class="flex items-center space-x-2">
            <img src="@/assets/auth.svg" alt="settings" class="w-7">
            <span>解除绑定(不安全)</span>
          </div>
          <span>
            <van-icon name="arrow" color="#0ba360"></van-icon>
          </span>
        </div>
        <div  v-if="this.$Global.optioner.securityLevel === 0" @click="confirmBind" class="flex items-center justify-between px-3 py-3 tracking-wider bg-white shadow rounded mt-2">
          <div class="flex items-center space-x-2">
            <img src="@/assets/auth.svg" alt="settings" class="w-7">
            <span>立即绑定</span>
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

        <div @click="goservice" class="flex items-center justify-between px-3 py-3 tracking-wider bg-white shadow rounded mt-2">
          <div class="flex items-center space-x-2">
            <img src="@/assets/msg.svg" alt="settings" class="w-7">
            <span>客服绑定</span>
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
                v-model.trim="editPwDialogFrm.oldPw"
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
                v-model.trim="editPwDialogFrm.newPw"
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
                v-model.trim="editPwDialogFrm.pw_ok"
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

    <van-popup  v-model="showGDialog" 
      position="bottom"
      :style="{ height: '50%' }">
        <div class="px-3 py-10 w-full relative">
            <span class="font-bold text-lg">请用谷歌验证器进行扫码绑定</span>
            <form @click.prevent class="w-full rounded-lg flex flex-col justify-center items-center ">
       <div class="p-3 rounded bg-[#cec9c9] my-3">
        <img :src="ga_link" alt="image" class="h-40">
       </div>
        <div class="flex items-center w-full relative h-12 rounded-md bg-[#dddddd] px-5">
            <div
              class="border-none w-full h-full text-base flex justify-center items-center relative"
            >
              <input
                v-model.trim="ga_code"
                type="text" autocomplete="off"
                maxlength="18"
                min="11"
                minlength="11"
                placeholder="请输入谷歌验证码"
                class="input-name text-[#524d4d] bg-transparent placeholder:tracking-wider px-3 border-none outline-none focus:outline-none focus:border-none w-full h-full"
              />
            </div>
          </div>
          <div class="mt-5 flex items-center space-x-2 w-full relative text-base">
            <van-button
             :loading="gloading"
             :disabled="gloading"
              class="rounded flex-1"
              style="
                background-color: #4e6c50;
                border: none;
                color: #fff;
                height: 50px;
                font-size: 16px;
                letter-spacing: 1px;
                width: 100%;
              "
              @click="bindGAuth" 
            >
            提交
            </van-button>
            <van-button
             :loading="gloading"
             :disabled="gloading"
              class="rounded flex-1"
              style="
                background-color: #4e6c50;
                border: none;
                color: #fff;
                height: 50px;
                font-size: 16px;
                letter-spacing: 1px;
                width: 100%;
              "
              @click="getGlink"
            >
            刷新
            </van-button>
          </div>
        </form>
        </div>

    </van-popup>
    <van-popup  v-model="show" closeable
      position="bottom"
      :style="{ height: '50%' }">
        <div class="px-3 py-10 w-full relative">
            <span class="font-bold text-lg">确认解除谷歌验证登录功能吗?</span>
            <form @click.prevent class="w-full rounded-lg flex flex-col justify-center items-center ">
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
                placeholder="请输入验证码"
                class="input-name text-[#524d4d] bg-transparent placeholder:tracking-wider px-3 border-none outline-none focus:outline-none focus:border-none w-full h-full"
              />
            </div>
          </div>
          <div class="mt-5 flex items-center  w-full relative text-base">
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
              @click="confirmRemove"
            >
            确认解绑
            </van-button>
          </div>
        </form>
        </div>

    </van-popup>
    <!-- <van-popup  v-model="showBind" closeable
      position="bottom"
      :style="{ height: '50%' }">
        <div class="px-3 py-10 w-full relative">
            <span class="font-bold text-lg">确认开启谷歌验证登录功能</span>
            <form @click.prevent class="w-full rounded-lg flex flex-col justify-center items-center ">
       <div class="p-3 rounded bg-[#cec9c9] my-3">
       </div>
          <div class="mt-5 flex items-center  w-full relative text-base">
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
              @click="confirmBind"
            >
            确认解绑
            </van-button>
          </div>
        </form>
        </div>

    </van-popup> -->
    <!-- <van-popup  v-model="cancelAuth_dialog" closeable
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

    </van-popup> -->
  </div>
</template>
  
<script>
// import { mapGetters } from 'vuex'
import { getAlertState, setAlertState,getHtInfo, setHtInfo } from '@/utils/auth'
import { getGoogeAuthLink, bindGoogeAuth } from '@/api/user'
import AES from '@/api/aes'
import { mapState } from 'vuex'
import audio from '@/assets/req_sound.mp3'

export default {
  name: 'Dashboard',
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please input the password'))
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    }
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please input the password again'))
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('Two inputs don\'t match!'))
      } else {
        callback()
      }
    }
    return {
      change_pass_dialog:false,
      loading:false,
      editPwDialogFrm: {
        oldPw: '',
        newPw: '',
        pw_ok: '',
        onekey_pw: ''
      },
      showBind:false,
      webSit: '测试',
      show: false,
      agloading: false,
      code: '',
      agent_notice: '',
      currentRole: 'adminDashboard',
      showGDialog: false,
      showPassDialog: false,
      ga_link: '',
      links: [],
      ga_code: '',
      gloading: false,
      interval: null,
      interval2: null,
      interval3: null,
      interval4: null,
      old_count: 0,
      audioUrl: audio,
      rules: {
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      },
      ruleForm: {
        pass: '',
        checkPass: ''
      }
    }
  },
  computed: {
    // ...mapGetters([
    //   'roles'
    // ])
    ...mapState({
      myCenter: state => state.ht.myCenterForm,
      isSub: state => state.user.isSubAccount,
      subInfo: state => state.user.subInfo,
      tglinks: state => state.ht.tglinks,
      dashboardOwnData: state => state.ht.dashboardOwnData,
      lcount: state => state.ht.lcount,
      count: state => state.ht.withdrawTodoCount,

    })
  },
  // created() {
  //   if (!this.roles.includes('admin')) {
  //     this.currentRole = 'editorDashboard'
  //   }
  // }
  watch: {
    // $route(to, from) {
    //   if (this.$route.path === '/dashboard' || this.$route.path === '/about/profile') {
    //     if (this.interval !== null) {
    //       clearInterval(this.interval)
    //       this.interval = null
    //     }
    //     this.interval = setInterval(this.getData, 10000)
    //   } else {
    //     clearInterval(this.interval)
    //     this.interval = null
    //   }
    // }
  },
  created() {
    this.startFunc()
    this.getTuiGuangLink()
  },
  mounted() {
    this.getOwnInfo()
  },

  beforeDestroy() {
    // 清除定时器
    clearInterval(this.interval)
    this.interval = null
  },

  methods: {
    goservice(){
      this.$router.push('/service-bind/service-bind')
    },
    goTo() {
      this.$router.push('/recordsPage/withdraw-records')
    },
    goToL() {
      this.$router.push('/manageUser/lock-account-list')
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
    confirmBind(){
      this.$dialog.confirm({
      title: '确认开启谷歌验证登录功能',
    })
      .then(() => {
        const sendStr = {
        router: 'UseGoogleAuth',
        JsonData: {
          opt_id: this.isSub ? this.subInfo.id : this.$Global.optioner.Id,
          opt_name: this.isSub ? this.subInfo.name : this.$Global.optioner.UserName
        }
      }
      this.gloading = true
      this.$pomelo.sendcb(sendStr, res => {
        this.gloading = false
        // console.log(res)
        if (res?.JsonData?.result === 'ok') {
          this.$toast('开启成功')
          //this.showBind = false
          setTimeout(() => {
            this.$store.dispatch('user/logout')
            this.$router.push(`/login?redirect=${this.$route.fullPath}`)
          }, 1000)
        } else {
          this.gloading = false
          this.$toast(res?.JsonData?.msg)
        }
      })
      })
      .catch(() => {
        // on cancel
      });
    },
    close() {
      this.$Global.Pass = this.$Global.newPass
      this.editPwDialogFrm.oldPw = ''
      this.editPwDialogFrm.newPw = ''
      this.editPwDialogFrm.pw_ok = ''
      this.editPwDialogFrm.onekey_pw = ''
      this.$toast('修改失败')
      let info = getHtInfo()
      info = JSON.parse(info)
      const _XForIn_ = { account: info.account, password: this.$Global.Pass }
      setHtInfo(AES.encrypt(JSON.stringify(_XForIn_), this.$Global.en))
      this.$store.commit('ht/setEditPwState', false)

      setTimeout(() => {
        this.$store.dispatch('user/logout')
        this.$router.push(`/login`)
      }, 1000)
    },
    changePass(){
      if (this.editPwDialogFrm.oldPw == '' || this.editPwDialogFrm.newPw == '' || this.editPwDialogFrm.pw_ok == '')
        return this.$toast('密码或确认密码不能为空')
      if (this.editPwDialogFrm.newPw < 6) return this.$toast('密码不能小于6位数')
      if (this.editPwDialogFrm.newPw !== this.editPwDialogFrm.pw_ok) return this.$toast('两次输入密码不一致')
      if (this.editPwDialogFrm.oldPw == this.editPwDialogFrm.newPw) return this.$toast('请更换与原密码不同的密码')
      if (/\d/.test(this.editPwDialogFrm.newPw) && /[a-zA-Z]/.test(this.editPwDialogFrm.newPw)) {
        const sendStr = {
          router: 'editOwnPw',
          JsonData: {
            userId: this.isSub ? this.subInfo.id : this.$Global.optioner.Id,
            pw: this.$md5(this.editPwDialogFrm.newPw),
            onekey_pw: this.isSub ? '' : this.$md5(
              this.editPwDialogFrm.onekey_pw + this.$Global.addPwStr
            )
          }
        }
        this.$toast.loading({
            message: '请稍后...',
            forbidClick: true,
            duration: 1000,
        })
        this.$pomelo.sendcb(sendStr, res => {
          // console.log(res)
          if (res?.JsonData?.result === 'ok') {
            this.$Global.newPass = this.editPwDialogFrm.newPw
            this.close()
          } else {
            this.$toast(res?.JsonData?.msg || '修改失败')
          }
        })
      } else {
        return this.$toast('密码必须包含数字和英文字母')
      }
    },
    confirmRemove() {
      if (this.code.trim() === '') return this.$toast('请输入验证码')
      if (this.code.toString().length !== 6) return this.$toast('验证码不正确')
      const sendStr = {
        router: 'RemoveGoogleAuth',
        JsonData: {
          opt_id: this.isSub ? this.subInfo.id : this.$Global.optioner.Id,
          opt_name: this.isSub ? this.subInfo.name : this.$Global.optioner.UserName,
          code: this.code.toString().trim()
        }
      }
      this.gloading = true
      this.$toast.loading({
            message: '请稍后...',
            forbidClick: true,
            duration: 1000,
        })
      this.$pomelo.sendcb(sendStr, res => {
        this.gloading = false
        // console.log(res)
        if (res?.JsonData?.result === 'ok') {
          this.$toast('解绑成功')
          this.show = false
          setTimeout(() => {
            this.$store.dispatch('user/logout')
            this.$router.push(`/login?redirect=${this.$route.fullPath}`)
          }, 1000)
        } else {
          this.gloading = false
          this.$toast(res?.JsonData?.msg)
        }
      })
    },

    startFunc() {
      this.$store.state.ht.myCenterFrm &&
      Object.assign(this.myCenterFrm, this.$store.state.ht.myCenterFrm)
      clearInterval(this.interval)
      this.interval = null
      this.getData()
      this.interval = setInterval(this.getData, 10000)
      // this.$store.state.user.alert.visible = true
      // console.log('ddddddashbbbbbbbbbbb ', this.$Global.optioner.securityLevel === 1, this.$Global.optioner.gauth !== 1)
      if (this.$Global.optioner.securityLevel === 1 && this.$Global.optioner.gauth !== 1) {
        this.getGlink()
      } else {
        if (!getAlertState()) {
          setAlertState(true)
        }
      }
      // this.checkChangePassTime() // 检查最后修改密码时间
      if (this.$Global.gxLength <= 3) {
        // 提现申请
        if (this.interval2 !== null) {
          clearInterval(this.interval2)
          this.interval2 = null
        }
        this.getWithdrawToDo()
        this.interval2 = setInterval(this.getWithdrawToDo, 10000)
        // 锁定登录
        if (this.interval3 !== null) {
          clearInterval(this.interval3)
          this.interval3 = null
        }
        this.getLCount()
        this.interval3 = setInterval(this.getLCount, 5000)
        if (this.$Global.optioner.Id === 1) {
          // 在线总人数
          if (this.interval4 !== null) {
            clearInterval(this.interval4)
            this.interval4 = null
          }
          this.getOnlineUserCount()
          this.interval4 = setInterval(this.getOnlineUserCount, 10000)
        }
      }
    },
    checkChangePassTime() {
      const last_time = this.$moment(this.$moment(this.$Global.optioner.lastChangePw).format('YYYY-MM-DD HH:mm:ss'))
      const now_time = this.$moment(new Date())

      const diff_time = last_time.diff(now_time, 'days')
      console.log('diff time ', diff_time, now_time, last_time)
    },
    getWithdrawToDo() {
      const sendStr = {
        router: 'GetWithdrawToDo',
        JsonData: {
          opt_id: this.$Global.optioner.Id,
          token: this.token
        }
      }

      this.$pomelo.sendcb(sendStr, res => {
        // console.log('res ', res, res?.JsonData?.count)
        if (res?.JsonData.result === 'ok') {
          this.$store.commit('ht/setWithdrawToDoCount', res?.JsonData.count)
          if (res?.JsonData?.count > 0 && this.old_count < res?.JsonData?.count) {
            this.old_count = res?.JsonData?.count
            const audio = new Audio(this.audioUrl)
            audio.play()
          }
        }
      })
    },
    getOnlineUserCount() {
      const sendStr = {
        router: 'GetOnlineUserCount',
        JsonData: {
          opt_id: this.$Global.optioner.Id,
          token: this.token
        }
      }

      this.$pomelo.sendcb(sendStr, res => {
        // console.log('res ', res, res?.JsonData?.count)
        if (res?.JsonData.result === 'ok') {
          this.$store.commit('ht/setOnlineUserCount', res?.JsonData.count)
          // if (res?.JsonData?.count > 0 && this.old_count < res?.JsonData?.count) {
          // this.old_count = res?.JsonData?.count
          // const audio = new Audio(this.audioUrl)
          // audio.play()
          // }
        }
      })
    },
    getLCount() {
      const sendStr = {
        router: 'getLockAccountRealtime',
        JsonData: {
          opt_id: this.$Global.optioner.Id
        }
      }
      this.$pomelo.sendcb(sendStr, res => {
        // console.log('lock account ', res)
        if (res?.JsonData?.result === 'ok') {
          this.$store.commit('ht/setLCount', res?.JsonData?.count)
        } else {
          this.$store.commit('ht/setLCount', 0)
        }
      })
    },
    getData() {
      const sendStr = {
        router: 'GetCenterInfo',
        JsonData: { name: this.$Global.optioner.UserName }
      }
      this.$pomelo.send(sendStr)
    },
    getGlink() {
      if (this.$Global.optioner.securityLevel !== 1 && this.$Global.optioner.gauth === 1) {
        return this.$toast('申请绑定失败')
      }
      const data = {
        userId: this.isSub ? this.subInfo.id : this.$Global.optioner.Id,
        username: this.isSub ? this.subInfo.name : this.$Global.optioner.UserName,
        token: this.$Global.optioner.token
      }
      const en = this.$Global.en
      getGoogeAuthLink({ data: AES.encrypt(JSON.stringify(data), en) }).then(res => {
        const body = res.data
        res = JSON.parse(AES.decrypt(body, en))
        // console.log('res link ', res)
        // res = res?.data
        if (res?.JsonData.result === 'ok') {
          // this.$message.info('获取绑定链接成功')
          this.ga_link = res.JsonData?.url
          this.showGDialog = true
        } else {
          this.$toast('获取绑定链接失败')
        }
      }).catch(e => {
        console.error(e)
      })
    },
    bindGAuth() {
      if (this.ga_code.trim() === '') return this.$toast('请输入验证码')
      const data = {
        userId: this.isSub ? this.subInfo.id : this.$Global.optioner.Id,
        username: this.isSub ? this.subInfo.name : this.$Global.optioner.UserName,
        code: this.ga_code,
        token: this.$Global.optioner.token
      }
      // console.log('data send ', data)
      const en = this.$Global.en
      bindGoogeAuth({ data: AES.encrypt(JSON.stringify(data), en) }).then(res => {
        const body = res.data
        res = JSON.parse(AES.decrypt(body, en))
        // console.log('res ', res)
        // res = res?.data
        if (res?.JsonData?.result === 'ok') {
          this.showGDialog = false
          this.$toast('绑定成功，请重新登录')
          setTimeout(() => {
            this.$store.dispatch('user/logout')
            this.$router.push(`/login`)
          }, 1000)
        } else {
          this.$toast(res?.JsonData?.msg || '绑定失败')
        }
      }).catch(e => {
        console.error(e)
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$toast('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    getTuiGuangLink() {
      const send_ = {
        router: 'getBaseAddr',
        JsonData: {
          type: 7
        }
      }
      this.$pomelo.sendcb(send_, res => {
        if (res?.JsonData?.result === 'ok') {
          this.links = res?.JsonData?.data.split(',')
          this.$store.commit('ht/SetTuiGuangLink', this.links)
        } else {
          this.links = []
          this.$store.commit('ht/SetTuiGuangLink', this.links)
        }
      })
    },
    getOwnInfo() {
      const sendStr = {
        router: 'GetOwnInfo',
        JsonData: {
          Id: this.$Global.optioner.Id, // 操作员Id
          name: this.$Global.optioner.UserName, // 上级代理名称
          findname: '', // 查找名称
          nikename: '', // 查找昵称
          token: this.$Global.optioner.token,
          level: this.$Global.optioner.level,
          proxyname: this.isSub ? this.subInfo.name : this.$Global.optioner.UserName
        }
      }
      this.loading = true
      // this.$store.state.ht.agentAdminForm.state = 0
      this.$pomelo.sendcb(sendStr, res => {
        // console.log('getowninfo ... ', res)
        if (res.JsonData.length > 0) {
          var data = res.JsonData[0]
          const oneUser = {}
          oneUser.Id = data.Id
          oneUser.agentAccount = data.name
          oneUser.name = data.nikename
          oneUser.user_type = data.user_type
          oneUser.aBalance = data.ye
          oneUser.level = data.level
          // eslint-disable-next-line
          oneUser.topup_auth = data.yj == 1 ? true : false
          oneUser.zcb = data.zcb
          oneUser.xmb_s = data.xmb_s
          oneUser.xmb_d = data.xmb_d
          oneUser.xmb = data.xmb_s + '/' + data.xmb_d
          oneUser.xmType = data.xmType === 0 || data.xmType === '0' ? '双边' : '单边'
          oneUser.withdrawPw = data.withdrawPw
          oneUser.sEnable = data.sEnable === 1 ? '启用' : '禁用'
          oneUser.createDate = data.createDate
          oneUser.lastLoginTime = data.lastLoginTime
          oneUser.ip = data.loginIp
          oneUser.jxb = data.jxb // 权限表
          oneUser.reference_name = data.reference_name
          oneUser.onLine = data.onLineState === 1 ? '在线' : '离线'
          oneUser.memo = data.memo
          oneUser.auto_wash = data.autoWash
          oneUser.wash_type = data.washType
          oneUser.securityLevel = data.securityLevel
          if (data.needxm) {
            oneUser.needXmf = data.xmType !== 1 ? (data.needxm?.xml_d * data.xmb_d / 100 + data.preXmLeft || 0).toFixed(2) : (data.needxm?.xml_s * data.xmb_s / 100 + data.preXmLeft || 0).toFixed(2)
          } else {
            oneUser.needXmf = data.preXmLeft || 0
          }
          if (data.xh) {
            oneUser.xh_min = data.xh.split('-')[0]
            oneUser.xh_max = data.xh.split('-')[1]
          } else {
            oneUser.xh_min = 20
            oneUser.xh_max = 50000
          }
          // oneUser.gx = this.$ws.mapAgentName(data.gx)
          oneUser.downloadUrl = data.downloadUrl || ''
          oneUser.androidAddr = data.androidAddr || ''
          oneUser.iosAddr = data.iosAddr || ''
          oneUser.customerAddr = data.customerAddr || ''
          oneUser.webAddr = data.webAddr || ''
          oneUser.gameAddr = data.gameAddr || ''
          // oneUser.isPf = this.checkIsPf(data.jxb)
          // oneUser.isPf = data.pf === 1 ? true : false
          // oneUser.isTop = this.checkIsTop(data.gx)
          // this.MyInfo = oneUser
          this.$store.commit('ht/setDashboardOwnData', oneUser)
        }
      })
    }
  }
  // destroyed() {
  //   console.log('dashboard destoryed ............')
  // }
}
</script>
  
  <style scoped>
.main {
  position: relative;
  height: 100vh;
}
</style>