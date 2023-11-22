<template>
    <div class="w-full h-[calc(100vh_-_50px)]  relative  overflow-y-auto ">
        <van-nav-bar fixed
        title="修改账号记录"
        left-arrow
        @click-left="onClickLeft"
        >
        </van-nav-bar>
    <section class="relative px-3 py-2  ">
        <div class="flex items-center w-full justify-between space-x-2 pt-12">
               <van-button icon="plus" @click="openFind_Dialog"  class="w-1/3 h-10 rounded bg-[#4e6c50] text-white whitespace-nowrap">搜索</van-button>
               <van-button @click="doRefreshWithdrawRecord()" icon="search" class=" w-1/3  whitespace-nowrap h-10 rounded bg-[#4e6c50] text-white">刷新</van-button>
               <van-button  @click="doReset()" icon="replay"  class=" w-1/3  whitespace-nowrap h-10 rounded bg-[#4e6c50] text-white">重置</van-button>
            </div>
            <div class="py-2">
                <TimeSelect 
                ref="datePick"
                :show-active="showActiveBtn"
                @dateChange="dateChange"
                @dateChangeShowActiveBtn="dateChangeShowActiveBtn"
                > </TimeSelect>
       </div>



     <div class="relative overflow-x-auto shadow-md sm:rounded-lg ">
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 ">
            <tr>
                <!-- <th  scope="col" class="px-6 py-3 whitespace-nowrap">
                  详细
                </th> -->

                <th v-if="$Global.gxLength <= 4" scope="col" class="px-6 py-3 whitespace-nowrap">
                  操作
                </th>
                <th scope="col" class="px-6 py-3 whitespace-nowrap">
                  提现金额
                </th>
                <th scope="col" class="px-6 py-3 whitespace-nowrap">
                  提现账号
                </th>
                <th scope="col" class="px-6 py-3 whitespace-nowrap">
                  提现状态
                </th>
                <th scope="col" class="px-6 py-3 whitespace-nowrap">
                  昵称
                </th>
                <th scope="col" class="px-6 py-3 whitespace-nowrap">
                  账号等级
                </th>

                <th scope="col" class="px-6 py-3 whitespace-nowrap">
                  账号关系
                </th>
                <th scope="col" class="px-6 py-3 whitespace-nowrap">
                  操作前余额
                </th>
                <th scope="col" class="px-6 py-3 whitespace-nowrap">
                  操作后余额
                </th>
                <th scope="col" class="px-6 py-3 whitespace-nowrap">
                  开户姓名
                </th>
                <th scope="col" class="px-6 py-3 whitespace-nowrap">
                  银行名称
                </th>
                <th scope="col" class="px-6 py-3 whitespace-nowrap">
                  银行卡号
                </th>
                <th scope="col" class="px-6 py-3 whitespace-nowrap">
                  申请时间
                </th>
                <th scope="col" class="px-6 py-3 whitespace-nowrap">
                  审核通过时间
                </th>
                <th scope="col" class="px-6 py-3 whitespace-nowrap">
                  订单号
                </th>
                <!-- <th scope="col" class="px-6 py-3 whitespace-nowrap">
                  备注
                </th> -->


            </tr>
        </thead>
        <tbody>
            <tr v-for="(row) in withdrawRecord.tableData" :key="row.Id" class=" border-b border-slate-600   bg-gray-800 ">
                <td v-if="$Global.gxLength <= 4" scope="row" class="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                   <div class="flex items-center">
                    <van-button type="primary" size="mini" :disabled="row.status !== 0"   @click="accept(row)" >通过</van-button>
                    <van-button type="info" size="mini"  :disabled="row.status !== 0" @click="reject(row)">打回</van-button>
                    <van-button type="danger" size="mini"  :disabled="row.status !== 0" @click="delRecrod(row)" >删除(不退不加)</van-button>
                   </div>
                </td>
                <td scope="row" class="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {{ row.amount }}
                </td>
                <td scope="row" class="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {{row.username}}
                </td>

                <td class="px-6 py-2 whitespace-nowrap">
                 <div v-if="row.status == 0">待审核</div>
                 <div v-else-if="row.status === 1" style="color: #E91E63">通过</div>
                 <div v-else-if="row.status === 3" style="color: #039BE5">撤销</div>
                 <div v-else-if="row.status === 4" style="color: #039BE5">退钱</div>
                </td>

                <td scope="row" class="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {{row.nickname}}
                </td>

                <td class="px-6 py-2 whitespace-nowrap">
                 <div v-if="row.level === 2 || row.level === 1" style="color: #039BE5">代理</div>
                 <div v-else style="color: #E91E63">会员</div>
                </td>

                <td scope="row" class="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {{row.gx}}
                </td>
                <td scope="row" class="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {{row.before_amount}}
                </td>
                <td scope="row" class="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {{row.after_amount}}
                </td>
                <td scope="row" class="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {{row.card_owner_name}}
                </td>
                <td scope="row" class="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {{row.bank_card_name}}
                </td>
                <td scope="row" class="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {{row.bank_card_id}}
                </td>
                <td scope="row" class="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {{formatDate(row.created_at)}}
                </td>
                <td scope="row" class="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {{formatDate(row.recieve_time)}}
                </td>
                <td scope="row" class="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {{row.order_no}}
                </td>
                <!-- <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {{row.memo}}
                </td> -->
            </tr>
        </tbody>
    </table>
     </div>
    <section class="w-full py-2 relative">
        <van-pagination v-model="currentPage" mode="simple" :total-items="withdrawRecord.totalItemsNum || 0" :items-per-page="pageSize" @change="pagechange" />
     </section>
    </section>
  
    <van-popup  v-model="openFormDialog" closeable :lock-scroll="false"
      position="bottom"
      :style="{ height: '40%' }">
        <div class="px-3 py-10 w-full relative">
            <span class="font-bold text-lg">备注</span>
            <form @click.prevent class="w-full rounded-lg flex flex-col justify-center items-center ">

            <div @click="select_startTime_Dialog = true" class="flex items-center w-full relative h-10 rounded-md bg-[#dddddd] px-10 mt-3">
                起始日 - {{ startTime }}
            </div>
            <div @click="select_endTime_Dialog = true" class="flex items-center w-full relative h-10 rounded-md bg-[#dddddd] px-10 mt-3">
                至 - {{ endTime }}
            </div>
            <div class="flex items-center w-full bg-[#dddddd] relative h-10 rounded-md  px-5 mt-3">
                    <div
                    class="border-none w-full h-full text-base flex justify-center items-center relative"
                    >
                    <input
                        v-model.trim="name"
                        type="text" autocomplete="off"
                        maxlength="40"
                        placeholder="请输入备注"
                        class="input-name text-[#524d4d] bg-transparent placeholder:tracking-wider px-3 border-none outline-none focus:outline-none focus:border-none w-full h-full"
                    />
                    </div>
             </div>

             <div class="flex items-center w-full relative h-10 rounded-md bg-[#dddddd]   mt-3  ">
                <van-dropdown-menu class="w-full" direction="up" >
                <van-dropdown-item v-model="optType" :options="options"   />
                </van-dropdown-menu>
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
              @click="search_Find()"
            >
            确认
            </van-button>
          </div>
        </form>
        </div>
    </van-popup>
  
    <van-popup  v-model="dialogVisible" closeable :lock-scroll="false"
      position="bottom"
      :style="{ height: '40%' }">
        <div class="px-3 py-10 w-full relative">
            <span class="font-bold text-lg">备注</span>
            <form @click.prevent class="w-full rounded-lg flex flex-col justify-center items-center ">

            <div class="flex items-center w-full bg-[#dddddd] relative  rounded-md py-3 px-5 mt-3">
              <span>{{ `您确认要${showText}该订单申请吗？\n
                  账号：${rowData.username} 提现金额：${rowData.amount}` }}</span>
             </div>
            <div class="flex items-center w-full bg-[#dddddd] relative h-20 rounded-md  px-5 mt-3">
                    <div
                    class="border-none w-full h-full text-base flex justify-center items-center relative"
                    >
                    <input
                        v-model.trim="memeo"
                        type="textarea" autocomplete="off"
                        maxlength="40"
                        placeholder="请输入备注"
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
              @click="confirmDo()"
            >
            确认
            </van-button>
          </div>
        </form>
        </div>
    </van-popup>


    <van-popup  v-model="select_startTime_Dialog" 
      position="bottom"
      :style="{ height: '50%' }">
      <van-datetime-picker
                v-model="startTime" @confirm="start_onConfirm" @cancel="onCancel"
                type="date"
                title="Choose Date"
                :min-date="minDate"
                :max-date="maxDate"
                />
      </van-popup>
    <van-popup  v-model="select_endTime_Dialog" 
      position="bottom"
      :style="{ height: '50%' }">
      <van-datetime-picker
                v-model="endTime" @confirm="end_onConfirm" @cancel="onCancel"
                type="date"
                title="Choose Date"
                :min-date="minDate"
                :max-date="maxDate"
                />
      </van-popup>



    </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import moment from 'moment'
