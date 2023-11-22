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
               <van-button @click="doRefreshAccountLog()" icon="search" class=" w-1/3  whitespace-nowrap h-10 rounded bg-[#4e6c50] text-white">刷新</van-button>
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

                <th  scope="col" class="px-6 py-3 whitespace-nowrap">
                  详细
                </th>
                <th  scope="col" class="px-6 py-3 whitespace-nowrap">
                  操作类型
                </th>
                <th  scope="col" class="px-6 py-3 whitespace-nowrap">
                  账号
                </th>
                <th  scope="col" class="px-6 py-3 whitespace-nowrap">
                  昵称
                </th>
                <th  scope="col" class="px-6 py-3 whitespace-nowrap">
                  账号类型
                </th>
                <th  scope="col" class="px-6 py-3 whitespace-nowrap">
                  所属代理
                </th>
                <th  scope="col" class="px-6 py-3 whitespace-nowrap">
                  交易时间
                </th>
                <th  scope="col" class="px-6 py-3 whitespace-nowrap">
                  交易金额
                </th>
                <th  scope="col" class="px-6 py-3 whitespace-nowrap">
                  交易前金额
                </th>
                <th  scope="col" class="px-6 py-3 whitespace-nowrap">
                  交易后金额
                </th>
                <th  scope="col" class="px-6 py-3 whitespace-nowrap">
                  执行账号
                </th>
                <th  scope="col" class="px-6 py-3 whitespace-nowrap">
                  IP
                </th>
                <!-- <th  scope="col" class="px-6 py-3 whitespace-nowrap">
                  备注
                </th> -->
            </tr>
        </thead>
        <tbody>
            <tr v-for="(row) in waterMoneyRecord.tableData" :key="row.Id" class=" border-b border-slate-600   bg-gray-800 ">
                <td scope="row" class="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                   <div class="flex items-center">
                    <van-button type="primary" size="mini"   @click="getRelaData(row)" >详细</van-button>
                   </div>
                </td>
                <td scope="row" class="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {{ transType(row.type) }}
                </td>
                <td scope="row" class="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {{row.name}}
                </td>
                <td scope="row" class="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {{row.nickname}}
                </td>

                <td class="px-6 py-2 whitespace-nowrap">
                 <div v-if="row.level === 2 || row.level === 1" style="color: #039BE5">代理</div>
                 <div v-else-if="row.level === 4" style="color: #E91E63">子账号</div>
                 <div v-else style="color: #4CAF50">会员</div>
                </td>

                <td scope="row" class="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {{row.reference_name}}
                </td>
                <td scope="row" class="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {{ formatDate(row.stime) }}
                </td>

                <td class="px-6 py-2 whitespace-nowrap">
                  <div v-if="row.amount >= 0" style="color: #039BE5">{{ fiexeTwo(row.amount) }}</div>
                  <div v-else style="color: #E91E63">{{ fiexeTwo(row.amount) | toThousandFilter }}</div>
                </td>

                <td scope="row" class="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {{ fiexeTwo(row.before_amount) | toThousandFilter }}
                </td>
                <td scope="row" class="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {{ fiexeTwo(row.after_amount) | toThousandFilter }}
                </td>
                <td scope="row" class="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {{ row.operator }}
                </td>
                <td scope="row" class="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {{ row.ip }}
                </td>
                <!-- <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {{ row.memo }}
                </td> -->


               

            </tr>



        </tbody>
    </table>
     </div>
    <section class="w-full py-2 relative">
        <van-pagination v-model="currentPage" mode="simple" :total-items="waterMoneyRecord.count || 0" :items-per-page="pageSize" @change="pagechange" />
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

      <RelaDialog ref="relaRef" :rela-data="relaData" />


    </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import moment from 'moment'
import TimeSelect from '@/components/TimeSelectComponent'
import { debounce } from '@/utils/index'
import { UPDOWN } from '@/utils/const'
import RelaDialog from './relatable.vue'
import { YE } from '@/utils/const'

