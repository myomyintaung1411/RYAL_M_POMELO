import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import carousel from './modules/carousel'
import errorLog from './modules/errorLog'
import ht from './modules/ht'
import permission from './modules/permission'
import settings from './modules/settings'
import tagsView from './modules/tagsView'
import user from './modules/user'
Vue.use(Vuex)

// https://webpack.js.org/guides/dependency-management/#requirecontext
// const modulesFiles = require.context('./modules', true, /\.js$/)

// you do not need `import app from './modules/app'`
// it will auto require all vuex module from modules file
// const modules = modulesFiles.keys().reduce((modules, modulePath) => {
//   // set './app.js' => 'app'
//   const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
//   const value = modulesFiles(modulePath)
//   modules[moduleName] = value.default
//   return modules
// }, {})

const modules = {
  app,
  carousel,
  errorLog,
  ht,
  permission,
  settings,
  tagsView,
  user
}

const store = new Vuex.Store({
  modules,
  getters
})

export default store


