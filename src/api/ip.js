/* eslint-disable */
import axios from 'axios'

const httpHandler = axios.create({
  headers: { 'Content-Type': 'application/json;charset=utf-8' }, // 即将被发送的自定义请求头
  withCredentials: true // 表示跨域请求时是否需要使用凭证
})

let uribd = process.env.NODE_ENV === 'development' ? 'apiii' : 'apiii/bd'
let uri = process.env.NODE_ENV === 'development' ? 'api/inapin' : 'api/inapin'
let services = process.env.NODE_ENV === 'development' ? 'api/services' : 'api/services'

/**
 * 请求百度API接口
 * @param {ip} ip IP Address  
 * @returns
 */
export async function getIP(ip) {
  if (ip == '') return
  
  let url = `${uribd}/api.php?query=${ip}&co=&resource_id=6006&t=1433920989928&ie=utf8&oe=utf-8&format=json`
  let data = await httpHandler.get(url)
  return data
}

export function getUserInfo(data) {
  let url = `${uri}/getAgentInfo`
  // httpHandler.post(url, data)
  // console.log(resp)
  return new Promise((resolve, reject) => {
    httpHandler.post(url, {data: data}).then(resp => {
      resolve(resp)
    }).catch(err => {
      reject(err)
    })
  })
}

export function agentAddServiceApi(data) {
  let url = `${services}/agentAddService`
  // httpHandler.post(url, data)
  // console.log(resp)
  return new Promise((resolve, reject) => {
    httpHandler.post(url, {data: data}).then(resp => {
      resolve(resp)
    }).catch(err => {
      reject(err)
    })
  })
}

export function agentGetOwnServiceApi(data) {
  let url = `${services}/agentGetOwnService`
  return new Promise((resolve, reject) => {
    httpHandler.post(url, {data: data}).then(resp => {
      resolve(resp)
    }).catch(err => {
      reject(err)
    })
  })
}

export function unbindAgentServiceApi(data) {
  let url = `${services}/agentUnbindService`
  return new Promise((resolve, reject) => {
    httpHandler.post(url, {data: data}).then(resp => {
      resolve(resp)
    }).catch(err => {
      reject(err)
    })
  })
}

export function agentEditOwnServiceApi(data) {
  let url = `${services}/agentEditOwnService`
  return new Promise((resolve, reject) => {
    httpHandler.post(url, {data: data}).then(resp => {
      resolve(resp)
    }).catch(err => {
      reject(err)
    })
  })
}
