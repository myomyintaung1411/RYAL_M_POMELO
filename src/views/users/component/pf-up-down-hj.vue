<template>
    <div>
       <van-popup  v-model="dialogFormVisible" closeable @close="Cancel" :lock-scroll="false"
      position="bottom"  :style="{ height: '60%' }">
       <div class="px-3 py-5 w-full relative">
        <span class="font-bold text-lg">上分</span>
         
        <div class="py-2 space-y-1">
            <div class="flex items-center space-x-2 flex-wrap">
                <div class="flex items-center space-x-1">
                <span>账号</span>
                <span class="text-[#009688]">{{ pfUpDownData.agentAccount }}</span>
             </div>
            <div class="flex items-center space-x-1">
                <span>等级</span>
                <span class="text-[#009688]">代理</span>
            </div>
            <div class="flex items-center space-x-1">
                <span>余额</span>
                <span class="text-[#009688]">{{ pfUpDownData.aBalance || 0  }}</span>
            </div>
            <div class="flex items-center space-x-1">
                <span>占成</span>
                <span class="text-[#009688]">{{ pfUpDownData.zcb  || 0  }} %</span>
            </div>
            </div>

        </div>
        <form @click.prevent class="w-full rounded-lg flex flex-col justify-center items-center ">
            <div class="flex items-center w-full bg-[#dddddd] relative h-10 rounded-md  px-5 mt-3">
                    <div
                    class="border-none w-full h-full text-base flex justify-center items-center relative"
                    >
                    <input
                        v-model.trim="deposit"
                        type="tel" autocomplete="off"
                        maxlength="10"
                        placeholder="请输入金额"
                        class="input-name text-[#524d4d] bg-transparent placeholder:tracking-wider px-3 border-none outline-none focus:outline-none focus:border-none w-full h-full"
                    />
                    </div>
            </div>
            <div v-if="pfUpDownData.isPf" class="flex items-center w-full bg-[#dddddd] relative h-10 rounded-md  px-5 mt-3">
                    <div
                    class="border-none w-full h-full text-base flex justify-center items-center relative"
                    >
                    <input
                        v-model.trim="money"
                        type="tel" autocomplete="off"
                        maxlength="10"
                        placeholder="请输入分数" @input="changeInputMoney"
                        class="input-name text-[#524d4d] bg-transparent placeholder:tracking-wider px-3 border-none outline-none focus:outline-none focus:border-none w-full h-full"
                    />
                    </div>
            </div>
            <div  class="flex items-center w-full bg-[#dddddd] relative h-10 rounded-md  px-5 mt-3">
                    <div
                    class="border-none w-full h-full text-base flex justify-center items-center relative"
                    >
                    <input
                        v-model.trim="memo"
                        type="text" autocomplete="off"
                         
                        placeholder="请输入余额备注" 
                        class="input-name text-[#524d4d] bg-transparent placeholder:tracking-wider px-3 border-none outline-none focus:outline-none focus:border-none w-full h-full"
                    />
                    </div>
            </div>
            <div  class="flex items-center w-full text-[#009688] bg-[#dddddd] relative h-10 rounded-md  px-5 mt-3">
              
                    <div
                    class="border-none w-full  whitespace-nowrap text-ellipsis h-full text-base flex  items-center relative space-x-2"
                    >
                    <span class="pl-3"> 账号列表</span>
                    <van-radio-group v-model="payAccount" direction="horizontal" @change="selectPfYuan">
                        <van-radio v-for="acc in pfUpDownData.relation" :key="acc.Id" :name="acc.name">{{ acc.name }}
                           <span class="text-[#009688]">
                            余额
                            {{ acc.score }}
                           </span>
                        </van-radio>
                    </van-radio-group>
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
import { number2text } from '@/utils/index'
// import { debounce } from '@/utils/index'

