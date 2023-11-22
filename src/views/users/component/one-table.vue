<template>
    <section class="">
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg py-2 ">
    <table ref="ListTable" class="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 ">
            <tr>

                <th  scope="col" class="px-6 py-3 whitespace-nowrap">
                    操作项目
                </th>
                <th  scope="col" class="px-6 py-3 whitespace-nowrap">
                    ID
                </th>
                <th  scope="col" class="px-6 py-3 whitespace-nowrap">
                    账号
                </th>
                <th  scope="col" class="px-6 py-3 whitespace-nowrap">
                    昵称
                </th>
                <th v-if="showTable.zc && isAgent" scope="col" class="px-6 py-3 whitespace-nowrap">
                    占成
                </th>
                <th v-if="showTable.pf && isAgent" scope="col" class="px-6 py-3 whitespace-nowrap">
                    配分
                </th>
                <th  scope="col" class="px-6 py-3 whitespace-nowrap">
                    备注
                </th>
                <th  scope="col" class="px-6 py-3 whitespace-nowrap">
                    余额
                </th>
                <th v-if="showTable.xmb"  scope="col" class="px-6 py-3 whitespace-nowrap">
                    未结洗码
                </th>
                <th v-if="showTable.group_ye && isAgent"  scope="col" class="px-6 py-3 whitespace-nowrap">
                    群组余额
                </th>
                <th v-if="showTable.win_lose" scope="col" class="px-6 py-3 whitespace-nowrap">
                    今日输赢
                </th>
                <th  v-if="showTable.direct_user && isAgent" scope="col" class="px-6 py-3 whitespace-nowrap">
                    直属数量
                </th>
                <th    v-if="showTable.xmType" scope="col" class="px-6 py-3 whitespace-nowrap">
                    洗码类型
                </th>
                <!-- <th   v-if="!isAgent" scope="col" class="px-6 py-3 whitespace-nowrap">
                    显示洗码
                </th> -->
                <th   v-if="showTable.topup_auth && !isAgent" scope="col" class="px-6 py-3 whitespace-nowrap">
                    充值
                </th>
                <th    v-if="showTable.auto_wash" scope="col" class="px-6 py-3 whitespace-nowrap">
                    自动结算
                </th>
                <th     v-if="info.arrJxb[4] === '1'" scope="col" class="px-6 py-3 whitespace-nowrap">
                    状态
                </th>
            </tr>
        </thead>
        <tbody >
            <tr v-for="(row,index) in userData" :key="index" class=" border-b border-slate-600   bg-gray-800 ">

                <td class="px-6 py-4 whitespace-nowrap">
                   <div>
                    <span v-if="isMe !== relation[relation.length - 1]">
                        <van-button
                        v-if="arrJxb[7] === '1'"
                        type="primary"
                        :disabled="row.sEnable === '禁用' ? true : false"
                        plain
                        size="mini"
                        @click="testPFUpDown(row, 'shang')"
                        >上分</van-button>
                        <van-button
                        v-if="arrJxb[7] === '1'"
                        type="danger"
                        :disabled="row.sEnable === '禁用' ? true : false"
                        plain
                        size="mini"
                        @click="testPFUpDown(row, 'xia')"
                        >下分</van-button>
                    </span>
                    <van-button
                       v-if="arrJxb[3] === '1' && isMe !== relation[relation.length - 1]"
                        plain
                        size="mini"
                        :disabled="row.sEnable === '禁用' ? true : false"
                        type="warning"
                        style=""
                        @click="handleAgentSetup(row)"
                    >修改</van-button>
                    <van-button @click="openShow_More(row)"
                      icon="arrow-down"
                        size="mini"
                        type="warning"
                        style=""
                       
                    >修改</van-button>
                        
                   </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    {{ row.Id }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                <span  style="font-size: 16px;"> {{ isMe !== relation[relation.length - 1] ? row.agentAccount : isSub ? subInfo.name : myCenter.userValue[0].name }}</span>
                </td>

                <td class="px-6 py-4 whitespace-nowrap">
                  {{ isMe !== relation[relation.length - 1] ? row.name : $Global.optioner.Nickname }}
                </td>
                <td  v-if="showTable.zcb" class="px-6 py-4 whitespace-nowrap">
                  {{ isMe !== relation[relation.length - 1] ? row.zcb : myCenter.userValue[0].zcb }} %
                </td>
                <td  v-if="showTable.isPf " class="px-6 py-4 whitespace-nowrap">
                    {{ row.isPf ? '是' : '否' }}
                </td>
                <td   class="px-6 py-4 whitespace-nowrap">
                        <span v-if="row.agentAccount !== isMe">{{ row.memo }}</span>
                </td>
                <td   class="px-6 py-4 whitespace-nowrap">
                    <span style="color: #FF9800;">    {{ isMe !== relation[relation.length - 1] ? row.aBalance : row.aBalance | toThousandFilter }}</span>
                </td>
                <td v-if="showTable.xmb"  class="px-6 py-4 whitespace-nowrap">
                    <span >   {{ row.needXmf | toThousandFilter }}</span>
                </td>
                <td  v-if="showTable.group_ye" class="px-6 py-4 whitespace-nowrap">
                    <span > {{ fiexeTwo(row.group_ye || 0) | toThousandFilter }}</span>
                </td>
                <td  v-if="showTable.win_lose" class="px-6 py-4 whitespace-nowrap">
                    <span :class="row.win_lose >= 0 ? 'text-blue-500' : 'text-red-500'">{{ fiexeTwo(row.win_lose || 0) |
                 toThousandFilter }}</span>
                </td>
                <td   v-if="showTable.direct_user" class="px-6 py-4 whitespace-nowrap">
                    <span style="font-size: 12px">
                       代:{{ row.total_user.a_count || 0 }} 会:{{ row.total_user.p_count || 0 }}
                       </span>
                </td>
                <td   v-if="showTable.xmType" class="px-6 py-4 whitespace-nowrap">
                    <span v-if="row.xm_type === 0"><span style="color: #2196F3">双边</span>{{ row.xmb_d }} %
                    </span>
                  <span v-else><span style="color: #FF9800">单边</span>{{ row.xmb_s }} %</span>

                </td>
                <!-- <td  v-if="!isAgent" class="px-6 py-4 whitespace-nowrap">
                    <div style="cursor: pointer;">
                   <font v-if="row.show_xm == 1" @click="setShowXm(row, 0)"><span style="color: #2196F3">是</span></font>
                    <font v-else @click="setShowXm(row, 1)"><span style="color: #FF9800">否</span></font>
                  </div>

                </td> -->
                <td v-if="showTable.topup_auth" class="px-6 py-4 whitespace-nowrap">
                    <div style="cursor: pointer;">
                    <font v-if="row.topup_auth " @click="changeTopupAuth(row)"><span  style="color: #2196F3; cursor: pointer;" >是</span></font>
                   <font v-else @click="changeTopupAuth(row)"><span style="color: #FF9800; cursor: pointer;">否</span></font>
                  </div>
                </td>

                <td  v-if="showTable.auto_wash" class="px-6 py-4 whitespace-nowrap">
                    <div style="cursor: pointer;">
                        <span v-if="row.autoWash === 1">是</span>
                            <span v-else style="color:lightgray">否</span>
                            <span v-if="row.autoWash === 1" style="color:gray">
                                {{ row.washType === 1 ? '日结' : row.washType === 2 ? '周结' :
                                row.washType === 3 ? '月结' : '否' }}
                            </span>
                  </div>
                </td>
                <td   v-if="info.arrJxb[4] === '1'" class="px-6 py-4 whitespace-nowrap">
                    <div>
                        <van-switch size="20" v-model="row.enable"  :active-value="1"   :inactive-value="0" @change="changeSwitch(row)" />
                   </div>
                </td>

            </tr>
        </tbody>
    </table>
     </div>
     <van-action-sheet v-if="row_data" v-model="showMoreBtn" title="修改" style="height: 30%;">
        <div class="relative py-5 px-3">
           
            <!-- <div  v-if="row_data.username != info.username && info.arrJxb[15] === '1'"
                :disabled="xm_disable || row_data.enable == 0 ? true : false" @click="handleXM(row_data)" class="bg-[#ddd] py-2 font-bold px-2 tracking-wider">洗码比例</div>
           
                <div v-if="row_data.username != info.username" @click="handleKick(row_data)" class="bg-[#ddd] py-2 font-bold my-2 px-2 tracking-wider">踢出</div>
            
            <div  v-if="row_data.username != info.username && (row_data.googleAuthSecret != '' || row_data.googleAuthSecret != null) && row_data.level != 3" @click="handelRemoveGAuth(row_data)" class="bg-[#ddd] py-2 font-bold my-2 px-2 tracking-wider">移除验证登录</div>
            
            <div  v-if="row_data.username != info.username && info.Id === 1 && row_data.ye > 0" @click="handelResetToZero(row_data)" class="bg-[#ddd] py-2 font-bold my-2 px-2 tracking-wider">账号清零</div>
           
            <div  v-if="row_data.username != info.username && info.Id === 1" @click="handleRemoveXM(row_data)" class="bg-[#ddd] py-2 font-bold my-2 px-2 tracking-wider">洗码清零</div>
           
            <div  v-if="row_data.username != info.username" @click="handleEEL(row_data)" class="bg-[#ddd] py-2 font-bold my-2 px-2 tracking-wider">删除</div>
           
            <div  v-if="row_data.level != 3" :disabled="row_data.enable === 0 ? true : false"  class="bg-[#ddd] py-2 font-bold my-2 px-2 tracking-wider">
             <span v-if="info.arrJxb[13] == '1' && row_data.username != info.username" @click="handleLimitSetup(row_data)">权限</span>
            </div> -->

            <div class="flex items-center space-x-2 mt-2">
            <van-button  @click="handleMoreAction(1, row_data)"  class=" flex-1 h-8 rounded bg-[#4e6c50] text-white"> 总报表 </van-button>
            <van-button  @click="handleMoreAction(2, row_data)"  class=" flex-1 h-8 rounded bg-[#4e6c50] text-white"> 登录记录 </van-button>
        </div>
            <div class="flex items-center space-x-2 mt-2">
            <van-button  @click="handleMoreAction(3, row_data)"  class=" flex-1 h-8 rounded bg-[#4e6c50] text-white"> 洗码结算记录 </van-button>
            <van-button  @click="handleMoreAction(4, row_data)"  class=" flex-1 h-8 rounded bg-[#4e6c50] text-white"> 提现记录 </van-button>
        </div>

            <!-- <div  @click="handleMoreAction(1, row_data)" class="bg-[#ddd] py-2 font-bold my-2 px-2 tracking-wider">总报表</div>
            <div  @click="handleMoreAction(2, row_data)" class="bg-[#ddd] py-2 font-bold my-2 px-2 tracking-wider">登录记录</div>
            <div  @click="handleMoreAction(3, row_data)" class="bg-[#ddd] py-2 font-bold my-2 px-2 tracking-wider">洗码结算记录</div>
            <div  @click="handleMoreAction(4, row_data)" class="bg-[#ddd] py-2 font-bold my-2 px-2 tracking-wider">提现记录</div> -->

        </div>
        </van-action-sheet>
    </section>
</template>


<script>
import { mapState } from 'vuex'
import { userStatusApi, changeYjApi } from '@/api/ht'
import moment from 'moment'

export default {
  props: {
    userData: {
      type: Array,
      default: () => []
    },
    loading: {
      type: Boolean,
      default: false
    },
    isAgent: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
        row_data:null,
        showMoreBtn:false,
      xm_disable: false,
      rightClickData: {}, //
      showTable: {
        Id: true,
        gx: true,
        zc: true,
        xmb: true,
        xmType: true,
        pf: true,
        topup_auth: true,
        auto_wash: true,
        createDate: true,
        lastLoginTime: true,
        ip: false,
        group_ye: true,
        direct_user: true,
        win_lose: true
      },
      menuVisible: false,
      CurrentRow: {},
      isMe: this.$Global.optioner.UserName,
      arrJxb: this.$Global.optioner.arrJxb,
    }
  },
  computed: {
    ...mapState({
      info: state => state.user.info,
      sidebar: state => state.app.sidebar
    })
  },
//   updated() {
//     this.$nextTick(() => {
//       this.$refs.ListTable.doLayout()
//     })
//   },
  methods: {
    openShow_More(data){
        console.log(data,"row_data ************")
        this.row_data = data
        this.showMoreBtn = true
    },
    formatDate(date) {
      if (!date) return ''
      return moment(date).format('YYYY-MM-DD HH:mm:ss')
    },

    clickUsername(row) {
      this.$emit('listEmit', { type: 'CLICK_USERNAME', row: row })
    },

    testPFUpDown(row, type) {
      this.$emit('listEmit', { type: type, row: row })
    },

    handleAgentSetup(row) {
      this.$emit('listEmit', { type: 'SETUP_MEMBER', row: row })
    },

    handleXM(row) {
      this.$emit('listEmit', { type: 'XM_MEMBER', row: row })
    },

    handleKick(row) {
      this.$emit('listEmit', { type: 'KICK_MEMBER', row: row })
    },

    handelRemoveGAuth(row) {
      if (row.googleAuthSecret === '' || row.googleAuthSecret === null) return this.$toast('账号未绑定谷歌验证')
      this.$emit('listEmit', { type: 'GAUTH_REMOVE', row: row })
    },

    handelResetToZero(row) {
      this.$emit('listEmit', { type: 'RESET_TO_ZERO', row: row })
    },

    handleRemoveXM(row) {
      this.$emit('listEmit', { type: 'REMOVE_XM', row: row })
    },

    handleLimitSetup(row) {
      if (row.level !== 1 && row.level !== 2 && row.level !== 4) return
      this.$emit('listEmit', { type: 'PERMISSION', row: row })
    },

    setShowXm(row, show) {
      this.$emit('listEmit', { type: 'SHOW_XM', row: row, is_show: show })
    },

    handleEEL(row) {
      this.$emit('listEmit', { type: 'EL_USER', row: row })
    },

    changeSwitch(row) {
      if (this.info.arrJxb[4] === '0') return  this.$toast(`抱歉! 您没有该权限! 请联系上级!`)
      userStatusApi({ userId: row.Id, username: row.username, status: row.enable, opt_id: this.info.Id, opt_name: this.info.username }).then(res => {
        if (res.code === 0) {
            this.$toast(res.msg)
          this.$emit('listEmit', { type: 'STATUS_SUCCESS', row: row })
        } else {
            this.$toast(res.msg)
        }
      }).catch(e => {
        console.error('e ', e, e?.message)
      })
    },

    changeTopupAuth(row, status) {
        this.$dialog.confirm({title:`您确认要${status === 0 ? "禁用" : "启用"} ${row.username} 的充提权限吗? `, 
      })
        .then(() => {
          changeYjApi({ status: status, userId: row.Id, opt_id: this.info.Id }).then(res => {
            if (res.code === 0) {
                this.$toast(res.msg)
              this.$emit('listEmit', { type: 'YJ_SUCCESS', row: row })
            } else {
                this.$toast(res.msg)
            }
          }).catch(e => {
            console.error('e ', e, e?.message)
          })
        })
        .catch(() => { })
    },

    fiexeTwo(num) {
      if (num) return Number((num))?.toFixed(0)
      return num
    },

    tableCellClick(row, column, cell, event) {
      if (column.property === 'username') {
        this.$toast('复制成功')
        var data = JSON.parse(JSON.stringify(row))
        var oInput = document.createElement('input')
        oInput.value = data.username
        document.body.appendChild(oInput)
        oInput.select()
        document.execCommand('Copy')
        oInput.className = 'oInput'
        oInput.style.display = 'none'
      }
    },

    changeCellStyle(row, column, rowIndex, columnIndex) {
      if (row.column.property === 'ye' || row.column.property === 'nxm' || row.column.property === 'group_ye' || row.column.property === 'win_lose') {
        return 'padding-right: 10px !important; text-align: right;'
      }
    },

    handleMoreAction(action, row, type) {
      switch (action) {
        case 1:
          if (this.info.arrJxb[8] === '0') {
            return this.$message.warning(`${this.$t('message.you_do_not_have_this_permission')}`)
          }
          this.goPageParams('ReportsPage', { name: row.username })
          break
        case 2:
          this.goPageParams('LoginRecord', { name: row.username })
          break
        case 3:
          this.goPageParams('XmUpDownRecord', { name: row.username })
          break
        case 4:
          this.goPageParams('WithdrawRecords', { name: row.username })
          break
        case 5:
          this.goPageParams('ChangeRecord', { name: row.username })
          break
        case 6:
          this.goPageParams('MoneyRecords', { name: row.username })
          break
        case 7:
          this.goPageParams('UpDownRecord', { name: row.username })
          break
      }
    },

    goPageParams(name, params) {
      this.$router.push({
        name: name,
        params: params
      })
    },

    rightClick(row, column, event) {
      // this.testModeCode = row.testModeCode
      this.menuVisible = false // 先把模态框关死，目的是 第二次或者第n次右键鼠标的时候 它默认的是true
      this.menuVisible = true // 显示模态窗口，跳出自定义菜单栏
      event.preventDefault() // 关闭浏览器右键默认事件
      this.CurrentRow = row
      var menu = document.querySelector('.menuw')
      this.styleMenu(menu)
    },
    foo() {
      // 取消鼠标监听事件 菜单栏
      this.menuVisible = false
      document.removeEventListener('click', this.foo) // 关掉监听，
    },
    styleMenu(menu) {
      // if (event.clientX > 1800) {
      //   menu.style.left = event.clientX - 100 + 'px'
      // } else {
      //   menu.style.left = event.clientX + 1 + 'px'
      // }
      document.addEventListener('click', this.foo) // 给整个document新增监听鼠标事件，点击任何位置执行foo方法
      // if (event.clientY > 700) {
      //   menu.style.top = event.clientY - 30 + 'px'
      // } else {
      //   menu.style.top = event.clientY - 10 + 'px'
      // }
      const mouseX = event.clientX
      const mouseY = event.clientY
      const boundsX = window.innerWidth
      const boundsY = window.innerHeight
      const menuHeight = menu.scrollHeight
      const menuWidth = menu.scrollWidth
      let top
      let left
      const scrollTop = (document.documentElement && document.documentElement.scrollTop) ? document.documentElement.scrollTop : document.body.scrollTop
      if (mouseY + menuHeight > boundsY) {
        const topH = mouseY - menuHeight + scrollTop
        const menuTop = mouseY - menuHeight
        if (topH > 0 && menuTop > 0) {
          top = topH
        } else {
          top = mouseY + scrollTop
        }
      } else {
        top = mouseY + scrollTop
      }
      const scrollLeft = (document.documentElement && document.documentElement.scrollLeft) ? document.documentElement.scrollLeft : document.body.scrollLeft
      if ((mouseX + menuWidth > boundsX) && ((mouseX - menuWidth) > 0)) {
        left = mouseX - menuWidth + scrollLeft
      } else {
        left = mouseX + scrollLeft
      }
      const add_width = this.sidebar.opened ? 210 : 45 // sidebar 开启时要得减去多一点
      left -= add_width
      const parentOffsetTop = event.currentTarget.parentElement.offsetTop
      const parentOffsetLeft = event.currentTarget.parentElement.offsetLeft
      menu.style.top = top - parentOffsetTop + 'px'
      menu.style.left = left - parentOffsetLeft + 'px'
    },
    ShowView(cu) {
      console.log(cu)
    }

  }
}
</script>