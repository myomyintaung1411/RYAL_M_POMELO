import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/views/Main.vue'

/* Router Modules */

/**
 * Note: sub-menu only appear when route children.length >= 1
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/google-auth-login',
    component: () => import('@/views/google-auth-login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/NotFound'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index'),
        meta: { title: '控制台', icon: 'dashboard' }
      }
    ]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [

  {
    path: '/manageUser',
    component: Layout,
    name: 'ManageUser',
    meta: { title: '用户管理', icon: 'user' },
    children: [
      {
        path: 'user-list-hj',
        name: 'UsersListHJ',
        component: () => import('@/views/users/index'),
        meta: { title: '用户管理' },
      },
      // {
      //   path: 'phone-acc',
      //   name: 'PhoneAccount',
      //   component: () => import('@/views/users/phone/index'),
      //   meta: { title: '电投账号列表' }
      // },
      // {
      //   path: 'jk-acc',
      //   name: 'ViewJKAccountManage',
      //   component: () => import('@/views/users/jk/index'),
      //   meta: { title: '风控列表' }
      // },
      {
        path: 'lock-account-list',
        name: 'LockList',
        component: () => import('@/views/users/lock-account/index'),
        meta: { title: '子账号列表' }
      },
      {
        path: 'sub-acc',
        name: 'SubAccountManage',
        component: () => import('@/views/users/sub-acc/index'),
        meta: { title: '子账号列表' }
      },
    ]
  },

  {
    path: '/recordsPage',
    component: Layout,
    name: 'RecordsPage',
    meta: { title: '记录管理', icon: 'documentation' },
    children: [
      {
        path: 'bet-records',
        component: () => import('@/views/record/bet-records/index'),
        name: 'BetRecords',
        meta: { title: '游戏记录' }
      },
      {
        path: 'login-records',
        name: 'LoginRecords',
        component: () => import('@/views/record/login/index'),
        meta: { title: '登录记录' }
      },
      {
        path: 'account-change-records',
        name: 'AccountChangeRecords',
        component: () => import('@/views/record/change/index'),
        meta: { title: '修改账号记录' }
      },
      {
        path: 'access-records',
        name: 'AccessRecords',
        component: () => import('@/views/record/updown/index'),
        meta: { title: '上下分记录' }
      },
      {
        path: 'wash-records',
        name: 'WashRecords',
        component: () => import('@/views/record/xmupdown/index'),
        meta: { title: '洗码记录' }
      },
      {
        path: 'withdraw-records',
        component: () => import('@/views/record/withdraw-order-record/index'),
        name: 'WithdrawRecords',
        meta: { title: '提现记录' }
      },
      {
        path: 'money-records',
        component: () => import('@/views/record/water-money-record/index'),
        name: 'MoneyRecords',
        meta: { title: '交易流水' }
      }
    ]
  },
  // {
  //   path: '/onlinePage',
  //   component: Layout,
  //   name: 'OnlinePage',
  //   meta: { title: '在线管理', icon: 'chart' },
  //   children: [
  //     {
  //       path: 'online-members',
  //       component: () => import('@/views/online/online-member/index'),
  //       name: 'OnlineMembers',
  //       meta: { title: '在线用户' }
  //     },
  //     {
  //       path: 'realtime-bet',
  //       component: () => import('@/views/online/real-time-bet/index'),
  //       name: 'RealTimeBet',
  //       meta: { title: '实时下注' }
  //     }
  //   ]
  // },
  {
    path: '/report-page',
    component: Layout,
    name: 'GameReport',
    meta: {
      title: '输赢报表',
      icon: 'money'
    },
    children: [
      {
        path: 'report',
        component: () => import('@/views/report-page/index'),
        name: 'ReportsPage',
        meta: { title: '总报表' }
      },
      // {
      //   path: 'balance',
      //   component: () => import('@/views/report-page/balance/index'),
      //   name: 'TotalBalance',
      //   meta: { title: '余额统计' }
      // },
      // {
      //   path: 'table-summary',
      //   component: () => import('@/views/report-page/table-total/index'),
      //   name: 'TableSummary',
      //   meta: { title: '输赢统计' }
      // }
    ]
  },
  // {
  //   path: '/base-setting/base-setting',
  //   component: () => import('@/views/base-setting/index'),
  //   name: 'BaseSetting',
  //   meta: { title: '公共设置', icon: 'setting' },
  // },
      {
        path: '/service-bind/service-bind',
        component: () => import('@/views/self-bind-service/index'),
        name: 'ServiceBind',
        meta: { title: '客服绑定', icon: 'chat' }

  },

  //     {
  //       path: '/hg-manage/road-list',
  //       component: () => import('@/views/road-list/index'),
  //       name: 'RoadList',
  //       meta: { title: '路单查询', icon: 'icon' }
  //     },
  //   ]
  // },

  /** when your routing map is too long, you can split it into small modules **/

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
