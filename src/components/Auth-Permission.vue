<template>
    <div>
       <van-popup  v-model="dialogFormVisible" closeable @close="Cancel"
      position="bottom"  :style="{ height: '50%' }">
       <div class="px-3 py-10 w-full relative">
        <span class="font-bold text-lg">修改 {{ agentAuth.username }} 权限</span>
        <div class=" w-full relative  mt-3 ">
            <div class="text-left font-bold">主要设定 :</div>
            <van-checkbox-group icon-size="12" v-model="limitSetupDigFrm.checkLimitList1" direction="horizontal">
            <van-checkbox class="flex py-1 items-center" v-for="(item, index) in limitSetupDigFrm.limits1" :key="item" :name="index">{{item}}</van-checkbox>
        </van-checkbox-group>
        </div>
        <div class=" w-full relative  mt-3 ">
            <div class="text-left font-bold">报表设定 :</div>
            <van-checkbox-group icon-size="12" v-model="limitSetupDigFrm.checkLimitList2" direction="horizontal">
            <van-checkbox class="flex py-1 items-center" v-for="(item, index) in limitSetupDigFrm.limits2" :key="item" :name="index">{{item}}</van-checkbox>
        </van-checkbox-group>
        </div>
        <div class=" w-full relative  mt-3 ">
            <div class="text-left font-bold">其他设定 :</div>
            <van-checkbox-group icon-size="12" v-model="limitSetupDigFrm.checkLimitList3" direction="horizontal">
            <van-checkbox class="flex py-1 items-center" v-for="(item, index) in limitSetupDigFrm.limits3" :key="item" :name="index">{{item}}</van-checkbox>
        </van-checkbox-group>
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
       </div>
    </van-popup>
    </div>
  </template>
  
  <script>
  import { mapState } from 'vuex'
  
  export default {
    props: ['authSubData'],

    data() {
      return {
        loading: false,
      dialogFormVisible: false,
      agentAuth: {},
        limitSetupDigFrm: {
          limit: '',
          checkLimitList1: [],
          checkLimitList2: [],
          checkLimitList3: [],
          limits1: [],
          limits2: [],
          limits3: [],
          limit_para1: [
            '代理管理',   
             '会员管理' ,  
             '会员总表'   , 
            '修改会员/代理',
            '启用/停用会员、代理',
            '添加会员/代理',
            '给下级添加会员/代理',
            '加分减分',
          ],
          limit_para2: [
            '输赢报表',
            '会员交易',
             '在线投注'
          ],
          limit_para3: [
            '添加子帐号',
            '修改子帐号',
            '设置权限',
            '一键结算洗码',
            '结算洗码',
             '在线客服',
             '代理公告',
             '编辑洗码类型'
            // this.$t('auth_dialog.pf_permission') // '配分权限'
          ],
          jxb: ''
        }
      }
    },
    computed: {
      ...mapState({
      limitSetup: state => state.ht.agentLimit,
      device: state => state.app.device
    })
    },
    watch: {
    authSubData: {
      handler(newValue, oldValue) {
        this.agentAuth = newValue
        // console.log('ssssssssss', this.agentAuth)
        // console.log(this.agentAuth, this.limitSetup.jxb1, this.$Global.optioner.arrJxb)
        // this.auth = this.agentAuth.jxb.split(',')
        this.limitSetupDigFrm.limit = this.limitSetup
        this.listAuth()
      }
    }
  },
    methods: {
      listAuth() {
      var LimitSetupFrm = this.limitSetupDigFrm
      var upperLimit = LimitSetupFrm.limit.jxb1 // 上级权限表(jxb1)
      if (upperLimit === '') return
      LimitSetupFrm.limits1 = []
      LimitSetupFrm.limits2 = []
      LimitSetupFrm.limits3 = []
      var arrUpperLimit = upperLimit.split(',')
      var arrLimit = LimitSetupFrm.limit.jxb2.split(',') // 本帐户权限表(jxb2)
      var str1 = ''
      var str2 = ''
      var str3 = ''
      var p = { p1: 0, p2: 0, p3: 0 }
      for (var i = 0; i < arrUpperLimit.length; i++) {
        if (i < 8 && arrUpperLimit[i] === '1') {
          LimitSetupFrm.limits1.push(LimitSetupFrm.limit_para1[i]) // 上级有效则显示项加入
          if (arrLimit[i] === '1') str1 += p.p1 + ',' // 标志选中
          p.p1++
        }
        if (i >= 8 && i <= 10 && arrUpperLimit[i] === '1') {
          LimitSetupFrm.limits2.push(LimitSetupFrm.limit_para2[i - 8])
          if (arrLimit[i] === '1') str2 += p.p2 + ','
          p.p2++
        }
        if (i >= 11 && i <= 18 && arrUpperLimit[i] === '1') {
          // 加权限要改
          LimitSetupFrm.limits3.push(LimitSetupFrm.limit_para3[i - 11])
          if (arrLimit[i] === '1') {
            str3 += p.p3 + ','
          }
          p.p3++
        }
      }
      if (str1 !== '') {
        str1 = str1.substr(0, str1.length - 1)
        const arr1 = str1.split(',')
        this.limitSetupDigFrm.checkLimitList1 = arr1.map(Number)
      }
      if (str2 !== '') {
        str2 = str2.substr(0, str2.length - 1)
        var arr2 = str2.split(',')
        this.limitSetupDigFrm.checkLimitList2 = arr2.map(Number)
      }
      if (str3 !== '') {
        str3 = str3.substr(0, str3.length - 1)
        var arr3 = str3.split(',')
        this.limitSetupDigFrm.checkLimitList3 = arr3.map(Number)
      }
    },
    closeDia() {
      // this.Cancel()
    },
    Ok() {
      var frm = this.limitSetupDigFrm
      var str1 = ''
      var str2 = ''
      // str3 = ''
      for (let i = 0; i < frm.limits1.length; i++) {
        if (frm.checkLimitList1.indexOf(i) >= 0) str1 += frm.limits1[i] + ','
      }
      for (let i = 0; i < frm.limits2.length; i++) {
        if (frm.checkLimitList2.indexOf(i) >= 0) str1 += frm.limits2[i] + ','
      }
      for (let i = 0; i < frm.limits3.length; i++) {
        if (frm.checkLimitList3.indexOf(i) >= 0) str1 += frm.limits3[i] + ','
      }
      str2 = ''
      for (let i = 0; i <= 7; i++) {
        str2 += (str1.indexOf(frm.limit_para1[i]) >= 0 ? '1' : '0') + ','
      }
      for (let i = 0; i <= 2; i++) {
        str2 += (str1.indexOf(frm.limit_para2[i]) >= 0 ? '1' : '0') + ','
      }
      for (let i = 0; i <= 7; i++) {
        str2 += (str1.indexOf(frm.limit_para3[i]) >= 0 ? '1' : '0') + ',' // 加权限要改
      }
      str2 = str2.substr(0, str2.length - 1)
      // console.log('1, 2', str1, str2)
      // if (frm.limit.jxb2 === str2) {
      //   this.$message.warning('权限表未做任何修改!!')
      //   return
      // }
      this.loading = true
      const sendStr = {
        router: 'limitSetup',
        JsonData: { name: this.agentAuth.name, jxb: str2 }
      } // 权限表设定值
      // console.log('send reqt limitSetup.... ___', sendStr)
      this.$pomelo.sendcb(sendStr, res => {
        this.loading = false
        var data = res.JsonData
        if (data.result === 'ok') {
          this.$toast(data.msg)
        } else {
          this.$toast(data.msg)
        }
        this.$emit('authAction', { name: 'LIMIT_AUTH_SUBAGENT' })
      })
      this.dialogFormVisible = false
    },
    Cancel() {
      this.limitSetupDigFrm.limit = this.limitSetup
      this.loading = false
      this.listAuth()
      this.dialogFormVisible = false
    }
    }
  }
  </script>
  

  