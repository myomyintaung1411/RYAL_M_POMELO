<template>
    <div>
       <van-popup  v-model="dialogFormVisible" closeable @close="Cancel" :lock-scroll="false"
      position="bottom"  :style="{ height: '90%' }" style="overflow-y: auto;">
       <div class="px-3 py-5 w-full relative overflow-y-auto">
        <span class="font-bold text-lg">为 {{ $Global.optioner.UserName }} 添加会员, 代理</span>
         

        <form @click.prevent class="w-full rounded-lg flex flex-col  ">
         <section class="flex space-x-1">
          <section class=" flex-1">
            <div class="flex items-center w-full bg-[#dddddd] relative h-10 rounded-md  px-5 mt-3">
                    <div
                    class="border-none w-full h-full text-base flex justify-center items-center relative"
                    >
                    <van-radio-group icon-size="14" v-model="type" @change="actionTypeChange" direction="vertical" class="w-full text-sm  flex justify-start flex-col  items-start">
                      <van-radio name="agent">添加代理</van-radio>
                      <van-radio name="player">添加会员</van-radio>
                    </van-radio-group>
                    </div>
            </div>
            <div  class="flex items-center w-full bg-[#dddddd] relative h-10 rounded-md  px-5 mt-3">
                    <div
                    class="border-none w-full h-full text-base flex justify-center items-center relative"
                    >
                    <input
                        v-model.trim="myFrm.memberName"
                        type="text" autocomplete="off"
                        :readonly="($Global.optioner.Id == 1 || $Global.gxLength <=3) ? false : true"
                        placeholder="请输入" 
                        class="input-name text-[#524d4d] bg-transparent placeholder:tracking-wider px-3 border-none outline-none focus:outline-none focus:border-none w-full h-full"
                    />
                    <div @click="clickRefresh" class="absolute right-3">
                      <van-icon name="replay" :style="is_refresh ? 'animation: rotating 1s linear infinite reverse' : ''" />
                    </div>
                    </div>
            </div>
            <div  class="flex items-center w-full bg-[#dddddd] relative h-10 rounded-md  px-5 mt-3">
                    <div
                    class="border-none w-full h-full text-base flex justify-center items-center relative"
                    >
                    <input
                        v-model.trim="myFrm.pw"
                        type="password" autocomplete="off"
                         
                        placeholder="请输入密码" 
                        class="input-name text-[#524d4d] bg-transparent placeholder:tracking-wider px-3 border-none outline-none focus:outline-none focus:border-none w-full h-full"
                    />
                    <div @click="clickRefreshPw" class="absolute right-3">
                      <van-icon name="replay" :style="is_refresh ? 'animation: rotating 1s linear infinite reverse' : ''" />
                    </div>
                    </div>
            </div>
            <!-- <div  class="flex items-center w-full bg-[#dddddd] relative h-10 rounded-md  px-5 mt-3">
                    <div
                    class="border-none w-full h-full text-base flex justify-center items-center relative"
                    >
                    <input
                        v-model.trim="myFrm.conpw"
                        type="password" autocomplete="off"
                         
                        placeholder="确认密码" 
                        class="input-name text-[#524d4d] bg-transparent placeholder:tracking-wider px-3 border-none outline-none focus:outline-none focus:border-none w-full h-full"
                    />
                    </div>
            </div> -->
            <div  class="flex items-center w-full bg-[#dddddd] relative h-10 rounded-md  px-5 mt-3">
                    <div
                    class="border-none w-full h-full text-base flex justify-center items-center relative"
                    >
                    <input
                        v-model.trim="myFrm.memo"
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
                    class="border-none w-full space-x-2 h-full text-base flex text-black  items-center relative"
                    >
                    <span>上级</span>
                    <span>{{ $Global.optioner.UserName }}</span>
                    </div>
            </div>
            <div  class="flex items-center w-full bg-[#dddddd] relative h-10 rounded-md  px-5 mt-3">
                    <div
                    class="border-none w-full h-full text-base flex justify-center items-center relative"
                    >
                    <input
                        v-model.trim="myFrm.memberNikeName"
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
                        v-model.trim="myFrm.xh_min"
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
                        v-model.trim="myFrm.xh_max"
                        type="text" autocomplete="off"
                         
                        placeholder="最高限红" 
                        class="input-name text-[#524d4d] bg-transparent placeholder:tracking-wider px-3 border-none outline-none focus:outline-none focus:border-none w-full h-full"
                    />
                    </div>
            </div>
            <div class=" w-full relative  mt-3 bg-[#dddddd] rounded-md h-10 ">
             <!-- <div class="text-left font-bold">权限 :</div> -->
              <div class="flex  space-x-1 h-full items-center justify-center text-xs whitespace-nowrap">
                <van-checkbox v-if="type !== 'player' &&  ($Global.optioner.isTop || this.$Global.optioner.Id == 1)" v-model="ispfqx" :disabled="pfdisable">配分权限</van-checkbox>
             <van-checkbox v-if="upper.is_cash == 0" v-model="topupAuth">在线充值</van-checkbox>
              <van-checkbox v-model="autoWash" >自动结算</van-checkbox>
              </div>
           </div>
          </section>

        </section> 
        <div v-if="autoWash"  class="flex items-center w-full relative h-10 rounded-md bg-[#dddddd]   mt-3  ">
                <van-dropdown-menu     class="w-full" direction="up" >
                <van-dropdown-item v-model="autoWashType" :options="optionsAutoWash"   />
                </van-dropdown-menu>
           </div>
        <div v-if="this.$Global.gxLength === 2 || this.$Global.optioner.xmType === '双边'"  class="flex items-center w-full relative h-10 rounded-md bg-[#dddddd]   mt-3  ">
                <van-dropdown-menu    @change="changeXmType" class="w-full" direction="up" >
                <van-dropdown-item v-model="myFrm.xmKind" :options="options"   />
                </van-dropdown-menu>
           </div>
        <div v-else  class="flex items-center w-full relative h-10 rounded-md bg-[#dddddd]   mt-3  ">
            <div
                    class="border-none w-full h-full text-base flex justify-center items-center relative"
                    >
                    <input
                        v-model.trim="myFrm.xmKind"
                        type="text" autocomplete="off" :disabled="true" 
                         
                        placeholder="占成比例" 
                        class="input-name text-[#524d4d] bg-transparent placeholder:tracking-wider px-3 border-none outline-none focus:outline-none focus:border-none w-full h-full"
                    />
                    </div>
           </div>
           <div v-if="type == '添加代理'" class="flex items-center w-full bg-[#dddddd] relative h-10 rounded-md  px-5 mt-3">
                    <div
                    class="border-none w-full h-full text-base flex justify-center items-center relative"
                    >
                    <input
                        v-model.trim="myFrm.zcb"
                        type="text" autocomplete="off" @change="handleChangeZ"
                         
                        placeholder="占成比例" 
                        class="input-name text-[#524d4d] bg-transparent placeholder:tracking-wider px-3 border-none outline-none focus:outline-none focus:border-none w-full h-full"
                    />
                    </div>
            </div>
            <div  v-if="(checkSD === '单边' || checkSD === '双边' || arrJxb[18] === '1' || this.$Global.optioner.Id == 1) && myFrm.xmType == '单边'"   class="flex items-center w-full bg-[#dddddd] relative h-10 rounded-md  px-5 mt-3">
                    <div
                    class="border-none w-full h-full text-base flex justify-center items-center relative"
                    >
                    <input
                        v-model.trim="myFrm.xmb_s"
                        type="text" autocomplete="off" @change="handleChangeS"
                         
                        placeholder="洗码率单" 
                        class="input-name text-[#524d4d] bg-transparent placeholder:tracking-wider px-3 border-none outline-none focus:outline-none focus:border-none w-full h-full"
                    />
                    </div>
            </div>
            <div  v-if="(checkSD === '双边' || arrJxb[18] === '1' || this.$Global.optioner.Id == 1) && myFrm.xmType == '双边'" class="flex items-center w-full bg-[#dddddd] relative h-10 rounded-md  px-5 mt-3">
                    <div
                    class="border-none w-full h-full text-base flex justify-center items-center relative"
                    >
                    <input
                        v-model.trim="myFrm.xmb_d"
                        type="text" autocomplete="off" @change="handleChangeD"
                         
                        placeholder="洗码率双" 
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
    actionType: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      arrJxb: this.$Global.optioner.arrJxb,
      checkSD: this.$Global.optioner.xmType,
      dialogFormVisible: false,
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
      myFrm: {
        opt: '',
        memberName: '',
        memberNikeName: '',
        zcb: 0,
        xh_min: '',
        xh_max: '',
        conpw: '123aaa',
        xmb_s: '0.0', // 洗码比
        xmb_d: '0.0',
        xmType: this.$Global.optioner.xmType, // 洗码类型
        depositMoney: '0', // 存入金额
        memo: '', // 特别的备注
        pw: '123aaa', // 帐号密码
        drawMoneyPw: '' // 存款
      },
      type: '',
      ispfqx: false,
      pfdisable: false,
      propData: {},
      topupAuth: true,
      autoWash: false,
      isMe: false,
      is_refresh: false,
      timeer: null
    }
  },
  computed: {
    ...mapState({
      upper: state => state.ht.referenceInfo,
      optionerScore: state => state.ht.optionerScore,
      isSub: state => state.user.isSubAccount,
      subInfo: state => state.user.subInfo
    }),
    ...mapGetters(['EDIT_MY_MEMBER_OK', 'device'])
  },
  watch: {
    actionType: function(nv, ov) {
      if (nv === 'agent') {
        this.type = '添加代理'
        this.myFrm.memberName = this.randomString(6)
        parseInt(this.$Global.optioner.xh_min) <= 20 ? this.myFrm.xh_min = 20 : this.myFrm.xh_min = parseInt(this.$Global.optioner.xh_min) + ''
        parseInt(this.$Global.optioner.xh_max) >= 30000 ? this.myFrm.xh_max = 30000 : this.myFrm.xh_max = parseInt(this.$Global.optioner.xh_max) + ''
      }
      if (nv === 'player') {
        this.type = '添加会员'
        this.myFrm.memberName = this.randomString(8)
        parseInt(this.$Global.optioner.xh_min) <= 20 ? this.myFrm.xh_min = 20 : this.myFrm.xh_min = parseInt(this.$Global.optioner.xh_min) + ''
        parseInt(this.$Global.optioner.xh_max) >= 5000 ? this.myFrm.xh_max = 5000 : this.myFrm.xh_max = parseInt(this.$Global.optioner.xh_max) + ''
      }
      this.myFrm.pw = this.GenerateInviteCode(8)
     // this.myFrm.conpw = '123aaa'
      if (nv === 'pfagent') this.type = '添加配分代理'
      // parseInt(this.$Global.optioner.xh_min) <= 20 ? this.myFrm.xh_min = 20 : this.myFrm.xh_min = parseInt(this.$Global.optioner.xh_min) + ''
      // parseInt(this.$Global.optioner.xh_max) >= 50000 ? this.myFrm.xh_max = 50000 : this.myFrm.xh_max = parseInt(this.$Global.optioner.xh_max) + ''
      parseFloat(this.$Global.optioner.xmb_d) >= 0.9 ? this.myFrm.xmb_d = 0.9 : this.myFrm.xmb_d = parseFloat(this.$Global.optioner.xmb_d)
      // eslint-disable-next-line
      if (this.$Global.optioner.isTop || this.$Global.optioner.Id == 1) {
        this.ispfqx = true
      } else {
        this.ispfqx = this.$Global.optioner.isPf
        // this.pfdisable = true
      }
    },
    EDIT_MY_MEMBER_OK: function(val) {
      if (val) {
        this.close()
      }
    }
  },
  methods: {
    GenerateInviteCode: (len) => {
      let result = ''
      const characters = len === 2 ? 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890' : 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890'
      const charactersLength = characters.length

      for (let i = 0; i < len; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength))
      }
      return result
    },
    clickRefreshPw() {
      this.addMemberDigFrm.pw = this.GenerateInviteCode(8)
    },
    changeXmType(t) {
      // console.log('type ', t)
      if (t === '单边') this.myFrm.xmb_s = 0
      if (t === '双边') this.myFrm.xmb_d = 0.9
    },
    close() {
      if (this.type === '添加代理' && this.isMe) {
        this.$emit('_AddMyMemberOK_', true, true)
        this.isMe = false
      } else {
        this.$emit('_AddMyMemberOK_', false, true)
      }
      this.dialogFormVisible = false
      // this.myFrm.xmType = this.$Global.optioner.xmType
      this.myFrm.memberName = ''
      this.myFrm.memberNikeName = ''
      this.myFrm.depositMoney = 0
      this.myFrm.memo = ''
      this.myFrm.pw = ''
      this.myFrm.conpw = ''
      this.myFrm.drawMoneyPw = ''
      this.myFrm.zcb = 0
      this.myFrm.xmb_s = 0
      this.myFrm.xmb_d = 0
      this.autoWash = false
      if (this.actionType === 'agent') {
        this.myFrm.memberName = this.randomString(6)
      }
      if (this.actionType === 'player') {
        this.myFrm.memberName = this.randomString(8)
      }
      this.$store.commit('ht/setAddMyMemberState', false)
    },
    closeDia() {
      this.Cancel()
    },
    clickRefresh() {
      this.timeer = null
      this.is_refresh = true
      this.timeer = setTimeout(() => {
        this.is_refresh = false
        if (this.type === '添加会员') {
          this.myFrm.memberName = this.randomString(8)
        }
        if (this.type === '添加代理') {
          this.myFrm.memberName = this.randomString(6)
        }
      }, 500)
    },
    actionTypeChange(t) {
      if (t === '添加会员') {
        this.myFrm.memberName = this.randomString(8)
        parseInt(this.$Global.optioner.xh_min) <= 20 ? this.myFrm.xh_min = 20 : this.myFrm.xh_min = parseInt(this.$Global.optioner.xh_min) + ''
        parseInt(this.$Global.optioner.xh_max) >= 5000 ? this.myFrm.xh_max = 5000 : this.myFrm.xh_max = parseInt(this.$Global.optioner.xh_max) + ''
      }
      if (t === '添加代理') {
        this.myFrm.memberName = this.randomString(6)
        parseInt(this.$Global.optioner.xh_min) <= 20 ? this.myFrm.xh_min = 20 : this.myFrm.xh_min = parseInt(this.$Global.optioner.xh_min) + ''
        parseInt(this.$Global.optioner.xh_max) >= 30000 ? this.myFrm.xh_max = 30000 : this.myFrm.xh_max = parseInt(this.$Global.optioner.xh_max) + ''
      }
    },
    randomString(length) {
      var chars = '123567890'
      var charLength = chars.length
      var result = ''
      for (var i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * charLength))
      }
      return result
    },
    // 限制输入特殊字符
    btKeyUp(e) {
      e.target.value = e.target.value.replace(/[`~!#$%^&*()\-+=<>?:'{}|,.\/;'\\[\]·~]/g, '')
    },
    handleChangeZ(value) {
      if (this.$Global.optioner.zcb < value) {
        // this.myFrm.zcb = 0
        this.$toast('洗码比例不能超过上级')
      }
    },
    handleChangeD(value) {
      if (this.$Global.optioner.xmb_d < value) {
        // this.myFrm.xmb_d = 0
        this.$toast('洗码比例不能超过上级')
      }
    },
    handleChangeS(value, e) {
      if (value > this.$Global.optioner.xmb_s) {
        // this.myFrm.xmb_s = 0
        this.$toast('洗码比例不能超过上级')
      }
    },
    Ok() {
      this.$refs.myFrm.validate(valid => {
        if (valid) {
          if (this.$Global.optioner.UserName === 'hjhy' && this.type === '添加代理') return this.$toast('皇家会员上不可添加代理号！')
          if (this.$Global.optioner.UserName === 'hjdl' && this.type === '添加会员') return this.$toast('皇家代理上不可添加会员号！')
          const frm = this.myFrm
          if (this.type === '') {
            this.$toast('洗码比不能为空')
          }
          if (frm.xmb_s > this.$Global.optioner.xmb_s || frm.xmb_d > this.$Global.optioner.xmb_d) {
            this.$toast('洗码比例不能超过上级')
            return
          }
          if (frm.zcb > this.$Global.optioner.zcb) {
            this.$toast('占成比例不能超过上级')
            return
          }
          // eslint-disable-next-line
          if (frm.xh_min == '' || frm.xh_max == '') return this.$toast('请输入限红!')
          if (frm.xh_min <= 0 || frm.xh_max <= 0) return this.$toast('限红不可小于零!')
          if (parseInt(frm.xh_min) < parseInt(this.$Global.optioner.xh_min) || parseInt(frm.xh_max) > parseInt(this.$Global.optioner.xh_max)) return this.$toast('限红不能超过上级!')

          const sendStr = {
            router: 'addMember',
            JsonData: {
              name: frm.memberName,
              nikename: frm.memberNikeName || '',
              xmb_s: (frm.xmType === '双边' && this.type === '添加代理') ? frm.xmb_d : frm.xmb_s || 0,
              xmb_d: frm.xmType === '双边' ? frm.xmb_d || 0 : 0,
              xmKind: frm.xmType === '双边' ? 0 : 1,
              xh: frm.xh_min + '-' + frm.xh_max,
              depositMoney: frm.depositMoney || 0,
              memo: frm.memo || '',
              zc: frm.zcb || 0,
              optLevel: (this.type === '添加代理' || this.type === '添加配分代理') ? 1 : 2, // 1 添加代理,2 添加会员              pw: this.$md5(frm.pw),
              pw: this.$md5(frm.pw),
              opt_name: this.$Global.optioner.UserName,
              opt_Id: this.$Global.optioner.Id,
              upper_name: this.$Global.optioner.UserName,
              ip: this.$store.state.ht.ip || '',
              proxyname: this.isSub ? this.subInfo.name : '',
              // pf: this.actionType === 'pfagent' ? 1 : 0 // 1：配分代理 0：不是
              pf: (this.ispfqx && this.type === '添加代理') ? 1 : 0, // 1：配分代理 0：不是
              topup_auth: (this.topupAuth && this.upper.is_cash === 0) ? 1 : 0, // 在线充值权限
              auto_wash: this.autoWash ? 1 : 0, // 自动结算权限
              wash_type: (this.autoWash && this.autoWashType !== null) ? this.autoWashType : 0 // 自动结算周期 0:non 1:day 2:week 3:month
            }
          }
          this.$store.commit('ht/setAddMyMemberState', false)
          this.isMe = true
          this.$pomelo.send(sendStr)
          // console.log('sendStr ', sendStr)
        } else {
          console.log('error submit!!')
          return
        }
      })
    },
    Cancel() {
      this.myFrm.memberName = ''
      this.myFrm.memberNikeName = ''
      this.myFrm.depositMoney = 0
      this.myFrm.memo = ''
      this.autoWash = false
      this.myFrm.pw = ''
      this.myFrm.conpw = ''
      this.myFrm.drawMoneyPw = ''
      this.myFrm.zcb = 0
      this.myFrm.xmb_s = 0
      this.myFrm.xmb_d = 0
      this.myFrm.xh_min = ''
      this.myFrm.xh_max = ''
      if (this.actionType === 'agent') {
        this.myFrm.memberName = this.randomString(6)
      }
      if (this.actionType === 'player') {
        this.myFrm.memberName = this.randomString(8)
      }
      this.dialogFormVisible = false
    }
  }
}
</script>