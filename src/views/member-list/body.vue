<template>
  <div class="memberList">
    <div style="display: flex; justify-content: space-between; flex-wrap: wrap; align-items: center; font-size: 14px;">
      <slot />
      <!-- <Pagination style="margin-right: -20px; margin-top: 4px;" :background="true" :total="memberListFrm.totalItemsNum" :page.sync="currentPage" :limit.sync="pageSize" @pagination="PaginationEvent" /> -->
    </div>
    <div class="py-2">
            <div class="relative overflow-x-auto shadow-md sm:rounded-lg py-2 ">
    <table ref="ListTable" class="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 ">
            <tr>

                <th  scope="col" class="px-6 py-3 whitespace-nowrap">
                  操作项目
                </th>
                <th  v-if="$Global.optioner.UserName === 'admin' && showTable.Id" scope="col" class="px-6 py-3 whitespace-nowrap">
                    ID
                </th>
                <th  scope="col" class="px-6 py-3 whitespace-nowrap">
                  代理账号
                </th>
                <th  scope="col" class="px-6 py-3 whitespace-nowrap">
                  昵称
                </th>
                <!-- <th v-if="showTable.zcb" scope="col" class="px-6 py-3 whitespace-nowrap">
                    占成
                </th>
                <th v-if="showTable.isPf" scope="col" class="px-6 py-3 whitespace-nowrap">
                    配分
                </th> -->
                <th v-if="showTable.gx" scope="col" class="px-6 py-3 whitespace-nowrap">
                  账号关系
                </th>
                <th v-if="this.$Global.gxLength <= 3" scope="col" class="px-6 py-3 whitespace-nowrap">
                  备注
                </th>
                <th  scope="col" class="px-6 py-3 whitespace-nowrap">
                    余额
                </th>
                <th v-if="showTable.xmb"  scope="col" class="px-6 py-3 whitespace-nowrap">
                    未结洗码
                </th>
                <!-- <th v-if="showTable.group_ye"  scope="col" class="px-6 py-3 whitespace-nowrap">
                    群组余额
                </th> -->
                <th v-if="showTable.win_lose" scope="col" class="px-6 py-3 whitespace-nowrap">
                    今日输赢
                </th>
                <th  v-if="showTable.direct_user" scope="col" class="px-6 py-3 whitespace-nowrap">
                    直属数量
                </th>
                <th    v-if="showTable.xmType" scope="col" class="px-6 py-3 whitespace-nowrap">
                    洗码类型
                </th>
                <th    scope="col" class="px-6 py-3 whitespace-nowrap">
                  显示洗码
                </th>
                <th   v-if="showTable.topup_auth" scope="col" class="px-6 py-3 whitespace-nowrap">
                    充值
                </th>
                <th    v-if="showTable.auto_wash" scope="col" class="px-6 py-3 whitespace-nowrap">
                    自动结算
                </th>
                <th     v-if="arrJxb[4] === '1'" scope="col" class="px-6 py-3 whitespace-nowrap">
                    状态
                </th>
            </tr>
        </thead>
        <tbody >
            <tr v-for="(userdata,index) in memberListFrm.tableData" :key="index" class=" border-b border-slate-600   bg-gray-800 ">

                <td class="px-6 py-4 whitespace-nowrap">
                   <div>
                    <span>
                        <van-button
                        v-if="arrJxb[7] === '1'"
                        type="primary"
                        :disabled="userdata.sEnable === '禁用' ? true : false"
                        plain
                        size="mini"
                        @click="handleOptScorePf(scope.$index, userdata,1,'shang')"   >上分</van-button>
                        <van-button
                        v-if="arrJxb[7] === '1'"
                        type="danger"
                        :disabled="userdata.sEnable === '禁用' ? true : false"
                        plain
                        size="mini"
                        @click="handleOptScorePf(userdata, 1,'xia')"
                        >下分</van-button>
                    </span>
                    <van-button
                    v-if="arrJxb[3]==='1'"
                        plain
                        size="mini"
                        :disabled="userdata.sEnable === '禁用' ? true : false"
                        type="warning"
                        style=""
                        @click="handleMemberSetup(userdata)"
                    >修改</van-button>
                    <van-button @click="openShow_More_UserList(userdata)"
                      icon="arrow-down"
                        size="mini"
                        type="warning"
                        style=""
                       
                    >修改</van-button>
                        
                   </div>
                </td>
                <td v-if="$Global.optioner.UserName === 'admin' && showTable.Id" class="px-6 py-4 whitespace-nowrap">
                    {{ userdata.Id }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                <span @click="handleMoreAction(1, userdata)"  style="font-size: 16px;"> {{ userdata.memberAccount }}</span>
                </td>

                <td class="px-6 py-4 whitespace-nowrap">
                  {{ userdata.name }}
                </td>
                <!-- <td  v-if="showTable.zcb" class="px-6 py-4 whitespace-nowrap">
                  {{ userdata.zcb }} %
                </td>
                <td  v-if="showTable.isPf " class="px-6 py-4 whitespace-nowrap">
                    {{ userdata.isPf ? '是' : '否' }}

                </td> -->
                <td  v-if="showTable.gx" class="px-6 py-4 whitespace-nowrap">
                        <span >{{ userdata.gx }}</span>
                </td>
                <td v-if="this.$Global.gxLength <= 3"  class="px-6 py-4 whitespace-nowrap">
                        <span >{{ userdata.memo }}</span>
                </td>
                <td   class="px-6 py-4 whitespace-nowrap">
                    <span style="color: #FF9800;">    {{ userdata.mBalance | toThousandFilter }}</span>
                </td>
                <td v-if="showTable.xmb"  class="px-6 py-4 whitespace-nowrap">
                    <span >   {{ userdata.needXmf | toThousandFilter }}</span>
                </td>
                <!-- <td  v-if="showTable.group_ye" class="px-6 py-4 whitespace-nowrap">
                    <span > {{ fiexeTwo(userdata.group_ye || 0) | toThousandFilter }}</span>
                </td> -->
                <td  v-if="showTable.win_lose" class="px-6 py-4 whitespace-nowrap">
                    <span :class="userdata.win_lose >= 0 ? 'text-blue-500' : 'text-red-500'">{{ fiexeTwo(userdata.win_lose || 0) |
                 toThousandFilter }}</span>
                </td>
                <td   v-if="showTable.direct_user" class="px-6 py-4 whitespace-nowrap">
                    <span style="font-size: 12px">
                       代:{{ userdata.direct_user.a_count || 0 }} 会:{{ userdata.direct_user.p_count || 0 }}
                       </span>

                </td>
                <td   v-if="showTable.xmType" class="px-6 py-4 whitespace-nowrap">
                    <span v-if="userdata.xmKind === '双边'"><span style="color: #2196F3">双边</span>{{ userdata.xmb.split('/')[1] }} %
                    </span>
                  <span v-else><span style="color: #FF9800">单边</span>{{ userdata.xmb.split('/')[0]  }} %</span>

                </td>
                <td  class="px-6 py-4 whitespace-nowrap">
                    <div style="cursor: pointer;">
                    <font v-if="row.show_xm == '1'" @click="setShowXm(row, 0)"><span  style="color: #2196F3; cursor: pointer;" >是</span></font>
                   <font v-else @click="setShowXm(row, 1)"><span style="color: #FF9800; cursor: pointer;">否</span></font>
                  </div>
                </td>
                <td v-if="showTable.topup_auth" class="px-6 py-4 whitespace-nowrap">
                    <div style="cursor: pointer;">
                    <font v-if="userdata.topup_auth " @click="changeTopupAuth(userdata,1)"><span  style="color: #2196F3; cursor: pointer;" >是</span></font>
                   <font v-else @click="changeTopupAuth(userdata,2)"><span style="color: #FF9800; cursor: pointer;">否</span></font>
                  </div>
                </td>

                <td  v-if="showTable.auto_wash" class="px-6 py-4 whitespace-nowrap">
                    <div style="cursor: pointer;">
                        <span v-if="userdata.autoWash === 1">是</span>
                            <span v-else style="color:lightgray">否</span>
                            <span v-if="userdata.autoWash === 1" style="color:gray">
                                {{ userdata.washType === 1 ? '日结' : userdata.washType === 2 ? '周结' :
                                userdata.washType === 3 ? '月结' : '否' }}
                            </span>
                  </div>
                </td>
                <td   v-if="arrJxb[4] === '1'" class="px-6 py-4 whitespace-nowrap">
                    <div>
                        <van-switch size="20" v-model="userdata.sEnable"  active-value="启用"   inactive-value="禁用" @change="changeSwitch(userdata)" />
                   </div>
                </td>

            </tr>
        </tbody>
    </table>
     </div>
          </div>

          <section class="w-full py-2 relative">
        <van-pagination v-model="currentPage" mode="simple" :total-items="memberListFrm.totalItemsNum || 0" :items-per-page="pageSize" @change="PaginationEvent" />
     </section>

    <!-- <div id="menu">
      <ul v-show="rightClickData" style="font-size: 12px">
        <li @click="infoClick">
          <div style="color: lightcoral">{{ $t('buttons.cancel') }}</div>
        </li>

        <li v-if="arrJxb[7]==='1' && !oneUser.isPf" @click="infoClick">
          <div @click="handleOptScore(0, rightClickData,1)">{{ $t('buttons.chargeWithdraw') }}</div>
        </li>
        <li v-if="arrJxb[3]==='1'" @click="infoClick">
          <div @click="handleMemberSetup(0, rightClickData)">{{ $t('buttons.modify') }}</div>
        </li>
        <li v-if="arrJxb[15] === '1'" :disabled="xm_disable" @click="infoClick">
          <div @click="handleMoreAction(0, rightClickData)">{{ $t('buttons.xi_ma') }}</div>
        </li>
        <li @click="infoClick">
          <div @click="handleMoreAction(4, rightClickData)">{{ $t('buttons.kick') }}</div>
        </li>
        <li @click="infoClick">
          <div @click="handleMoreAction(1, rightClickData)">{{ $t('buttons.betting_record') }}</div>
        </li>
        <li @click="infoClick">
          <div @click="handleMoreAction(9, rightClickData)">{{ '洗码结算记录' }}</div>
        </li>
        <li @click="infoClick">
          <div @click="handleMoreAction(2, rightClickData)">{{ $t('buttons.deposit_withdraw_record') }}</div>
        </li>
        <li @click="infoClick">
          <div @click="handleMoreAction(3, rightClickData)">{{ $t('buttons.edit_account_record') }}</div>
        </li>
        <li @click="infoClick">
          <div @click="handleMoreAction(11, rightClickData)">交易流水</div>
        </li>
        <li v-if="rightClickData.mBalance > 0" @click="infoClick">
          <div @click="handelResetToZero(rightClickData)">{{ '账号清零' }}</div>
        </li>
        <li @click="infoClick">
          <div @click="handleRemoveXM(rightClickData)">{{ '洗码清零' }}</div>
        </li>
      </ul>
    </div> -->

    <UpDown ref="updown" :up-down-data="upDownData" @userAction="userAction" />
    <PfUpDown ref="pfupdown" :pf-up-down-data="pfupDownData" @userAction="userAction" />
    <PfUpDownXia ref="pfupdownxia" :pf-up-down-data-xia="pfupDownDataXia" @userAction="userAction" />
    <SetUp ref="setup" :setup-data="setupData" @userAction="userAction" />
    <XM ref="xm" :xm-data="xmData" @xmSuccess="xmSuccess" />
    <RemoveXM ref="rxm" :rxm-data="rxmData" @xmSuccess="xmSuccess" />
    <EditB ref="EditAccountBRef" :del-data="delData" @delEmit="delEmit" />
    <Zero ref="ZeroRef" :zero-data="zeroData" @zeroEmit="zeroEmit" />
    <ShowXM ref="ShowxmRef" :showxm-data="showxmData" :is-show="isShow" @showxmEmit="userAction" />
 
    <van-action-sheet v-if="use_row_data" v-model="showMoreUserBtn" title="修改" style="height: 50%;">
        <div class="relative py-5 px-3">
      
            <div class="flex items-center space-x-2 mt-2">
            <van-button  v-if="arrJxb[15] === '1'" :disabled="xm_disable"  @click="handleMoreAction(0, use_row_data)"  class=" flex-1 h-8 rounded bg-[#4e6c50] text-white"> 洗码结算 </van-button>
            <van-button @click="handleEditAccountB(use_row_data)"  class=" flex-1 h-8 rounded bg-[#4e6c50] text-white"> 删除 </van-button>
            <van-button  @click="handleMoreAction(4, use_row_data)" class=" flex-1 h-8 rounded bg-[#4e6c50] text-white"> 踢出 </van-button>
        </div>
            <div class="flex items-center space-x-2 mt-2 whitespace-nowrap">
            <van-button @click="handleMoreAction(1,use_row_data)"  class=" flex-1 h-8 rounded bg-[#4e6c50] text-white"> 下注记录 </van-button>
            <van-button  @click="handleMoreAction(2, use_row_data)"  class=" flex-1 h-8 rounded bg-[#4e6c50] text-white"> 上下分记录 </van-button>
            <van-button  @click="handleMoreAction(9, use_row_data)"  class=" flex-1 h-8 rounded bg-[#4e6c50] text-white"> 洗码结算记录 </van-button>
        </div>
            <div class="flex items-center space-x-2 mt-2 whitespace-nowrap">
            <van-button @click="handleMoreAction(11, use_row_data)"  class=" flex-1 h-8 rounded bg-[#4e6c50] text-white"> 交易流水 </van-button>
            <van-button  @click="handleMoreAction(3, use_row_data)"  class=" flex-1 h-8 rounded bg-[#4e6c50] text-white"> 操作上下分记录 </van-button>
            <van-button @click="handleMoreAction(12, use_row_data,'')"  class=" flex-1 h-8 rounded bg-[#4e6c50] text-white"> 总报表 </van-button>
        </div>

            <div class="flex items-center space-x-2 mt-2">
            <van-button v-if="use_row_data.mBalance > 0"  @click="handelResetToZero(use_row_data)"  class=" flex-1 h-8 rounded bg-[#4e6c50] text-white"> 账号清零 </van-button>
            <van-button  @click="handleRemoveXM(use_row_data)"  class=" flex-1 h-8 rounded bg-[#4e6c50] text-white"> 洗码清零 </van-button>
        </div>
        </div>
        </van-action-sheet>
  </div>
</template>
<script>
/* eslint-disable */
import UpDown from './member-action/up-down'
import PfUpDown from './member-action/up-down-hj.vue'
import PfUpDownXia from './member-action/up-down-hj-xia.vue'
import SetUp from './member-action/set-up'
import XM from './member-action/xm'
import RemoveXM from './member-action/remove-xm'
import ShowXM from './member-action/show-xm'
import EditB from './member-action/delete.vue'
import Zero from './member-action/to-zero.vue'
import { mapState, mapGetters } from 'vuex'
import { debounce } from '@/utils/index'

export default {
  props: {
    searchPname: {
      type: String,
      default: ''
    },
    showRelation: {
      type: Boolean,
      default: true
    },
    showTable: {
      type: Object,
      default: {}
    }
  },
  components: {
    UpDown,
    PfUpDown,
    PfUpDownXia,
    SetUp,
    XM,
    RemoveXM,
    ShowXM,
    Zero,
    EditB,
  },
  data() {
    return {
      arrJxb: this.$Global.optioner.arrJxb,
      checkSD: this.$Global.optioner.xmType,
      optName: '', // 所有对话框的操作名称
      pageSize: 20, // 页面数据条数只需改这里和上面的page-size
      currentPage: 1,
      loading: false,
      xm_disable: false,
      optionerScore: '',
      // showTable: {
      //   createDate: false,
      //   lastLogin: false,
      //   LastLoginIP: false,
      //   gx: true
      // },
      tableKey: 0,
      form: {
        account: '',
        nikename: ''
      },
      isSearch: false,
      hideRela: false,
      // eslint-disable-next-line
      eData: {},
      showxmData: {},
      isShow: 0,
      upDownData: {
        relation:{}
      },
      pfupDownData: {
        relation: {}
      },
      pfupDownDataXia: {
        relation: {}
      },
      delData: {},
      setupData: {},
      xmData: {},
      rxmData: {},
      zeroData: {},
      rightClickData: {},
      showMoreUserBtn:false,
      use_row_data:null

    }
  },
  computed: {
    ...mapState({
      sidebar: state => state.app.sidebar,
      memberListFrm: state => state.ht.memberListForm,
      relation: state => state.ht.relations,
      oneUser: state => state.ht.userList,
      isSub: state => state.user.isSubAccount,
      subInfo: state => state.user.subInfo
    }),
    ...mapGetters(['SEARCH_MEMBER_OK', 'token', 'PLL_ISLOADING'])
  },
  watch: {
    SEARCH_MEMBER_OK: function(n) {
      if (n) {
        this.searchOK()
      }
    },
    PLL_ISLOADING: function(val) {
      if (val === 1 ) this.loading = false
    }
  },

  methods: {
    openShow_More_UserList(data){
        console.log(data,"row_data ************")
        this.use_row_data = data
        this.showMoreUserBtn = true
    },
    handleEditAccountB(row) {
      this.delData = {}
      if (!row) return
      this.delData = JSON.parse(JSON.stringify(row))
      this.$nextTick(() => {
        this.$refs.EditAccountBRef.dialogFormVisible = true
      })
    },
    handelResetToZero(row) {
      this.zeroData = {}
      if (!row) return
      this.zeroData = JSON.parse(JSON.stringify(row))
      this.$nextTick(() => {
        this.$refs.ZeroRef.dialogFormVisible = true
      })
    },
    setShowXm(row, show) {
      this.showxmData = {}
      if (!row) return
      this.isShow = show
      this.showxmData = JSON.parse(JSON.stringify(row))
      this.$nextTick(() => {
        this.$refs.ShowxmRef.dialogFormVisible = true
      })
    },
    copyAccount(row) {
      /* Copy the text inside the text field */
      // navigator.clipboard.writeText(value)
      this.$toast('复制成功')
      var data = JSON.parse(JSON.stringify(row))
      var oInput = document.createElement('input')
      oInput.value = data.memberAccount
      document.body.appendChild(oInput)
      oInput.select()
      document.execCommand('Copy')
      oInput.className = 'oInput'
      oInput.style.display = 'none'
      // this.$message({
      //   type: 'success',
      //   message: this.$t('message.copy_success')
      // })
    },
    userAction(e) {
      if (e.name === 'UPDOWN_OK_PLAYER' || e.name === 'PF_SUCCESS' || e.name === 'MODIFY_SUCCESS') {
        // this.getOneUser()
        // this.doGetUser(this.form.account)
        // console.log('pf_success ', e.name)
        this.$emit('playerAction', { name: e.name })
      }
    },
    delEmit(val) {
      if (val) {
        this.$emit('playerAction', { name: 'del' })
      }
    },
    zeroEmit(val) {
      if (val) {
        this.$emit('playerAction', { name: 'zero' })
      }
    },
    showTreeMoreAction() {
      this.$store.commit('ht/setShowTreeMoreState', false)
    },
    searchOK() {
      this.$store.commit('ht/setSearchMemberState', false)
      if (this.memberListFrm.tableData[0] && this.isSearch) {
        // this.$refs.agentTree.searchRelatn(this.memberListFrm.tableData[0].upperAgent || '')
        this.isSearch = false
      }
      if (this.relation.length <= 0) {
        this.$store.commit('ht/setRelations', [this.$Global.optioner.UserName])
      }
    },
    treeAction($event) {
      if ($event.action === 'getOwnData') {
        this.getMemberList($event.value)
      } else if ($event.action === 'getHisAgent') {
        this.getHisAgent($event.value)
      } else if ($event.action === 'hideRelation') {
        this.doHideRelation($event.value)
      }
    },
    getHisAgent(node) {
      return this.$router.push({
        path: '/manageUser/agent-list',
        query: {
          name: node.label
        }
      })
    },
    toHisAgent(acc) {
      this.$router.push({
        path: '/manageUser/agent-list',
        query: {
          name: acc
        }
      })
    },
    doHideRelation(hide) {
      this.hideRela = hide ? false : true
      this.showTable.gx = hide ? true : false
    },
    xmSuccess(acc) {
      // console.log(this.memberListFrm.tableData.length)
      // this.$emit('playerAction', {name: 'XM_SUCCESS_PLAYER'})
      let sendStr = {}
      if (this.memberListFrm.tableData.length > 1) {
        this.reqt({ name: this.relation[this.relation.length - 1], pageSize: this.pageSize, currentPage: this.currentPage })
      } else {
        sendStr = {
        router: 'GetMemberInfo',
          JsonData: {
            opt_name: this.$Global.optioner.UserName,
            name: this.$Global.optioner.UserName,
            Id: this.$Global.optioner.Id, // 查找时不归selectAgent
            findname: acc,
            nikename: '',
            pageSize: this.pageSize,
            currentPage: this.currentPage
          }
        }
        this.loading = true
        this.$store.state.ht.memberListForm.state = 0
        this.$pomelo.send(sendStr)
        this.$store.commit('ht/setSearchMemberState', false)
      }
      // console.log('sendStr ', sendStr)
    },
    getMemberList(value) {
      this.currentPage = 1
      this.reqt({ name: value, pageSize: this.pageSize, currentPage: this.currentPage })
    },
    // 限制输入特殊字符
    btKeyUp(e) {
      e.target.value = e.target.value.replace(/[`~!#$%^&*()\-+=<>?:'{}|,.\/;'\\[\]·~！#￥%……&*（）\-+={}|《》？：“”【】、；‘’，。、]/g, '')
    },
    handleOptScorePf(index, row, n, type) {
      if (this.$Global.optioner.arrJxb[7] === '0') return this.$toast(`抱歉! 您没有该权限! 请联系上级!`)
      this.$pomelo.send({
        router: 'getOptScoreRecord',
        JsonData: { name: row.memberAccount, Id: this.$Global.optioner.Id }
      })
      const sendStr1 = {
        router: 'getDesScoreAgent',
        JsonData: {
          Id: row.Id,      // 加减分对象Id
          optId: this.$Global.optioner.Id,     // 操作员Id
        }
      }
      this.$pomelo.sendcb(sendStr1, res => {
        if (res.JsonData.length > 0) {
          this.$nextTick(() => {
            if (type == 'shang') {
              this.pfupDownData = row
              this.pfupDownData.relation = res.JsonData
              this.$refs.pfupdown.dialogFormVisible = true
            }

            if (type == 'xia') {
              this.pfupDownDataXia = row
              this.pfupDownDataXia.relation = res.JsonData
              this.$refs.pfupdownxia.dialogFormVisible = true
            }
            
          })
        } else {
          return this.$toast('操作失败')
        }
      })
    },
    handleOptScore(index, row, n) {
      if (this.$Global.optioner.arrJxb[7] === '0') return this.$toast(`抱歉! 您没有该权限! 请联系上级!`)
      this.$pomelo.send({
        router: 'getOptScoreRecord',
        JsonData: { name: row.memberAccount, Id: this.$Global.optioner.Id }
      })
      const sendStr1 = {
        router: 'getDesScoreAgent',
        JsonData: {
          Id: row.Id,      // 加减分对象Id
          optId: this.$Global.optioner.Id,     // 操作员Id
        }
      }
      this.$pomelo.sendcb(sendStr1, res => {
        if (res.JsonData.length > 0) {
          this.$nextTick(() => {
            this.upDownData = row
            this.upDownData.relation = res.JsonData
            this.$refs.updown.dialogFormVisible = true
          })
        } else {
          return this.$toast('操作失败')
        }
      })
    },
    handleMemberSetup(index, row) {
      // if (this.$Global.optioner.arrJxb[3] === '0') return this.$message.warning(`${this.$t('message.you_do_not_have_this_permission')}`)
      // // const frm = this.memberSetupDigFrm
      // // frm.MemberSetupDigFrmVisible = true
      const sendStr = {
        router: 'getReferenceInfo',
        JsonData: { name: row.reference_name }
      }
      this.$pomelo.send(sendStr)
      setTimeout(() => {
        this.setupData = JSON.parse(JSON.stringify(row))
        // console.log('this.setupdata ....... ', this.setupData)
        this.$refs.setup.dialogFormVisible = true
      }, 500)
    },
    handleMemberKick(row) {
      const name = row.memberAccount
      const Id = row.Id
      this.$dialog.confirm({title:'您确定要踢出' + '  ' + name + '吗?', 
      })
        .then(() => {
          var sendStr = {
            router: 'kickMember',
            JsonData: { Id: Id, name: name, level: 3 }
          }
          this.$pomelo.send(sendStr)
          // console.log('kickMember: ', sendStr)
        })
        .catch(() => {})
    },
    handleXM(row) {
      const sendStr = {
        router: 'getXmInfo',
        JsonData: {
          level: 3,
          userId: row.Id,
          optname: this.$Global.optioner.UserName,
          token: this.token,
          proxyname: this.isSub ? this.subInfo.name : ''
        }
      }
      this.xm_disable = true
      this.$pomelo.sendcb(sendStr, res => {
        this.xm_disable = false
        const data = res.JsonData
        if (data.code && data.code === 1002) {
          this.$toast('登录时效已过期，请重新登录')
          setTimeout(() => {
            localStorage.removeItem('_SinDds_')
            window.location.reload()
          }, 1000)
          return
        }
        if (data.result === 'ok') {
          const setData = {
            curXmTime: this.transTime(data.curXmTime),
            curXmf: data.curXmf,
            // eslint-disable-next-line
            lastXmTime: data.lastXmTime != null ? this.transTime(data.lastXmTime) : '',
            prevXmTime: this.transTime(data.prevXmTime),
            // eslint-disable-next-line
            xm_type: data.xm_type == 0 ? '双边' : '单边',
            xmb_d: data.xmb_d || 0,
            xmb_s: data.xmb_s || 0,
            xml_d: data.xml_d || 0,
            xml_s: data.xml_s || 0,
            turnover: data.turnover || 0
          }
          // console.log('setData ', setData)
          this.$store.commit('ht/setGotXmInfo', setData)

          this.xmData = JSON.parse(JSON.stringify(row))
          this.$refs.xm.dialogFormVisible = true
        } else {
          this.$toast('获取洗码费失败!')
        }
      })
    },
    handleRemoveXM(row) {
      const sendStr = {
        router: 'getXmInfo',
        JsonData: {
          level: 3,
          userId: row.Id,
          optname: this.$Global.optioner.UserName,
          token: this.token,
          proxyname: this.isSub ? this.subInfo.name : ''
        }
      }
      this.xm_disable = true
      this.$pomelo.sendcb(sendStr, res => {
        this.xm_disable = false
        const data = res.JsonData
        if (data.code && data.code === 1002) {
          this.$toast('登录时效已过期，请重新登录')
          setTimeout(() => {
            localStorage.removeItem('_SinDds_')
            window.location.reload()
          }, 1000)
          return
        }
        if (data.result === 'ok') {
          const setData = {
            curXmTime: this.transTime(data.curXmTime),
            curXmf: data.curXmf,
            // eslint-disable-next-line
            lastXmTime: data.lastXmTime != null ? this.transTime(data.lastXmTime) : '',
            prevXmTime: this.transTime(data.prevXmTime),
            // eslint-disable-next-line
            xm_type: data.xm_type == 0 ? '双边' : '单边',
            xmb_d: data.xmb_d || 0,
            xmb_s: data.xmb_s || 0,
            xml_d: data.xml_d || 0,
            xml_s: data.xml_s || 0,
            turnover: data.turnover || 0
          }
          // console.log('setData ', setData)
          this.$store.commit('ht/setGotXmInfo', setData)

          this.rxmData = JSON.parse(JSON.stringify(row))
          this.$refs.rxm.dialogFormVisible = true
        } else {
          this.$toast('获取洗码费失败!')
        }
      })
    },
    changeTopupAuth(row) {
      // console.log('editTopupAuth row ', row)
      const row_ = JSON.parse(JSON.stringify(row))
      const sendStr = {
        router: 'editTopupAuth',
        JsonData: {
          Id: row_.Id,
          name: row_.memberAccount,
          nikename: row_.name || '',
          level: row_.level,
          ip: this.$store.state.ht.ip || '',
          optName: this.$Global.optioner.UserName,
          proxyname: this.isSub ? this.subInfo.name : '',
          topup_auth: row_.topup_auth ? 0 : 1
        }
      }
      this.$pomelo.sendcb(sendStr, res => {
        if (res && res.msg === 'success' && res.router === 'editTopupAuth') {
          this.$toast('修改成功')
          this.$emit('playerAction', { name: 'EDIT_TOPUP' })
        } else {
          this.$toast('修改失败！')
        }
      })
    },
    transTime(times) {
      this.$moment.suppressDeprecationWarnings = true
      return this.$moment(times).format('YYYY-MM-DD HH:mm:ss')
    },
    handleMoreAction(action, row) {
      switch (action) {
        case 0:
          this.handleXM(row)
          break
        case 1:
          // this.goPage('/recordsPage/bet-records', { name: row.memberAccount })
          this.goPageParams('BetRecords', { name: row.memberAccount })
          break
        case 2:
          // this.goPage('/recordsPage/access-records', { name: row.memberAccount })
          this.goPageParams('AccessRecords', { name: row.memberAccount })
          break
        case 3:
          // this.goPage('/recordsPage/account-change-records', { name: row.memberAccount })
          this.goPageParams('AccountChangeRecords', { name: row.memberAccount })
          break
        case 4:
          this.handleMemberKick(row)
          break
        case 9:
        this.goPageParams('WashRecords', { name: row.memberAccount })
          // this.$router.push({
          //   name: `WashRecords`,
          //   params: {
          //     name: row.memberAccount
          //   }
          // })
          break
        case 11:
        this.goPageParams('MoneyRecords', { name: row.memberAccount })
          break
        case 12:
        this.goPageParams('ReportsPage', { name: row.memberAccount })
          break
      }
    },
    goPage(router, query) {
      this.$router.push({
        path: `${router}`,
        query: query
      })
    },
    goPageParams(name, params) {
      this.$router.push({
        name: name,
        params: params
      })
    },
    reqt({name, pageSize, currentPage}) {
      if (this.arrJxb[1] !== '1'){
        this.$toast('抱歉! 您没有该权限! 请联系上级!')
        this.loading = false
        return
      }
      const sendStr = {
        router: 'GetMemberInfo',
        JsonData: {
          name: name,
          pageSize: pageSize,
          currentPage: currentPage
        }
      }
      this.loading = true
      this.$store.state.ht.memberListForm.state = 0
      this.$pomelo.send(sendStr)
    },
    reqtRefresh({ name }) {
      if (this.arrJxb[1] !== '1'){
        this.$toast('抱歉! 您没有该权限! 请联系上级!')
        this.loading = false
        return
      }
      const sendStr = {
        router: 'GetMemberInfo',
        JsonData: {
          name: name,
          pageSize: this.pageSize,
          currentPage: this.currentPage
        }
      }
      this.loading = true
      this.$store.state.ht.memberListForm.state = 0
      this.$pomelo.send(sendStr)
    },
    doFindMember(name) {
      if (this.arrJxb[1] !== '1'){
        this.$toast('抱歉! 您没有该权限! 请联系上级!')
        this.loading = false
        return
      }
      this.isSearch = true
      var sendStr = {
        router: 'GetMemberInfo',
        JsonData: {
          opt_name: this.$Global.optioner.UserName,
          name: this.$Global.optioner.UserName,
          Id: this.$Global.optioner.Id, // 查找时不归selectAgent
          findname: name,
          nikename: this.form.nikename,
          pageSize: this.pageSize,
          currentPage: 1
        }
      }
      this.loading = true
      this.$store.state.ht.memberListForm.state = 0
      // console.log(sendStr, 'do find member ... ')
      this.$pomelo.send(sendStr)
      this.$store.commit('ht/setSearchMemberState', false)
    },
    doRefreshMember: debounce( function() {
      this.form.account = ''
      this.form.nikename = ''
      this.reqt({ name: this.$Global.optioner.UserName, pageSize: this.pageSize, currentPage: this.currentPage })
      this.$store.commit('ht/setSearchMemberState', false)
    }, 1000, true),
    PaginationEvent(props) {
      this.currentPage = page
      this.reqt({ name: this.relation[this.relation.length - 1], pageSize: this.pageSize, currentPage: this.currentPage })
    },
    handlePagination(props) {
      props.action === 'limit' ? this.currentPage = 1 : this.currentPage = props.page
      this.pageSize = props.limit
      this.reqt({ name: this.relation[this.relation.length - 1], pageSize: this.pageSize, currentPage: this.currentPage })
    },
    changeSwitch(data) {
      if (this.$Global.optioner.arrJxb[4] === '0') return this.$toast('抱歉! 您没有该权限! 请联系上级!')

      var n = data.sEnable === '禁用' ? 0 : 1
      const sendStr = {
        router: 'setUserState',
        JsonData: {
          name: data.memberAccount,
          state: n,
          opt_name: this.$Global.optioner.UserName,
          Id: this.$Global.optioner.Id,
          level: this.$Global.optioner.level
        }
      }
      // console.log('send ', sendStr)
      this.$pomelo.sendcb(sendStr, res => {
        // console.log('changestate ', res)
        if (res?.JsonData?.result === 'ok') {
          this.$toast(res.JsonData?.msg)
        } else {
          data.sEnable = n === 1 ? 0 : 1
          this.$toast(res?.JsonData?.msg)
        }
      })
    },

    // 自定义菜单的点击事件
    infoClick(index) {
      var menu = document.querySelector('#menu')
      if (menu) menu.style.display = 'none'
    },
    // 右键点击事件
    rightClick(row, column, event) {
      // var menu = document.querySelector('#menu')
      // event.preventDefault()
      // // 获取我们自定义的右键菜单
      // // 根据事件对象中鼠标点击的位置，进行定位
      // const add_width = this.sidebar.opened ? 210 : 45 // sidebar 开启时要得减去多一点
      // menu.style.left = event.clientX - add_width + 'px'
      // menu.style.top = event.clientY + 'px'
      // // 改变自定义菜单的隐藏与显示
      // menu.style.display = 'block'
      // console.log(row, column)

      const menu = document.querySelector('#menu')
      event.preventDefault()
      const mouseX = event.clientX
      const mouseY = event.clientY
      const boundsX = window.innerWidth
      const boundsY = window.innerHeight
      const menuHeight = menu.scrollHeight
      const menuWidth = menu.scrollWidth
      let top
      let left
      const scrollTop = (document.documentElement && document.documentElement.scrollTop) ? document.documentElement.scrollTop : document.body.scrollTop
      if (mouseY + menuHeight > boundsY) {
        const topH = mouseY - menuHeight + scrollTop
        const menuTop = mouseY - menuHeight
        if (topH > 0 && menuTop > 0) {
          top = topH
        } else {
          top = mouseY + scrollTop
        }
      } else {
        top = mouseY + scrollTop
      }
      const scrollLeft = (document.documentElement && document.documentElement.scrollLeft) ? document.documentElement.scrollLeft : document.body.scrollLeft
      if ((mouseX + menuWidth > boundsX) && ((mouseX - menuWidth) > 0)) {
        left = mouseX - menuWidth + scrollLeft
      } else {
        left = mouseX + scrollLeft
      }
      const add_width = this.sidebar.opened ? 210 : 45 // sidebar 开启时要得减去多一点
      left -= add_width
      const parentOffsetTop = event.currentTarget.parentElement.offsetTop
      const parentOffsetLeft = event.currentTarget.parentElement.offsetLeft
      menu.style.top = top - parentOffsetTop + 'px'
      menu.style.left = left - parentOffsetLeft + 'px'
      // 改变自定义菜单的隐藏与显示
      menu.style.display = 'block'
      this.rightClickData = JSON.parse(JSON.stringify(row))
      // 获取当前右键点击table下标
      this.memberListFrm.tableData.forEach((item, index) => {
        if (item.bugid === row.id) {
          // 这里判断相等的条件可以自己改为该行数据的唯一键
          this.currentRowIndex = index
          return false
        }
      })
      // this.setCurrent(row)
    },
    // setCurrent(row) {
    //   console.log('高亮' + row)
    //   this.$refs.singleTable.setCurrentRow(row)
    // },

    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 === 1) {
        return 'color-row'
      }
      return ''
    },
    excelExport() {
      this.eData = {
        tHeader: ['会员ID','会员账号', '昵称', '洗码类型', '所属代理', '当前余额', '洗码比(单/双)%', '状态', '开户日期'],
        filterVal: ['Id', 'memberAccount', 'name', 'xmKind', 'upperAgent', 'mBalance', 'xmb', 'sEnable', 'createDate'],
        list: this.memberListFrm.tableData
      }
      if (this.memberListFrm.tableData === undefined) {
        return
      }
      this.$refs.excel.excleForm = true
    },
    tableCellClick(row, column, cell, event) {
      if (column.property == 'memberAccount') {
        /* Copy the text inside the text field */
        // navigator.clipboard.writeText(value)copier_account
        this.$message.closeAll()
        this.$message.success('复制成功')
        var data = JSON.parse(JSON.stringify(row))
        var oInput = document.createElement('input')
        oInput.value = data.memberAccount
        document.body.appendChild(oInput)
        oInput.select()
        document.execCommand('Copy')
        oInput.className = 'oInput'
        oInput.style.display = 'none'
        // this.$message({
        //   type: 'success',
        //   message: this.$t('message.copy_success')
        // })
      }
    },
    changeCellStyle(row, column, rowIndex, columnIndex) {
      if (row.column.property === 'mBalance' || row.column.property === 'xmb' || row.column.property === 'win_lose') {
        return 'padding-right: 10px !important; text-align: right;'
      }
    }
  }
}
</script>

<style scoped>
.el-button-opt {
  width: 60px;
  height: 25px;
  padding: 1px;
  margin: 1px;
}
.el-pagination {
  float: right;
  min-width: 200px;
}
</style>

<style scoped>
#menu {
  position: absolute;
  display: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  background: #ffffff;
  cursor: pointer;
  color: #606266;
  width: 500px;
  border: 1px solid #e4e7ed;
  /* margin: 50px auto; */
  font-size: 13px;
}

#menu ul {
  list-style: none;
  width: 100%;
  margin: 0px;
  padding: 0px;
  display: flex;
  flex-wrap: wrap;
}

#menu ul li {
  padding: 0px 2px;
  width: 20%;
  height: 30px;
  line-height: 30px;
  position: relative;
  box-sizing: border-box;
  text-indent: 8px;
}
#menu ul li .iconfont {
  float: right;
}

#menu ul li ul {
  display: none;
  position: absolute;
  left: 200px;
  top: 0px;
  width: 200px;
  border: 1px solid #e4e7ed;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}

#menu ul li ul li {
  background-color: #fff;
}

#menu ul li:hover {
  background-color: #ecf5ff;
}

#menu ul li:hover ul {
  display: block;
}
</style>
