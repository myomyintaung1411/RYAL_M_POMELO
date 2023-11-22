<template>
    <div class="h-full relative w-full">
        <van-nav-bar fixed
        title="公共设置"
        left-arrow
        @click-left="onClickLeft"
        >
        </van-nav-bar>
     <section class="pt-12 w-full relative">
        <van-tabs v-model="activeName" @click="tabClick" sticky color="#4e6c50">
            <van-tab   title="绑定客服" name="a">
                <section class="px-3 py-2">
                    <div class="flex items-center w-full justify-between space-x-2 py-2">
                      <van-button icon="plus" @click="addService"  class="flex-1 h-10 rounded bg-[#4e6c50] text-white whitespace-nowrap">添加客服</van-button>
                      <van-button @click="agentGetOwnService()" icon="search" class=" flex-1  whitespace-nowrap h-10 rounded bg-[#4e6c50] text-white">搜索</van-button>
                      <van-button  @click="refreshLog()" icon="replay"  class=" flex-1  whitespace-nowrap h-10 rounded bg-[#4e6c50] text-white">刷新</van-button>
                    </div>
                    <div class="flex items-center w-full justify-between space-x-2 py-2">
                        <van-button icon="plus" @click="goService(1)"  class="flex-1 h-10 rounded bg-[#4e6c50] text-white whitespace-nowrap">联系公司客服1</van-button>
                        <van-button @click="goService(2)" icon="search" class=" flex-1  whitespace-nowrap h-10 rounded bg-[#4e6c50] text-white">联系公司客服2</van-button>
                    </div>
                    <div class="relative overflow-x-auto shadow-md sm:rounded-lg pt-2 h-[500px] ">
                        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
                            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 ">
                                <tr>
                                    <th  scope="col" class="px-6 py-3 whitespace-nowrap">
                                        ID
                                    </th>
                                    <th  scope="col" class="px-6 py-3 whitespace-nowrap">
                                        客服账号
                                    </th>
                                    <th  scope="col" class="px-6 py-3 whitespace-nowrap">
                                        客服昵称
                                    </th>
                                    <th  scope="col" class="px-6 py-3 whitespace-nowrap">
                                        操作
                                    </th>


                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(row) in serviceList" :key="row.Id" class=" border-b border-slate-600   bg-gray-800 ">

                                    <td class="px-6 py-4 whitespace-nowrap">
                                        {{row.id}}
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        {{ scope.row.username }}
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        {{ scope.row.nickname }}
                                    </td>
                                    <td  class="px-6 py-4">
                                        <div  class="flex items-center whitespace-nowrap ">
                                        <van-button type="primary" size="small" @click="changeNickname(row)">修改昵称</van-button>
                                        <van-button type="primary" size="small" @click="openServiceLink(row)">打开客服后台</van-button>
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
                <Add ref="addRef" @serviceEmit="serviceEmit" />
                <Edit ref="editRef" :edit-data="editData" @serviceEmit="serviceEmit" />

            </van-tab>
            <van-tab v-if="info.Id == 1" title="解绑客服" name="b">
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

                                        <th  scope="col" class="px-6 py-3 whitespace-nowrap">
                                            ID
                                        </th>
                                        <th  scope="col" class="px-6 py-3 whitespace-nowrap">
                                            客服账号
                                        </th>
                                        <th  scope="col" class="px-6 py-3 whitespace-nowrap">
                                            客服昵称
                                        </th>
                                        <th  scope="col" class="px-6 py-3 whitespace-nowrap">
                                            自身余额
                                        </th>
                                        <th  scope="col" class="px-6 py-3 whitespace-nowrap">
                                            操作
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(row) in searchServiceList" :key="row.Id" class=" border-b border-slate-600   bg-gray-800 ">

                                        <td class="px-6 py-4 whitespace-nowrap">
                                            {{row.Id}}
                                        </td>

                                        <td class="px-6 py-4 whitespace-nowrap">
                                            {{row.username}}
                                        </td>

                                        <td class="px-6 py-4 whitespace-nowrap">
                                            {{row.nickname}}
                                        </td>
                                        <td  class="px-6 py-4">
                                            <div  class="flex items-center whitespace-nowrap ">
                                            <van-button type="danger" size="small" @click="removeService(row)">解绑</van-button>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                        </table>
                      </div>
                 </section>
                 <Remove ref="removeRef" :remove-data="removeData" :name-data="nameData" @removeEmit="removeEmit" />

            </van-tab>
        </van-tabs> 
     </section>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import { agentGetOwnServiceApi } from '@/api/ip'
import { SearchAgentServiceApi } from '@/api/ht'
import AES from '@/api/aes'
import Add from './action/add.vue'
import Edit from './action/edit.vue'
import Remove from './action/remove.vue'

export default {
    components: {
        Add,
        Edit,
        Remove
  },
  data() {
    return{
        activeName:'a',
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

        find_agentname: '',
        removeData: {},
        nameData: ''
    }
  },
  computed: {
    ...mapState({
      serviceList: state => state.ht.serviceList,
      searchServiceList: state => state.ht.searchServiceList,
      info: state => state.user.info
    })
  },
  mounted() {
    this.agentGetOwnService()
  },
  methods: {
    onClickLeft() {
      this.$router.push('/dashboard')
    },
    addService() {
      this.$refs.addRef.dialogFormVisible = true
    },
    refreshLog() {
      this.pageNum = 1
      this.agentGetOwnService()
    },
    serviceEmit(val) {
      if (val) this.agentGetOwnService()
    },
    goService(num) {
      if (num === 1) {
        // eslint-disable-next-line
        window.open(config.service1, '_blank', 'height=700, width=400')
      } else {
        // eslint-disable-next-line
        window.open(config.service2, '_blank', 'height=700, width=400')
      }
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
      const send_ = AES.encrypt(JSON.stringify({ Id: this.info.Id }), en)

      agentGetOwnServiceApi(send_).then(res => {
        const resp = JSON.parse(AES.decrypt(res?.data, en))
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
    searchAgentService() {
      if (this.find_agentname.trim() === '') return this.$toast('请输入代理号')
      const sendStr = {
        id: this.info.Id,
        agent_name: this.find_agentname
      }
      this.listLoading = true
      SearchAgentServiceApi(sendStr).then((res) => {
        this.listLoading = false
        if (res.code === 0) {
          const en = this.$Global.ens
          const send_ = AES.encrypt(JSON.stringify({ Id: res?.data?.user.Id }), en)
          agentGetOwnServiceApi(send_).then(res => {
            const resp = JSON.parse(AES.decrypt(res?.data, en))
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
        }
      }).catch((e) => {
        this.listLoading = false
        console.error(e)
      })
    },

    removeService(row) {
      this.nameData = this.find_agentname.trim()
      this.removeData = JSON.parse(JSON.stringify(row))
      this.$nextTick(() => {
        this.$refs.removeRef.dialogFormVisible = true
      })
    },

    removeEmit(v) {
      if (v) this.searchAgentService()
    },
    tabClick(name,title){
            switch (name) {
             case 'a': 
             
                 break;
             case 'b': 
        
                 break;
             default:
                 break;
         }
     },
  },
}
</script>