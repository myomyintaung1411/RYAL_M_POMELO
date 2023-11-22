<template>
    <div>
       <van-popup  v-model="dialogFormVisible" closeable @close="Cancel" :lock-scroll="false"
      position="bottom"  :style="{ height: '90%' }" style="overflow-y: auto;">
       <div class="px-3 py-5 w-full relative overflow-y-auto">
        <span class="font-bold text-lg">设定代理</span>
         

        <form @click.prevent class="w-full rounded-lg flex flex-col  ">
         <section class="flex space-x-1">
          <section class=" flex-1">
            <div  class="flex items-center w-full bg-[#dddddd] relative h-10 rounded-md  px-5 mt-3">
                    <div
                    class="border-none w-full h-full text-base flex justify-center items-center relative"
                    >
                    <input
                        v-model.trim="Form.username"
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
                      v-model="Form.nicheng"
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
            <div v-if="(setupData.reference_name == info.username || info.gx.split('^').length <= 3)"  class="flex items-center w-full bg-[#dddddd] relative h-10 rounded-md  px-5 mt-3">
                    <div
                    class="border-none w-full h-full text-base flex justify-center items-center relative"
                    >
                    <input
                        v-model.trim="Form.memo"
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
                        v-model.trim="Form.xh_min"
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
                        v-model.trim="Form.xh_max"
                        type="text" autocomplete="off"
                         
                        placeholder="最高限红" 
                        class="input-name text-[#524d4d] bg-transparent placeholder:tracking-wider px-3 border-none outline-none focus:outline-none focus:border-none w-full h-full"
                    />
                    </div>
            </div>
            <div class=" w-full relative  mt-3 bg-[#dddddd] rounded-md h-10 ">
             <!-- <div class="text-left font-bold">权限 :</div> -->
              <div class="flex  space-x-1 h-full items-center justify-center text-xs">
                <van-checkbox icon-size="14" v-model="topupAuth">在线充值</van-checkbox>
                  <van-checkbox icon-size="14" v-model="autoWash">自动结算</van-checkbox>
              </div>
           </div>
            <div class=" w-full relative  mt-3 bg-[#dddddd] rounded-md h-10 ">
             <!-- <div class="text-left font-bold">权限 :</div> -->
              <div class="flex  space-x-1 h-full items-center px-2">
               <van-button  v-if="Form.pf" type="primary" size="mini" @click="changePfAuth(0)">是</van-button>
               <van-button   v-else type="primary" size="mini" @click="changePfAuth(1)">否</van-button>
              </div>
           </div>
          </section>

        </section> 
        <div   class="flex items-center w-full relative h-10 rounded-md bg-[#dddddd]   mt-3  ">
                <div  v-if="info.arrJxb[18] == '1' || upper.xm_type == 0" class="w-full">
                    <van-dropdown-menu     @change="changeXmType" class="w-full" direction="up" >
                <van-dropdown-item v-model="Form.xmKind" :options="optionsType"   />
                </van-dropdown-menu>
                </div>
                <div v-else
                    class="border-none w-full h-full text-base flex justify-center items-center relative"
                    >
                    <input
                        v-model.trim="Form.xmKind"
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

           <div v-if="setupData.level != 3" class="flex items-center w-full bg-[#dddddd] relative h-10 rounded-md  px-5 mt-3">
                    <div
                    class="border-none w-full h-full text-base flex justify-center items-center relative"
                    >
                    <input
                        v-model.trim="Form.zc"
                        type="tel" autocomplete="off" @change="handleChangeZ"
                         
                        placeholder="占成比例" 
                        class="input-name text-[#524d4d] bg-transparent placeholder:tracking-wider px-3 border-none outline-none focus:outline-none focus:border-none w-full h-full"
                    />
                    </div>
            </div>

            <div  v-if="(info.xm_type == 1 || info.xm_type == 0 || info.arrJxb[18] == '1') && Form.xmKind == 1"  class="flex items-center w-full bg-[#dddddd] relative h-10 rounded-md  px-5 mt-3">
                    <div
                    class="border-none w-full h-full text-base flex justify-center items-center relative"
                    >
                    <input
                        v-model.trim="Form.xmb_s"
                        type="tel" autocomplete="off" @change="handleChangeS"
                         
                        placeholder="洗码率单" 
                        class="input-name text-[#524d4d] bg-transparent placeholder:tracking-wider px-3 border-none outline-none focus:outline-none focus:border-none w-full h-full"
                    />
                    </div>
            </div>
            <div  v-if="(info.xm_type == 0 || info.arrJxb[18] == '1') && Form.xmKind == 0" class="flex items-center w-full bg-[#dddddd] relative h-10 rounded-md  px-5 mt-3">
                    <div
                    class="border-none w-full h-full text-base flex justify-center items-center relative"
                    >
                    <input
                        v-model.trim="Form.xmb_d"
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
/* eslint-disable */
import { mapState, mapGetters } from 'vuex'
import { setUpMemberApi, updatePfApi } from '@/api/ht'

