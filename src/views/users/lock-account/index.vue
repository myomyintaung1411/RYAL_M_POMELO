<template>
    <div class="w-full h-[calc(100vh_-_50px)]  relative  overflow-y-auto ">
        <van-nav-bar fixed title="未处理提现" left-arrow @click-left="onClickLeft"></van-nav-bar>
    <section class="relative px-3 py-2 pt-12 ">
     <div class="flex items-center space-x-1 py-2">
        <van-button icon="replay" @click="refershList" class="w-1/2 h-10 rounded bg-[#4e6c50] text-white">刷新</van-button>
        <van-button @click="unlockAll" class="w-1/2 h-10 rounded bg-[#4e6c50] text-white">解锁全部</van-button>
     </div>



     <div class="relative overflow-x-auto shadow-md sm:rounded-lg ">
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 ">
            <tr>
                <th scope="col" class="p-4">
                    <div class="flex items-center">
                        <input v-model="isAllSelected" @click="toggleSelectAll"  type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                        <label class="sr-only">checkbox</label>
                    </div>
                </th>
                <th  scope="col" class="px-6 py-3 whitespace-nowrap">
                    用户名
                </th>

                <th  scope="col" class="px-6 py-3 whitespace-nowrap">
                    昵称 
                </th>
                <th scope="col" class="px-6 py-3 whitespace-nowrap">
                    级别
                </th>
                <th scope="col" class="px-6 py-3 whitespace-nowrap">
                    次数
                </th>
                <th scope="col" class="px-6 py-3 whitespace-nowrap">
                    记录时间
                </th>
                <th scope="col" class="px-6 py-3 whitespace-nowrap">
                    更新时间
                </th>
                <th scope="col" class="px-6 py-3 whitespace-nowrap">
                    IP
                </th>
                <th scope="col" class="px-6 py-3 whitespace-nowrap">
                    操作项目
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(phonelist) in lockList.tableData" :key="phonelist.Id" class=" border-b border-slate-600   bg-gray-800 ">
                <td class="w-4 p-4">
                    <div class="flex items-center">
                        <input v-model="selectedIds" :value="phonelist.id" @change="specificSelect"  type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                        <label  class="sr-only">checkbox</label>
                    </div>
                </td>
                <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {{phonelist.username}}
                </td>
                <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {{phonelist.nickname}}
                </td>
                <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {{phonelist.level}}
                </td>
                <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {{phonelist.login_count}}
                </td>
                <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {{phonelist.created_at}}
                </td>
                <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {{phonelist.updated_at}}
                </td>
                <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {{phonelist.ip}}
                </td>

                <td v-if="this.$Global.optioner.arrJxb[12] !== '0'"  class="px-6 py-4">
    
                    <div  class="flex items-center whitespace-nowrap ">
                    <van-button type="warning" size="small"  @click="handleUnlock(phonelist)" >解锁</van-button>
                    </div>
                </td>

            </tr>



        </tbody>
    </table>
     </div>
    <section class="w-full py-2 relative">
        <van-pagination v-model="currentPage" mode="simple" :total-items="lockList.totalItems || 0" :items-per-page="pageSize" @change="PaginationEvent" />
     </section>
    </section>

    </div>
