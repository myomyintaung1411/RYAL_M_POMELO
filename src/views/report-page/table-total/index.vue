<template>
    <section class="w-full h-[calc(100vh_-_50px)]  relative  overflow-y-auto">
        <van-nav-bar fixed
        title="实时下注"
        left-arrow
        @click-left="onClickLeft"
        >
        </van-nav-bar>
        <section class="relative px-3 py-2  ">
            <div class="pt-12">
                <div class="flex items-center space-x-1 py-2">
                    <van-button icon="plus" @click="openFind_Dialog" class="w-1/2 h-10 rounded bg-[#4e6c50] text-white">搜索</van-button>
                    <van-button  icon="replay" @click="doRefresh()" class="w-1/2 h-10 rounded bg-[#4e6c50] text-white">重置</van-button>
                </div>
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
    <table v-if="tableTotalRecord.list" class="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 ">
            <tr>
                <th  scope="col" class="px-6 py-3 whitespace-nowrap">
                    所属代理
                </th>
                <th  scope="col" class="px-6 py-3 whitespace-nowrap">
                    账号
                </th>
                <th  scope="col" class="px-6 py-3 whitespace-nowrap">
                    洗码类型
                </th>
                <th  scope="col" class="px-6 py-3 whitespace-nowrap">
                    总赢
                </th>
                <th  scope="col" class="px-6 py-3 whitespace-nowrap">
                    洗码量单
                </th>
                <th  scope="col" class="px-6 py-3 whitespace-nowrap">
                    洗码量双
                </th>
                <th  scope="col" class="px-6 py-3 whitespace-nowrap">
                    洗码费
                </th>
                <th  scope="col" class="px-6 py-3 whitespace-nowrap">
                    投注口数
                </th>
                <th  scope="col" class="px-6 py-3 whitespace-nowrap">
                    赢额
                </th>
                <th  scope="col" class="px-6 py-3 whitespace-nowrap">
                    赢单数
                </th>
                <th  scope="col" class="px-6 py-3 whitespace-nowrap">
                    输额
                </th>
                <th  scope="col" class="px-6 py-3 whitespace-nowrap">
                    输单数
                </th>


            </tr>
        </thead>
        <tbody>
            <tr v-for="(row) in tableTotalRecord.list" :key="row.Id" class=" border-b border-slate-600   bg-gray-800 ">

                <td class="px-6 py-4 whitespace-nowrap">
                  {{ row.reference_name }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <span style="cursor: pointer;" @click="goBetRecord(row)">{{ row.userName }}</span>
                </td>

                <td class="px-6 py-4 whitespace-nowrap">
                  {{ row.xmType }}
                </td>

                <td class="px-6 py-4 whitespace-nowrap">
                    <div v-if="row.total_yl >= 0" class="text-blue-500">{{ fiexeTwo(row.total_yl) | toThousandFilter }}</div>
                   <div v-else class="text-red-500">{{ fiexeTwo(row.total_yl) }}</div>
                </td>

                <td class="px-6 py-4 whitespace-nowrap">
                    {{ row.total_xmls }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    {{ row.total_xmld }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    {{ row.totalxmf }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    {{ row.count }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    {{ row.positive_yl_sum }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    {{ row.positive_yl_count }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    {{ row.negative_yl_sum }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    {{ row.negative_yl_count }}
                </td>

            </tr>
        </tbody>
    </table>
     </div>

          <section class="w-full py-2 relative">
             <van-pagination v-model="pageNum" mode="simple" :total-items="tableTotalRecord.count || 0" :items-per-page="pageSize" @change="pagechange" />
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
                        v-model.trim="findname"
                        type="text" autocomplete="off"
                        maxlength="40"
                        placeholder="请输入账号"
                        class="input-name text-[#524d4d] bg-transparent placeholder:tracking-wider px-3 border-none outline-none focus:outline-none focus:border-none w-full h-full"
                    />
                    </div>
             </div>
             <div class="flex items-center w-full relative h-10 rounded-md bg-[#dddddd]   mt-3  ">
                <van-dropdown-menu class="w-full" direction="up" >
                <van-dropdown-item v-model="roomValue" :options="options"   />
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

    </section>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import moment from 'moment'
import { getTableWinLoseApi } from '@/api/ht'
import TimeSelect from '@/components/TimeSelectComponent'
import { debounce } from '@/utils/index'
import { UPDOWN } from '@/utils/const'

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
      findname: '',
      rType: '',
      roomId: '',
      roomValue: 'all-0',
      pageSize: 20,
      pageNum: 1,
      loading: false,
      options: [
        { value: 'all-0', text: '全部台桌' },
        { value: 'bjl-1', text: '百家乐 30' },
        { value: 'bjl-2', text: '百家乐 31' },
        { value: 'bjl-3', text: '百家乐 32' },
        { value: 'bjl-4', text: '百家乐 33' },
        { value: 'bjl-5', text: '百家乐 35' },
        { value: 'bjl-8', text: '百家乐 66' },
        { value: 'bjl-9', text: '百家乐 88' },
        { value: 'lh-1', text: '龙虎 36' },
        { value: 'lh-2', text: '龙虎 37' },
        { value: 'lh-3', text: '龙虎 38' },
        { value: 'lh-4', text: '龙虎 39' },
        { value: 'lh-5', text: '龙虎 26' },
        { value: 'lh-7', text: '龙虎 555' },
        { value: 'nn-1', text: '牛牛 16' },
        { value: 'nn-2', text: '牛牛 86' }
      ],
      form: {
        account: '',
        nickname: ''
      },
      rules: {
      },
      showActiveBtn: true,
      // eslint-disable-next-line
      eData: {},
      uuidToColorMap: new Map(),
      openFormDialog:false
    }
  },
  computed: {
    ...mapState({ tableTotalRecord: state => state.ht.tableTotalRecord }),
    ...mapGetters(['device', 'info'])
  },
  methods:{
    onClickLeft() {
      this.$router.push('/report-page/report')
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
      this.doTableTotalLog()
    },
    fiexeTwo(num) {
      if (num) return Number((parseFloat(num)).toFixed(0))
      return num
    },
    transType(type) {
      if (type) {
        return UPDOWN[type] || ''
      }
      return ''
    },
    goBetRecord(row) {
      this.$router.push({
        name: 'BetRecords',
        params: { name: row.userName, time: [this.startTime, this.endTime] }
      })
    },
    doRefresh() {
      this.pageNum = 1
      this.doTableTotalLog()
    },
    dateChange(date) {
      if (date) {
        this.startTime = date[0]
        this.endTime = date[1]
      }
      this.doTableTotalLog()
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

    doTableTotalLog: debounce(function() {
      this.pageNum = 1
      this.doRefreshAccountLog()
    }, 500, true),
    doRefreshAccountLog: debounce(function() {
      if (this.roomValue !== 'all-0') {
        this.roomId = parseInt(this.roomValue.split('-')[1])
        this.rType = this.roomValue.split('-')[0]
      } else {
        this.roomId = ''
        this.rType = ''
      }
      this.reqt({
        opt_name: this.info.username,
        opt_id: this.info.Id,
        findname: this.findname.trim(),
        rType: this.rType,
        roomId: this.roomId,
        startTime: this.startTime,
        endTime: this.endTime,
        pageSize: this.pageSize,
        pageNum: this.pageNum
      })
    }, 500, true),
    doReload: debounce(function() {
      this.name = ''
      this.optioner = ''
      this.pageSize = 20
      this.pageNum = 1
      this.datePick(1)
    }, 500, true),
    getParams() {
      this.pageNum = 1
      this.reqt({
        opt_name: this.info.username,
        opt_id: this.info.Id,
        findname: this.findname.trim(),
        rType: this.rType,
        roomId: this.roomId,
        startTime: this.startTime,
        endTime: this.endTime,
        pageSize: this.pageSize,
        pageNum: this.pageNum
      })
    },

    reqt(data) {
      const sendStr = data
      this.loading = true
      console.log(data)
      this.$toast.loading({
            message: '请稍后...',
            forbidClick: true,
            duration: 1000,
        })
      getTableWinLoseApi(sendStr).then(res => {
        this.loading = false
        console.log('GetTableWinLose res ', res)
        const data = {
          list: res?.data?.list || [],
          count: res?.data?.count || 0,
          total: res?.data?.total || 0
        }
        this.$store.commit('ht/setTableWinLose', data)
      })
    },

    pagechange(page){
     console.log(page)
     this.pageNum = page
     this.reqt({
        opt_name: this.info.username,
        opt_id: this.info.Id,
        findname: this.findname.trim(),
        rType: this.rType,
        roomId: this.roomId,
        startTime: this.startTime,
        endTime: this.endTime,
        pageSize: this.pageSize,
        pageNum: this.pageNum
      })
    },

  },
  activated() {
    // this.genDateTime()
    var routerParams = this.$route.params
    if (routerParams.name !== undefined) {
      this.name = routerParams.name
      this.datePick(1)
    } else if (routerParams.opt_name !== undefined) {
      this.name = routerParams.opt_name
      this.datePick(1)
    }
  },
  created() {
    this.genDateTime()
    // 取到路由带过来的参数
    var routerParams = this.$route.params
    if (routerParams.name !== undefined) {
      this.findname = routerParams.name
      this.datePick(1)
    } else {
      if (this.findname === '') this.findname = this.info.username
      this.datePick(1)
    }
  },
}
</script>