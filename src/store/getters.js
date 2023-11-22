const getters = {
  sidebar: state => state.app.sidebar,
  language: state => state.app.language,
  size: state => state.app.size,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  introduction: state => state.user.introduction,
  roles: state => state.user.roles,
  permission_routes: state => state.permission.routes,
  errorLogs: state => state.errorLog.logs,
  subInfo: state => state.user.subInfo,

  agentTree: state => state.ht.treeData,

  // 添加代理、会员 ===== 是否成功状态
  EDIT_MEMBER_OK: state => state.ht.edit_member_ok,
  // 添加自己的代理、会员 ===== 是否成功状态
  EDIT_MY_MEMBER_OK: state => state.ht.edit_my_member_ok,
  // 修改自己的密码 ===== 是否成功状态
  EDIT_PASSWORD_OK: state => state.ht.edit_pw_ok,
  // 代理、会员上下分====是否成功状态
  UPDOWN_OK: state => state.ht.updown_ok,
  UPDOWN_OK_PLAYER: state => state.ht.updown_ok_player,
  // 设定代理、会员====是否成功状态
  MODIFY__OK: state => state.ht.modify_ok,
  MODIFY__OK_PLAYER: state => state.ht.modify_player_ok,
  // 搜索会员，数据变化状态
  SEARCH_MEMBER_OK: state => state.ht.search_member_ok,

  // 设置最后洗码时间状态
  SETLASTXMTIME_OK: state => state.ht.lastXmState,
  SETLASTXMTIME_OK_PLAYER: state => state.ht.lastXmStatePlayer,

  // Loading state
  // 登录记录
  LG_ISLOADING: state => state.ht.loginRecordForm.state,
  // 上下分记录
  UD_ISLOADING: state => state.ht.accountRecordForm.state,
  WASH_ISLOADING: state => state.ht.washRecordForm.state,
  WASH_SUMMARY_ISLOADING: state => state.ht.washSummaryList.state,
  // 账号变更记录
  AC_ISLOADING: state => state.ht.accountChangeRecordForm.state,
  // 报表记录
  RP_ISLOADING: state => state.ht.reportForm.state,
  // 游戏记录
  BETR_ISLOADING: state => state.ht.memberTradeForm.state,
  // 代理表
  AGL_ISLOADING: state => state.ht.agentAdminForm.state,
  // 会员表
  PLL_ISLOADING: state => state.ht.memberListForm.state,
  // 代理总表
  ATL_ISLOADING: state => state.ht.agentTotalListForm.state,
  // 会员总表
  PTL_ISLOADING: state => state.ht.memberTotalListForm.state
}
export default getters
