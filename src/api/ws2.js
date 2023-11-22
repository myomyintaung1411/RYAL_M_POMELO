/* eslint-disable */
import { Toast } from 'vant'
import store from '@/store'
import AES from '@/api/aes'
import global from '@/api/global'
import moment from 'moment'
import { getIP } from '@/api/ip'

function doData (rData) {
  const en = global.en
  rData = JSON.parse(AES.decrypt(rData, en))
  switch (rData.router) {
    case 'kick':
      kickAgent(rData)
      break
    case 'Login':
      SetMyCenterForm(rData)
      break
    case 'GetCenterInfo': // 进入后重新取
      SetMyCenterForm(rData)
      break
    case 'GetAgentInfo':
      setAgentAdminForm(rData)
      break
    case 'ChangeDlScore':
      ChangeDlScore(rData)
      break
    case 'getOptScoreRecord':
      getOptScoreRecord(rData)
      break
    case 'editUserInfo':
      editUserInfo(rData)
      break
    case 'limitSetup':
      showMsg(rData);
      break;
    case 'addMember':
      // showMsg(rData)
      addMember(rData)
      break
    case 'addHg':
      editHgInfo(rData)
      break
    case 'setUserState':
      showMsg(rData)
      break
    case 'GetMemberInfo':
      setMemberAdminForm(rData)
      break
    case 'GetTotalMember':
      getAllMemberInfo(rData)
      break
    case 'GetTotalAgent':
      getAllAgentInfo(rData)
      break
    case 'getMemberTrade':
      getMemberTrade(rData)
      break
    case 'GetTradeMx':
      GetTradeMx(rData)
      break
    case 'getOnTimeBet':
      getOnTimeBet(rData)
      break
    case 'getOnlineMemberInfo':
      getOnlineMemberInfo(rData)
      break
    case 'getAccoutLog':
      getAccoutLog(rData)
      break
    case 'getLoginLog':
      getLoginLog(rData);
      break;
    case 'GetAgentTree':
      GetAgentTree(rData)
      break
    case 'GetJxb':
      GetJxb(rData)
      break
    // case 'GetReport':
    //   GetReport(rData)
    //   break
    case 'GetOptionerInfo':
      GetOptionerInfo(rData)
      break
    case 'Ip':
      setIp(rData)
      break
    case 'GetReferenceInfo':
      GetReferenceInfo(rData)
      break
    case 'GetAccountChangeLog':
      GetAccountChangeLog(rData)
      break
    case 'GetBannleImg':
      GetBannleImg(rData)
      break
    case 'setGk':
      setGk(rData)
      break
    case 'valid_auth':
      validAuth(rData)
      break
    case 'GetHgInfo':
      getHgInfo(rData)
      break
    case 'editHgInfo':
      editHgInfo(rData)
      break
    case 'doXm':
      doXm(rData)
      break
    case 'chkXmPw':
      chkXmPw(rData)
      break
    case 'editOwnPw':
      editOwnPw(rData)
      break
    case 'kickMember':
      showMsg(rData)
      break
    case 'getBulletin':
      getBulletin(rData)
      break
    case 'setBulletin':
      setBulletin(rData)
      break
    case 'editBulletin':
      editBulletin(rData)
      break
    case 'deleteBulletin':
      delBulletin(rData)
      break
    // case "editOwnQQ":
    //   editOwnQQ(rData)
    //   break
    case "getXmInfo":
      getXmInfo(rData)
      break;
    case "setLastXmTime":
      setLastXmTime(rData)
      break;
  }
}

function addMember (rData) {
  let data = rData.JsonData;
  if (data.result == 'ok') {
    Toast(data.msg)
    store.commit('ht/setAddMemberState', true)
    store.commit('ht/setAddMyMemberState', true)
  } else {
    Toast(data.msg)
  }
}

function editOwnPw (rData) {
  let data = rData.JsonData
  if (data.result == 'false') Toast(data.msg)
  if (data.result == 'ok') store.commit('ht/setEditPwState', true)
}

function chkXmPw (rData) {
  var data = rData.JsonData
  if (data.result == false) Toast('安全码不正确!!')
  if (data.result == true) store.commit('ht/setXmPwOk', true)
}

function doXm (rData) {
  var data = rData.JsonData
  if (data.result == 'false') Toast(data.msg)
  if (data.result == 'ok') store.commit('ht/setXmState', true)
}

function setGk (rData) {
  store.gk_info = rData.JsonData.result
}

function validAuth (rData) {
  store.commit('ht/setAuth', false)
}

function GetBannleImg (rData) {
  var data = rData.JsonData
  var bannleImgForm = { tableData: [], totalItemsNum: 0 }
  var tableData = bannleImgForm.tableData
  for (let i = 0; i < data.length; i++) {
    tableData[i] = {}
    tableData[i].Id = data[i].Id
    tableData[i].name = data[i].name
    tableData[i].sort = data[i].sort
    tableData[i].url = data[i].url
    tableData[i].title = data[i].title
  }
  bannleImgForm.totalItemsNum = rData.totalItem
  store.commit('ht/setBannleImgForm', bannleImgForm)
}

function GetAccountChangeLog (rData) {
  var data = rData.JsonData
  var accountChangeRecordForm = { tableData: [], totalItemsNum: 0, state: 0 }
  var tableData = accountChangeRecordForm.tableData
  for (let i = 0; i < data.length; i++) {
    tableData[i] = {}
    tableData[i].id = data[i].id
    tableData[i].name = data[i].name
    tableData[i].nikename = data[i].nikename
    tableData[i].level = data[i].level
    tableData[i].ip = data[i].optionIp
    tableData[i].optioner = data[i].optioners
    tableData[i].optionTime = data[i].optionTime // 权限表
    tableData[i].memo = data[i].memo
  }
  // mapIP(accountChangeRecordForm.tableData)
  accountChangeRecordForm.state = 1
  accountChangeRecordForm.totalItemsNum = rData.totalItem
  store.commit('ht/setAccountChangeRecordForm', accountChangeRecordForm)
  if(accountChangeRecordForm.tableData.length === 0) {
    Toast (`您查找的时间段内无记录!`)
    // Message.warning({
    //   message: ([
    //     (`${i18n.t('message.tips')} `),
    //     (`您查找的时间段内无记录!`)
    //   ]),
    //   dangerouslyUseHTMLString: true,
    //   offset: 400,
    //   duration: 2000,
    //   center: true
    // })
  }
}

function GetReferenceInfo (rData) {
  // console.log(rData)
  var data = rData.JsonData
  var obj = {}
  obj.ye = data[0].ye
  obj.zcb = data[0].zcb
  obj.xm_type = data[0].xm_type
  obj.xmb_s = data[0].xmb_s
  obj.xmb_d = data[0].xmb_d
  obj.xh_min = data[0].xh_min
  obj.xh_max = data[0].xh_max
  obj.auto_wash = data[0].auto_wash
  obj.topup_auth = data[0].topup_auth
  store.commit('ht/setReferenceInfo', obj)
}

function GetOptionerInfo (rData) {
  // console.log('get optioner info ', rData)
  var data = rData.JsonData
  store.commit('ht/setOptionScore', data[0].ye)
}

function setIp (rData) {
  var data = rData.JsonData
  store.commit('ht/setIp', data.ip)
}

function GetReport (rData) {
  // console.log('report ', rData)
  var data = rData.JsonData
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
  table.tableData1 = getReportTable(data.table1)
  table.tableData2 = getReportTable(data.table2)
  table.tableData3 = getReportTable(data.table3)
  table.tableData4 = data.table4
  table.tableData5 = data.table5
  table.tableData2 = summeryReportTable(table.tableData2, data.table4)
  table.tableData3 = summeryReportTable(table.tableData3, data.table5)
  table.totalItemsNum1 = data.table4.length > 0 ? data.table4[0].count : 0
  table.totalItemsNum2 = data.table5.length > 0 ? data.table5[0].count : 0
  table.agents = data.agents
  store.commit('ht/setReportForm', table)
}
function summeryReportTable (table1, table2) {
  // 加上合计行
  var obj = {};
  if (table2.length == 0) return
  table2 = table2[0]
  obj.name = '所有统计'
  obj.level = ''
  obj.nikename = ''
  obj.betNum = ''
  obj.totalWin = table2.yl.toFixed(2)
  // obj.bjlWin = table2.bjl_yl.toFixed(2)
  // obj.lhWin = table2.lh_yl.toFixed(2)
  // obj.nnWin = table2.nn_yl.toFixed(2)
  // obj.dxWin = table2.dx_yl.toFixed(2)
  // obj.ttsWin = table2.tts_yl.toFixed(2)
  // obj.xjhWin = table2.xjh_yl.toFixed(2)
  // obj.sscWin = table2.ssc_yl.toFixed(2)
  // obj.jsk3Win = table2.jsk3_yl.toFixed(2)
  // obj.bjcsWin = table2.bjcs_yl.toFixed(2)
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
}

