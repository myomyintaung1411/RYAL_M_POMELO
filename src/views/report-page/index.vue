<template>
    <div class="w-full h-full relative pb-10">
       <van-tabs v-model="activeName" @click="tabClick" sticky color="#4e6c50">
        <van-tab title="用户管理" name="a">
            <section class="w-full relative px-3 py-2">
                <div class="flex items-center w-full justify-between space-x-2">
               <van-button icon="plus" @click="opendoFind_Dialog"  class="w-1/3 h-10 rounded bg-[#4e6c50] text-white whitespace-nowrap">搜索</van-button>
               <van-button @click="doReFresh()" icon="search" class=" w-1/3  whitespace-nowrap h-10 rounded bg-[#4e6c50] text-white">刷新</van-button>
               <van-button  @click="doReset()" icon="replay"  class=" w-1/3  whitespace-nowrap h-10 rounded bg-[#4e6c50] text-white">重置</van-button>
            </div>
            <div class="py-2">
                <div v-if="isShowRelationship" class="flex items-center space-x-1">
                <span style="color: #E91E63; font-size: 12px;">目前所处</span>
                <van-button v-for="item in reportRecord.agents" :key="item" :value="item"  class="id-list bg-[#4e6c50] text-white" plain size="mini" @click="doClickAgent(item)">{{ item }} 》</van-button>
                </div>
                <div class="py-2">
                <TimeSelect 
                ref="datePick" :can-click="canClickDate"
                :show-active="showActiveBtn"
                @dateChange="dateChange"
                @dateChangeShowActiveBtn="dateChangeShowActiveBtn"
                > </TimeSelect>
              </div>
            </div>
            <div class="relative overflow-x-auto shadow-md sm:rounded-lg ">
        <table id="report1" class="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 ">
            <tr>
                <th  scope="col" class="px-6 py-3 whitespace-nowrap">
                    账号
                </th>
                <th  scope="col" class="px-6 py-3 whitespace-nowrap">
                    级别
                </th>
                <th  scope="col" class="px-6 py-3 whitespace-nowrap">
                    昵称
                </th>
                <th  scope="col" class="px-6 py-3 whitespace-nowrap">
                    总输赢金额
                </th>
                <th  scope="col" class="px-6 py-3 whitespace-nowrap">
                    占成
                </th>
                <th  scope="col" class="px-6 py-3 whitespace-nowrap">
                    配分
                </th>
                <th  scope="col" class="px-6 py-3 whitespace-nowrap">
                    洗码量
                </th>
                <th  scope="col" class="px-6 py-3 whitespace-nowrap">
                    洗码类型
                </th>
                <th  scope="col" class="px-6 py-3 whitespace-nowrap">
                    洗码佣金
                </th>
                <th  scope="col" class="px-6 py-3 whitespace-nowrap">
                    实际金额
                </th>
                <th  scope="col" class="px-6 py-3 whitespace-nowrap">
                    本级金额
                </th>
                <th  scope="col" class="px-6 py-3 whitespace-nowrap">
                    交上级金额
                </th>

            </tr>
        </thead>
            <tbody>
                <tr v-for="(row) in reportRecord.tableData1" :key="row.Id" class=" border-b border-slate-600   bg-gray-800 ">


                    <td class="px-6 py-4 whitespace-nowrap">
                        <van-button v-if="row.level == '会员'" class=" bg-transparent border-none outline-none" size="mini"  @click="cellClick(row.Id, row.name, 3)" >{{row.name}}</van-button>
                        <div v-else>{{ row.name }}</div>
                    </td>

                    <td class="px-6 py-4 whitespace-nowrap">
                        <div v-if="row.level !== '会员'" style="color: #039BE5">代理</div>
                        <div v-else style="color: #4CAF50">会员</div>
                    </td>

                    <td class="px-6 py-4 whitespace-nowrap">
                    <div @click="goToUserList(row.name)">{{row.nikename}}</div>
                    </td>

                    <td class="px-6 py-4 whitespace-nowrap">
                    <span @click="getReportDaily(row)">
                        <span v-show="row.totalWin<0">
                        <span color="red">{{ row.totalWin | toThousandFilter }}</span>
                        </span>
                        <span v-show="row.totalWin>=0" style="color: #2196F3; padding-right: 10px;">{{ row.totalWin | toThousandFilter }}</span>
                    </span>
                    </td>

                    <td class="px-6 py-4 whitespace-nowrap">
                    <div >{{ row.zc }} %</div>
                    </td>

                    <td class="px-6 py-4 whitespace-nowrap">
                        <div v-if="row.pf == 1" style="color: #009688">是</div>
                        <div v-if="row.pf == 0" >否</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        <div style="display: flex; padding: 0 6px;">
                            <div style="flex: 1; display: flex; justify-content: space-between;">
                            <span style="color: #FF9800">单</span>
                            <span>{{ row.xml.split('/')[0] | toThousandFilter }}</span>
                            </div>
                            <div style="flex: 1; display: flex; justify-content: space-between; margin-left: 10px;">
                            <span style="color: #2196F3">双</span>
                            <span>{{ row.xml.split('/')[1] | toThousandFilter }}</span>
                            </div>
                      </div>
                    </td>

                    <td class="px-6 py-4 whitespace-nowrap">
                        <div v-if="row.xmStype === '单边'" style="color: #009688" class="flex items-center space-x-1">
                            <span style="color: #FF9800">单:</span>
                            <span>{{ row.xmb.split('/')[0] }} %</span>
                        </div>
                        <div v-if="row.xmStype === '双边'" style="color: #009688" class="flex items-center space-x-1">
                            <span style="color: #FF9800">双:</span>
                            <span>{{ row.xmb.split('/')[1] }} %</span>
                        </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                    <div >{{ row.xmyj | toThousandFilter }}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        <div >
                        <span v-show="row.totalMoney<0">
                        <span color="red">{{ row.totalMoney | toThousandFilter }}</span>
                        </span>
                        <span v-show="row.totalMoney>=0" style="color: #2196F3">{{ row.totalMoney | toThousandFilter }}</span>
                    </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        <div style="padding-right: 10px;">
                        <span v-show="row.thisLevelMoney<0">
                        <span color="red">{{ row.thisLevelMoney | toThousandFilter }}</span>
                        </span>
                        <span v-show="row.thisLevelMoney>=0" style="color: #2196F3">{{ row.thisLevelMoney | toThousandFilter }}</span>
                    </div>
                    </td>

                    <td class="px-6 py-4 whitespace-nowrap">
                        <div v-if="row.companyMoney<0" style="color: red">{{row.companyMoney | toThousandFilter}}</div>
                        <div v-else style="color: #2196F3" >{{ row.companyMoney | toThousandFilter }}</div>
                    </td>

                </tr>
            </tbody>
        </table>
            </div>

     <div class="relative overflow-x-auto shadow-md sm:rounded-lg py-2 ">
        <table id="report2" class="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 ">
            <tr>
                <th  scope="col" class="px-6 py-3 whitespace-nowrap">
                    账号
                </th>
                <th  scope="col" class="px-6 py-3 whitespace-nowrap">
                    级别
                </th>
                <th  scope="col" class="px-6 py-3 whitespace-nowrap">
                    昵称
                </th>
                <th  scope="col" class="px-6 py-3 whitespace-nowrap">
                    总输赢金额
                </th>
                <th  scope="col" class="px-6 py-3 whitespace-nowrap">
                    占成
                </th>
                <th  scope="col" class="px-6 py-3 whitespace-nowrap">
                    配分
                </th>
                <th  scope="col" class="px-6 py-3 whitespace-nowrap">
                    洗码量
                </th>
                <th  scope="col" class="px-6 py-3 whitespace-nowrap">
                    洗码类型
                </th>
                <th  scope="col" class="px-6 py-3 whitespace-nowrap">
                    洗码佣金
                </th>
                <th  scope="col" class="px-6 py-3 whitespace-nowrap">
                    实际金额
                </th>
                <th  scope="col" class="px-6 py-3 whitespace-nowrap">
                    本级金额
                </th>
                <th  scope="col" class="px-6 py-3 whitespace-nowrap">
                    交上级金额
                </th>

            </tr>
        </thead>
            <tbody>
                <tr v-for="(row) in reportRecord.tableData2" :key="row.Id" class=" border-b border-slate-600   bg-gray-800 ">


                    <td class="px-6 py-2 whitespace-nowrap">
                        <span
                            v-if="row.name != '所有统计'"
                            size="mini"
                            type="text"
                            @click="cellClick(row.Id,row.name,2)"
                        >
                            <span color="blue" style="cursor: pointer;">{{ row.name }}</span>
                        </span>
                        <span v-if="row.name==='所有统计'">{{ row.name }}</span>
                    </td>

                    <td class="px-6 py-2 whitespace-nowrap">
                        <div v-if="row.name != '所有统计'" style="color: #039BE5">代理</div>
                    </td>

                    <td class="px-6 py-2 whitespace-nowrap">
                    <div @click="goToUserList(row.name)">{{row.nikename}}</div>
                    </td>

                    <td class="px-6 py-2 whitespace-nowrap">
                    <span @click="getReportDaily(row)">
                        <span v-show="row.totalWin<0">
                        <span color="red">{{ row.totalWin | toThousandFilter }}</span>
                        </span>
                        <span v-show="row.totalWin>=0" style="color: #2196F3; padding-right: 10px;">{{ row.totalWin | toThousandFilter }}</span>
                    </span>
                    </td>

                    <td class="px-6 py-2 whitespace-nowrap">
                    <div v-if="row.name != '所有统计'">{{ row.zc }} %</div>
                    </td>

                    <td class="px-6 py-2 whitespace-nowrap">
                        <div v-if="row.name != '所有统计'" class="">
                            <div v-if="row.pf == 1" style="color: #009688">是</div>
                           <div v-if="row.pf == 0" >否</div>
                        </div>
                    </td>
                    <td class="px-6 py-2 whitespace-nowrap">
                        <div style="display: flex; padding: 0 6px;">
                            <div style="flex: 1; display: flex; justify-content: space-between;">
                            <span style="color: #FF9800">单</span>
                            <span>{{ row.xml.split('/')[0] | toThousandFilter }}</span>
                            </div>
                            <div style="flex: 1; display: flex; justify-content: space-between; margin-left: 10px;">
                            <span style="color: #2196F3">双</span>
                            <span>{{ row.xml.split('/')[1] | toThousandFilter }}</span>
                            </div>
                      </div>
                    </td>

                    <td class="px-6 py-2 whitespace-nowrap">
                        <div v-if="row.name != '所有统计'" >
                            <div v-if="row.xmStype === '单边'" style="color: #009688" class="flex items-center space-x-1">
                            <span style="color: #FF9800">单:</span>
                            <span>{{ row.xmb.split('/')[0] }} %</span>
                        </div>
                        <div v-if="row.xmStype === '双边'" style="color: #009688" class="flex items-center space-x-1">
                            <span style="color: #FF9800">双:</span>
                            <span>{{ row.xmb.split('/')[1] }} %</span>
                        </div>
                        </div>
                    </td>
                    <td class="px-6 py-2 whitespace-nowrap">
                    <div >{{ row.xmyj | toThousandFilter }}</div>
                    </td>
                    <td class="px-6 py-2 whitespace-nowrap">
                        <div >
                        <span v-show="row.totalMoney<0">
                        <span color="red">{{ row.totalMoney | toThousandFilter }}</span>
                        </span>
                        <span v-show="row.totalMoney>=0" style="color: #2196F3">{{ row.totalMoney | toThousandFilter }}</span>
                    </div>
                    </td>
                    <td class="px-6 py-2 whitespace-nowrap">
                        <div style="padding-right: 10px;">
                        <span v-show="row.thisLevelMoney<0">
                        <span color="red">{{ row.thisLevelMoney | toThousandFilter }}</span>
                        </span>
                        <span v-show="row.thisLevelMoney>=0" style="color: #2196F3">{{ row.thisLevelMoney | toThousandFilter }}</span>
                    </div>
                    </td>

                    <td class="px-6 py-2 whitespace-nowrap">
                        <div v-if="row.companyMoney<0" style="color: red">{{row.companyMoney | toThousandFilter}}</div>
                        <div v-else style="color: #2196F3" >{{ row.companyMoney | toThousandFilter }}</div>
                    </td>
                </tr>
            </tbody>
           </table>
            </div>
     <div class="relative overflow-x-auto shadow-md sm:rounded-lg py-2 ">
        <table id="report3" class="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 ">
            <tr>
                <th  scope="col" class="px-6 py-3 whitespace-nowrap">
                    账号
                </th>
                <th  scope="col" class="px-6 py-3 whitespace-nowrap">
                    级别
                </th>
                <th  scope="col" class="px-6 py-3 whitespace-nowrap">
                    昵称
                </th>
                <th  scope="col" class="px-6 py-3 whitespace-nowrap">
                    总输赢金额
                </th>
                <th  scope="col" class="px-6 py-3 whitespace-nowrap">
                    洗码量
                </th>
                <th  scope="col" class="px-6 py-3 whitespace-nowrap">
                    洗码类型
                </th>
                <th  scope="col" class="px-6 py-3 whitespace-nowrap">
                    洗码佣金
                </th>
                <th  scope="col" class="px-6 py-3 whitespace-nowrap">
                    实际金额
                </th>
                <th  scope="col" class="px-6 py-3 whitespace-nowrap">
                    本级金额
                </th>
                <th  scope="col" class="px-6 py-3 whitespace-nowrap">
                    交上级金额
                </th>

            </tr>
        </thead>
            <tbody>
                <tr v-for="(row) in reportRecord.tableData3" :key="row.Id" class=" border-b border-slate-600   bg-gray-800 ">


                    <td class="px-6 py-2 whitespace-nowrap">
                        <span
                            v-if="row.name != '所有统计'"
                            size="mini"
                            type="text"
                            @click="cellClick(row.Id,row.name,3)"
                        >
                            <span  style="cursor: pointer;">{{ row.name }}</span>
                        </span>
                        <span v-if="row.name==='所有统计'">{{ row.name }}</span>
                    </td>

                    <td class="px-6 py-2 whitespace-nowrap">
                        <div v-if="row.name != '所有统计'" style="color: #2CAF50">会员</div>
                    </td>

                    <td class="px-6 py-2 whitespace-nowrap">
                    <div @click="goToUserList(row.name)">{{row.nikename}}</div>
                    </td>

                    <td class="px-6 py-2 whitespace-nowrap">
                    <span @click="getReportDaily(row)">
                        <span v-show="row.totalWin<0">
                        <span color="red">{{ row.totalWin | toThousandFilter }}</span>
                        </span>
                        <span v-show="row.totalWin>=0" style="color: #2196F3; padding-right: 10px;">{{ row.totalWin | toThousandFilter }}</span>
                    </span>
                    </td>

                    <td class="px-6 py-2 whitespace-nowrap">
                    <div v-if="row.name != '所有统计'">{{ row.zc }} %</div>
                    </td>

                    <td class="px-6 py-2 whitespace-nowrap">
                        <div v-if="row.name != '所有统计'" class="">
                            <div v-if="row.pf == 1" style="color: #009688">是</div>
                           <div v-if="row.pf == 0" >否</div>
                        </div>
                    </td>
                    <td class="px-6 py-2 whitespace-nowrap">
                        <div style="display: flex; padding: 0 6px;">
                            <div style="flex: 1; display: flex; justify-content: space-between;">
                            <span style="color: #FF9800">单</span>
                            <span>{{ row.xml.split('/')[0] | toThousandFilter }}</span>
                            </div>
                            <div style="flex: 1; display: flex; justify-content: space-between; margin-left: 10px;">
                            <span style="color: #2196F3">双</span>
                            <span>{{ row.xml.split('/')[1] | toThousandFilter }}</span>
                            </div>
                      </div>
                    </td>

                    <td class="px-6 py-2 whitespace-nowrap">
                        <div v-if="row.name != '所有统计'" >
                            <div v-if="row.xmStype === '单边'" style="color: #009688" class="flex items-center space-x-1">
                            <span style="color: #FF9800">单:</span>
                            <span>{{ row.xmb.split('/')[0] }} %</span>
                        </div>
                        <div v-if="row.xmStype === '双边'" style="color: #009688" class="flex items-center space-x-1">
                            <span style="color: #FF9800">双:</span>
                            <span>{{ row.xmb.split('/')[1] }} %</span>
                        </div>
                        </div>
                    </td>
                    <td class="px-6 py-2 whitespace-nowrap">
                    <div >{{ row.xmyj | toThousandFilter }}</div>
                    </td>
                    <td class="px-6 py-2 whitespace-nowrap">
                        <div >
                        <span v-show="row.totalMoney<0">
                        <span color="red">{{ row.totalMoney | toThousandFilter }}</span>
                        </span>
                        <span v-show="row.totalMoney>=0" style="color: #2196F3">{{ row.totalMoney | toThousandFilter }}</span>
                    </div>
                    </td>
                    <td class="px-6 py-2 whitespace-nowrap">
                        <div style="padding-right: 10px;">
                        <span v-show="row.thisLevelMoney<0">
                        <span color="red">{{ row.thisLevelMoney | toThousandFilter }}</span>
                        </span>
                        <span v-show="row.thisLevelMoney>=0" style="color: #2196F3">{{ row.thisLevelMoney | toThousandFilter }}</span>
                    </div>
                    </td>

                    <td class="px-6 py-2 whitespace-nowrap">
                        <div v-if="row.companyMoney<0" style="color: red">{{row.companyMoney | toThousandFilter}}</div>
                        <div v-else style="color: #2196F3" >{{ row.companyMoney | toThousandFilter }}</div>
                    </td>
                </tr>
            </tbody>
           </table>
    </div>

            </section>
        </van-tab>
        <!-- <van-tab title="余额统计" name="b"></van-tab>
        <van-tab title="输赢统计" name="c"></van-tab> -->
        <!-- <van-tab title="风控列表" name="c"></van-tab>
        <van-tab title="子账号列表" name="d"></van-tab> -->
       </van-tabs> 
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
                        v-model.trim="form.name"
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
      <DailyData ref="dailyRef" :daily-data="dailyData" />

    </div>
