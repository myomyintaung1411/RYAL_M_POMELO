/* eslint-disable */
import axios from 'axios'

const httpHandler = axios.create({
  headers: { 'Content-Type': 'application/json;charset=utf-8' }, // 即将被发送的自定义请求头
  withCredentials: true // 表示跨域请求时是否需要使用凭证
})

let uri = process.env.NODE_ENV === 'development' ? 'hgapi' : 'hgapi'


export function addHgTable(data) {
  let url = `${uri}/control`
  return new Promise((resolve, reject) => {
    httpHandler.post(url, {data: data}).then(resp => {
      resolve(resp)
    }).catch(err => {
      reject(err)
    })
  })
}


export function getHgTableInfo(data) {
  let url = `${uri}/control`
  return new Promise((resolve, reject) => {
    httpHandler.post(url, {data: data}).then(resp => {
      resolve(resp)
    }).catch(err => {
      reject(err)
    })
  })
}
