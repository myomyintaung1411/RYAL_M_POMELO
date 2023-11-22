<template>
    <div>
       <van-popup  v-model="dialogFormVisible" closeable @close="Cancel" :lock-scroll="false"
      position="bottom"  :style="{ height: '60%' }">
       <div class="px-3 py-5 w-full relative">
        <span class="font-bold text-lg">{{type == 'shang' ?'上分' : '下分'}}</span>
         
        <div class="py-2 space-y-1">
            <div class="flex items-center space-x-2 flex-wrap">
                <div class="flex items-center space-x-1">
                <span>账号</span>
                <span class="text-[#009688]">{{ upDownData.username }}</span>
             </div>
            <div class="flex items-center space-x-1">
                <span>等级</span>
                <span class="text-[#009688]">代理</span>
            </div>
            <div class="flex items-center space-x-1">
                <span>余额</span>
                <span class="text-[#009688]">{{ upDownData.ye || 0  }}</span>
            </div>
            <div class="flex items-center space-x-1">
                <span>占成</span>
                <span class="text-[#009688]">{{ upDownData.zc || 0  }} %</span>
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
            <div v-if="upDownData.pf" class="flex items-center w-full bg-[#dddddd] relative h-10 rounded-md  px-5 mt-3">
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
                    <van-radio-group v-model="payAccount" direction="horizontal">
                        <van-radio v-for="acc in relalist" :key="acc.Id" :name="acc.username">{{ acc.username }}
                           <span class="text-[#009688]">
                            余额
                            {{ acc.ye }}
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
import { doPlayerPointApi, doAgentPointApi } from '@/api/ht'

export default {
  props: {
    upDownData: {
      type: Object,
      default: null
    },
    type: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      dialogFormVisible: false,
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
      info: state => state.user.info,
      relalist: state => state.ht.dwRelationList,
      isSub: state => state.user.isSubAccount,
      subInfo: state => state.user.subInfo
    }),
    ...mapGetters(['token', 'device'])
  },
  watch: {
    upDownData: {
      handler(newValue, oldValue) {
        this.payAccount = newValue.reference_name
      }
    }
  },
  methods: {
    close() {
      this.deposit = ''
      this.memo = ''
      this.money = ''
      this.loading = false
      this.dialogFormVisible = false
    },
    closeDia() {
      this.Cancel()
    },
    changeInputAmount() {
      if (this.upDownData.zc === 100) {
        this.money = this.deposit
      } else {
        this.money = Number((parseFloat(this.deposit) / (1 - parseFloat(this.upDownData.zc) / 100)).toFixed(0))
      }
      this.chinese_amount = number2text(this.deposit)
    },
    changeInputMoney() {
      if (this.upDownData.zc === 100) {
        this.deposit = this.money
      } else {
        this.deposit = Number((parseFloat(this.money) * (1 - (parseFloat(this.upDownData.zc) / 100))).toFixed(2))
      }
    },
    selectPfYuan() {
      const index = this.relalist.findIndex(val => val.name === this.payAccount)
      this.prePf = this.relalist.map((v, i) => {
        if (index <= i) {
          if (v.zc === 100) {
            v.pfscore = this.deposit
          } else {
            v.pfscore = Number((parseFloat(this.deposit) / (1 - parseFloat(v.zc) / 100)).toFixed(2))
          }
        } else {
          v.pfscore = 0
        }
        return v
      })
      this.prePf.push({
        Id: this.upDownData.Id,
        level: '',
        name: this.upDownData.username,
        pfscore: this.deposit,
        score: this.upDownData.ye,
        zc: this.upDownData.zc
      })
    },
    Ok() {
      var score = parseFloat(this.deposit)
      if (!this.type) {
        return this.$toast('请选择操作类型')
      }
      if (score === '' || score === null || score === undefined || score === 0 || score < 0) {
        this.$toast('请输入分数!')
        return
      }
      if (this.payAccount === '' || this.payAccount === undefined) return this.$toast('请选择账号!')
      // eslint-disable-next-line
      const monnny = this.upDownData.zc === 100 || this.upDownData.level === 3 ? this.deposit : Number((parseFloat(this.deposit) / (1 - parseFloat(this.upDownData.zc) / 100)).toFixed(2))
      const sendStr = {
        Id: this.upDownData.Id,
        optName: this.upDownData.username,
        upper_name: this.upDownData.reference_name,
        deposit: Math.abs(monnny),
        pf: Math.abs(this.deposit),
        memo: this.memo || '',
        optioner_Id: this.info.Id, // 操作员id
        optioner_name: this.info.username, // 操作员
        level: this.upDownData.level,
        opt: this.type === 'shang' ? 'addScore' : 'desScore',
        type: this.type === 'shang' ? 'addScore' : 'desScore',
        proxyname: this.isSub ? this.subInfo.name : '',
        deduct_name: this.payAccount, // 被扣分代理名称
        deduct_id: this.relalist.map(v => (v.username === this.payAccount) && v.Id).filter(v => !!v) + '',
        isGG: this.payAccount !== this.upDownData.reference_name
      }
      this.loading = true

      if (this.upDownData.level === 3) {
        doPlayerPointApi(sendStr).then(res => {
          if (res.code === 0) {
            this.Cancel()
            this.dialogFormVisible = false
            this.$toast(res.msg)
            this.$emit('diaEmit', { type: 'UPDOWN_SUCCESS', row: '' })
          }
          this.loading = false
        }).catch(e => {
          this.loading = false
          console.error('e ', e, e?.message)
        })
      } else {
        doAgentPointApi(sendStr).then(res => {
          if (res.code === 0) {
            this.Cancel()
            this.dialogFormVisible = false
            this.$toast(res.msg)
            this.$emit('diaEmit', { type: 'UPDOWN_SUCCESS', row: '' })
          }
          this.loading = false
        }).catch(e => {
          this.loading = false
          console.error('e ', e, e?.message)
        })
      }
    },
    Cancel() {
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

  