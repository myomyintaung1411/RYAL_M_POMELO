<template>
    <van-popup  v-model="dialogFormVisible" closeable
      position="bottom"  :style="{ height: '70%' }">
      <div class="px-3 py-10 w-full relative overflow-y-auto">
        <span class="font-bold text-lg">每日输赢</span>
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg py-2 max-h-96 ">
        <table id="report3" class="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 ">
            <tr>
                <th  scope="col" class="px-6 py-3 whitespace-nowrap">
                    日期
                </th>
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


            </tr>
        </thead>
            <tbody>
                <tr v-for="(row) in dailyData" :key="row.Id" class=" border-b border-slate-600   bg-gray-800 ">

                    <td class="px-6 py-4 whitespace-nowrap">
                        <div>{{ formatDate(row.stime) }}</div>
                    </td>

                    <td class="px-6 py-4 whitespace-nowrap">
                        <span
                         v-if="row.name!='所有统计'"
                            size="mini"
                            type="text"
                            
                        >
                            <span  style="cursor: pointer;">{{ row.name }}</span>
                        </span>
                        <span v-if="row.name==='所有统计'">{{ row.name }}</span>
                    </td>

                    <td class="px-6 py-4 whitespace-nowrap">
                        <div v-if="row.name != '所有统计'" style="color: #4CAF50">会员</div>
                    </td>

                    <td class="px-6 py-4 whitespace-nowrap">
                    <div @click="goToUserList(row.name)">{{row.nickname}}</div>
                    </td>

                    <td class="px-6 py-4 whitespace-nowrap">
                    <span >
                        <span v-show="row.totalWin<0">
                        <span class="text-red-500">{{ row.totalWin | toThousandFilter }}</span>
                        </span>
                        <span v-show="row.totalWin>=0" style="color: #2196F3; padding-right: 10px;">{{ row.totalWin | toThousandFilter }}</span>
                    </span>
                    </td>

                    <td class="px-6 py-4 whitespace-nowrap">
                    <div v-if="row.name != '所有统计' && row.level != '会员'">{{ row.zc }} %</div>
                    </td>

                    <td class="px-6 py-4 whitespace-nowrap">
                        <div v-if="row.name != '所有统计' && row.level != '会员'" class="">
                            <div v-if="row.pf == 1" style="color: #009688">是</div>
                           <div v-if="row.pf == 0" >否</div>
                        </div>
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
                </tr>
            </tbody>
           </table>
    </div>
      </div>
  </van-popup>
</template>

<script>
import moment from 'moment'

export default {
    props: {
    dailyData: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      dialogFormVisible: false,
      eData: {}
    }
  },
  methods: {
    changeCellStyle3(row, column, rowIndex, columnIndex) {
      if (row.columnIndex === 4 || row.columnIndex === 9 || row.columnIndex === 10 || row.columnIndex === 11) {
        return 'padding-right: 10px !important; text-align: right;'
      }
    },
    formatDate(date) {
      if (date) return moment(date).format('YYYY-MM-DD')
      return date
    },
    goToUserList(name) {
      this.$router.push({
        name: 'UsersListHJ',
        params: { name: name }
      })
    },
    excelExport() {
      this.eData = {
        tHeader: ['日期', '账号', '级别', '昵称', '总输赢金额', '占成', '配分', '洗码量单', '洗码量双', '洗码类型', '洗码佣金', '实际金额', '本机金额'],
        filterVal: ['e_stime', 'name', 'level', 'nikename', 'totalWin', 'e_zc', 'e_pf', 'e_xmls', 'e_xmld', 'e_xmb', 'xmyj', 'totalMoney', 'thisLevelMoney'],
        list: this.dailyData
      }
      this.$refs.excel.excleForm = true
    }
  }
}
</script>
