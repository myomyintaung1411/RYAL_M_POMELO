<template>
    <div class="py-3 px-3 relative">
        <div class="bg-white shadow rounded">
            <div class=" px-3 pt-3">H5游戏地址</div>
            <div class="flex items-center w-full px-3 pt-1 pb-3 border-b border-gray-200">
                <div
                    class="border-none w-full h-10 bg-gray-200 text-base flex justify-center items-center relative"
                    >
                    <input
                      v-model="h5Link"
                        type="text" autocomplete="off"
                        maxlength="40"
                        placeholder="请输入"
                        class="input-name text-[#524d4d] bg-transparent placeholder:tracking-wider px-3 border-none outline-none focus:outline-none focus:border-none w-full h-full"
                    />
                    </div>
                    <button @click="setBaseAddress(1, 'H5游戏地址')"
              
                class="outline-none whitespace-nowrap h-10 px-3 py-1 bg-[#4e6c50] text-white text-sm  tracking-wider"
                >
                确定
                </button>
            </div>
         </div>
        <div class="bg-white shadow rounded mt-3">
            <div class=" px-3 pt-3">PC游戏地址</div>
            <div class="flex items-center w-full px-3 pt-1 pb-3 border-b border-gray-200">
                <div
                    class="border-none w-full h-10 bg-gray-200 text-base flex justify-center items-center relative"
                    >
                    <input
                      v-model="pcLink"
                        type="text" autocomplete="off"
                        maxlength="40"
                        placeholder="请输入"
                        class="input-name text-[#524d4d] bg-transparent placeholder:tracking-wider px-3 border-none outline-none focus:outline-none focus:border-none w-full h-full"
                    />
                    </div>
                    <button @click="setBaseAddress(2, 'PC游戏地址')"
              
                class="outline-none whitespace-nowrap h-10 px-3 py-1 bg-[#4e6c50] text-white text-sm  tracking-wider"
                >
                确定
                </button>
            </div>
         </div>
        <div class="bg-white shadow rounded mt-3">
            <div class=" px-3 pt-3">代理后台地址</div>
            <div class="flex items-center w-full px-3 pt-1 pb-3 border-b border-gray-200">
                <div
                    class="border-none w-full h-10 bg-gray-200 text-base flex justify-center items-center relative"
                    >
                    <input
                      v-model="htLink"
                        type="text" autocomplete="off"
                        maxlength="40"
                        placeholder="请输入"
                        class="input-name text-[#524d4d] bg-transparent placeholder:tracking-wider px-3 border-none outline-none focus:outline-none focus:border-none w-full h-full"
                    />
                    </div>
                    <button @click="setBaseAddress(3, '代理后台地址')"
              
                class="outline-none whitespace-nowrap h-10 px-3 py-1 bg-[#4e6c50] text-white text-sm  tracking-wider"
                >
                确定
                </button>
            </div>
         </div>
        <div class="bg-white shadow rounded mt-3">
            <div class=" px-3 pt-3">客服地址</div>
            <div class="flex items-center w-full px-3 pt-1 pb-3 border-b border-gray-200">
                <div
                    class="border-none w-full h-10 bg-gray-200 text-base flex justify-center items-center relative"
                    >
                    <input
                      v-model="serviceLink"
                        type="text" autocomplete="off"
                        maxlength="40"
                        placeholder="请输入"
                        class="input-name text-[#524d4d] bg-transparent placeholder:tracking-wider px-3 border-none outline-none focus:outline-none focus:border-none w-full h-full"
                    />
                    </div>
                    <button @click="setBaseAddress(4, '客服地址')"
              
                class="outline-none whitespace-nowrap h-10 px-3 py-1 bg-[#4e6c50] text-white text-sm  tracking-wider"
                >
                确定
                </button>
            </div>
         </div>
        <div class="bg-white shadow rounded mt-3">
            <div class=" px-3 pt-3">安卓下载地址</div>
            <div class="flex items-center w-full px-3 pt-1 pb-3 border-b border-gray-200">
                <div
                    class="border-none w-full h-10 bg-gray-200 text-base flex justify-center items-center relative"
                    >
                    <input
                      v-model="androidLink"
                        type="text" autocomplete="off"
                        maxlength="40"
                        placeholder="请输入"
                        class="input-name text-[#524d4d] bg-transparent placeholder:tracking-wider px-3 border-none outline-none focus:outline-none focus:border-none w-full h-full"
                    />
                    </div>
                    <button @click="setBaseAddress(5, '安卓下载地址')"
              
                class="outline-none whitespace-nowrap h-10 px-3 py-1 bg-[#4e6c50] text-white text-sm  tracking-wider"
                >
                确定
                </button>
            </div>
         </div>
        <div class="bg-white shadow rounded mt-3">
            <div class=" px-3 pt-3">苹果下载地址</div>
            <div class="flex items-center w-full px-3 pt-1 pb-3 border-b border-gray-200">
                <div
                    class="border-none w-full h-10 bg-gray-200 text-base flex justify-center items-center relative"
                    >
                    <input
                      v-model="iosLink"
                        type="text" autocomplete="off"
                        maxlength="40"
                        placeholder="请输入"
                        class="input-name text-[#524d4d] bg-transparent placeholder:tracking-wider px-3 border-none outline-none focus:outline-none focus:border-none w-full h-full"
                    />
                    </div>
                    <button @click="setBaseAddress(6, '苹果下载地址')"
              
                class="outline-none whitespace-nowrap h-10 px-3 py-1 bg-[#4e6c50] text-white text-sm  tracking-wider"
                >
                确定
                </button>
            </div>
         </div>
        <div class="bg-white shadow rounded mt-3">
            <div class=" px-3 pt-3">推广主地址</div>
            <div class="flex items-center w-full px-3 pt-1 pb-3 border-b border-gray-200">
                <div
                    class="border-none w-full h-10 bg-gray-200 text-base flex justify-center items-center relative"
                    >
                    <input
                      v-model="tgLink"
                        type="text" autocomplete="off"
                        maxlength="40"
                        placeholder="请输入"
                        class="input-name text-[#524d4d] bg-transparent placeholder:tracking-wider px-3 border-none outline-none focus:outline-none focus:border-none w-full h-full"
                    />
                    </div>
                    <button @click="setBaseAddress(7, '推广主地址')"
              
                class="outline-none whitespace-nowrap h-10 px-3 py-1 bg-[#4e6c50] text-white text-sm  tracking-wider"
                >
                确定
                </button>
            </div>
         </div>
    </div>
