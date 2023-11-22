import { asyncRoutes, constantRoutes } from '@/router'
import $Global from '@/api/global'
import store from '../index'
/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}
/**
 * Filter permission
 * @accessedRoutes all router
 * @rName filter router name, if exit splice
 * @children (has children or not) // undefined = no children
 */
export function filterPermission(accessedRoutes, rName, children) {
  if (children === undefined) {
    accessedRoutes.forEach((v, i) => {
      if (v.path === rName) {
        accessedRoutes.splice(i, 1)
      }
    })
  } else {
    accessedRoutes.forEach((v, i) => {
      if (v.path === rName) {
        const temp = v.children
        temp.forEach((vv, ii) => {
          if (vv.path === children) {
            temp.splice(ii, 1)
          }
        })
      }
    })
  }
  return accessedRoutes
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({ commit }, roles) {
    return new Promise(resolve => {
      let accessedRoutes
      if (roles.includes('admin')) {
        accessedRoutes = asyncRoutes || []
        const g = $Global.optioner
        if (g.Id !== 1) {
          filterPermission(accessedRoutes, '/manageUser', 'view-acc')
          if (g.Id !== 2 && g.Id !== 1) {
            filterPermission(accessedRoutes, '/manageUser', 'phone-acc')
          }
          filterPermission(accessedRoutes, '/base-setting')
        }
        if (g.gx.includes('^5^')) {
          filterPermission(accessedRoutes, '/recordsPage', 'withdraw-records')
        }
        if (g.arrJxb[2] === '0') {
          filterPermission(accessedRoutes, '/manageUser', 'user-total-list')
        }
        if (g.arrJxb[11] === '0') {
          filterPermission(accessedRoutes, '/manageUser', 'sub-acc')
        }
        if (accessedRoutes[0].children.length === 0) {
          accessedRoutes.splice(0, 1)
        }

        if (g.arrJxb[9] === '0') {
          filterPermission(accessedRoutes, '/recordsPage', 'bet-records')
        }

        if (g.Id !== 1 && store.getters?.subInfo?.id !== 69255) {
          filterPermission(accessedRoutes, '/hg-manage')
        }
        if (store.getters?.subInfo?.id === 69255) {
          filterPermission(accessedRoutes, '/hg-manage', 'table-list')
        }

        if (g.Id !== 1) {
          filterPermission(accessedRoutes, '/public-announcement')
        }
        if (g.Id !== 1) {
          filterPermission(accessedRoutes, '/onlinePage')
        }
        // if (g.arrJxb[17] === '0') {
        //   filterPermission(accessedRoutes, '/public-announcement')
        // }
        // if (g.arrJxb[10] === '0') {
        //   filterPermission(accessedRoutes, '/onlinePage')
        // }
        if (g.arrJxb[8] === '0') {
          filterPermission(accessedRoutes, '/report-page', 'report')
        }
        if (g.Id !== 1) {
          filterPermission(accessedRoutes, '/report-page', 'table-summary')
        }
        // 电投代理，监控子号
        if (g.Id === 2 || store.getters?.subInfo?.id === 69255) {
          filterPermission(accessedRoutes, '/service-bind')
          filterPermission(accessedRoutes, '/report-page')
          filterPermission(accessedRoutes, '/recordsPage')
          filterPermission(accessedRoutes, '/manageUser', 'user-list-hj')
        }

        if (store.getters?.subInfo?.id === 69255) {
          filterPermission(accessedRoutes, '/manageUser')
          filterPermission(accessedRoutes, '/base-setting')
        }
      } else {
        accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
      }
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
