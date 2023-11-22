<template>
    <div>
       <van-popup  v-model="dialogFormVisible" closeable @close="Cancel" :lock-scroll="false"
      position="bottom"  :style="{ height: '90%' }" style="overflow-y: auto;">
       <div class="px-3 py-5 w-full relative overflow-y-auto">
        <span class="font-bold text-lg">为 {{ addData.username }} 添加代理/会员</span>
         

        <form @click.prevent class="w-full rounded-lg flex flex-col  ">
         <section class="flex space-x-1">
          <section class=" flex-1">
            <div class="flex items-center w-full bg-[#dddddd] relative h-10 rounded-md  px-5 mt-3">
                    <div
                    class="border-none w-full h-full text-base flex justify-center items-center relative"
                    >
                    <van-radio-group icon-size="14" v-model="addtype" @change="actionTypeChange" direction="vertical" class="w-full text-sm  flex justify-start flex-col  items-start">
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
                        v-model.trim="Form.username"
                        type="text" autocomplete="off"
                         :readonly="info.Id == 1 ? false : true"
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
                        v-model.trim="Form.pw"
                        type="password" autocomplete="off"
                         
                        placeholder="请输入密码" 
                        class="input-name text-[#524d4d] bg-transparent placeholder:tracking-wider px-3 border-none outline-none focus:outline-none focus:border-none w-full h-full"
                    />
                    </div>
            </div>
            <div  class="flex items-center w-full bg-[#dddddd] relative h-10 rounded-md  px-5 mt-3">
                    <div
                    class="border-none w-full h-full text-base flex justify-center items-center relative"
                    >
                    <input
                        v-model.trim="Form.conpw"
                        type="password" autocomplete="off"
                         
                        placeholder="确认密码" 
                        class="input-name text-[#524d4d] bg-transparent placeholder:tracking-wider px-3 border-none outline-none focus:outline-none focus:border-none w-full h-full"
                    />
                    </div>
            </div>
            <div  class="flex items-center w-full bg-[#dddddd] relative h-10 rounded-md  px-5 mt-3">
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
                    class="border-none w-full space-x-2 h-full text-base flex  items-center relative"
                    >
                    <span>上级</span>
                    <span>{{ addData.username }}</span>
                    </div>
            </div>
            <div  class="flex items-center w-full bg-[#dddddd] relative h-10 rounded-md  px-5 mt-3">
                    <div
                    class="border-none w-full h-full text-base flex justify-center items-center relative"
                    >
                    <input
                        v-model.trim="Form.memberNikeName"
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
              <div class="flex  space-x-1 h-full items-center justify-center text-xs whitespace-nowrap">
                <van-checkbox v-if="type !== 'player' && addData.pf" v-model="Form.pf">配分权限</van-checkbox>
             <van-checkbox v-if="addData.yj == 1" v-model="Form.yj">在线充值</van-checkbox>
              <van-checkbox v-model="Form.autoWash" >自动结算</van-checkbox>
              </div>
           </div>
          </section>

        </section> 
        <div class="flex items-center w-full relative h-10 rounded-md bg-[#dddddd]   mt-3  ">
                <van-dropdown-menu  :disabled="addData.xm_type == 1"  @change="changeXmType" class="w-full" direction="up" >
                <van-dropdown-item v-model="Form.xmKind" :options="options"   />
                </van-dropdown-menu>
           </div>
           <div v-if="type == 'agent'" class="flex items-center w-full bg-[#dddddd] relative h-10 rounded-md  px-5 mt-3">
                    <div
                    class="border-none w-full h-full text-base flex justify-center items-center relative"
                    >
                    <input
                        v-model.trim="Form.zc"
                        type="text" autocomplete="off" @change="handleChangeZ"
                         
                        placeholder="占成比例" 
                        class="input-name text-[#524d4d] bg-transparent placeholder:tracking-wider px-3 border-none outline-none focus:outline-none focus:border-none w-full h-full"
                    />
                    </div>
            </div>
            <div  v-if="(addData.xm_type == 1  || addData.xm_type == 0 || info.arrJxb[18] == 1 || info.Id == 1) && Form.xmKind == 1"  class="flex items-center w-full bg-[#dddddd] relative h-10 rounded-md  px-5 mt-3">
                    <div
                    class="border-none w-full h-full text-base flex justify-center items-center relative"
                    >
                    <input
                        v-model.trim="Form.xmb_s"
                        type="text" autocomplete="off" @change="handleChangeS"
                         
                        placeholder="洗码率单" 
                        class="input-name text-[#524d4d] bg-transparent placeholder:tracking-wider px-3 border-none outline-none focus:outline-none focus:border-none w-full h-full"
                    />
                    </div>
            </div>
            <div  v-if="(addData.xm_type == 0 || info.arrJxb[18] == 1 || info.Id == 1) && Form.xmKind == 0" class="flex items-center w-full bg-[#dddddd] relative h-10 rounded-md  px-5 mt-3">
                    <div
                    class="border-none w-full h-full text-base flex justify-center items-center relative"
                    >
                    <input
                        v-model.trim="Form.xmb_d"
                        type="text" autocomplete="off" @change="handleChangeD"
                         
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
import { addMemberApi } from '@/api/ht'