export default {
  props: {
    pfUpDownData: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      dialogFormVisible: false,
      // type: '',
      deposit: '',
      money: '',
      memo: '',
      loading: false,
      payAccount: '',
      prePf: {},
      chinese_amount: ''
    }
  },
  computed: {
    ...mapState({
      previousForm: state => state.ht.addscoreDigFrm2,
      isSub: state => state.user.isSubAccount,
      subInfo: state => state.user.subInfo
    }),
    ...mapGetters(['token', 'device'])
  },
  watch: {
    pfUpDownData: {
      handler(newValue, oldValue) {
        // console.log('ud pf', newValue)
        this.payAccount = newValue.reference_name
      }
    }
  },
  methods: {
    close() {
      this.deposit = ''
      this.memo = ''
      // this.type = ''
      this.money = ''
      this.loading = false
      this.dialogFormVisible = false
      // this.setUpDownState(false)
    },
    closeDia() {
      this.Cancel()
    },
    changeInputAmount() {
      // eslint-disable-next-line
      if (this.pfUpDownData.zcb == 100) {
        this.money = this.deposit
      } else {
        this.money = Number((parseFloat(this.deposit) / (1 - parseFloat(this.pfUpDownData.zcb) / 100)).toFixed(0))
      }
      this.chinese_amount = number2text(this.deposit)
    },
    changeInputMoney() {
      // eslint-disable-next-line
      if (this.pfUpDownData.zcb == 100) {
        this.deposit = this.money
      } else {
        this.deposit = Number((parseFloat(this.money) * (1 - (parseFloat(this.pfUpDownData.zcb) / 100))).toFixed(2))
      }
    },
    selectPfYuan() {
      const index = this.pfUpDownData.relation.findIndex(val => val.name === this.payAccount)
      // console.log(index)
      this.prePf = this.pfUpDownData.relation.map((v, i) => {
        if (index <= i) {
          // eslint-disable-next-line
          if (v.zc == 100) {
            v.pfscore = this.deposit
          } else {
            v.pfscore = Number((parseFloat(this.deposit) / (1 - parseFloat(v.zc) / 100)).toFixed(2))
            // console.log('v ', v)
          }
        } else {
          v.pfscore = 0
        }
        return v
      })
      // console.log('pre ', this.prePf, this.pfUpDownData)
      this.prePf.push({
        Id: this.pfUpDownData.Id,
        level: '',
        name: this.pfUpDownData.agentAccount,
        pfscore: this.deposit,
        score: this.pfUpDownData.aBalance,
        zc: this.pfUpDownData.zcb
      })
    },
    Ok() {
      var score = parseFloat(this.deposit)
      // if (this.type === '') {
      //   return this.$message.warning(this.$t('message.select_action_type'))
      // }
      if (score === '' || score === null || score === undefined || score === 0 || score < 0) {
        this.$toast('请输入分数')
        return
      }
      if (this.payAccount === '' || this.payAccount === undefined) return this.$toast('请选择账号')
      this.loading = true
      // var opt = this.type === this.$t('dw_dialog.deposit') ? 'addScore' : 'desScore'
      // eslint-disable-next-line
      const monnny = this.pfUpDownData.zcb == 100 ? this.deposit : Number((parseFloat(this.deposit) / (1 - parseFloat(this.pfUpDownData.zcb) / 100)).toFixed(2))
      // console.log('mmmmmmmmmm ', monnny)
      const sendStr = {
        router: 'PfUpDownPoint',
        JsonData: {
          Id: this.pfUpDownData.Id,
          optName: this.pfUpDownData.agentAccount,
          upper_name: this.pfUpDownData.reference_name,
          deposit: Math.abs(monnny),
          pf: Math.abs(this.deposit),
          memo: this.memo || '',
          optioner_Id: this.$Global.optioner.Id, // 操作员id
          optioner_name: this.$Global.optioner.UserName, // 操作员
          level: 2,
          loginIp: this.$store.state.ht.ip,
          opt: 'addScore',
          type: 'addScore',
          token: this.token || '',
          proxyname: this.isSub ? this.subInfo.name : '',
          deduct_name: this.payAccount, // 被扣分代理名称
          deduct_id: this.pfUpDownData.relation.map(v => (v.name === this.payAccount) && v.Id).filter(v => !!v) + '',
          isGG: this.payAccount !== this.pfUpDownData.reference_name
        }
      }
      // console.log('send ', sendStr, this.pfUpDownData)
      this.$pomelo.sendcb(sendStr, res => {
        // console.log('res ', res)
        this.loading = false
        if (res.JsonData.result && res.JsonData.result === 'ok') {
          this.$toast('操作成功')
          this.$emit('userAction', { name: 'PF_SUCCESS' })
          this.Cancel()
        } else {
            this.$toast(res.JsonData.msg)
        }
      })
    },
    Cancel() {
      // this.type = ''
      this.deposit = ''
      this.chinese_amount = ''
      this.memo = ''
      this.money = ''
      this.loading = false
      this.dialogFormVisible = false
    }
  }
}
</script>