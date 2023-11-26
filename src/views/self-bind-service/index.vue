<template>
    <div class="h-full relative w-full">
        <van-nav-bar fixed
        title="公共设置"
        left-arrow
        @click-left="onClickLeft"
        >
        </van-nav-bar>
     <section class="pt-12 w-full relative">
        <van-tabs v-model="activeName"  sticky color="#4e6c50">
            <van-tab v-if="$Global.optioner.Id == 1"   title="代理列表" name="agent">
                <section class="px-3 py-2">
                    <!-- <div class="flex items-center w-full justify-between space-x-2 py-2">
                      <van-button icon="plus" @click="addService"  class="flex-1 h-10 rounded bg-[#4e6c50] text-white whitespace-nowrap">添加客服</van-button>
                      <van-button @click="agentGetOwnService()" icon="search" class=" flex-1  whitespace-nowrap h-10 rounded bg-[#4e6c50] text-white">搜索</van-button>
                      <van-button  @click="refreshLog()" icon="replay"  class=" flex-1  whitespace-nowrap h-10 rounded bg-[#4e6c50] text-white">刷新</van-button>
                    </div>
                    <div class="flex items-center w-full justify-between space-x-2 py-2">
                        <van-button icon="plus" @click="goService(1)"  class="flex-1 h-10 rounded bg-[#4e6c50] text-white whitespace-nowrap">联系公司客服1</van-button>
                        <van-button @click="goService(2)" icon="search" class=" flex-1  whitespace-nowrap h-10 rounded bg-[#4e6c50] text-white">联系公司客服2</van-button>
                    </div> -->
                    <div class="relative overflow-x-auto shadow-md sm:rounded-lg pt-2 h-[500px] ">
                        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
                            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 ">
                                <tr>
                                    <th  scope="col" class="px-6 py-2 whitespace-nowrap">
                                      序号
                                    </th>
                                    <th  scope="col" class="px-6 py-2 whitespace-nowrap">
                                        ID
                                    </th>
                                    <th  scope="col" class="px-6 py-2 whitespace-nowrap">
                                      账号
                                    </th>
                                    <th  scope="col" class="px-6 py-2 whitespace-nowrap">
                                      昵称
                                    </th>
                                    <th  scope="col" class="px-6 py-2 whitespace-nowrap">
                                      客服数
                                    </th>
                                    <th  scope="col" class="px-6 py-2 whitespace-nowrap">
                                      链接
                                    </th>


                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(row,index) in agentServiceList" :key="row.Id" class=" border-b border-slate-600   bg-gray-800 ">

                                    <td class="px-6 py-2 whitespace-nowrap">
                                        {{index + 1}}
                                    </td>
                                    <td class="px-6 py-2 whitespace-nowrap">
                                        {{ row.Id }}
                                    </td>
                                    <td class="px-6 py-2 whitespace-nowrap">
                                        {{ row.username }}
                                    </td>
                                    <td class="px-6 py-2 whitespace-nowrap">
                                        {{ row.nicheng }}
                                    </td>
                                    <td class="px-6 py-2 whitespace-nowrap">
                                        {{ row.count }}
                                    </td>
                                    <td class="px-6 py-2 whitespace-nowrap">
                                        {{ row.customerAddr }}
                                    </td>
                                    <!-- <td  class="px-6 py-4">
                                        <div  class="flex items-center whitespace-nowrap ">
                                        <van-button type="primary" size="small" @click="changeNickname(row)">修改昵称</van-button>
                                        <van-button type="primary" size="small" @click="openServiceLink(row)">打开客服后台</van-button>
                                        </div>
                                    </td> -->

                                </tr>
                            </tbody>
                        </table>
                   </div>

                </section>

            </van-tab>
            <van-tab  title="绑定客服" name="first">
                <section class="px-3 py-2 relative">
                  <div class="flex items-center w-full justify-between space-x-2 py-2">
                        <van-button v-if="serviceList.length < 10" icon="plus" @click="addService"  class="flex-1 h-10 rounded bg-[#4e6c50] text-white whitespace-nowrap">添加客服</van-button>
                        <van-button @click="agentGetOwnService" icon="search" class=" flex-1  whitespace-nowrap h-10 rounded bg-[#4e6c50] text-white">搜索</van-button>
                    </div> 
                  <div class="flex items-center w-full justify-between space-x-2 py-2">
                        <van-button  icon="replay" @click="refreshLog"  class="flex-1 h-10 rounded bg-[#4e6c50] text-white whitespace-nowrap">刷新</van-button>
                        <van-button v-for="sv in svArr" :key="sv" @click="goService(sv)" icon="search" class=" flex-1  whitespace-nowrap h-10 rounded bg-[#4e6c50] text-white">搜索</van-button>
                    </div> 
                     <div class="relative overflow-x-auto shadow-md sm:rounded-lg py-2 ">
                        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
                                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 ">
                                    <tr>

                                        <th  scope="col" class="px-6 py-2 whitespace-nowrap">
                                            ID
                                        </th>
                                        <th  scope="col" class="px-6 py-2 whitespace-nowrap">
                                            客服账号
                                        </th>
                                        <th  scope="col" class="px-6 py-2 whitespace-nowrap">
                                            客服昵称
                                        </th>
                                        <th  scope="col" class="px-6 py-2 whitespace-nowrap">
                                            自身余额
                                        </th>
                                        <th  scope="col" class="px-6 py-2 whitespace-nowrap">
                                            操作
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(row) in serviceList" :key="row.Id" class=" border-b border-slate-600   bg-gray-800 ">

                                        <td class="px-6 py-2 whitespace-nowrap">
                                            {{row.Id}}
                                        </td>

                                        <td class="px-6 py-2 whitespace-nowrap">
                                            {{row.username}}
                                        </td>

                                        <td class="px-6 py-2 whitespace-nowrap">
                                            {{row.nickname}}
                                        </td>
                                        <td  class="px-6 py-2">
                                            <div  class="flex items-center whitespace-nowrap space-x-2 ">
                                            <van-button type="primary" size="mini" @click="changeNickname(row)">修改昵称</van-button>
                                            <van-button type="primary" size="mini" @click="openServiceLink(row)">打开客服后台</van-button>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                        </table>
                      </div>
                      <div class="py-3 tracking-wider text-2xl ">
                    <p class="text-green-500">公司限定可自由绑定10个坐席。需要更多请联系公司客服！</p>
                    <p class="text-red-500">没有客服人员，请勿绑定！不然客户联系客服时没有响应，会影响客户正常上下分！</p>
                   </div>
                 </section>

            </van-tab>
            <van-tab v-if="$Global.optioner.Id == 1"  title="解绑客服" name="second">
                <section class="px-3 py-2 relative">
                  <div class="flex items-center space-x-1 pt-2">
                        <div class="flex items-center w-full relative h-10 rounded-md bg-[#dddddd] px-5">
                            <div
                            class="border-none w-full h-full text-base flex justify-center items-center relative"
                            >
                            <input
                                v-model.trim="find_agentname"
                                type="text"
                                maxlength="18"
                                min="11"
                                minlength="11"
                                placeholder="请输入代理号"
                                class="input-name text-[#524d4d] bg-transparent placeholder:tracking-wider px-3 border-none outline-none focus:outline-none focus:border-none w-full h-full"
                            />
                            </div>
                        </div>
                        <van-button @click="searchAgentService" class="w-20 h-10 rounded bg-[#4e6c50] text-white">搜索</van-button>
                     </div>
                     <div class="relative overflow-x-auto shadow-md sm:rounded-lg py-2 ">
                        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
                                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 ">
                                    <tr>

                                        <th  scope="col" class="px-6 py-2 whitespace-nowrap">
                                            ID
                                        </th>
                                        <th  scope="col" class="px-6 py-2 whitespace-nowrap">
                                            客服账号
                                        </th>
                                        <th  scope="col" class="px-6 py-2 whitespace-nowrap">
                                            客服昵称
                                        </th>
                                        <th  scope="col" class="px-6 py-2 whitespace-nowrap">
                                            自身余额
                                        </th>
                                        <th  scope="col" class="px-6 py-2 whitespace-nowrap">
                                            操作
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(row) in searchServiceList" :key="row.Id" class=" border-b border-slate-600   bg-gray-800 ">

                                        <td class="px-6 py-2 whitespace-nowrap">
                                            {{row.Id}}
                                        </td>

                                        <td class="px-6 py-2 whitespace-nowrap">
                                            {{row.username}}
                                        </td>

                                        <td class="px-6 py-2 whitespace-nowrap">
                                            {{row.nickname}}
                                        </td>
                                        <td  class="px-6 py-2">
                                            <div  class="flex items-center whitespace-nowrap space-x-2 ">
                                            <van-button type="primary" size="mini" @click="removeService(row)">解绑</van-button>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                        </table>
                      </div>

                 </section>
            </van-tab>
        </van-tabs> 
     </section>
     <Remove ref="removeRef" :remove-data="removeData" :name-data="nameData" @removeEmit="removeEmit" />
     <Add ref="addRef" @serviceEmit="serviceEmit" />
        <Edit ref="editRef" :edit-data="editData" @serviceEmit="serviceEmit" />

    </div>
