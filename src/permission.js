import router from './router'
import store from './store'
import { Toast } from 'vant'
import getPageTitle from '@/utils/get-page-title'
import $Global from '@/api/global'
import { getHtInfo, getToken, getGoogleAuth } from '@/utils/auth'
import pomelo from '@/api/leaf'
import md5 from 'js-md5'


const whiteList = ['/login', '/auth-redirect'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  // start progress bar

  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  const token = $Global.optioner.token
  const ga_ = getGoogleAuth()
  if (token !== '') {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      if ($Global.optioner.securityLevel === 1 && $Global.optioner.gauth === 1) {
        if (ga_ === undefined) {
          next({ path: '/google-auth-login' })
        } else {
          next({ path: '/' })
        }
      } else {
        next({ path: '/' })
      }
    } else {
      // determine whether the user has obtained his permission roles through getInfo
      const hasRoles = store.getters.roles && store.getters.roles.length > 0
      // const ga_ = getGoogleAuth()
      if (hasRoles) {
        // console.log('hasrole')
        if ($Global.optioner.securityLevel === 1 && $Global.optioner.gauth === 1) {
          if (ga_) {
            next()
          } else {
            // router.go(-1)
            if (to.path === '/google-auth-login') next()
            next(false)
          }
        } else {
          next()
        }
      } else {
        try {
          if (to.path === '/login') {
            await store.dispatch('user/resetToken')
            next(`/login?redirect=${to.path}`)
          } else {
            // get user info
            // note: roles must be a object array! such as: ['admin'] or ,['developer','editor']
            const roles = await store.dispatch('user/getInfo')
            // generate accessible routes map based on roles
            const accessRoutes = await store.dispatch('permission/generateRoutes', roles)
            // dynamically add accessible routes
            router.addRoutes(accessRoutes)

            // hack method to ensure that addRoutes is complete
            // set the replace: true, so the navigation will not leave a history record
            next({ ...to, replace: true })
          }
        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch('user/resetToken')
          Toast(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
        }
      }
    }
  } else {
    /* has no token*/
    const token = getToken()
    let info = getHtInfo()

    if (info !== undefined) {
      info = JSON.parse(info)
    }

    // console.log('token      ', token, to, from)
    if (token !== undefined && info !== undefined) {
      if (to.path === '/dashboard') {
        await store.dispatch('user/logout')
        next(`/login`)
        return
      }
      const sendStr = {
        router: 'Login',
        JsonData: { name: info.account, password: md5(info.password + ''), ip: '', terminal: 'pc' }
      }
      store.dispatch('user/login', sendStr)
        .then(() => {
          pomelo.conn((err, res) => {
            if (err) console.error(err)
            if (res.code === 200) {
              $Global.Pass = info.password
              store.dispatch('user/getRelations')

              let query = getOtherQuery(router.app.$route.query)
              if (query === null || query === undefined) {
                query = ''
              }
              const ga_ = getGoogleAuth()
              if ($Global.optioner.securityLevel === 1 && $Global.optioner.gauth === 1) {
                if (ga_ === undefined && ga_ !== true) {
                  next({ path: '/google-auth-login' })
                }
                if (ga_) {
                  next({ path: `${to.path}` || '/', query: query })
                }
              } else {
                next({ path: `${to.path}` || '/', query: query })
              }
            } else {
              next(`/login?redirect=${to.path}`)
            }
          })
        })
        .catch((e) => {
          console.error(e)
        })
      // next(`/login?redirect=${to.path}`)
    } else {
      if (whiteList.indexOf(to.path) !== -1) {
        // in the free login whitelist, go directly
        if (to.path === '/dashboard') {
          await store.dispatch('user/logout')
          next()
          return
        }
        next()
      } else {
        // other pages that do not have permission to access are redirected to the login page.
        next(`/login?redirect=${to.path}`)
      }
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  // NProgress.done()
})

function getOtherQuery(query) {
  return Object.keys(query).reduce((acc, cur) => {
    if (cur !== 'redirect') {
      acc[cur] = query[cur]
    }
    return acc
  }, {})
}
