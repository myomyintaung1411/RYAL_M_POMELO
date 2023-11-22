<template>
    <div class="w-full h-[calc(100vh_-_50px)]  relative  overflow-y-auto ">
        <van-nav-bar fixed
        title="电投账号列表"
        left-arrow
        @click-left="onClickLeft"
        >
        </van-nav-bar>
    <section class="relative px-3 py-2  ">
     <div class="flex items-center space-x-1 pt-12">
        <!-- <div class="flex items-center w-full relative h-10 rounded-md bg-[#dddddd] px-5">
            <div
              class="border-none w-full h-full text-base flex justify-center items-center relative"
            >
              <input
                v-model.trim="findname"
                type="text"
                maxlength="18"
                min="11"
                minlength="11"
                placeholder="请输入账号"
                class="input-name text-[#524d4d] bg-transparent placeholder:tracking-wider px-3 border-none outline-none focus:outline-none focus:border-none w-full h-full"
              />
            </div>
          </div> -->
          <van-button icon="search" @click="findSearchAccount" class="w-20 h-10 rounded bg-[#4e6c50] text-white whitespace-nowrap">确认</van-button>
          <van-button icon="plus" @click="addSubAccount" class=" whitespace-nowrap h-10 rounded bg-[#4e6c50] text-white">添加风控账号</van-button>

     </div>
     <!-- <div class="flex items-center space-x-1 py-2">
        <van-button @click="add_user_Dialog = true" class="w-1/2 h-10 rounded bg-[#4e6c50] text-white">添加电投账号</van-button>
     </div> -->



     <div class="relative overflow-x-auto shadow-md sm:rounded-lg py-2">
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 ">
            <tr>
                <th v-if="$Global.optioner.Id === 1" scope="col" class="px-6 py-3 whitespace-nowrap">
                  ID
                </th>

                <th  v-if="$Global.optioner.arrJxb[12] !== '0'"  scope="col" class="px-6 py-3 whitespace-nowrap">
                  操作
                </th>
                <th scope="col" class="px-6 py-3 whitespace-nowrap">
                    昵称
                </th>
                <th scope="col" class="px-6 py-3 whitespace-nowrap">
                  所属上级
                </th>
                <th v-if="$Global.optioner.arrJxb[12] !== '0'" scope="col" class="px-6 py-3 whitespace-nowrap">
                    备注
                </th>
                <th scope="col" class="px-6 py-3 whitespace-nowrap">
                    登录IP
                </th>
                <th scope="col" class="px-6 py-3 whitespace-nowrap">
                  登录时间
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(phonelist) in subList.tableData" :key="phonelist.Id" class=" border-b border-slate-600   bg-gray-800 ">
                <td v-if="$Global.optioner.Id === 1" scope="row" class="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {{phonelist.Id}}
                </td>

                <td v-if="$Global.optioner.arrJxb[12] !== '0'"  class="px-6 py-2">
                    <div  class="flex items-center whitespace-nowrap ">
                    <van-button type="warning" size="mini"  @click="editSubAcc(phonelist)" >修改</van-button>
                    <van-button :disabled="phonelist.securityLevel == 0" type="primary" size="mini" class="text-white"  @click="removeGahtu(phonelist)">取消谷歌</van-button>
                    <van-button v-if="arrJxb[13] === '1'" type="info" size="mini"  @click="authSubAcc(phonelist)">权限</van-button>
                    </div>
                </td>
                <td class="px-6 py-2 whitespace-nowrap">
                    {{phonelist.nickname}}
                </td>
                <td class="px-6 py-2 whitespace-nowrap">
                    <div >
                     {{ phonelist.referenceName }}
                    </div>
                </td>
                <td v-if="$Global.optioner.arrJxb[12] !== '0'" class="px-6 py-2 whitespace-nowrap">
                  <div class="flex items-center">
                        
                        <van-switch size="20" v-model="phonelist.sEnable"  :active-value="1"   :inactive-value="0" @change="changeSwitch(phonelist)" />
                    </div>
                </td>
                <td class="px-6 py-2 whitespace-nowrap">
                    {{phonelist.ip}}
                </td>
                <td class="px-6 py-2 whitespace-nowrap">
                    <div class="flex items-center">
                        
                        {{ phonelist.lastLoginTime}}
                    </div>
                </td>
            </tr>
        </tbody>
      </table>
     </div>
     <section class="w-full py-2 relative">
        <van-pagination v-model="currentPage" mode="simple" :total-items="subList.totalItems || 0" :items-per-page="pageSize" @change="pagechange" />
     </section>
    </section>
    <van-popup  v-model="dialogVisibleAdd" closeable :lock-scroll="false"
      position="bottom"
      :style="{ height: '50%' }">
        <div class="px-3 py-10 w-full relative">
            <span class="font-bold text-lg"> {{  '添加电投账号' }} </span>
            <form @click.prevent class="w-full rounded-lg flex flex-col justify-center items-center ">

        <div class="flex items-center w-full relative h-10 rounded-md bg-[#dddddd] px-5 mt-3">
                <div
                class="border-none w-full h-full text-base flex justify-center items-center relative"
                >
                <input
                    v-model.trim="form.name"
                    type="text"
                    maxlength="8"
                    min="5"
                    minlength="5"
                    placeholder="请输入被操作人"
                    class="input-name text-[#524d4d] bg-transparent placeholder:tracking-wider px-3 border-none outline-none focus:outline-none focus:border-none w-full h-full"
                />
                </div>
            </div>
                <div class="flex items-center w-full relative h-10 rounded-md bg-[#dddddd] px-5 mt-3">
                    <div
                    class="border-none w-full h-full text-base flex justify-center items-center relative"
                    >
                    <input
                        v-model.trim="form.pw"
                        type="password" autocomplete="off"
                        maxlength="12"
                        min="5"
                        minlength="5"
                        placeholder="请输入密码"
                        class="input-name text-[#524d4d] bg-transparent placeholder:tracking-wider px-3 border-none outline-none focus:outline-none focus:border-none w-full h-full"
                    />
                    </div>
                </div>
          <div class="mt-5 flex items-center w-full relative text-base">
            <van-button
             :loading="btn_loading"
             :disabled="btn_loading"
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
              @click=" confirmAdd"
            >
            确认
            </van-button>
          </div>
        </form>
        </div>
    </van-popup>
    <van-popup  v-model="dialogVisibleEdit" closeable :lock-scroll="false"
      position="bottom"
      :style="{ height: '50%' }">
        <div class="px-3 py-10 w-full relative">
            <span class="font-bold text-lg"> {{  '修改风控账号' }} </span>
            <form @click.prevent class="w-full rounded-lg flex flex-col justify-center items-center ">

        <div class="flex items-center w-full relative h-10 rounded-md bg-[#dddddd] px-5 mt-3">
                <div
                class="border-none w-full h-full text-base flex justify-center items-center relative"
                >
                <input
                    v-model.trim="eform.name"
                    type="text"
                    maxlength="8"
                    min="5"
                    minlength="5"
                    placeholder="请输入被操作人"
                    class="input-name text-[#524d4d] bg-transparent placeholder:tracking-wider px-3 border-none outline-none focus:outline-none focus:border-none w-full h-full"
                />
                </div>
            </div>
        <div class="flex items-center w-full relative h-10 rounded-md bg-[#dddddd] px-5 mt-3">
                <div
                class="border-none w-full h-full text-base flex justify-center items-center relative"
                >
                <input
                    v-model.trim="eform.nickname"
                    type="text"
                    maxlength="8"
                    min="5"
                    minlength="5"
                    placeholder="请输入昵称"
                    class="input-name text-[#524d4d] bg-transparent placeholder:tracking-wider px-3 border-none outline-none focus:outline-none focus:border-none w-full h-full"
                />
                </div>
            </div>
                <div class="flex items-center w-full relative h-10 rounded-md bg-[#dddddd] px-5 mt-3">
                    <div
                    class="border-none w-full h-full text-base flex justify-center items-center relative"
                    >
                    <input
                        v-model.trim="pw"
                        type="password" autocomplete="off"
                        maxlength="12"
                        min="5"
                        minlength="5"
                        placeholder="请输入密码"
                        class="input-name text-[#524d4d] bg-transparent placeholder:tracking-wider px-3 border-none outline-none focus:outline-none focus:border-none w-full h-full"
                    />
                    </div>
                </div>
          <div class="mt-5 flex items-center w-full relative text-base">
            <van-button
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
              @click=" confirmEdit"
            >
            确认
            </van-button>
          </div>
        </form>
        </div>
    </van-popup>

    <Auth ref="authsub" :auth-sub-data="authSubData" @authAction="authAction" />

    </div>
