<template>
    <div class="w-full h-[calc(100vh_-_50px)]  relative  overflow-y-auto ">
        <van-nav-bar fixed
        title="电投账号列表"
        left-arrow
        @click-left="onClickLeft"
        >
        <template #right>
            <van-button @click="reallyDel" v-if="showDel & selectedIds.length > 0" class="" size="small" type="danger">删除 {{ selectedIds.length }} 个账号</van-button>
        </template>
        </van-nav-bar>
    <section class="relative px-3 py-2  ">
     <div class="flex items-center space-x-1 pt-12">
        <div class="flex items-center w-full relative h-10 rounded-md bg-[#dddddd] px-5">
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
          </div>
          <van-button @click="getDTMember" class="w-20 h-10 rounded bg-[#4e6c50] text-white">确认</van-button>
     </div>
     <div class="flex items-center space-x-1 py-2">
        <van-button @click="add_user_Dialog = true" class="w-1/2 h-10 rounded bg-[#4e6c50] text-white">添加电投账号</van-button>
        <van-button :loading="loading" :disabled="loading" @click="randomAddAccount" class="w-1/2 h-10 rounded bg-[#4e6c50] text-white">随机添加 {{ count }} 个账号</van-button>
     </div>



     <div class="relative overflow-x-auto shadow-md sm:rounded-lg ">
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 ">
            <tr>
                <th scope="col" class="p-4">
                    <div class="flex items-center">
                        <input v-model="isAllSelected" @click="toggleSelectAll"  type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                        <label class="sr-only">checkbox</label>
                    </div>
                </th>
                <th  scope="col" class="px-6 py-3 whitespace-nowrap">
                    账号
                </th>

                <th  scope="col" class="px-6 py-3 whitespace-nowrap">
                    状态 
                </th>
                <th scope="col" class="px-6 py-3 whitespace-nowrap">
                    昵称
                </th>
                <th scope="col" class="px-6 py-3 whitespace-nowrap">
                    只看台桌
                </th>
                <th scope="col" class="px-6 py-3 whitespace-nowrap">
                    备注
                </th>
                <th scope="col" class="px-6 py-3 whitespace-nowrap">
                    登录IP
                </th>
                <th scope="col" class="px-6 py-3 whitespace-nowrap">
                    状态
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(phonelist) in phoneUserList.list" :key="phonelist.Id" class=" border-b border-slate-600   bg-gray-800 ">
                <td class="w-4 p-4">
                    <div class="flex items-center">
                        <input v-model="selectedIds" :value="phonelist.Id" @change="specificSelect"  type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                        <label  class="sr-only">checkbox</label>
                    </div>
                </td>
                <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {{phonelist.username}}
                </td>

                <td  class="px-6 py-4">
                    <div v-if="enable === 0" class="flex items-center">
                        <van-switch v-model="phonelist.enable" @change="restoreAccount(phonelist)" />
                    </div>
                    <div v-else class="flex items-center whitespace-nowrap ">
                    <van-button type="warning" size="small"  @click="editViewTable(phonelist)" >设置只看台桌</van-button>
                    <van-button type="info" size="small" @click = setMemo(phonelist)>备注</van-button>
                    <van-button type="danger" size="small" @click="delDTMember(phonelist)">删除</van-button>
                    <van-button @click="handleKick(phonelist)" type="default" size="small">踢出</van-button>
                    </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    {{phonelist.nicheng}}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    {{phonelist.phoneTable}}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    {{phonelist.memo}}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    {{phonelist.loginip}}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                        <span v-if="phonelist.onLineState=='1'" class="text-red-600">在线</span>
                        <span v-if="phonelist.onLine=='0'" >在线</span>
                    </div>
                </td>
            </tr>



        </tbody>
    </table>
     </div>
    <section class="w-full py-2 relative">
        <van-pagination v-model="pageNum" mode="simple" :total-items="phoneUserList.total || 0" :items-per-page="pageSize" @change="pagechange" />
     </section>
    </section>
    <van-popup  v-model="add_user_Dialog" closeable :lock-scroll="false"
      position="bottom"
      :style="{ height: '50%' }">
        <div class="px-3 py-10 w-full relative">
            <span class="font-bold text-lg">添加电投账号</span>
            <form @click.prevent class="w-full rounded-lg flex flex-col justify-center items-center ">

        <div class="flex items-center w-full relative h-10 rounded-md bg-[#dddddd] px-5 mt-3">
                <div
                class="border-none w-full h-full text-base flex justify-center items-center relative"
                >
                <input
                    v-model.trim="addMemberDigFrm.memberName"
                    type="tel"
                    maxlength="5"
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
                        v-model.trim="addMemberDigFrm.pw"
                        type="password" autocomplete="off"
                        maxlength="5"
                        min="5"
                        minlength="5"
                        placeholder="请输入密码"
                        class="input-name text-[#524d4d] bg-transparent placeholder:tracking-wider px-3 border-none outline-none focus:outline-none focus:border-none w-full h-full"
                    />
                    </div>
                </div>
                <div class="flex items-center w-full relative h-10 rounded-md bg-[#dddddd] px-5 mt-3">
                    <div
                    class="border-none w-full h-full text-base flex justify-center items-center relative"
                    >
                    <input
                        v-model.trim="addMemberDigFrm.memo"
                        type="tel" autocomplete="off"
                        maxlength="5"
                        min="5"
                        minlength="5"
                        placeholder="请输入备注"
                        class="input-name text-[#524d4d] bg-transparent placeholder:tracking-wider px-3 border-none outline-none focus:outline-none focus:border-none w-full h-full"
                    />
                    </div>
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
              @click="Ok()"
            >
            确认
            </van-button>
          </div>
        </form>
        </div>
    </van-popup>

    <van-popup  v-model="editTable_Dialog" closeable
      position="bottom"
      :style="{ height: '50%' }">
        <div class="px-3 py-10 w-full relative">
            <span class="font-bold text-lg">设置只看台桌</span>
            <form @click.prevent class="w-full rounded-lg flex flex-col justify-center items-center ">

        <div class=" w-full relative rounded-md   mt-3 ">
            <van-checkbox-group v-model="optType" direction="horizontal">
            <van-checkbox class="flex py-3 items-center" v-for="item in tableList.list" :key="item.room_name" :name="item.room_name">{{item.room_name}}</van-checkbox>
            </van-checkbox-group>
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
              @click="confirm_editTable()"
            >
            确认
            </van-button>
          </div>
        </form>
        </div>
    </van-popup>
    <van-popup  v-model="edit_memo_Dialog" closeable
      position="bottom"
      :style="{ height: '30%' }">
        <div class="px-3 py-10 w-full relative">
            <span class="font-bold text-lg">备注</span>
            <form @click.prevent class="w-full rounded-lg flex flex-col justify-center items-center ">

            <div class="flex items-center w-full relative h-10 rounded-md bg-[#dddddd] px-5 mt-3">
                    <div
                    class="border-none w-full h-full text-base flex justify-center items-center relative"
                    >
                    <input
                        v-model.trim="edit_memo_input"
                        type="text" autocomplete="off"
                        maxlength="40"
                        placeholder="请输入备注"
                        class="input-name text-[#524d4d] bg-transparent placeholder:tracking-wider px-3 border-none outline-none focus:outline-none focus:border-none w-full h-full"
                    />
                    </div>
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
              @click="confirm_editMemo()"
            >
            确认
            </van-button>
          </div>
        </form>
        </div>
    </van-popup>

    </div>
