<template>
  <div>
    <el-dialog
      v-el-drag-dialog
      :title="$t('dw_dialog.deposit_withdraw')"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
      :width="device !== 'mobile' ? '500px' : '400px'"
      @close="closeDia"
    >
      <!-- <font size="3">
        给
        <font color="#009688">{{ upDownData.memberAccount }}</font>
        上下分
      </font>
      <br>
      <br> -->
      <font size="2">{{ $t('dw_dialog.account') }}：<span style="color:#009688">{{ upDownData.agentAccount }}</span></font>
      <span style="margin-left: 20px;" />
      <font size="2">{{ $t('dw_dialog.level') }}: <span style="color:#009688">{{ $t('dw_dialog.player') }}</span></font>
      <span style="margin: 0 20px;" />
      <font size="2">{{ $t('dw_dialog.balance') }}: <span style="color:#009688">{{ upDownData.aBalance }}</span></font>
      <br>
      <br>
      <!-- <font>我的帐户余额: <span style="color: #F44336">{{ previousForm.optionerScore }}</span></font>
      <br>
      <br> -->
      <el-form
        ref="addscoreDigFrm"
        :inline="true"
        label-width="100px"
      >
        <el-form-item :label="$t('dw_dialog.type')">
          <el-radio-group v-model="type">
            <el-radio :label="$t('dw_dialog.deposit')" />
            <el-radio :label="$t('dw_dialog.withdraw')" />
          </el-radio-group>
        </el-form-item>
        <el-form-item :label="$t('dw_dialog.point')">
          <el-input
            v-model="deposit"
            type="number"
            autocomplete="off"
            style="width: 200px;"
          />
        </el-form-item>
        <el-form-item :label="$t('dw_dialog.comment')">
          <el-input
            v-model="memo"
            type="textarea"
            autocomplete="off"
            placeholder="备注..."
            style="width: 280px;"
            @keyup.native="btKeyUp"
            @keydown.native="btKeyUp"
          />
        </el-form-item>
        <el-form-item :label="$t('dw_dialog.account_list')">
          <el-radio-group v-for="acc in upDownData.relation" :key="acc.Id" v-model="payAccount" style="display: flex;">
            <el-radio :label="acc.name" style="line-height: 23px">
              <span><font color="">{{ acc.name }}</font></span>
              <span style="margin-left: 20px;">{{ $t('dw_dialog.balance') }}：<font color="">{{ acc.score }}</font></span>
            </el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <font color="#009688">{{ $t('dw_dialog.last_operation_record') }}</font>
      <br>
      <br>
      <div class="p-rec">
        <div class="p-tit">{{ $t('dw_dialog.type') }}：</div>
        <div class="p-val">{{ previousForm.kind }}</div>
      </div>
      <br>
      <div class="p-rec">
        <div class="p-tit">{{ $t('dw_dialog.amount') }}：</div>
        <div class="p-val">{{ previousForm.turnover }}</div>
      </div>
      <br>
      <div class="p-rec">
        <div class="p-tit">{{ $t('dw_dialog.operationer') }}：</div>
        <div class="p-val">{{ previousForm.optioner }}</div>
      </div>
      <br>
      <div class="p-rec">
        <div class="p-tit">{{ $t('dw_dialog.comment') }}：</div>
        <div class="p-val" style="word-wrap: break-word; width: 300px;">{{ previousForm.memo2 }}</div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="Cancel()">{{ $t('buttons.cancel') }}</el-button>
        <el-button type="primary" :loading="loading" @click="Ok()">{{ $t('buttons.confirm') }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'
import elDragDialog from '@/directive/el-drag-dialog'
// import { debounce } from '@/utils/index'

export default {
  directives: { elDragDialog },
  props: {
    upDownData: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      dialogFormVisible: false,
      type: '',
      deposit: '',
      memo: '',
      payAccount: this.$Global.optioner.UserName,
      loading: false
      // addscoreDigFrm: {
      //   deposit: '', // 存入
      //   memo: '', // 备注
      //   upper_name: '', // 上级代理
      //   mBalance: 0, // 现在额度
      //   type: ''
      // }
    }
  },
  computed: {
    ...mapState({
      previousForm: state => state.ht.addscoreDigFrm2,
      isSub: state => state.user.isSubAccount,
      subInfo: state => state.user.subInfo
    }),
    ...mapGetters(['UPDOWN_OK', 'token', 'device'])
  },
  watch: {
    // upDownData: {
    //   handler(newValue, oldValue) {
    //     this.addscoreDigFrm = newValue
    //   }
    // },
    UPDOWN_OK: function(val) {
      if (val) {
        this.close()
        this.loading = false
        this.$emit('userAction', { name: 'UPDOWN_OK_PLAYER' })
      }
    }
  },
  methods: {
    close() {
      this.deposit = ''
      this.memo = ''
      this.type = ''
      this.loading = false
      this.dialogFormVisible = false
      this.setUpDownState(false)
    },
    closeDia() {
      this.loading = false
      this.Cancel()
    },
    // 限制输入特殊字符
    btKeyUp(e) {
      e.target.value = e.target.value.replace(/[`~!#$%^&*()\-+=<>?:'{}|,.\/;'\\[\]·~！#￥%……&*（）\-+={}|《》？：“”【】、；‘’，。、]/g, '')
    },
    ...mapMutations({
      setUpDownState(commit, value) {
        commit('ht/setUpDownState', value)
      }
    }),
    Ok() {
      this.setUpDownState(false)
      if (this.type === '') {
        return this.$message.warning(this.$t('message.select_action_type'))
      }
      var score = parseFloat(this.deposit)
      if (score === '' || score === null || score === undefined || score === 0 || score < 0) {
        this.$message.warning(this.$t('message.input_point'))
        return
      }
      if (this.payAccount === '') return this.$message.warning(this.$t('message.select_account'))
      this.loading = true
      var opt = this.type === this.$t('dw_dialog.deposit') ? 'addScore' : 'desScore'
      const sendStr = {
        router: 'ChangeDlScore',
        JsonData: {
          // 代理和会员用同一函数 ChangeDlScore
          optName: this.upDownData.agentAccount,
          deposit: Math.abs(this.deposit),
          upper_name: this.upDownData.reference_name,
          memo: this.memo || '',
          optioner_Id: this.$Global.optioner.Id, // 操作员id
          optioner_name: this.$Global.optioner.UserName,
          level: 3, // 因为代理和会员共用,所以要分开级别
          opt: opt,
          loginIp: this.$store.state.ht.ip || '',
          token: this.token || '',
          proxyname: this.isSub ? this.subInfo.name : '',
          deduct_name: this.payAccount // 被扣分代理名称
        }
      }
      // console.log('send ', sendStr)
      this.$pomelo.send(sendStr)
      // this.dialogFormVisible = false
    },
    Cancel() {
      this.type = ''
      this.memo = ''
      this.deposit = ''
      this.loading = false
      this.payAccount = this.$Global.optioner.UserName
      this.dialogFormVisible = false
    }
  }
}
</script>

<style lang="scss" scoped>
.p-rec {
  display: flex;
  -webkit-user-select:none;
  -moz-user-select:none;
  -ms-user-select:none;
  user-select: none;
  .p-tit {
    width: 100px;
    text-align: right;
  }
  .p-val {
    color: #F44336;
  }
}
</style>
