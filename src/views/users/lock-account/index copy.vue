<template>
    <div style="padding: 10px">
      <section style="margin-top: 20px;">
        <!-- <div style="font-weight: 900; padding: 20px 0 10px 0">公告列表：</div> -->
        <el-card>
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <div>
              <!-- <el-checkbox v-if="this.$Global.optioner.Id === 1" v-model="showAll" style="margin-right: 10px;">查看全部</el-checkbox> -->
              <el-button :size="device !== 'mobile' ? 'medium' : 'mini'" type="plain" icon="el-icon-refresh" @click="refershList()">{{ '刷新' }}</el-button>
              <el-button :size="device !== 'mobile' ? 'medium' : 'mini'" type="plain" icon="el-icon-refresh" @click="unlockAll()">解锁全部</el-button>
  
              <!-- <el-button :size="device !== 'mobile' ? 'medium' : 'mini'" type="primary" icon="el-icon-search" @click="findSearchAccount()">{{ $t('buttons.search') }}</el-button> -->
            </div>
            <Pagination :background="true" :total="lockList.totalItems" :page.sync="currentPage" :limit.sync="pageSize" @pagination="PaginationEvent" />
          </div>
  
          <el-table
            v-loading="loading"
            :data="lockList.tableData"
            style="width:100%;margin-top:10px"
            :header-cell-style="this.$Global.tableHeaderColor"
            border
            height="690"
            @selection-change="handleSelectionChange"
          >
            <!-- <el-table-column v-if="$Global.optioner.Id === 1" property="Id" label="ID" align="center" width="100" /> -->
            <el-table-column type="selection" width="50" align="center" />
            <el-table-column property="username" :label="$t('lockacc.username')" align="center" />
            <el-table-column property="nickname" :label="$t('lockacc.nickname')" align="center" />
            <el-table-column property="level" label="等级" align="center" />
            <el-table-column property="login_count" :label="$t('lockacc.login_count')" align="center" />
            <el-table-column property="created_at" :label="$t('lockacc.created_at')" align="center" />
            <el-table-column property="updated_at" :label="$t('lockacc.updated_at')" align="center" />
            <el-table-column property="memo" :label="$t('lockacc.memo')" align="center" />
            <el-table-column property="ip" :label="$t('lockacc.login_ip')" align="center">
              <template slot-scope="{row}">
                {{ row.ip }}
              </template>
            </el-table-column>
            <el-table-column v-if="this.$Global.optioner.arrJxb[12] !== '0'" :label="$t('subacc.action')" width="260" align="center">
              <template slot-scope="{row}">
                <el-button size="mini" type="danger" @click="handleUnlock(row)">{{ '解锁' }}</el-button>
              </template>
            </el-table-column>
          </el-table>
  
        </el-card>
      </section>
  
      <el-dialog
        v-el-drag-dialog
        :title="`您确认要解锁 ${unData.username} 吗？`"
        :visible.sync="showUn"
        :close-on-click-modal="false"
        width="300px"
        @close="cancel"
      >
  
        <el-button type="danger" :loading="loading" @click="confirm()" style="margin-right: 10px;">确认</el-button>
        <el-button type="" :loading="loading" @click="cancel()">取消</el-button>
  
      </el-dialog>
  
      <el-dialog
        v-el-drag-dialog
        :title="`您确认要解锁所有锁定账号吗？`"
        :visible.sync="showUnAll"
        :close-on-click-modal="false"
        width="300px"
        @close="cancel"
      >
  
        <el-button type="danger" :loading="loading" @click="confirmAll()" style="margin-right: 10px;">确认</el-button>
        <el-button type=""  :loading="loading" @click="cancelAll()">取消</el-button>
  
      </el-dialog>

    </div>
  </template>
  
  <script>
  import { mapState, mapGetters } from 'vuex'
  
  export default {
    data() {
      return {
        dialogVisibleAdd: false,
        showAll: false,
        showUnAll: false,
        lockList: {
          tableData: [
            // { id: 1, name: 'ceshi', sEnable: '启用', lastLoginTime: '2021-10-01 00:00:00' }
          ],
          totalItems: 0
        },
        loading: false,
        btn_loading: false,
        arrJxb: this.$Global.optioner.arrJxb,
        showUn: false,
        unData: {},
        pageSize: 100,
        currentPage: 1,
        ids: [],
        users: []
      }
    },
    computed: {
      ...mapState({
        isSub: state => state.user.isSubAccount,
        subInfo: state => state.user.subInfo,
        device: state => state.app.device
      }),
      ...mapGetters(['token'])
    },
    created() {
      this.getLockAccount()
    },
    methods: {
      unlockAll() {
        this.showUnAll = true
      },
  
      findSearchAccount() {
        this.currentPage = 1
        this.getLockAccount()
      },
  
      refershList() {
        this.currentPage = 1
        this.getLockAccount()
      },
  
      handleUnlock(row) {
        this.unData = JSON.parse(JSON.stringify(row))
        this.showUn = true
      },
  
      getLockAccount() {
        const sendStr = {
          router: 'getLockAccountList',
          JsonData: {
            opt_id: this.$Global.optioner.Id,
            opt_name: this.$Global.optioner.UserName,
            currentPage: this.currentPage,
            pageSize: this.pageSize,
            token: this.token,
            proxyname: this.isSub ? this.subInfo.name : ''
          }
        }
        this.loading = true
        this.$pomelo.sendcb(sendStr, res => {
          console.log('lock list ', res)
          this.loading = false
          this.lockList.tableData = []
          this.lockList.totalItems = 0
          var data = res.JsonData?.list
          var lockListForm = { tableData: [], totalItems: 0 }
          var tableData = lockListForm.tableData
          if (res.JsonData?.list?.length > 0) {
            for (var i = 0; i < data.length; i++) {
              tableData[i] = {}
              tableData[i].id = data[i].id
              tableData[i].username = data[i].username
              tableData[i].nickname = data[i].nicheng
              tableData[i].level = data[i].level
              tableData[i].status = data[i].status
              tableData[i].login_count = data[i].login_count
              tableData[i].created_at = data[i].created_at
              tableData[i].updated_at = data[i].updated_at
              tableData[i].memo = data[i].memo
              tableData[i].ip = data[i].ip
            }
            // this.mapIP(lockListForm.tableData)
            // if (this.isSub) {
            //   lockListForm.tableData.forEach((v, i) => {
            //     if (v.name === this.subInfo.name) {
            //       lockListForm.tableData.splice(i, 1)
            //     }
            //   })
            // }
            this.lockList.tableData = lockListForm.tableData
            this.lockList.totalItems = res.JsonData?.list?.length || 0
          } else {
            ththis.$toast('没有查询到相应的数据')
          }
        })
      },
  
      PaginationEvent(props) {
        this.handlePagination(props)
      },
      handlePagination(props) {
        props.action === 'limit' ? this.currentPage = 1 : this.currentPage = props.page
        this.pageSize = props.limit
        // this.reqt()
        this.getLockAccount()
      },
      cancel() {
        this.showUn = false
        this.unData = {}
      },
      confirm() {
        const sendStr = {
          router: 'unlockLockAccount',
          JsonData: {
            opt_id: this.$Global.optioner.Id,
            opt_name: this.$Global.optioner.UserName,
            proxyname: this.isSub ? this.subInfo.name : '',
            token: this.token,
            id: this.unData.id,
            username: this.unData.username
          }
        }
        this.$pomelo.sendcb(sendStr, res => {
          if (res?.JsonData?.result === 'ok') {
            this.$toast('解锁成功')
            this.getLockAccount()
            this.getLCount()
            this.showUn = false
            this.unData = {}
          } else {
            this.$toast(res?.JsonData?.msg || '解锁失败')
          }
        })
      },
  
      handleSelectionChange(val) {
        this.ids = []
        this.users = []
        this.ids = val.map(v => {
          return v.id
        })
        this.users = val.map(v => {
          return v.username
        })
        // this.enable === 0 ? this.showDel = false : this.showDel = true
      },
      cancelAll() {
        this.showUnAll = false
        // this.unData = {}
      },
      confirmAll() {
        if (this.ids.length <= 0) return this.$toast('请选择用户')
        const sendStr = {
          router: 'unlockLockAccount',
          JsonData: {
            opt_id: this.$Global.optioner.Id,
            opt_name: this.$Global.optioner.UserName,
            proxyname: this.isSub ? this.subInfo.name : '',
            token: this.token,
            ids: JSON.stringify(this.ids),
            users: JSON.stringify(this.users),
            type: 'all'
          }
        }
        this.$pomelo.sendcb(sendStr, res => {
          if (res?.JsonData?.result === 'ok') {
            this.$toast('解锁成功')
            this.getLockAccount()
            this.getLCount()
            this.showUnAll = false
            // this.unData = {}
          } else {
            this.$toast(res?.JsonData?.msg || '解锁失败')
          }
        })
      },
      getLCount() {
        const sendStr = {
          router: 'getLockAccountRealtime',
          JsonData: {
            opt_id: this.$Global.optioner.Id
          }
        }
        this.$pomelo.sendcb(sendStr, res => {
          // console.log('lock account ', res)
          if (res?.JsonData?.result === 'ok') {
            this.$store.commit('ht/setLCount', res?.JsonData?.count)
          } else {
            this.$store.commit('ht/setLCount', 0)
          }
        })
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
  
  <style scoped>
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: darkgray;
    cursor: pointer;
    user-select: none;
  }
  </style>
  