<template>
    <van-popup  v-model="dialogFormVisible" closeable :lock-scroll="false"
      position="bottom"  :style="{ height: '50%' }">
      <div class="px-3 py-10 w-full relative overflow-y-auto">
        <span class="font-bold text-lg">添加客服</span>
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
            <div class="flex items-center w-full bg-[#dddddd] relative h-10 rounded-md  px-5 mt-3">
                    <div
                    class="border-none w-full h-full text-base flex justify-center items-center relative"
                    >
                    <input
                        v-model.trim="form.password"
                        type="password" autocomplete="off"
                        maxlength="40"
                        placeholder="请输入密码"
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
import { agentAddServiceApi } from '@/api/ip'
import AES from '@/api/aes'

export default {
  data() {
    return {
      dialogFormVisible: false,
      loading: false,
      form: {
        username: '',
        nickname: '',
        password: ''
      }
    }
  },
  methods: {
    onCancel() {
      this.dialogFormVisible = false
      this.loading = false
      this.form.password = ''
      this.form.nickname = ''
      this.form.username = ''
    },
    onConfirm() {
      if (this.form.username.trim() === '') return this.$toast('请输入客服账号')
      if (this.form.nickname.trim() === '') return this.$toast('请输入客服昵称')
      if (this.form.password.trim() === '') return this.$toast('请输入客服密码')

      const send_ = {
        Id: this.$Global.optioner.Id,
        username: this.form.username,
        nickname: this.form.nickname,
        password: this.$md5('s3fds4@#3' + this.form.password + '3243')
      }
      this.loading = true

      const en = this.$Global.ens
      agentAddServiceApi(AES.encrypt(JSON.stringify(send_), en)).then(res => {
        // console.log('res .. ', res)
        const resp = JSON.parse(AES.decrypt(res?.data, en))

        // console.log('resp .. ', resp)
        if (resp?.JsonData?.result === 'ok') {
          const reqt = {
            router: 'SelfBindService',
            JsonData: {
              Id: this.$Global.optioner.Id,
              link: resp?.JsonData?.data || ''
            }
          }
          this.$pomelo.sendcb(reqt, resp2 => {
            // console.log('SelfBindService ', resp2)
            if (resp2?.JsonData?.result === 'ok') {
              this.$toast('添加成功')
              this.onCancel()
              this.$emit('serviceEmit', true)
            } else {
              this.loading = false
              if (resp2.reason === 'IP 已存在') return this.$toast(resp2.reason)
              this.$toast('添加失败')
            }
          })
        } else {
          this.loading = false
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