</template>


<script>
/* eslint-disable */
import { mapState } from 'vuex'
import { GetBaseAddApi, SetBaseAddApi } from '@/api/ht'

export default {
  data() {
    return {
      h5Link: '',
      pcLink: '',
      htLink: '',
      androidLink: '',
      iosLink: '',
      serviceLink: '',
      tgLink: ''
    }
  },
  computed: {
    ...mapState({
      device: state => state.app.device,
      info: state => state.user.info
    })
  },
  created() {
    this.getBaseAddress()
  },
  methods: {
    getBaseAddress() {
      const sendStr = {
        type: 'all',
        platform_id: this.info.Id
      }
      GetBaseAddApi(sendStr).then((res) => {
        if (res.code === 0) {
          res.data.map(v => {
            if (v.type === 1) this.h5Link = v.link
            if (v.type === 2) this.pcLink = v.link
            if (v.type === 3) this.htLink = v.link
            if (v.type === 4) this.serviceLink = v.link
            if (v.type === 5) this.androidLink = v.link
            if (v.type === 6) this.iosLink = v.link
            if (v.type === 7) this.tgLink = v.link
          })
        } else {
            this.$toast('获取数据失败')
        }
      })
    },

    setBaseAddress(type, name) {
      const _link = type === 1
        ? this.h5Link
        : type === 2
          ? this.pcLink
          : type === 3
            ? this.htLink
            : type === 4
              ? this.serviceLink
              : type === 5
                ? this.androidLink
                : type === 6
                  ? this.iosLink
                  : type === 7
                    ? this.tgLink
                    : ''
      const sendStr = {
        type: type,
        name: name,
        link: _link,
        platform_id: this.info.Id

      }
      SetBaseAddApi(sendStr).then((res) => {
        if (res.code === 0) {
            this.$toast(res.data.msg)
          this.getBaseAddress()
        } else {
            this.$toast(res.data.msg)
        }
      }).catch((e) => {
        console.error(e)
      })
    }
  }
}
</script>
