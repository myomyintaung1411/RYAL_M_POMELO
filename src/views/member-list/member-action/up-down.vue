<template>
  <div>
     <van-popup  v-model="dialogFormVisible" closeable @close="Cancel" :lock-scroll="false"
    position="bottom"  :style="{ height: '60%' }">
     <div class="px-3 py-5 w-full relative">
      <span class="font-bold text-lg">上/下分</span>
       
      <div class="py-2 space-y-1">
          <div class="flex items-center space-x-2 flex-wrap">
              <div class="flex items-center space-x-1">
              <span>账号</span>
              <span class="text-[#009688]">{{ upDownData.memberAccount }}</span>
           </div>
          <div class="flex items-center space-x-1">
              <span>等级</span>
              <span class="text-[#009688]">代理</span>
          </div>

          <div class="flex items-center space-x-1">
              <span>占成</span>
              <span class="text-[#009688]">{{ upDownData.mBalance || 0  }} %</span>
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
                      <van-radio v-for="acc in upDownData.relation" :key="acc.Id" :name="acc.username">{{ acc.name }}
                         <span class="text-[#009688]">
                          余额
                          {{ acc.score }}
                         </span>
                      </van-radio>
                  </van-radio-group>
                  </div>
          </div>
          <section class=" space-y-2">
            <div class="flex items-center space-x-1">
                <span>操作类型：</span>
                <span> {{ previousForm.kind }} </span>
            </div>
            <div class="flex items-center space-x-1">
                <span>交易金额：</span>
               <span> {{ previousForm.turnover }} </span>
             </div>
            <div class="flex items-center space-x-1">
                <span>操作人：</span>
               <span> {{ previousForm.optioner }} </span>
             </div>
            <div class="flex items-center space-x-1">
                <span>备注：</span>
               <span> {{ previousForm.memo2 }} </span>
             </div>
             </section>
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
import { mapState, mapGetters, mapMutations } from 'vuex'
// import { debounce } from '@/utils/index'

export default {
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
    ...mapGetters(['UPDOWN_OK_PLAYER', 'token', 'device'])
  },
  watch: {
    // upDownData: {
    //   handler(newValue, oldValue) {
    //     this.addscoreDigFrm = newValue
    //   }
    // },
    UPDOWN_OK_PLAYER: function(val) {
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
        commit('ht/setUpDownPlayerState', value)
      }
    }),
    Ok() {
      this.setUpDownState(false)
      if (this.type === '') {
        return this.$toast('请选择操作类型')
      }
      var score = parseFloat(this.deposit)
      if (score === '' || score === null || score === undefined || score === 0 || score < 0) {
        this.$toast('请输入分数')
        return
      }
      if (this.payAccount === '') return this.$toast('请选择账号')
      this.loading = true
      var opt = this.type === '上分' ? 'addScore' : 'desScore'
      const sendStr = {
        router: 'ChangeDlScore',
        JsonData: {
          // 代理和会员用同一函数 ChangeDlScore
          optName: this.upDownData.memberAccount,
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