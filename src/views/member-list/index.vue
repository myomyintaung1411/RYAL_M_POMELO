<template>
  <div class="memberList">
    <el-form ref="form" :inline="true" :model="form" label-width="90px" size="medium">
      <el-form-item prop="account">
        <el-input v-model="form.account" :placeholder="$t('player_list.account')" clearable @keyup.native="btKeyUp" @keydown.enter.native="doFindMember" />
      </el-form-item>
      <el-form-item prop="nikename">
        <el-input v-model="form.nikename" :placeholder="$t('player_list.nickname')" clearable @keyup.native="btKeyUp" @keydown.enter.native="doFindMember" />
      </el-form-item>
      <el-form-item>
        <el-button size="medium" icon="el-icon-search" type="primary" @click="doFindMember()">{{ $t('buttons.search') }}</el-button>
      </el-form-item>
      <el-form-item>
        <el-button size="medium" icon="el-icon-refresh" type="primary" @click="doRefreshMember()">{{ $t('buttons.my_direct_player') }}</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="20">
      <!-- <el-col :span="5" :xs="24" :sm="24" :md="6" :lg="5" :xl="5">
        <AgentTree ref="agentTree" @treeAction="treeAction" />
      </el-col>
      <el-col :span="19" :xs="24" :sm="24" :md="18" :lg="19" :xl="19"> -->
      <el-col :span="24" :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <AgentTree ref="agentTree" @treeAction="treeAction">
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-setting" />
              {{ $t('player_list.action') }}
            </template>
            <el-button size="mini" type="primary" icon="el-icon-user" @click="toHisAgent(relation[relation.length-1])">{{ $t('buttons.go_to') }} {{ !hideRela ? relation[relation.length - 1] : '* * *' }} {{ $t('buttons.s_agent') }}</el-button>
            <el-button size="mini" type="text" style="margin-right: 10px;" @click="excelExport()">{{ $t('buttons.export') }}</el-button>
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-s-operation" />
              {{ $t('player_list.table_option') }}
            </template>
            <!-- <el-checkbox v-model="showTable.createDate" class="filter-item" style="margin-left:15px; color: #FF5722" @change="tableKey=tableKey+1">
              开户时间
            </el-checkbox> -->
            <el-checkbox v-model="showTable.gx" class="filter-item" @change="tableKey=tableKey+1">
              {{ $t('player_list.relation') }}
            </el-checkbox>
            <el-checkbox v-model="showTable.lastLogin" class="filter-item" @change="tableKey=tableKey+1">
              {{ $t('player_list.login_time') }}
            </el-checkbox>
            <!-- <el-checkbox v-model="showTable.LastLoginIP" class="filter-item" @change="tableKey=tableKey+1">
              最近登录IP
            </el-checkbox> -->
          </el-descriptions-item>
        </AgentTree>
        <!-- <el-card> -->
        <!-- <Pagination class="pageination" :background="true" :total="memberListFrm.totalItemsNum" :page.sync="currentPage" :limit.sync="pageSize" @pagination="PaginationEvent" /> -->
        <el-table
          v-loading="loading"
          :header-cell-style="this.$Global.tableHeaderColor"
          :data="memberListFrm.tableData"
          style="width: 100%"
          border
        >
          <el-table-column property="Id" label="ID" width="70" />
          <el-table-column property="memberAccount" :label="$t('player_list.account')">
            <template slot-scope="scope">
              <span v-show="scope.row.onLine==='在线'">
                <font color="red">{{ scope.row.memberAccount }}</font>
              </span>
              <span v-show="scope.row.onLine==='离线'">{{ scope.row.memberAccount }}</span>
            </template>
          </el-table-column>
          <el-table-column property="name" :label="$t('player_list.nickname')" align="left">
            <template slot-scope="scope">
              <span v-show="scope.row.onLine==='在线'">
                <font color="red">{{ scope.row.name }}</font>
              </span>
              <span v-show="scope.row.onLine==='离线'">{{ scope.row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column property="mBalance" :label="$t('player_list.balance')" align="right">
            <template slot-scope="{row}">
              {{ row.mBalance }}
            </template>
          </el-table-column>
          <!-- <el-table-column property="upperAgent" label="所属代理" align="left">
            <template slot-scope="scope">
              <font color="#009688" style="cursor: pointer">{{ scope.row.upperAgent }}</font>
            </template>
          </el-table-column> -->
          <el-table-column v-if="showTable.gx" property="gx" :label="$t('player_list.relation')" min-width="100">
            <template slot-scope="{row}">
              <el-tooltip :content="row.gx" placement="top" effect="light">
                <el-input readonly type="text" :value="row.gx" />
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column property="xmKind" :label="$t('player_list.xi_ma_type')" align="left" width="80">
            <template slot-scope="{row}">
              <!-- <font v-if="row.xmKind === '双边'" color="#1E88E5">{{ $t('table.multiple') }}</font>
              <font v-else color="#FB8C00">{{ $t('table.single') }}</font> -->
              <font v-if="row.xmKind === '双边'">{{ $t('table.multiple') }}</font>
              <font v-else>{{ $t('table.single') }}</font>
            </template>
          </el-table-column>
          <el-table-column property="xmb" :label="$t('player_list.xi_ma_bi')" align="left" width="100">
            <template slot-scope="{row}">
              <div style="display: flex; justify-content: space-between; text-align: left;">
                <font style="width: 50%;">{{ $t('table.single_abbr') + row.xmb.split('/')[0] }}</font>
                <font style="width: 50%;">{{ $t('table.multi_abbr') + row.xmb.split('/')[1] }}</font>
              </div>
            </template>
          </el-table-column>
          <el-table-column property="createDate" :label="$t('player_list.crated_time')" align="left" min-width="110" />
          <el-table-column property="ip" :label="$t('player_list.login_ip')" align="left" min-width="110">
            <template slot-scope="{row}">
              <el-tooltip v-if="row.ip != 'null '" :content="row.ip" placement="top" effect="light">
                <span class="over_dot_text">{{ row.ip }}</span>
              </el-tooltip>
              <span v-else />
            </template>
          </el-table-column>
          <el-table-column v-if="showTable.lastLogin" property="lastLoginTime" :label="$t('player_list.login_time')" align="left" min-width="110" />
          <el-table-column property="onLine" :label="$t('player_list.online')" align="left" width="70">
            <template slot-scope="scope">
              <span v-show="scope.row.onLine==='在线'">
                <font color="red">{{ $t('table.online') }}</font>
              </span>
              <span v-show="scope.row.onLine==='离线'">{{ $t('table.offline') }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="sEnable" :label="$t('player_list.state')" align="center" width="80">
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.sEnable"
                active-value="启用"
                inactive-value="禁用"
                @change="changeSwitch(scope.row)"
              />
            </template>
          </el-table-column>

          <el-table-column :label="$t('player_list.action')" align="left" width="275" padding="0px">
            <template slot-scope="scope">
              <el-button
                v-if="arrJxb[7]==='1'"
                size="mini"
                type="success"
                class="el-button-opt"
                @click="handleOptScore(scope.$index, scope.row,1)"
              >{{ $t('buttons.chargeWithdraw') }}</el-button>
              <el-button
                v-if="arrJxb[3]==='1'"
                size="mini"
                type="primary"
                class="el-button-opt"
                @click="handleMemberSetup(scope.$index, scope.row)"
              >{{ $t('buttons.modify') }}</el-button>
              <el-button
                v-if="arrJxb[3]==='1'"
                size="mini"
                type="danger"
                class="el-button-opt"
                @click="handleMemberKick(scope.$index, scope.row)"
              >{{ $t('buttons.kick') }}</el-button>
              <el-dropdown style="margin-left: 10px;">
                <span class="el-dropdown-link">
                  {{ $t('buttons.more') }}<i class="el-icon-arrow-down el-icon--right" />
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item v-if="arrJxb[15] === '1'">
                    <div @click="handleMoreAction(0, scope.row)">{{ $t('buttons.xi_ma') }}</div>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <div @click="handleMoreAction(1, scope.row)">{{ $t('buttons.betting_record') }}</div>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <div @click="handleMoreAction(2, scope.row)">{{ $t('buttons.deposit_withdraw_record') }}</div>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <div @click="handleMoreAction(3, scope.row)">{{ $t('buttons.edit_account_record') }}</div>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
        </el-table>
        <Pagination style="margin-top: 10px;" :background="true" :total="memberListFrm.totalItemsNum" :page.sync="currentPage" :limit.sync="pageSize" @pagination="PaginationEvent" />
        <!-- </el-card> -->
      </el-col>
    </el-row>

    <!-- eslint-disable-next-line -->
    <ExportExcel ref="excel" :eData="eData" />
    <!-- eslint-disable-next-line -->
    <UpDown ref="updown" :upDownData="upDownData" />
    <!-- eslint-disable-next-line -->
    <SetUp ref="setup" :setupData="setupData" />
    <!-- eslint-disable-next-line -->
    <XM ref="xm" :xmData="xmData" @xmSuccess="xmSuccess" />

    <!-- you can add element-ui's tooltip -->
    <el-tooltip placement="top" :content="$t('action.backToTop')">
      <back-to-top :custom-style="this.$Global.myBackToTopStyle" :visibility-height="300" :back-position="50" transition-name="fade" />
    </el-tooltip>
  </div>
</template>
<script>
/* eslint-disable */
// import { mapState } from "vuex"
import ExportExcel from '@/components/ExportExcel'
import UpDown from './member-action/up-down'
import SetUp from './member-action/set-up'
import XM from './member-action/xm'
import BackToTop from '@/components/BackToTop'
import AgentTree from '@/components/AgentTree'
import Pagination from '@/components/Pagination'
import { mapState, mapGetters } from 'vuex'
import { debounce } from '@/utils/index'
import { searchRelatnNew } from '@/api/tree'

export default {
  components: {
    ExportExcel,
    UpDown,
    SetUp,
    XM,
    BackToTop,
    AgentTree,
    Pagination
  },
  data() {
    return {
      arrJxb: this.$Global.optioner.arrJxb,
      checkSD: this.$Global.optioner.xmType,
      optName: '', // 所有对话框的操作名称
      pageSize: 10, // 页面数据条数只需改这里和上面的page-size
      currentPage: 1,
      loading: true,
      optionerScore: '',
      showTable: {
        createDate: false,
        lastLogin: false,
        LastLoginIP: false,
        gx: true
      },
      tableKey: 0,
      form: {
        account: '',
        nikename: ''
      },
      isSearch: false,
      hideRela: false,
      // eslint-disable-next-line
      eData: {},
      upDownData: {
        relation:{}
      },
      setupData: {},
      xmData: {}
    }
  },
  computed: {
    ...mapState({
      memberListFrm: state => state.ht.memberListForm,
      relation: state => state.ht.relations,
      isSub: state => state.user.isSubAccount,
      subInfo: state => state.user.subInfo
    }),
    ...mapGetters(['SEARCH_MEMBER_OK', 'token', 'PLL_ISLOADING'])
  },
  watch: {
    SEARCH_MEMBER_OK: function(n) {
      if (n) {
        this.searchOK()
      }
    },
    PLL_ISLOADING: function(val) {
      if (val === 1 ) this.loading = false
    }
  },
  created() {
    this.showTreeMoreAction()
    let routerParams = this.$route.query
    if (routerParams.name !== undefined) {
      this.reqt({ name: routerParams.name, pageSize: this.pageSize, currentPage: 1 })
    } else {
      if (this.relation === undefined || this.relation === null || this.relation.length === 0) {
        this.$store.commit('ht/setRelations', [this.$Global.optioner.UserName])
        this.reqt({ name: this.$Global.optioner.UserName, pageSize: this.pageSize, currentPage: 1 })
      } else {
        this.reqt({ name: this.relation[this.relation.length - 1], pageSize: this.pageSize, currentPage: 1 })
      }
    }
    // this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
  },
  methods: {
    showTreeMoreAction() {
      this.$store.commit('ht/setShowTreeMoreState', false)
    },
    searchOK() {
      this.$store.commit('ht/setSearchMemberState', false)
      if (this.memberListFrm.tableData[0]  && this.isSearch) {
        // this.$refs.agentTree.searchRelatnNew(this.memberListFrm.tableData[0].upperAgent || '')
        searchRelatnNew(this.memberListFrm.tableData[0].upperAgent || '')
        this.isSearch = false
      }
      if (this.relation.length <= 0) {
        this.$store.commit('ht/setRelations', [this.$Global.optioner.UserName])
      }
    },
    treeAction($event) {
      if ($event.action === 'getOwnData') {
        this.getMemberList($event.value)
      } else if ($event.action === 'getHisAgent') {
        this.getHisAgent($event.value)
      } else if ($event.action === 'hideRelation') {
        this.doHideRelation($event.value)
      }
    },
    getHisAgent(node) {
      return this.$router.push({
        path: '/manageUser/agent-list',
        query: {
          name: node.label
        }
      })
    },
    toHisAgent(acc) {
      this.$router.push({
        path: '/manageUser/agent-list',
        query: {
          name: acc
        }
      })
    },
    doHideRelation(hide) {
      this.hideRela = hide ? false : true
      this.showTable.gx = hide ? true : false
    },
    xmSuccess() {
      let sendStr = {}
      if (this.form.account === '') {
        this.reqt({ name: this.relation[this.relation.length - 1], pageSize: this.pageSize, currentPage: this.currentPage })
      } else {
        sendStr = {
        router: 'GetMemberInfo',
          JsonData: {
            opt_name: this.$Global.optioner.UserName,
            name: this.$Global.optioner.UserName,
            Id: this.$Global.optioner.Id, // 查找时不归selectAgent
            findname: this.form.account,
            nikename: this.form.nikename,
            pageSize: this.pageSize,
            currentPage: this.currentPage
          }
        }
        this.loading = true
        this.$store.state.ht.memberListForm.state = 0
        this.$pomelo.send(sendStr)
        this.$store.commit('ht/setSearchMemberState', false)
      }
    },
    getMemberList(value) {
      this.currentPage = 1
      this.reqt({ name: value, pageSize: this.pageSize, currentPage: this.currentPage })
    },
    // 限制输入特殊字符
    btKeyUp(e) {
      e.target.value = e.target.value.replace(/[`~!#$%^&*()\-+=<>?:'{}|,.\/;'\\[\]·~！#￥%……&*（）\-+={}|《》？：“”【】、；‘’，。、]/g, '')
    },
    handleOptScore(index, row, n) {
      if (this.$Global.optioner.arrJxb[7] === '0') return this.$message.warning(`${this.$t('message.you_do_not_have_this_permission')}`)
      this.$pomelo.send({
        router: 'getOptScoreRecord',
        JsonData: { name: row.memberAccount, Id: this.$Global.optioner.Id }
      })
      const sendStr1 = {
        router: 'getDesScoreAgent',
        JsonData: {
          Id: row.Id,      // 加减分对象Id
          optId: this.$Global.optioner.Id,     // 操作员Id
        }
      }
      this.$pomelo.sendcb(sendStr1, res => {
        if (res.JsonData.length > 0) {
          this.$nextTick(() => {
            this.upDownData = row
            this.upDownData.relation = res.JsonData
            this.$refs.updown.dialogFormVisible = true
          })
        } else {
          return this.$message.error('操作失败')
        }
      })
    },
    handleMemberSetup(index, row) {
      // if (this.$Global.optioner.arrJxb[3] === '0') return this.$message.warning(`${this.$t('message.you_do_not_have_this_permission')}`)
      // // const frm = this.memberSetupDigFrm
      // // frm.MemberSetupDigFrmVisible = true
      const sendStr = {
        router: 'getReferenceInfo',
        JsonData: { name: row.reference_name }
      }
      this.$pomelo.send(sendStr)
      setTimeout(() => {
        this.setupData = row
        // console.log('this.setupdata ....... ', this.setupData)
        this.$refs.setup.dialogFormVisible = true
      }, 500)
    },
    handleMemberKick(index, row) {
      const name = row.memberAccount
      const Id = row.userId
      this.$confirm(this.$t('kick_dialog.are_you_sure') + '  ' + name + this.$t('kick_dialog.question'), this.$t('kick_dialog.warning'), {
        confirmButtonText: this.$t('buttons.confirm'),
        cancelButtonText: this.$t('buttons.cancel')
      })
        .then(() => {
          var sendStr = {
            router: 'kickMember',
            JsonData: { Id: Id, name: name, level: 3 }
          }
          this.$pomelo.send(sendStr)
          // console.log('kickMember: ', sendStr)
        })
        .catch(() => {})
    },
    handleXM(row) {
      this.xmData = JSON.parse(JSON.stringify(row))
      this.$refs.xm.dialogFormVisible = true
      const sendStr = {
        router: 'getXmInfo',
        JsonData: {
          level: 3,
          userId: row.Id,
          optname: this.$Global.optioner.UserName,
          token: this.token,
          proxyname: this.isSub ? this.subInfo.name : ''
        }
      }
      this.$pomelo.send(sendStr)
    },
    handleMoreAction(action, row) {
      switch (action) {
        case 0:
          this.handleXM(row)
          break
        case 1:
          this.goPage('/recordsPage/bet-records', { name: row.memberAccount })
          break
        case 2:
          this.goPage('/recordsPage/access-records', { name: row.memberAccount })
          break
        case 3:
          this.goPage('/recordsPage/account-change-records', { name: row.memberAccount })
      }
    },
    goPage(router, query) {
      this.$router.push({
        path: `${router}`,
        query: query
      })
    },
    reqt({name, pageSize, currentPage}) {
      const sendStr = {
        router: 'GetMemberInfo',
        JsonData: {
          name: name,
          pageSize: pageSize,
          currentPage: currentPage
        }
      }
      this.loading = true
      this.$store.state.ht.memberListForm.state = 0
      this.$pomelo.send(sendStr)
    },
    doFindMember: debounce( function () {
      if (this.form.account.trim() === '' && this.form.nikename.trim() === '') {
        this.$message.warning('请输入会员帐号或者昵称')
        return
      }
      this.isSearch = true
      var sendStr = {
        router: 'GetMemberInfo',
        JsonData: {
          opt_name: this.$Global.optioner.UserName,
          name: this.$Global.optioner.UserName,
          Id: this.$Global.optioner.Id, // 查找时不归selectAgent
          findname: this.form.account,
          nikename: this.form.nikename,
          pageSize: this.pageSize,
          currentPage: 1
        }
      }
      this.loading = true
      this.$store.state.ht.memberListForm.state = 0
      this.$pomelo.send(sendStr)
      this.$store.commit('ht/setSearchMemberState', false)
    }, 1000, true),
    doRefreshMember: debounce( function() {
      this.form.account = ''
      this.form.nikename = ''
      this.reqt({ name: this.$Global.optioner.UserName, pageSize: this.pageSize, currentPage: this.currentPage })
      this.$store.commit('ht/setSearchMemberState', false)
    }, 1000, true),
    PaginationEvent(props) {
      this.handlePagination(props)
    },
    handlePagination(props) {
      props.action === 'limit' ? this.currentPage = 1 : this.currentPage = props.page
      this.pageSize = props.limit
      this.reqt({ name: this.relation[this.relation.length - 1], pageSize: this.pageSize, currentPage: this.currentPage })
    },
    changeSwitch(data) {
      if (this.$Global.optioner.arrJxb[4] === '0') return this.$message.warning(`${this.$t('message.you_do_not_have_this_permission')}`)
      var n = data.sEnable === '禁用' ? 0 : 1
      const sendStr = {
        router: 'setUserState',
        JsonData: { name: data.memberAccount, state: n }
      }
      this.$pomelo.send(sendStr)
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 === 1) {
        return 'color-row'
      }
      return ''
    },
    excelExport() {
      this.eData = {
        tHeader: ['会员ID','会员账号', '昵称', '洗码类型', '所属代理', '当前余额', '洗码比(单/双)%', '状态', '开户日期'],
        filterVal: ['Id', 'memberAccount', 'name', 'xmKind', 'upperAgent', 'mBalance', 'xmb', 'sEnable', 'createDate'],
        list: this.memberListFrm.tableData
      }
      if (this.memberListFrm.tableData === undefined) {
        return
      }
      this.$refs.excel.excleForm = true
    }
  }
}
</script>

<style scoped>
.memberList {
  margin: 20px;
}
.el-button-opt {
  width: 60px;
  height: 25px;
  padding: 1px;
  margin: 1px;
}
.el-pagination {
  float: right;
  min-width: 200px;
}
</style>