export default {
  props: {
    addData: {
      type: Object,
      default: null
    },
    type: {
      type: String,
      default: ''
    }
  },
  data() {
    var checkmemberName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error(this.$t('message.must_enter_account')))
      } else if (value.length < 2) {
        return callback(new Error(this.$t('message.acocunt_length_gt_2')))
      } else {
        callback()
      }
    }
    var checkpw = (rule, value, callback) => {
      if (!value) {
        return callback(new Error(this.$t('message.must_enter_password')))
      } else if (value.length < 6) {
        return callback(new Error(this.$t('message.password_length_gt_6')))
      } else if (value !== '') {
        if (!/\d/.test(value) || !/[a-zA-Z]/.test(value)) {
          return callback(new Error(this.$t('message.password_must_include_string_number')))
        } else {
          callback()
        }
      } else {
        callback()
      }
    }
    var checkconpw = (rule, value, callback) => {
      if (!value) {
        return callback(new Error(this.$t('message.must_enter_password')))
      } else if (value.length < 6) {
        return callback(new Error(this.$t('message.password_length_gt_6')))
      } else if (value !== '') {
        if (!/\d/.test(value) || !/[a-zA-Z]/.test(value)) {
          return callback(new Error(this.$t('message.password_must_include_string_number')))
        } else if (value !== this.Form.pw) {
          return callback(new Error('两次输入密码不一致'))
        } else {
          callback()
        }
      } else {
        callback()
      }
    }
    var checkdepositMoney = (rule, value, callback) => {
      if (value !== '') {
        if (Number(value) > this.optionerScore) {
          return callback(new Error('余额不足!'))
        } else {
          callback()
        }
      } else {
        callback()
      }
    }
    return {
      loading: false,
      is_refresh: false,
      dialogFormVisible: false,
      addtype: '',
      Form: {
        username: '',
        xmKind: '',
        xmb_d: 0,
        xmb_s: 0,
        autoWash: 0,
        zc: 0,
        memo: '',
        nicheng: '',
        xh_min: '',
        xh_max: '',
        pw: '',
        conpw: '',
        pf: '',
        yj: '',
        washType: ''
      },
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
      options: [
        {
          value: 1,
          text: '单边'
        },
        {
          value: 0,
          text: '双边'
        }
      ]
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
    addData: function(n, o) {
      console.log('n ', n)
      this.Form.xmKind = n.xm_type
      this.Form.xmb_d = n.xmb_d
      this.Form.xmb_s = n.xm_type === 0 ? 0 : n.xmb_s
      this.Form.autoWash = n.autoWash === 1
      this.Form.washType = n.autoWash === 1 ? 1 : ''
      this.Form.pw = '123aaa'
      this.Form.conpw = '123aaa'
      this.Form.pf = n.pf === 1
      this.Form.yj = n.yj === 1
      parseInt(this.addData.xh_min) <= 20 ? this.Form.xh_min = 20 + '' : this.Form.xh_min = parseInt(this.addData.xh_min) + ''
      if (this.type === 'player') {
        parseInt(this.addData.xh_max) >= 5000 ? this.Form.xh_max = 5000 + '' : this.Form.xh_max = parseInt(this.addData.xh_max) + ''
      } else {
        parseInt(this.addData.xh_max) >= 30000 ? this.Form.xh_max = 30000 + '' : this.Form.xh_max = parseInt(this.addData.xh_max) + ''
      }
      parseFloat(this.addData.xmb_d) >= 0.9 ? this.Form.xmb_d = 0.9 : this.Form.xmb_d = parseFloat(this.addData.xmb_d)
    },
    type: function(nv, ov) {
      this.addtype = nv
      if (nv === 'agent') {
        // this.type = this.$t('add_user_dialog.add_agent')
        this.Form.username = this.randomString(6)
        parseInt(this.addData.xh_min) <= 20 ? this.Form.xh_min = 20 + '' : this.Form.xh_min = parseInt(this.addData.xh_min) + ''
        parseInt(this.addData.xh_max) >= 30000 ? this.Form.xh_max = 30000 + '' : this.Form.xh_max = parseInt(this.addData.xh_max) + ''
      }
      if (nv === 'player') {
        // this.type = this.$t('add_user_dialog.add_player')
        this.Form.username = this.randomString(8)
        parseInt(this.addData.xh_min) <= 20 ? this.Form.xh_min = 20 + '' : this.Form.xh_min = parseInt(this.addData.xh_min) + ''
        parseInt(this.addData.xh_max) >= 5000 ? this.Form.xh_max = 5000 + '' : this.Form.xh_max = parseInt(this.addData.xh_max) + ''
      }
    }
  },
  methods: {
    changeXmType(t) {
      if (t === 1) this.Form.xmb_s = 0
      if (t === 0) this.Form.xmb_d = 0.9
    },
    close() {
      this.dialogFormVisible = false
      this.Form.username = ''
      // this.Form.xmKind = ''
      this.Form.xmb_d = 0
      this.Form.xmb_s = 0
      this.Form.autoWash = 0
      this.Form.zc = 0
      this.Form.memo = ''
      this.Form.nicheng = ''
      this.Form.xh_min = ''
      this.Form.xh_max = ''
      this.Form.pw = '123aaa'
      this.Form.conpw = '123aaa'
      this.Form.pf = ''
      this.Form.yj = ''
      this.Form.washType = ''
    },
    closeDia() {
      this.close()
    },
    clickRefresh() {
      this.timeer = null
      this.is_refresh = true
      this.timeer = setTimeout(() => {
        this.is_refresh = false
        if (this.addtype === 'player') {
          this.Form.username = this.randomString(8)
        }
        if (this.addtype === 'agent') {
          this.Form.username = this.randomString(6)
        }
      }, 500)
    },
    actionTypeChange(t) {
      if (t === 'player') {
        this.Form.username = this.randomString(8)
        parseInt(this.addData.xh_min) <= 20 ? this.Form.xh_min = 20 + '' : this.Form.xh_min = parseInt(this.addData.xh_min) + ''
        parseInt(this.addData.xh_max) >= 5000 ? this.Form.xh_max = 5000 + '' : this.Form.xh_max = parseInt(this.addData.xh_max) + ''
      }
      if (t === 'agent') {
        this.Form.username = this.randomString(6)
        parseInt(this.addData.xh_min) <= 20 ? this.Form.xh_min = 20 + '' : this.Form.xh_min = parseInt(this.addData.xh_min) + ''
        parseInt(this.addData.xh_max) >= 30000 ? this.Form.xh_max = 30000 + '' : this.Form.xh_max = parseInt(this.addData.xh_max) + ''
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
    handleChangeZ(value) {
      if (this.addData.zcb < value) {
        this.$toast('占成比例不能超过上级!')
      }
    },
    handleChangeD(value) {
      if (this.addData.xmb_d < value) {
        this.$toast('洗码比例不能超过上级')
      }
    },
    handleChangeS(value, e) {
      if (value > this.addData.xmb_s) {
        this.$toast('洗码比例不能超过上级')
      }
    },
    Ok() {
      if(this.Form.username == '') return this.$toast('账号必填')
      if(this.Form.length < 2) return this.$toast('帐号不能小于2位')
      if(this.Form.pw == '' || this.Form.conpw ) return this.$toast('密码必填')
      if(!/\d/.test(this.Form.pw) || !/[a-zA-Z]/.test(this.Form.pw)) return this.$toast('密码必须包含数字和英文字母')
      if(!/\d/.test(this.Form.conpw) || !/[a-zA-Z]/.test(this.Form.conpw)) return this.$toast('密码必须包含数字和英文字母')

          if (this.addData.username === 'hjhy' && this.type === '添加代理') return this.$toast('皇家会员上不可添加代理号！')
          if (this.addData.username === 'hjdl' && this.type === '添加会员') return this.$toast('皇家代理上不可添加会员号！')
          const frm = this.Form
          if (this.type === '') {
            return this.$toast('请选择操作类型!')
          }
          if (frm.xmb_s === '' || frm.xmb_d === '') {
            this.$toast('洗码比不能为空!')
            return
          }
          if (frm.xmb_s > this.addData.xmb_s || frm.xmb_d > this.addData.xmb_d) {
            this.$toast('洗码比例不能超过上级!')
            return
          }
          if (frm.zcb > this.addData.zcb) {
            this.$toast('占成比例不能超过上级!')
            return
          }
          // eslint-disable-next-line
          if (frm.xh_min === '' || frm.xh_max === '') return this.$toast('请输入限红!')
          if (frm.xh_min <= 0 || frm.xh_max <= 0) return this.$toast('限红不可小于零!')
          if (parseInt(frm.xh_min) < parseInt(this.addData.xh_min) || parseInt(frm.xh_max) > parseInt(this.addData.xh_max)) return this.$toast('限红不能超过上级!')
          const sendStr = {
            name: frm.username,
            nikename: frm.nicheng || '',
            xmb_s: (frm.xmKind === 0 && this.type === 'agent') ? frm.xmb_d : frm.xmb_s || 0,
            xmb_d: frm.xmKind === 0 ? frm.xmb_d || 0 : 0,
            xmKind: frm.xmKind === 0 ? 0 : 1,
            xh: frm.xh_min + '-' + frm.xh_max,
            depositMoney: 0,
            memo: frm.memo || '',
            zc: frm.zc || 0,
            optLevel: this.type === 'agent' ? 1 : 2, // 1 添加代理,2 添加会员
            pw: frm.pw,
            opt_name: this.info.username,
            opt_Id: this.info.Id,
            upper_name: this.addData.username,
            proxyname: this.isSub ? this.subInfo.name : '',
            pf: (frm.pf && this.type === 'agent') ? 1 : 0, // 1：配分代理 0：不是
            topup_auth: this.addData.yj === 1 ? 1 : 0, // 在线充值权限
            auto_wash: this.Form.autoWash ? 1 : 0, // 自动结算权限
            wash_type: this.Form.autoWash !== null ? this.Form.autoWash : 0 // 自动结算周期 0:non 1:day 2:week 3:month
          }
          this.loading = true
          addMemberApi(sendStr).then(res => {
            if (res.code === 0) {
              this.$toast(res.msg)
              this.close()
              this.$emit('diaEmit', { type: 'ADD_MEMBER', val: this.addtype })
            }else{
              this.$toast(res.msg)
            } 
            this.loading = false
          }).catch(e => {
            this.loading = false
            console.error('e ', e, e?.message)
          })
        
      
    },
    Cancel() {
      this.close()
    }
  }
}
</script>

  