function getReportTable (tableData) {
  var table = []
  for (var i = 0; i < tableData.length; i++) {
    var obj = {}
    obj.Id = tableData[i].Id
    obj.userId = tableData[i].userId
    obj.name = tableData[i].name
    obj.xm_close = tableData[i].xm_close
    obj.level =
      tableData[i].level == 1
        ? '管理员'
        : tableData[i].level == '2'
        ? '代理'
        : '会员'
    obj.nikename = tableData[i].nicheng
    obj.betNum = tableData[i].tzcs
    obj.totalWin = tableData[i].yl
    // obj.bjlWin = tableData[i].bjl_yl
    // obj.lhWin = tableData[i].lh_yl
    // obj.nnWin = tableData[i].nn_yl
    // obj.dxWin = tableData[i].dx_yl
    // obj.ttsWin = tableData[i].tts_yl
    // obj.xjhWin = tableData[i].xjh_yl
    // obj.sscWin = tableData[i].ssc_yl
    // obj.jsk3Win = tableData[i].jsk3_yl
    // obj.bjcsWin = tableData[i].bjcs_yl
    obj.zc = tableData[i].zc
    if (tableData[i].xml_s == null) tableData[i].xml_s = 0
    if (tableData[i].xml_d == null) tableData[i].xml_d = 0
    obj.xml = tableData[i].xml_s + '/' + tableData[i].xml_d
    obj.xmb = tableData[i].xmb_s + '/' + tableData[i].xmb_d
    obj.xmyj = (
      (tableData[i].xml_s * tableData[i].xmb_s) / 100 +
      (tableData[i].xml_d * tableData[i].xmb_d) / 100
    ).toFixed(2)
    obj.xmStype = tableData[i].xmType == 0 ? '双边' : '单边'
    obj.totalMoney = (Number(tableData[i].yl) + Number(obj.xmyj)).toFixed(2)
    obj.thisLevelMoney = ((obj.totalMoney * obj.zc) / 100).toFixed(2)
    obj.companyMoney = (obj.totalMoney - obj.thisLevelMoney).toFixed(2)
    table.push(obj)
  }
  return table
}

function GetJxb (rData) {
  // console.log(rData)
  var data = rData.JsonData
  var jxb = { jxb1: data[0].jxb, jxb2: data[0].jxb2 }
  store.commit('ht/setAgentLimit', jxb)
}

function GetAgentTree (rData) {
  // console.log('tree data .. ', rData)
  var data = rData.JsonData
  if (data.result === "false") return Message.error(data.msg)
  var treeData = {}
  treeData.tableData = data
  store.commit('ht/setTreeData', treeData)
  // 抽离id, name, gx, pid(用于显示表格里的关系)
  store.commit('ht/setAgentAllInfo', data)
}

function getLoginLog (rData) {
  var data = rData.JsonData
  var loginRecordForm = { tableData: [], totalItemsNum: 0, state: 0 }
  var tableData = loginRecordForm.tableData
  for (var i = 0; i < data.length; i++) {
    tableData[i] = {}
    tableData[i].name = data[i].name
    tableData[i].level = data[i].level
    tableData[i].loginAddr = data[i].loginAddr
    tableData[i].ip = data[i].ip
    tableData[i].loginTime = data[i].stime
    tableData[i].memo = data[i].memo
  }
  // mapIP(loginRecordForm.tableData)
  loginRecordForm.state = 1
  loginRecordForm.totalItemsNum = rData.totalItem
  store.commit('ht/setLoginRecordForm', loginRecordForm)
  if(loginRecordForm.tableData.length === 0) {
    Toast (`您查找的时间段内无记录!`)
    // Message.warning({
    //   message: ([
    //     (`${i18n.t('message.tips')} `),
    //     (`您查找的时间段内无记录!`)
    //   ]),
    //   dangerouslyUseHTMLString: true,
    //   offset: 400,
    //   duration: 2000,
    //   center: true
    // })
  }
}

/**
 * 遍历好的数组列表“去重”后获取对应IP地理位置
 * 为了避免相同ip一页内，多次请求
 * @param {Object} tableData 数据列
 */
function mapIP (tableData) {
  let arr = tableData
  var hash=[]
  for (var i = 0; i < arr.length; i++) {
    for (var j = i+1; j < arr.length; j++) {
      if(arr[i].ip===arr[j].ip) {
        ++i
      }
    }
    hash.push(arr[i])
  }
  hash.map(async v => {
    v.Ipp = ' ' + await getIPAddress(v.ip)
    tableData.forEach(vv => {
      if(vv.ip === v.ip) {
        vv.ip += v.Ipp
      }
    })
  })
}

async function getIPAddress (ip) {
  let {data} = await getIP(ip)
  if(data.data.length > 0) {
    return data.data[0].location
  } else {
    return ''
  }
}

async function getAccoutLog (rData) {
  // console.log('上下分 ', rData)
  var data = rData.JsonData
  var accountRecordForm = { tableData: [], totalItemsNum: 0, state: 0 }
  var tableData = accountRecordForm.tableData
  for (var i = 0; i < data.length; i++) {
    tableData[i] = {}
    tableData[i].id = data[i].id
    tableData[i].name = data[i].name
    tableData[i].nikename = data[i].nikename
    tableData[i].level = data[i].level
    tableData[i].type = data[i].type
    tableData[i].tradeMoney = data[i].tradeMoney
    tableData[i].money = data[i].money
    tableData[i].bamount = data[i].bamount
    tableData[i].ip = data[i].optionIp
    tableData[i].optioners = data[i].optioners
    tableData[i].optionTime = data[i].optionTime // 权限表
    tableData[i].memo = data[i].memo || ''
  }
  // mapIP(accountRecordForm.tableData)
  accountRecordForm.state = 1
  accountRecordForm.totalItemsNum = rData.totalItem
  accountRecordForm.tradeMoney = rData.tradeMoney
  accountRecordForm.totalMoney = rData.totalMoney

  accountRecordForm.manualDeposit = rData.manualDeposit;
  accountRecordForm.manualWithdraw = rData.manualWithdraw;
  accountRecordForm.onlineDeposit = rData.onlineDeposit;
  accountRecordForm.onlineWithdraw = rData.onlineWithdraw;
  accountRecordForm.xmTotal = rData.xmTotal;
  store.commit('ht/setAccountRecordForm', accountRecordForm)
  if(accountRecordForm.tableData.length === 0) {
    Toast(`您查找的时间段内无记录!`)
    // Message.warning({
    //   message: ([
    //     (`${i18n.t('message.tips')} `),
    //     (`您查找的时间段内无记录!`)
    //   ]),
    //   dangerouslyUseHTMLString: true,
    //   offset: 400,
    //   duration: 2000,
    //   center: true
    // })
  }
}

function getOnTimeBet (rData) {
  // console.log('get ON Time Bet ', rData)
  var data = rData.JsonData
  var betOrderInquireForm = { tableData: [], totalItemsNum: 0, total: {} }
  var tableData = betOrderInquireForm.tableData
  for (var i = 0; i < data.length; i++) {
    tableData[i] = {}
    tableData[i].orderId = i + 1
    tableData[i].name = data[i].name
    tableData[i].rType = data[i].rType
    tableData[i].gameType = transGameStr(data[i].rType)
    tableData[i].betTime = transTime(data[i].time)
    tableData[i].tableNum = data[i].roomName
    tableData[i].cc = data[i].cc
    tableData[i].gx = mapAgentName(data[i].gx)
    tableData[i].memberName = data[i].name
    tableData[i].betOrderInfo = trasBetResult(data[i].rType, data[i].xzmx)
    tableData[i].betMoney = Number((data[i].xz).toFixed(0))
    tableData[i].aBalance = Number((parseFloat(data[i].ye)).toFixed(0))
    tableData[i].ip = data[i].ip // 权限表
    tableData[i].terminal = data[i].terminal
    let resultData = betInfoData(data[i].xzmx, tableData[i].rType)
    tableData[i].niuniu = resultData[0]
    tableData[i].niuniuBet = resultData[1]
    tableData[i].showResult = tableData[i].niuniu.map((item,index) => {
      return item + ':' + tableData[i].niuniuBet[index]
    })
    tableData[i].tablePara = getTablePara(
      data[i].rType,
      tableData[i].betOrderInfo
    )
  }
  // mapIP(betOrderInquireForm.tableData)
  betOrderInquireForm.totalItemsNum = rData.totalItem || 0
  betOrderInquireForm.totalUser = rData.totalUser || 0
  betOrderInquireForm.totalBet = rData.totalBet || 0
  store.commit('ht/setBetOrderInquireForm', betOrderInquireForm)
}

function getOnlineMemberInfo(rData) {
  // console.log('getOnlineMemberInfo :: ', rData)
  var data = rData.JsonData
  var onlineMemberForm = { tableData: [], totalItemsNum: 0, total: {} }
  var tableData = onlineMemberForm.tableData
  for (var i = 0; i < data.length; i++) {
    tableData[i] = {}
    tableData[i].id = data[i].Id
    tableData[i].ip = data[i].loginip
    tableData[i].o_ip = data[i].loginip
    tableData[i].username = data[i].username
    tableData[i].reference_name = data[i].reference_name
    tableData[i].terminal = data[i].terminal
    tableData[i].login_time = transTime(data[i].loginTime)
    tableData[i].ye = data[i].ye
  }
  // mapIP(onlineMemberForm.tableData)
  onlineMemberForm.totalItemsNum = rData.totalItem || 0
  onlineMemberForm.total = rData.totalItem
  store.commit('ht/setOnlineUserList', onlineMemberForm)
}

