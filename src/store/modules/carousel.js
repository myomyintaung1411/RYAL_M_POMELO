import moment from 'moment'

const state = {
  imgList: { tableData: [], total: 0, totalItem: 0, state: 0 },
  ipList: { tableData: [], total: 0, totalItem: 0, state: 0 }
}

const mutations = {
  SET_IMGLIST(state, payload) {
    state.imgList.tableData = payload
  },
  SET_IPBLACKLIST(state, payload) {
    state.ipList.tableData = payload.data.map(v => {
      v.created_at = moment(v.created_at).format('YYYY-MM-DD HH:mm:ss')
      v.updated_at && (v.updated_at = moment(v.updated_at).format('YYYY-MM-DD HH:mm:ss'))
      // eslint-disable-next-line
      v.status = v.status === 1 ? '启用' : '禁用'
      return v
    })
    state.ipList.totalItem = payload.total
    state.ipList.total = payload.total
  }
}

const actions = {
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