</template>

<script>
import Auth from "../../../components/Auth-Permission.vue"
import { mapState } from 'vuex'
import moment from 'moment'

export default {
  name: 'SubAccountManage',
  components: {
    Auth,
  },
  data() {
    return {
      dialogVisibleAdd: false,
      upperId: '',
      passwordType: 'password',
      showAll: false,
      subList: {
        tableData: [
          // { id: 1, name: 'ceshi', sEnable: '启用', lastLoginTime: '2021-10-01 00:00:00' }
        ],
        totalItems: 0
      },
      form: {
        name: '',
        pw: ''
      },
      loading: false,
      btn_loading: false,
      arrJxb: this.$Global.optioner.arrJxb,
      dialogVisibleEdit: false,
      eform: {
        name: '',
        nickname: ''
      },
      pw: '',

      authSubData: [],
      gauthData: {},
      pageSize: 20,
      currentPage: 1,
      // all
      subAllList: {
        tableData: [
          // { id: 1, name: 'ceshi', sEnable: '启用', lastLoginTime: '2021-10-01 00:00:00' }
        ],
        totalItems: 0
      }
    }
  },
  computed: {
    ...mapState({
      isSub: state => state.user.isSubAccount,
      subInfo: state => state.user.subInfo,
      device: state => state.app.device
    })
  },
  created() {
    this.getSubAccount()
    // this.form.name = this.randomString(7)
  },
  methods: {
    onClickLeft() {
      this.$router.push('/manageUser/user-list-hj')
    },
    removeGahtu(row) {
      this.gauthData = JSON.parse(JSON.stringify(row))
      this.$nextTick(() => {
        this.$refs.RemoveGauthRef.dialogFormVisible = true
      })
    },
    // 限制输入特殊字符
    btKeyUp(e) {
      e.target.value = e.target.value.replace(/[`~!#$%^&*()\-+=<>?:'{}|,.\/;'\\[\]·~！#￥%……&*（）\-+={}|《》？：“”【】、；‘’，。、]/g, '')
    },
    randomString(length) {
      var chars = '123567890'
      var charLength = chars.length
      var result = ''
      for (var i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * charLength))
      }
      return result
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
    },
    authAction({ name }) {
      if (name === 'LIMIT_AUTH_SUBAGENT') {
        this.getSubAccount()
      }
    },
    findSearchAccount() {
      this.currentPage = 1
      if (!this.showAll) {
        this.getSubAccount()
      } else {
        this.getSubAllAccount()
      }
    },
    getSubAllAccount() {
      const sendStr = {
        router: 'getSubAllAccount',
        JsonData: {
          name: this.$Global.optioner.UserName,
          currentPage: this.currentPage,
          pageSize: this.pageSize
        }
      }
      this.loading = true
      this.$pomelo.sendcb(sendStr, res => {
        this.loading = false
        this.subAllList.tableData = []
        this.subAllList.totalItems = 0
        var data = res.JsonData
        var subAllListForm = { tableData: [], totalItems: 0 }
        var tableData = subAllListForm.tableData
        if (res.JsonData.length > 0) {
          for (var i = 0; i < data.length; i++) {
            tableData[i] = {}
            tableData[i].Id = data[i].Id
            tableData[i].name = data[i].username
            tableData[i].jxb = data[i].jxb
            tableData[i].nickname = data[i].nicheng
            tableData[i].referenceName = data[i].reference_name
            tableData[i].registTime = data[i].registTime
            tableData[i].lastLoginTime = data[i].loginTime
            tableData[i].ip = data[i].loginip
            tableData[i].onLineState = data[i].onLineState === 0 ? '离线' : '在线'
            tableData[i].sEnable = data[i].enable === 1 ? '启用' : '禁用'
          }
          // this.mapIP(subAllListForm.tableData)
          if (this.isSub) {
            subAllListForm.tableData.forEach((v, i) => {
              if (v.name === this.subInfo.name) {
                subAllListForm.tableData.splice(i, 1)
              }
            })
          }
          this.subAllList.tableData = subAllListForm.tableData
          this.subAllList.totalItems = res.totalItem || 0
        } else {
          this.$toast('没有查询到相应的数据')
        }
      })
    },
    getSubAccount() {
      const sendStr = {
        router: 'getSubAccount',
        JsonData: {
          name: this.$Global.optioner.UserName,
          currentPage: this.currentPage,
          pageSize: this.pageSize
        }
      }
      this.loading = true
      this.$pomelo.sendcb(sendStr, res => {
        this.loading = false
        this.subList.tableData = []
        this.subList.totalItems = 0
        var data = res.JsonData
        var subListForm = { tableData: [], totalItems: 0 }
        var tableData = subListForm.tableData
        if (res.JsonData.length > 0) {
          for (var i = 0; i < data.length; i++) {
            tableData[i] = {}
            tableData[i].Id = data[i].Id
            tableData[i].name = data[i].username
            tableData[i].jxb = data[i].jxb
            tableData[i].nickname = data[i].nicheng
            tableData[i].registTime = data[i].registTime
            tableData[i].lastLoginTime = data[i].loginTime
            tableData[i].ip = data[i].loginip
            tableData[i].securityLevel = data[i].securityLevel
            tableData[i].googleAuthSecret = data[i].googleAuthSecret
            tableData[i].onLineState = data[i].onLineState === 0 ? '离线' : '在线'
            tableData[i].sEnable = data[i].enable === 1 ? '启用' : '禁用'
          }
          // this.mapIP(subListForm.tableData)
          if (this.isSub) {
            subListForm.tableData.forEach((v, i) => {
              if (v.name === this.subInfo.name) {
                subListForm.tableData.splice(i, 1)
              }
            })
          }
          this.subList.tableData = subListForm.tableData
          this.subList.totalItems = res.totalItem || 0
          // console.log('thidddddd ', this.subList)
        } else {
          this.$toast('没有查询到相应的数据')
        }
      })
    },
    removeGahtu(row){
      this.$dialog.confirm({
            title: `您确认要移除 ${row.name} 的验证登录吗？`,
            })
            .then(() => {
                  const sendStr = {
            router: 'DelGoogleAuth',
            JsonData: {
              opt_id: this.$Global.optioner.Id,
              opt_name: this.$Global.optioner.UserName,
              Id: row.Id,
              username: row.name,
              token: this.token
              }
           }
               this.$toast.loading({
                    message: '请稍后...',
                    forbidClick: true,
                    duration: 1000,
                })
                      this.$pomelo.sendcb(sendStr, res => {
              // console.log('res ', res)
              if (res?.JsonData?.result === 'ok') {
                this.$message.success("移除成功")
                this.getSubAccount()
              } else {
                this.$toast(res?.JsonData?.msg)
              }
              this.loading = false
              this.dialogFormVisible = false
            })
            })
            .catch(() => {
              console.log("canclel")
         });
    },
    handleAgentKick(row) {
      const name = row.name
      const Id = row.Id
      this.$dialog.confirm({
            title: '您确定要踢出' + name + '吗?',
            })
        .then(() => {
          var sendStr = {
            router: 'kickMember',
            JsonData: { Id: Id, name: name, level: 4 }
          }
          this.$pomelo.send(sendStr)
          // console.log('kickAgent: ', sendStr)
        })
        .catch(() => {})
    },
    pagechange(page){
     console.log(page)
     this.currentPage = page
     this.getSubAccount()
    },
    changeSwitch(data) {
      if (this.$Global.optioner.arrJxb[4] === '0') return this.$toast('抱歉! 您没有该权限! 请联系上级!')
      var n = data.sEnable === '禁用' ? 0 : 1
      var reqt = {
        router: 'setUserState',
        JsonData: {
          name: data.name,
          state: n,
          opt_name: this.$Global.optioner.UserName,
          Id: this.$Global.optioner.Id,
          level: this.$Global.optioner.level
        }
      }
      this.$pomelo.sendcb(reqt, res => {
        if (res?.JsonData?.result === 'ok') {
          this.$toast(res.JsonData?.msg)
        } else {
          data.sEnable = n === 1 ? 0 : 1
          this.$toast(res?.JsonData?.msg)
        }
      })
    },
    addSubAccount() {
      this.dialogVisibleAdd = true
      // this.form.name = this.randomString(7)
    },
    confirmAdd() {
      if (this.form.name.trim().length <= 4) {
        return this.$toast('最少5位')
      }
          const reqt = {
            router: 'addSubAccount',
            JsonData: {
              name: this.form.name.trim(),
              pw: this.$md5(this.form.pw.trim()),
              upperId: this.$Global.optioner.Id, // 上级Id
              reference_name: this.$Global.optioner.UserName
            }
          }
          this.btn_loading = true
          this.$pomelo.sendcb(reqt, res => {
            this.btn_loading = false
            if (res.JsonData.result === 'ok') {
              this.form.name = ''
              this.form.pw = ''
              this.getSubAccount()
              this.dialogVisibleAdd = false
              this.$toast('操作成功')
            } else {
              this.$toast('操作失败' + res.JsonData.msg)
            }
          })
    },
    cancleAdd() {
      this.form.name = ''
      this.form.pw = ''
      this.upperId = ''
      this.dialogVisibleAdd = false
    },
    editSubAcc(e) {
      this.eform = e
      // this.eform.name = e.name
      this.dialogVisibleEdit = true
    },
    confirmEdit() {
      if (this.pw.length < 6 && this.pw.length > 0) {
        return this.$toast('密码不能小于6位数')
      } else if ((!/\d/.test(this.pw) || !/[a-zA-Z]/.test(this.pw)) && this.pw.length > 0) {
        return this.$toast('密码必须包含数字和英文字母')
      }
      const nickname = this.eform.nickname + ' '
      const reqt = {
        router: 'editSubAccount',
        JsonData: {
          userId: this.eform.Id,
          username: this.eform.name,
          nickname: nickname.trim() === '' ? '' : nickname.trim(),
          jxb: '',
          pw: (this.pw.trim() !== '' && this.pw !== ' ') ? this.$md5(this.pw.trim()) : '',
          optname: this.isSub ? this.subInfo.name : this.$Global.optioner.UserName,
          level: this.isSub ? 4 : 2
        }
      }
      this.$pomelo.sendcb(reqt, res => {
        if (res.JsonData.result === 'ok') {
          this.eform.Id = ''
          this.eform.nickname = ''
          this.pw = ''
          this.getSubAccount()
          this.dialogVisibleEdit = false
          this.$toast('操作成功')
        } else {
          this.$toast('操作失败')
        }
      })
    },
    authSubAcc(row) {
      // if (this.isSub) return this.$message.info('子账号无权修改权限！')
      this.$pomelo.send({
        router: 'GetJxb',
        JsonData: {
          reference_name: this.$Global.optioner.UserName,
          name: row.name
        }
      }) // 取上级权限
      setTimeout(() => {
        this.authSubData = row
        this.$refs.authsub.dialogFormVisible = true
      }, 800)
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 === 1) {
        return 'color-row'
      }
      return ''
    }
  }
}
</script>