export default {
  props: {
    setupData: {
      type: Object,
      default: null
    },
    upper: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      optionsType: [
        {
          value: 1,
          text: '单边'
        },
        {
          value: 0,
          text: '双边'
        }
      ],
      dialogFormVisible: false,
      loading:false,
      accountPw: '',
      drawMoneyPw: '',
      oneKeyPw: '',
      webAddr: '',
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
      Form: {
        nicheng: '',
        username: '',
        zc: '',
        xmb_s: '',
        xmb_d: '',
        xmKind: '',
        accountPw: '', // 账号密码,不修改留空
        xh_min: '',
        xh_max: '',
        pw: '',
        memo: '',
        pf: false
      }
    }
  },
  computed: {
    ...mapState({
      isSub: state => state.user.isSubAccount,
      subInfo: state => state.user.subInfo
    }),
    ...mapGetters(['info', 'device'])
  },
  watch: {
    setupData: {
      handler(newValue, oldValue) {
        this.Form.nicheng = newValue.nicheng
        this.Form.username = newValue.username
        this.Form.zc = newValue.zc
        this.Form.xmb_s = newValue.xmb_s
        this.Form.xmb_d = newValue.xmb_d
        this.Form.xmKind = newValue.xm_type
        this.Form.xh_min = newValue.xh_min.toString()
        this.Form.xh_max = newValue.xh_max.toString()
        this.Form.memo = newValue.memo
        this.Form.pf = newValue.pf
        this.topupAuth = newValue.yj === 1
        this.autoWash = newValue.autoWash === 1
        this.autoWashType = newValue.washType === 0 ? 1 : newValue.washType
      }
    }
  },
  methods: {
    changeXmType(t) {
      if (t === 1) this.Form.xmb_s = 0
      if (t === 0) this.Form.xmb_d = 0.9
    },
    close() {
      this.accountPw = ''
      this.autoWash = false
      this.autoWashType = 1
      this.dialogFormVisible = false
      this.$store.commit('ht/setModifiyState', false)
    },
    handleChangeZ(value) {
      if (this.upper.zc < value) {
        this.$toast('占成比例不能超过上级')
      }
    },
    handleChangeD(value) {
      if (this.upper.xmb_d < value) {
        this.$toast('洗码比例不能超过上级')
      }
    },
    handleChangeS(value, e) {
      if (value > this.upper.xmb_s) {
        this.$toast('洗码比例不能超过上级')
      }
    },
    Ok() {
      var frm = this.Form
      if (frm.zc > this.upper.zc) {
        return this.$toast('占成比例不能超过上级')
      }
      if (frm.xmb_s > this.upper.xmb_s || frm.xmb_d > this.upper.xmb_d) {
        return this.$toast('洗码比例不能超过上级')
      }
      if (this.accountPw.length >= 1 && this.accountPw.length < 6) {
        this.$toast('密码不能小于6位数')
        return
      }
      if (this.accountPw !== '') {
        if (!/\d/.test(this.accountPw) || !/[a-zA-Z]/.test(this.accountPw)) return this.$toast('密码必须包含数字和英文字母!')
      }
      if (frm.xh_min === '' || frm.xh_max === '') return this.$toast('请输入限红!')
      if (frm.xh_min < 0 || frm.xh_max < 0) return this.$toast('限红不可小于零!')
      if (parseInt(frm.xh_min) < parseInt(this.upper.xh_min) || parseInt(frm.xh_max) > parseInt(this.upper.xh_max)) return this.$toast('限红不能超过上级!')
      const sendStr = {
        name: frm.username,
        level: this.setupData.level,
        optName: this.info.username
        // proxyname: this.isSub ? this.subInfo.name : '',
      }
      if (frm.nicheng !== this.setupData.nicheng) sendStr['nikename'] = frm.nicheng, this.change = true
      if (frm.zc !== this.setupData.zc && this.setupData.level != 3) sendStr['zc'] = frm.zc, this.change = true
      if (frm.xmb_s !== this.setupData.xmb_s) sendStr['xmb_s'] = frm.xmKind === 0 ? frm.xmb_d : frm.xmb_s, this.change = true
      if (frm.xmb_d !== this.setupData.xmb_d) {
        sendStr['xmb_d'] = frm.xmKind === 0 ? frm.xmb_d : 0
        this.change = true
      }
      if (this.accountPw.trim() !== '') sendStr['pw'] = this.accountPw.trim(), this.change = true
      if (frm.xmKind !== this.setupData.xm_type) {
        if (frm.xmKind == 1) sendStr['xmb_d'] = 0
        sendStr['xmKind'] = frm.xmKind === 0 ? 0 : 1
        this.change = true
      }
      if (frm.memo !== this.setupData.memo) sendStr['memo'] = frm.memo, this.change = true
      if (this.autoWash != this.setupData.autoWash) sendStr['auto_wash'] = this.autoWash ? 1 : 0, this.change = true
      if (this.topupAuth != this.setupData.yj) {
        sendStr['topup_auth'] = this.topupAuth ? 1 : 0
        this.change = true
      }
      if (this.autoWashType != this.setupData.washType) sendStr['wash_type'] = (this.autoWash == 1 && this.autoWashType !== null) ? this.autoWashType : 0, this.change = true
      if (this.setupData.xh !== (frm.xh_min + '-' + frm.xh_max)) sendStr['xh'] = frm.xh_min + '-' + frm.xh_max, this.change = true

      if (this.change) {
        this.loading = true
        setUpMemberApi(sendStr).then(res => {
            this.$toast(res.msg)
          if (res.code === 0) {
            this.Cancel()
            this.$emit('diaEmit', { type: 'SETUP_SUCCESS', row: res.data })
            
          }
          this.loading = false
        }).catch(e => {
          this.loading = false
          console.error('e ', e, e?.message)
        })
      } else {
        this.Cancel()
      }
    },
    Cancel() {
      this.drawMoneyPw = ''
      this.oneKeyPw = ''
      this.accountPw = ''
      this.webAddr = ''
      this.Form.nicheng = this.setupData.nicheng
      this.Form.username = this.setupData.username
      this.Form.zc = this.setupData.zc
      this.Form.xmb_s = this.setupData.xmb_s
      this.Form.xmb_d = this.setupData.xmb_d
      this.Form.xmKind = this.setupData.xm_type
      this.Form.xh_min = this.setupData.xh_min
      this.Form.xh_max = this.setupData.xh_max
      this.Form.pf = this.setupData.pf
      this.Form.memo = this.setupData.memo
      // this.showTopUpAuth = false
      this.autoWash = false
      this.autoWashType = 1

      this.dialogFormVisible = false
    },

    changePfAuth(pf) {
      if (!this.setupData) return this.$toast('请选择用户')
      const sendStr = {
        userId: this.setupData.Id,
        username: this.setupData.username,
        optid: this.info.Id,
        optname: this.info.username,
        pf: pf
      }
      let title = pf == 0 ? "您确定要 '关闭' 配分权限吗?" : "您确定要 '开启' 配分权限吗?"
      this.$dialog.confirm({title:title}).then(()=>{
        updatePfApi(sendStr).then(res => {
        if (res.code === 0) {
          this.Cancel()
          this.$emit('diaEmit', { type: 'SETUP_SUCCESS', row: res.data })
          this.$toast(res.msg)
        }
      }).catch(e => {
        console.error('e ', e, e?.message)
      })
      }).catch(()=>{

      })

    }
  }
}
</script>