<template>
    <van-popup  v-model="dialogFormVisible" closeable :lock-scroll="false"
      position="bottom"  :style="{ height: '50%' }">
      <div class="px-3 py-10 w-full relative overflow-y-auto">
        <span class="font-bold text-lg">修改客服昵称</span>
        <form @click.prevent class="w-full rounded-lg flex flex-col justify-center items-center ">

        <div class="flex items-center w-full bg-[#dddddd] relative h-10 rounded-md  px-5 mt-3">
                <div
                class="border-none w-full h-full text-base flex justify-center items-center relative"
                >
                <input
                    v-model.trim="form.username"
                    type="text" autocomplete="off"
                    maxlength="40"
                    placeholder="请输入账号"
                    class="input-name text-[#524d4d] bg-transparent placeholder:tracking-wider px-3 border-none outline-none focus:outline-none focus:border-none w-full h-full"
                />
                </div>
        </div>
            <div class="flex items-center w-full bg-[#dddddd] relative h-10 rounded-md  px-5 mt-3">
                    <div
                    class="border-none w-full h-full text-base flex justify-center items-center relative"
                    >
                    <input
                        v-model.trim="form.nickname"
                        type="text" autocomplete="off"
                        maxlength="40"
                        placeholder="请输入客服昵称"
                        class="input-name text-[#524d4d] bg-transparent placeholder:tracking-wider px-3 border-none outline-none focus:outline-none focus:border-none w-full h-full"
                    />
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
            @click="onConfirm()"
            >
            确认
            </van-button>
            </div>

            </form>
      </div>
  </van-popup>
</template>

<script>
import { agentEditOwnServiceApi } from '@/api/ip'
import AES from '@/api/aes'

export default {
  props: {
    editData: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      dialogFormVisible: false,
      loading: false,
      form: {
        id: '',
        username: '',
        nickname: ''
      }
    }
  },
  computed: {
  },
  watch: {
    editData: {
      handler(newValue, oldValue) {
        this.form = newValue
      }
    }
  },
  methods: {
    onCancel() {
      this.dialogFormVisible = false
    },
    onConfirm() {
      if (!this.editData.Id) return this.$toast('请选择客服')
      if (this.form.nickname.trim() === '') return this.$toast('请输入昵称')

      const send_ = {
        Id: this.$Global.optioner.Id,
        customer_id: this.editData.Id,
        nickname: this.form.nickname.trim()
      }
      const en = this.$Global.ens
      this.loading = true
      agentEditOwnServiceApi(AES.encrypt(JSON.stringify(send_), en)).then(res => {
        const resp = JSON.parse(AES.decrypt(res?.data, en))
        // console.log('resp .. ', resp)
        if (resp?.JsonData?.result === 'ok') {
          this.$toast(resp?.JsonData?.msg)
          this.$emit('serviceEmit', true)
          this.onCancel()
        } else {
          this.$toast(resp?.JsonData?.msg)
        }
        this.loading = false
      }).catch(e => {
        this.loading = false
      })
    }
  }
}
</script>