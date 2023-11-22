<template>
    <van-popup  v-model="dialogFormVisible" closeable
      position="bottom"  :style="{ height: '50%' }">
      <div class="px-3 py-10 w-full relative">
        <span class="font-bold text-lg">关联数据</span>
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg ">
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 ">
            <tr>
                <th  scope="col" class="px-6 py-3 whitespace-nowrap">
                  操作类型
                </th>

                <th  scope="col" class="px-6 py-3 whitespace-nowrap">
                  交易账号
                </th>
                <th scope="col" class="px-6 py-3 whitespace-nowrap">
                  昵称
                </th>
                <th scope="col" class="px-6 py-3 whitespace-nowrap">
                  账号类型
                </th>
                <th scope="col" class="px-6 py-3 whitespace-nowrap">
                  交易金额
                </th>
                <th scope="col" class="px-6 py-3 whitespace-nowrap">
                  交易前金额
                </th>
                <th scope="col" class="px-6 py-3 whitespace-nowrap">
                  交易后金额
                </th>
                <th scope="col" class="px-6 py-3 whitespace-nowrap">
                  配分比例
                </th>
                <th scope="col" class="px-6 py-3 whitespace-nowrap">
                  配分
                </th>
                <th scope="col" class="px-6 py-3 whitespace-nowrap">
                  实际金额
                </th>
                <th scope="col" class="px-6 py-3 whitespace-nowrap">
                  账号
                </th>
                <th scope="col" class="px-6 py-3 whitespace-nowrap">
                  账号类型
                </th>
                <th scope="col" class="px-6 py-3 whitespace-nowrap">
                  交易前金额
                </th>
                <th scope="col" class="px-6 py-3 whitespace-nowrap">
                  交易后金额
                </th>
                <th scope="col" class="px-6 py-3 whitespace-nowrap">
                  执行账号
                </th>
                <th scope="col" class="px-6 py-3 whitespace-nowrap">
                  执行时间
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(row) in relaData" :key="row.Id" class=" border-b border-slate-600   bg-gray-800 ">
                <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {{ transType(row.type) }}
                </td>



                <td class="px-6 py-4 whitespace-nowrap">
                    {{ row.name }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    {{row.nickname}}
                </td>

                <td class="px-6 py-4 whitespace-nowrap">
                 <div v-if="row.level === 2 || row.level === 1" style="color: #039BE5">代理</div>
                 <div v-else-if="row.level === 4" style="color: #E91E63">子账号</div>
                 <div v-else style="color: #4CAF50">会员</div>
                </td>

                
                <td class="px-6 py-4 whitespace-nowrap">
                  <div v-if="row.turn_amount >= 0" style="color: #039BE5">{{ row.turn_amount }}</div>
                  <div v-else style="color: #E91E63">{{ row.turn_amount }}</div>
                </td>

                <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {{row.before_amount}}
                </td>
                <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {{row.after_amount}}
                </td>
                <td scope="row" class="px-6 py-4 font-medium  whitespace-nowrap " style="color: orange">
                  {{ row.zc || 0 }} %
                </td>

                <td class="px-6 py-4 whitespace-nowrap">
                 <div v-if="row.pf == 1" style="color: #009688">是</div>
                 <div v-if="row.pf == 0" style="color: #E91E63">否</div>
                </td>

                <td class="px-6 py-4 whitespace-nowrap">
                 <div v-if="row.real_amount >= 0" style="color: #039BE5">{{row.real_amount}}</div>
                 <div v-else style="color: #E91E63">{{row.real_amount}}</div>
                </td>

                <td class="px-6 py-4 whitespace-nowrap">
                    {{row.source_name}}
                </td>

                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                        <span v-if="row.source_level != 3">代理</span>
                        <span v-else >会员</span>
                    </div>
                </td>

                <td class="px-6 py-4 whitespace-nowrap">
                    {{row.source_before_amount}}
                </td>

                <td class="px-6 py-4 whitespace-nowrap">
                    {{row.source_after_amount}}
                </td>

                <td class="px-6 py-4 whitespace-nowrap">
                    {{row.optioner}}
                </td>

                <td class="px-6 py-4 whitespace-nowrap">
                  {{ formatDate(row.stime) }}
                </td>

            </tr>
        </tbody>
    </table>
     </div>
      </div>
  </van-popup>
</template>

<script>
import { UPDOWN } from '@/utils/const'
import moment from 'moment'

export default {
  props: {
    relaData: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      dialogFormVisible: false
    }
  },
  methods: {
    formatDate(date) {
      if (!date) return ''
      return moment(date).format('YYYY-MM-DD HH:mm:ss')
    },
    transType(type) {
      if (type) {
        return UPDOWN[type] || ''
      }
      return ''
    }
  }
}
</script>