function GetTradeMx (rData) {
  var data = rData.JsonData
  var tradeBetMx = data[0].xz
  store.commit('ht/setTradeBetMx', tradeBetMx)
}

function getHgInfo (rData) {
  var data = rData.JsonData
  var hgListForm = { tableData: [] }
  var tableData = hgListForm.tableData
  for (var i = 0; i < data.length; i++) {
    tableData[i] = {}
    tableData[i].Id = data[i].Id
    tableData[i].HgAccount = data[i].name
    tableData[i].name = data[i].nikename
    tableData[i].createDate = data[i].createDate
    tableData[i].lastLoginTime = data[i].lastLoginTime
    tableData[i].lastLoginIp = data[i].loginIp
    tableData[i].onLine = data[i].onLineState
    tableData[i].sEnable = data[i].sEnable == 1 ? '启用' : '禁用'
  }
  hgListForm.totalItemsNum = rData.totalItem
  store.commit('ht/setHgListForm', hgListForm)
}

function betInfoData(data, rType){
  let nn = data.split("$")
  nn.pop();
  var betnn = [];
  for(let i = 0; i < nn.length; i++){
    betnn.push(nn[i].split("^")[0])
  }
  const nnMap = new Map([
    ["1", ["庄1翻倍"]],["2", ["闲1翻倍"]],["3", ["庄1平倍"]],["4", ["闲1平倍"]],["5", ["庄2翻倍"]],["6", ["闲2翻倍"]],
    ["7", ["庄2平倍"]],["8", ["闲2平倍"]],["9", ["庄3翻倍"]],["10", ["闲3翻倍"]],["11", ["庄3平倍"]],["12", ["闲3平倍"]],["default", [""]],
  ])
  const bjlMap = new Map([
    ["1", ["庄"]],["2", ["和"]],["3", ["闲"]],["4", ["庄对"]],["5", ["闲对"]],["6", ["大"]],["7", ["小"]],["default", [""]],
  ])
  const lhMap = new Map([
    ["1", ["龙"]],["2", ["和"]],["3", ["虎"]],["4", ["龙单"]],["5", ["龙双"]],["6", ["虎单"]],["7", ["虎双"]],["default", [""]], //["龙", "和", "虎", "龙单", "龙双", "虎单", "虎双"];
  ])
  const ttsMap = new Map([
    ["1", ["闲1翻倍"]],["2", ["闲1平倍"]],["3", ["闲2翻倍"]],["4", ["闲2平倍"]],
    ["5", ["闲3翻倍"]],["6", ["闲3平倍"]],["7", ["闲4翻倍"]],["8", ["闲4平倍"]],["default", [""]],
  ])
  const xjhMap = new Map([
    ["1", ["黑"]],["2", ["幸运一击"]],["3", ["红"]]
    // ["1", ["闲1翻倍"]],["2", ["闲1平倍"]],["3", ["闲2翻倍"]],["4", ["闲2平倍"]],["5", ["闲3翻倍"]],["6", ["闲3平倍"]],["7", ["闲4翻倍"]],["8", ["闲4平倍"]],["default", [""]],
  ])
  const dxMap = new Map([
    //17点 到 4点
    ["1", ["总合17点"]],["2", ["总合16点"]],["3", ["总合15点"]],["4", ["总合14点"]],["5", ["总合13点"]],["6", ["总合12点"]],["7", ["总合11点"]],
    ["8", ["总合10点"]],["9", ["总合9点"]],["10", ["总合8点"]],["11", ["总合7点"]],["12", ["总合6点"]],["13", ["总合5点"]],["14", ["总合4点"]],
    //大，单，1,2,3,4,5,6，小，双
    ["15", ['大']],["16", ['单']],
    ["17", ['1点']],["18", ['2点']],["19", ['3点']],
    ["20", ['4点']],["21", ['5点']],["22", ['6点']],
    ["23", ['小']],["24", ['双']],
    //111, 222, 333, 444, 555, 666, 3个1 到 3个6, 22, 11, 33, 44, 55, 66
    ["25", ['三个1点']],["26", ['三个2点']],["27", ['三个3点']],
    ["28", ['三个4点']],["29", ['三个5点']],["30", ['三个6点']],
    ["31", ['同点']],
    ["32", ['两个1点']],["33", ['两个2点']],["34", ['两个3点']],
    ["35", ['两个4点']],["36", ['两个5点']],["37", ['两个6点']],
    //12, 13, 14, 15, 16, 23, 24, 25, 26, 34, 35, 35, 45, 46, 56
    ["38", ['包含1,2点']],["39", ['包含1,3点']],["40", ['包含1,4点']],
    ["41", ['包含1,5点']],["42", ['包含1,6点']],["43", ['包含2,3点']],
    ["44", ['包含2,4点']],["45", ['包含2,5点']],["46", ['包含2,6点']],
    ["47", ['包含3,4点']],["48", ['包含3,5点']],["49", ['包含3,6点']],
    ["50", ['包含4,5点']],["51", ['包含4,6点']],["52", ['包含5,6点']],
    ["default", [""]]
    // 17点 到 4点
    // ["1", [require("../assets/images/n17.png")]],["2", [require("../assets/images/n16.png")]],["3", [require("../assets/images/n15.png")]],
    // ["4", [require("../assets/images/n14.png")]],["5", [require("../assets/images/n13.png")]],["6", [require("../assets/images/n12.png")]],
    // ["7", [require("../assets/images/n11.png")]],["8", [require("../assets/images/n10.png")]],["9", [require("../assets/images/n9.png")]],
    // ["10", [require("../assets/images/n8.png")]],["11", [require("../assets/images/n7.png")]],["12", [require("../assets/images/n6.png")]],
    // ["13", [require("../assets/images/n5.png")]],["14", [require("../assets/images/n4.png")]],
    // //大，单，1,2,3,4,5,6，小，双
    // ["15", [require("../assets/images/da.png")]],["16", [require("../assets/images/dan.png")]],
    // ["17", [require("../assets/images/1.png")]],["18", [require("../assets/images/2.png")]],["19", [require("../assets/images/3.png")]],
    // ["20", [require("../assets/images/4.png")]],["21", [require("../assets/images/5.png")]],["22", [require("../assets/images/6.png")]],
    // ["23", [require("../assets/images/xiao.png")]],["24", [require("../assets/images/shuang.png")]],
    // //111, 222, 333, 444, 555, 666, 3个1 到 3个6, 22, 11, 33, 44, 55, 66
    // ["25", [require("../assets/images/111.png")]],["26", [require("../assets/images/222.png")]],["27", [require("../assets/images/333.png")]],
    // ["28", [require("../assets/images/444.png")]],["29", [require("../assets/images/555.png")]],["30", [require("../assets/images/666.png")]],
    // ["31", [require("../assets/images/all3.png")]],
    // ["32", [require("../assets/images/11.png")]],["33", [require("../assets/images/22.png")]],["34", [require("../assets/images/33.png")]],
    // ["35", [require("../assets/images/44.png")]],["36", [require("../assets/images/55.png")]],["37", [require("../assets/images/66.png")]],
    // //12, 13, 14, 15, 16, 23, 24, 25, 26, 34, 35, 35, 45, 46, 56
    // ["38", [require("../assets/images/12.png")]],["39", [require("../assets/images/13.png")]],["40", [require("../assets/images/14.png")]],
    // ["41", [require("../assets/images/15.png")]],["42", [require("../assets/images/16.png")]],["43", [require("../assets/images/23.png")]],
    // ["44", [require("../assets/images/24.png")]],["45", [require("../assets/images/25.png")]],["46", [require("../assets/images/26.png")]],
    // ["47", [require("../assets/images/34.png")]],["48", [require("../assets/images/35.png")]],["49", [require("../assets/images/36.png")]],
    // ["50", [require("../assets/images/45.png")]],["51", [require("../assets/images/46.png")]],["52", [require("../assets/images/56.png")]],
    // ["default", [""]]
  ])
  // a:0点, b:1点, c:2点, d:3点...,j:9点, k:大三公, l:小三公, m:混三公 , 后面的000代表 闲1 闲2 闲3 的输赢,0:输 1:赢
  // const sgMap = new Map([
  //   ["a", ["0点"]], ["b", ["1点"]], ["c", ["2点"]], ["d", ["3点"]], ["e", ["4点"]], ["f", ["5点"]], ["g", ["6点"]], ["h", ["7点"]], ["i", ["8点"]], ["j", ["9点"]],
  //   ["k", ["大三公"]], ["l", ["小三公"]], ["m", ["混三公"]]
  // ])
  var nnList = []
  var replaceNN = (r) => {
    switch (rType) {
      case "bjl":
        var action = bjlMap.get(r) || bjlMap.get("default");
        break;
      case "nn":
        var action = nnMap.get(r) || nnMap.get("default");
        break;
      case "lh":
        var action = lhMap.get(r) || lhMap.get("default");
        break;
      case "tts":
        var action = ttsMap.get(r) || ttsMap.get("default");
        break;
      case "xjh":
        var action = xjhMap.get(r) || xjhMap.get("default");
        break;
      case "dx":
        var action = dxMap.get(r) || dxMap.get("default");
        break;
      // case "sg":
      //   var action = sgMap.get(r) || sgMap.get("default");
      //   break;
    }
    nnList.push(action[0])
  }
  betnn.forEach((v, i, o)=>{
    replaceNN(v)
  })
  // 下注金额
  var nnBet = []
  for(let i = 0; i < nn.length; i++){
    nnBet.push(nn[i].split("^")[1])
  }
  let ret = []
  ret[0] = nnList // 注头名
  ret[1] = nnBet  // 注金额
  return ret
}

