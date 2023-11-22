<template>
   <section class="w-full h-[calc(100vh_-_50px)]  relative  overflow-y-auto">
    <van-nav-bar fixed
        title="实时下注"
        left-arrow
        @click-left="onClickLeft"
        >
        </van-nav-bar>
        <section class="w-full relative px-3 py-2">
            <div class="flex items-center space-x-1 pt-12">
              <div class="flex items-center w-full relative h-10 rounded-md bg-[#dddddd] px-5">
                  <div
                  class="border-none w-full h-full text-base flex justify-center items-center relative"
                  >
                  <input
                      v-model.trim="name"
                      type="text"
                      maxlength="18"
                      min="11"
                      minlength="11"
                      placeholder="请输入账号"
                      class="input-name text-[#524d4d] bg-transparent placeholder:tracking-wider px-3 border-none outline-none focus:outline-none focus:border-none w-full h-full"
                  />
                  </div>
              </div>
             <van-button @click="doSearchBalance" class="w-20 h-10 rounded bg-[#4e6c50] text-white">确认</van-button>
         </div>

       <div class="relative overflow-x-auto shadow-md sm:rounded-lg py-2 ">
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 ">
            <tr>

                <th  scope="col" class="px-6 py-3 whitespace-nowrap">
                    用户账号
                </th>
                <th  scope="col" class="px-6 py-3 whitespace-nowrap">
                    昵称
                </th>
                <th  scope="col" class="px-6 py-3 whitespace-nowrap">
                    级别
                </th>
                <th  scope="col" class="px-6 py-3 whitespace-nowrap">
                    自身余额
                </th>
                <th  scope="col" class="px-6 py-3 whitespace-nowrap">
                    代理余额
                </th>
                <th  scope="col" class="px-6 py-3 whitespace-nowrap">
                    会员余额
                </th>
                <th  scope="col" class="px-6 py-3 whitespace-nowrap">
                    总余额
                </th>


            </tr>
        </thead>
        <tbody>
            <tr v-for="(row) in balanceList.tableData" :key="row.Id" class=" border-b border-slate-600   bg-gray-800 ">

                <td class="px-6 py-4 whitespace-nowrap">
                    {{row.account}}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    {{row.nickname}}
                </td>

                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                        <span v-if="row.level === 2 || row.level === 1" >代理</span>
                        <span v-else-if="row.level === 4 || row.level === '4'">子账号</span>
                        <span v-else>会员</span>
                    </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    {{row.ownBalance}}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    {{row.agentBalance}}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    {{row.memberBalance}}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    {{row.totalBalance}}
                </td>

            </tr>



        </tbody>
    </table>
     </div>

        </section>
   </section>
</template>

<script>
import { mapState } from 'vuex'
import { TotalBalanceApi } from '@/api/ht'

export default {
  name: 'TotalBalance',
  data() {
    return {
      loading: false,
      select: '1',
      name: ''
    }
  },
  computed: {
    ...mapState({
      balanceList: state => state.ht.balanceList,
      isSub: state => state.user.isSubAccount,
      subInfo: state => state.user.subInfo,
      info: state => state.user.info
    })
  },
  methods: {
    // 限制输入特殊字符
    btKeyUp(e) {
      e.target.value = e.target.value.replace(/[`~!#$%^&*()\-+=<>?:'{}|,.\/;'\\[\]·~！#￥%……&*（）\-+={}|《》？：“”【】、；‘’，。、]/g, '')
    },
    getBalance() {
      this.name = this.isSub ? this.subInfo.name : this.info.username
      this.doSearchBalance()
    },
    doSearchBalance() {
      if (this.name.trim() === '') return  this.$notify({type:'danger',message:'提示：请输入用户账号',duration: 1500,})
      const reqt = {

        name: this.name.trim(),
        opt_id: this.info.Id
      }
      this.loading = true
      TotalBalanceApi(reqt).then((res) => {
        this.loading = false
        var balanceForm = { tableData: [], totalItemsNum: 0, state: 0 }
        if (res.code === 0) {
          balanceForm.tableData[0] = {}
          balanceForm.tableData[0].account = res.data.username
          balanceForm.tableData[0].nickname = res.data.nickname
          balanceForm.tableData[0].level = res.data.level
          balanceForm.tableData[0].ownBalance = res.data.ownBalance || 0.00
          balanceForm.tableData[0].agentBalance = res.data.agentBalance || 0.00
          balanceForm.tableData[0].memberBalance = res.data.memberBalance || 0.00
          balanceForm.tableData[0].totalBalance = res.data.totalBalance || 0.00
          this.$store.commit('ht/setBalanceList', balanceForm)
        } else {
          this.$store.commit('ht/setBalanceList', balanceForm)
          this.$notify({type:'danger',message:'没有查询到相应的数据!',duration: 1500,})
          this.loading = false
        }
      }).catch((e) => {
        this.loading = false
        console.error(e)
      })
    },
    onClickLeft() {
      this.$router.push('/report-page/report')
    },
  }
}  
</script>
