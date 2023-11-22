import Vue from 'vue';
import Router from 'vue-router';
import Main from '../views/Main.vue';
import store from '../store/index'

Vue.use(Router);

const routes = [
  {
    path: '/',
    name: 'Main',
    meta: { title: 'Main',requireAuth: true},
    component: Main,
    redirect: '/home',
    children:[
      {
        path: '/home',
        name: 'Home',
        meta: { title: 'Home',requireAuth: true },
        component: () => import('../views/Home.vue')
      },
    ],
    },
    {
      path: '/login',
      name: 'Login',
      meta: { title: 'Login',requiresVisitor: true },
      component: () => import('../views/Login.vue')
    },
    { path: '/:path(.*)', component: () => import('../views/NotFound.vue')},
];

const router = new Router({
  mode: 'history',
  base: import.meta.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const loginInfo = store.getters.loginDataGetter
   console.log(loginInfo,"loginINfo")
  const token = loginInfo?.token
  console.log(token,"router token");
  if (to.matched.some(record => record.meta.requiresVisitor)
  ) {
    if (token) {
      next('/')
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.requireAuth)) {
    if (!token) {
      next('/login')
    } else {
      next()
    }
  } else {
    next()
  }
  // next()

});

export default router;
