<template>
    <div>
       <van-popup  v-model="dialogFormVisible" closeable @close="Cancel" :lock-scroll="false"
      position="bottom"  :style="{ height: '90%' }" style="overflow-y: auto;">
       <div class="px-3 py-5 w-full relative overflow-y-auto">
        <span class="font-bold text-lg">设定会员 {{memberSetupDigFrm.memberAccount  }}</span>
         

        <form @click.prevent class="w-full rounded-lg flex flex-col  ">
         <section class="flex space-x-1">
          <section class=" flex-1">
            <div  class="flex items-center w-full bg-[#dddddd] relative h-10 rounded-md  px-5 mt-3">
                    <div
                    class="border-none w-full h-full text-base flex justify-center items-center relative"
                    >
                    <input
                        v-model.trim="memberSetupDigFrm.memberAccount"
                        type="text" autocomplete="off"
                        disabled
                        placeholder="请输入" 
                        class="input-name text-[#524d4d] bg-transparent placeholder:tracking-wider px-3 border-none outline-none focus:outline-none focus:border-none w-full h-full"
                    />
                    </div>
            </div>
            <div  class="flex items-center w-full bg-[#dddddd] relative h-10 rounded-md  px-5 mt-3">
                    <div
                    class="border-none w-full h-full text-base flex justify-center items-center relative"
                    >
                    <input
                      v-model="p.name"
                        type="text" autocomplete="off"
                         
                        placeholder="请输入昵称" 
                        class="input-name text-[#524d4d] bg-transparent placeholder:tracking-wider px-3 border-none outline-none focus:outline-none focus:border-none w-full h-full"
                    />
                    </div>
            </div>
            <div  class="flex items-center w-full bg-[#dddddd] relative h-10 rounded-md  px-5 mt-3">
                    <div
                    class="border-none w-full h-full text-base flex justify-center items-center relative"
                    >
                    <input
                        v-model.trim="accountPw"
                        type="password" autocomplete="off"
                         
                        placeholder="不设置请留空" 
                        class="input-name text-[#524d4d] bg-transparent placeholder:tracking-wider px-3 border-none outline-none focus:outline-none focus:border-none w-full h-full"
                    />
                    </div>
            </div>
            <div v-if="(this.$Global.gxLength <= 4 || setupData.reference_name === this.$Global.optioner.UserName)"  class="flex items-center w-full bg-[#dddddd] relative h-10 rounded-md  px-5 mt-3">
                    <div
                    class="border-none w-full h-full text-base flex justify-center items-center relative"
                    >
                    <input
                        v-model.trim="p.memo"
                        type="text" autocomplete="off"
                         
                        placeholder="备注" 
                        class="input-name text-[#524d4d] bg-transparent placeholder:tracking-wider px-3 border-none outline-none focus:outline-none focus:border-none w-full h-full"
                    />
                    </div>
            </div>

          </section>
          <section class=" flex-1">

            <div  class="flex items-center w-full bg-[#dddddd] relative h-10 rounded-md  px-5 mt-3">
                    <div
                    class="border-none w-full h-full text-base flex justify-center items-center relative"
                    >
                    <input
                        v-model.trim="p.xh_min"
                        type="text" autocomplete="off"
                         
                        placeholder="最低限红" 
                        class="input-name text-[#524d4d] bg-transparent placeholder:tracking-wider px-3 border-none outline-none focus:outline-none focus:border-none w-full h-full"
                    />
                    </div>
            </div>
            <div  class="flex items-center w-full bg-[#dddddd] relative h-10 rounded-md  px-5 mt-3">
                    <div
                    class="border-none w-full h-full text-base flex justify-center items-center relative"
                    >
                    <input
                        v-model.trim="p.xh_max"
                        type="text" autocomplete="off"
                         
                        placeholder="最高限红" 
                        class="input-name text-[#524d4d] bg-transparent placeholder:tracking-wider px-3 border-none outline-none focus:outline-none focus:border-none w-full h-full"
                    />
                    </div>
            </div>
            <div class=" w-full relative  mt-3 bg-[#dddddd] rounded-md h-10 ">
             <!-- <div class="text-left font-bold">权限 :</div> -->
              <div class="flex  space-x-1 h-full items-center justify-center text-xs">
                <van-checkbox  v-if="showTopUpAuth" icon-size="14" v-model="topupAuth">在线充值</van-checkbox>
                  <van-checkbox icon-size="14" v-model="autoWash">自动结算</van-checkbox>
              </div>
           </div>

          </section>

        </section> 
        <div   class="flex items-center w-full relative h-10 rounded-md bg-[#dddddd]   mt-3  ">
                <div   v-if="this.$Global.gxLength === 2 || this.$Global.optioner.arrJxb[18] === '1' || upper.xm_type == 0" class="w-full">
                    <van-dropdown-menu     @change="changeXmType" class="w-full" direction="up" >
                <van-dropdown-item v-model="p.xmKind" :options="options"   />
                </van-dropdown-menu>
                </div>
                <div v-else
                    class="border-none w-full h-full text-base flex justify-center items-center relative"
                    >
                    <input
                        v-model.trim="p.xmKind"
                        type="text" autocomplete="off"
                        :disabled="true"
                      
                        class="input-name text-[#524d4d] bg-transparent placeholder:tracking-wider px-3 border-none outline-none focus:outline-none focus:border-none w-full h-full"
                    />
                    </div>
           </div>

             <div v-if="autoWash"  class="flex items-center w-full relative h-10 rounded-md bg-[#dddddd]   mt-3  ">
                <van-dropdown-menu class="w-full" direction="up" >
                <van-dropdown-item v-model="autoWashType" :options="optionsAutoWash"   />
                </van-dropdown-menu>
           </div>

           <div v-if="(checkSD === '单边' || upper.xm_type == 0 || arrJxb[18] === '1') && p.xmKind == '单边'" class="flex items-center w-full bg-[#dddddd] relative h-10 rounded-md  px-5 mt-3">
                    <div
                    class="border-none w-full h-full text-base flex justify-center items-center relative"
                    >
                    <input
                        v-model.trim="p.xmb_s"
                        type="tel" autocomplete="off" @change="handleChangeS"
                         
                        placeholder="占成比例" 
                        class="input-name text-[#524d4d] bg-transparent placeholder:tracking-wider px-3 border-none outline-none focus:outline-none focus:border-none w-full h-full"
                    />
                    </div>
            </div>

            <div  v-if="(checkSD === '双边' || arrJxb[18] === '1') && p.xmKind == '双边'"  class="flex items-center w-full bg-[#dddddd] relative h-10 rounded-md  px-5 mt-3">
                    <div
                    class="border-none w-full h-full text-base flex justify-center items-center relative"
                    >
                    <input
                        v-model.trim="p.xmb_d"
                        type="tel" autocomplete="off" @change="handleChangeD"
                         
                        placeholder="洗码率双" 
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
                height: 40px;
                font-size: 16px;
                letter-spacing: 1px;
                width: 100%;
            "
            @click="Ok()"
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
import { mapState, mapGetters } from 'vuex'

