import request from '@/utils/request'

export function getUserListApi(data) {
  return request({
    url: '/admins/get_user_list',
    method: 'post',
    data
  })
}

export function getUpDownRelationListApi(data) {
  return request({
    url: '/admins/get_dw_relation_list',
    method: 'post',
    data
  })
}

export function addMemberApi(data) {
  return request({
    url: '/admins/add_member',
    method: 'post',
    data
  })
}

export function doPlayerPointApi(data) {
  return request({
    url: '/admins/do_point_player',
    method: 'post',
    data
  })
}

export function doAgentPointApi(data) {
  return request({
    url: '/admins/do_point_agent',
    method: 'post',
    data
  })
}

export function getReferenceInfoApi(data) {
  return request({
    url: '/admins/reference_info',
    method: 'post',
    data
  })
}

export function setUpMemberApi(data) {
  return request({
    url: '/admins/edit_member',
    method: 'post',
    data
  })
}

export function getXmInfoApi(data) {
  return request({
    url: '/admins/get_xm_info',
    method: 'post',
    data
  })
}

export function xmApi(data) {
  return request({
    url: '/admins/do_xm',
    method: 'post',
    data
  })
}

export function kickMemberApi(data) {
  return request({
    url: '/admins/kick_member',
    method: 'post',
    data
  })
}

export function removeGauthApi(data) {
  return request({
    url: '/admins/remove_gauth',
    method: 'post',
    data
  })
}

export function resetToZeroApi(data) {
  return request({
    url: '/admins/to_zero',
    method: 'post',
    data
  })
}

export function removeXmApi(data) {
  return request({
    url: '/admins/remove_xm',
    method: 'post',
    data
  })
}

export function getJxbApi(data) {
  return request({
    url: '/admins/reference_xbj',
    method: 'post',
    data
  })
}

export function setUserGxbApi(data) {
  return request({
    url: '/admins/do_gxb_user',
    method: 'post',
    data
  })
}

export function updatePfApi(data) {
  return request({
    url: '/admins/update_pf',
    method: 'post',
    data
  })
}

export function elUserApi(data) {
  return request({
    url: '/admins/el_user_one',
    method: 'post',
    data
  })
}

export function requestGAuthApi(data) {
  return request({
    url: '/admins/request_auth_bind',
    method: 'post',
    data
  })
}

export function bindGauthApi(data) {
  return request({
    url: '/admins/bind_google_auth',
    method: 'post',
    data
  })
}

export function removeOwnGauthApi(data) {
  return request({
    url: '/admins/remove_gauth',
    method: 'post',
    data
  })
}

export function userStatusApi(data) {
  return request({
    url: '/admins/state_info_change',
    method: 'post',
    data
  })
}

export function getPhoneListApi(data) { // user/member/phone/
  return request({
    url: '/admins/get_phone_list',
    method: 'post',
    data
  })
}
export function getPhoneTableListApi(data) { // user/member/phone/
  return request({
    url: '/admins/get_tlist',
    method: 'post',
    data
  })
}
export function addPhoneUserListApi(data) { // user/member/phone/
  return request({
    url: '/admins/add_phone',
    method: 'post',
    data
  })
}
export function DeletePhoneUserListApi(data) { // user/member/phone/
  return request({
    url: '/admins/del_phone',
    method: 'post',
    data
  })
}
export function EditPhoneUserListApi(data) { // user/member/phone/
  return request({
    url: '/admins/edit_phone',
    method: 'post',
    data
  })
}
export function SetPhoneTableListApi(data) { // user/member/phone/
  return request({
    url: '/admins/set_phone_table',
    method: 'post',
    data
  })
}

export function getJKListApi(data) { // user/jk/
  return request({
    url: '/admins/get_jk_list',
    method: 'post',
    data
  })
}
export function AddJKUserListApi(data) { // user/jk/
  return request({
    url: '/admins/add_jk',
    method: 'post',
    data
  })
}
export function EditJKUserListApi(data) { // user/jk/
  return request({
    url: '/admins/edit_jk',
    method: 'post',
    data
  })
}
export function DelJKUserListApi(data) { // user/jk/
  return request({
    url: '/admins/del_jk',
    method: 'post',
    data
  })
}
export function GetSubListApi(data) { // user/sub-acc/
  return request({
    url: '/admins/get_sub_list',
    method: 'post',
    data
  })
}
export function AddSubListApi(data) { // user/sub-acc/
  return request({
    url: '/admins/add_sub',
    method: 'post',
    data
  })
}
export function EditSubListApi(data) { // user/sub-acc/
  return request({
    url: '/admins/edit_sub',
    method: 'post',
    data
  })
}
export function SubStatusListApi(data) { // user/sub-acc/
  return request({
    url: '/admins/set_sub_status',
    method: 'post',
    data
  })
}