function getMemberTrade (rData) {
  // console.log('=========rData:', rData)
  var data = rData.JsonData
  var memberTradeForm = { tableData: [], totalItemsNum: 0, state: 0 }
  var tableData = memberTradeForm.tableData
  var r = { yl: 0, bet: 0, xml_s: 0, xml_d: 0, yxxz: 0, count: 0 }
  for (let i = 0; i < data.length; i++) {
    tableData[i] = {}
    tableData[i].bh = data[i].bh
    tableData[i].memberId = data[i].Id
    tableData[i].pk = data[i].pk
    tableData[i].memberAccount = data[i].name
    tableData[i].rType = data[i].gameType
    tableData[i].game = transGameStr(data[i].gameType)
    tableData[i].teskNum = data[i].roomName
    tableData[i].cc = data[i].cc
    tableData[i].sTime = transTime(data[i].time)
    tableData[i].result = data[i].gameType === 'nn' ? trasResult(data[i].gameType, data[i].result) : trasResult(data[i].gameType, data[i].result).split(' ')
    // console.log('rrrrrrrrr ', tableData[i].result)
    tableData[i].tradeMx = '下注详情'
    tableData[i].roomId = data[i].roomId
    
    tableData[i].betTime = data[i].betTime ? transTime(data[i].betTime) : data[i].betTime

    let resultData = betInfoData(data[i].xzmx, tableData[i].rType)
    tableData[i].niuniu = resultData[0]
    tableData[i].niuniuBet = resultData[1]
    tableData[i].showResult = tableData[i].niuniu.map((item,index) => {
      return item + ':' + tableData[i].niuniuBet[index]
    })
    tableData[i].betOrderInfo = trasBetResult(data[i].gameType, data[i].xzmx)
    tableData[i].tablePara = getTablePara(
      data[i].gameType,
      tableData[i].betOrderInfo
    )
    if(tableData[i].rType == 'nn') {
      if(data[i].pk != null) {
        // 牛一 至 牛九(a至i)   牛牛,炸弹,无牛(jkl)
        // 0庄赢 1闲赢
        let result = data[i].pk.split("-")
        let result1 = result[0]
        let result2 = result[1].split('')
        // console.log("result ", result1, result2)
        const nnResultMap = new Map([
          ["a", ["牛1"]],["b", ["牛2"]],["c", ["牛3"]],["d", ["牛4"]],
          ["e", ["牛5"]],["f", ["牛6"]],["g", ["牛7"]],["h", ["牛8"]],
          ["i", ["牛9"]],["j", ["牛牛"]],["k", ["炸弹"]],["l", ["无牛"]],
          ["default", [""]],
        ])
        var nnResultList = []
        var replaceNNResult = (r) => {
          const action = nnResultMap.get(r) || nnResultMap.get("default")
          nnResultList.push(action[0])
        }
        let nnPreResult = result1.split('')
        nnPreResult.forEach(v => {
          replaceNNResult(v)
        })
        // console.log(nnResultList, 'nnResultList')
        tableData[i].niuniuResult = nnResultList
        tableData[i].niuniuBetResult = result2
        // console.log('final ', nnResultList, result2)

        let nnWinLose = data[i].xzmx.split("$")
        nnWinLose.pop();
        let betnnResult = []
        for(let i = 0; i < nnWinLose.length; i++){
          // console.log(nn[i])
          betnnResult.push(nnWinLose[i].split("^")[0])
        }
        // console.log(betnnResult, 'betnnResult')
        let winLoseShow = []
        betnnResult.forEach(v => {
          // console.log(v)
          if(v >= 1 && v <= 4){
            // console.log('v >= 1 || v <= 4')
            if((v == 1 || v == 3) && result2[0] == 1){
              winLoseShow.push("输")
            }else if((v == 1 || v == 3) && result2[0] == 0) {
              winLoseShow.push("赢")
            }
            if((v == 2 || v == 4) && result2[0] == 1){
              winLoseShow.push("赢")
            }else if((v == 2 || v == 4) && result2[0] == 0) {
              winLoseShow.push("输")
            }
          }else if (v >= 5 && v <= 8) {
            // console.log('v >= 5 || v <= 8')
            if((v == 5 || v == 7) && result2[1] == 1){
              winLoseShow.push("输")
            }else if((v == 5 || v == 7) && result2[1] == 0) {
              winLoseShow.push("赢")
            }
            if((v == 6 || v == 8) && result2[1] == 1){
              winLoseShow.push("赢")
            }else if((v == 6 || v == 8) && result2[1] == 0) {
              winLoseShow.push("输")
            }
          }else if(v >= 9 && v <= 12){
            // console.log('v >= 9 || v <= 12')
            if((v == 9 || v == 11) && result2[2] == 1){
              winLoseShow.push("输")
            }else if((v == 9 || v == 11) && result2[2] == 0) {
              winLoseShow.push("赢")
            }
            if((v == 10 || v == 12) && result2[2] == 1){
              winLoseShow.push("赢")
            }else if((v == 10 || v == 12) && result2[2] == 0) {
              winLoseShow.push("输")
            }
          }
        })
        tableData[i].nnWinLose = winLoseShow
      }
    }
    // else {
    //   tableData[i].betOrderInfo = trasBetResult(data[i].gameType, data[i].xzmx)
    //   tableData[i].tablePara = getTablePara(
    //     data[i].gameType,
    //     tableData[i].betOrderInfo
    //   )
    // }
    tableData[i].bet_info_x = tableData[i].showResult.join(' ')
    tableData[i].result_x = tableData[i].rType == 'nn' ? tableData[i].result : tableData[i].result.join(' ')
    tableData[i].totalBet = data[i].xz // 权限表
    tableData[i].totalPay = data[i].fh
    tableData[i].win = Number((data[i].yl).toFixed(0))
    r.yl += data[i].yl
    tableData[i].xml = (data[i].xml_s || 0) + '/' + (data[i].xml_d || 0)
    tableData[i].xml_s = Number(data[i].xml_s || 0)
    tableData[i].xml_d = Number(data[i].xml_d || 0)
    r.xml_s += data[i].xml_s
    r.xml_d += data[i].xml_d
    tableData[i].xmKind = data[i].xmType
    tableData[i].validBet = Number(data[i].yxxz)
    r.yxxz += data[i].yxxz
    tableData[i].balance = Number(data[i].ye)
    tableData[i].balanceMemo = trasMemo(data[i].memo)
    tableData[i].before_ye = Number((data[i].before_ye).toFixed(0))
    tableData[i].ip = splitIP(data[i].ip)
    tableData[i].terminal = data[i].terminal
    tableData[i].xmf = data[i].xmf
    r.count++
  }
  // mapIP(memberTradeForm.tableData)
  // if (r.count > 1) {
  //   tableData[r.count] = {} // 统计
  //   tableData[r.count].memberId = '统计:'
  //   tableData[r.count].win = r.yl.toFixed(2)
  //   tableData[r.count].xml = r.xml_s + '/' + r.xml_d
  //   tableData[r.count].validBet = r.yxxz

  //   // tableData[r.count + 1] = {}; // 所有统计
  //   // tableData[r.count  + 1].memberId = '所有统计:'
  //   // tableData[r.count  + 1].win = rData.yl.toFixed(2)
  //   // tableData[r.count  + 1].xml = rData.xml_s + '/' + rData.xml_d
  //   // tableData[r.count  + 1].validBet = rData.yxxz
  // }
  memberTradeForm.totalItemsNum = rData.totalItem
  memberTradeForm.state = 1
  memberTradeForm.xml_d = rData.xml_d || 0
  memberTradeForm.xml_s = rData.xml_s || 0
  memberTradeForm.yl = rData.yl || 0
  memberTradeForm.xmf = rData.xmf || 0
  // console.log('memberTrade ', memberTradeForm)
  store.commit('ht/setMemberTradeForm', memberTradeForm)
  if(memberTradeForm.tableData.length === 0) {
    Toast(`您查找的时间段内无记录!`)
    // Message.warning({
    //   message: ([
    //     (`${i18n.t('message.tips')} `),
    //     (`您查找的时间段内无记录!`)
    //   ]),
    //   dangerouslyUseHTMLString: true,
    //   offset: 400,
    //   duration: 2000,
    //   center: true
    // })
  }
}

function transTime (times) {
  moment.suppressDeprecationWarnings = true;
  return moment(times).format('YYYY-MM-DD HH:mm:ss')
}

function splitIP(ip) {
  if (ip == '' || ip == null || ip == undefined) return ''
  let ips = ip.split(',')
  // console.log('ips ', ips)
  if (ips.length == 2) {
    return ips[0] || ''
  }
  if (ips.length == 3) return ips[1] || ''
  return ips[0] || ''
}

