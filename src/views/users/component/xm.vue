<template>
    <div>
       <van-popup  v-model="dialogFormVisible" closeable @close="agentXMCancel" :lock-scroll="false"
      position="bottom"  :style="{ height: '50%' }">
       <div class="px-3 py-10 w-full relative">
        <span class="font-bold text-lg">洗码结算</span>
       <div class="w-full relative mt-3 font-bold text-red-500">
        注：该操作将自动结算洗码!
       </div>
        <section class=" space-y-2">
            <div class="flex items-center space-x-1">
                <span>被操作人：</span>
                <span> {{ curXmAccount }} </span>
            </div>
            <div class="flex items-center space-x-1">
                <span>洗码类型：</span>
               <span> {{ gotXmInfo.xm_type === '双边' ? '双边' : '单边' }} </span>
             </div>
            <div class="flex items-center space-x-1">
                <span>洗码量(单/双)：</span>
                <span> {{ gotXmInfo.xml_s }} / {{ gotXmInfo.xml_d }}</span>
             </div>
            <div class="flex items-center space-x-1">
                <span>当前洗码率(单)：</span>
                <span> {{ gotXmInfo.xmb_s }}</span>
             </div>
            <div class="flex items-center space-x-1">
                <span>当前洗码率(双)：</span>
                <span> {{ gotXmInfo.xmb_d }}</span>
             </div>
            <div class="flex items-center space-x-1">
                <span>上次洗码时间：</span>
                <span> {{ gotXmInfo.prevXmTime }}</span>
             </div>
            <div class="flex items-center space-x-1">
                <span>本次洗码时间：</span>
                <span> {{ gotXmInfo.curXmTime }}</span>
             </div>
            <div class="flex items-center space-x-1">
                <span>洗码佣金：</span>
                <span> {{ gotXmInfo.curXmf || 0 }}</span>
             </div>
            <div class="flex items-center space-x-1">
                <span>上次结算金额：</span>
                <span> {{ gotXmInfo.turnover || 0  }}</span>
             </div>
            <div class="flex items-center space-x-1">
                <span>最终洗码佣金：</span>
                <span> {{ sendxmyj  }}</span>
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
              @click="agentXMOk(gotXmInfo)"
            >
            确认
            </van-button>
          </div>
        </section>
       </div>
    </van-popup>
    </div>
  </template>
  
  <script>
  /* eslint-disable */
  import { mapState, mapGetters } from 'vuex'
  
  export default {
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
          this.agentXMCancel()
          this.$store.commit('ht/setLastXmState', false)
          this.loading = false
        }
      }
    },
    methods: {
      agentXMCancel() {
        this.loading = false
        this.sendxmyj = 0
        this.$store.state.ht.gotXmInfo = {}
        this.dialogFormVisible = false
      },
      agentXMOk() {
        if (this.xmUserId == '') return
        if (parseFloat(this.sendxmyj) > parseFloat(this.gotXmInfo.curXmf)) {
          return this.$toast('洗码佣金超过本次时间的洗码所得')
        }
        if (parseFloat(this.sendxmyj) < 0) return this.$toast('洗码费有误')
        if (this.sendxmyj == '' || isNaN(this.sendxmyj) || this.sendxmyj == 0) return this.$toast('洗码金额 0 无需操作!')
        // if (this.sendxmyj == '') return this.$message.error('请输入洗码金额')
        this.loading = true
        let sxje = parseFloat(this.gotXmInfo.curXmf) - parseFloat(this.sendxmyj)
        let zje = parseFloat(this.gotXmInfo.curXmf)
        if (sxje === null || zje === null) return this.$toast('洗码金额有误!')
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
            token: this.token || ''
          }
        }
        this.$store.commit('ht/setLastXmState', false)
        this.$pomelo.send(sendStr)
      }
    }
  }
  </script>