// record
export function loginRecordApi(data) {
  return request({
    url: '/admins/get_lg_list',
    method: 'post',
    data
  })
}
export function changeRecordApi(data) {
  return request({
    url: '/admins/get_ch_list',
    method: 'post',
    data
  })
}
export function updownRecordApi(data) {
  return request({
    url: '/admins/get_ud_list',
    method: 'post',
    data
  })
}
export function getUIdUpDownApi(data) { // record/updown
  return request({
    url: '/admins/get_ud_id',
    method: 'post',
    data
  })
}
export function moneyRecordApi(data) { // record/water-money-record
  return request({
    url: '/admins/get_ye_list',
    method: 'post',
    data
  })
}
export function getUIdmoneyRecordApi(data) { // record/water-money-record
  return request({
    url: '/admins/get_ye_id',
    method: 'post',
    data
  })
}
export function getWithdrawOrderListApi(data) { // record/withdraw-order-record
  return request({
    url: '/admins/get_wd_list',
    method: 'post',
    data
  })
}
export function getWithdrawTodoApi(data) { // record/withdraw-order-record
  return request({
    url: '/admins/ge_withd_todo',
    method: 'post',
    data
  })
}
export function AcceptWithdrawOrderApi(data) { // record/withdraw-order-record
  return request({
    url: '/admins/do_wd_rec',
    method: 'post',
    data
  })
}
export function DeleteWithdrawOrderApi(data) { // record/withdraw-order-record
  return request({
    url: '/admins/del_wd_rec',
    method: 'post',
    data
  })
}
export function RejectWithdrawOrderApi(data) { // record/withdraw-order-record
  return request({
    url: '/admins/rej_wd_rec',
    method: 'post',
    data
  })
}
export function getBetRecordsListApi(data) { // record/bet-records
  return request({
    url: '/admins/get_gr_list',
    method: 'post',
    data
  })
}
export function getOnlineUser(data) { // online/online-member
  return request({
    url: '/admins/get_online_user',
    method: 'post',
    data
  })
}
export function getRealTimeBetApi(data) { // online/real-time-bet
  return request({
    url: '/admins/get_ontime_bet',
    method: 'post',
    data
  })
}
export function getReportListApi(data) { // report-page
  return request({
    url: '/admins/get_rp_list',
    method: 'post',
    data
  })
}
export function getReportDailyApi(data) { // report-page
  return request({
    url: '/admins/get_rp_one',
    method: 'post',
    data
  })
}
export function getReqWithdrawApi(data) { // report-page
  return request({
    url: '/admins/req_withd',
    method: 'post',
    data
  })
}
export function GetDashboardApi(data) { // dash
  return request({
    url: '/admins/get_dashboard',
    method: 'post',
    data
  })
}
export function EditSocialApi(data) { // dash
  return request({
    url: '/admins/edit_social_own',
    method: 'post',
    data
  })
}
export function GetBaseAddApi(data) { // base
  return request({
    url: '/admins/get_base_address',
    method: 'post',
    data
  })
}
export function SetBaseAddApi(data) { // base
  return request({
    url: '/admins/set_base_address',
    method: 'post',
    data
  })
}
export function GetBlackIpsApi(data) { // base
  return request({
    url: '/admins/get_b_ips',
    method: 'post',
    data
  })
}
export function AddBlackIpApi(data) { // base
  return request({
    url: '/admins/add_b_ip',
    method: 'post',
    data
  })
}
export function DeleteBlackIpApi(data) { // base
  return request({
    url: '/admins/del_b_ip',
    method: 'post',
    data
  })
}
export function GetNoticeMsgApi(data) { // base
  return request({
    url: '/admins/get_notice_msg',
    method: 'post',
    data
  })
}
export function SetNoticeMsgApi(data) { // base
  return request({
    url: '/admins/set_notice_msg',
    method: 'post',
    data
  })
}
export function SelfBindServiceApi(data) { // base
  return request({
    url: '/admins/self_bind_service',
    method: 'post',
    data
  })
}
export function UnBindServiceApi(data) { // base
  return request({
    url: '/admins/unbind_service',
    method: 'post',
    data
  })
}
export function SearchAgentServiceApi(data) { // base
  return request({
    url: '/admins/search_agnet_service',
    method: 'post',
    data
  })
}
export function GetTableOpenJcApi(data) { // road-list
  return request({
    url: '/admins/get_table_open_jc',
    method: 'post',
    data
  })
}
export function GetTableHistoryApi(data) { // road-list
  return request({
    url: '/admins/get_table_historys',
    method: 'post',
    data
  })
}
export function SettingTableListApi(data) { // road-list
  return request({
    url: '/admins/setting_table_list',
    method: 'post',
    data
  })
}
export function TotalBalanceApi(data) { // total-balance
  return request({
    url: '/admins/total_balance',
    method: 'post',
    data
  })
}
export function setShowXmApi(data) { // set_show_xm
  return request({
    url: '/admins/set_show_xm',
    method: 'post',
    data
  })
}
export function changeYjApi(data) { // update_yj
  return request({
    url: '/admins/update_yj',
    method: 'post',
    data
  })
}
export function returnScordApi(data) {
  return request({
    url: '/admins/return_score',
    method: 'post',
    data
  })
}
export function getTableWinLoseApi(data) {
  return request({
    url: '/admins/get_table_win_lose',
    method: 'post',
    data
  })
}
export function memberTradeExportApi(data) {
  return request({
    url: '/admins/member_trade_export',
    method: 'post',
    data
  })
}
