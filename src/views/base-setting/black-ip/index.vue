<template>
    <section class="py-3 px-3 relative">
        <div class="flex items-center space-x-1 ">
        <van-button @click="dialogFormVisible = true" class="w-1/2 h-10 rounded bg-[#4e6c50] text-white">添加IP黑名单</van-button>
        <van-button :loading="loading" :disabled="loading" @click="getBlackList" class="w-1/2 h-10 rounded bg-[#4e6c50] text-white">获取列表</van-button>
       </div>

       <div class="relative overflow-x-auto shadow-md sm:rounded-lg pt-2 ">
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 ">
            <tr>
                <th  scope="col" class="px-6 py-3 whitespace-nowrap">
                    ID
                </th>

                <th  scope="col" class="px-6 py-3 whitespace-nowrap">
                    操作员
                </th>
                <th  scope="col" class="px-6 py-3 whitespace-nowrap">
                    用户 
                </th>
                <th  scope="col" class="px-6 py-3 whitespace-nowrap">
                    IP 
                </th>
                <th  scope="col" class="px-6 py-3 whitespace-nowrap">
                    备注 
                </th>
                <th  scope="col" class="px-6 py-3 whitespace-nowrap">
                    创建时间 
                </th>
                <th  scope="col" class="px-6 py-3 whitespace-nowrap">
                    操作 
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(row) in ipList.tableData" :key="row.Id" class=" border-b border-slate-600   bg-gray-800 ">

                <td class="px-6 py-4 whitespace-nowrap">
                    {{row.id}}
                </td>

                <td class="px-6 py-4 whitespace-nowrap">
                    {{row.operator_name}}
                </td>

                <td class="px-6 py-4 whitespace-nowrap">
                    {{row.cause_user}}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    {{row.ip}}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    {{row.comment}}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    {{row.created_at}}
                </td>
                <td  class="px-6 py-4">

                    <div  class="flex items-center whitespace-nowrap ">
                    <van-button type="danger" size="small" @click="delIP(row)">删除</van-button>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
     </div>

       <van-popup  v-model="dialogFormVisible" closeable
      position="bottom"
      :style="{ height: '50%' }">
        <div class="px-3 py-10 w-full relative">
            <span class="font-bold text-lg">备注</span>
            <form @click.prevent class="w-full rounded-lg flex flex-col justify-center items-center ">

            <div class="flex items-center w-full relative h-10 rounded-md bg-[#dddddd] px-5 mt-3">
                    <div
                    class="border-none w-full h-full text-base flex justify-center items-center relative"
                    >
                    <input
                        v-model.trim="ip"
                        type="text" autocomplete="off"
                        maxlength="40"
                        placeholder="请输入IP"
                        class="input-name text-[#524d4d] bg-transparent placeholder:tracking-wider px-3 border-none outline-none focus:outline-none focus:border-none w-full h-full"
                    />
                    </div>
            </div>
            <div class="flex items-center w-full relative h-10 rounded-md bg-[#dddddd] px-5 mt-3">
                    <div
                    class="border-none w-full h-full text-base flex justify-center items-center relative"
                    >
                    <input
                        v-model.trim="comment"
                        type="text" autocomplete="off"
                        maxlength="40"
                        placeholder="备注"
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
              @click="addBlackIP()"
            >
            确认
            </van-button>
          </div>
        </form>
        </div>
    </van-popup>

    </section>
</template>

<script>
/* eslint-disable */
import { mapState, mapMutations } from 'vuex'
// import Add from './add.vue'
import { GetBlackIpsApi, AddBlackIpApi, DeleteBlackIpApi } from '@/api/ht'

export default {
//   components: {
//     Add
//   },
  data() {
    return {
      imageUrl: '',
      loading: false,
      t_loading: false,
      pageSize: 10,
      currentPage: 1,
      ipData: {},
      dialogFormVisible:false,
      ip: '',
      comment: ''
    }
  },
  computed: {
    ...mapState({
      ipList: state => state.carousel.ipList,
      device: state => state.app.device,
      info: state => state.user.info
    })
  },
  created() {
    this.getBlackList()
  },
  methods: {
    IPAction(state) {
      if (state) this.getBlackList()
    },

    ...mapMutations({
      setIPListData(commit, value) {
        commit('carousel/SET_IPBLACKLIST', value)
      }
    }),

    getBlackList() {
      // const reqt = {
      //   router: 'getBlackIPs',
      //   JsonData: {
      //     pageSize: this.pageSize,
      //     currentPage: this.currentPage
      //   }
      // }
      this.t_loading = true
      GetBlackIpsApi().then((res) => {
        this.t_loading = false
        if (res.code === 0) {
          if (res.data.list.length > 0) {
            this.setIPListData({ data: res.data.list, total: res.data.total })
          } else {
            this.setIPListData({ data: [], total: 0 })
          }
        }
      }).catch((e) =>
        this.t_loading = false
      )
    },

    addBlackIP() {
      // eslint-disable-next-line
      if (this.ip.trim() == '') return this.$toast('请输入IP')
      const reqt = {
        ip: this.ip.trim(),
        status: 1, // 开启：1， 关闭：0
        operator_name: this.info.username,
        operator_id: this.info.Id,
        cause_user: '',
        cause_user_id: '',
        comment: this.comment || ''
      }
      AddBlackIpApi(reqt).then((res) => {
        if (res.code === 0) {
            this.$toast('操作成功')
          this.$emit('IPAction', true)
          this.ip = ''
          this.comment = ''
          this.dialogFormVisible = false
        } else {
          if (res.msg === 'IP 已存在') return this.$toast(res.reason)
          this.$toast('操作失败')
        }
      }).catch((e) => {
        console.error(e)
      })
    },

    editSuccess(value) {
      if (value) {
        this.getBlackList()
      }
    },

    openEdit(row) {
      this.imgData = JSON.parse(JSON.stringify(row))
      this.$refs.editCarousel.dialogFormVisible = true
    },
    
    delIP(row) {
        this.$dialog.confirm({
            title: '您确要将该IP从列表中删除吗? ',
            })
        .then(() => {
          var sendStr = {
            id: row.id,
            ip: row.ip
          }
          DeleteBlackIpApi(sendStr).then((res) => {
            if (res.code === 0) {
              this.$toast('操作成功')
              this.getBlackList()
            } else {
              this.$toast('操作失败')
            }
          }).catch((e) => {
            console.error(e)
          })
        })
        .catch(() => {})
    }
  }
}
</script>
