<template>
    <van-popup  v-model="dialogFormVisible" closeable :lock-scroll="false"
      position="bottom"  :style="{ height: '50%' }">
      <div class="px-3 py-10 w-full relative overflow-y-auto">
        <span class="font-bold text-lg">移除客服</span>
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
                        v-model.trim="agentname"
                        type="text" autocomplete="off"
                        maxlength="40"
                        placeholder="确认代理账号"
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
import { unbindAgentServiceApi } from '@/api/ip'
import AES from '@/api/aes'
import { mapState } from 'vuex'

export default {
  props: {
    removeData: {
      type: Object,
      default: () => {}
    },
    nameData: {
      type: String,
      default: () => ''
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
      },
      agentname: ''
    }
  },
  computed: {
    ...mapState({
      searchServiceList: state => state.ht.searchServiceList
    })
  },
  watch: {
    removeData: {
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
      if (!this.removeData.Id) return this.$toast('请选择客服')
      if (this.form.username.trim() === '') return this.$toast('请选择客服')
      if (this.nameData === '') return this.$toast('请输入代理名称')
      if (this.agentname.trim() === '') return this.$toast('请输入并确认代理账号')
      if (this.agentname.trim() !== this.nameData) return this.$toast('输入的代理号，和搜索的代理号不一致！')

      const newLinks = this.searchServiceList.filter(sv => sv.Id !== this.removeData.Id)
      let setLinks = ''
      if (newLinks.length > 0) {
        for (let i = 0; i < newLinks.length; i++) {
          if (i === newLinks.length - 1) {
            setLinks += `http://hjkf88.cn/#/?visiter_id=&avatar=&business_id=${newLinks[i].systemId}&groupid=${newLinks[i].groupId}&special=${newLinks[i].Id}`
          } else {
            setLinks += `http://hjkf88.cn/#/?visiter_id=&avatar=&business_id=${newLinks[i].systemId}&groupid=${newLinks[i].groupId}&special=${newLinks[i].Id},`
          }
        }
      }
      const send_ = {
        router: 'UnbindService',
        JsonData: {
          username: this.nameData,
          addrs: setLinks
        }
      }
      // console.log('send', send_)

      this.$pomelo.sendcb(send_, res => {
        if (res?.JsonData?.result === 'ok') {
          const send_ = {
            Id: this.removeData.Id,
            agent_id: this.removeData.agent_id
          }
          const en = this.$Global.ens
          this.loading = true
          unbindAgentServiceApi(AES.encrypt(JSON.stringify(send_), en)).then(res => {
            const resp = JSON.parse(AES.decrypt(res?.data, en))
            // console.log('resp .. ', resp)
            if (resp?.JsonData?.result === 'ok') {
              this.$toast(resp?.JsonData?.msg)
              this.$emit('removeEmit', true)
              this.onCancel()
            } else {
              this.$toast(resp?.JsonData?.msg)
            }
            this.loading = false
          }).catch(e => {
            this.loading = false
          })
        }
      })
    }
  }
}
</script>