export default {
  props: {
    setupData: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      options: [
      {
          value: '单边',
          text: '单边'
        },
        {
          value: '双边',
          text: '双边'
        }
      ],
      loading: false,
      dialogFormVisible: false,
      arrJxb: this.$Global.optioner.arrJxb,
      checkSD: this.$Global.optioner.xmType,
      optionsAutoWash: [
      {
          value: 1,
          text: '日结'
        },
        {
          value: 2,
          text: '周结'
        },
        {
          value: 3,
          text: '月结'
        }
      ],
      autoWashType: 1,
      autoWash: false,
      topupAuth: false,
      showTopUpAuth: false,
      memberSetupDigFrm: {
        memberName: '',
        zcb: '',
        // xmb_s: '',
        // xmb_d: '',
        upper_xmb_s: '0.0', // 上级洗码比单
        upper_xmb_d: '0.0', // 上级洗码比双
        xmKind: '',
        accountPw: '', // 账号密码,不修改留空
        drawMoneyPw: '', // 取款密码,不修改留空
        webAddr: '' // 一键结算密码,不修改留空
      },
      p: {
        name: '',
        accountPw: '',
        xmb_s: '',
        xmb_d: '',
        drawMoneyPw: '',
        xmKind: '',
        xh_min: '',
        xh_max: '',
        memo: ''
      },
      accountPw: '',
      drawMoneyPw: ''
    }
  },
  computed: {
    ...mapState({
      upper: state => state.ht.referenceInfo,
      isSub: state => state.user.isSubAccount,
      subInfo: state => state.user.subInfo
    }),
    ...mapGetters(['MODIFY__OK_PLAYER', 'device'])
  },
  watch: {
    setupData: {
      handler(newValue, oldValue) {
        this.memberSetupDigFrm = newValue
        this.p.name = this.memberSetupDigFrm.name
        this.p.xmb_s = Number(this.memberSetupDigFrm.xmb.split('/')[0])
        this.p.xmb_d = Number(this.memberSetupDigFrm.xmb.split('/')[1])
        this.p.xmKind = this.memberSetupDigFrm.xmKind
        this.p.xh_min = this.memberSetupDigFrm.xh_min.toString()
        this.p.xh_max = this.memberSetupDigFrm.xh_max.toString()
        this.p.memo = this.memberSetupDigFrm.memo
        if (this.p.isTop || this.upper.topup_auth) {
          this.showTopUpAuth = true
        }
        // console.log('topup ', newValue.topup_auth, this.upper)
        this.topupAuth = this.memberSetupDigFrm.topup_auth
        // eslint-disable-next-line
        this.autoWash = this.memberSetupDigFrm.auto_wash === 1 ? true : false
        this.autoWashType = this.memberSetupDigFrm.wash_type === 0 ? 1 : this.memberSetupDigFrm.wash_type
      }
    },
    MODIFY__OK_PLAYER: function(val) {
      if (val) {
        this.loading = false
        this.close()
      }
    }
  },
  methods: {
    changeXmType(t) {
      // console.log('type ', t)
      if (t === '单边') this.p.xmb_s = 0
      if (t === '双边') this.p.xmb_d = 0.9
    },
    close() {
      this.loading = false
      this.accountPw = ''
      this.drawMoneyPw = ''
      this.showTopUpAuth = false
      this.autoWash = false
      this.autoWashType = 1
      this.dialogFormVisible = false
      this.$store.commit('ht/setModifiyState', false)
      this.$emit('userAction', { name: 'MODIFY_SUCCESS' })
    },
    // closeDia() {
    //   this.Cancel()
    // },
    // 限制输入特殊字符
    btKeyUp(e) {
      e.target.value = e.target.value.replace(/[`~!#$%^&*()\-+=<>?:'{}|,.\/;'\\[\]·~！#￥%……&*（）\-+={}|《》？：“”【】、；‘’，。、]/g, '')
    },
    handleChangeD(value) {
      if (this.upper.xmb_d < value) {
        this.$toast('洗码比例不能超过上级')
        // this.memberSetupDigFrm.xmb_d = 0
      }
    },
    handleChangeS(value, e) {
      if (value > this.upper.xmb_s) {
        this.$toast('洗码比例不能超过上级')
      }
    },
    Ok() {
      var frm = this.p
      if (frm.xmb_s > this.upper.xmb_s || frm.xmb_d > this.upper.xmb_d) {
        return this.$toast('洗码比例不能超过上级')
      }
      if (this.accountPw.length >= 1 && this.accountPw.length < 6) {
        this.$toast('密码不能小于6位数')
        return
      }
      if (this.accountPw !== '') {
        if (!/\d/.test(this.accountPw) || !/[a-zA-Z]/.test(this.accountPw)) return this.$toast('密码必须包含数字和英文字母')
      }
      // eslint-disable-next-line
      if (this.p.xh_min.trim() == '' || this.p.xh_max.trim() == '') return this.$toast('请输入限红!')
      if (this.p.xh_min < 0 || this.p.xh_max < 0) return this.$toast('限红不可小于零!')
      if (parseInt(this.p.xh_min) < parseInt(this.upper.xh_min) || parseInt(this.p.xh_max) > parseInt(this.upper.xh_max)) return this.$toast('限红不能超过上级!')

      this.loading = true
      const sendStr = {
        router: 'editMemberInfo',
        JsonData: {
          name: this.memberSetupDigFrm.memberAccount,
          nikename: this.p.name,
          zcb: null, // 会员没有占成
          xmb_s: this.p.xmKind === '双边' ? 0 : this.p.xmb_s || 0,
          xmb_d: this.p.xmKind === '双边' ? this.p.xmb_d || 0 : 0,
          xmKind: this.p.xmKind === '双边' ? 0 : 1,
          xh: this.p.xh_min + '-' + this.p.xh_max,
          memo: this.p.memo,
          // eslint-disable-next-line
          pw: this.accountPw != '' ? this.$md5(this.accountPw) : '',
          // eslint-disable-next-line
          drawMoneyPw: this.drawMoneyPw != '' ? this.$md5(this.drawMoneyPw) : '',
          webAddr: this.p.webAddr || '',
          level: 3,
          ip: this.$store.state.ht.ip || '',
          optName: this.$Global.optioner.UserName,
          proxyname: this.isSub ? this.subInfo.name : '',
          topup_auth: this.topupAuth ? 1 : 0, // 在线充值权限
          auto_wash: this.autoWash,
          wash_type: (this.autoWash && this.autoWashType !== null) ? this.autoWashType : 0
        }
      }
      this.$store.commit('ht/setModifiyPlayerState', false)
      this.$pomelo.send(sendStr)
      // console.log('send ', sendStr)
    },
    Cancel() {
      this.loading = false
      this.accountPw = ''
      this.drawMoneyPw = ''
      this.showTopUpAuth = false
      this.p.name = this.memberSetupDigFrm.name
      this.p.xmb_s = Number(this.memberSetupDigFrm.xmb.split('/')[0])
      this.p.xmb_d = Number(this.memberSetupDigFrm.xmb.split('/')[1])
      this.p.xmKind = this.memberSetupDigFrm.xmKind
      this.p.xh_min = this.memberSetupDigFrm.xh_min
      this.p.xh_max = this.memberSetupDigFrm.xh_max
      this.p.memo = this.memberSetupDigFrm.memo
      this.autoWash = false
      this.autoWashType = 1
      this.dialogFormVisible = false
    }
  }
}
</script>