<template>
    <div class="py-3 px-3 relative">
         <div class="bg-white shadow rounded">
            <div class="flex items-center justify-between px-3 py-2 border-b border-gray-200">
                <span>登录游戏公告</span>
                <button
                @click="confirmNotice(1)"
                class="outline-none px-3 py-1 bg-[#4e6c50] text-white text-sm rounded tracking-wider"
                >
                提交更新
                </button>
                
            </div>
            <div class="px-3">
                <textarea v-model="content1" placeholder="请输入" autocomplete="off" name="" id="_first" class=" py-2 px-1 outline-none  w-full"  rows="5"></textarea>
            </div>
         </div>
         <div class="bg-white shadow rounded mt-3">
            <div class="flex items-center justify-between px-3 py-2 border-b border-gray-200">
                <span>游戏滚动条公告</span>
                <button
                @click="confirmNotice(2)"
                class="outline-none px-3 py-1 bg-[#4e6c50] text-white text-sm rounded tracking-wider"
                >
                提交更新
                </button>
                
            </div>
            <div class="px-3">
                <textarea v-model="content2" placeholder="请输入" autocomplete="off" name="" id="_first" class=" py-2 px-1 outline-none  w-full"  rows="5"></textarea>
            </div>
         </div>
         <div class="bg-white shadow rounded mt-3">
            <div class="flex items-center justify-between px-3 py-2 border-b border-gray-200">
                <span>电投游戏公告</span>
                <button
                @click="confirmNotice(3)"
                class="outline-none px-3 py-1 bg-[#4e6c50] text-white text-sm rounded tracking-wider"
                >
                提交更新
                </button>
                
            </div>
            <div class="px-3">
                <textarea v-model="content3" placeholder="请输入" autocomplete="off" name="" id="_first" class=" py-2 px-1 outline-none  w-full"  rows="5"></textarea>
            </div>
         </div>
         <div class="bg-white shadow rounded mt-3">
            <div class="flex items-center justify-between px-3 py-2 border-b border-gray-200">
                <span>代理后台公告</span>
                <button
                @click="confirmNotice(4)"
                class="outline-none px-3 py-1 bg-[#4e6c50] text-white text-sm rounded tracking-wider"
                >
                提交更新
                </button>
                
            </div>
            <div class="px-3">
                <textarea v-model="content4" placeholder="请输入" autocomplete="off" name="" id="_first" class=" py-2 px-1 outline-none  w-full"  rows="5"></textarea>
            </div>
         </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import { GetNoticeMsgApi, SetNoticeMsgApi } from '@/api/ht'
import moment from 'moment'

export default {
  data() {
    return {
      content1: '',
      content2: '',
      content3: '',
      content4: ''
    }
  },
  computed: {
    ...mapState({
      noticeData: state => state.ht.bulletinListData,
      device: state => state.app.device,
      isSub: state => state.user.isSubAccount,
      subInfo: state => state.user.subInfo,
      info: state => state.user.info
    })
  },
  created() {
    this.getNotcieMsg()
  },
  methods: {
    getNotcieMsg() {
      const sendStr = {
        agent_id: this.info.Id,
        type: 'all'
      }
      GetNoticeMsgApi(sendStr).then((res) => {
        if (res.code === 0) {
          const info = res.data
          for (let i = 0; i < info?.length; i++) {
            info[i].startTime = moment(info[i].startTime).format('YYYY-MM-DD HH:mm:ss')
            info[i].endTime = moment(info[i].endTime).format('YYYY-MM-DD HH:mm:ss')
          }
          info.map(v => {
            if (v.type === 1) this.content1 = v.content
            if (v.type === 2) this.content2 = v.content
            if (v.type === 3) this.content3 = v.content
            if (v.type === 4) this.content4 = v.content
          })
          this.$store.commit('ht/setBulletinListData', info)
        } else {
          this.$store.commit('ht/setBulletinListData', {})
        }
      }).catch((e) => {
        console.error(e)
      })
    },
    confirmNotice(type) {
      let content = ''
      type === 1
        ? content = this.content1
        : type === 2
          ? content = this.content2
          : type === 3
            ? content = this.content3
            : type === 4
              ? content = this.content4
              : content = ''
      if (content === '') return
      const sendStr = {
        content: content,

        username: this.info.username,
        level: this.info.level,
        gx: this.info.gx,
        agent_id: this.info.Id,
        type: type,
        start_time: moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
      }
      SetNoticeMsgApi(sendStr).then((res) => {
        if (res.code === 0) {
          this.dialogVisible = false
          this.$toast(res.msg)
          this.getNotcieMsg()
        } else {
            this.$toast(res.msg)
        }
      }).catch((e) => {
        console.error(e)
      })
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 === 1) {
        return 'color-row'
      }
      return ''
    }
  }
}
</script>