import { getWithdrawTodoApi, getWithdrawOrderListApi, AcceptWithdrawOrderApi, DeleteWithdrawOrderApi, RejectWithdrawOrderApi } from '@/api/ht'
import TimeSelect from '@/components/TimeSelectComponent'
import { debounce } from '@/utils/index'
import { UPDOWN } from '@/utils/const'
import ws2 from '@/api/ws2'

export default {
    components: {
        TimeSelect,
  },
  data() {
    return {
      select_startTime_Dialog:false,
      select_endTime_Dialog:false,
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(),
      startTime: new Date(2023, 6, 10, 0, 0, 0),
      endTime: new Date(2023, 6, 10, 23, 59, 59),
      memo: '',
      name: '',
      memeo: '',
      rely_account: '',
      optioner: '',
      optType: 'all',
      pageSize: 20,
      currentPage: 1,
      loading: false,
      dialogVisible: false,
      showText: '',
      rowData: {},
      doType: '',
      options: [
        { value: 'all', text: '全部' },
        { value: 0, text: '待审' },
        { value: 1, text: '通过' },
        { value: 4, text: '打回' }
      ],
      showTable: {
        ip: true
      },
      tableKey: 0,
      form: {
        account: ''
      },
      showActiveBtn: true,
      // eslint-disable-next-line
      eData: {},
      openFormDialog:false
    }
  },
  computed: {
    ...mapState({
      withdrawRecord: state => state.ht.withdrawRecordForm,
      isSub: state => state.user.isSubAccount,
      subInfo: state => state.user.subInfo,
      info: state => state.user.info
    }),
    ...mapGetters(['device', 'token'])
  },
  methods:{
    onClickLeft() {
      this.$router.push('/recordsPage/bet-records')
    },
    formatDate(date) {
      if (!date) return ''
      return moment(date).format('YYYY-MM-DD HH:mm:ss')
    },
    start_onConfirm(){
       // var timeValue = new Date(moment().startOf('day').format('YYYY-MM-DD HH:mm:ss'))
       var timeValue = moment(new Date(this.startTime)).startOf('day').format('YYYY-MM-DD HH:mm:ss')
      console.log(timeValue);
      this.startTime = timeValue;
      this.select_startTime_Dialog = false
    },
    end_onConfirm(){
       // var timeValue = this.formatDate(new Date(this.endTime), 'YY-MM-DD hh:mm:ss');
       var timeValue = moment(new Date(this.endTime)).endOf('day').format('YYYY-MM-DD HH:mm:ss')
      console.log(timeValue);
      this.endTime = timeValue;
      this.select_endTime_Dialog = false
    },
     onCancel() {
        this.select_startTime_Dialog = false
        this.select_endTime_Dialog = false
  },
    openFind_Dialog(){
      this.openFormDialog = true
    },
    search_Find(){
      this.openFormDialog = false
      this.doFindWithdrawRecord()
    },
    dateChange(date) {
      if (date) {
        this.startTime = date[0]
        this.endTime = date[1]
      }
      this.doFindWithdrawRecord()
    },
    transType(type) {
      if (type) {
        return UPDOWN[type] || ''
      }
      return ''
    },
    datePick(d) {
      this.$nextTick(() => {
        this.$refs.datePick.doSelectDate(d)
      })
    },
    dateChangeShowActiveBtn() {
      this.showActiveBtn = true
    },
    genDateTime() {
      this.startTime = moment().startOf('day').format('YYYY-MM-DD HH:mm:ss')
      this.endTime = moment().endOf('day').format('YYYY-MM-DD HH:mm:ss')
    },

    handleClose() {
      this.dialogVisible = false
      this.memeo = ''
      this.rowData = {}
    },
 
    doFindWithdrawRecord: debounce(function() {
     
      this.currentPage = 1
      this.doRefreshWithdrawRecord()
      
    }, 500, true),
    doRefreshWithdrawRecord: debounce(function() {
      this.reqt({
        opt_name: this.$Global.optioner.UserName,
        Id: this.$Global.optioner.Id,
        username: this.name.trim(),
        type: this.optType,
        startTime: this.startTime,
        endTime: this.endTime,
        pageSize: this.pageSize,
        currentPage: this.currentPage
      })
    }, 500, true),
    doReset: debounce(function() {
      this.memo = ''
      this.name = ''
      this.optioner = ''
      this.rely_account = ''
      this.pageSize = 20
      this.currentPage = 1
      this.datePick(1)
    }, 500, true),

    accept(row) {
      this.showText = '通过'
      this.doType = 'accept'
      this.rowData = row
      this.dialogVisible = true
    },

    reject(row) {
      this.showText = '拒绝'
      this.doType = 'reject'
      this.rowData = row
      this.dialogVisible = true
    },

    delRecrod(row) {
      this.showText = '删除(多出来的提现记录**不退钱，不加分**)'
      this.doType = 'delete'
      this.rowData = row
      this.dialogVisible = true
    },

    confirmDo() {
      if (this.doType === 'accept') {
        if (this.rowData.order_no === null || this.rowData.order_no === undefined) {
          return
        }
        const sendStr = {
          router: 'acceptWithdrawRecord',
          JsonData: {
          order_no: this.rowData.order_no,
          userId: this.rowData.user_id,
          memo: this.memeo,
          opt_id: this.$Global.optioner.Id,
            opt_name: this.$Global.optioner.UserName,
            proxyname: this.isSub ? this.subInfo.name : ''
          }
        }
        this.$pomelo.sendcb(sendStr, res => {
          // console.log('check order state ', res)
          if (res.result === 'ok') {
            ththis.$notify({type:'success',message:'操作成功',duration: 1500,})
            this.dialogVisible = false
            this.doFindWithdrawRecord()
            this.getWithdrawToDo()
            return
          }
          this.$notify({type:'danger',message:res.result,duration: 1500,})
        })
      }

      if (this.doType === 'reject') {
        if (this.rowData.order_no === null || this.rowData.order_no === undefined) return
        const sendStr = {
          router: 'rejectWithdrawRecord',
          JsonData: {
            order_no: this.rowData.order_no,
            userId: this.rowData.user_id,
            Id: this.$Global.optioner.Id,
            opt_name: this.$Global.optioner.UserName,
            memo: this.memeo.trim(),
            proxyname: this.isSub ? this.subInfo.name : ''
          }
        }
        this.$pomelo.sendcb(sendStr, res => {
          // console.log('reject state ', res)
          if (res.result === 'ok') {
            this.$notify({type:'success',message:'操作成功',duration: 1500,})
            this.dialogVisible = false
            this.doFindWithdrawRecord()
            this.getWithdrawToDo()
            return
          }
          this.$notify({type:'danger',message:'操作失败',duration: 1500,})
        })
      }
      if (this.doType === 'delete') {
        if (this.rowData.order_no === null || this.rowData.order_no === undefined) return
        const sendStr = {
          router: 'deleteWithdrawRecord',
          JsonData: {
            order_no: this.rowData.order_no,
            userId: this.rowData.user_id,
            Id: this.$Global.optioner.Id,
            opt_name: this.$Global.optioner.UserName,
            memo: this.memeo.trim(),
            proxyname: this.isSub ? this.subInfo.name : ''
          }
        }
        this.$pomelo.sendcb(sendStr, res => {
          // console.log('reject state ', res)
          if (res.result === 'ok') {
            this.$notify({type:'success',message:'操作成功',duration: 1500,})
            this.dialogVisible = false
            this.doFindWithdrawRecord()
            this.getWithdrawToDo()
            return
          }
          this.$notify({type:'danger',message:'操作失败',duration: 1500,})
        })
      }
    },

    getWithdrawToDo() {
      const sendStr = {
        router: 'GetWithdrawToDo',
        JsonData: {
          opt_id: this.$Global.optioner.Id,
          token: this.token
        }
      }

      this.$pomelo.sendcb(sendStr, res => {
        // console.log('res ', res)
        if (res?.JsonData.result === 'ok') {
          this.$store.commit('ht/setWithdrawToDoCount', res?.JsonData.count)
        }
      })
    },

    pagechange(page){
     console.log(page)
     this.currentPage = page
     this.reqt({
      opt_name: this.$Global.optioner.UserName,
        Id: this.$Global.optioner.Id,
        username: this.name.trim(),
        type: this.optType,
        startTime: this.startTime,
        endTime: this.endTime,
        pageSize: this.pageSize,
        currentPage: this.currentPage
      })
    },
    reqt(data) {
      const sendStr = {
        router: 'getWithdrawRecord',
        JsonData: data
      }
      this.loading = true
      this.$store.state.ht.withdrawRecordForm.state = 0
      this.$toast.loading({
            message: '请稍后...',
            forbidClick: true,
            duration: 1000,
        })
      // console.log('req withdraw ', sendStr)
      this.$pomelo.sendcb(sendStr, res => {
        this.$store.state.ht.withdrawRecordForm.state = 1
        this.loading = false
         console.log('getWithdraw Record ', res)
        if (res.JsonData && res.JsonData.length > 0) {
          for (let i = 0; i < res.JsonData.length; i++) {
            res.JsonData[i]['gx'] = ws2.mapAgentName(res.JsonData[i]?.gx)
          }

          this.$store.commit('ht/setWithdrawRecord', { tableData: res.JsonData, totalItemsNum: res.totalItem })
        } else {
          this.$store.commit('ht/setWithdrawRecord', { tableData: [], totalItemsNum: 0 })
        }
      })
    },

  },
  created() {
    this.genDateTime()
    // 取到路由带过来的参数
    var routerParams = this.$route.params
    if (routerParams.name !== undefined) {
      this.name = routerParams.name
      this.datePick(1)
    } else if (routerParams.opt_name !== undefined) {
      this.optioner = routerParams.opt_name
      this.datePick(1)
    }
    // else {
    //   this.datePick(1)
    // }
  },
}
</script>