<template>
    <van-dialog v-model="dialogFormVisible" :title="`您确认要将 ${zeroData.agentAccount} 清零吗？`" show-cancel-button @confirm="confirm">
</van-dialog>
</template>

<script>
/* eslint-disable */
import { mapState, mapGetters } from 'vuex'

export default {
  props: ['zeroData'],
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
      isSub: state => state.user.isSubAccount,
      subInfo: state => state.user.subInfo
    }),
    ...mapGetters(['token', 'device'])
  },
  methods: {
    cancel() {
      this.loading = false
      this.dialogFormVisible = false
    },
    onClose() {
      this.cancel()
    },
    confirm() {
      if (this.isSub) return this.$toast('子账号无权限')
      const sendStr = {
        router: 'ResetToZero',
        JsonData: {
          opt_id: this.$Global.optioner.Id,
          opt_name: this.$Global.optioner.UserName,
          Id: this.zeroData.Id,
          username: this.zeroData.agentAccount,
          level: this.zeroData.level,
          token: this.token
        }
      }
      this.loading = true
      this.$pomelo.sendcb(sendStr, res => {
        // console.log('res ', res)
        if (res?.JsonData?.result === 'ok') {
          this.$toast("清零成功")
          this.$emit('zeroEmit', true)
        } else {
          this.$toast(res?.JsonData?.msg)
        }
        this.loading = false
        this.dialogFormVisible = false
      })
    }
  }
}
</script>
