<template>
    <div class="w-full h-[calc(100vh_-_50px)]  relative  overflow-y-auto ">
        <van-nav-bar fixed
        title="登录记录"
        left-arrow
        @click-left="onClickLeft"
        >
        </van-nav-bar>
    <section class="relative px-3 py-2  ">
        <div class="flex items-center w-full justify-between space-x-2 pt-12">
               <van-button icon="plus" @click="openFind_Dialog"  class="w-1/3 h-10 rounded bg-[#4e6c50] text-white whitespace-nowrap">搜索</van-button>
               <van-button @click="doRefreshLoginLog()" icon="search" class=" w-1/3  whitespace-nowrap h-10 rounded bg-[#4e6c50] text-white">刷新</van-button>
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
                <th  scope="col" class="px-6 py-3 whitespace-nowrap">
                    账号
                </th>

                <th  scope="col" class="px-6 py-3 whitespace-nowrap">
                    级别
                </th>
                <th scope="col" class="px-6 py-3 whitespace-nowrap">
                    登录设备
                </th>
                <th scope="col" class="px-6 py-3 whitespace-nowrap">
                    登录时间
                </th>
                <th scope="col" class="px-6 py-3 whitespace-nowrap">
                    登录IP
                </th>
                <th scope="col" class="px-6 py-3 whitespace-nowrap">
                    备注
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(phonelist) in loginRecord.tableData" :key="phonelist.Id" class=" border-b border-slate-600   bg-gray-800 ">
                <td scope="row" class="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {{phonelist.name}}
                </td>

                <td class="px-6 py-2 whitespace-nowrap">
                 <div v-if="phonelist.level === 2 || phonelist.level === 1" style="color: #039BE5">代理</div>
                 <div v-else-if="phonelist.level === 4" style="color: #E91E63">子账号</div>
                 <div v-else style="color: #4CAF50">会员</div>
                </td>

                <td class="px-6 py-2 whitespace-nowrap">
                    <div v-if="phonelist.loginaddr === 'pc'">后台(电脑)</div>
                    <div v-else-if="phonelist.loginaddr === 'pcn'">后台(电脑)</div>
                    <div v-else-if="phonelist.loginaddr === 'ht-pc'">{{ '后台(电脑)' }}</div>
                    <div v-else-if="phonelist.loginaddr === 'ht-android'">{{ '后台(安卓)' }}</div>
                    <div v-else-if="phonelist.loginaddr === 'ht-ios'">{{ '后台(苹果)' }}</div>
                    <div v-else-if="phonelist.loginaddr === 'mobile'">后台(手机)</div>
                    <div v-else-if="phonelist.loginaddr === 'windows'">游戏(电脑)</div>
                    <div v-else-if="phonelist.loginaddr === 'android'">APP(安卓)</div>
                    <div v-else-if="phonelist.loginaddr === 'ios'">APP(苹果)</div>
                    <div v-else-if="phonelist.loginaddr === 'h5_android'">H5(安卓)</div>
                    <div v-else-if="phonelist.loginaddr === 'h5_ios'">H5(苹果)</div>
                    <div v-else>手机</div>
                </td>

                <td class="px-6 py-2 whitespace-nowrap">
                    {{ formatDate(phonelist.stime) }}
                </td>
                <td class="px-6 py-2 whitespace-nowrap">
                    {{phonelist.ip}}
                </td>
                <td class="px-6 py-2 whitespace-nowrap">
                    {{phonelist.memo}}
                </td>

            </tr>



        </tbody>
    </table>
     </div>
    <section class="w-full py-2 relative">
        <van-pagination v-model="currentPage" mode="simple" :total-items="loginRecord.totalItemsNum || 0" :items-per-page="pageSize" @change="pagechange" />
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

    </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import moment from 'moment'
import { loginRecordApi } from '@/api/ht'
import TimeSelect from '@/components/TimeSelectComponent'
import { debounce } from '@/utils/index'

export default {
  name: 'LoginRecords',
    components: {
        TimeSelect
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
      pageSize: 20,
      currentPage: 1,
      rotate: false,
      loading: false,
      showActiveBtn: true,
      eData: {},
      openFormDialog:false
    }
  },
  computed: {
    ...mapState({ loginRecord: state => state.ht.loginRecordForm }),
    ...mapGetters(['device','LG_ISLOADING'])
  },
  watch: {
    LG_ISLOADING: function(val) {
      if (val === 1) this.loading = false
    }
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
      this.doFindLoginLog()
    },
    dateChange(date) {
      if (date) {
        this.startTime = date[0]
        this.endTime = date[1]
      }
      this.getLoginLog()
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
 

    getLoginLog() {
      const data = {
        opt_name: this.$Global.optioner.UserName,
        Id: this.$Global.optioner.Id,
        currentPage: this.currentPage,
        pageSize: this.pageSize,
        startTime: this.startTime,
        endTime: this.endTime
      }
      if (this.name.trim() !== '') data['username'] = this.name.trim()
      const sendStr = {
        router: 'GetLoginLog',
        JsonData: data
      }
      this.loading = true
      this.$toast.loading({
            message: '请稍后...',
            forbidClick: true,
            duration: 1000,
        })
        this.$store.state.ht.loginRecordForm.state = 0
      // console.log('sendlogin ', sendStr)
      this.$pomelo.send(sendStr)
    },

    doFindLoginLog: debounce(function() {
     
      this.currentPage = 1
      this.doRefreshLoginLog()
      
    }, 500, true),
    doRefreshLoginLog: debounce(function() {
      this.getLoginLog()
    }, 500, true),
    doReset: debounce(function() {
      this.name = ''
      this.pageSize = 20
      this.currentPage = 1
      this.getLoginLog()
    }, 500, true),

    pagechange(page){
     console.log(page)
     this.currentPage = page
     this.getLoginLog()
    },

  },
  created() {
    this.genDateTime()
    var routerParams = this.$route.params
    if (routerParams.name !== undefined) {
      this.name = routerParams.name
      this.datePick(1)
    } else {
      this.datePick(1)
    }
  },
}
</script>