</template>

<script>
import { agentGetOwnServiceApi } from '@/api/ip'
// import { resetPasswordOne } from '@/api/user'
import { mapState } from 'vuex'
import moment from 'moment'
import AES from '@/api/aes'
// import Update from './action/edit.vue'
// import Pagination from '@/components/Pagination'
import Add from './action/add.vue'
import Edit from './action/edit.vue'
import Remove from './action/remove.vue'

export default {
  name: 'LoginList',
  filters: {
    // statusFilter(status) {
    //   const statusMap = {
    //     published: 'success',
    //     draft: 'gray',
    //     deleted: 'danger'
    //   }
    //   return statusMap[status]
    // }
    dateFilter(date) {
      if (date) {
        return moment(date).format('YYYY-MM-DD HH:mm:ss')
      }
      return ''
    }
  },
  components: {
    // Update
    Add,
    Edit,
    Remove
    // Pagination
  },
  data() {
    return {
      list: null,
      listLoading: false,
      levelData: {},
      editData: {},
      loading: false,
      toDate: '',
      fromDate: '',
      findname: '',
      type: '',
      pageNum: 1,
      pageSize: 30,
      activeName: 'first',
      agentServiceList: [],
      find_agentname: '',
      removeData: {},
      nameData: '',
      svArr: []
    }
  },
  computed: {
    ...mapState({
      serviceList: state => state.ht.serviceList,
      searchServiceList: state => state.ht.searchServiceList
    })
  },
  mounted() {
    // this.toDate = moment(new Date()).endOf('day').format('YYYY-MM-DD HH:mm:ss')
    // this.fromDate = moment(new Date()).startOf('day').format('YYYY-MM-DD HH:mm:ss')
    this.agentGetOwnService()
    if (this.$Global.optioner.Id === 1) {
      this.getASList()
    }
    this.checkSercice()
  },
  methods: {
    onClickLeft() {
      this.$router.push('/dashboard')
    },
    checkSercice() {
      const send_ = {
        router: 'checkAGService',
        JsonData: {
          rela: this.$Global.optioner.gx.split('^')
        }
      }
      this.$pomelo.sendcb(send_, res => {
        console.log('ressssssssss ', send_, res)
        if (res?.JsonData?.data) {
          this.svArr = res.JsonData.data
        }
      })
    },
    getASList() {
      const send_ = {
        router: 'GetBindServiceAgentList',
        JsonData: {}
      }
      this.$pomelo.sendcb(send_, res => {
        console.log(res)
        if (res?.JsonData?.result === 'ok') {
          this.agentServiceList = res?.JsonData.user.map(v => {
            v.count = v.customerAddr.split(',').length
            return v
          })
        }
      })
    },
    addService() {
      this.$refs.addRef.dialogFormVisible = true
    },
    refreshLog() {
      this.pageNum = 1
      this.agentGetOwnService()
    },

    goService(num) {
      // if (num === 1) {
      // eslint-disable-next-line
      window.open(num, '_blank', 'height=700, width=400')
      // }
      // else {
      //   // eslint-disable-next-line
      //   window.open(config.service2, '_blank', 'height=700, width=400')
      // }
    },

    serviceEmit(val) {
      if (val) this.agentGetOwnService()
    },

    changeNickname(row) {
      this.editData = JSON.parse(JSON.stringify(row))
      this.$refs.editRef.dialogFormVisible = true
    },

    openServiceLink(row) {
      window.open(`http://hjkf88.cn/admin/#/login?redirect=%2Fdashboard&name=${row.username}`, '_blank')
    },

    agentGetOwnService() {
      this.listLoading = true
      const en = this.$Global.ens
      const send_ = AES.encrypt(JSON.stringify({ Id: this.$Global.optioner.Id }), en)

      agentGetOwnServiceApi(send_).then(res => {
        // console.log('res ', res)
        const resp = JSON.parse(AES.decrypt(res?.data, en))
        // console.log('resp ', resp)
        if (resp?.JsonData?.result === 'ok') {
          this.$store.commit('ht/SET_SERVICE_LIST', resp?.JsonData?.data || [])
        } else {
          this.$store.commit('ht/SET_SERVICE_LIST', [])
        }
        this.listLoading = false
      }).catch(e => {
        this.listLoading = false
      })
    },

    PaginationEvent(props) {
      this.handlePagination(props)
    },
    handlePagination(props) {
      props.action === 'limit' ? this.pageNum = 1 : this.pageNum = props.page
      this.pageSize = props.limit
      this.agentGetOwnService()
    },

    selectDate(time) {
      switch (time) {
        case '1':
          // 获取今日的开始和结束时间
          this.fromDate = moment().startOf('day').format('YYYY-MM-DD HH:mm:ss')
          this.toDate = moment().endOf('day').format('YYYY-MM-DD HH:mm:ss')
          break
        case '2':
          // 获取昨日的开始和结束时间
          this.fromDate = moment().subtract(1, 'day').startOf('day').format('YYYY-MM-DD HH:mm:ss')
          this.toDate = moment().subtract(1, 'day').endOf('day').format('YYYY-MM-DD HH:mm:ss')
          break
        case '3':
          // 获取本周的开始和结束时间
          this.fromDate = moment().startOf('week').format('YYYY-MM-DD HH:mm:ss')
          this.toDate = moment().endOf('week').format('YYYY-MM-DD HH:mm:ss')
          break
        case '4':
          // 获取上周的开始和结束时间
          this.fromDate = moment().subtract(1, 'week').startOf('week').format('YYYY-MM-DD HH:mm:ss')
          this.toDate = moment().subtract(1, 'week').endOf('week').format('YYYY-MM-DD HH:mm:ss')
          break
        case '5':
          // 获取本月的开始和结束时间
          this.fromDate = moment().startOf('month').format('YYYY-MM-DD HH:mm:ss')
          this.toDate = moment().endOf('month').format('YYYY-MM-DD HH:mm:ss')
          break
        case '6':
          // 获取上月的开始和结束时间
          this.fromDate = moment().subtract(1, 'month').startOf('month').format('YYYY-MM-DD HH:mm:ss')
          this.toDate = moment().subtract(1, 'month').endOf('month').format('YYYY-MM-DD HH:mm:ss')
          break
      }
      this.pageNum = 1
      this.agentGetOwnService()
    },

    searchAgentService() {
      if (this.find_agentname.trim() === '') return this.$toast('请输入代理号')
      const sendStr = {
        router: 'SearchAgentService',
        JsonData: {
          id: this.$Global.optioner.Id,
          agent_name: this.find_agentname
        }
      }

      this.$pomelo.sendcb(sendStr, res => {
        // console.log('res ', res)
        if (res?.JsonData?.result === 'ok') {
          const en = this.$Global.ens
          const send_ = AES.encrypt(JSON.stringify({ Id: res?.JsonData?.user.Id }), en)

          agentGetOwnServiceApi(send_).then(res => {
            // console.log('res ', res)
            const resp = JSON.parse(AES.decrypt(res?.data, en))
            // console.log('resp ', resp)
            if (resp?.JsonData?.result === 'ok') {
              this.$store.commit('ht/SET_SEARCH_SERVICE_LIST', resp?.JsonData?.data || [])
            } else {
              this.$store.commit('ht/SET_SEARCH_SERVICE_LIST', [])
            }
            this.listLoading = false
          }).catch(e => {
            this.listLoading = false
          })
        } else {
          this.$store.commit('ht/SET_SEARCH_SERVICE_LIST', [])
          this.$toast('没有查询到数据')
        }
      })
    },

    removeEmit(v) {
      if (v) this.searchAgentService()
    },

    removeService(row) {
      this.nameData = this.find_agentname.trim()
      this.removeData = JSON.parse(JSON.stringify(row))
      this.$nextTick(() => {
        this.$refs.removeRef.dialogFormVisible = true
      })
    }

  }
}
</script>