</template>

<script>
import {SetPhoneTableListApi, EditPhoneUserListApi,kickMemberApi, getPhoneListApi, getPhoneTableListApi, addPhoneUserListApi, DeletePhoneUserListApi } from '@/api/ht'
import { mapState } from 'vuex'

export default {
  data() {
    return {
        findname:'',
        pageSize: 10,
        pageNum: 1,
        count: 10,
        enable: 1,
        selectAll: false,
        selectedIds: [],
        showDel:false,
        loading:false,
        add_user_Dialog:false,
        addMemberDigFrm: {
        memberName: this.randomString(5),
        pw: '',
        memo: ''
      },
      editData: {},
      memoData: {},
      editTable_Dialog:false,
      edit_memo_Dialog:false,
      edit_memo_input:'',
      optType:[]

    };
  },
  computed: {
    ...mapState({
      device: state => state.app.device,
      tableList: state => state.ht.tableList,
      phoneUserList: state => state.ht.phoneList
    }),
    // isAllSelected() {
    //   return this.selectedIds.length === this.phoneUserList.list.length;
    // },
    isAllSelected: {
    get() {
      return this.selectedIds.length === this.phoneUserList.list.length;
    },
    set(value) {
      if (value) {
        this.selectedIds = this.phoneUserList.list.map((item) => item.Id);
      } else {
        this.selectedIds = [];
      }
    },
  },
  },
  methods:{
    pagechange(page){
     console.log(page)
     this.pageNum = page
     this.reqt({
        username: this.findname,
        pageSize: this.pageSize,
        pageNum: this.pageNum
      })
    },
    handleKick(data) {
        const row = JSON.parse(JSON.stringify(data))
        const name = row.username
        const Id = row.Id
        this.$dialog.confirm({
            title: ' 您确定要踢出 ' + name + ' 吗? '
            })
            .then(() => {
                const sendStr = {
                    Id: Id, name: name, level: 3
                }
            this.$toast.loading({
                    message: '请稍后...',
                    forbidClick: true,
                    duration: 1000,
                })
                kickMemberApi(sendStr).then((res) => {
                if (res.code === 0) {
                this.$notify({type:'success',message:res.msg,duration: 1500,})
                this.getDTMember()
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
    delDTMember(row) {
        this.$dialog.confirm({
            title: '您确认要删除这些吗？',
            })
            .then(() => {
                const sendStr = {
                ids: JSON.stringify([row.Id])
                }
            this.$toast.loading({
                    message: '请稍后...',
                    forbidClick: true,
                    duration: 1000,
                })
            DeletePhoneUserListApi(sendStr).then((res) => {
                if (res.code === 0) {
                this.$notify({type:'success',message:'操作成功',duration: 1500,})
                this.getDTMember()
                } else {
                    this.$notify({type:'danger',message:'操作失败',duration: 1500,})
                }
            }).catch((e) => {
                console.error(e)
            })
            })
            .catch(() => {
              console.log("canclel")
         });

    },
    confirm_editMemo(){
        const sendStr = {
          userId: this.editData.Id,
          memo: this.edit_memo_input
      }
       EditPhoneUserListApi(sendStr).then((res)=>{
        if(res.code === 0){
            this.$notify({type:'success',message:'创建成功',duration: 1500,})
            this.getDTMember()
            this.editData = {}
            this.edit_memo_Dialog=false
        }
       }).catch((e)=>{
        console.error(e);
       })
    },
    confirm_editTable(){
        console.log(this.optType,"optType ********")
        const sendStr = {
          userId: this.editData.Id,
          tables: this.optType.length > 0 ? JSON.stringify(this.optType) : ''
      }
      this.$toast.loading({
            message: '请稍后...',
            forbidClick: true,
            duration: 1000,
        })
      SetPhoneTableListApi(sendStr).then((res)=>{
        console.log(res,"SetPhoneTableListApi");
        if(res.code === 0){
            this.$notify({type:'success',message:'创建成功',duration: 1500,})
          this.editTable_Dialog = false
          this.editData = {}
          this.getDTMember()
        }
       }).catch((e)=>{
        console.error(e);
       })
    },
    setMemo(row){
        this.edit_memo_input =  row.memo
        this.editData = JSON.parse(JSON.stringify(row))
        this.edit_memo_Dialog=true
    },
    editViewTable(row) {
        console.log(row,"phoneTable")
      this.getTableList()
      this.editData = JSON.parse(JSON.stringify(row))
      this.optType = row.phoneTable !== null && row.phoneTable !== '' ? JSON.parse(row.phoneTable) : []
      this.$nextTick(() => {
        this.editTable_Dialog = true
      })
    },
    reallyDel(){
        this.$dialog.confirm({
            title: '您确认要删除这些吗？',
            })
            .then(() => {
              const sendStr = {
                ids: JSON.stringify(this.selectedIds)
              }
               this.$toast.loading({
                    message: '请稍后...',
                    forbidClick: true,
                    duration: 1000,
                })
            DeletePhoneUserListApi(sendStr).then((res) => {
                this.selectedIds = []
                if (res.code === 0) {
                    this.$notify({type:'success',message:'创建成功',duration: 1500,})
                 this.getDTMember()

                } else {
                    this.$notify({type:'danger',message:'操作失败',duration: 1500,})
                }
            }).catch((e) => {
                console.error(e)
            })
            })
            .catch(() => {
              console.log("canclel")
         });
    },
    getTableList() {
      const sendStr = {
        pageNum: 1,
        pageSize: 100
      }
      getPhoneTableListApi(sendStr).then(res => {
        if (res.code === 0) {
          this.$store.commit('ht/setTableList', res.data)
        }
      }).catch((e) => {
        console.error(e)
      })
    },
    close(){
        this.addMemberDigFrm.memberName = ''
        this.addMemberDigFrm.pw = ''
        this.addMemberDigFrm.memo = ''
        this.add_user_Dialog = false
    },
    Ok() {
   
        if(this.addMemberDigFrm.pw == '') return  this.$notify({type:'danger',message:'请输入密码',duration: 1500,})
        
          const frm = this.addMemberDigFrm
          const sendStr = {
            username: frm.memberName || this.randomString(5),
            password: frm.pw || '',
            memo: frm.memo || '',
            random: false
          }
          this.$toast.loading({
            message: '请稍后...',
            forbidClick: true,
            duration: 1000,
        })
          addPhoneUserListApi(sendStr).then((res) => {
            if (res.code === 0) {
                this.$notify({type:'success',message:'创建成功',duration: 1500,})
              this.close()
              this.getDTMember()
            } else {
                this.$notify({type:'danger',message:res?.msg,duration: 1500,})
            }
          }).catch((e) => {
            console.error(e)
          })
    
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
    randomAddAccount() {
      const sendStr = {
        random: true
      }
      this.loading = true
      this.$toast.loading({
            message: '请稍后...',
            forbidClick: true,
            duration: 1000,
        })
      addPhoneUserListApi(sendStr).then((res) => {
        this.loading = false
        if (res.code === 0) {
          this.$notify({type:'success',message:'创建成功',duration: 1500,})
          this.getDTMember()
        } else {
          this.$notify({type:'danger',message:res?.msg,duration: 1500,})
        }
      }).catch((e) => {
        this.loading = false
        console.error(e)
      })
    },
    toggleSelectAll() {
      if (this.isAllSelected) {
        this.selectedIds = [];
      } else {
        this.selectedIds = this.phoneUserList.list.map((item) => item.Id);
      }
       console.log(this.selectedIds)
      this.enable === 0 ? this.showDel = false : this.showDel = true
    },
    specificSelect() {
        console.log(this.selectedIds)
        this.enable === 0 ? this.showDel = false : this.showDel = true
     // this.isAllSelected = this.selectedIds.length === this.phoneUserList.list.length;
    },
    restoreAccount(data){},
    onClickLeft() {
      this.$router.push('/user/member')
    },
    onClickRight() {
      Toast('Button');
    },

    reqt(data) {
      this.loading = true
      getPhoneListApi(data).then((res) => {
        console.log(res,"res of phone list");
        this.loading = false
        if (res.code === 0) {
          this.$store.commit('ht/SET_PHONE_LIST', res.data)
        }
      }).catch((e) => {
        this.loading = false
        console.error(e)
      })
    },

    getDTMember() {
      this.reqt({
        username: this.findname.toString().trim() || '',
        pageSize: this.pageSize,
        pageNum: this.pageNum
      })
    },
    
  },
  created(){
    this.getDTMember()
    console.log("created phone")
  }
};
</script>