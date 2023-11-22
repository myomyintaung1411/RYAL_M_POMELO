<template>
  <van-dialog v-model="dialogFormVisible"  :title="`${isShow == 1 ? '开启' : '关闭'} ${showxmData.username}的显示洗码`" show-cancel-button @confirm="confirm">
</van-dialog>
</template>

<script>
/* eslint-disable */
import { mapState, mapGetters } from 'vuex'
import { setShowXmApi } from '@/api/ht'

export default {
props: ['showxmData', 'isShow'],
data() {
  return {
    dialogFormVisible: false,
    curXmAccount: '',
    show_xm: 0,
    loading: false
  }
},
computed: {
  ...mapState({
    isSub: state => state.user.isSubAccount,
    subInfo: state => state.user.subInfo
  }),
  ...mapGetters(['token', 'info', 'device'])
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
    const sendStr = {
      opt_id: this.info.Id,
      opt_name: this.info.username,
      userId: this.showxmData.Id,
      is_show: this.isShow
    }
    this.loading = true
    setShowXmApi(sendStr).then(res => {
      if (res.code === 0) {
        this.$toast(res.msg)
        this.$emit('diaEmit', {type: 'SHOWXM_SUCCESS', row: ''})
        this.onClose()
      } else {
          this.$toast(res.msg)
      }
      this.loading = false
    }).catch(e => {
      this.loading = false
      console.error('e ', e, e?.message)
    })
  }
}
}
</script>