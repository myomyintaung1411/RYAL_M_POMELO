import Vue from 'vue'
import Vuex from 'vuex'
import AES from '@/api/aes'
import $Global from '@/api/global'
Vue.use(Vuex)

/* 测试数据 */
const myCenterForm = {
  // 个人首页参数
  userValue: [
    {
      name: '',
      level: '2',
      zcb: '0',
      xmb: '0',
      ye: '0',
      loginTime: '2016-06-02',
      loginIp: '127.0.0.1'
    }
  ],
  userState: [
    {
      memberOnLineNum: 0,
      ownMemberBalance: 0,
      otherMemberBalance: 0,
      memberBalance: 0,
      agentBalance: 0
    }
  ],
  totalAgentNum: 0,
  totalMemberNum: 0,
  memberAddNum: 0,
  agentAddNum: 0
}
const balanceList = { tableData: [], totalItemsNum: 0, state: 0 } // 搜索列表
const washSummaryList = { tableData: [], totalItemsNum: 0, state: 0 } // 搜索列表
const searchList = { tableData: [], totalItemsNum: 0, state: 0 } // 搜索列表
const userList = { tableData: [], totalItemsNum: 0, state: 0 } // 搜索列表
const agentAdminForm = { tableData: [], totalItemsNum: 0, state: 0 } // 代理列表
const addscoreDigFrm2 = { optionerScore: 0, name: '', turnover: 0 } // 代理加减分数框数据
const memberListForm = { tableData: [], totalItemsNum: 0, state: 0 }
const chatmemberListData = { chatmemberListData: [], totalItemsNum: 0 }
const memberTotalListForm = { tableData: [], totalItemsNum: 0, state: 0 } // 会员汇总表
const agentTotalListForm = { tableData: [], totalItemsNum: 0, state: 0 } // 会员汇总表
const memberTradeForm = { tableData: [], totalItemsNum: 0, state: 0, xml_d: 0, xml_s: 0, yl: 0, yxxz: 0 }
const hgListForm = { tableData: [] }
const treeData = { tableData: [] }
const betOrderInquireForm = { tableData: [], totalItemsNum: 0, totalUser: 0, totalBet: 0 }
const reportForm = {
  tableData1: [],
  tableData2: [],
  tableData3: [],
  tableData4: [],
  tableData5: [],
  agents: [],
  state: 0,
  totalItemsNum1: 0,
  totalItemsNum2: 0
}
const accountRecordForm = { tableData: [], totalItemsNum: 0, state: 0 }
const systemRecordForm = { tableData: [], totalItemsNum: 0, state: 0 }
const washRecordForm = { tableData: [], count: 0, total_turn_amount: 0, total_real_amount: 0 }
const depositRecordForm = { tableData: [], totalItemsNum: 0, state: 0 }
const withdrawRecordForm = { tableData: [], totalItemsNum: 0, state: 0 }
const loginRecordForm = { tableData: [], totalItemsNum: 0, state: 0 }
const accountChangeRecordForm = { tableData: [], totalItemsNum: 0, state: 0 }
const bannleImgForm = { tableData: [] }
const referenceInfo = { ye: 0, zcb: 0, xmb_s: 0, xmb_d: 0 }