export default {
    components: {
        TimeSelect,
        RelaDialog
  },
  data() {
    return {
      select_startTime_Dialog:false,
      select_endTime_Dialog:false,
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(),
      startTime: new Date(2023, 6, 10, 0, 0, 0),
      endTime: new Date(2023, 6, 10, 23, 59, 59),
      name: '',
      optioner: '',
      loading: false,
      showTable: {
        ip: true
      },
      pageSize: 20,
      currentPage: 1,
      relaData: [],
      optType: 'all',
      options: [
        { value: 'all', text: '全部' },
        { value: 1, text: '上分' },
        { value: 2, text: '下分' },
        { value: 3, text: '下注' },
        { value: 4, text: '赔彩' },
        { value: 5, text: '结算' },
        { value: 6, text: '在线充值' },
        { value: 7, text: '在线提现' },
        { value: 8, text: '配上' },
        { value: 9, text: '配下' },
        { value: 10, text: '账号清零' },
        { value: 11, text: '提现打回' },
        // { value: 12, text: '洗码清零' },
        { value: 13, text: '系统结算' }
      ],
      tableKey: 0,
      form: {
        nickname: ''
      },
      showActiveBtn: true,
      // eslint-disable-next-line
      eData: {},
      uuidToColorMap: new Map(),
      openFormDialog:false
    }
  },
  computed: {
    ...mapState({ waterMoneyRecord: state => state.ht.waterMoneyRecordForm }),
    ...mapGetters(['device'])
  },
  methods:{
    onClickLeft() {
      this.$router.push('/recordsPage/bet-records')
    },
    formatDate(date) {
      if (!date) return ''
      return moment(date).format('YYYY-MM-DD HH:mm:ss')
    },
    fiexeTwo(num) {
      if (num) return Number((num))?.toFixed(0)
      return num
    },
    btKeyUp(e) {
      e.target.value = e.target.value.replace(/[`~!#$%^&*()\-+=<>?:'{}|,.\/;'\\[\]·~！#￥%……&*（）\-+={}|《》？：“”【】、；‘’，。、]/g, '')
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
      this.doFindLog()
    },
    dateChange(date) {
      if (date) {
        this.startTime = date[0]
        this.endTime = date[1]
      }
      this.doFindLog()
    },
    datePick(d) {
      this.$nextTick(() => {
        this.$refs.datePick.doSelectDate(d)
      })
    },
    dateChangeShowActiveBtn() {
      this.showActiveBtn = true
    },
    transType(type) {
      if (type) {
        return YE[type] || ''
      }
      return ''
    },
    genDateTime() {
      this.startTime = moment().startOf('day').format('YYYY-MM-DD HH:mm:ss')
      this.endTime = moment().endOf('day').format('YYYY-MM-DD HH:mm:ss')
    },

    getRelaData(row) {
      console.log(row)
      if (!row) return  this.$notify({type:'danger',message:'请选择记录',duration: 1500,})
      if (!row.uuid) return this.$notify({type:'danger',message:'无关联数据',duration: 1500,})
      const sendStr = {
        router: 'GetWaterMoneyByID',
        JsonData: {
          Id: this.$Global.optioner.Id,
          startTime: this.startDate,
          uuid: row.uuid
        }
      }
      this.loading = true
      this.$pomelo.sendcb(sendStr, res => {
        this.loading = false
        // console.log('GetWaterMoneyByID res ', res)
        if (res?.count > 0 && res?.JsonData?.length > 0) {
          this.relaData = res?.JsonData
          this.$nextTick(() => {
            this.$refs.relaRef.dialogFormVisible = true
          })
        }
      })
    },
 
    doFindLog: debounce(function() {
     
      this.currentPage = 1
      this.doRefreshAccountLog()
      
    }, 500, true),
    doRefreshAccountLog: debounce(function() {
      this.reqt({
        opt_name: this.$Global.optioner.UserName,
        Id: this.$Global.optioner.Id,
        type: this.optType,
        name: this.name.trim(),
        startTime: this.startTime,
        endTime: this.endTime,
        pageSize: this.pageSize,
        currentPage: this.currentPage
      })
    }, 500, true),
    doReset: debounce(function() {
      this.name = ''
      this.optioner = ''
      this.reqt({
        opt_name: this.$Global.optioner.UserName,
        Id: this.$Global.optioner.Id,
        type: this.optType,
        name: this.name.trim(),
        startTime: this.startTime,
        endTime: this.endTime,
        pageSize: this.pageSize,
        currentPage: this.currentPage
      })
    }, 500, true),


    pagechange(page){
     console.log(page)
     this.currentPage = page
     this.doFindLog()
    },
    reqt(data) {
      // if (this.name.trim() === '') return this.$message.warning('请输入账号')
      console.log(data,"reqt*********")
      const sendStr = {
        router: 'GetWaterMoneyLog',
        JsonData: data
      }
      this.loading = true
      this.$toast.loading({
            message: '请稍后...',
            forbidClick: true,
            duration: 1000,
        })
      // console.log('GetWaterMoneyLog ', sendStr) */}
      // this.$store.state.ht.waterMoneyRecordForm.state = 0
      this.$pomelo.sendcb(sendStr, res => {
        this.loading = false
        // console.log('water money res ', res)
        const data = {
          tableData: res?.JsonData || [],
          count: res?.count || 0,
          total_amount: res?.total_amount || 0
        }
        this.$store.commit('ht/setWaterMoney', data)
      })
    },

  },
  created() {
    this.genDateTime()
    var routerParams = this.$route.params
    if (routerParams.name !== undefined) {
      this.name = routerParams.name
      this.doFindLog()
    } else if (routerParams.opt_name !== undefined) {
      this.name = routerParams.opt_name
      this.doFindLog()
    }
    // else {
    //   this.doFindLog()
    // }
  },
}
</script>