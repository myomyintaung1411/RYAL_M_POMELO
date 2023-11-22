<template>
  <div>
    <el-dialog v-el-drag-dialog :title="$t('dw_dialog.pf_deposit_withdraw')" :visible.sync="dialogFormVisible" :close-on-click-modal="false" width="500px" @close="closeDia">
      <!-- <font size="3">
        给
        <font color="#009688">{{ pfUpDownData.memberAccount }}</font>
        上下分
      </font>
      <br>
      <br> -->
      <font size="2">{{ $t('dw_dialog.account') }}：<span style="color:#009688">{{ pfUpDownData.memberAccount }}</span></font>
      <span style="margin-left: 20px;" />
      <font size="2">{{ $t('dw_dialog.level') }}: <span style="color:#009688">{{ $t('dw_dialog.player') }}</span></font>
      <span style="margin: 0 20px;" />
      <font size="2">{{ $t('dw_dialog.balance') }}: <span style="color:#009688">{{ pfUpDownData.mBalance }}</span></font>
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
        <el-form-item :label="$t('dw_dialog.jin_er')">
          <el-input
            v-model="deposit"
            type="number"
            autocomplete="off"
            style="width: 200px;"
          />
        </el-form-item>
        <el-form-item :label="$t('dw_dialog.feng_shu')">
          <div style="display: flex; flex-direction: column;">
            <el-input
              v-model="deposit"
              type="number"
              :min="0"
              autocomplete="off"
              style="width: 200px;"
            />
            <!-- <span v-if="pfUpDownData.reference_name">扣分账号上级: {{ payAccount }}, 可用余额: {{ pfUpDownData.relation[pfUpDownData.relation.length - 1].score || 0 }}</span> -->
          </div>
        </el-form-item>
        <el-form-item :label="$t('dw_dialog.comment')">
          <el-input
            v-model="memo"
            type="textarea"
            autocomplete="off"
            placeholder="备注..."
            style="width: 280px;"
          />
        </el-form-item>
        <el-form-item :label="$t('dw_dialog.account_list')">
          <el-radio-group v-for="acc in pfUpDownData.relation" :key="acc.Id" v-model="payAccount" style="display: flex;">
            <el-radio :label="acc.name" style="line-height: 23px">
              <span><font color="">{{ acc.name }}</font></span>
              <span style="margin-left: 20px;">{{ $t('dw_dialog.balance') }}：<font color="">{{ acc.score }}</font></span>
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- <el-form-item>
          <div style="color: red; font-weight: bold;">
            <span>点数: {{ real }}</span>
            <span style="padding-left: 20%">配分比例: {{ 50 }}%</span>
          </div>
        </el-form-item> -->
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
import { mapState, mapGetters } from 'vuex'
import elDragDialog from '@/directive/el-drag-dialog'

export default {
  directives: { elDragDialog },
  props: {
    pfUpDownData: {
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
      payAccount: '',
      loading: false,
      realPlus: ''
    }
  },
  computed: {
    ...mapState({
      previousForm: state => state.ht.addscoreDigFrm2,
      isSub: state => state.user.isSubAccount,
      subInfo: state => state.user.subInfo
    }),
    ...mapGetters(['token'])
    // real() {
    //   const r = Number((70 / 100).toFixed(2))
    //   console.log(r)
    //   var ratio = ''
    //   if (r === 1) {
    //     ratio = 1
    //   } else {
    //     ratio = Number((1 - r).toFixed(2))
    //   }
    //   return Number(Math.floor(this.deposit / ratio))
    // }
  },
  watch: {
    pfUpDownData: {
      handler(newValue, oldValue) {
        this.payAccount = newValue.reference_name
      }
    }
    // real: {
    //   deep: true,
    //   handler: function(newVal) {
    //     this.realPlus = newVal
    //   }
    // }
  },
  methods: {
    close() {
      this.deposit = ''
      this.memo = ''
      this.type = ''
      this.loading = false
      this.dialogFormVisible = false
    },
    closeDia() {
      this.loading = false
      this.Cancel()
    },
    Ok() {
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
        router: 'PfUpDownPoint', // ChangePfScore
        JsonData: {
          // 代理和会员用同一函数 ChangePFScore
          Id: this.pfUpDownData.Id,
          optName: this.pfUpDownData.memberAccount,
          deposit: Math.abs(this.deposit),
          pf: Math.abs(this.deposit),
          upper_name: this.pfUpDownData.reference_name,
          memo: this.memo || '',
          optioner_Id: this.$Global.optioner.Id, // 操作员id
          optioner_name: this.$Global.optioner.UserName,
          level: 3, // 因为代理和会员共用,所以要分开级别
          opt: opt,
          type: opt,
          loginIp: this.$store.state.ht.ip || '',
          token: this.token || '',
          proxyname: this.isSub ? this.subInfo.name : '',
          deduct_name: this.payAccount, // 被扣分代理名称
          deduct_id: this.pfUpDownData.relation.map(v => (v.name === this.payAccount) && v.Id).filter(v => !!v) + '',
          isGG: this.payAccount !== this.pfUpDownData.reference_name
        }
      }
      // console.log('send ', sendStr)
      this.$pomelo.sendcb(sendStr, res => {
        // console.log('ChangePFScore ', res)
        this.loading = false
        if (res.JsonData.result && res.JsonData.result === 'ok') {
          this.$message.success('操作成功')
          this.$emit('userAction', { name: 'PF_SUCCESS' })
          this.Cancel()
        } else {
          this.$message.error(res.JsonData.msg)
        }
      })
      // this.dialogFormVisible = false
    },
    Cancel() {
      this.type = ''
      this.memo = ''
      this.deposit = ''
      this.loading = false
      this.payAccount = ''
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
