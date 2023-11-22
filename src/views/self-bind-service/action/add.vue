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
import { SelfBindServiceApi } from '@/api/ht'
import { mapState } from 'vuex'

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
  computed: {
    ...mapState({
      info: state => state.user.info
    })
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
        Id: this.info.Id,
        username: this.form.username,
        nickname: this.form.nickname,
        password: this.form.password
      }
      this.loading = true

      const en = this.$Global.ens
      this.$toast.loading({
            message: '请稍后...',
            forbidClick: true,
            duration: 1000,
        })
      agentAddServiceApi(AES.encrypt(JSON.stringify(send_), en)).then(res => {
        const resp = JSON.parse(AES.decrypt(res?.data, en))
        if (resp?.JsonData?.result === 'ok') {
          const reqt = {
            router: 'SelfBindService',
            JsonData: {
              Id: this.info.Id,
              link: resp?.JsonData?.data || ''
            }
          }
          SelfBindServiceApi(reqt).then((res) => {
            if (res.code === 0) {
              this.$toast('添加成功')
              this.onCancel()
              this.$emit('serviceEmit', true)
            } else {
              if (res.msg === 'IP 已存在') return this.$toast(res.msg)
              this.$toast('添加失败')
            }
          }).catch((e) => {
            console.error(e)
          })
        } else {
          this.loading = false
          this.$toast(resp?.JsonData?.msg)
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