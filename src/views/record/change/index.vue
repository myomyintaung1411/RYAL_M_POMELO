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
                  操作人
                </th>

                <th  scope="col" class="px-6 py-3 whitespace-nowrap">
                  被操作人
                </th>
                <th scope="col" class="px-6 py-3 whitespace-nowrap">
                  昵称
                </th>
                <th scope="col" class="px-6 py-3 whitespace-nowrap">
                  级别
                </th>
                <th scope="col" class="px-6 py-3 whitespace-nowrap">
                  操作时间
                </th>
                <th scope="col" class="px-6 py-3 whitespace-nowrap">
                  操作IP
                </th>
                <th scope="col" class="px-6 py-3 whitespace-nowrap">
                  备注
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(phonelist) in accountChangeRecord.tableData" :key="phonelist.Id" class=" border-b border-slate-600   bg-gray-800 ">
                <td scope="row" class="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {{phonelist.optioner}}
                </td>
                <td scope="row" class="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {{phonelist.name}}
                </td>
                <td scope="row" class="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {{phonelist.nikename}}
                </td>

                <td class="px-6 py-2 whitespace-nowrap">
                 <div v-if="phonelist.level === 2 || phonelist.level === 1" style="color: #039BE5">代理</div>
                 <div v-else-if="phonelist.level === 4" style="color: #E91E63">子账号</div>
                 <div v-else style="color: #4CAF50">会员</div>
                </td>



                <td class="px-6 py-2 whitespace-nowrap">
                    {{ formatDate(phonelist.stime) }}
                </td>
                <td class="px-6 py-2 whitespace-nowrap">
                    {{phonelist.ip}}
                </td>
                <td class="px-6 py-2 whitespace-nowrap">
                  <span>
                {{
                  phonelist.memo.replace(/\修改下级/g, '修改下级')
                    .replace(/\将昵称由/g, '将昵称由')
                    .replace(/\改成/g, '改成')
                    .replace(/\将占成比由/g, '将占成比由')
                    .replace(/\'将洗码率单'由/g, '将洗码率单')
                    .replace(/\将'洗码率单'由/g, '洗码率单')
                    .replace(/\将'洗码率双'由/g, '洗码率双')
                    .replace(/\将'洗码类型'由'/g, '洗码类型')
                    .replace(/\修改了一键结算密码/g, '修改了一键结算密码')
                    .replace(/\修改了密码/g, '修改了密码')
                    .replace(/\将'余额'由/g, '余额')
                    .replace(/\双边'/g, '双边')
                    .replace(/\单边/g, '单边')
                }}
          </span>
                </td>

            </tr>



        </tbody>
    </table>
     </div>
    <section class="w-full py-2 relative">
        <van-pagination v-model="currentPage" mode="simple" :total-items="accountChangeRecord.totalItemsNum || 0" :items-per-page="pageSize" @change="pagechange" />
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
            <div class="flex items-center w-full bg-[#dddddd] relative h-10 rounded-md  px-5 mt-3">
                    <div
                    class="border-none w-full h-full text-base flex justify-center items-center relative"
                    >
                    <input
                        v-model.trim="optioner"
                        type="text" autocomplete="off"
                        maxlength="40"
                        placeholder="操作人"
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
import TimeSelect from '@/components/TimeSelectComponent'
import { debounce } from '@/utils/index'

export default {
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
      memo: '',
      name: '',
      optioner: '',
      pageSize: 20,
      currentPage: 1,
      loading: false,
      showActiveBtn: true,
      eData: {},
      openFormDialog:false,
    }
  },
  computed: {
    ...mapState({ accountChangeRecord: state => state.ht.accountChangeRecordForm }),
    ...mapGetters(['AC_ISLOADING', 'device'])
  },
  watch: {
    AC_ISLOADING: function(val) {
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
      this.getChangeLog()
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
 

    getChangeLog: debounce(function() {
      const data = {
        opt_name: this.$Global.optioner.UserName,
        Id: this.$Global.optioner.Id,
        startTime: this.startTime,
        endTime: this.endTime,
        currentPage: this.currentPage,
        pageSize: this.pageSize
      }
      if (this.optioner.trim() !== '') data['optioner'] = this.optioner.trim()
      if (this.name.trim() !== '') data['name'] = this.name.trim()
      const sendStr = {
        router: 'GetAccountChangeLog',
        JsonData: data
      }
      this.loading = true
      this.$toast.loading({
            message: '请稍后...',
            forbidClick: true,
            duration: 1000,
        })
        this.$store.state.ht.accountChangeRecordForm.state = 0
          this.$pomelo.send(sendStr)
    }, 500, true),

    doFindLoginLog: debounce(function() {
     
      this.currentPage = 1
      this.doRefreshLoginLog()
      
    }, 500, true),
    doRefreshLoginLog: debounce(function() {
      this.getChangeLog()
    }, 500, true),
    doReset: debounce(function() {
      this.name = ''
      this.optioner = ''
      this.memo = ''
      this.pageSize = 20
      this.currentPage = 1
      this.getChangeLog()
    }, 500, true),

    pagechange(page){
     console.log(page)
     this.currentPage = page
     this.getChangeLog()
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
    } else {
      this.datePick(1)
    }
  },
}
</script>