import { login, googeAuthLogin } from '@/api/user'
import { getToken, setToken, removeToken, setLogout, removeGoogleAuth, removeAlert } from '@/utils/auth'
import router, { resetRouter } from '@/router'
import { Toast } from 'vant'
import AES from '@/api/aes'
import $Global from '@/api/global'
import $ws from '@/api/ws2'
import { getAgentTree } from '@/api/user'
import { getData, setTreeData } from '@/api/tree'

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  introduction: '',
  roles: [],
  isSubAccount: false,
  subInfo: {},
  alert: {
    visible: false,
    data: ''
  }
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_IsSubAcc: (state, bool) => {
    state.isSubAccount = bool
  },
  SET_SubInfo: (state, data) => {
    state.subInfo = data
  }
}

const actions = {
  // user login
  login({ commit }, sendStr) {
    // const { username, password } = sendStr
    return new Promise((resolve, reject) => {
      const en = $Global.en
      login({ data: AES.encrypt(JSON.stringify(sendStr), en) }).then(response => {
        var body = response.data
        var msg = JSON.parse(AES.decrypt(body, en))
        // console.log('login response ', msg, sendStr)
        if (msg.router === 'LoginErr') {
          Toast(msg.reason)
          reject()
        }
        if (msg.JsonData.enable === 0) {
          Toast('亲, 您的帐户被锁定, 请联系上级!')
          reject()
        }
        if (msg.JsonData.level !== 2 && msg.JsonData.level !== 1 && msg.JsonData.level !== 4) {
          Toast('账号或密码错误!')
          reject()
        }

        $ws.doData(body)
        $Global.optioner.UserName = msg.JsonData.name
        $Global.optioner.Nickname = msg.JsonData.nickname
        $Global.optioner.Id = msg.JsonData.Id
        $Global.selectInfo.selectAgent = msg.JsonData.name
        $Global.optioner.xmb_s = msg.JsonData.xmb_s
        $Global.optioner.xmb_d = msg.JsonData.xmb_d
        $Global.optioner.zcb = msg.JsonData.zcb
        $Global.optioner.gx = msg.JsonData.gx
        $Global.optioner.xmType = msg.JsonData.xmType === 0 ? '双边' : '单边'
        $Global.optioner.arrJxb = msg.JsonData.jxb.split(',')
        $Global.optioner.level = msg.JsonData.level
        $Global.optioner.token = msg.JsonData.token
        $Global.optioner.webSit = msg.JsonData.webSit
        $Global.optioner.securityLevel = msg.JsonData.securityLevel
        $Global.optioner.lastChangePw = msg.JsonData.lastChangePw
        $Global.optioner.gauth = msg.JsonData.gauth
        $Global.optioner.customerId = msg.JsonData.customerId
        $Global.gxLength = msg.JsonData.gx.split('^').length
        if (msg.JsonData.xh) {
          $Global.optioner.xh_min = msg.JsonData.xh.split('-')[0]
          $Global.optioner.xh_max = msg.JsonData.xh.split('-')[1]
        } else {
          $Global.optioner.xh_min = 20
          $Global.optioner.xh_max = 50000
        }
        commit('SET_NAME', msg.JsonData.name)
        $Global.optioner.topup_auth = msg.JsonData.yj // 在线充值权限
        $Global.optioner.yj = msg.JsonData.yj // 在线充值权限
        $Global.optioner.auto_wash = msg.auto_wash
        $Global.optioner.wash_type = msg.wash_type
        $Global.optioner.referralCode = msg.JsonData.referralCode

        // if ($Global.optioner.gx.indexOf('^1^318') !== -1) {
        //   $Global.isUsed_000Format = true
        // }

        if (msg.JsonData.mainAccountInfo && msg.JsonData.mainAccountInfo.Id) {
          $Global.optioner.Id = msg.JsonData.mainAccountInfo.Id
          $Global.optioner.gx = msg.JsonData.mainAccountInfo.gx
          $Global.gxLength = msg.JsonData.mainAccountInfo.gx.split('^').length
          $Global.optioner.UserName = msg.JsonData.mainAccountInfo.name
          $Global.optioner.xmType = msg.JsonData.mainAccountInfo.xmType === 0 ? '双边' : '单边'
          $Global.optioner.xmb_d = msg.JsonData.mainAccountInfo.xmb_d
          $Global.optioner.xmb_s = msg.JsonData.mainAccountInfo.xmb_s
          $Global.optioner.ye = msg.JsonData.mainAccountInfo.ye
          $Global.optioner.zcb = msg.JsonData.mainAccountInfo.zcb
          if (msg.JsonData.mainAccountInfo.xh) {
            $Global.optioner.xh_min = msg.JsonData.mainAccountInfo.xh.split('-')[0]
            $Global.optioner.xh_max = msg.JsonData.mainAccountInfo.xh.split('-')[1]
          } else {
            $Global.optioner.xh_min = 20
            $Global.optioner.xh_max = 50000
          }
          $Global.optioner.topup_auth = msg.JsonData.mainAccountInfo.yj // 在线充值权限
          $Global.optioner.auto_wash = msg.JsonData.mainAccountInfo.auto_wash
          $Global.optioner.wash_type = msg.JsonData.mainAccountInfo.wash_type
          commit('SET_IsSubAcc', true)
          commit('SET_SubInfo', { id: msg.JsonData.Id, name: msg.JsonData.name })
        }
        // eslint-disable-next-line
        // msg.JsonData.jxb.split(',')[19] == 1 ? $Global.optioner.isPf = true : $Global.optioner.isPf = false
        msg.JsonData.pf === 1 ? $Global.optioner.isPf = true : $Global.optioner.isPf = false
        // eslint-disable-next-line
        $Global.gxLength == 3 ? $Global.optioner.isTop = true : $Global.optioner.isTop = false
        commit('SET_TOKEN', msg.JsonData.token)
        setToken(msg.JsonData.token)
        resolve(msg)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      // let token = getToken()
      if ($Global.optioner.token !== '') {
        commit('SET_ROLES', ['admin'])
        //commit('SET_AVATAR', require('@/assets/images/admin.png'))
        resolve(['admin'])
      } else {
        reject('请重新登录验证')
      }
    })
  },

  // user logout
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      setLogout()
      // logout(state.token).then(() => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resetRouter()
      removeGoogleAuth()
      removeAlert()

      // reset visited views and cached views
      // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
      dispatch('tagsView/delAllViews', null, { root: true })

      resolve()
    })
  },

  // google auth login
  googleLogin({ commit, state, dispatch }, data) {
    return new Promise((resolve, reject) => {
      const en = $Global.en
      googeAuthLogin({ data: AES.encrypt(JSON.stringify(data), en) }).then(res => {
        const body = res.data
        res = JSON.parse(AES.decrypt(body, en))
        // console.log('google auth login ', res, data)
        if (res?.JsonData?.result === 'ok') {
          resolve(res)
          // setGoogleAuth(true)
        } else {
          resolve(res)
        }
      }).catch(e => {
        console.error(e)
        reject(e)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      removeGoogleAuth()
      resolve()
    })
  },

  // dynamically modify permissions
  async changeRoles({ commit, dispatch }, role) {
    const token = role + '-token'

    commit('SET_TOKEN', token)
    setToken(token)

    const { roles } = await dispatch('getInfo')

    resetRouter()

    // generate accessible routes map based on roles
    const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })
    // dynamically add accessible routes
    router.addRoutes(accessRoutes)

    // reset visited views and cached views
    dispatch('tagsView/delAllViews', null, { root: true })
  },

  // get Agent's Relationship DataList
  async getRelations({ commit, state }) {
    const en = $Global.en
    const res = await getAgentTree({ data: AES.encrypt(JSON.stringify({
      Id: $Global.optioner.Id, optioner_name: $Global.optioner.UserName, token: state.token,
      proxyname: state.isSubAccount ? state.name : ''
    }), en) })
    const resp = JSON.parse(AES.decrypt(res.data, en))
    if (resp.JsonData.code && resp.JsonData.code === 1002) {
      Toast('登录时效已过期，请重新登录！')
      setTimeout(() => {
        localStorage.removeItem('_SinDds_')
        window.location.reload()
      }, 1000)
      return
    }
    console.log(resp,"from ************getRealitons")
    if (resp.JsonData){
      var treeData = {}
      treeData.tableData = resp.JsonData
      setTreeData(treeData, resp.JsonData)
      if (treeData.tableData.length > 0) {
        getData(treeData)
      }
    }
    // return Toast(resp.JsonData.msg)

  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