const state = {
  WS_MSG: null,
  login: false, // 是否登录
  myInfo: {},
  myCenterForm: myCenterForm,
  balanceList: balanceList,
  washSummaryList: washSummaryList,
  searchList: searchList,
  userList: userList,
  agentAdminForm: agentAdminForm,
  addscoreDigFrm2: addscoreDigFrm2,
  memberListForm: memberListForm,
  chatmemberListData: chatmemberListData,
  memberTotalListForm: memberTotalListForm,
  agentTotalListForm: agentTotalListForm,
  memberTradeForm: memberTradeForm,
  hgListForm: hgListForm,
  reportForm: reportForm,
  betOrderInquireForm: betOrderInquireForm,
  accountRecordForm: accountRecordForm,
  systemRecordForm: systemRecordForm,
  washRecordForm: washRecordForm,
  depositRecordForm: depositRecordForm,
  withdrawRecordForm: withdrawRecordForm,
  loginRecordForm: loginRecordForm,
  accountChangeRecordForm: accountChangeRecordForm,
  tableList: { tableData: [], totalItemsNum: 0 },
  roadList: { tableData: [], totalItemsNum: 0 },
  roadData: '',
  tableJc: [],
  bulletinListData: [],
  tradeBetMx: '',
  xm_ok: false,
  xm_pw_ok: false,
  edit_pw_ok: false,
  updown_ok: false,
  updown_ok_player: false,
  modify_ok: false,
  modify_player_ok: false,
  edit_member_ok: false,
  edit_my_member_ok: false,
  search_member_ok: false,
  edit_hg_ok: false,
  agentLimit: '', // 荷官
  optionerScore: '',
  treeData: treeData,
  bannleImgForm: bannleImgForm,
  referenceInfo: referenceInfo,
  ip: '',
  gk_info: '',
  options: [],
  activeIndex: '/user',
  relations: [],
  gotXmInfo: {},
  lastXmState: false,
  lastXmStatePlayer: false,
  showTreeMoreState: false,
  agentAllInfo: [],
  onlineUserList: [],
  newTreeData: [],
  withdrawTodoCount: 0,
  onlineUserCount: 0,
  lcount: 0,
  tglinks: {
    l1: '',
    l2: '',
    l3: ''
  },
  dashboardOwnData: {},
  serviceList: [],
  searchServiceList: [],
  updownRecordForm: { tableData: [], count: 0, total_turn_amount: 0, total_real_amount: 0 },
  tableTotalRecord: { tableData: [], count: 0, total: {}},
  waterMoneyRecordForm: { tableData: [], count: 0, total_amount: 0 },
  phoneUserList: { tableData: [], totalItemsNum: 0 },
  excelTradeData: []
  // searchAgentInfo: {tableData: [], totalItemsNum: 0},
  // mainAgentInfo: {},
  // searchMain: ''
}