</template>

  
  <script>
  import { mapState, mapGetters } from 'vuex'
  
  export default {
    data() {
      return {
        dialogVisibleAdd: false,
        showAll: false,
        showUnAll: false,
        lockList: {
          tableData: [
            // { id: 1, name: 'ceshi', sEnable: '启用', lastLoginTime: '2021-10-01 00:00:00' }
          ],
          totalItems: 0
        },
        loading: false,
        btn_loading: false,
        arrJxb: this.$Global.optioner.arrJxb,
        showUn: false,
        unData: {},
        pageSize: 100,
        currentPage: 1,
        ids: [],
        users: [],
        selectedIds: [],
        enable: 1,
      }
    },
    computed: {
        isAllSelected: {
    get() {
      return this.selectedIds.length === this.lockList.tableData.length;
    },
    set(value) {
      if (value) {
        this.selectedIds = this.lockList.tableData.map((item) => item.id);
        this.users = this.lockList.tableData.map((item) => item.username);
      } else {
        this.selectedIds = [];
        this.users = [];
      }
    },
  },
      ...mapState({
        isSub: state => state.user.isSubAccount,
        subInfo: state => state.user.subInfo,
        device: state => state.app.device
      }),
      ...mapGetters(['token'])
    },
    created() {
      this.getLockAccount()
    },
    methods: {
        specificSelect() {
        console.log(this.selectedIds)
        this.enable === 0 ? this.showDel = false : this.showDel = true
     // this.isAllSelected = this.selectedIds.length === this.phoneUserList.list.length;
    },
    onClickLeft() {
      this.$router.push('/dashboard')
    },
    toggleSelectAll() {
        if (this.isAllSelected) {
            this.selectedIds = [];
            this.users = [];
        } else {
            this.selectedIds = this.lockList.tableData.map((item) => item.id);
            this.users = this.lockList.tableData.map((item) => item.username);
        }
        console.log(this.selectedIds)
        this.enable === 0 ? this.showDel = false : this.showDel = true
     },
      unlockAll() {
        if (this.ids.length <= 0) return this.$toast('请选择用户')
        // this.showUn = true
        this.$dialog.confirm({
            title: '您确认要解锁所有锁定账号吗？'
            })
            .then(() => {
                const sendStr = {
                router: 'unlockLockAccount',
                JsonData: {
                opt_id: this.$Global.optioner.Id,
                opt_name: this.$Global.optioner.UserName,
                proxyname: this.isSub ? this.subInfo.name : '',
                token: this.token,
                ids: JSON.stringify(this.selectedIds),
                users: JSON.stringify(this.users),
                type: 'all'
                }
            }
            this.$toast.loading({
                    message: '请稍后...',
                    forbidClick: true,
                    duration: 1000,
                })
                this.$pomelo.sendcb(sendStr, res => {
                    if (res?.JsonData?.result === 'ok') {
                    this.$toast('解锁成功')
                    this.getLockAccount()
                    this.getLCount()
                    this.showUnAll = false
                    // this.unData = {}
                    } else {
                    this.$toast(res?.JsonData?.msg || '解锁失败')
                    }
                })
            })
            .catch(() => {
              console.log("canclel")
         });
      },
  
      findSearchAccount() {
        this.currentPage = 1
        this.getLockAccount()
      },
  
      refershList() {
        this.currentPage = 1
        this.getLockAccount()
      },
  
      handleUnlock(row) {
        let unData = JSON.parse(JSON.stringify(row))
        // this.showUn = true
        this.$dialog.confirm({
            title: '您确认要解锁' + unData.username + '吗？',
            })
            .then(() => {
                const sendStr = {
                    router: 'unlockLockAccount',
                    JsonData: {
                    opt_id: this.$Global.optioner.Id,
                    opt_name: this.$Global.optioner.UserName,
                    proxyname: this.isSub ? this.subInfo.name : '',
                    token: this.token,
                    id: unData.id,
                    username: unData.username
                    }
                }
            this.$toast.loading({
                    message: '请稍后...',
                    forbidClick: true,
                    duration: 1000,
                })
                this.$pomelo.sendcb(sendStr, res => {
                if (res?.JsonData?.result === 'ok') {
                this.$toast('解锁成功')
                this.getLockAccount()
                this.getLCount()
                this.unData = {}
                } else {
                this.$toast(res?.JsonData?.msg || '解锁失败')
                }
             })
            })
            .catch(() => {
              console.log("canclel")
         });
      },
  
      getLockAccount() {
        const sendStr = {
          router: 'getLockAccountList',
          JsonData: {
            opt_id: this.$Global.optioner.Id,
            opt_name: this.$Global.optioner.UserName,
            currentPage: this.currentPage,
            pageSize: this.pageSize,
            token: this.token,
            proxyname: this.isSub ? this.subInfo.name : ''
          }
        }
        this.loading = true
        this.$pomelo.sendcb(sendStr, res => {
          console.log('lock list ', res)
          this.loading = false
          this.lockList.tableData = []
          this.lockList.totalItems = 0
          var data = res.JsonData?.list
          var lockListForm = { tableData: [], totalItems: 0 }
          var tableData = lockListForm.tableData
          if (res.JsonData?.list?.length > 0) {
            for (var i = 0; i < data.length; i++) {
              tableData[i] = {}
              tableData[i].id = data[i].id
              tableData[i].username = data[i].username
              tableData[i].nickname = data[i].nicheng
              tableData[i].level = data[i].level
              tableData[i].status = data[i].status
              tableData[i].login_count = data[i].login_count
              tableData[i].created_at = data[i].created_at
              tableData[i].updated_at = data[i].updated_at
              tableData[i].memo = data[i].memo
              tableData[i].ip = data[i].ip
            }
            // this.mapIP(lockListForm.tableData)
            // if (this.isSub) {
            //   lockListForm.tableData.forEach((v, i) => {
            //     if (v.name === this.subInfo.name) {
            //       lockListForm.tableData.splice(i, 1)
            //     }
            //   })
            // }
            this.lockList.tableData = lockListForm.tableData
            this.lockList.totalItems = res.JsonData?.list?.length || 0
          } else {
            this.$toast('没有查询到相应的数据')
          }
        })
      },
  
      PaginationEvent(page) {
        this.currentPage = page
        this.getLockAccount()
      },
      handlePagination(props) {
        props.action === 'limit' ? this.currentPage = 1 : this.currentPage = props.page
        this.pageSize = props.limit
        // this.reqt()
        this.getLockAccount()
      },
      cancel() {
        this.showUn = false
        this.unData = {}
      },

  
      handleSelectionChange(val) {
        this.ids = []
        this.users = []
        this.ids = val.map(v => {
          return v.id
        })
        this.users = val.map(v => {
          return v.username
        })
        // this.enable === 0 ? this.showDel = false : this.showDel = true
      },
      cancelAll() {
        this.showUnAll = false
        // this.unData = {}
      },

      getLCount() {
        const sendStr = {
          router: 'getLockAccountRealtime',
          JsonData: {
            opt_id: this.$Global.optioner.Id
          }
        }
        this.$pomelo.sendcb(sendStr, res => {
          // console.log('lock account ', res)
          if (res?.JsonData?.result === 'ok') {
            this.$store.commit('ht/setLCount', res?.JsonData?.count)
          } else {
            this.$store.commit('ht/setLCount', 0)
          }
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
  
  <style scoped>
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: darkgray;
    cursor: pointer;
    user-select: none;
  }
  </style>
  