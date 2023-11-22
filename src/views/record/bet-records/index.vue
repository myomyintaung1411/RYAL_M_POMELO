<template>
    <div class="w-full h-full relative pb-10">
       <van-tabs v-model="activeName" @click="tabClick" sticky color="#4e6c50" >
        <van-tab title="游戏记录" name="a">
           <section class="w-full relative px-3 py-2">
            <div class="flex items-center w-full justify-between space-x-2">
               <van-button icon="plus" @click="openFind_Dialog"  class="w-1/3 h-10 rounded bg-[#4e6c50] text-white whitespace-nowrap">搜索</van-button>
               <van-button @click="doRefresh()" icon="search" class=" w-1/3  whitespace-nowrap h-10 rounded bg-[#4e6c50] text-white">刷新</van-button>
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
            <div class="relative overflow-x-auto shadow-md sm:rounded-lg py-2">
                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 ">
                        <tr>
                            <th  scope="col" class="px-6 py-3 whitespace-nowrap">
                                账号
                            </th>

                            <th    scope="col" class="px-6 py-3 whitespace-nowrap">
                                游戏
                            </th>
                            <th scope="col" class="px-6 py-3 whitespace-nowrap">
                                台号
                            </th>
                            <th scope="col" class="px-6 py-3 whitespace-nowrap">
                                局-口
                            </th>
                            <th scope="col" class="px-6 py-3 whitespace-nowrap">
                                开奖时间
                            </th>
                            <th scope="col" class="px-6 py-3 whitespace-nowrap">
                                下注时间
                            </th>
                            <th scope="col" class="px-6 py-3 whitespace-nowrap">
                                下注类型
                            </th>
                            <th scope="col" class="px-6 py-3 whitespace-nowrap">
                                下注金额
                            </th>
                            <th scope="col" class="px-6 py-3 whitespace-nowrap">
                                开奖结果
                            </th>
                            <th scope="col" class="px-6 py-3 whitespace-nowrap">
                                盈利
                            </th>
                            <th scope="col" class="px-6 py-3 whitespace-nowrap">
                                洗码量
                            </th>
                            <th scope="col" class="px-6 py-3 whitespace-nowrap">
                                洗码费
                            </th>
                            <th scope="col" class="px-6 py-3 whitespace-nowrap">
                                投注前
                            </th>
                            <th scope="col" class="px-6 py-3 whitespace-nowrap">
                                结算后
                            </th>
                            <!-- <th scope="col" class="px-6 py-3 whitespace-nowrap">
                                余额备注
                            </th> -->
                            <!-- <th scope="col" class="px-6 py-3 whitespace-nowrap">
                                投注IP
                            </th> -->
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(row) in memberTrade.tableData" :key="row.Id" class=" border-b border-slate-600   bg-gray-800 ">
                            <td scope="row" @click="goGame(row)" class="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {{row.memberAccount}}
                            </td>

                            <td  class="px-6 py-2">
                                <div  class="flex items-center whitespace-nowrap ">
                                    <span v-if="row.game === '百家乐'">百家乐</span>
                                    <span v-if="row.game === '龙虎'">牛牛</span>
                                    <span v-if="row.game === '牛牛'">龙虎</span>
                                </div>
                            </td>
                            <td class="px-6 py-2 whitespace-nowrap">
                                {{row.teskNum}}
                            </td>
                            <td class="px-6 py-2 whitespace-nowrap">
                                <div >
                                {{ row.cc }}
                                </div>
                            </td>
                            <td class="px-6 py-2 whitespace-nowrap">
                             {{ row.sTime }}
                            </td>
                            <td class="px-6 py-2 whitespace-nowrap">
                                {{row.betTime}}
                            </td>
                            <td class="px-6 py-2 whitespace-nowrap">
                             <div
                                    v-if="row.rType === 'dx' ||
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
                                :style="(item.indexOf('庄') !== -1 || item.indexOf('龙') !== -1 || item.indexOf('大') !== -1) // || item.indexOf('双') !== -1
                                ? 'color: red'
                                : (item.indexOf('闲') !== -1 || item.indexOf('虎') !== -1 || item.indexOf('单') !== -1 || item.indexOf('小') !== -1)
                                    ? 'color: #2196F3;'
                                    : (item.indexOf('和') !== -1 || item.indexOf('同点') !== -1)
                                    ? 'color: green'
                                    : ''
                                "
                            >
                                <!-- {{ item }} -->
                                <span v-if="row.rType === 'bjl'">
                                {{ item.replace(/\庄对/g, '庄对')
                                    .replace(/\闲对/g,'闲对')
                                    .replace(/\闲/g, '闲')
                                    .replace(/\庄/g, '庄')
                                    .replace(/\和/g,'和')
                                }}
                                </span>
                                <span v-if="row.rType === 'lh'">
                                {{ item.replace(/\龙/g, '龙')
                                    .replace(/\虎/g, '虎')
                                    .replace(/\和/g, '和')
                                }}
                                </span>
                                <span v-if="row.rType === 'dx'">
                                {{ item.replace(/\大/g, '大')
                                    .replace(/\小/g, '小')
                                    .replace(/\同点/g, '同点')
                                    .replace(/\单/g, '单')
                                    .replace(/\双/g, '双')
                                    .replace(/\总合/g, '总合')
                                    .replace(/\点/g, '点')
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
                            <span v-if="row.niuniuResult" style="position: absolute; right: 5px; top: 5px;">
                            <!-- <el-popover
                                placement="top-start"
                                :title="$t('table.result_detail')"
                                width="200"
                                trigger="hover"
                                :content="`${$t('table.first_gate')} = ${row.result.split('|')[0]}; ${$t('table.second_gate')} = ${row.result.split('|')[1]}; ${$t('table.third_gate')} = ${row.result.split('|')[2]}`"
                            >
                                <el-button slot="reference" icon="el-icon-question" circle size="mini" />
                            </el-popover> -->
                            </span>
                            <div>
                            <span v-for="(n, index) in row.niuniu" :key="index" class="nn_info_container">
                                <p class="nn_info_title" :style="n.indexOf('闲') != -1 ? 'color: blue' : 'color: red'">
                                {{ n.replace(/\庄/g, '庄')
                                    .replace(/\闲/g, '闲')
                                    .replace(/\平倍/g, '平倍')
                                    .replace(/\倍/g, '倍') }}
                                <!-- <span style="color: #000">：</span> -->
                                </p>
                            </span>
                            </div>
                            <div>
                            <span v-for="(n, i) in row.niuniuBet" :key="i" class="nn_info_container">
                                <p class="nn_info_bet_show">
                                {{ fixedTwo(n) }}
                                </p>
                            </span>
                            </div>
                            <div v-if="row.niuniuResult" style="margin-left: 5px;">
                            <span v-for="(n, i) in row.nnWinLose" :key="i" class="nn_info_container">
                                <span v-if="n === '输'" class="nn_info_bet_show" style="color: #FF1744">输</span>
                                <span v-else class="nn_info_bet_show" style="color: #00C853">赢</span>
                            </span>
                            </div>
                        </div>
                            </td>
                            <td class="px-6 py-2 whitespace-nowrap">
                                {{row.totalBet}}
                            </td>
                            <td class="px-6 py-2 whitespace-nowrap">
                                <div v-if="row.rType === 'nn'">
                                    <div v-if="row.niuniuResult" style="display: flex; justify-content: space-between;">
                                    <div style="background: red; color: white; padding: 0 2px; margin: 1px; width: 50%;">
                                        庄:
                                        {{ row.niuniuResult[0].replace(/\牛/g, '牛')
                                        .replace(/\无/g, '无')
                                        .replace(/\炸弹/g, '炸弹') || "" }}
                                    </div>
                                    <div class="nnresultshow">
                                         闲1:
                                        {{ row.niuniuResult[1].replace(/\牛/g, '牛')
                                        .replace(/\无/g, '无')
                                        .replace(/\炸弹/g, '炸弹') || "" }}
                                    </div>
                                    </div>
                                    <div v-if="row.niuniuResult" style="display: flex; justify-content: space-between;">
                                    <div class="nnresultshow">
                                        闲2:
                                        {{ row.niuniuResult[2].replace(/\牛/g, '牛')
                                        .replace(/\无/g, '无')
                                        .replace(/\炸弹/g, '炸弹') || "" }}
                                    </div>
                                    <div class="nnresultshow">
                                        闲3:
                                        {{ row.niuniuResult[3].replace(/\牛/g, '牛')
                                        .replace(/\无/g, '无')
                                        .replace(/\炸弹/g, '炸弹') || "" }}
                                    </div>
                                    </div>

                                    <div v-else>{{ row.result }}</div>
                                </div>
                             <div
                                v-else
                                style="display: flex;"
                                :style="row.rType === 'tts' ? 'overflow-x: scroll' : ''"
                                @click="openPaiDia(row)"
                            >
                                <div v-for="(res, ii) in row.result" :key="ii" style="color: white; white-space: nowrap; margin: 0 1px;">
                                <span
                                    :style="((res || '').indexOf('庄') !== -1 || (res || '').indexOf('龙') !== -1 || (res || '').indexOf('大') !== -1 || (res || '').indexOf('双') !== -1)
                                    ? 'background: red; padding: 3px 5px;'
                                    : ((res || '').indexOf('闲') !== -1 || (res || '').indexOf('虎') !== -1 || (res || '').indexOf('单') !== -1 || (res || '').indexOf('小') !== -1)
                                        ? 'background: blue; padding: 3px 5px;'
                                        : ((res || '').indexOf('和') !== -1 || (res || '').indexOf('同点') !== -1)
                                        ? 'background: green; padding: 3px 5px;'
                                        : 'background: #212121; padding: 3px'
                                    "
                                >
                                    <!-- {{ res }} -->
                                    <span v-if="res === '庄'">庄</span>
                                    <span v-if="res === '庄对'">庄对</span>
                                    <span v-if="res === '闲'">闲</span>
                                    <span v-if="res === '大'">大</span>
                                    <span v-if="res === '小'">小</span>
                                    <span v-if="res === '闲对'">闲对</span>
                                    <span v-if="res === '和'">和</span>
                                    <span v-if="res === '龙'">龙</span>
                                    <span v-if="res === '虎'">虎</span>
                                    <span v-if="res === '虎单'">虎单</span>
                                    <span v-if="res === '虎双'">虎双</span>
                                    <span v-if="res === '龙单'">龙单</span>
                                    <span v-if="res === '龙双'">龙双</span>
                                    <span v-if="row.rType === 'dx'">{{ res.replace(/\点/g, '点') }}</span>
                                    <span v-if="row.rType === 'tts'">
                                    {{ res.replace(/\庄/g, '庄')
                                        .replace(/\闲/g, '闲')
                                        .replace(/\平倍/g, '平倍')
                                        .replace(/\倍/g, '倍') }}
                                    </span>
                                </span>
                                </div>
                            </div>
                            </td>
                            <td class="px-6 py-2 whitespace-nowrap">
                                <span v-show="row.win < 0">
                                    <font color="red">{{ row.win }}</font>
                                </span>
                                 <span v-show="row.win >= 0" style="color: #2196F3; padding-right: 10px;">{{ row.win }}</span>
                            </td>
                            <td class="px-6 py-2 whitespace-nowrap">
                                <div style="display: flex; justify-content: space-between; text-align: left;">
                                    <font style="width: 100%; margin-right: 5px;"><span style="color: #FF9800">单:</span>{{ (row.xml.split('/')[0] || 0) }}</font>
                                    <font style="width: 100%;"><span style="color: #2196F3">双</span>{{
                                    (row.xml.split('/')[1] || 0) }}</font>
                                </div>
                            </td>
                            <td class="px-6 py-2 whitespace-nowrap">
                                <span >{{ row.xmf || 0 }}</span>
                            </td>
                            <td class="px-6 py-2 whitespace-nowrap">
                                <span >{{ row.before_ye | toThousandFilter }}</span>
                            </td>
                            <td class="px-6 py-2 whitespace-nowrap">
                                <span >{{ row.balance | toThousandFilter }}</span>
                            </td>
                        </tr>
                        <tr class="bg-[#4e6c50] text-white">
                          <td  class="px-6 py-2 whitespace-nowrap">总计:</td>
                          <td class="px-6 py-2 whitespace-nowrap">{{memberTrade.totalItemsNum + ' 条'}}</td>
                          <td class="px-6 py-2 whitespace-nowrap"></td>
                          <td class="px-6 py-2 whitespace-nowrap"></td>
                          <td class="px-6 py-2 whitespace-nowrap"></td>
                          <td class="px-6 py-2 whitespace-nowrap"></td>
                          <td class="px-6 py-2 whitespace-nowrap"></td>
                          <td class="px-6 py-2 whitespace-nowrap"></td>
                          <td class="px-6 py-2 whitespace-nowrap"></td>
                          <td class="px-6 py-2 whitespace-nowrap"></td>
                          <td class="px-6 py-2 whitespace-nowrap">盈利：</td>
                          <td class="px-6 py-2 whitespace-nowrap" :class="memberTrade.yl > 0 ? 'text-blue-400' : 'text-red-400'">{{Number((memberTrade.yl).toFixed(0)) || 0}}</td>
                          <td class="px-6 py-2 whitespace-nowrap " :class="memberTrade.xml_s > 0 ? 'text-blue-400' : 'text-red-400'"> <span class="text-white">单:</span> {{memberTrade.xml_s || 0}}</td>
                          <td class="px-6 py-2 whitespace-nowrap " :class="memberTrade.xml_s > 0 ? 'text-blue-400' : 'text-red-400'"> <span class="text-white">双:</span> {{memberTrade.xml_d || 0}}</td>
                        </tr>
                    </tbody>
                </table>
             </div>
             <section class="w-full py-2 relative">
                 <van-pagination v-model="currentPage" mode="simple" :total-items="memberTrade.totalItemsNum || 0" :items-per-page="pageSize" @change="pagechange" />
              </section>
           </section>
        </van-tab>
        <van-tab title="登录记录" name="b"></van-tab>
        <van-tab title="修改账号记录" name="c"></van-tab>
        <van-tab title="上下分记录" name="d"></van-tab>
        <van-tab title="洗码记录" name="e"></van-tab>
        <van-tab title="提现记录" name="f"></van-tab>
        <van-tab title="交易流水" name="g"></van-tab>
       </van-tabs> 
       
    <van-popup  v-model="openFormDialog" closeable :lock-scroll="false"
      position="bottom"
      :style="{ height: '50%' }">
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
                        v-model.trim="form.account"
                        type="text" autocomplete="off"
                        maxlength="40"
                        placeholder="请输入备注"
                        class="input-name text-[#524d4d] bg-transparent placeholder:tracking-wider px-3 border-none outline-none focus:outline-none focus:border-none w-full h-full"
                    />
                    </div>
            </div>

            <div class="flex items-center w-full relative h-10 rounded-md bg-[#dddddd] px-5 mt-3">
                    <div
                    class="border-none w-full h-full text-base flex justify-center items-center relative"
                    >
                    <input
                        v-model.trim="form.cc"
                        type="text" autocomplete="off"
                        maxlength="40"
                        placeholder="请输入局-口"
                        class="input-name text-[#524d4d] bg-transparent placeholder:tracking-wider px-3 border-none outline-none focus:outline-none focus:border-none w-full h-full"
                    />
                    </div>
            </div>
            <div class="flex items-center w-full relative h-10 rounded-md bg-[#dddddd] px-5 mt-3">
                    <div
                    class="border-none w-full h-full text-base flex justify-center items-center relative"
                    >
                    <input
                        v-model.trim="form.jc"
                        type="text" autocomplete="off"
                        maxlength="40"
                        placeholder="请输入场次"
                        class="input-name text-[#524d4d] bg-transparent placeholder:tracking-wider px-3 border-none outline-none focus:outline-none focus:border-none w-full h-full"
                    />
                    </div>
            </div>
            <div class="flex items-center w-full relative h-10 rounded-md bg-[#dddddd]   mt-3  ">
                <van-dropdown-menu class="w-full" direction="up" >
                <van-dropdown-item v-model="roomValue" :options="roomOptions"   />
                <van-dropdown-item v-model="gameTypeValue" :options="gameTypeOptions"   />
                <van-dropdown-item v-model="settleTypeValue" :options="settleTypeOptions"   />
                </van-dropdown-menu>
            </div>
  
          <div class="mt-5 flex items-center w-full relative text-base">
            <van-button
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
              @click="doFind()"
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
      <BJLRoad v-if="bjlPai" ref="bjlRoadRef" :bjl-pai="bjlPai" />
      <LHRoad v-if="lhPai" ref="lhRoadRef" :lh-pai="lhPai" />
      <NNRoad v-if="nnPai" ref="nnRoadRef" :nn-pai="nnPai" />

    </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import moment from 'moment'
import { debounce } from '@/utils/index'
import TimeSelect from '@/components/TimeSelectComponent'
import BJLRoad from './kaipai/bjl.vue'
import LHRoad from './kaipai/lh.vue'
import NNRoad from './kaipai/nn.vue'
import ws2 from '@/api/ws2'
import AES from '@/api/aes'
import {memberTradeExportApi} from '@/api/user'

export default {
    components: {
        TimeSelect,
        BJLRoad,
        LHRoad,
        NNRoad
  },
  data() {
    return {
      activeTab: 1,
      activeName:'a',
      pageSize: 20,
      currentPage: 1,
      exploading: false,
      startDate: new Date(),
      endDate: new Date(),
      select_startTime_Dialog:false,
      select_endTime_Dialog:false,
      startTime: new Date(),
      endTime: new Date(),
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(),
      reference_name: '',
      gameTypeValue: 'all',
      settleTypeValue: 'settled',
      mx_game: 'nn',
      tradeBetMx: '',
      loading: false,
      iloading: false,
      reData: {},
      bjlData: {},
      lhData: {},
      nnData: {},
      nnPai: {
        str_pai: {
          banker: [],
          player_1: [],
          player_2: [],
          player_3: []
        }
      },
      lhPai: {
        str_pai: {
          dragon: [],
          tiger: []
        }
      },
      bjlPai: {
        str_pai: {
          banker: [],
          player: []
        }
      },
      roomId: '',
      rType: '',
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
      ],

      gameTypeOptions: [
        { value: 'all', text: '全部' },
        { value: 'bjl', text: '百家乐' },
        { value: 'lh', text: '龙虎' },
        { value: 'nn', text: '牛牛' }
      ],
      settleTypeOptions: [
        { value: 'settled', text: '已结算' },
        { value: 'unsettled', text: '未结算' }
      ],
      tableKey: 0,
      showTable: {
        memberId: true,
        balanceMemo: true,
        device: false,
        ip: false
      },
      memberTradeFrm: {
        totalItemsNum: 0,
        tableData: [],
        state: 0,
        showGame: '',
        betOrderInfo: ''
      },
      form: {
        account: '',
        Id: '',
        cc: '',
        jc: '',
        teskNum: ''
      },
      showActiveBtn: true,
      typeNameArr: [],
      eData: {},
      openFormDialog:false
    };
  },
  computed: {
    ...mapState({
      memberTrade: state => state.ht.memberTradeForm,
      isSub: state => state.user.isSubAccount,
      subInfo: state => state.user.subInfo,
      info: state => state.user.info,
      totalTradeData: state => state.ht.excelTradeData
    }),
    ...mapGetters(['device'])
  },
  created() {
    this.genDateTime()
    this.$store.commit('ht/setMemberTradeForm', { state: 0 })
    this.getParams()
  },
  methods:{
    pagechange(page){
     console.log(page)
     this.currentPage = page
     if (this.roomValue !== 'all-0') {
        this.roomId = parseInt(this.roomValue.split('-')[1])
        this.rType = this.roomValue.split('-')[0]
      } else {
        this.roomId = ''
        this.rType = ''
      }
      this.reqt({
        Id: this.$Global.optioner.Id,
        opt_name: this.$Global.optioner.UserName,
        name: this.form.account.trim() || '',
        findId: this.form.Id || '',
        teskNum: this.form.teskNum.trim() || '',
        roomId: this.roomId,
        rType: this.rType,
        jc: this.form.jc.trim() || '',
        cc: this.form.cc.trim() || '',
        gameType: this.gameTypeValue,
        pageSize: this.pageSize,
        currentPage: this.currentPage,
        startTime: this.startTime,
        endTime: this.endTime,
        isSettlement: this.settleTypeValue === 'settled' ? 1 : 0 // 0未结算，1已结算 默认为1
      })
    },
    start_onConfirm(){
      var timeValue = moment(new Date(this.startTime)).startOf('day').format('YYYY-MM-DD HH:mm:ss')
      console.log(timeValue);
      this.startTime = timeValue;
      this.select_startTime_Dialog = false
    },
    end_onConfirm(){
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
    dateChangeShowActiveBtn() {
      this.showActiveBtn = true
    },
    doFind: debounce(function () {
      //var r = this.getSelectDate()
      this.currentPage = 1
      if (this.roomValue !== 'all-0') {
        this.roomId = parseInt(this.roomValue.split('-')[1])
        this.rType = this.roomValue.split('-')[0]
      } else {
        this.roomId = ''
        this.rType = ''
      }
      if (this.form.account.trim() === '') this.form.account = this.$Global.optioner.UserName
      this.reqt({
        opt_name: this.$Global.optioner.UserName,
        Id: this.$Global.optioner.Id,
        name: this.form.account.trim() || '',
        findId: this.form.Id || '',
        // ip: this.form.IP,
        teskNum: this.form.teskNum.trim() || '',
        roomId: this.roomId,
        rType: this.rType,
        jc: this.form.jc.trim() || '',
        cc: this.form.cc.trim() || '',
        gameType: this.gameTypeValue,
        startTime: this.startTime,
        endTime: this.endTime,
        pageSize: this.pageSize,
        currentPage: this.currentPage,
        isSettlement: this.settleTypeValue === 'settled' ? 1 : 0 // 0未结算，1已结算 默认为1
      })
      this.openFormDialog = false;//close dialog here
    }, 500, true),
    doRefresh: debounce(function () {
      this.loading = false
      if (this.roomValue !== 'all-0') {
        this.roomId = parseInt(this.roomValue.split('-')[1])
        this.rType = this.roomValue.split('-')[0]
      } else {
        this.roomId = ''
        this.rType = ''
      }
      this.reqt({
        Id: this.$Global.optioner.Id,
          opt_name: this.$Global.optioner.UserName,
        name: this.form.account.trim() || '',
        findId: this.form.Id || '',
        teskNum: this.form.teskNum.trim() || '',
        jc: this.form.jc.trim() || '',
        cc: this.form.cc.trim() || '',
        gameType: this.gameTypeValue,
        roomId: this.roomId,
        rType: this.rType,
        startTime: this.startTime,
          endTime: this.endTime,
        pageSize: this.pageSize,
        currentPage: this.currentPage,
        isSettlement: this.settleTypeValue === 'settled' ? 1 : 0 // 0未结算，1已结算 默认为1
      })
      // this.gameTypeValue = 'all'
    }, 500, true),
    doReset: debounce(function () {
      this.loading = false
      this.form.account = ''
      this.form.Id = ''
      this.form.jc = ''
      this.form.cc = ''
      this.form.teskNum = ''
      this.pageSize = 10
      this.currentPage = 1
      this.datePick(1)
      this.gameTypeValue = 'all'
    }, 500, true),
    getParams() {
      var routerParams = this.$route.params
      if (routerParams.name !== undefined) {
        this.form.account = routerParams.name
        // if (routerParams.time !== undefined) {
        //   this.showActiveBtn = false
        //   this.startDate = routerParams.time[0]
        //   this.endDate = routerParams.time[1]
        // }
        this.doFind()
      } else {
        this.form.account = this.$Global.optioner.UserName
        if (this.form.account !== '') {
          this.doFind()
          return
        }
       // var r = this.getSelectDate()
        this.currentPage = 1
        this.reqt({
          Id: this.$Global.optioner.Id,
          opt_name: this.$Global.optioner.UserName,
          pageSize: this.pageSize,
          currentPage: this.currentPage,
          startTime: this.startTime,
          endTime: this.endTime,
          isSettlement: this.settleTypeValue === 'settled' ? 1 : 0 // 0未结算，1已结算 默认为1
        })
      }
    },
    transGameStr(strGame) {
      // 游戏类型转换
      var msg = {
        bjl: '百家乐',
        lh: '龙虎',
        nn: '牛牛',
        xjh: '炸金花',
        dx: '大小',
        tts: '推筒子',
        ssc: '时时彩',
        jsk3: '江苏快3',
        bjcs: '北京赛车'
      }
      return msg[strGame]
    },
    transTime(times) {
      moment.suppressDeprecationWarnings = true;
      return moment(times).format('YYYY-MM-DD HH:mm:ss')
    },
    doFormatData(row) {
      row.str_pai = row.pk
      if (row.str_pai === '' || row.str_pai === null || row.str_pai === undefined) {
        return null
      }
      let pai = []
      if (row.rType == 'bjl') {
        pai = JSON.parse(row.str_pai)
        // pai = JSON.parse(pai)
        pai = pai.split(',')
        const banker = []
        const player = []

        pai.forEach((v, i) => {
          if (i == 0 || i == 1 || i == 4) {
            let pv = []
            const pvstr = { suit: '', rank: '' }
            if (v != 0) {
              pv = v.split('')
              if (pv.length >= 2) {
                pvstr['suit'] = pv[0] == 'a' ? 'S' : pv[0] == 'b' ? 'H' : pv[0] == 'c' ? 'B' : pv[0] == 'd' ? 'D' : ''
                pvstr['rank'] = pv.length == 3 ? pv[1] + '' + pv[2] : pv[1]
                player.push(pvstr)
              }
            }
          }
          if (i == 2 || i == 3 || i == 5) {
            let pv = []
            const pvstr = { suit: '', rank: '' }
            if (v != 0) {
              pv = v.split('')
              if (pv.length >= 2) {
                pvstr['suit'] = pv[0] == 'a' ? 'S' : pv[0] == 'b' ? 'H' : pv[0] == 'c' ? 'B' : pv[0] == 'd' ? 'D' : ''
                pvstr['rank'] = pv.length == 3 ? pv[1] + '' + pv[2] : pv[1]
                banker.push(pvstr)
              }
            }
          }
        })
        row.str_pai = { banker: banker, player: player }
      }

      if (row.rType == 'lh') {
        pai = JSON.parse(row.str_pai)
        pai = pai.split(',')
        const dragon = []
        const tiger = []

        pai.forEach((v, i) => {
          if (i == 0) {
            let pv = []
            const pvstr = { suit: '', rank: '' }
            if (v != 0) {
              pv = v.split('')
              if (pv.length >= 2) {
                pvstr['suit'] = pv[0] == 'a' ? 'S' : pv[0] == 'b' ? 'H' : pv[0] == 'c' ? 'B' : pv[0] == 'd' ? 'D' : ''
                pvstr['rank'] = pv.length == 3 ? pv[1] + '' + pv[2] : pv[1]
                dragon.push(pvstr)
              }
            }
          }
          if (i == 1) {
            let pv = []
            const pvstr = { suit: '', rank: '' }
            if (v != 0) {
              pv = v.split('')
              if (pv.length >= 2) {
                pvstr['suit'] = pv[0] == 'a' ? 'S' : pv[0] == 'b' ? 'H' : pv[0] == 'c' ? 'B' : pv[0] == 'd' ? 'D' : ''
                pvstr['rank'] = pv.length == 3 ? pv[1] + '' + pv[2] : pv[1]
                tiger.push(pvstr)
              }
            }
          }
        })
        row.str_pai = { tiger: tiger, dragon: dragon }
      }

      if (row.rType == 'nn') {
        pai = JSON.parse(row.str_pai)
        pai = pai.split('$')
        if (pai.length != 4) {
          return null
        }
        const banker = []
        const player_1 = []
        const player_2 = []
        const player_3 = []
        const bank = pai[0].split(',')
        const p1 = pai[1].split(',')
        const p2 = pai[2].split(',')
        const p3 = pai[3].split(',')
        bank.forEach((v, i) => {
          let pv = []
          const pvstr = { suit: '', rank: '' }
          if (v != 0) {
            pv = v.split('')
            if (pv.length >= 2) {
              pvstr['suit'] = pv[0] == 'a' ? 'S' : pv[0] == 'b' ? 'H' : pv[0] == 'c' ? 'B' : pv[0] == 'd' ? 'D' : ''
              pvstr['rank'] = pv.length == 3 ? pv[1] + '' + pv[2] : pv[1]
              banker.push(pvstr)
            }
          }
        })
        p1.forEach((v, i) => {
          let pv = []
          const pvstr = { suit: '', rank: '' }
          if (v != 0) {
            pv = v.split('')
            if (pv.length >= 2) {
              pvstr['suit'] = pv[0] == 'a' ? 'S' : pv[0] == 'b' ? 'H' : pv[0] == 'c' ? 'B' : pv[0] == 'd' ? 'D' : ''
              pvstr['rank'] = pv.length == 3 ? pv[1] + '' + pv[2] : pv[1]
              player_1.push(pvstr)
            }
          }
        })
        p2.forEach((v, i) => {
          let pv = []
          const pvstr = { suit: '', rank: '' }
          if (v != 0) {
            pv = v.split('')
            if (pv.length >= 2) {
              pvstr['suit'] = pv[0] == 'a' ? 'S' : pv[0] == 'b' ? 'H' : pv[0] == 'c' ? 'B' : pv[0] == 'd' ? 'D' : ''
              pvstr['rank'] = pv.length == 3 ? pv[1] + '' + pv[2] : pv[1]
              player_2.push(pvstr)
            }
          }
        })
        p3.forEach((v, i) => {
          let pv = []
          const pvstr = { suit: '', rank: '' }
          if (v != 0) {
            pv = v.split('')
            if (pv.length >= 2) {
              pvstr['suit'] = pv[0] == 'a' ? 'S' : pv[0] == 'b' ? 'H' : pv[0] == 'c' ? 'B' : pv[0] == 'd' ? 'D' : ''
              pvstr['rank'] = pv.length == 3 ? pv[1] + '' + pv[2] : pv[1]
              player_3.push(pvstr)
            }
          }
        })
        row.str_pai = { banker: banker, player_1: player_1, player_2: player_2, player_3: player_3 }
      }

      // if (row.rType === 'bjl') {
      //   pai = JSON.parse(pai)
      // }
      // row.str_pai = pai
      return row
    },
    openPaiDia(row) {
      const rr = this.doFormatData(JSON.parse(JSON.stringify(row)))
      if (rr === null)  return this.$notify({type:'warning',message:'没有牌结果',duration: 1500,})
      if (row.rType === 'nn') {
        this.nnPai = rr
        this.$nextTick(() => {
          this.$refs.nnRoadRef.dialogFormVisible = true
        })
      }
      if (row.rType === 'lh') {
        this.lhPai = rr
        this.$nextTick(() => {
          this.$refs.lhRoadRef.dialogFormVisible = true
        })
      }
      if (row.rType === 'bjl') {
        this.bjlPai = rr
        this.$nextTick(() => {
          this.$refs.bjlRoadRef.dialogFormVisible = true
        })
      }
    },
    reqt(data) {
      const sendStr = {
        router: 'GetMemberTrade',
        JsonData: data
      }
      console.log('ssssssssss ', sendStr)
      this.loading = true
      this.$store.commit('ht/setMemberTradeForm', { state: 0 })
      this.$pomelo.send(sendStr)
    },
    genDateTime() {
      this.startTime = moment().startOf('day').format('YYYY-MM-DD HH:mm:ss')
      this.endTime = moment().endOf('day').format('YYYY-MM-DD HH:mm:ss')
    },
    goGame(row) {
      this.$router.push({
        name: 'UsersListHJ',
        params: { name: row.memberAccount }
      })
    },
    tabClick(name,title){
         
        console.log("name "+title,name);
        switch (name) {
            case 'a':
                
                break;
            case 'b':
            this.$router.push('/recordsPage/login-records')
                break;
            case 'c':
            this.$router.push('/recordsPage/account-change-records')
                break;
            case 'd':
            this.$router.push('/recordsPage/access-records')
                break;
            case 'e':
            this.$router.push('/recordsPage/wash-records')
                break;
            case 'f':
            this.$router.push('/recordsPage/withdraw-records')
                break;
            case 'g':
            this.$router.push('/recordsPage/money-records')
                break;
        
            default:
                break;
        }
    },
  },

};
</script>

<style>
.van-dropdown-menu__bar{
    background: #fff;
    
}
</style>