</template>

<script>
import moment from 'moment'
import { mapState, mapGetters } from 'vuex'
import TimeSelect from '@/components/TimeSelectComponent'
import DailyData from './daily-data.vue'

export default {
    components: {
        TimeSelect,
        DailyData
  },
  data() {
    return {
        openFormDialog:false,
      activeTab: 1,
      activeName:'a',
      select_startTime_Dialog:false,
      select_endTime_Dialog:false,
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(),
      startTime: new Date(2023, 6, 10, 0, 0, 0),
      endTime: new Date(2023, 6, 10, 23, 59, 59),
      gameTypeValue: '',
      currentPage1: 1,
      currentPage2: 1,
      pageSize: 10,
      loading: false,
      select_xm_dl: [],
      select_xm_hy: [],
      xm_ok: false,
      xm_pw_ok: false,
      sendXmStr: '',
      tableKey: 0,
      showRelationship: '隐藏',
      isShowRelationship: true,
      form: {
        name: '',
        Id: ''
      },
      reportDlgFrm: {
        pw: '',
        pwDigFrmVisible: false
      },
      isAbleToSend: true,
      showActiveBtn: true,
      canClickDate: true,
      // eslint-disable-next-line
      eData: {},
      dailyData: [],
      midHeight: 300,
      botHeight: 300
    };
  },
  computed: {
    ...mapState({ reportRecord: state => state.ht.reportForm,info: state => state.user.info, }),
    ...mapGetters(['RP_ISLOADING', 'device']),
  },
  watch: {
    RP_ISLOADING: function(val) {
      if (val === 1) this.loading = false
    }
  },
  methods:{
    tabClick(name,title){
         
        console.log("name "+title,name);
        switch (name) {
            case 'a':
                
                break;
            case 'b':
            this.$router.push('/report-page/balance')
                break;
            case 'c':
            this.$router.push('/report-page/table-summary')
                break;
        
            default:
                break;
        }
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

    opendoFind_Dialog(){
      this.openFormDialog = true
    },
    search_Find(){
      this.openFormDialog = false
      this.doFind()
    },
    doReFresh() {
      this.loading = false
      this.doFind()
    },
    doReset() {
      this.form.name = ''
      this.form.Id = ''
      this.datePick(1)
    },
    setHeight(tabel) {
      if (tabel === 1) {
        this.botHeight = 300
        this.midHeight = 300
      }
      if (tabel === 2) {
        this.botHeight = 50
        this.midHeight = 600
      }
      if (tabel === 3) {
        this.midHeight = 50
        this.botHeight = 600
      }
    },

    dateChange(date) {
      if (date) {
        this.startTime = date[0]
        this.endTime = date[1]
      }
      this.doFind()
    },
    datePick(d) {
      this.$nextTick(() => {
        this.$refs.datePick.doSelectDate(d)
      })
    },
    doClickAgent(name) {
      this.form.name = name
      // this.form.Id = ''
      this.sendStr('', name, 1, 1)
    },
    dateChangeShowActiveBtn() {
      this.showActiveBtn = true
    },
    genDateTime() {
      this.startTime = moment().startOf('day').format('YYYY-MM-DD HH:mm:ss')
      this.endTime = moment().endOf('day').format('YYYY-MM-DD HH:mm:ss')
    },

    getReportDaily(row) {
      const send_ = {
        router: "getReportDaily",
        JsonData: {
          Id: this.$Global.optioner.Id,
          startTime: this.startTime,
          endTime: this.endTime,
          name: row.name,
          isme: row.name === this.$Global.optioner.UserName ? 1 : 0
        }
      }
      this.$pomelo.sendcb(send_, res => {
        console.log('res ', res)
        if (res.msg === 'ok') {
          this.dailyData = []
          if (res.JsonData.length > 0) {
            this.dailyData = this.getReportTableDaily(res.JsonData)
          }
          this.$nextTick(() => {
            this.$refs.dailyRef.dialogFormVisible = true
          })
        }
      })
    },

    getReportTableDaily (tableData) {
      // console.log('table dat a', tableData)
      var table = []
      for (var i = 0; i < tableData.length; i++) {
        var obj = {}
        obj.Id = tableData[i].Id
        obj.userId = tableData[i].userId
        obj.name = tableData[i].name
        obj.xm_close = tableData[i].xm_close
        obj.stime = tableData[i].stime
        obj.level =
          tableData[i].level == 1
            ? '管理员'
            : tableData[i].level == '2'
            ? '代理'
            : '会员'
        obj.nikename = tableData[i].nicheng
        obj.betNum = tableData[i].tzcs
        obj.totalWin = Number((tableData[i].yl).toFixed(0))
        obj.pf = tableData[i].pf
        obj.zc = tableData[i].zc
        if (tableData[i].xml_s == null) tableData[i].xml_s = 0
        if (tableData[i].xml_d == null) tableData[i].xml_d = 0
        obj.xml = tableData[i].xml_s + '/' + tableData[i].xml_d
        obj.xmb = tableData[i].xmb_s + '/' + tableData[i].xmb_d
        obj.xmyj = tableData[i].xmType == 0 ? Number(((tableData[i].xml_d * tableData[i].xmb_d) / 100).toFixed(0)) : Number(((tableData[i].xml_s * tableData[i].xmb_s) / 100).toFixed(0))
        obj.xmStype = tableData[i].xmType == 0 ? '双边' : '单边'
        obj.totalMoney = Number((Number(tableData[i].yl) + Number(obj.xmyj)).toFixed(0))
        obj.thisLevelMoney = Number(((obj.totalMoney * obj.zc) / 100).toFixed(0))
        obj.companyMoney = Number((obj.totalMoney - obj.thisLevelMoney).toFixed(0))
        // 为导出excel做数据
        obj.e_pf = tableData[i].pf === 1 ? '是' : '否'
        obj.e_stime = this.$moment(tableData[i].stime).format('YYYY-MM-DD')
        obj.e_zc = `${tableData[i].zc}%`
        obj.e_xmls = Number(tableData[i].xml_s)
        obj.e_xmld = Number(tableData[i].xml_d)
        obj.e_xmb = tableData[i].xmType == 0 ? `双: ${tableData[i].xmb_d}%` : `单: ${tableData[i].xmb_s}%`
        table.push(obj)
      }
      table.reverse()
      return table
    },
    goToUserList(name) {
      this.$router.push({
        name: 'UsersListHJ',
        params: { name: name }
      })
    },

    btKeyUp(e) {
      e.target.value = e.target.value.replace(/[`~!#$%^&*()\-+=<>?:'{}|,.\/;'\\[\]·~！#￥%……&*（）\-+={}|《》？：“”【】、；‘’，。、]/g, '')
    },

    showRelation() {
      if (this.showRelationship === '隐藏') {
        this.showRelationship = '显示'
        this.isShowRelationship = false
      } else {
        this.showRelationship = '隐藏'
        this.isShowRelationship = true
      }
    },

    getPage() {
      var Id = this.form.Id
      var name = this.form.name.trim()
      if (Id === '' && name === '') {
        name = this.$Global.optioner.UserName
        Id = this.$Global.optioner.Id
      }
      this.sendStr(Id, name, this.currentPage1, this.currentPage2)
    },

    doFind() {
      var Id = this.form.Id
      var name = this.form.name.trim()
      if (Id === '' && name === '') {
        name = this.$Global.optioner.UserName
        Id = this.$Global.optioner.Id
      }
      this.sendStr(Id, name, 1, 1)
    },

    closeDia() {
      this.select_xm_dl = []
      this.select_xm_hy = []
      this.sendXmStr = ''
    },

    pagechange1(page){
     console.log(page)
     this.currentPage1 = page
     var Id = this.form.Id
      var name = this.form.name.trim()
      if (Id === '' && name === '') {
        name = this.$Global.optioner.UserName
        Id = this.$Global.optioner.Id
      }
      this.sendStr(Id, name, this.currentPage1, this.currentPage2)

    },
    pagechange2(page){
     console.log(page)
     this.currentPage2 = page
     var Id = this.form.Id
      var name = this.form.name.trim()
      if (Id === '' && name === '') {
        name = this.$Global.optioner.UserName
        Id = this.$Global.optioner.Id
      }
      this.sendStr(Id, name, this.currentPage1, this.currentPage2)

    },

    sendStr(Id, name, page1, page2) {
      if (this.isAbleToSend === false) return this.$notify({type:'danger',message:'查询中, 请稍后...',duration: 1500,})
      const sendStr = {
        router: 'GetReport',
        JsonData: {
          Id: Id,
          opt_id: this.$Global.optioner.Id,
          name: name,
          startTime: this.startTime,
          endTime: this.endTime,
        }
      }
      this.isAbleToSend = false
      this.canClickDate = false
      this.loading = true
      this.$toast.loading({
            message: '请稍后...',
            forbidClick: true,
            duration: 1000,
        })
      this.$store.commit('ht/setReportForm', { state: 0 })
      this.$store.commit('ht/setReportForm', { state: 0 })
      this.$pomelo.sendcb(sendStr, res => {
        // console.log('report res ', res)
        this.isAbleToSend = true
        this.canClickDate = true
        this.loading = false
        var data = res.JsonData
        var table = {
          tableData1: [],
          tableData2: [],
          tableData3: [],
          tableData4: [],
          tableData5: [],
          agents: [],
          state: 1,
          totalItemsNum1: 0,
          totalItemsNum2: 0
        }
        table.tableData1 = this.getReportTable(data.table1)
        table.tableData2 = this.getReportTable(data.table2)
        table.tableData3 = this.getReportTable(data.table3)
        table.tableData4 = data.table4
        table.tableData5 = data.table5
        // table.tableData2 = this.summeryReportTable(table.tableData2, data.table4)
        // table.tableData3 = this.summeryReportTable(table.tableData3, data.table5)
        table.totalItemsNum1 = data.table4.length > 0 ? data.table4[0].count : 0
        table.totalItemsNum2 = data.table5.length > 0 ? data.table5[0].count : 0
        table.agents = data.agents
        this.$store.commit('ht/setReportForm', table)
      })
    },

    getReportTable (tableData) {
      // console.log('table dat a', tableData)
      var table = []
      for (var i = 0; i < tableData.length; i++) {
        var obj = {}
        obj.Id = tableData[i].Id
        obj.userId = tableData[i].userId
        obj.name = tableData[i].name
        obj.xm_close = tableData[i].xm_close
        obj.stime = tableData[i].stime
        obj.level =
          tableData[i].level == 1
            ? '管理员'
            : tableData[i].level == '2'
            ? '代理'
            : '会员'
        obj.nikename = tableData[i].nicheng
        obj.betNum = tableData[i].tzcs
        obj.totalWin = Number((tableData[i].yl).toFixed(0))
        obj.pf = tableData[i].pf
        obj.zc = tableData[i].zc
        if (tableData[i].xml_s == null) tableData[i].xml_s = 0
        if (tableData[i].xml_d == null) tableData[i].xml_d = 0
        obj.xml = tableData[i].xml_s + '/' + tableData[i].xml_d
        obj.xmb = tableData[i].xmb_s + '/' + tableData[i].xmb_d
        obj.xmyj = tableData[i].xmType == 0 ? Number(((tableData[i].xml_d * tableData[i].xmb_d) / 100).toFixed(0)) : Number(((tableData[i].xml_s * tableData[i].xmb_s) / 100).toFixed(0))
        obj.xmStype = tableData[i].xmType == 0 ? '双边' : '单边'
        obj.totalMoney = Number((Number(tableData[i].yl) + Number(obj.xmyj)).toFixed(0))
        obj.thisLevelMoney = Number(((obj.totalMoney * obj.zc) / 100).toFixed(0))
        obj.companyMoney = Number((obj.totalMoney - obj.thisLevelMoney).toFixed(0))
        // 为导出excel做数据
        obj.e_pf = tableData[i].pf === 1 ? '是' : '否'
        obj.e_zc = `${tableData[i].zc}%`
        obj.e_xmls = Number(tableData[i].xml_s)
        obj.e_xmld = Number(tableData[i].xml_d)
        obj.e_xmb = tableData[i].xmType == 0 ? `双: ${tableData[i].xmb_d}%` : `单: ${tableData[i].xmb_s}%`
        table.push(obj)
      }
      table.sort((a, b) => a.totalWin - b.totalWin)
      return table
    },

    summeryReportTable (table1, table2) {
      // 加上合计行
      var obj = {};
      if (table2.length == 0) return
      table2 = table2[0]
      obj.name = '所有统计'
      obj.level = ''
      obj.nikename = ''
      obj.betNum = ''
      obj.totalWin = table2.yl.toFixed(0)
      obj.zc = ''
      obj.xml_s = table2.xml_s
      obj.xml_d = table2.xml_d
      obj.xml = obj.xml_s + '/' + obj.xml_d
      obj.xmb = ''
      obj.xmyj = table2.xmyj
      obj.xmStype = ''
      obj.totalMoney = table2.totalMoney
      obj.thisLevelMoney = table2.thisMoney
      obj.companyMoney = table2.companyMoney
      table1.push(obj)
      return table1
    },
    getSummaries1(param) {
      // 直属代理统计
      var t_data = this.reportRecord.tableData4
      this.reportRecord.totalItemsNum1 = t_data.length > 0 ? t_data[0].count : 0
      return this.getData(t_data, param)
    },
    getData(t_data, param) {
      const sums = []
      const { columns } = param
      if (t_data.length === 0) {
        t_data.push({ count: 0 })
      }
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '所有统计:'
          return
        }
        this.loading = false
        var data = t_data[0]
        if (t_data[0].count > 0) {
          if (t_data[0].xml_s === null) t_data[0].xml_s = 0
          if (t_data[0].xml_d === null) t_data[0].xml_d = 0
        }
        switch (column.property) {
          case 'betNum':
            sums[index] = data.count > 0 ? data.tzcs : 0
            break
          case 'totalWin':
            sums[index] = data.count > 0 ? data.yl.toFixed(0) : 0
            break
          case 'bjlWin':
            sums[index] = data.count > 0 ? data.bjl_yl.toFixed(0) : 0
            break
          case 'lhWin':
            sums[index] = data.count > 0 ? data.lh_yl.toFixed(0) : 0
            break
          case 'nnWin':
            sums[index] = data.count > 0 ? data.nn_yl.toFixed(0) : 0
            break
          case 'dxWin':
            sums[index] = data.count > 0 ? data.dx_yl.toFixed(0) : 0
            break
          case 'ttsWin':
            sums[index] = data.count > 0 ? data.tts_yl.toFixed(0) : 0
            break
          case 'xjhWin':
            sums[index] = data.count > 0 ? data.xjh_yl.toFixed(0) : 0
            break
          case 'sscWin':
            sums[index] = data.count > 0 ? data.ssc_yl.toFixed(0) : 0
            break
          case 'jsk3Win':
            sums[index] = data.count > 0 ? data.jsk3_yl.toFixed(0) : 0
            break
          case 'bjcsWin':
            sums[index] = data.count > 0 ? data.bjcs_yl.toFixed(0) : 0
            break
          case 'xml':
            sums[index] =
              data.count > 0 ? data.xml_s + '/' + data.xml_d : '0/0'
            break
          case 'xmyj':
            sums[index] = data.count > 0 ? data.xmyj : 0
            break
          case 'totalMoney':
            sums[index] = data.count > 0 ? data.totalMoney : 0
            break
          case 'thisLevelMoney':
            sums[index] = data.count > 0 ? data.thisMoney : 0
            break
          case 'companyMoney':
            sums[index] = data.count > 0 ? data.companyMoney : 0
            break
          default:
            break
        }
      })
      return sums
    },

    cellClick(Id, name, level) {
      if (level === 2) {
        Id = ''
        this.form.name = name
        this.sendStr(Id, name, this.currentPage1, this.currentPage2)
      }
      if (level === 3) {
        this.$router.push({
          name: 'BetRecords',
          params: {
            name: name,
            time: [this.startDate, this.endDate]
          }
        })
      }
    },

    handleSelectionChange1(row) {
      this.select_xm_dl = []
      for (let i = 0; i < row.length; i++) {
        var obj = {}
        obj.Id = row[i].Id
        obj.userId = row[i].userId
        obj.xmyj = row[i].xmyj
        this.select_xm_dl.push(obj)
      }
    },
    handleSelectionChange2(row) {
      this.select_xm_hy = []
      for (let i = 0; i < row.length; i++) {
        var obj = {}
        obj.Id = row[i].Id
        obj.userId = row[i].userId
        obj.xmyj = row[i].xmyj
        this.select_xm_hy.push(obj)
      }
    },

  },
  created() {
    this.genDateTime()
    // this.today()
    var routerParams = this.$route.params
    if (routerParams.name !== undefined) {
      let name = routerParams.name
      this.doClickAgent(name)
    } else {
      this.doClickAgent(this.$Global.optioner.UserName)
    }
  },
  activated() {
    this.genDateTime()
    var routerParams = this.$route.params
    if (routerParams.name !== undefined) {
      let name = routerParams.name
      this.doClickAgent(name)
    }
  },
};
</script>