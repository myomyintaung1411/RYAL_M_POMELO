<template>
    <section class="w-full h-full relative pb-10">
       <van-tabs v-model="activeName" @click="tabClick" sticky color="#4e6c50">
        <van-tab title="在线用户" name="a">
            <section class="w-full relative px-3 py-2">
            <div class="flex items-center w-full justify-between space-x-2">
               <van-button icon="plus" @click="opendoFind_Dialog"  class="w-1/2 h-10 rounded bg-[#4e6c50] text-white whitespace-nowrap">搜索</van-button>
               <van-button @click="doRefresh()" icon="search" class=" w-1/2  whitespace-nowrap h-10 rounded bg-[#4e6c50] text-white">刷新</van-button>
               <!-- <van-button  @click="doReset()" icon="replay"  class=" w-1/3  whitespace-nowrap h-10 rounded bg-[#4e6c50] text-white">重置</van-button> -->
            </div>
            <div class="py-3">
            <div style="display:flex;margin-top:10px;flex-wrap:no-wrap;width: 100%;justify-content: start;"  >
                <div style="height:30px;width: 50%;">
                <div style="display: flex;align-items: center;width: 100%;">
                    <div style="background:#c2bfbf;height:100%;line-height:30px; font-size: 14px;color: gray; width: 50%;text-align: center;">
                    <i class="el-icon-loading" />
                    总人数
                </div>
                <div style="font-weight: bolder; color: #fff;line-height:30px;width: 50%;text-align: center;background-color: #4e6c50;"> {{ onlineUser.count.total || 0 }} </div>
                </div>
                </div>

                <div style="height:30px;width: 50%;">
                <div style="display: flex;align-items: center;width: 100%;">
                    <div style="background:#c2bfbf;height:100%;line-height:30px; font-size: 14px;color: gray; width: 50%;text-align: center;">
                    <i class="el-icon-loading" />
                    安卓
                </div>
                <div style="font-weight: bolder; color: #fff;line-height:30px;width: 50%;text-align: center;background-color: #4e6c50;">{{ onlineUser.count.android || 0 }} </div>
                </div>
                </div>
            </div>

            <div style="display:flex;margin-top:10px;flex-wrap:no-wrap;width: 100%;justify-content: start;"  >
                <div style="height:30px;width: 50%;">
                <div style="display: flex;align-items: center;width: 100%;">
                    <div style="background:#c2bfbf;height:100%;line-height:30px; font-size: 14px;color: gray; width: 50%;text-align: center;">
                    <i class="el-icon-loading" />
                    苹果
                </div>
                <div style="font-weight: bolder; color: #fff;line-height:30px;width: 50%;text-align: center;background-color: #4e6c50;"> {{ onlineUser.count.ios || 0 }} </div>
                </div>
                </div>

                <div style="height:30px;width: 50%;">
                <div style="display: flex;align-items: center;width: 100%;">
                    <div style="background:#c2bfbf;height:100%;line-height:30px; font-size: 14px;color: gray; width: 50%;text-align: center;">
                    <i class="el-icon-loading" />
                    H5
                </div>
                <div style="font-weight: bolder; color: #fff;line-height:30px;width: 50%;text-align: center;background-color: #4e6c50;"> {{ onlineUser.count.h5 || 0 }} </div>
                </div>
                </div>
            </div>
            </div>

            <div class="relative overflow-x-auto shadow-md sm:rounded-lg ">
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 ">
            <tr>
                <th  scope="col" class="px-6 py-3 whitespace-nowrap">
                    会员ID
                </th>
                <th  scope="col" class="px-6 py-3 whitespace-nowrap">
                    账号
                </th>
                <th  scope="col" class="px-6 py-3 whitespace-nowrap">
                    操作项目
                </th>
                <th  scope="col" class="px-6 py-3 whitespace-nowrap">
                    当前余额
                </th>
                <th  scope="col" class="px-6 py-3 whitespace-nowrap">
                    所属代理
                </th>
                <th  scope="col" class="px-6 py-3 whitespace-nowrap">
                    终端
                </th>
                <th  scope="col" class="px-6 py-3 whitespace-nowrap">
                    登录时间
                </th>
                <th  scope="col" class="px-6 py-3 whitespace-nowrap">
                    IP
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(row) in onlineUser.tableData" :key="row.Id" class=" border-b border-slate-600   bg-gray-800 ">
     
                <td class="px-6 py-4 whitespace-nowrap">
                    {{row.id}}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    {{row.username}}
                </td>
                <td scope="row" class="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                   <div class="flex items-center">
                    <van-button v-if="info.arrJxb[3] === '1'" type="danger" size="small"  @click="handleKick(row)" >详细</van-button>
                   </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    {{ fiexeTwo(row.ye) | toThousandFilter }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    {{ row.reference_name }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    {{ row.terminal }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    {{ formatDate(row.login_time) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    {{ row.ip }}
                </td>

            </tr>
        </tbody>
    </table>
     </div>
    <section class="w-full py-2 relative">
        <van-pagination v-model="pageNum" mode="simple" :total-items="onlineUser.total || 0" :items-per-page="pageSize" @change="pagechange" />
     </section>
            
           </section>
        </van-tab>
        <van-tab title="实时下注" name="b"></van-tab>
       </van-tabs> 
       <van-popup  v-model="openFormDialog" closeable :lock-scroll="false"
      position="bottom"
      :style="{ height: '40%' }">
        <div class="px-3 py-10 w-full relative">
            <span class="font-bold text-lg">备注</span>
            <form @click.prevent class="w-full rounded-lg flex flex-col justify-center items-center ">
            <div class="flex items-center w-full bg-[#dddddd] relative h-10 rounded-md  px-5 mt-3">
                    <div
                    class="border-none w-full h-full text-base flex justify-center items-center relative"
                    >
                    <input
                        v-model.trim="form.account"
                        type="text" autocomplete="off"
                        maxlength="40"
                        placeholder="请输入备注"
                        class="input-name text-[#524d4d] bg-transparent placeholder:tracking-wider px-3 border-none outline-none focus:outline-none focus:border-none w-full h-full"
                    />
                    </div>
             </div>
             <div class="flex items-center w-full relative h-10 rounded-md bg-[#dddddd]   mt-3  ">
                <van-dropdown-menu class="w-full" direction="up" >
                <van-dropdown-item v-model="terminalTypeValue" :options="terminalTypeOptions"   />
                </van-dropdown-menu>
            </div>
          <div class="mt-5 flex items-center w-full relative text-base">
            <van-button
             :loading="loading"
             :disabled="loading"
              class="rounded"
              style="
                background-color: #4e6c50;
                border: none;
                color: #fff;
                height: 40px;
                font-size: 16px;
                letter-spacing: 1px;
                width: 100%;
              "
              @click="search_Find()"
            >
            确认
            </van-button>
          </div>
        </form>
        </div>
    </van-popup>
    </section>
</template>

<script>
import { getOnlineUser, kickMemberApi } from '@/api/ht'
import moment from 'moment'
import { mapState } from 'vuex'

export default {
  data() {
    return {
      activeTab: 1,
      activeName:'a',
      loading:false,
            // 会员
     openFormDialog:false,
      pageNum: 1,
      pageSize: 20,
      interval: null,
      // 注单
      pageNum2: 1,
      pageSize2: 10,
      interval2: null,
      form: {
        account: '',
        terminal: ''
      },
      // arrJxb: this.$Global.optioner.arrJxb,
      terminalTypeValue: 'all',
      terminalTypeOptions: [
        { value: 'all', text: '全部' },
        { value: 'android', text: '安卓' },
        { value: 'ios', text: '苹果' },
        { value: 'pc', text: '电脑' },
        { value: 'h5', text: 'H5' }
      ]
    };
  },
  computed: {
    ...mapState({
      onlineUser: state => state.ht.onlineUserList,
      myCenter: state => state.ht.myCenterForm,
      betOrderInquire: state => state.ht.betOrderInquireForm,
      device: state => state.app.device,
      info: state => state.user.info
    })
  },
  methods:{
    tabClick(name,title){
         
        console.log("name "+title,name);
        switch (name) {
            case 'a':
                
                break;
            case 'b':
            this.$router.push('/onlinePage/realtime-bet')
                break;
            default:
                break;
        }
    },

    opendoFind_Dialog(){
      this.openFormDialog = true
    },
    search_Find(){
      this.openFormDialog = false
      this.doFind()
    },
    formatDate(date) {
      if (date === null || date === '' || date === undefined || !date || date === 'Invalid date') return ''
      return moment(date).format('YYYY-MM-DD HH:mm:ss')
    },
    fiexeTwo(num) {
      if (num) return Number((num))?.toFixed(0)
      return num
    },
    startFunc() {
      if (this.interval !== null) {
        clearInterval(this.interval)
        this.interval = null
      }
      this.getOnlineMemberInfo()
      this.interval = setInterval(this.getOnlineMemberInfo, 10000)
    },
    // 限制输入特殊字符
    btKeyUp(e) {
      e.target.value = e.target.value.replace(/[`~!#$%^&*()\-+=<>?:'{}|.\/;'\\[\]·~！@#￥%……&*（）\-+={}|《》？：“”【】、；‘’。、]/g, '')
    },
    getOnlineMemberInfo() {
      const sendData = {
        Id: this.info.Id,
        pageSize: this.pageSize,
        pageNum: this.pageNum
      }
      getOnlineUser(sendData).then((res) => {
        if (res.code === 0) {
          var data = res.data.list
          var onlineMemberForm = { tableData: [], total: 0, count: {}}
          var tableData = onlineMemberForm.tableData
          for (var i = 0; i < data.length; i++) {
            tableData[i] = {}
            tableData[i].id = data[i].Id
            tableData[i].ip = data[i].loginip
            tableData[i].o_ip = data[i].loginip
            tableData[i].username = data[i].username
            tableData[i].reference_name = data[i].reference_name
            tableData[i].terminal = data[i].terminal
            tableData[i].login_time = this.transTime(data[i].loginTime)
            tableData[i].ye = data[i].ye
          }
          // mapIP(onlineMemberForm.tableData)
          onlineMemberForm.total = res.data.total || 0
          onlineMemberForm.count = res.data.count
          this.$store.commit('ht/setOnlineUserList', onlineMemberForm)
        }
      }).catch((e) => {
        console.error(e)
      })
    },
    transTime(times) {
      moment.suppressDeprecationWarnings = true
      return moment(times).format('YYYY-MM-DD HH:mm:ss')
    },
    doFind() {
      this.startFunc()
    },
    doRefresh() {
      this.form.account = ''
      this.form.terminal = ''
      this.terminalTypeValue = 'all'
      this.startFunc()
    },

    pagechange(page){
     console.log(page)
     this.pageNum = page
     this.startFunc()
    },

    handleKick(row){
        if (!row) return this.$notify({type:'danger',message:'请选择用户',duration: 1500,})
        const name = row.username
      const Id = row.Id
      this.$dialog.confirm({
            title: '您确定要踢出' + name + '吗?' + '警告',
            })
            .then(() => {
                const send = { Id: Id, name: name, level: 2 }
            this.$toast.loading({
                    message: '请稍后...',
                    forbidClick: true,
                    duration: 1000,
                })
                kickMemberApi(send).then((res) => {
                if (res.code === 0) {
                this.$notify({type:'success',message:res.msg,duration: 1500,})
                } else {
                    this.$notify({type:'danger',message:res.msg,duration: 1500,})
                }
            }).catch((e) => {
                console.error(e)
            })
            })
            .catch(() => {
              console.log("canclel")
         });
    },

    
  },
  created(){
    this.startFunc()
  }
};
</script>