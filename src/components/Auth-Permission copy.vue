<template>
    <div>
      <el-dialog
        v-el-drag-dialog
        :title="`${$t('auth_dialog.edit')} ${authData.username} ${$t('auth_dialog.permission')}`"
        :visible.sync="dialogFormVisible"
        :close-on-click-modal="false"
        :width="device !== 'mobile' ? '500px' : '350px'"
        @close="closeDia"
      >
        {{ $t('auth_dialog.main_auth') }}：
        <el-checkbox-group v-model="limitSetupDigFrm.checkLimitList1">s
          <el-checkbox v-for="(item, index) in limitSetupDigFrm.limits1" :key="item" :label="index">
            {{ item }}
          </el-checkbox>
        </el-checkbox-group>
        <br>{{ $t('auth_dialog.report_permission') }}：
        <el-checkbox-group v-model="limitSetupDigFrm.checkLimitList2">
          <el-checkbox v-for="(item, index) in limitSetupDigFrm.limits2" :key="item" :label="index">{{ item }}</el-checkbox>
        </el-checkbox-group>
        <br>{{ $t('auth_dialog.other_permission') }}：
        <el-checkbox-group v-model="limitSetupDigFrm.checkLimitList3">
          <el-checkbox v-for="(item, index) in limitSetupDigFrm.limits3" :key="item" :label="index">{{ item }}</el-checkbox>
        </el-checkbox-group>
        <br>
        <br>
        <div slot="footer" class="dialog-footer">
          <el-button @click="Cancel()" style="margin-right: 10px;">{{ $t('buttons.cancel') }}</el-button>
          <el-button type="primary" :loading="loading" @click="Ok()">{{ $t('buttons.confirm') }}</el-button>
        </div>
      </el-dialog>
    </div>
  </template>
  
  <script>
  import { mapState, mapGetters } from 'vuex'
  import elDragDialog from '@/directive/el-drag-dialog' // base on element-ui
  import { setUserGxbApi } from '@/api/ht'
  
  export default {
    directives: { elDragDialog },
    props: {
      authData: {
        type: Object,
        default: () => {}
      },
      limitSetup: {
        type: Object,
        default: () => {}
      }
    }, // ['authData', 'limitSetup'],
    data() {
      return {
        loading: false,
        dialogFormVisible: false,
        limitSetupDigFrm: {
          limit: '',
          checkLimitList1: [],
          checkLimitList2: [],
          checkLimitList3: [],
          limits1: [],
          limits2: [],
          limits3: [],
          limit_para1: [
            this.$t('auth_dialog.agent_management'), // '代理管理'   0
            this.$t('auth_dialog.player_management'), // '会员管理'   1
            this.$t('auth_dialog.player_summary'), // '会员总表'    2
            this.$t('auth_dialog.edit_agent_player'), // '修改会员/代理'
            this.$t('auth_dialog.switch_user_state'), // '启用/停用会员、代理'
            this.$t('auth_dialog.add_user'), // '添加会员/代理'
            this.$t('auth_dialog.add_user_for_subagent'), // '给下级添加会员/代理'
            this.$t('auth_dialog.deposit_withdraw') // '加分减分'
          ],
          limit_para2: [
            this.$t('auth_dialog.win_lose_report'), // '输赢报表'
            this.$t('auth_dialog.bet_record'), // '会员交易'
            this.$t('auth_dialog.online_management') // '在线投注'
          ],
          limit_para3: [
            this.$t('auth_dialog.add_sub_account'), // '添加子帐号'
            this.$t('auth_dialog.edit_sub_account'), // '修改子帐号'
            this.$t('auth_dialog.edit_permission'), // '设置权限'
            this.$t('auth_dialog.one_click_wash'), // '一键结算洗码'
            this.$t('auth_dialog.wash_permisson'), // '结算洗码'
            this.$t('auth_dialog.service'), // '在线客服'
            this.$t('auth_dialog.public_announcement'), // '代理公告'
            this.$t('auth_dialog.edit_line') // '编辑洗码类型'
            // this.$t('auth_dialog.pf_permission') // '配分权限'
          ],
          jxb: ''
        }
      }
    },
    computed: {
      ...mapState({
        isSub: state => state.user.isSubAccount,
        subInfo: state => state.user.subInfo,
        device: state => state.app.device
      }),
      ...mapGetters(['info'])
    },
    watch: {
      authData: {
        handler(newValue, oldValue) {
          // this.agentAuth = newValue
          // this.auth = this.agentAuth.jxb.split(',')
        }
      },
      limitSetup: {
        handler(newValue, oldValue) {
          this.limitSetupDigFrm.limit = newValue
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
          if ((i >= 11 && i <= 18 && arrUpperLimit[i] === '1') && i !== 14 || i === 15) {
            // 加权限要改
            LimitSetupFrm.limits3.push(LimitSetupFrm.limit_para3[i - 11])
            if (arrLimit[i] === '1' || arrLimit[15] === '1') {
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
        this.Cancel()
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
        // if (frm.limit.jxb2 === str2) {
        //   this.$message.warning('权限表未做任何修改!!')
        //   return
        // }
        const sendStr = {
          username: this.authData.username,
          userId: this.authData.Id,
          reference_name: this.authData.reference_name,
          optname: this.info.username,
          optid: this.info.Id,
          jxb: str2
        }
        this.loading = true
        setUserGxbApi(sendStr).then(res => {
          if (res.code === 0) {
            this.Cancel()
            this.$message.success(res.msg)
            this.$emit('diaEmit', { type: 'AUTH_SUCCESS', row: '' })
          }
          this.loading = false
        }).catch(e => {
          this.loading = false
          console.error('e ', e, e?.message)
        })
        this.dialogFormVisible = false
      },
      Cancel() {
        // this.limitSetupDigFrm.limit = this.limitSetup
        // this.listAuth()
        this.loading = false
        this.dialogFormVisible = false
        this.limitSetupDigFrm = {
          limit: '',
          checkLimitList1: [],
          checkLimitList2: [],
          checkLimitList3: [],
          limits1: [],
          limits2: [],
          limits3: [],
          limit_para1: [
            this.$t('auth_dialog.agent_management'), // '代理管理'   0
            this.$t('auth_dialog.player_management'), // '会员管理'   1
            this.$t('auth_dialog.player_summary'), // '会员总表'    2
            this.$t('auth_dialog.edit_agent_player'), // '修改会员/代理'
            this.$t('auth_dialog.switch_user_state'), // '启用/停用会员、代理'
            this.$t('auth_dialog.add_user'), // '添加会员/代理'
            this.$t('auth_dialog.add_user_for_subagent'), // '给下级添加会员/代理'
            this.$t('auth_dialog.deposit_withdraw') // '加分减分'
          ],
          limit_para2: [
            this.$t('auth_dialog.win_lose_report'), // '输赢报表'
            this.$t('auth_dialog.bet_record'), // '会员交易'
            this.$t('auth_dialog.online_management') // '在线投注'
          ],
          limit_para3: [
            this.$t('auth_dialog.add_sub_account'), // '添加子帐号'
            this.$t('auth_dialog.edit_sub_account'), // '修改子帐号'
            this.$t('auth_dialog.edit_permission'), // '设置权限'
            this.$t('auth_dialog.one_click_wash'), // '一键结算洗码'
            this.$t('auth_dialog.wash_permisson'), // '结算洗码'
            this.$t('auth_dialog.service'), // '在线客服'
            this.$t('auth_dialog.public_announcement'), // '代理公告'
            this.$t('auth_dialog.edit_line') // '编辑洗码类型'
            // this.$t('auth_dialog.pf_permission') // '配分权限'
          ],
          jxb: ''
        }
      }
    }
  }
  </script>
  
  <style lang="scss" scoped>
  
  </style>
  