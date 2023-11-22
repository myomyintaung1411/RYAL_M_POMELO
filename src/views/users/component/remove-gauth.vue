<template>
   <van-dialog v-model="dialogFormVisible" :title="`您确认要移除 ${gauthData.agentAccount} 的验证登录吗？`" show-cancel-button @confirm="confirm">
  </van-dialog>
</template>

<script>
/* eslint-disable */
import { mapState, mapGetters } from 'vuex'

export default {
  props: ['gauthData'],
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
      // if (this.isSub) return
      const sendStr = {
        router: 'DelGoogleAuth',
        JsonData: {
          opt_id: this.$Global.optioner.Id,
          opt_name: this.$Global.optioner.UserName,
          Id: this.gauthData.Id,
          username: this.gauthData.agentAccount,
          token: this.token
        }
      }
      this.loading = true
      this.$pomelo.sendcb(sendStr, res => {
        // console.log('res ', res)
        if (res?.JsonData?.result === 'ok') {
          this.$toast("移除成功")
          this.$emit('gauthEmit', true)
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
