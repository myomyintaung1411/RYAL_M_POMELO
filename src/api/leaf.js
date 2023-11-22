/* eslint-disable */
import './LeafyClient.js'
import { Toast } from 'vant'
import { setLogout } from '@/utils/auth'
import global from './global'
import AES from './aes'
import ws from './ws2'
var nHeartBeat = 0
var s_timer = null
var interval = null
var isConn = true
var kickk = false
var reconnet_success = false
var p_server = new Pomelo()
var p_server2 = new Pomelo()

/**
 * @name conn
 * @param {Function} cb
 * @description 链接pomelo函数
 * 1  链接 gate =》 断开 gate
 * 2  链接 connector
 * 3  开始每隔5秒ping(heartBeat)
 */
function conn(cb) {
  const en = global.en
  var loginInfo = JSON.parse(AES.decrypt(localStorage.getItem('_SinDds_'), en))
  var msg = { uid: loginInfo.login_id }
  var msg2 = { userId: loginInfo.login_id, token: loginInfo.login_token }
  // console.log('init pml ', { host: process.env.VUE_APP_BASE_POMELO, port: process.env.VUE_APP_BASE_WSPORT1, log: true })
  p_server.init({ host: '192.168.1.80', port: '8014', log: true },
    function () {
      // console.log('first init ...')
      p_server.request('gate.gateHandler.queryEntry', msg, function (res) {
        // console.log('first res ', res)
        p_server.disconnect()
        if (res.code === 200) {
          p_server2.init(
            { host: '192.168.1.80', port: '8010', log: true },
            function (res) {
              // console.log('second res ', res)
              p_server2.request('connector.entryHandler.entry', msg2, function (res) {
                console.log('初始链接成功')
                if (res.code === 200) {
                  isConn = false
                  // clsInterval(interval)
                  // clsInterval(s_timer)
                  // startTimer()
                  cb(null, res)
                }
              })
            }
          )
        }
      })
    }
  )
}

p_server2.on('close', function (e) {
  console.log('close 断线关闭', new Date())
  isConn = true
  reconnet_success = false
  clsInterval(interval)
  // 连接关闭
  if(isConn) {
    interval = setInterval(() => {
      // console.log(11111, 'interval conn')
      if (isConn) {
        conn(function (err, res) {
          if (res.code == 200) {
            clsInterval(interval)
            reconnet_success = true
            console.log('是否链接成功 ', isConn)
          }
        })
      }
    }, 5000)
  }
})

p_server2.on('onMsg', function (e) {
  // console.log('----onMsg------:', e)
  ws.doData(e)
})

// 被踢开
p_server2.on('onKick', function (e) {
  console.log('kkkkkkkkkkkkkkkkkkkkkk onKIck', e)
  kickk = true
  nHeartBeat = 0
  clsInterval(interval)
  clsInterval(s_timer)
  p_server2.disconnect()
  kick()
})

// 被踢开
function kick() {
  setLogout()
}

var n = 0
/**
 * 发送报文函数
 * @param {Json Object} msg 
 * @description 记得发送前对json对象AES加密
 */
function send(msg) {
  n = n + 1
  const en = global.en
  const msgSend = AES.encrypt(JSON.stringify(msg), en)
  // console.log('----------------- send  ', n, '------', msg)
  var route = 'agent.agentHandler.getMsg'
  p_server2.request(route, msgSend, function (res) {
    ws.doData(res)
  })
}

function sendcb(msg, cb) {
  n = n + 1
  const en = global.en
  const msgSend = AES.encrypt(JSON.stringify(msg), en)
  var route = 'agent.agentHandler.getMsg'
  p_server2.request(route, msgSend, function (res) {
    // console.log('res ', res)
    cb(JSON.parse(AES.decrypt(res, en)))
  })
}

/**
 * @name clsInterval
 * @description 清除定时器函数
 * @param {timer_Interval} interval 
 */
function clsInterval(interval) {
  if(interval !== null) {
    clearInterval(interval)
    interval = null
  }
}

/**
 * @name startTimer
 * @description 登录成功后，开始计时心跳
 */
function startTimer() {
  clsInterval(s_timer)
  s_timer = setInterval(() => {
    chkHeartBeat(p_server2)
  }, 5000)
}

/**
 * 心跳包机制函数
 * @name chkHeartBeat
 * @param {pomelo 链接} server
 * @description 返回值 07：正常链接中，否则链接有问题  nHeartBeat += 5 超过40秒提示
 */
function chkHeartBeat(server) {
  console.log('自动检测状态', nHeartBeat)
  if (nHeartBeat > 10) {
    console.log('重连时间过长...请检查网络链接或重新登录!')
    if(!reconnet_success) {
      Toast(
        '您的网络状态不佳，请检查网络或重新登录! 努力重连中...',
      )
    }
    if(nHeartBeat > 300) {
      clsInterval(s_timer)
      server.disconnect()
      window.location.reload()
    }
  }
  nHeartBeat += 5
  var msg = { uid: global.optioner.Id } // 记得改
  var route = 'agent.agentHandler.chkHardBean'
  server.request(route, msg, function (data) {
    if (data.code === '07') {
      nHeartBeat = 0
    }
  })
}

export default { conn, send, kick, sendcb }