function getAllMemberInfo (rData) {
  // console.log('all membger ', rData)
  var data = rData.JsonData
  var memberTotalListForm = { tableData: [], totalItemsNum: 0, state: 0 }
  var tableData = memberTotalListForm.tableData
  for (var i = 0; i < data.length; i++) {
    tableData[i] = {}
    tableData[i].Id = data[i].Id
    tableData[i].memberAccount = data[i].name
    tableData[i].name = data[i].nikename
    tableData[i].upperAgent = data[i].reference_name
    tableData[i].mBalance = data[i].ye
    tableData[i].xmType = data[i].xmType == 0 ? '双边' : '单边'
    tableData[i].xmb = data[i].xmb_s + '/' + data[i].xmb_d
    tableData[i].sEnable = data[i].sEnable == 1 ? '启用' : '禁用'
    tableData[i].createDate = data[i].createDate
    tableData[i].ip = data[i].loginIp
    tableData[i].roomAddr = transRoom(data[i].roomAddr)
    tableData[i].onLineState = data[i].onLineState == 1 ? '在线' : '离线' // 权限表
    tableData[i].terminal = data[i].terminal
    tableData[i].gx = mapAgentName(data[i].gx)
    tableData[i].auth_wash = data[i].auto_wash === 1 ? true : false
    tableData[i].wash_type = data[i].wash_type
    if (data[i].xh) {
      tableData[i].xh_min = data[i].xh.split('-')[0]
      tableData[i].xh_max = data[i].xh.split('-')[1]
    } else {
      tableData[i].xh_min = 20
      tableData[i].xh_max = 50000
    }
    tableData[i].topup_auth = data[i].yj === 1 ? true : false
  }
  // mapIP(memberTotalListForm.tableData)
  memberTotalListForm.state = 1
  memberTotalListForm.totalItemsNum = rData.totalItem
  store.commit('ht/setMemberTotalListForm', memberTotalListForm)
}
function getAllAgentInfo (rData) {
  var data = rData.JsonData
  var AgentTotalListForm = { tableData: [], totalItemsNum: 0, state: 0 }
  var tableData = AgentTotalListForm.tableData
  for (var i = 0; i < data.length; i++) {
    tableData[i] = {}
    tableData[i].agentAccount = data[i].name
    tableData[i].name = data[i].nikename
    tableData[i].upperAgent = data[i].reference_name
    tableData[i].mBalance = data[i].ye
    tableData[i].xmType = data[i].xmType == 0 ? '双边' : '单边'
    tableData[i].xmb = data[i].xmb_s + '/' + data[i].xmb_d
    tableData[i].sEnable = data[i].sEnable == 1 ? '启用' : '禁用'
    tableData[i].createDate = data[i].createDate
    tableData[i].ip = data[i].loginIp
    tableData[i].onLineState = data[i].onLineState == 1 ? '在线' : '离线' // 权限表
    tableData[i].terminal = data[i].terminal
    tableData[i].gx = mapAgentName(data[i].gx)
    tableData[i].auth_wash = data[i].auto_wash === 1 ? true : false
    tableData[i].wash_type = data[i].wash_type
    if (data[i].xh) {
      tableData[i].xh_min = data[i].xh.split('-')[0]
      tableData[i].xh_max = data[i].xh.split('-')[1]
    } else {
      tableData[i].xh_min = 20
      tableData[i].xh_max = 50000
    }
    tableData[i].topup_auth = data[i].yj === 1 ? true : false
    // tableData[i].isPf = checkIsPf(data[i].jxb)
    tableData[i].isPf = data[i].pf === 1 ? true : false
  }
  // mapIP(AgentTotalListForm.tableData)
  AgentTotalListForm.state = 1
  AgentTotalListForm.totalItemsNum = rData.totalItem
  store.commit('ht/setAgentTotalListForm', AgentTotalListForm)
}
function editHgInfo (rData) {
  // 修改信息
  // var data = rData.JsonData
  store.commit('ht/setEditHgState', true)
  showMsg(rData)
}

function editUserInfo (rData) {
  // console.log('editUserInfo ::: ', rData)
  // 修改信息
  var data = rData.JsonData
  var msg = data.data
  if (data.result != 'ok') return Message.error(data.msg)
  var formData =
    msg.level == 2 ? store.state.ht.agentAdminForm : store.state.ht.memberListForm
  var data2 = formData.tableData
  for (var i = 0; i < formData.tableData.length; i++) {
    var account =
      msg.level == 2
        ? formData.tableData[i].agentAccount
        : formData.tableData[i].memberAccount
    if (account == msg.name) {
      formData.tableData[i].xmb = msg.xmb
      formData.tableData[i].zcb = msg.zcb
      formData.tableData[i].name = msg.nikename
      formData.tableData[i].xmb = msg.xmb_s + '/' + msg.xmb_d
      if (msg.level === 2) {
        formData.tableData[i].xmType = msg.xmKind === 0 ? '双边' : '单边'
      } else {
        formData.tableData[i].xmKind = msg.xmKind === 0 ? '双边' : '单边'
      }
    }
  }
  // console.log('wssssssssssssssssss ', formData)
  if (msg.level == 2) {
    store.commit('ht/setMemberListForm', formData)
    if (data.result == 'ok') {
      store.commit('ht/setModifiyState', true)
      Toast(data.msg)
    } else {
      Toast(data.msg)
    }
  }
  if (msg.level == 3) {
    store.commit('ht/setAgentAdminForm', formData)
    if (data.result == 'ok') {
      store.commit('ht/setModifiyState', true)
      store.commit('ht/setModifiyPlayerState', true)
      Toast(data.msg)
    } else {
      Toast(data.msg)
    }
  }
  // if (data.result == 'ok') {
  //   store.commit('ht/setAddMemberState', true)
  //   Toast(data.msg)
  // } else {
  //   Toast(data.msg)
  // }
}

function setMemberAdminForm (rData) {
  // console.log('member wsssssssss ', rData)
  var data = rData.JsonData
  var memberListForm = { tableData: [], totalItemsNum: 0, state: 0 }
  var tableData = memberListForm.tableData
  for (var i = 0; i < data.length; i++) {
    tableData[i] = {}
    tableData[i].Id = data[i].Id
    tableData[i].memberAccount = data[i].name
    tableData[i].name = data[i].nikename
    tableData[i].upperAgent = data[i].reference_name
    tableData[i].mBalance = Number((data[i].ye).toFixed(0))
    tableData[i].topup_auth = data[i].yj == 1 ? true : false
    tableData[i].xmb_d = data[i].xmb_d
    tableData[i].xmb_s = data[i].xmb_s
    tableData[i].show_xm = data[i].show_xm
    tableData[i].level = 3
    tableData[i].xmb = data[i].xmb_s + '/' + data[i].xmb_d
    tableData[i].xmKind = data[i].xmType == 0 ? '双边' : '单边'
    tableData[i].drawMoneyPw = data[i].withdrawPw
    tableData[i].sEnable = data[i].sEnable == 1 ? '启用' : '禁用'
    tableData[i].createDate = data[i].createDate
    tableData[i].lastLoginTime = data[i].lastLoginTime
    tableData[i].ip = data[i].loginIp
    tableData[i].memo = data[i].memo
    tableData[i].auto_wash = data[i].autoWash
    tableData[i].wash_type = data[i].washType
    if (data[i].needxm) {
      tableData[i].needXmf = data[i].xmType != 1 ? (data[i].needxm?.xml_d * data[i].xmb_d / 100 + data[i].preXmLeft || 0).toFixed(0) : (data[i].needxm?.xml_s * data[i].xmb_s / 100 + data[i].preXmLeft || 0).toFixed(0);
    } else {
      tableData[i].needXmf = data[i].preXmLeft || 0
    }
    tableData[i].win_lose = data[i].win_lose
    if (data[i].xh_min && data[i].xh_max) {
      tableData[i].xh_min = data[i].xh_min
      tableData[i].xh_max = data[i].xh_max
    } else {
      tableData[i].xh_min = 20
      tableData[i].xh_max = 50000
    }
    tableData[i].reference_name = data[i].reference_name
    tableData[i].onLine = data[i].onLineState == 1 ? '在线' : '离线' // 权限表
    tableData[i].gx = mapAgentName(data[i].gx)
  }
  // console.log('mmmmmtabledAta, ', memberListForm.tableData)
  // mapIP(memberListForm.tableData)
  memberListForm.state = 1
  memberListForm.totalItemsNum = rData.totalItem || 0
  store.commit('ht/setMemberListForm', memberListForm)
  store.commit('ht/setSearchMemberState', true)
  
}

function showMsg (rData) {
  // console.log('showMsg .......', rData)
  var data = rData.JsonData
  if (data.result === 'ok') {
    Toast(data.msg)
  } else {
    Toast(data.msg)
  }
  // setTimeout(() => {
  //   const iframe = document.createElement('IFRAME')
  //   iframe.style.display = 'none'
  //   iframe.setAttribute('src', 'data:text/plain,')
  //   document.documentElement.appendChild(iframe)
  //   window.frames[0].window.alert(data.msg)
  //   iframe.parentNode.removeChild(iframe)
  // }, 300)
}
function getOptScoreRecord (rData) {
  var data = rData.JsonData
  var addscoreDigFrm = {}
  addscoreDigFrm.name = data.name
  addscoreDigFrm.kind = data.kind
  addscoreDigFrm.optioner = data.optioner
  addscoreDigFrm.memo2 = data.memo2
  addscoreDigFrm.turnover = data.turnover
  addscoreDigFrm.optionerScore = data.optionerScore
  store.commit('ht/setAddscoreDigFrm', addscoreDigFrm)
}

