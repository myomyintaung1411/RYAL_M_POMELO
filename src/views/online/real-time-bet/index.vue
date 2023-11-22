<template>
    <section class="w-full h-[calc(100vh_-_50px)]  relative  overflow-y-auto">
      <van-nav-bar fixed
        title="实时下注"
        left-arrow
        @click-left="onClickLeft"
        >
        </van-nav-bar>
            <section class="w-full relative px-3 py-2">
            <div class="flex items-center w-full justify-between space-x-2 pt-12">
               <van-button icon="plus" @click="opendoFind_Dialog"  class="w-1/2 h-10 rounded bg-[#4e6c50] text-white whitespace-nowrap">搜索</van-button>
               <van-button @click="doRefresh()" icon="search" class=" w-1/2  whitespace-nowrap h-10 rounded bg-[#4e6c50] text-white">刷新</van-button>
               <!-- <van-button  @click="doReset()" icon="replay"  class=" w-1/3  whitespace-nowrap h-10 rounded bg-[#4e6c50] text-white">重置</van-button> -->
            </div>

            <div class="flex items-center py-2">
              <span style="font-size: 14px;">下注人总数： <span style="color: #F44336; font-size: 18px;">{{ betOrderInquire.totalUser || 0 }}</span></span>
          <span style="margin-left: 20px; font-size: 14px;">总投注： <span style="color: #F44336; font-size: 18px;">{{ fiexeTwo(betOrderInquire.totalBet) || 0 }}</span></span>
            </div>

            <div class="relative overflow-x-auto shadow-md sm:rounded-lg ">
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 ">
            <tr>
                <th  scope="col" class="px-6 py-3 whitespace-nowrap">
                  游戏
                </th>
                <th  scope="col" class="px-6 py-3 whitespace-nowrap">
                  时间
                </th>
                <th  scope="col" class="px-6 py-3 whitespace-nowrap">
                  台号
                </th>
                <th  scope="col" class="px-6 py-3 whitespace-nowrap">
                  场次
                </th>
                <th  scope="col" class="px-6 py-3 whitespace-nowrap">
                  账号
                </th>
                <th  scope="col" class="px-6 py-3 whitespace-nowrap">
                  下注类型
                </th>
                <th  scope="col" class="px-6 py-3 whitespace-nowrap">
                  总押
                </th>
                <th  scope="col" class="px-6 py-3 whitespace-nowrap">
                  当前余额
                </th>
                <th  scope="col" class="px-6 py-3 whitespace-nowrap">
                  账号关系
                </th>
                <th  scope="col" class="px-6 py-3 whitespace-nowrap">
                  终端
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(row) in betOrderInquire.tableData" :key="row.Id" class=" border-b border-slate-600   bg-gray-800 ">
     
                <td class="px-6 py-4 whitespace-nowrap">
                  <div v-if="row.gameType === '百家乐'">百家乐</div>
                  <div v-if="row.gameType === '龙虎'">龙虎</div>
                  <div v-if="row.gameType === '牛牛'">牛牛</div>
                  <div v-if="row.gameType === '炸金花'">炸金花</div>
                  <div v-if="row.gameType === '大小'">大小</div>
                  <div v-if="row.gameType === '推筒子'">推筒子</div>
                  <div v-if="row.gameType === '三公'">{{ row.gameType }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    {{row.betTime}}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    {{row.tableNum}}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    {{row.cc}}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div @click="goToBetRecord(row)" class="flex items-center">{{row.memberName}}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div
                    v-if="
                      row.rType === 'dx' ||
                        row.rType === 'ssc' ||
                        row.rType === 'jsk3' ||
                        row.rType === 'bjcs' ||
                        row.rType === 'tts' ||
                        row.rType === 'bjl' ||
                        row.rType === 'lh'
                    "
                    style="display: flex; justify-content: flex-start;"
                    :style="row.showResult.length > 3 ? 'overflow-x: scroll' : ''"
                  >
              <div v-for="(item, inde) in row.showResult" :key="inde" style="white-space: nowrap; margin: 0 5px;">
                <span
                  :style="
                    (item.indexOf('庄') !== -1 || item.indexOf('龙') !== -1 || item.indexOf('大') !== -1) // || item.indexOf('双') !== -1
                      ? 'color: red'
                      : (item.indexOf('闲') !== -1 || item.indexOf('虎') !== -1 || item.indexOf('单') !== -1 || item.indexOf('小') !== -1)
                        ? 'color: #2196F3'
                        : (item.indexOf('和') !== -1 || item.indexOf('同点') !== -1)
                          ? 'color: green'
                          : ''
                  "
                >
                  <!-- {{ item }} -->
                  <span v-if="row.rType === 'bjl'">
                    {{ item.replace( /\庄对/g, '庄对')
                      .replace( /\闲对/g, '闲对')
                      .replace( /\闲/g, '闲')
                      .replace( /\庄/g, '庄')
                      .replace( /\和/g, '和')
                    }}
                  </span>
                  <span v-if="row.rType === 'lh'">
                    {{ item.replace( /\龙/g, '龙')
                      .replace( /\虎/g, '虎')
                      .replace( /\和/g, '和')
                    }}
                  </span>
                  <span v-if="row.rType === 'dx'">
                    {{ item.replace( /\大/g, '大')
                      .replace( /\小/g, '小')
                      .replace( /\同点/g, '同点')
                      .replace( /\单/g, '单')
                      .replace( /\双/g, '双')
                      .replace( /\总合/g, '总合')
                      .replace( /\点/g, '点')
                    }}
                  </span>
                  <span v-if="row.rType === 'tts'">
                    {{ item.replace(/\庄/g, '庄')
                      .replace(/\闲/g, '闲')
                      .replace(/\平倍/g, '平倍')
                      .replace(/\翻倍/g, '翻倍')
                    }}
                  </span>
                </span>
              </div>
            </div>
          <!--END 大小更改为直接显示下注门，本来是用dialog（点击按钮后显示）END-->

              <div v-if="row.rType === 'nn'" class="nn_info">
                <div>
                  <span v-for="(n, index) in row.niuniu" :key="index" class="nn_info_container">
                    <p class="nn_info_title" :style="n.indexOf('闲') != -1 ? 'color: #2196F3' : 'color: red'">
                      {{ n.replace(/\庄/g, '庄')
                        .replace(/\闲/g, '闲')
                        .replace(/\平倍/g, '平倍')
                        .replace(/\倍/g, '倍') }}
                    </p>
                  </span>
                </div>
                <div>
                  <span v-for="(n, i) in row.niuniuBet" :key="i" class="nn_info_container">
                    <p class="nn_info_bet_show">
                      {{ n }}
                    </p>
                  </span>
                </div>
              </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    {{row.betMoney}}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  {{ fiexeTwo(row.aBalance) | toThousandFilter }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  {{ row.gx }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  {{ row.terminal }}
                </td>
                

            </tr>
        </tbody>
    </table>
     </div>
    <section class="w-full py-2 relative">
        <van-pagination v-model="pageNum" mode="simple" :total-items="betOrderInquire.totalItemsNum || 0" :items-per-page="pageSize" @change="pagechange" />
     </section>
            
      </section>
       <van-popup  v-model="openFormDialog" closeable :lock-scroll="false"
      position="bottom"
      :style="{ height: '40%' }">
        <div class="px-3 py-10 w-full relative">
            <span class="font-bold text-lg">备注</span>
            <form @click.prevent class="w-full rounded-lg flex flex-col justify-center items-center ">
            <div class="flex items-center w-full bg-[#dddddd] relative h-10 rounded-md  px-5 mt-3">
                    <div
                    class="border-none w-full h-full text-base flex justify-center items-center relative"
                    >
                    <input
                        v-model.trim="form.account"
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
                        v-model.trim="form.uncheck_line"
                        type="text" autocomplete="off"
                        maxlength="40"
                        placeholder="请输入代理账号"
                        class="input-name text-[#524d4d] bg-transparent placeholder:tracking-wider px-3 border-none outline-none focus:outline-none focus:border-none w-full h-full"
                    />
                    </div>
             </div>


             <div class="flex items-center w-full relative h-10 rounded-md bg-[#dddddd]   mt-3  ">
                <van-dropdown-menu class="w-full" direction="up" >
                <van-dropdown-item v-model="roomValue" :options="roomOptions"   />
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
    </section>
</template>

<script>
import { getRealTimeBetApi } from '@/api/ht'
import moment from 'moment'
import { mapState } from 'vuex'

export default {
  data() {
    return {
      openFormDialog:false,
      loading:false,
      tableNum: '',
      interval: null,
      // t_interval: null,
      mx_game: 'nn',
      teskNum: '',
      percentage: 0,
      pageNum: 1,
      pageSize: 50,
      form: {
        account: '',
        uncheck_line: ''
      },
      rules: {
        account: {
          type: 'string',
          required: true,
          message: '必填字段',
          trigger: 'change'
        }
      },
      roomValue: 'all-0',
      roomOptions: [
        { value: 'all-0', text: '全部' },
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
      ]
      // uline: []
    };
  },
  computed: {
    ...mapState({
      betOrderInquire: state => state.ht.betOrderInquireForm,
      device: state => state.app.device,
      info: state => state.user.info
    })
  },
  methods:{
    onClickLeft() {
      this.$router.push('/onlinePage/online-members')
    },
    opendoFind_Dialog(){
      this.openFormDialog = true
    },
    search_Find(){
      this.openFormDialog = false
      this.doFind()
    },
    fiexeTwo(num) {
      num = parseFloat(num)
      if (num) return (num).toFixed(0)
      return num
    },
    format(percentage) {
      return percentage === 100 ? '刷新' : ''
    },
    goToBetRecord(row) {
      this.$router.push({
        name: 'BetRecords',
        params: { name: row.memberName }
      })
    },
    startFunc() {
      if (this.interval !== null) {
        clearInterval(this.interval)
        this.interval = null
      }
      this.getOnTime()
      this.interval = setInterval(this.getOnTime, 10000)
    },
    doFind() {
      this.pageNum = 1
      this.startFunc()
    },

    doRefresh(){
      this.form.account = ''
      this.pageNum = 1
    },

    doReset() {
      this.form.account = ''
      this.pageNum = 1
      this.startFunc()
    },
    transTime(times) {
      moment.suppressDeprecationWarnings = true
      return moment(times).format('YYYY-MM-DD HH:mm:ss')
    },

    getOnTime() {
      const findName = this.form.account.trim()

      const sendStr = {
        Id: this.info.Id,
        // name: this.info.username,
        findname: findName,
        uncheck_line: this.form.uncheck_line.trim(),
        // uncheck_line: JSON.stringify(this.uline),
        teskNum: this.roomValue || '',
        pageSize: this.pageSize,
        pageNum: this.pageNum
      }
      // this.$toast.loading({
      //               message: '请稍后...',
      //               forbidClick: true,
      //               duration: 1000,
      //           })
      getRealTimeBetApi(sendStr).then((res) => {
        if (res.code === 0) {
          var data = res.data.list
          var betOrderInquireForm = { tableData: [], totalItemsNum: 0, total: {}}
          var tableData = betOrderInquireForm.tableData
          for (var i = 0; i < data.length; i++) {
            tableData[i] = {}
            tableData[i].orderId = i + 1
            tableData[i].name = data[i].name
            tableData[i].rType = data[i].rType
            tableData[i].gameType = this.$Global.transGameStr(data[i].rType)
            tableData[i].betTime = this.transTime(data[i].time)
            tableData[i].tableNum = data[i].roomName
            tableData[i].cc = data[i].cc
            // tableData[i].gx = mapAgentName(data[i].gx)
            tableData[i].memberName = data[i].name
            tableData[i].betOrderInfo = this.$Global.trasBetResult(data[i].rType, data[i].xzmx)
            tableData[i].betMoney = Number((data[i].xz))?.toFixed(0)
            tableData[i].aBalance = Number((parseFloat(data[i].ye)))?.toFixed(0)
            tableData[i].ip = data[i].ip // 权限表
            tableData[i].terminal = data[i].terminal
            const resultData = this.$Global.betInfoData(data[i]?.xzmx, tableData[i]?.rType)
            tableData[i].niuniu = resultData[0]
            tableData[i].niuniuBet = resultData[1]
            tableData[i].showResult = tableData[i].niuniu.map((item, index) => {
              return item + ':' + tableData[i].niuniuBet[index]
            })
            tableData[i].tablePara = this.$Global.getTablePara(
              data[i].rType,
              tableData[i].betOrderInfo
            )
          }
          betOrderInquireForm.totalItemsNum = res.data.totalItem || 0
          betOrderInquireForm.totalUser = res.data.totalUser || 0
          betOrderInquireForm.totalBet = res.data.totalBet || 0
          this.$store.commit('ht/setBetOrderInquireForm', betOrderInquireForm)
        }
      }).catch((e) => {
        console.error(e, 'errrrrrrr')
      })
    },

    pagechange(page){
     console.log(page)
     this.pageNum = page
     this.startFunc()
    },

  },
  created() {
    this.startFunc()
  },
  beforeDestroy() {
    // 清除定时器
    this.interval = null
    clearInterval(this.interval)
  },
  deactivated() {
    this.interval = null
    clearInterval(this.interval)
  },
  destroyed() {
    // 清除定时器
    this.interval = null
    clearInterval(this.interval)
  },
};
</script>