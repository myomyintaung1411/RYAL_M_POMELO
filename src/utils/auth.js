import Cookies from 'js-cookie'
import AES from '@/api/aes'
import $Global from '@/api/global'
import store from '@/store'

const TokenKey = 'Horizon'
const AutoLogin = '__AL'
const HtInfo = '_XForIn_'
const en = $Global.en
const GoogleAuth = 'GAThuAurh'
// 自动登录有效时间为 1小时 { expires: expTime }
const expTime = new Date(new Date().getTime() + (7 * 24 * 1 * 60 * 60 * 1000))

export function getGoogleAuth() {
  return Cookies.get(GoogleAuth)
}

export function setGoogleAuth(auth) {
  return Cookies.set(GoogleAuth, auth, { expires: expTime })
}

export function removeGoogleAuth() {
  return Cookies.remove(GoogleAuth)
}

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function setAutoLogin(atoln) {
  return Cookies.set(AutoLogin, atoln, { expires: expTime })
}

export function getAutoLogin() {
  return Cookies.get(AutoLogin)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function setHtInfo(info) {
  return Cookies.set(HtInfo, AES.encrypt(info, en), { expires: expTime })
}

export function getHtInfo() {
  const info = Cookies.get(HtInfo)
  if (info !== undefined) {
    return AES.decrypt(AES.decrypt(Cookies.get(HtInfo), en), en)
  }
  return undefined
}

export function getLIToken() {
  return AES.decrypt(localStorage.getItem('_SinDds_'), en)
}

export function setAlertState(alerts) {
  store.state.user.alert.visible = alerts
  return Cookies.set('Alert_', Boolean(alerts), { expires: expTime })
}

export function getAlertState() {
  return Cookies.get('Alert_')
}

export function removeAlert() {
  return Cookies.remove('Alert_')
}

export function setLogout() {
  localStorage.removeItem('_SinDds_')
  Cookies.remove(HtInfo)
  Cookies.remove(AutoLogin)
  window.location.reload()
}
