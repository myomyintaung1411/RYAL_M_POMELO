import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/signIn',
    method: 'post',
    data
  })
}

export function getAgentTree(data) {
  return request({
    url: '/GetAgentTree',
    method: 'post',
    data
  })
}

export function googeAuthLogin(data) {
  return request({
    url: '/google-auth-login',
    method: 'post',
    data
  })
}

export function getGoogeAuthLink(data) {
  return request({
    url: '/request-auth-bind',
    method: 'post',
    data
  })
}

export function bindGoogeAuth(data) {
  return request({
    url: '/bind-google-auth',
    method: 'post',
    data
  })
}

export function memberTradeExportApi(data) {
  return request({
    url: '/memberTradeExport',
    method: 'post',
    data
  })
}

// export function resetPasswordOne() {
//   return request({
//     url: '/resetPasswordOne',
//     method: 'post'
//   })
// }