const mutations = {
  SetExcelTradeData(state, payload) {
    if (payload.num === 1) {
      state.excelTradeData = payload.data
    } else {
      const arr2 = [].concat(state.excelTradeData, payload.data)
      state.excelTradeData = arr2
    }
  },
  SetTuiGuangLink(state, payload) {
    // console.log('gtttttttttttttttt ', payload)
    state.tglinks.l1 = `http://${payload[0]}?InvCode=${$Global.optioner.referralCode}`
    state.tglinks.l2 = `http://${payload[1]}?InvCode=${$Global.optioner.referralCode}`
    state.tglinks.l3 = `http://${payload[2]}?InvCode=${$Global.optioner.referralCode}`
  },
  setDashboardOwnData(state, payload) {
    state.dashboardOwnData = payload
  },
  setMyInfo(state, payload) {
    state.myInfo = payload
  },
  setEditHgState(state, payload) {
    state.edit_hg_ok = payload
  },
  setAddMemberState(state, payload) {
    state.edit_member_ok = payload
  },
  setAddMyMemberState(state, payload) {
    state.edit_my_member_ok = payload
  },
  setSearchMemberState(state, payload) {
    state.search_member_ok = payload
  },
  setEditPwState(state, payload) {
    state.edit_pw_ok = payload
  },
  setUpDownState(state, payload) {
    state.updown_ok = payload
  },
  setUpDownPlayerState(state, payload) {
    state.updown_ok_player = payload
  },
  setModifiyState(state, payload) {
    state.modify_ok = payload
  },
  setModifiyPlayerState(state, payload) {
    state.modify_player_ok = payload
  },
  setXmPwOk(state, payload) {
    state.xm_pw_ok = payload
  },
  setXmState(state, payload) {
    state.xm_ok = payload
  },
  setAuth(state, payload) {
    state.login = payload
  },
  setBannleImgForm(state, payload) {
    state.bannleImgForm = payload
  },
  setReferenceInfo(state, payload) {
    state.referenceInfo = payload
  },
  setIp(state, payload) {
    state.ip = payload
  },
  setOptionScore(state, payload) {
    state.optionerScore = payload
  },
  setAgentLimit(state, payload) {
    state.agentLimit = payload
  },
  setTreeData(state, payload) {
    state.treeData = payload
  },
  setTradeBetMx(state, payload) {
    state.tradeBetMx = payload
    state.memberTradeForm.state = 1
  },
  setAddscoreDigFrm(state, payload) {
    Object.assign(state.addscoreDigFrm2, payload)
  },
  setMyCenterForm(state, payload) {
    Object.assign(state.myCenterForm, payload)
    const strInfo = JSON.stringify({
      login_id: payload.userValue[0].loginId,
      login_token: payload.userValue[0].token
    })
    if (payload.userValue[0].token) {
      const en = $Global.en
      localStorage.setItem('_SinDds_', AES.encrypt(strInfo, en))
      state.login = true
    }
  },
  setSearchList(state, payload) {
    state.searchList = payload
  },
  setBalanceList(state, payload) {
    state.balanceList = payload
  },
  setWashSummaryList(state, payload) {
    state.washSummaryList = payload
  },
  setUserList(state, payload) {
    state.userList = payload
  },
  setAgentAdminForm(state, payload) {
    Object.assign(state.agentAdminForm, payload)
  },
  // setAgentAdminFormNull(state, payload) {
  //   state.agentAdminForm = payload
  // },
  setMemberListForm(state, payload) {
    Object.assign(state.memberListForm, payload)
  },
  setChatMemberListData(state, payload) {
    state.chatmemberListData = payload
  },
  setMemberTotalListForm(state, payload) {
    Object.assign(state.memberTotalListForm, payload)
  },
  setAgentTotalListForm(state, payload) {
    Object.assign(state.agentTotalListForm, payload)
  },
  setMemberTradeForm(state, payload) {
    Object.assign(state.memberTradeForm, payload)
  },
  setHgListForm(state, payload) {
    Object.assign(state.hgListForm, payload)
  },
  setReportForm(state, payload) {
    Object.assign(state.reportForm, payload)
  },
  setBetOrderInquireForm(state, payload) {
    Object.assign(state.betOrderInquireForm, payload)
  },
  setAccountRecordForm(state, payload) {
    Object.assign(state.accountRecordForm, payload)
  },
  setSystemRecordForm(state, payload) {
    // console.log('payload ', payload)
    Object.assign(state.systemRecordForm, payload)
  },
  setWashRecordForm(state, payload) {
    state.washRecordForm = payload
  },
  setLoginRecordForm(state, payload) {
    Object.assign(state.loginRecordForm, payload)
  },
  setAccountChangeRecordForm(state, payload) {
    Object.assign(state.accountChangeRecordForm, payload)
  },
  setTableList(state, payload) {
    state.tableList = payload
  },
  setRoadList(state, payload) {
    state.roadList = payload
  },
  setRoadData(state, payload) {
    state.roadData = payload
  },
  setTableJc(state, payload) {
    state.tableJc = payload
  },
  recSckMsg(state, payload) {
    state.socketMessage = payload
  },
  sendMsg(state, payload) {
    const sendStr = JSON.stringify(payload)
    state.WS.send(sendStr)
  },
  setRelations(state, payload) {
    state.relations = payload
  },
  setGotXmInfo(state, payload) {
    state.gotXmInfo = payload
  },
  setLastXmState(state, payload) {
    state.lastXmState = payload
  },
  setLastXmStatePlayer(state, payload) {
    state.lastXmStatePlayer = payload
  },
  setShowTreeMoreState(state, payload) {
    state.showTreeMoreState = payload
  },
  setWithdrawToDoCount(state, payload) {
    state.withdrawTodoCount = payload
  },
  setOnlineUserCount(state, payload) {
    state.onlineUserCount = payload
  },
  setLCount(state, payload) {
    state.lcount = payload
  },

  // 公告
  setBulletinListData(state, payload) {
    state.bulletinListData = payload
  },
  // 添加tabs
  add_tabs(state, data) {
    state.options.push(data)
  },
  // 删除tabs
  delete_tabs(state, route) {
    let index = 0
    for (const option of state.options) {
      if (option.route === route) {
        break
      }
      index++
    }
    state.options.splice(index, 1)
  },
  // 设置当前激活的tab
  set_active_index(state, index) {
    state.activeIndex = index
  },
  setAgentAllInfo(state, payload) {
    state.agentAllInfo = payload
  },
  setOnlineUserList(state, payload) {
    state.onlineUserList = payload
  },
  setDepositRecord(state, payload) {
    state.depositRecordForm = payload
  },
  setWithdrawRecord(state, payload) {
    state.withdrawRecordForm = payload
  },
  SET_SERVICE_LIST(state, payload) {
    state.serviceList = payload
  },
  SET_SEARCH_SERVICE_LIST(state, payload) {
    state.searchServiceList = payload
  },
  setUpDown(state, payload) {
    state.updownRecordForm = payload
  },
  setTableWinLose(state, payload) {
    state.tableTotalRecord = payload
  },
  setWaterMoney(state, payload) {
    state.waterMoneyRecordForm = payload
  },
  setPhoneUser(state, payload) {
    state.phoneUserList = payload
  }
  // setMainAgentInfo(state, payload) {
  //   state.mainAgentInfo = payload
  // },
  // setSearchAgentInfo(state, payload) {
  //   state.searchAgentInfo = payload
  // }
}

// const getters = {
//   EDIT_MEMBER_OK: state => state.edit_member_ok
// }

export default {
  namespaced: true,
  state,
  mutations
}