function ChangeDlScore (rData) {
  var data = rData.JsonData
  if (data.code && data.code === 1002) {
    Toast(`您查找的时间段内无记录!`)
    setTimeout(() => {
      localStorage.removeItem('_SinDds_')
      window.location.reload()
    }, 1000)
    return
  }
  if (data.result == 'ok') {
    var dataList =
      data.level == 2
        ? store.state.ht.agentAdminForm.tableData
        : store.state.ht.memberListForm.tableData
    for (var i = 0; i < dataList.length; i++) {
      if (data.level == 2)
        if (dataList[i].agentAccount == data.username)
          // 代理
          dataList[i].aBalance = data.ye
      if (data.level == 3)
        if (dataList[i].memberAccount == data.username)
          dataList[i].mBalance = data.ye
    }
  }
  if(data.result == 'ok'){
    Toast(data.msg)
    store.commit('ht/setUpDownState', true)
    store.commit('ht/setUpDownPlayerState', true)
  } else {
    Toast(data.msg)
  }
  // showMsg(rData);
}

function kickAgent(rData) {
  Toast('您的账号被上级提出!')
  // Message.warning('您的账号被上级提出!')
  setTimeout(() => {
    window.location.reload()
    localStorage.removeItem('_SinDds_')
  }, 1000)
}

function SetMyCenterForm (rData) {
  // 个人中心
  store.state.WS_MSG = rData // 供登录框调用
  var data = rData.JsonData
  var myCenterForm = {
    userValue: [],
    userState: [],
    totalMemberNum: 0,
    totalAgentNum: 0
  }
  var obj = {
    name: data.name,
    level: data.level,
    zcb: data.zcb,
    xmb: data.xmb_s + '/' + data.xmb_d,
    ye: data.ye,
    loginTime: transTime(data.loginTime),
    ip: data.loginIp,
    token: data.token,
    loginId: data.Id
  }
  store.commit('ht/setMyInfo', data)
  myCenterForm.userValue.push(obj)
  var obj2 = {
    memberOnLineNum: data.memberOnLineNum,
    ownMemberBalance: data.ownMemberBalance,
    otherMemberBalance: (data.memberBalance - data.ownMemberBalance).toFixed(2),
    memberBalance: data.memberBalance,
    agentBalance: data.agentBalance
  }
  // mapIP(myCenterForm.userValue)
  myCenterForm.userState.push(obj2)
  myCenterForm.totalMemberNum = data.totalMemberNum
  myCenterForm.totalAgentNum = data.totalAgentNum
  myCenterForm.memberAddNum = data.curDayAddMember
  myCenterForm.agentAddNum = data.curDayAddAgent
  store.commit('ht/setMyCenterForm', myCenterForm)
  // console.log(store)
}

function setAgentAdminForm (rData) {
  // console.log('agent --', rData)
  var data = rData.JsonData;
  var agentAdminForm = { tableData: [], totalItemsNum: 0, state: 0 }
  var tableData = agentAdminForm.tableData
  for (var i = 0; i < data.length; i++) {
    tableData[i] = {}
    tableData[i].Id = data[i].Id
    tableData[i].agentAccount = data[i].name
    tableData[i].name = data[i].nikename
    tableData[i].user_type = data[i].user_type
    tableData[i].aBalance = Number((data[i].ye).toFixed(0))
    tableData[i].topup_auth = data[i].yj == 1 ? true : false
    tableData[i].zcb = data[i].zcb
    tableData[i].level = data[i].level
    tableData[i].xmb_s = data[i].xmb_s
    tableData[i].xmb_d = data[i].xmb_d
    tableData[i].xmb = data[i].xmb_s + '/' + data[i].xmb_d
    tableData[i].xmType = data[i].xmType == 0 ? '双边' : '单边'
    tableData[i].withdrawPw = data[i].withdrawPw
    tableData[i].sEnable = data[i].sEnable == 1 ? '启用' : '禁用'
    tableData[i].createDate = data[i].createDate
    tableData[i].lastLoginTime = data[i].lastLoginTime
    tableData[i].ip = data[i].loginIp
    tableData[i].jxb = data[i].jxb // 权限表
    tableData[i].reference_name = data[i].reference_name
    tableData[i].onLine = data[i].onLineState == 1 ? '在线' : '离线'
    tableData[i].gx = mapAgentName(data[i].gx)
    tableData[i].memo = data[i].memo
    tableData[i].auto_wash = data[i].autoWash
    tableData[i].wash_type = data[i].washType
    tableData[i].securityLevel = data[i].securityLevel
    if (data[i].needxm) {
      tableData[i].needXmf = data[i].xmType != 1 ? (data[i].needxm?.xml_d * data[i].xmb_d / 100 + data[i].preXmLeft || 0).toFixed(0) : (data[i].needxm?.xml_s * data[i].xmb_s / 100 + data[i].preXmLeft || 0).toFixed(0);
    } else {
      tableData[i].needXmf = data[i].preXmLeft || 0
    }
    tableData[i].group_ye = Number((data[i].group_ye).toFixed(0))
    tableData[i].win_lose = data[i].win_lose
    tableData[i].direct_user = data[i].direct_user
    if (data[i].xh) {
      tableData[i].xh_min = data[i].xh.split('-')[0]
      tableData[i].xh_max = data[i].xh.split('-')[1]
    } else {
      tableData[i].xh_min = 20
      tableData[i].xh_max = 50000
    }
    tableData[i].downloadUrl = data[i].downloadUrl || ''
    tableData[i].androidAddr = data[i].androidAddr || ''
    tableData[i].iosAddr = data[i].iosAddr || ''
    tableData[i].customerAddr = data[i].customerAddr || ''
    tableData[i].webAddr = data[i].webAddr || ''
    tableData[i].gameAddr = data[i].gameAddr || '',
    // tableData[i].isPf = checkIsPf(data[i].jxb)
    tableData[i].isPf = data[i].pf === 1 ? true : false
    tableData[i].isTop = checkIsTop(data[i].gx)
  }
  // mapIP(agentAdminForm.tableData)
  agentAdminForm.state = 1
  agentAdminForm.totalItemsNum = rData.totalItem || 0
  store.commit('ht/setAgentAdminForm', agentAdminForm)
}

function checkIsTop(gx) {
  if (gx === '' || gx === undefined) return null
  if (gx.split('^').length == 3) {
    return true
  } else {
    return false
  }
}

function checkIsPf(jxb) {
  let isPf = ''
  if (jxb !== '') {
    isPf = jxb.split(',')[19]
    if (isPf == 0) {
      return false
    } else {
      return true
    }
  } else {
    return null
  }
}

// 以数组值寻找对应id的name
function mapAgentName(data) {
  let relation = ""
  let id = data.split("^")
  id.shift()
  id.pop()
  let info = store.state.ht.agentAllInfo
  id.forEach(idi => {
    info.forEach(item => {
      if (item.Id === parseInt(idi)) {
        relation += item.name + '/'
      }
    })
  })
  // info.forEach(item => {
  //   id.forEach(idi => {
  //     if(item.Id == idi) {
  //       relation += item.name + "/"
  //     }
  //   })
  // })
  return relation
}

function getBulletin (rData) {
  if (!rData.JsonData.data[0]) {
    return;
  }
  let data = rData.JsonData
  if (data.result == 'ok') {
    let info = []
    info = data.data
    for (let i = 0; i < info.length; i++) {
      info[i].startTime = transTime(info[i].startTime)
      info[i].endTime = transTime(info[i].endTime)
    }
    store.commit('ht/setBulletinListData', info)
  } else {
    store.commit('ht/setBulletinListData', {})
  }
}

function setBulletin (rData) {
  
}

function editBulletin (rData) {
  let data = rData.JsonData
  if (data.result == 'ok') {
    Toast(data.msg)
  } else {
    // Message.warning({
    //   message: data.msg
    // })
    Toast(data.msg)
  }
}

function delBulletin (rData) {
  let data = rData.JsonData
  if (data.result == 'ok') {
    Toast( data.msg )
  } else {
    Toast(data.msg)
  }
}

// function editOwnQQ(rData) {
//   let data = rData.JsonData;
//   if (data.result === 'ok') {
//     Toast(data.msg)
//   } else {
//     Toast(data.msg)
//   }
// }


