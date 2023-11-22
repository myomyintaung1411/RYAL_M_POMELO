<template>
        <div class="h-full relative w-full">
        <van-nav-bar fixed
        title="公共设置"
        left-arrow
        @click-left="onClickLeft"
        >
    </van-nav-bar>
        <section class="pt-12 w-full relative">
            <div class="py-1 px-2 relative">
                <div class="flex items-center w-full justify-between space-x-2 py-2">
                      <van-button icon="plus" @click="openFormDialog = true"  class="flex-1 h-10 rounded bg-[#4e6c50] text-white whitespace-nowrap">刷新</van-button>
                      <van-button  @click="refreshList()" icon="replay"  class=" flex-1  whitespace-nowrap h-10 rounded bg-[#4e6c50] text-white">刷新</van-button>
                </div>
            </div>
            <div class="py-2 px-3">
                <Road ref="roadRef" :game-type="gameType" />
            </div>
            <div class="py-2 px-3">
                <div class="relative overflow-x-auto shadow-md sm:rounded-lg py-2">
                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 ">
                        <tr>
                            <th  scope="col" class="px-6 py-3 whitespace-nowrap">
                                台桌名称
                            </th>
                            <th  scope="col" class="px-6 py-3 whitespace-nowrap">
                                游戏类型
                            </th>
                            <th  scope="col" class="px-6 py-3 whitespace-nowrap">
                                局
                            </th>
                            <th  scope="col" class="px-6 py-3 whitespace-nowrap">
                                口
                            </th>
                            <th  scope="col" class="px-6 py-3 whitespace-nowrap">
                                游戏状态
                            </th>
                            <th  scope="col" class="px-6 py-3 whitespace-nowrap">
                                开奖结果
                            </th>
                            <th  scope="col" class="px-6 py-3 whitespace-nowrap">
                                冲正状态
                            </th>
                            <th  scope="col" class="px-6 py-3 whitespace-nowrap">
                                倒计时开始时间
                            </th>
                            <th  scope="col" class="px-6 py-3 whitespace-nowrap">
                                倒计时结束时间
                            </th>
                            <th  scope="col" class="px-6 py-3 whitespace-nowrap">
                                结果录入时间
                            </th>
                            <th  scope="col" class="px-6 py-3 whitespace-nowrap">
                                修改账号
                            </th>
                            <th  scope="col" class="px-6 py-3 whitespace-nowrap">
                                修改时间
                            </th>

                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(row) in roadList.tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)" :key="row.Id" class=" border-b border-slate-600   bg-gray-800 ">

                            <td class="px-6 py-4 whitespace-nowrap">
                                {{row.roomName}}
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div >
                                {{ row.rType }}
                                </div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                             {{ row.cc }}
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                {{row.jc}}
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                {{row.gameStatus}}
                            </td>


                            <td class="px-6 py-4 whitespace-nowrap">
                                <div v-if="row.rType === 'nn'"  @click="openPaiDia(row)">
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
                            <span style="margin-right: 5px;">{{ row.result }}</span>
                            <span v-if="row.rType == 'bjl'">{{ row.kj2 == 'a' ? '大' : row.kj2 == 'b' ? '小' : '' }}</span>
                             <span v-if="row.rType == 'lh'">{{ row.kj2 == 'a' ? '龙双 虎双' : row.kj2 == 'b' ? '龙单 虎单' : row.kj2 == 'c' ? '龙单 虎双' : row.kj2 == 'd' ? '龙双 虎单' : '' }}</span>
                            </div>
                            </td>

                            <td class="px-6 py-4 whitespace-nowrap">
                                <span v-if="row.editStatus == 1">{{ '成功' }}</span>
                                 <span v-if="row.editStatus == 4">{{ '作废' }}</span>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                               <span>{{ row.start_time }}</span>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                               <span>{{ row.end_time }}</span>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                               <span>{{ row.result_time }}</span>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                               <span>{{ row.editAccount }}</span>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                               <span>{{ row.edit_time }}</span>
                            </td>
                        </tr>
                    </tbody>
                </table>
             </div>
            </div>
            
        </section>
        
        <van-popup  v-model="openFormDialog" closeable
      position="bottom"
      :style="{ height: '40%' }">
        <div class="px-3 py-10 w-full relative">
            <span class="font-bold text-lg">备注</span>
            <form @click.prevent class="w-full rounded-lg flex flex-col justify-center items-center ">

            <div @click="select_startTime_Dialog = true" class="flex items-center w-full relative h-10 rounded-md bg-[#dddddd] px-10 mt-3">
                起始日 - {{ startDate }}
            </div>

             <div class="flex items-center w-full relative h-10 rounded-md    mt-3  ">
                <!-- <van-dropdown-menu class="w-full px-4 bg-[#dddddd]" direction="up"  >
                    <van-dropdown-item class=""  title-class="text-left w-full flex-1  " v-model="roomTypeValue"  :options="options"   />
                </van-dropdown-menu> -->
                <van-dropdown-menu class="w-full  " direction="up"  >
                    <van-dropdown-item class=""   v-model="roomTypeValue"  :options="options"   />
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
              @click="findTableJc()"
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
                v-model="startDate" @confirm="start_onConfirm" @cancel="onCancel"
                type="date"
                title="Choose Date"
                :min-date="minDate"
                :max-date="maxDate"
               
                />
      </van-popup>
      <NNRoad v-if="nnPai" ref="nnRoadRef" :nn-pai="nnPai" />
    <LHRoad v-if="lhPai" ref="lhRoadRef" :lh-pai="lhPai" />
    <BJLRoad v-if="bjlPai" ref="bjlRoadRef" :bjl-pai="bjlPai" />
        </div>
