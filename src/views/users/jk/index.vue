<template>
    <div class="w-full h-[calc(100vh_-_50px)]  relative  overflow-y-auto ">
        <van-nav-bar fixed
        title="电投账号列表"
        left-arrow
        @click-left="onClickLeft"
        >
        <template #right>
            <div >
                <van-button @click="reallyDel" v-if="showDel & selectedIds.length > 0" class="" size="small" type="danger">删除 {{ selectedIds.length }} 个账号</van-button>
            </div>
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
          <van-button @click="getFKMember" class="w-20 h-10 rounded bg-[#4e6c50] text-white whitespace-nowrap">确认</van-button>
          <van-button @click="add_user" class=" whitespace-nowrap h-10 rounded bg-[#4e6c50] text-white">添加风控账号</van-button>

     </div>
     <!-- <div class="flex items-center space-x-1 py-2">
        <van-button @click="add_user_Dialog = true" class="w-1/2 h-10 rounded bg-[#4e6c50] text-white">添加电投账号</van-button>
     </div> -->



     <div class="relative overflow-x-auto shadow-md sm:rounded-lg py-2">
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
                    保存操作
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
            <tr v-for="(phonelist) in jkListData.list" :key="phonelist.Id" class=" border-b border-slate-600   bg-gray-800 ">
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
                    <div  class="flex items-center whitespace-nowrap ">
                    <van-button type="warning" size="small"  @click="editFKMember(phonelist)" >修改</van-button>
                    <van-button type="danger" size="small" @click = delFKMember(phonelist)>禁用</van-button>
                    </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    {{phonelist.nicheng}}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <div :class="phonelist.isJkSave == 1 ? 'text-green-500' : ''">
                     {{ phonelist.isJkSave == 1 ? '是' : '否'  }}
                    </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    {{phonelist.memo}}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    {{phonelist.loginip}}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                        
                        <van-switch size="20" v-model="phonelist.enable"  :active-value="1"   :inactive-value="0" @change="restoreAccount(phonelist)" />
                    </div>
                </td>
            </tr>
        </tbody>
      </table>
     </div>
     <section class="w-full py-2 relative">
        <van-pagination v-model="pageNum" mode="simple" :total-items="jkListData.total || 0" :items-per-page="pageSize" @change="pagechange" />
     </section>
    </section>
    <van-popup  v-model="add_user_Dialog" closeable :lock-scroll="false"
      position="bottom"
      :style="{ height: '50%' }">
        <div class="px-3 py-10 w-full relative">
            <span class="font-bold text-lg"> {{ is_edit_account_dialog ? '修改风控账号' : '添加电投账号' }} </span>
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
                <div class="flex items-center w-full relative h-10 rounded-md bg-[#dddddd] px-5 mt-3">
                    <div
                    class="border-none w-full h-full text-base flex justify-center items-center relative"
                    >
                    <input
                        v-model.trim="addMemberDigFrm.nicheng"
                        type="tel" autocomplete="off"
                        maxlength="5"
                        min="5"
                        minlength="5"
                        placeholder="请输入昵称"
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
              @click=" is_edit_account_dialog ?  Update() : Ok()"
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
import { getJKListApi, AddJKUserListApi, EditJKUserListApi, DelJKUserListApi } from '@/api/ht'
import { mapState,mapGetters } from 'vuex'

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
        memberName: '',
        pw: '',
        memo: '',
        nicheng: '',
        id:''
      },
      
     is_edit_account_dialog:false
    };
  },
  computed: {
    ...mapState({
      device: state => state.app.device,
      tableList: state => state.ht.tableList,
      jkListData: state => state.ht.jkList
    }),
    ...mapGetters(['token', 'device', 'info']),
    isAllSelected: {
    get() {
      return this.selectedIds.length === this.jkListData.list.length;
    },
    set(value) {
      if (value) {
        this.selectedIds = this.jkListData.list.map((item) => item.Id);
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
    delFKMember(row) {
        this.$dialog.confirm({
            title: '您确认要禁用吗？',
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
                DelJKUserListApi(sendStr).then((res) => {
                if (res.code === 0) {
                this.$notify({type:'success',message:'操作成功',duration: 1500,})
                this.getFKMember()
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
    add_user(){
        this.add_user_Dialog = true
        this.is_edit_account_dialog = false
    },
  
    editFKMember(data) {
     this.is_edit_account_dialog = true
     this.add_user_Dialog = true
     const row = JSON.parse(JSON.stringify(data))
     this.addMemberDigFrm.memberName = row.username
     this.addMemberDigFrm.pw = row.password
     this.addMemberDigFrm.memo = row.memo
     this.addMemberDigFrm.nicheng = row.nicheng
     this.addMemberDigFrm.id = row.Id
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
                DelJKUserListApi(sendStr).then((res) => {
                this.selectedIds = []
                if (res.code === 0) {
                    this.$notify({type:'success',message:'操作成功',duration: 1500,})
                 this.getFKMember()

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

    close(){
        this.addMemberDigFrm.memberName = ''
        this.addMemberDigFrm.pw = ''
        this.addMemberDigFrm.memo = ''
        this.addMemberDigFrm.nicheng = ''
        this.addMemberDigFrm.id = ''
        this.add_user_Dialog = false
        this.is_edit_account_dialog = false
    },
    Ok() {
   
        if(this.addMemberDigFrm.pw == '') return  this.$notify({type:'danger',message:'请输入密码',duration: 1500,})
        if(this.addMemberDigFrm.memberName == '') return  this.$notify({type:'danger',message:'请输入被操作人',duration: 1500,})
        if(this.addMemberDigFrm.memberName.length < 2 ) return  this.$notify({type:'danger',message:'帐号不能小于2位',duration: 1500,})
        
          const frm = this.addMemberDigFrm
          const sendStr = {
            username: frm.memberName,
            password: frm.pw,
            memo: frm.memo || '',
            nicheng: frm.nicheng
          }
          this.$toast.loading({
            message: '请稍后...',
            forbidClick: true,
            duration: 1000,
        })
        AddJKUserListApi(sendStr).then((res) => {
            if (res.code === 0) {
                this.$notify({type:'success',message:'创建成功',duration: 1500,})
              this.close()
              this.getFKMember()
            } else {
                this.$notify({type:'danger',message:res?.msg,duration: 1500,})
            }
          }).catch((e) => {
            console.error(e)
          })
    
    },
    Update() {
   
        if(this.addMemberDigFrm.pw == '') return  this.$notify({type:'danger',message:'请输入密码',duration: 1500,})
        if(this.addMemberDigFrm.memberName == '') return  this.$notify({type:'danger',message:'请输入被操作人',duration: 1500,})
        if(this.addMemberDigFrm.memberName.length < 2 ) return  this.$notify({type:'danger',message:'帐号不能小于2位',duration: 1500,})
        
          const frm = this.addMemberDigFrm
          const sendStr = {
            userId: frm.id,
            username: frm.memberName,
            password: frm.pw || '',
            memo: frm.memo || '',
            nicheng: frm.nicheng
          }
          console.log(sendStr,"edit ************** sendstr")
          this.$toast.loading({
            message: '请稍后...',
            forbidClick: true,
            duration: 1000,
        })
        EditJKUserListApi(sendStr).then((res) => {
            if (res.code === 0) {
                this.$notify({type:'success',message:'修改成功',duration: 1500,})
              this.close()
              this.getFKMember()
            } else {
                this.$notify({type:'danger',message:res?.msg,duration: 1500,})
            }
          }).catch((e) => {
            console.error(e)
          })
    
    },
    toggleSelectAll() {
      if (this.isAllSelected) {
        this.selectedIds = [];
      } else {
        this.selectedIds = this.jkListData.list.map((item) => item.Id);
      }
       console.log(this.selectedIds)
      this.enable === 0 ? this.showDel = false : this.showDel = true
    },
    specificSelect() {
        console.log(this.selectedIds)
        this.enable === 0 ? this.showDel = false : this.showDel = true
     // this.isAllSelected = this.selectedIds.length === this.phoneUserList.list.length;
    },
    restoreAccount(row){
        console.log(row)
        const sendStr = {
        ids: JSON.stringify([row.Id]),
        enable: row.enable === 1 ? 1 : 0
      }
      DelJKUserListApi(sendStr).then((res) => {
        if (res.code === 0) {
            this.$notify({type:'success',message:'操作成功',duration: 1500,})
          this.getFKMember()
        } else {
            this.$notify({type:'danger',message:'操作失败',duration: 1500,})
        }
      }).catch((e) => {
        console.error(e)
      })
    },
    onClickLeft() {
      this.$router.push('/user/member')
    },

    reqt(data) {
      this.loading = true
      getJKListApi(data).then((res) => {
        console.log(res,"res of phone list");
        this.loading = false
        if (res.code === 0) {
            this.$store.commit('ht/SET_JK_LIST', res.data)
        }
      }).catch((e) => {
        this.loading = false
        console.error(e)
      })
    },

    getFKMember() {
      this.reqt({
        username: this.findname.toString().trim() || '',
        pageSize: this.pageSize,
        pageNum: this.pageNum
      })
    },
    
  },
  created(){
    this.getFKMember()
    console.log("created phone")
  }
};
</script>