function getXmInfo(rData) {
  // console.log('getXmInfo... ', rData)
  // 1003 无此用户  1002 token过期 1001 解析错误
  let data = rData.JsonData;
  if (data.code && data.code === 1002) {
    Toast('登录时效已过期，请重新登录!')
    // Message.warning('登录时效已过期，请重新登录!')
    setTimeout(() => {
      localStorage.removeItem('_SinDds_')
      window.location.reload()
    }, 1000)
    return
  }
  if (data.result === 'ok') {
    // Toast(data.msg)
    let setData = {
      curXmTime: transTime(data.curXmTime),
      curXmf: data.curXmf,
      lastXmTime: data.lastXmTime != null ? transTime(data.lastXmTime) : '',
      prevXmTime: transTime(data.prevXmTime),
      xm_type: data.xm_type == 0 ? '双边' : '单边',
      xmb_d: data.xmb_d || 0,
      xmb_s: data.xmb_s || 0,
      xml_d: data.xml_d || 0,
      xml_s: data.xml_s || 0,
    }
    // console.log('setData ', setData)
    store.commit("ht/setGotXmInfo", setData)
  } else {
    // Toast(data.msg)
  }
}

function setLastXmTime(rData) {
  // console.log('setLastXmTime... ', rData)
  let data = rData.JsonData;
  if (data.code && data.code === 1002) {
    
    Toast('登录时效已过期，请重新登录!')
    setTimeout(() => {
      localStorage.removeItem('_SinDds_')
      window.location.reload()
    }, 1000)
    return
  }
  if (data.result === 'ok') {
    Toast('洗码成功')
    store.commit('ht/setLastXmState', true)
    store.commit('ht/setLastXmStatePlayer', true)
  } else {
    store.commit('ht/setLastXmState', true)
    store.commit('ht/setLastXmStatePlayer', true)
    Toast(data.msg)
  }
}


function trasMemo (memo) {
  // if (memo == '' || memo == '本局无效' || !memo || memo == ' 更改路单' || memo == '后台修改本局无效') return memo
  // // console.log('memo:',memo)
  // let split1 = memo.split('$')
  // let str1 = '多台:'
  // for (let i = 0; i < split1.length; i++) {
  //   let split2 = split1[i].split('_')
  //   str1 +=
  //     transGameStr(split2[0]) + '-' + split2[1] + ' 总投:' + split2[2] + ','
  // }
  return memo
}
function transGameStr (strGame) {
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
}

function transRoom (strRoomAddr) {
  //  console.log(strRoomAddr)
  if (strRoomAddr == null || strRoomAddr == '') return strRoomAddr
  let splitRoom = strRoomAddr.split('-')
  return transGameStr(splitRoom[0]) + '-' + splitRoom[1]
}

function trasResult (strGame, result) {
  // 转换游戏结果
  // console.log('strGame ', strGame, 'result ', result)
  // 牛1 至 牛9(a至i) 牛牛,炸弹,无牛(jkl)
  if (result == null) return ''
  if (strGame == 'nn') {
    var split1 = result.split('-')
    var strResult = ''
    for (var i = 0; i < split1[0].length; i++) {
      strResult += split1[0].substr(i, 1) == '0' ? '庄' : '闲'
      if (split1[1])
        strResult +=
          split1[1].substr(i, 1) == 1
            ? '平倍 | '
            : split1[1].substr(i, 1) + '倍 | '
    }
    return strResult
  }
  // a:庄 b:庄 闲对  c:庄 庄对  d:庄 闲对 庄对  e:闲(龙)  f:闲 闲对  g:闲 庄对  h:闲 闲对 庄对  i:和  j:和 闲对  k:和 庄对 l:和 闲对 庄对
  if (strGame == 'bjl') {
    var split1 = '庄,庄 闲对,庄 庄对,庄 闲对 庄对,闲,闲 闲对,闲 庄对,闲 闲对 庄对,和,和 闲对,和 庄对,和 闲对 庄对'.split(',')
    var m = result.charCodeAt() - 97
    let res_ = split1[m]
    let more_m = result.split('_')
    if (more_m.length > 1) {
      // console.log(more_m)
      // if (more_m[1] == 1) res_ += " 大"
      // if (more_m[1] == 2) res_ += " 小"
    }
    return res_
  }

  if (strGame == 'lh') {
    // console.log('=======:', strGame, result, result.charCodeAt())
    var split1 = '龙,和,虎'.split(',')
    var m = result.charCodeAt() - 97
    let re = split1[m]
    let more_m = result.split('_')
    if (more_m.length > 1) {
      // console.log(more_m)
      if (more_m[1] == 'a') re += " 龙双 虎双"
      if (more_m[1] == 'b') re += " 龙单 虎单"
      if (more_m[1] == 'c') re += " 龙单 虎双"
      if (more_m[1] == 'd') re += " 龙双 虎单"
    }
    // let a = result.substr(1, 1)
    // let b = result.substr(2, 1)
    // if (a == '1') re += '龙单 '
    // if (a == '2') re += '龙双 '
    // if (b == '1') re += '虎单 '
    // if (b == '2') re += '虎双 '
    // console.log('+++++++++', re)
    return re
  }
  if (strGame == 'dx') {
    var strResult = ''
    for (var i = 0; i < result.length; i++) {
      strResult += result.substr(i, 1) + '点 '
    }
    return strResult.trim()
  }
  if (strGame == 'tts') {
    // var splitTts='//对子 0-9(a-j),0点(a),1点(b),2点(c),3点(d),4点(e),5点(f),6点(g),7点(h),8点(i),9点(j),1点半(1),2点半(2),3点半(3),4点半(4),5点半(5),6点半(6),7点半(7),8点半(8),9点半(9)'
    // var splitTts='白板对子,对A,对2,对3,对4,对5,对6,对7,对8,对9,0点,1点,2点,3点,4点,5点,6点,7点,8点,9点'
    var split1 = result.split('-')
    var strResult = ''
    for (var i = 0; i < split1[0].length; i++) {
      strResult +=
        split1[0].substr(i, 1) == '0'
          ? '庄'
          : split1[0].substr(i, 1) == '2'
          ? '闲'
          : '和'
      if (split1[0].substr(i, 1) != 1)
        if (split1[1])
          strResult +=
            split1[1].substr(i, 1) == 1
              ? '平倍 '
              : split1[1].substr(i, 1) + '倍 '
    }
    return strResult.trim()
  }
  if (strGame == 'xjh') {
    // var split1 = result.split('-')
    // var strResult = ''
    // for (var i = 0; i < split1[0].length; i++) {
    //   strResult += split1[0].substr(i, 1) == '0' ? '庄' : '闲'
    //   if (split1[1])
    //     strResult +=
    //       split1[1].substr(i, 1) == 1
    //         ? '平倍,'
    //         : split1[1].substr(i, 1) + '倍,'
    // }
    // return strResult
    // a:黑  b:红  c:有对子 d:顺子  e:金花  f:顺金  g:豹子
    const xjhMap = new Map([
      ['a', '黑'], ['b', '红'], ['c', '有对子'], ['d', ''], ['e', ''], ['f', ''], ['g', '']
      // ['a', '黑'], ['b', '红'], ['c', '有对子'], ['d', '顺子'], ['e', '金花'], ['f', '顺金'], ['g', '豹子']
    ])
    var split1 = result.split('')
    var res = split1.map(v => {
      return xjhMap.get(v)
    })
    return res.toString()
  }
  return result // 彩票
}

function trasBetResult (strGame, str) {
  // 转换下注
  // console.log('rType,xzmx', strGame, str)
  let mx = [];
  if (
    strGame != 'bjl' &&
    strGame != 'nn' &&
    strGame != 'lh' &&
    strGame != 'tts' &&
    strGame != 'xjh'
  )
    return str.split(' ') // casue of dx(want array got String), zike replace it (origin code: => return str;)
  if (strGame == 'bjl')
    var obj = { para0: '', para1: '', para2: '', para3: '', para4: '' }
  if (strGame == 'nn')
    var obj = {
      para0: '',
      para1: '',
      para2: '',
      para3: '',
      para4: '',
      para5: '',
      para6: '',
      para7: '',
      para8: '',
      para9: '',
      para10: '',
      para11: ''
    }
  if (strGame == 'lh')
    var obj = {
      para0: '',
      para1: '',
      para2: '',
      para3: '',
      para4: '',
      para5: '',
      para6: ''
    }
  if (strGame == 'tts')
    var obj = {
      para0: '',
      para1: '',
      para2: '',
      para3: '',
      para4: '',
      para5: '',
      para6: '',
      para7: '',
      para8: ''
    }
  if (strGame == 'xjh')
    var obj = {
      para0: '',
      para1: '',
      para2: '',
      para3: '',
      para4: '',
      para5: '',
      para6: '',
      para7: '',
      para8: ''
    }
  if (str != null) {
    var splitMx = str.split('$')
    let i = 0
    for (let item in obj) {
      for (let j in splitMx) {
        if (splitMx[j] != '') {
          var split2 = splitMx[j].split('^')
          if (split2[0] - 1 == i) obj[item] = split2[1] > 0 ? Number((parseFloat(split2[1])).toFixed(0)) : ''
        }
      }
      i++
    }
    mx.push(obj)
  }
  return mx
}

