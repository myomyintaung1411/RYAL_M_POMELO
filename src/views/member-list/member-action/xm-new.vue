<template>
  <el-dialog
    v-el-drag-dialog
    :title="$t('xm_dialog.xi_ma')"
    :visible.sync="dialogFormVisible"
    :close-on-click-modal="false"
    :width="device !== 'mobile' ? '450px' : '350px'"
    @close="agentXMCancel"
  >
    <div>
      <font color="red" size="3">{{ $t('xm_dialog.notice_text') }}</font>
    </div>
    <br>
    <!-- <h3>{{ gotXmInfo }}</h3> -->
    <div style="display: flex; line-height: 24px">
      <span>{{ $t('xm_dialog.account') }}： </span>
      <span> {{ curXmAccount }} </span>
    </div>
    <div style="display: flex; line-height: 24px">
      <span>{{ $t('xm_dialog.line') }}： </span>
      <span> {{ gotXmInfo.xm_type === '双边' ? $t('table.multiple') : $t('table.single') }} </span>
    </div>
    <div style="display: flex; line-height: 24px">
      <span>{{ $t('xm_dialog.total_single_multiple') }}： </span>
      <span> {{ gotXmInfo.xml_s }} / {{ gotXmInfo.xml_d }}</span>
    </div>
    <div style="display: flex; line-height: 24px">
      <span>{{ $t('xm_dialog.single_line_now') }}： </span>
      <span> {{ gotXmInfo.xmb_s }} </span>
    </div>
    <div style="display: flex; line-height: 24px">
      <span>{{ $t('xm_dialog.multiple_line_now') }}： </span>
      <span> {{ gotXmInfo.xmb_d }} </span>
    </div>
    <div style="display: flex; line-height: 24px">
      <span>{{ $t('xm_dialog.previous_xi_ma_time') }}： </span>
      <span> {{ gotXmInfo.prevXmTime }} </span>
    </div>
    <div style="display: flex; line-height: 24px">
      <span>{{ $t('xm_dialog.previous_turnover') }}： </span>
      <span> {{ gotXmInfo.turnover }} </span>
    </div>
    <!-- <div style="display: flex; line-height: 24px">
      <span>最后一次洗码时间： </span>
      <span> {{ gotXmInfo.lastXmTime }} </span>
    </div> -->
    <div style="display: flex; line-height: 24px">
      <span>{{ $t('xm_dialog.now_xi_ma_time') }}： </span>
      <span> {{ gotXmInfo.curXmTime }} </span>
    </div>
    <div style="display: flex; line-height: 24px">
      <span>{{ $t('xm_dialog.wash_money') }}： </span>
      <span> {{ gotXmInfo.curXmf }} </span>
    </div>
    <br>
    <!-- <el-input v-model="sendxmyj" type="number" :readonly="true" :placeholder="$t('xm_dialog.input_xi_ma_plh')">
      <template slot="prepend">{{ $t('xm_dialog.final_wash_money') }}</template>
    </el-input> -->
    <div style="display: flex; line-height: 24px">
      <span>{{ $t('xm_dialog.final_wash_money') }}： </span>
      <span> {{ sendxmyj }} </span>
    </div>
    <br>
    <!-- <hr /> -->
    <div slot="footer" class="dialog-footer">
      <el-button @click="agentXMCancel()">{{ $t('buttons.cancel') }}</el-button>
      <el-button type="primary" :loading="loading" @click="agentXMOk(gotXmInfo)">{{ $t('buttons.confirm') }}</el-button>
    </div>
  </el-dialog>
</template>

<script>
/* eslint-disable */
import { mapState, mapGetters } from 'vuex'
import elDragDialog from '@/directive/el-drag-dialog'

export default {
  directives: { elDragDialog },
  // eslint-disable-next-line
  props: ['xmData'],
  data() {
    return {
      dialogFormVisible: false,
      curXmAccount: '',
      sendxmyj: 0,
      loading: false
    }
  },
  computed: {
    ...mapState({
      gotXmInfo: state => state.ht.gotXmInfo,
      isSub: state => state.user.isSubAccount,
      subInfo: state => state.user.subInfo
    }),
    ...mapGetters(['SETLASTXMTIME_OK', 'token', 'device'])
  },
  watch: {
    xmData: {
      handler(newValue, oldValue) {
        this.curXmAccount = newValue.agentAccount
        this.xmUserId = newValue.Id
        this.sendxmyj = this.gotXmInfo.curXmf || 0
      }
    },
    SETLASTXMTIME_OK: function(val) {
      if (val) {
        this.$emit('xmSuccess')
        this.loading = false
        this.agentXMCancel()
        this.$store.commit('ht/setLastXmState', false)
      }
    }
  },
  methods: {
    agentXMCancel() {
      this.sendxmyj = 0
      this.$store.state.ht.gotXmInfo = {}
      this.loading = false
      this.dialogFormVisible = false
    },
    agentXMOk() {
      // eslint-disable-next-line
      if (this.xmUserId == '') return
      if (parseFloat(this.sendxmyj) > parseFloat(this.gotXmInfo.curXmf)) {
        return this.$message.error(this.$t('message.xi_ma_amount_cannot_gt_he_get'))
      }
      if (parseFloat(this.sendxmyj) < 0) return this.$message.warning(this.$t('message.xi_ma_error'))
      if (this.sendxmyj == '' || isNaN(this.sendxmyj) || this.sendxmyj == 0) return this.$message.warning(this.$t('message.enter_xi_ma_money'))
      // if (this.sendxmyj == '') return this.$message.error('请输入洗码金额')
      this.loading = true
      let sxje = parseFloat(this.gotXmInfo.curXmf) - parseFloat(this.sendxmyj)
      let zje = parseFloat(this.gotXmInfo.curXmf)
      if (sxje === null || zje === null) return this.$message.warning('洗码金额有误!')
      const sendStr = {
        router: 'setLastXmTime',
        JsonData: {
          userId: this.xmUserId, // 被操作者的id
          optname: this.$Global.optioner.UserName, // 操作者账号
          xmTime: this.gotXmInfo.curXmTime,
          proxyname: this.isSub ? this.subInfo.name : '',
          xmje: parseFloat(this.sendxmyj),
          sxje: parseFloat(sxje), // 剩下金额
          zje: parseFloat(zje), // 总金额
          token: this.token
        }
      }
      this.$store.commit('ht/setLastXmState', false)
      // console.log('send xmok ', sendStr)
      this.$pomelo.send(sendStr)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