</template>


<script>
import { mapState } from 'vuex'
import moment from 'moment'
import { GetTableOpenJcApi,GetTableHistoryApi ,getPhoneTableListApi} from '@/api/ht'
import NNRoad from '../record/bet-records/kaipai/nn.vue'
import LHRoad from '../record/bet-records/kaipai/lh.vue'
import BJLRoad from '../record/bet-records/kaipai/bjl.vue'
import Road from './road.vue'

export default {
    components: {
        NNRoad,
        LHRoad,
        BJLRoad,
        Road
  },
  data() {
    return{
        select_startTime_Dialog:false,
        startDate: new Date(),
        minDate: new Date(2022, 0, 1),
        maxDate: new Date(),
      endDate: new Date(),
      openFormDialog:false,
      pageSize: 100,
      currentPage: 1,
      roomTypeValue: '30',
      options: [
        { value: '30', text: '百家乐 30' },
        { value: '31', text: '百家乐 31' },
        { value: '32', text: '百家乐 32' },
        { value: '33', text: '百家乐 33' },
        { value: '35', text: '百家乐 35' },
        { value: '66', text: '百家乐 66' },
        { value: '88', text: '百家乐 88' },
        { value: '36', text: '龙虎 36' },
        { value: '37', text: '龙虎 37' },
        { value: '38', text: '龙虎 38' },
        { value: '39', text: '龙虎 39' },
        { value: '26', text: '龙虎 26' },
        { value: '555', text: '龙虎 555' },
        { value: '16', text: '牛牛 16' },
        { value: '86', text: '牛牛 86' }
      ],
      jcValue: 0,
      road: '',
      gameType: '',
      loading: false,
      bjlData: {},
      lhData: {},
      nnData: {},
      cancelData: {},
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
      }
    }
  },

  computed: {
    ...mapState({
      tableList: state => state.ht.tableList,
      roadList: state => state.ht.roadList,
      tableJc: state => state.ht.tableJc
    })
  },

  mounted() {
    this.startDate = moment().startOf('day').format('YYYY-MM-DD HH:mm:ss')
    this.resetData()
    this.getTableList()
  },


  methods: {
    start_onConfirm(){
       // var timeValue = new Date(moment().startOf('day').format('YYYY-MM-DD HH:mm:ss'))
       var timeValue = moment(new Date(this.startDate)).startOf('day').format('YYYY-MM-DD HH:mm:ss')
      console.log(timeValue);
      this.startDate = timeValue;
      this.roomTypeValue = ''//
      this.jcValue = ''//
      this.$store.commit('ht/setTableJc', [])//
      this.select_startTime_Dialog = false
    },
    onCancel() {
        this.select_startTime_Dialog = false
  },
    onClickLeft() {
      this.$router.push('/dashboard')
    },
    openPaiDia(row) {
      const rr = this.doFormatData(JSON.parse(JSON.stringify(row)))
      if (rr === null) return this.$toast('没有牌结果')
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

    doFormatData(row) {
      if (row.str_pai === '' || row.str_pai === null || row.str_pai === undefined) {
        return null
      }
      let pai = []
      if (row.rType == 'bjl') {
        pai = JSON.parse(row.str_pai)
        pai = JSON.parse(pai)
        pai = pai.split(',')
        let banker = []
        let player = []

        pai.forEach((v, i) => {
          if (i == 0 || i == 1 || i == 4) {
            let pv = []
            let pvstr = {suit: '', rank: ''}
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
            let pvstr = {suit: '', rank: ''}
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
        row.str_pai = {banker: banker, player: player}
      }

      if (row.rType == 'lh') {
        pai = JSON.parse(row.str_pai)
        pai = pai.split(',')
        let dragon = []
        let tiger = []

        pai.forEach((v, i) => {
          if (i == 0) {
            let pv = []
            let pvstr = {suit: '', rank: ''}
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
            let pvstr = {suit: '', rank: ''}
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
        row.str_pai = {tiger: tiger, dragon: dragon}
      }

      if (row.rType == 'nn') {
        pai = JSON.parse(row.str_pai)
        pai = pai.split('$')
        if (pai.length != 4) {
          return null
        }
        let banker = []
        let player_1 = []
        let player_2 = []
        let player_3 = []
        let bank = pai[0].split(',')
        let p1 = pai[1].split(',')
        let p2 = pai[2].split(',')
        let p3 = pai[3].split(',')
        bank.forEach((v, i) => {
          let pv = []
          let pvstr = {suit: '', rank: ''}
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
          let pvstr = {suit: '', rank: ''}
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
          let pvstr = {suit: '', rank: ''}
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
          let pvstr = {suit: '', rank: ''}
          if (v != 0) {
            pv = v.split('')
            if (pv.length >= 2) {
              pvstr['suit'] = pv[0] == 'a' ? 'S' : pv[0] == 'b' ? 'H' : pv[0] == 'c' ? 'B' : pv[0] == 'd' ? 'D' : '' 
              pvstr['rank'] = pv.length == 3 ? pv[1] + '' + pv[2] : pv[1]
              player_3.push(pvstr)
            }
          }
        })
        row.str_pai = {banker: banker, player_1: player_1, player_2: player_2, player_3: player_3}
      }

      // if (row.rType === 'bjl') {
      //   pai = JSON.parse(pai)
      // }
      // row.str_pai = pai
      return row
    },

    transDate(date) {
      if (date === '' || date === null || date === undefined) return ''
      return moment(date).format('YYYY-MM-DD HH:mm:ss')
    },

    getTableList() {
      const sendStr = {
          currentPage: 1,
          pageSize: 100
      }
      getPhoneTableListApi(sendStr).then((res)=>{
        if(res.code === 0){
          var data = res.data.list
        var tbListForm = { tableData: [], totalItemsNum: 0 }
        var tableData = tbListForm.tableData
        if (data.length > 0) {
          for (var i = 0; i < data.length; i++) {
            tableData[i] = {}
            tableData[i].Id = data[i].Id
            tableData[i].room_id = data[i].room_id
            tableData[i].type = data[i].type
            tableData[i].table_xh = data[i].table_xh
            tableData[i].phone_xh = data[i].phone_xh
            tableData[i].bet_time = data[i].bet_time
            tableData[i].player_time = data[i].player_time
            tableData[i].pl = data[i].pl
            tableData[i].hg_name = data[i].hg_name
            tableData[i].bz = data[i].bz
            tableData[i].bz_player = data[i].bz_player
            // tableData[i].xh = data[i].xh
            tableData[i].state = data[i].state
            // tableData[i].heLimit = data[i].heLimit
            tableData[i].live1 = this.splitVideo(data[i].video1, 0)
            tableData[i].live2 = this.splitVideo(data[i].video1, 1)
            tableData[i].live3 = this.splitVideo(data[i].video1, 2)
            tableData[i].use_table = data[i].desk_active
            tableData[i].use_phone = data[i].phone_desk_active
            // tableData[i].cc = data[i].Id
            tableData[i].room_name = data[i].room_name
            // tableData[i].pw = data[i].pw
            tableData[i].players = data[i].players
            // sendmsg.JsonData.push(tableData)
          }
          tbListForm.totalItemsNum = res.data.total || 0

          this.$store.commit('ht/setTableList', tbListForm)
        } else {
          this.$store.commit('ht/setTableList', { tableData: [], totalItemsNum: 0 })
          this.$toast('暂无数据')
        }
        }
      }).catch((e)=>{
        console.error(e);
      })
    },

    splitVideo(v, n) {
      if (!v || v === '') return ''
      if (n !== '') {
        const v1 = v.split('*')
        return v1[n]
      }
      return ''
    },

    resetData() {
      // this.$nextTick(() => {
      //   this.$refs.roadRef.clearRoad()
      // })
      // this.$store.commit('ht/setRoadData', '')
      this.jcValue = ''
      this.gameType = ''
      this.$store.commit('ht/setRoadData', '')
      this.$store.commit('ht/setTableJc', [])
      this.$store.commit('ht/setRoadList', { tableData: [], totalItemsNum: 0 })
    },

    findTableJc() {
    this.openFormDialog = false
      this.jcValue = ''
      this.resetData()
      this.$nextTick(() => {
        this.$refs.roadRef.clearRoad()
      })
     // this.roomTypeValue = rname
      const sendStr = {
          roomName: this.roomTypeValue,
          startDate: moment(this.startDate).format('YYYY-MM-DD') + ' 00:00:00',
          endDate: moment(this.startDate).format('YYYY-MM-DD') + ' 23:59:59'
      }
      console.log(sendStr,"snedStrrrrrrrr")
      this.$toast.loading({
            message: '请稍后...',
            forbidClick: true,
            duration: 1000,
        })
      this.loading = true
      GetTableOpenJcApi(sendStr).then((res)=>{
         this.loading = false
        if(res.code === 0){
               this.$store.commit('ht/setTableJc', res?.data)
        }else{
          this.$store.commit('ht/setTableJc', [])
        }
      }).catch((e)=>{
         this.loading = false
        console.error(e);
      })
    },

    doFindRoadList() {
      const sendStr = {
          cc: this.jcValue,
          roomName: this.roomTypeValue,
          startDate: moment(this.startDate).format('YYYY-MM-DD') + ' 00:00:00',
          endDate: moment(this.startDate).format('YYYY-MM-DD') + ' 23:59:59'
      }
      this.loading = true
     GetTableHistoryApi(sendStr).then((res)=>{
      this.loading = false
      if(res.code === 0){
          var data = res.data.list
        var rdListForm = { tableData: [], totalItemsNum: 0 }
        var tableData = rdListForm.tableData
        if (data.length > 0) {
          let t = ''
          for (var i = 0; i < data.length; i++) {
            tableData[i] = {}
            tableData[i].Id = data[i].Id
            tableData[i].cc = data[i].cc
            tableData[i].jc = data[i].jc
            tableData[i].kj = data[i].kj
            tableData[i].kj2 = data[i].kj2
            tableData[i].result = data[i].rType === 'nn' ? this.$Global.trasResult(data[i].gameType, data[i].kj) : this.$Global.trasResult(data[i].rType, data[i].kj).split(' ')
            // tableData[i].result = ws2.trasResult(data[i].rType, data[i].kj)
            tableData[i].comment = this.transComment(data[i])
            tableData[i].rType = data[i].rType
            tableData[i].history = data[i].history
            tableData[i].stime = this.transDate(data[i].stime)
            tableData[i].roomId = data[i].roomId
            tableData[i].roomName = data[i].roomName
            tableData[i].gameStatus = data[i].gameStatus
            tableData[i].editStatus = data[i].editStatus
            tableData[i].start_time = this.transDate(data[i].start_time)
            tableData[i].end_time = this.transDate(data[i].end_time)
            tableData[i].result_time = this.transDate(data[i].result_time)
            tableData[i].editAccount = data[i].editAccount
            tableData[i].edit_time = this.transDate(data[i].edit_time)
            tableData[i].str_pai = data[i].str_pai
            tableData[i].memo = data[i].memo
            if (tableData[i].rType === 'nn') {
              if (data[i].kj !== null) {
                // 牛一 至 牛九(a至i)   牛牛,炸弹,无牛(jkl)
                // 0庄赢 1闲赢
                const result = data[i].kj.split('-')
                const result1 = result[0]
                const result2 = result[1].split('')
                const nnResultMap = new Map([
                  ['a', ['牛1']], ['b', ['牛2']], ['c', ['牛3']], ['d', ['牛4']],
                  ['e', ['牛5']], ['f', ['牛6']], ['g', ['牛7']], ['h', ['牛8']],
                  ['i', ['牛9']], ['j', ['牛牛']], ['k', ['炸弹']], ['l', ['无牛']],
                  ['default', ['']]
                ])
                const nnResultList = []
                const replaceNNResult = (r) => {
                  const action = nnResultMap.get(r) || nnResultMap.get('default')
                  nnResultList.push(action[0])
                }
                const nnPreResult = result1.split('')
                nnPreResult.forEach(v => {
                  replaceNNResult(v)
                })
                tableData[i].niuniuResult = nnResultList
                tableData[i].niuniuBetResult = result2
              }
              if (tableData[i].history != null) {
                // 牛一 至 牛九(a至i)   牛牛,炸弹,无牛(jkl)
                // 0庄赢 1闲赢
                const memodata = JSON.parse(tableData[i].history)
                const result = memodata?.old.split('-')
                const result1 = result[0]
                // const result2 = result[1].split('')
                const nnResultMap = new Map([
                  ['a', ['牛1']], ['b', ['牛2']], ['c', ['牛3']], ['d', ['牛4']],
                  ['e', ['牛5']], ['f', ['牛6']], ['g', ['牛7']], ['h', ['牛8']],
                  ['i', ['牛9']], ['j', ['牛牛']], ['k', ['炸弹']], ['l', ['无牛']],
                  ['default', ['']]
                ])
                const nnResultList = []
                const replaceNNResult = (r) => {
                  const action = nnResultMap.get(r) || nnResultMap.get('default')
                  nnResultList.push(action[0])
                }
                const nnPreResult = result1.split('')
                nnPreResult.forEach(v => {
                  replaceNNResult(v)
                })
                tableData[i].niuniuResultMemo = nnResultList
              }
            }
            t = data[i].rType
          }
          rdListForm.totalItemsNum = res.data.total || 0
          this.$store.commit('ht/setRoadList', rdListForm)
          this.$store.commit('ht/setRoadData', res?.data.road)
          this.gameType = t
        } else {
          this.loading = false
          // this.road = ''
          this.gameType = ''
          this.$store.commit('ht/setRoadData', '')
          this.$store.commit('ht/setRoadList', rdListForm)
        }
      }
     }).catch((e)=>{
      this.loading = false
      console.error(e);
     })

    },

    transComment(data) {
      if (data.history === null || data.history === '' || data.history === undefined || !data.history) return ''
      const pdata = JSON.parse(data.history)

      const old_ = this.$Global.trasResult(data.rType, pdata.old)
      const new_ = this.$Global.trasResult(data.rType, pdata.new)

      return { new_: new_, old_: old_ }
    },

    changeJc(cc) {
      this.$nextTick(() => {
        this.$refs.roadRef.clearRoad()
      })
      this.gameType = ''
      this.$store.commit('ht/setRoadData', '')
      this.loading = true
      this.jcValue = cc
      setTimeout(() => {
        this.doFindRoadList()
      }, 1000)
    },

    refreshList() {
      if (this.jcValue !== '' && this.roomTypeValue !== '') {
        this.reSuccess({ success: true })
      } else {
        this.$toast('请选择桌号, 局数')
      }
    },

    reSuccess(val) {
      if (val.success) {
        const cc = this.jcValue
        this.changeJc(cc)
      }
    },


  },
}
</script>

<style>
.van-dropdown-menu__bar{
    height: 40px;
}
/* .van-dropdown-menu__item{
 background: #dddddd;
 height: 40px;
} */
</style>