function getTablePara (rType, para) {
  if (
    !rType ||
    rType == 'dx' ||
    rType == 'bjcs' ||
    rType == 'ssc' ||
    rType == 'jsk3'
  )
    return []
  var nn = [
    '庄翻倍1',
    '闲翻倍1',
    '庄平倍1',
    '闲平倍1',
    '庄翻倍2',
    '闲翻倍2',
    '庄平倍2',
    '闲平倍2',
    '庄翻倍3',
    '闲翻倍3',
    '庄平倍3',
    '闲平倍3'
  ]
  var bjl = ['庄', '和', '闲', '庄对', '闲对']
  var lh = ['龙', '和', '虎'] // ['龙', '和', '虎', '龙单', '龙双', '虎单', '虎双'];
  var tts = [
    '闲翻倍1',
    '闲平倍1',
    '闲翻倍2',
    '闲平倍2',
    '闲翻倍3',
    '闲平倍3',
    '闲翻倍4',
    '闲平倍4'
  ]
  var xjh = [
    '闲翻倍1',
    '闲平倍1',
    '闲翻倍2',
    '闲平倍2',
    '闲翻倍3',
    '闲平倍3',
    '闲翻倍4',
    '闲平倍4'
  ]
  var gt = rType == '' ? this.mx_game : rType
  if (rType != '') {
    var obj =
      gt == 'nn'
        ? nn
        : gt == 'bjl'
        ? bjl
        : gt == 'lh'
        ? lh
        : gt == 'dx'
        ? dx
        : gt == 'tts'
        ? tts
        : xjh
  } else {
    var obj =
      gt == '牛牛'
        ? nn
        : gt == '百家乐'
        ? bjl
        : gt == '龙虎'
        ? lh
        : gt == '大小'
        ? dx
        : gt == '推筒子'
        ? tts
        : xjh
  }
  let p = []
  let a = para[0]
  for (let j in para[0]) {
    p.push(a[j])
  }
  let arrPara = []
  for (var i in obj) {
    var obj2 = {}
    obj2.label = obj[i]
    obj2.prop = 'para' + i
    let w1 = getTextWidth(obj[i])
    let w2 = getTextWidth(p[i])
    obj2.width = (w1 > w2 ? w1 : w2) + 20
    arrPara.push(obj2)
  }
  // console.log('arrPara:', arrPara, 'p ', p, 'rType', rType, 'para ', para)
  return arrPara
}

/**
 * 使用span标签包裹内容，然后计算span的宽度 width： px
 * @param valArr
 */
function getTextWidth (str) {
  let width = 0
  let html = document.createElement('span')
  html.innerText = str
  html.className = 'getTextWidth'
  document.querySelector('body').appendChild(html)
  width = document.querySelector('.getTextWidth').offsetWidth
  document.querySelector('.getTextWidth').remove()
  return width
}

function memberTradeExport (rData) {
  var data = rData.JsonData
  var memberTradeForm = { tableData: [], totalItemsNum: 0, state: 0 }
  var tableData = memberTradeForm.tableData
  var r = { yl: 0, bet: 0, xml_s: 0, xml_d: 0, yxxz: 0, count: 0 }
  for (let i = 0; i < data.length; i++) {
    tableData[i] = {}
    tableData[i].bh = data[i].bh
    tableData[i].memberId = data[i].Id
    tableData[i].pk = data[i].pk
    tableData[i].memberAccount = data[i].name
    tableData[i].rType = data[i].gameType
    tableData[i].game = transGameStr(data[i].gameType)
    tableData[i].teskNum = data[i].roomName
    tableData[i].cc = data[i].cc
    tableData[i].sTime = transTime(data[i].time)
    tableData[i].result = data[i].gameType === 'nn' ? trasResult(data[i].gameType, data[i].result) : trasResult(data[i].gameType, data[i].result).split(' ')

    tableData[i].tradeMx = '下注详情'
    tableData[i].roomId = data[i].roomId
    
    tableData[i].betTime = data[i].betTime ? transTime(data[i].betTime) : data[i].betTime

    let resultData = betInfoData(data[i].xzmx, tableData[i].rType)
    tableData[i].niuniu = resultData[0]
    tableData[i].niuniuBet = resultData[1]
    tableData[i].showResult = tableData[i].niuniu.map((item,index) => {
      return item + ':' + tableData[i].niuniuBet[index]
    })
    tableData[i].betOrderInfo = trasBetResult(data[i].gameType, data[i].xzmx)
    tableData[i].tablePara = getTablePara(
      data[i].gameType,
      tableData[i].betOrderInfo
    )
    if(tableData[i].rType == 'nn') {
      if(data[i].pk != null) {
        // 牛一 至 牛九(a至i)   牛牛,炸弹,无牛(jkl)
        // 0庄赢 1闲赢
        let result = data[i].pk.split("-")
        let result1 = result[0]
        let result2 = result[1].split('')
        const nnResultMap = new Map([
          ["a", ["牛1"]],["b", ["牛2"]],["c", ["牛3"]],["d", ["牛4"]],
          ["e", ["牛5"]],["f", ["牛6"]],["g", ["牛7"]],["h", ["牛8"]],
          ["i", ["牛9"]],["j", ["牛牛"]],["k", ["炸弹"]],["l", ["无牛"]],
          ["default", [""]],
        ])
        var nnResultList = []
        var replaceNNResult = (r) => {
          const action = nnResultMap.get(r) || nnResultMap.get("default")
          nnResultList.push(action[0])
        }
        let nnPreResult = result1.split('')
        nnPreResult.forEach(v => {
          replaceNNResult(v)
        })
        tableData[i].niuniuResult = nnResultList
        tableData[i].niuniuBetResult = result2

        let nnWinLose = data[i].xzmx.split("$")
        nnWinLose.pop();
        let betnnResult = []
        for(let i = 0; i < nnWinLose.length; i++){
          betnnResult.push(nnWinLose[i].split("^")[0])
        }
        let winLoseShow = []
        betnnResult.forEach(v => {
          if(v >= 1 && v <= 4){
            if((v == 1 || v == 3) && result2[0] == 1){
              winLoseShow.push("输")
            }else if((v == 1 || v == 3) && result2[0] == 0) {
              winLoseShow.push("赢")
            }
            if((v == 2 || v == 4) && result2[0] == 1){
              winLoseShow.push("赢")
            }else if((v == 2 || v == 4) && result2[0] == 0) {
              winLoseShow.push("输")
            }
          }else if (v >= 5 && v <= 8) {
            if((v == 5 || v == 7) && result2[1] == 1){
              winLoseShow.push("输")
            }else if((v == 5 || v == 7) && result2[1] == 0) {
              winLoseShow.push("赢")
            }
            if((v == 6 || v == 8) && result2[1] == 1){
              winLoseShow.push("赢")
            }else if((v == 6 || v == 8) && result2[1] == 0) {
              winLoseShow.push("输")
            }
          }else if(v >= 9 && v <= 12){
            if((v == 9 || v == 11) && result2[2] == 1){
              winLoseShow.push("输")
            }else if((v == 9 || v == 11) && result2[2] == 0) {
              winLoseShow.push("赢")
            }
            if((v == 10 || v == 12) && result2[2] == 1){
              winLoseShow.push("赢")
            }else if((v == 10 || v == 12) && result2[2] == 0) {
              winLoseShow.push("输")
            }
          }
        })
        tableData[i].nnWinLose = winLoseShow
      }
    }
    tableData[i].bet_info_x = tableData[i].showResult.join(' ')
    tableData[i].result_x = tableData[i].rType == 'nn' ? tableData[i].result : tableData[i].result.join(' ')
    tableData[i].totalBet = data[i].xz // 权限表
    tableData[i].totalPay = data[i].fh
    tableData[i].win = Number(data[i].yl)
    r.yl += data[i].yl
    tableData[i].xml = (data[i].xml_s || 0) + '/' + (data[i].xml_d || 0)
    tableData[i].xml_s = Number(data[i].xml_s || 0)
    tableData[i].xml_d = Number(data[i].xml_d || 0)
    r.xml_s += data[i].xml_s
    r.xml_d += data[i].xml_d
    tableData[i].xmKind = data[i].xmType
    tableData[i].validBet = Number(data[i].yxxz)
    r.yxxz += data[i].yxxz
    tableData[i].balance = Number(data[i].ye)
    tableData[i].balanceMemo = trasMemo(data[i].memo)
    tableData[i].before_ye = Number((data[i].before_ye).toFixed(0))
    tableData[i].ip = splitIP(data[i].ip)
    tableData[i].terminal = data[i].terminal
    tableData[i].xmf = data[i].xmf
    r.count++
  }
  memberTradeForm.totalItemsNum = rData.totalItem
  memberTradeForm.state = 1
  memberTradeForm.xml_d = rData.xml_d || 0
  memberTradeForm.xml_s = rData.xml_s || 0
  memberTradeForm.yl = rData.yl || 0
  // store.commit('ht/setMemberTradeExport', memberTradeForm)
  if(memberTradeForm.tableData.length === 0) {
    Toast(`您查找的时间段内无记录!`)
    // Message.warning({
    //   message: ([
    //     (`${i18n.t('message.tips')} `),
    //     (`您查找的时间段内无记录!`)
    //   ]),
    //   dangerouslyUseHTMLString: true,
    //   offset: 400,
    //   duration: 2000,
    //   center: true
    // })
  }
  return memberTradeForm
}

export default {
  doData,
  trasResult,
  setAgentAdminForm,
  setMemberAdminForm,
  mapAgentName,
  memberTradeExport
};
