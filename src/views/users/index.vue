<template>
    <div class="w-full h-full relative pb-10">
       <van-tabs v-model="activeName" @click="tabClick" color="#4e6c50" sticky>
        <van-tab title="用户管理" name="a" >
          <section class="w-full relative px-3 py-2">
            <div class="flex items-center space-x-1 ">
              <div class="flex items-center w-full relative h-10 rounded-md bg-[#dddddd] px-5">
                  <div
                  class="border-none w-full h-full text-base flex justify-center items-center relative"
                  >
                  <input
                      v-model.trim="input3"
                      type="text"
                      maxlength="18"
                      min="11"
                      minlength="11"
                      placeholder="请输入账号"
                      class="input-name text-[#524d4d] bg-transparent placeholder:tracking-wider px-3 border-none outline-none focus:outline-none focus:border-none w-full h-full"
                  />
                  </div>
              </div>
             <van-button @click="doSearchUser" class="w-20 h-10 rounded bg-[#4e6c50] text-white">查询</van-button>
           </div>

         <div class=" py-2 space-y-2 ">
          <van-button icon="replay" v-if="showAgent" @click="refreshThisPage(oneUser)" class=" w-full h-10 rounded bg-[#4e6c50] text-white">
            刷新本页
          </van-button>
          <van-button icon="replay" v-if="!showAgent"  @click="refreshThisPlayerPage(oneUser)" class=" w-full h-10 rounded bg-[#4e6c50] text-white">
            刷新本页
          </van-button>
          <van-button   v-if="showAgent" @click="toHisPlayer(relation[relation.length-1])" class=" w-full h-10 rounded bg-[#4e6c50] text-white">
            点击查看  {{ relation[relation.length-1] }} 账号的直属会员
          </van-button>
          <van-button v-if="!showAgent"  @click="toHisAgent(relation[relation.length-1])" class=" w-full h-10 rounded bg-[#4e6c50] text-white">
            点击查看  {{ relation[relation.length-1] }} 账号的直属代理
          </van-button>
         </div>

          <div class="py-1 px-3 flex flex-wrap items-center space-x-1">
            <span class=" tracking-wide font-bold">当前位置</span>
            <div class=" flex items-center space-x-1" v-for="i in relation" :key="i" @click="relationBtnClick(i)">
              <span>{{ i }}</span>
              <span>》</span>
            </div>
              <div class="flex py-2 space-x-2">
                <van-button v-if="isMe === relation[relation.length - 1]" @click="handleAddMyMember('agent')"  class="  h-8 rounded bg-[#4e6c50] text-white">
              添加代理
          </van-button>
          <van-button v-if="isMe === relation[relation.length - 1]" @click="handleAddMyMember('player')" class="  h-8 rounded bg-[#4e6c50] text-white">
            添加会员
          </van-button>
          <van-button v-if="isMe !== relation[relation.length - 1]" @click="addAgent(oneUser, 'agent')" class="  h-8 rounded bg-[#4e6c50] text-white">
            添加代理

          </van-button>
          <van-button v-if="isMe !== relation[relation.length - 1]" @click="addAgent(oneUser, 'player')" class="  h-8 rounded bg-[#4e6c50] text-white">
            添加会员
          </van-button>
              </div>
          </div>

          <div class="py-2">
            <div class="relative overflow-x-auto shadow-md sm:rounded-lg py-2 ">
    <table ref="ListTable" class="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 ">
            <tr>

                <th  scope="col" class="px-6 py-3 whitespace-nowrap">
                  操作项目
                </th>
                <th  v-if="$Global.optioner.UserName === 'admin' && showTable.Id" scope="col" class="px-6 py-3 whitespace-nowrap">
                    ID
                </th>
                <th  scope="col" class="px-6 py-3 whitespace-nowrap">
                  代理账号
                </th>
                <th  scope="col" class="px-6 py-3 whitespace-nowrap">
                  昵称
                </th>
                <th v-if="showTable.zcb" scope="col" class="px-6 py-3 whitespace-nowrap">
                    占成
                </th>
                <th v-if="showTable.isPf" scope="col" class="px-6 py-3 whitespace-nowrap">
                    配分
                </th>
                <th v-if="showTable.gx" scope="col" class="px-6 py-3 whitespace-nowrap">
                  账号关系
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
                <th v-if="showTable.group_ye"  scope="col" class="px-6 py-3 whitespace-nowrap">
                    群组余额
                </th>
                <th v-if="showTable.win_lose" scope="col" class="px-6 py-3 whitespace-nowrap">
                    今日输赢
                </th>
                <th  v-if="showTable.direct_user" scope="col" class="px-6 py-3 whitespace-nowrap">
                    直属数量
                </th>
                <th    v-if="showTable.xmType" scope="col" class="px-6 py-3 whitespace-nowrap">
                    洗码类型
                </th>
                <!-- <th   v-if="!isAgent" scope="col" class="px-6 py-3 whitespace-nowrap">
                    显示洗码
                </th> -->
                <th   v-if="showTable.topup_auth" scope="col" class="px-6 py-3 whitespace-nowrap">
                    充值
                </th>
                <th    v-if="showTable.auto_wash" scope="col" class="px-6 py-3 whitespace-nowrap">
                    自动结算
                </th>
                <th     v-if="arrJxb[4] === '1'" scope="col" class="px-6 py-3 whitespace-nowrap">
                    状态
                </th>
            </tr>
        </thead>
        <tbody >
            <tr v-for="(row,index) in [oneUser]" :key="index" class=" border-b border-slate-600   bg-gray-800 ">

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
                <td v-if="$Global.optioner.UserName === 'admin' && showTable.Id" class="px-6 py-4 whitespace-nowrap">
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
                    {{ isMe !== relation[relation.length - 1] ? (row.isPf ? '是' : '否') : ($Global.optioner.isPf ? '是' : '否') }}

                </td>
                <td  v-if="showTable.gx" class="px-6 py-4 whitespace-nowrap">
                        <span >{{ row.gx }}</span>
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
                       代:{{ row.direct_user.a_count || 0 }} 会:{{ row.direct_user.p_count || 0 }}
                       </span>

                </td>
                <td   v-if="showTable.xmType" class="px-6 py-4 whitespace-nowrap">
                    <span v-if="row.xm_type === 0"><span style="color: #2196F3">双边</span>{{ row.xmb_d }} %
                    </span>
                  <span v-else><span style="color: #FF9800">单边</span>{{ row.xmb_s }} %</span>

                </td>
                <td v-if="showTable.topup_auth" class="px-6 py-4 whitespace-nowrap">
                    <div style="cursor: pointer;">
                    <font v-if="row.topup_auth " @click="changeTopupAuth(row,1)"><span  style="color: #2196F3; cursor: pointer;" >是</span></font>
                   <font v-else @click="changeTopupAuth(row,2)"><span style="color: #FF9800; cursor: pointer;">否</span></font>
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
                <td   v-if="arrJxb[4] === '1'" class="px-6 py-4 whitespace-nowrap">
                    <div>
                        <van-switch size="20" v-model="row.sEnable"  :active-value="1"   :inactive-value="0" @change="changeSwitch(row)" />
                   </div>
                </td>

            </tr>
        </tbody>
    </table>
     </div>
          </div>
          
          <section v-if="showAgent" class="relative">
            <div class="flex items-center ">
              <span class="text-red-500">【{{ relation[relation.length - 1] }}】</span>
              <span>的下级 “代理” 列表</span>
            </div>
          </section>
          <section v-if="!showAgent" class="relative">
            <div class="flex items-center ">
              <span class="text-red-500">【{{ relation[relation.length - 1] }}】</span>
              <span>的下级 “代理” 列表</span>
            </div>
          </section>

          <div v-if="showAgent" class="py-2">
            <div class="relative overflow-x-auto shadow-md sm:rounded-lg py-2 ">
    <table ref="ListTable" class="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 ">
            <tr>

                <th  scope="col" class="px-6 py-3 whitespace-nowrap">
                  操作项目
                </th>
                <th  v-if="$Global.optioner.UserName === 'admin' && showTable.Id" scope="col" class="px-6 py-3 whitespace-nowrap">
                    ID
                </th>
                <th  scope="col" class="px-6 py-3 whitespace-nowrap">
                  代理账号
                </th>
                <th  scope="col" class="px-6 py-3 whitespace-nowrap">
                  昵称
                </th>
                <th v-if="showTable.zcb" scope="col" class="px-6 py-3 whitespace-nowrap">
                    占成
                </th>
                <th v-if="showTable.isPf" scope="col" class="px-6 py-3 whitespace-nowrap">
                    配分
                </th>
                <th v-if="showTable.gx" scope="col" class="px-6 py-3 whitespace-nowrap">
                  账号关系
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
                <th v-if="showTable.group_ye"  scope="col" class="px-6 py-3 whitespace-nowrap">
                    群组余额
                </th>
                <th v-if="showTable.win_lose" scope="col" class="px-6 py-3 whitespace-nowrap">
                    今日输赢
                </th>
                <th  v-if="showTable.direct_user" scope="col" class="px-6 py-3 whitespace-nowrap">
                    直属数量
                </th>
                <th    v-if="showTable.xmType" scope="col" class="px-6 py-3 whitespace-nowrap">
                    洗码类型
                </th>
                <!-- <th   v-if="!isAgent" scope="col" class="px-6 py-3 whitespace-nowrap">
                    显示洗码
                </th> -->
                <th   v-if="showTable.topup_auth" scope="col" class="px-6 py-3 whitespace-nowrap">
                    充值
                </th>
                <th    v-if="showTable.auto_wash" scope="col" class="px-6 py-3 whitespace-nowrap">
                    自动结算
                </th>
                <th     v-if="arrJxb[4] === '1'" scope="col" class="px-6 py-3 whitespace-nowrap">
                    状态
                </th>
            </tr>
        </thead>
        <tbody >
            <tr v-for="(userdata,index) in userList.tableData" :key="index" class=" border-b border-slate-600   bg-gray-800 ">

                <td class="px-6 py-4 whitespace-nowrap">
                   <div>
                    <span>
                        <van-button
                        v-if="arrJxb[7] === '1'"
                        type="primary"
                        :disabled="userdata.sEnable === '禁用' ? true : false"
                        plain
                        size="mini"
                        @click="testPFUpDown(userdata, 'shang')"
                        >上分</van-button>
                        <van-button
                        v-if="arrJxb[7] === '1'"
                        type="danger"
                        :disabled="userdata.sEnable === '禁用' ? true : false"
                        plain
                        size="mini"
                        @click="testPFUpDown(userdata, 'xia')"
                        >下分</van-button>
                    </span>
                    <van-button
                    v-if="arrJxb[3] === '1' && isMe !== userdata.agentAccount"
                        plain
                        size="mini"
                        :disabled="userdata.sEnable === '禁用' ? true : false"
                        type="warning"
                        style=""
                        @click="handleAgentSetup(userdata)"
                    >修改</van-button>
                    <van-button @click="openShow_More_UserList(userdata)"
                      icon="arrow-down"
                        size="mini"
                        type="warning"
                        style=""
                       
                    >修改</van-button>
                        
                   </div>
                </td>
                <td v-if="$Global.optioner.UserName === 'admin' && showTable.Id" class="px-6 py-4 whitespace-nowrap">
                    {{ userdata.Id }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                <span @click="cellClick(userdata.agentAccount, userdata.Id)"  style="font-size: 16px;"> {{ userdata.agentAccount }}</span>
                </td>

                <td class="px-6 py-4 whitespace-nowrap">
                  {{ userdata.name }}
                </td>
                <td  v-if="showTable.zcb" class="px-6 py-4 whitespace-nowrap">
                  {{ userdata.zcb }} %
                </td>
                <td  v-if="showTable.isPf " class="px-6 py-4 whitespace-nowrap">
                    {{ userdata.isPf ? '是' : '否' }}

                </td>
                <td  v-if="showTable.gx" class="px-6 py-4 whitespace-nowrap">
                        <span >{{ userdata.gx }}</span>
                </td>
                <td   class="px-6 py-4 whitespace-nowrap">
                        <span >{{ userdata.memo }}</span>
                </td>
                <td   class="px-6 py-4 whitespace-nowrap">
                    <span style="color: #FF9800;">    {{ userdata.aBalance | toThousandFilter }}</span>
                </td>
                <td v-if="showTable.xmb"  class="px-6 py-4 whitespace-nowrap">
                    <span >   {{ userdata.needXmf | toThousandFilter }}</span>
                </td>
                <td  v-if="showTable.group_ye" class="px-6 py-4 whitespace-nowrap">
                    <span > {{ fiexeTwo(userdata.group_ye || 0) | toThousandFilter }}</span>
                </td>
                <td  v-if="showTable.win_lose" class="px-6 py-4 whitespace-nowrap">
                    <span :class="userdata.win_lose >= 0 ? 'text-blue-500' : 'text-red-500'">{{ fiexeTwo(userdata.win_lose || 0) |
                 toThousandFilter }}</span>
                </td>
                <td   v-if="showTable.direct_user" class="px-6 py-4 whitespace-nowrap">
                    <span style="font-size: 12px">
                       代:{{ userdata.direct_user.a_count || 0 }} 会:{{ userdata.direct_user.p_count || 0 }}
                       </span>

                </td>
                <td   v-if="showTable.xmType" class="px-6 py-4 whitespace-nowrap">
                    <span v-if="userdata.xm_type === 0"><span style="color: #2196F3">双边</span>{{ userdata.xmb.split('/')[1] }} %
                    </span>
                  <span v-else><span style="color: #FF9800">单边</span>{{ userdata.xmb.split('/')[0]  }} %</span>

                </td>
                <td v-if="showTable.topup_auth" class="px-6 py-4 whitespace-nowrap">
                    <div style="cursor: pointer;">
                    <font v-if="userdata.topup_auth " @click="changeTopupAuth(userdata,1)"><span  style="color: #2196F3; cursor: pointer;" >是</span></font>
                   <font v-else @click="changeTopupAuth(userdata,2)"><span style="color: #FF9800; cursor: pointer;">否</span></font>
                  </div>
                </td>

                <td  v-if="showTable.auto_wash" class="px-6 py-4 whitespace-nowrap">
                    <div style="cursor: pointer;">
                        <span v-if="userdata.autoWash === 1">是</span>
                            <span v-else style="color:lightgray">否</span>
                            <span v-if="userdata.autoWash === 1" style="color:gray">
                                {{ userdata.washType === 1 ? '日结' : userdata.washType === 2 ? '周结' :
                                userdata.washType === 3 ? '月结' : '否' }}
                            </span>
                  </div>
                </td>
                <td   v-if="arrJxb[4] === '1'" class="px-6 py-4 whitespace-nowrap">
                    <div>
                        <van-switch size="20" v-model="userdata.sEnable"  :active-value="1"   :inactive-value="0" @change="changeSwitch(userdata)" />
                   </div>
                </td>

            </tr>
        </tbody>
    </table>
     </div>
          </div>
         
          <div v-if="!showAgent" class="">
            <player-list ref="player" :show-relation="isShowRelationship" :show-table="showTable" @playerAction="playerAction">
           </player-list>
          </div>
          
          </section>
        </van-tab>

        <van-tab title="子账号列表" name="d"></van-tab>
       </van-tabs> 
 
       <AddAMMe v-if="isMe === relation[relation.length - 1]" ref="addamme" :action-type="actionType" @_AddMyMemberOK_="AddMyMemberOK" />
       <AddAM ref="addam" :am-data="amData" :action-type="actionType" @userAction="userAction" />
       <PfUpDown ref="pfupdown" :pf-up-down-data="pfupDownData" @userAction="userAction" />
       <PfUpDownXia ref="pfupdownxia" :pf-up-down-data-xia="pfupDownDataXia" @userAction="userAction" />
       <SetUp ref="setup" :setup-data="setupData" @userAction="userAction" @editPFEmit="editPFEmit" />
       <XM ref="xm" :xm-data="xmData" @xmSuccess="xmSuccess" />
       <RemoveXM ref="rxm" :rxm-data="rxmData" @xmSuccess="xmSuccess" />
       <EditB ref="EditAccountBRef" :del-data="delData" @delEmit="delEmit" />
       <Zero ref="ZeroRef" :zero-data="zeroData" @zeroEmit="zeroEmit" />
       <AuthPermission ref="auths" :auth-data="authData" />
       <GAuth ref="gauhtRef" :gauth-data="gauthData" @gauthEmit="gauthEmit" />

 

       <van-action-sheet v-if="row_data" v-model="showMoreBtn" title="修改" style="height: 30%;">
        <div class="relative py-5 px-3">
      
            <div class="flex items-center space-x-2 mt-2">
            <van-button  v-if="isMe !== relation[relation.length - 1] && arrJxb[15] === '1'" :disabled="xm_disable || row_data.sEnable === '禁用' ? true : false" @click="handleMoreAction(0, oneUser)"  class=" flex-1 h-8 rounded bg-[#4e6c50] text-white"> 洗码结算 </van-button>
            <van-button :disabled="row_data.sEnable === '禁用' ? true : false"  v-if="arrJxb[13] === '1' && isMe !== relation[relation.length - 1]" @click="handleLimitSetup(oneUser)"  class=" flex-1 h-8 rounded bg-[#4e6c50] text-white"> 权限 </van-button>
            <van-button  v-if="relation.length > 1" @click="handleAgentKick(oneUser)" class=" flex-1 h-8 rounded bg-[#4e6c50] text-white"> 踢出 </van-button>
        </div>
            <div class="flex items-center space-x-2 mt-2 whitespace-nowrap">
            <van-button  @click="handleMoreAction(1, oneUser)"  class=" flex-1 h-8 rounded bg-[#4e6c50] text-white"> 登录记录 </van-button>
            <van-button  @click="handleMoreAction(9, oneUser)"  class=" flex-1 h-8 rounded bg-[#4e6c50] text-white"> 洗码结算记录 </van-button>
            <van-button  @click="handleMoreAction(2, oneUser)"  class=" flex-1 h-8 rounded bg-[#4e6c50] text-white"> 上下分记录 </van-button>
        </div>
            <div class="flex items-center space-x-2 mt-2 whitespace-nowrap">
            <van-button  @click="handleMoreAction(3, oneUser)"  class=" flex-1 h-8 rounded bg-[#4e6c50] text-white"> 操作上下分记录 </van-button>
            <van-button  @click="handleMoreAction(4, oneUser)"  class=" flex-1 h-8 rounded bg-[#4e6c50] text-white"> 账号变更记录 </van-button>
            <van-button  @click="handleMoreAction(5, oneUser)"  class=" flex-1 h-8 rounded bg-[#4e6c50] text-white"> 操作变更记录 </van-button>
        </div>
            <div class="flex items-center space-x-2 mt-2">
            <van-button  @click="handleMoreAction(12, oneUser)"  class=" flex-1 h-8 rounded bg-[#4e6c50] text-white"> 总报表 </van-button>
            <van-button v-if="isMe !== row_data.agentAccount && row_data.securityLevel == 1"  @click="handelRemoveGAuth(row_data)"  class=" flex-1 h-8 rounded bg-[#4e6c50] text-white"> 账号变更记录 </van-button>
            <van-button v-if="isMe !== row_data.agentAccount && isMe === 'admin' && row_data.aBalance > 0"  @click="handelResetToZero(row_data)"  class=" flex-1 h-8 rounded bg-[#4e6c50] text-white"> 操作变更记录 </van-button>
        </div>
            <div class="flex items-center space-x-2 mt-2">
            <van-button v-if="isMe !== row_data.agentAccount && isMe === 'admin'"  @click="handleRemoveXM(row_data)"  class=" flex-1 h-8 rounded bg-[#4e6c50] text-white"> 洗码清零 </van-button>
        </div>
        </div>
        </van-action-sheet>
       <van-action-sheet v-if="use_row_data" v-model="showMoreUserBtn" title="修改" style="height: 30%;">
        <div class="relative py-5 px-3">
      
            <div class="flex items-center space-x-2 mt-2">
            <van-button  v-if="arrJxb[15] === '1'" :disabled="use_row_data.sEnable === '禁用' ? true : false" @click="handleMoreAction(0, use_row_data,'')"  class=" flex-1 h-8 rounded bg-[#4e6c50] text-white"> 洗码结算 </van-button>
            <van-button v-if="arrJxb[13] === '1' && isMe !== use_row_data.agentAccount"  :disabled="use_row_data.sEnable === '禁用' ? true : false" @click="handleMoreAction(7, use_row_data, '')"  class=" flex-1 h-8 rounded bg-[#4e6c50] text-white"> 权限 </van-button>
            <van-button  v-if="arrJxb[3] === '1' && isMe !== use_row_data.agentAccount" @click="handleAgentKick(use_row_data)" class=" flex-1 h-8 rounded bg-[#4e6c50] text-white"> 踢出 </van-button>
        </div>
            <div class="flex items-center space-x-2 mt-2 whitespace-nowrap">
            <van-button v-if="isMe !== use_row_data.agentAccount" @click="handleEditAccountB(use_row_data)"  class=" flex-1 h-8 rounded bg-[#4e6c50] text-white"> 删除 </van-button>
            <van-button  @click="handleMoreAction(1, use_row_data, '')"  class=" flex-1 h-8 rounded bg-[#4e6c50] text-white"> 登录记录 </van-button>
            <van-button  @click="handleMoreAction(9, use_row_data, '')"  class=" flex-1 h-8 rounded bg-[#4e6c50] text-white"> 洗码结算记录 </van-button>
        </div>
            <div class="flex items-center space-x-2 mt-2 whitespace-nowrap">
            <van-button @click="handleMoreAction(2, use_row_data, '')"  class=" flex-1 h-8 rounded bg-[#4e6c50] text-white"> 上下分记录 </van-button>
            <van-button  @click="handleMoreAction(3, use_row_data,'')"  class=" flex-1 h-8 rounded bg-[#4e6c50] text-white"> 操作上下分记录 </van-button>
            <van-button  @click="handleMoreAction(4, use_row_data,'')"  class=" flex-1 h-8 rounded bg-[#4e6c50] text-white"> 账号变更记录 </van-button>
        </div>
            <div class="flex items-center space-x-2 mt-2">
            <van-button  @click="handleMoreAction(5, use_row_data,'')"  class=" flex-1 h-8 rounded bg-[#4e6c50] text-white"> 操作变更记录 </van-button>
            <van-button @click="handleMoreAction(12, use_row_data,'')"  class=" flex-1 h-8 rounded bg-[#4e6c50] text-white"> 总报表 </van-button>
            <van-button v-if="isMe !== use_row_data.agentAccount && use_row_data.securityLevel == 1" @click="handelRemoveGAuth(use_row_data)"  class=" flex-1 h-8 rounded bg-[#4e6c50] text-white"> 移除验证登录 </van-button>
        </div>
            <div class="flex items-center space-x-2 mt-2">
            <van-button v-if="isMe !== use_row_data.agentAccount && isMe === 'admin' && parseFloat(use_row_data.aBalance) > 0"  @click="handelResetToZero(use_row_data)"  class=" flex-1 h-8 rounded bg-[#4e6c50] text-white"> 账号清零 </van-button>
            <van-button v-if="isMe !== use_row_data.agentAccount"  @click="handleRemoveXM(use_row_data)"  class=" flex-1 h-8 rounded bg-[#4e6c50] text-white"> 洗码清零 </van-button>
        </div>
        </div>
        </van-action-sheet>

    </div>
</template>

<script>
/* eslint-disable */
import { mapState, mapGetters } from 'vuex'

import PfUpDown from './component/pf-up-down-hj.vue'
import PfUpDownXia from './component/pf-up-down-hj-xia.vue'
 import SetUp from './component/set-up.vue'
import XM from './component/xm.vue'
 import RemoveXM from './component/remove-xm.vue'
 import GAuth from './component/remove-gauth.vue'
import AddAM from './component/add-my-agent-member.vue'
 import EditB from './component/delete.vue'
 import Zero from './component/to-zero.vue'
import AddAMMe from './component/add-my-agent-member.vue'
 import AuthPermission from '@/components/Auth-Permission.vue'
import $ws from '@/api/ws2'
import PlayerList from '../member-list/body.vue'

export default {
  name: 'UsersListHJ',
  components: {
    AddAMMe,
    AddAM,
     PfUpDown,
     PfUpDownXia,
     SetUp,
     AuthPermission,
     XM,
     RemoveXM,
     EditB,
     GAuth,
     Zero,
     PlayerList
  },
  data() {
    return {
      activeName:'a',
      pageSize: 20,
      currentPage: 1,
      loading: false,
      loadingone: false,
      xm_disable: false,
      isMe: this.$Global.optioner.UserName,
      arrJxb: this.$Global.optioner.arrJxb,
      showAgent: true,
      form: {
        account: '',
        nikename: ''
      },
      showTable: {
        Id: false,
        gx: true,
        zcb: true,
        xmb: true,
        xmType: true,
        isPf: true,
        topup_auth: false,
        auto_wash: true,
        createDate: false,
        lastLoginTime: false,
        ip: false,
        group_ye: true,
        direct_user: true,
        win_lose: true
      },
      select: '1',
      input3: '',
      // oneUser: {},
      upDownData: {
        relation: {}
      },
      pfupDownData: {
        relation: {}
      },
      pfupDownDataXia: {
        relation: {}
      },
      setupData: {},
      authData: {},
      xmData: {},
      rxmData: {},
      delData: {},
      amData: {},
      gauthData: {},
      zeroData: {},
      actionType: '',
      rightClickData: {},

      searchPname: '',
      r_loading: false,
      showRelationship: '隐藏',
      isShowRelationship: true,
      row_data:null,
      showMoreBtn:false,
      showMoreUserBtn:false,
      use_row_data:null
    }
  },
  computed: {
    ...mapState({
      sidebar: state => state.app.sidebar,
      userList: state => state.ht.agentAdminForm,
      oneUser: state => state.ht.userList,
      relation: state => state.ht.relations,
      myCenter: state => state.ht.myCenterForm,
      newTreeData: state => state.ht.newTreeData,
      isSub: state => state.user.isSubAccount,
      subInfo: state => state.user.subInfo,
      device: state => state.app.device
    }),
    ...mapGetters(['token', 'AGL_ISLOADING'])
  },
  watch: {
    AGL_ISLOADING: function(val) {
      if (val === 1) this.loading = false
    }
  },
  created() {
    const routerParams = this.$route.query
    if (routerParams.name !== undefined && routerParams.type !== 'player') {
      this.getOneUser(routerParams.name)
      this.doGetUser(routerParams.name)
    } else if (routerParams.name !== undefined && routerParams.upper && routerParams.upper !== undefined && routerParams.type === 'player') {
      this.showAgent = false
      this.$nextTick(() => {
        this.$refs.player.doFindMember(routerParams.name)
      })
    } else {
      if (this.relation === undefined || this.relation === null || this.relation.length === 0) {
        this.$store.commit('ht/setRelations', [this.$Global.optioner.UserName])
        this.getOwnInfo()
        this.doGetUser(this.relation[this.relation.length - 1])
      } else {
        this.getOneUser(this.relation[this.relation.length - 1])
        this.doGetUser(this.relation[this.relation.length - 1])
      }
    }
  },
  mounted() {
    // const routerParams = this.$route.query
    // if (routerParams.name !== undefined && routerParams.upper && routerParams.upper !== undefined && routerParams.type === 'player') {
    //   console.log('mounted ')
    //   this.getOneUser(routerParams.upper)
    //   setTimeout(() => {
    //     this.refreshThisPlayerPage()
    //   }, 500)
    // }
    let cols = window.localStorage.getItem('showCols')
    if (cols !== null && cols !== '' && cols !== undefined) {
      cols = JSON.parse(cols)
      this.showTable = cols
    }
  },
  activated() {
    var routerParams = this.$route.params
    if (routerParams.name !== undefined) {
      let name = routerParams.name
      this.input3 = name
      this.doSearchUser()
    }
  },
  methods: {
    openShow_More(data){
        console.log(data,"row_data ************")
        this.row_data = data
        this.showMoreBtn = true
    },
    openShow_More_UserList(data){
        console.log(data,"row_data ************")
        this.use_row_data = data
        this.showMoreUserBtn = true
    },
    fiexeTwo(num) {
      if (num) return Number((num).toFixed(0))
      return num
    },
    handelRemoveGAuth(row) {
      if (this.$Global.gxLength > 4) return this.$toast('您没有改权限')
      this.gauthData = JSON.parse(JSON.stringify(row))
      this.$nextTick(() => {
        this.$refs.gauhtRef.dialogFormVisible = true
      })
    },
    handelResetToZero(row) {
      this.zeroData = JSON.parse(JSON.stringify(row))
      this.$nextTick(() => {
        this.$refs.ZeroRef.dialogFormVisible = true
      })
    },
    zeroEmit(v) {
      if (val) {
        if (this.showAgent) {
          this.refreshThisPage()
        } else {
          this.refreshThisPlayerPage()
        }
      }
    },
    gauthEmit(v) {
      // console.log(v)
    },
    handleEditAccountB(row) {
      this.delData = {}
      if (!row) return
      this.delData = JSON.parse(JSON.stringify(row))
      this.$nextTick(() => {
        this.$refs.EditAccountBRef.dialogFormVisible = true
      })
    },
    showTableClick() {
      // console.log('tttt ', this.showTable)
      window.localStorage.setItem('showCols', JSON.stringify(this.showTable))
      this.$nextTick(() => {
        this.$refs.singleTable.doLayout()
      })
    },
    showTableChange() {
      window.localStorage.setItem('showCols', JSON.stringify(this.showTable))
    },
    copyAccount(row) {
      /* Copy the text inside the text field */
      // navigator.clipboard.writeText(value)copier_account
      this.$toast('复制成功')
      var data = JSON.parse(JSON.stringify(row))
      var oInput = document.createElement('input')
      oInput.value = data.agentAccount
      document.body.appendChild(oInput)
      oInput.select()
      document.execCommand('Copy')
      oInput.className = 'oInput'
      oInput.style.display = 'none'
      // this.$message({
      //   type: 'success',
      //   message: this.$t('message.copy_success')
      // })
    },
    testPeiFen() {
      const sendStr = {
        router: 'changeScoreForPay',
        JsonData: {
          userId: 62475, // 62472,
          deposit: 300,
          opt: 'addScore'
        }
      }
      this.$pomelo.sendcb(sendStr, res => {
        // console.log('配分 。。。 ', res)
      })
    },
    testPeiFen_() {
      const sendStr = {
        router: 'changeScoreForPay',
        JsonData: {
          userId: 62475, // 62472,
          deposit: 300,
          opt: 'desScore'
        }
      }
      this.$pomelo.sendcb(sendStr, res => {
        // console.log('配分 。。。 ', res)
      })
    },
    testPFUpDown(row, type) {
      if (this.$Global.optioner.arrJxb[7] === '0') return this.$toast(`抱歉! 您没有该权限! 请联系上级!`)
      // const sendStr = {
      //   router: 'getOptScoreRecord',
      //   JsonData: { name: row.agentAccount, Id: this.$Global.optioner.Id }
      // }
      // this.$pomelo.send(sendStr)
      const sendStr1 = {
        router: 'getDesScoreAgent',
        JsonData: {
          Id: row.Id, // 加减分对象Id
          optId: this.$Global.optioner.Id // 操作员Id
        }
      }
      this.$pomelo.sendcb(sendStr1, res => {
        if (res.JsonData.length > 0) {
          this.$nextTick(() => {
            this.pfupDownData = JSON.parse(JSON.stringify(row))
            this.pfupDownData.relation = res.JsonData.map(v => {
              v.pfscore = 0
              return v
            })
            this.pfupDownDataXia = JSON.parse(JSON.stringify(row))
            this.pfupDownDataXia.relation = res.JsonData.map(v => {
              v.pfscore = 0
              return v
            })
            if (type === 'shang') {
              this.$refs.pfupdown.dialogFormVisible = true
            } 
            if (type === 'xia') {
              this.$refs.pfupdownxia.dialogFormVisible = true
            }
            
          })
        } else {
          return this.$toast('操作失败')
        }
      })
    },
    // 自定义菜单的点击事件
    infoClick(index) {
      var menu = document.querySelector('#menu')
      if (menu) menu.style.display = 'none'
    },
    // 右键点击事件
    rightClick(row, column, event) {
      // var menu = document.querySelector('#menu')
      // event.preventDefault()
      // // 获取我们自定义的右键菜单
      // // 根据事件对象中鼠标点击的位置，进行定位
      // const add_width = this.sidebar.opened ? 210 : 45 // sidebar 开启时要得减去多一点
      // menu.style.left = event.clientX - add_width + 'px'
      // menu.style.top = event.clientY + 'px'

      // this.currentRow = row
      const menu = document.querySelector('#menu')
      event.preventDefault()
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
      // 改变自定义菜单的隐藏与显示
      menu.style.display = 'block'
      this.rightClickData = JSON.parse(JSON.stringify(row))
      // 获取当前右键点击table下标
      this.userList.tableData.forEach((item, index) => {
        if (item.bugid === row.id) {
          // 这里判断相等的条件可以自己改为该行数据的唯一键
          this.currentRowIndex = index
          return false
        }
      })
      this.setCurrent(row)
    },
    setCurrent(row) {
      // console.log('高亮' + row)
      this.$refs.singleTable.setCurrentRow(row)
    },
    // 限制输入特殊字符
    btKeyUp(e) {
      e.target.value = e.target.value.replace(/[`~!#$%^&*()\-+=<>?:'{}|,.\/;'\\[\]·~！#￥%……&*（）\-+={}|《》？：“”【】、；‘’，。、]/g, '')
    },
    showRelation() {
      if (this.showRelationship === '隐藏') {
        this.showRelationship = '显示'
        this.isShowRelationship = false
        this.showTable.gx = false
      } else {
        this.showRelationship = '隐藏'
        this.isShowRelationship = true
        this.showTable.gx = true
      }
    },
    userAction(e) {
      if (e.name === 'UPDOWN_OK_AGENT' || e.name === 'MODIFY__OK_AGENT' || e.name === 'LIMIT_AUTH_AGENT' || e.name === 'PF_SUCCESS') {
        if (this.showAgent) {
          this.getOneUser(this.relation[this.relation.length - 1])
          this.doGetUser(this.relation[this.relation.length - 1])
        } else {
          if (this.input3.trim() !== '') {
            this.$refs.player.doFindMember(this.input3.trim())
          } else {
            this.$refs.player.reqt({ name: this.relation[this.relation.length - 1], pageSize: this.pageSize, currentPage: this.currentPage })
          }
        }
      } else if (e.name === 'ADD_MEMBER') {
        this.refreshRelations()
        this.getOneUser(this.relation[this.relation.length - 1])
        if (this.showAgent) {
          this.doGetUser(this.relation[this.relation.length - 1])
        } else {
          this.$refs.player.reqt({ name: this.relation[this.relation.length - 1], pageSize: this.pageSize, currentPage: this.currentPage })
        }
      }
    },
    editPFEmit(v) {
      if (v) {
        if (this.showAgent) {
          this.refreshThisPage()
        } else {
          this.refreshThisPlayerPage()
        }
      }
    },
    delEmit(val) {
      if (val) {
        if (this.showAgent) {
          this.refreshThisPage()
        } else {
          this.refreshThisPlayerPage()
        }
      }
    },
    playerAction(e) {
      // console.log('e ', e)
      // if (e.name === 'XM_SUCCESS_PLAYER') {
      // } else {
      // this.getOneUser(this.relation[this.relation.length - 1])
      // console.log('player action in userlist ', e)
      if (e.name == 'PF_SUCCESS' || e.name === 'MODIFY_SUCCESS') {
        this.userAction({name: 'PF_SUCCESS'})
      } else {
        this.refreshThisPlayerPage()
      }
      // }
    },
    refreshThisPage(row) {
      this.getOneUser(this.relation[this.relation.length - 1])
      this.doGetUser(this.relation[this.relation.length - 1])
    },
    refreshThisPlayerPage() {
      this.getOneUser(this.relation[this.relation.length - 1])
      if (this.$route.query.upper && this.$route.query.name && this.$route.query.type) {
        this.$refs.player.doFindMember(this.$route.query.name)
      } else {
        this.$refs.player.reqtRefresh({ name: this.relation[this.relation.length - 1] })
      }
    },
    refreshRelations() {
      this.r_loading = true
      // this.$nextTick(() => {
      //   this.$refs.agentTree.getRelations()
      // })
      this.$store.dispatch('user/getRelations')
      setTimeout(() => {
        this.r_loading = false
      }, 800)
    },
    searchRelatnNew(value) {
      if (value === '') return
      // eslint-disable-next-line
      let re = this.findPatentValue(this.newTreeData, value)
      if (re != null) {
        this.$store.commit('ht/setRelations', re)
      }
    },
    findPatentValue(array, value, valueName = 'name', childrenName = 'children') {
      if (!value || !Array.isArray(array)) return []
      const result = []
      let valid = false
      const seek = (array, value) => {
        let parentValue = ''
        const up = (array, value, lastValue) => {
          array.forEach(v => {
            const val = v[valueName]
            const child = v[childrenName]
            if (val === value) {
              valid = true
              parentValue = lastValue
              return
            }
            if (child && child.length) up(child, value, val)
          })
        }
        up(array, value)
        if (parentValue) {
          result.unshift(parentValue)
          seek(array, parentValue)
        }
      }
      seek(array, value)
      return valid ? [...result, value] : []
    },
    getOwnInfo() {
      const sendStr = {
        router: 'GetOwnInfo',
        JsonData: {
          Id: this.$Global.optioner.Id, // 操作员Id
          name: this.$Global.optioner.UserName, // 上级代理名称
          input3: name.trim() || '', // 查找名称
          nikename: this.form.nikename.trim() || '', // 查找昵称
          token: this.$Global.optioner.token,
          level: this.$Global.optioner.level,
          proxyname: this.isSub ? this.subInfo.name : this.$Global.optioner.UserName
        }
      }
      this.loadingone = true
      // this.$store.state.ht.agentAdminForm.state = 0
      this.$pomelo.sendcb(sendStr, res => {
        // console.log('GetOwnInfo ', res)
        if (res.JsonData.length > 0) {
          var data = res.JsonData[0]
          const oneUser = {}
          oneUser.Id = data.Id
          oneUser.agentAccount = data.name
          oneUser.name = data.nikename
          oneUser.user_type = data.user_type
          oneUser.aBalance = Number((data.ye).toFixed(0))
          oneUser.level = data.level
          // eslint-disable-next-line
          oneUser.topup_auth = data.yj == 1 ? true : false
          oneUser.zcb = data.zcb
          oneUser.xmb_s = data.xmb_s
          oneUser.xmb_d = data.xmb_d
          oneUser.xmb = data.xmb_s + '/' + data.xmb_d
          oneUser.xmType = data.xmType === 0 || data.xmType === '0' ? '双边' : '单边'
          oneUser.withdrawPw = data.withdrawPw
          oneUser.sEnable = data.sEnable === 1 ? '启用' : '禁用'
          oneUser.createDate = data.createDate
          oneUser.lastLoginTime = data.lastLoginTime
          oneUser.ip = data.loginIp
          oneUser.jxb = data.jxb // 权限表
          oneUser.reference_name = data.reference_name
          oneUser.onLine = data.onLineState === 1 ? '在线' : '离线'
          oneUser.memo = data.memo
          oneUser.auto_wash = data.autoWash
          oneUser.wash_type = data.washType
          oneUser.securityLevel = data.securityLevel
          if (data.needxm) {
            oneUser.needXmf = data.xmType !== 1 ? (data.needxm?.xml_d * data.xmb_d / 100 + data.preXmLeft || 0).toFixed(0) : (data.needxm?.xml_s * data.xmb_s / 100 + data.preXmLeft || 0).toFixed(0)
          } else {
            oneUser.needXmf = data.preXmLeft || 0
          }
          oneUser.group_ye = data.group_ye
          oneUser.win_lose = data.win_lose
          oneUser.direct_user = data.direct_user
          if (data.xh) {
            oneUser.xh_min = data.xh.split('-')[0]
            oneUser.xh_max = data.xh.split('-')[1]
          } else {
            oneUser.xh_min = 20
            oneUser.xh_max = 50000
          }
          oneUser.gx = this.$ws.mapAgentName(data.gx)
          oneUser.downloadUrl = data.downloadUrl || ''
          oneUser.androidAddr = data.androidAddr || ''
          oneUser.iosAddr = data.iosAddr || ''
          oneUser.customerAddr = data.customerAddr || ''
          oneUser.webAddr = data.webAddr || ''
          oneUser.gameAddr = data.gameAddr || ''
          // oneUser.isPf = this.checkIsPf(data.jxb)
          oneUser.isPf = data.pf === 1 ? true : false
          oneUser.isTop = this.checkIsTop(data.gx)

          this.$store.commit('ht/setUserList', oneUser)
        }
        this.loadingone = false
      })
      // this.$nextTick(() => {
      // this.searchRelatnNew(name)
      // })
    },
    getOneUser(name) {
      const sendStr = {
        router: 'GetUserInfo',
        JsonData: {
          Id: this.$Global.optioner.Id, // 操作员Id
          name: this.$Global.optioner.UserName, // 上级代理名称
          input3: name.trim() || '', // 查找名称
          nikename: this.form.nikename.trim() || '', // 查找昵称
          currentPage: 1,
          pageSize: this.pageSize
        }
      }
      this.loadingone = true
      // console.log("send ", sendStr)
      // this.$store.state.ht.agentAdminForm.state = 0
      this.$pomelo.sendcb(sendStr, res => {
        this.loadingone = false
        // console.log('getOneUser GetUserInfo ', res)
        if (res.JsonData.length > 0) {
          var data = res.JsonData[0]
          const oneUser = {}
          oneUser.Id = data.Id
          oneUser.agentAccount = data.name
          oneUser.name = data.nikename
          oneUser.user_type = data.user_type
          oneUser.aBalance = Number((data.ye).toFixed(0))
          oneUser.level = data.level
          // eslint-disable-next-line
          oneUser.topup_auth = data.yj == 1 ? true : false
          oneUser.zcb = data.zcb
          oneUser.xmb_s = data.xmb_s
          oneUser.xmb_d = data.xmb_d
          oneUser.xmb = data.xmb_s + '/' + data.xmb_d
          oneUser.xmType = data.xmType === 0 || data.xmType === '0' ? '双边' : '单边'
          oneUser.withdrawPw = data.withdrawPw
          oneUser.sEnable = data.sEnable === 1 ? '启用' : '禁用'
          oneUser.createDate = data.createDate
          oneUser.lastLoginTime = data.lastLoginTime
          oneUser.ip = data.loginIp
          oneUser.jxb = data.jxb // 权限表
          oneUser.reference_name = data.reference_name
          oneUser.onLine = data.onLineState === 1 ? '在线' : '离线'
          oneUser.memo = data.memo
          oneUser.auto_wash = data.autoWash
          oneUser.wash_type = data.washType
          oneUser.securityLevel = data.securityLevel
          if (data.needxm) {
            oneUser.needXmf = data.xmType !== 1 ? (data.needxm?.xml_d * data.xmb_d / 100 + data.preXmLeft || 0).toFixed(0) : (data.needxm?.xml_s * data.xmb_s / 100 + data.preXmLeft || 0).toFixed(0)
          } else {
            oneUser.needXmf = data.preXmLeft || 0
          }
          oneUser.group_ye = data.group_ye
          oneUser.win_lose = data.win_lose
          oneUser.direct_user = data.direct_user
          if (data.xh) {
            oneUser.xh_min = data.xh.split('-')[0]
            oneUser.xh_max = data.xh.split('-')[1]
          } else {
            oneUser.xh_min = 20
            oneUser.xh_max = 50000
          }
          oneUser.gx = this.$ws.mapAgentName(data.gx)
          oneUser.downloadUrl = data.downloadUrl || ''
          oneUser.androidAddr = data.androidAddr || ''
          oneUser.iosAddr = data.iosAddr || ''
          oneUser.customerAddr = data.customerAddr || ''
          oneUser.webAddr = data.webAddr || ''
          oneUser.gameAddr = data.gameAddr || ''
          // oneUser.isPf = this.checkIsPf(data.jxb)
          oneUser.isPf = data.pf === 1 ? true : false
          oneUser.isTop = this.checkIsTop(data.gx)

          this.$store.commit('ht/setUserList', oneUser)
        }
      })
      // this.$nextTick(() => {
      this.searchRelatnNew(name)
      // })
    },
    checkIsTop(gx) {
      if (gx === '' || gx === undefined) return null
      // eslint-disable-next-line
      if (gx.split('^').length == 3) {
        return true
      } else {
        return false
      }
    },
    checkIsPf(jxb) {
      let isPf = ''
      if (jxb !== '') {
        isPf = jxb.split(',')[19]
        // eslint-disable-next-line
        if (isPf == 0) {
          return false
        } else {
          return true
        }
      } else {
        return null
      }
    },
    changePfAuth(row, pf) {
      if (!row) return this.$toast('请选择用户')
      let row_ = JSON.parse(JSON.stringify(row))
      const sendStr = {
        router: 'ChangePfAuth',
        JsonData: {
          Id: row_.Id,
          username: row_.agentAccount,
          opt_id: this.$Global.optioner.Id,
          opt_name: this.$Global.optioner.UserName,
          pf: pf,
          proxyname: this.isSub ? this.subInfo.name : ''
        }
      }
      this.$pomelo.sendcb(sendStr, res => {
        if (res?.JsonData?.result === 'ok') {
          this.$toast('修改成功')
          if (this.showAgent) {
            this.refreshThisPage()
          } else {
            this.refreshThisPlayerPage()
          }
        } else {
          this.$toast(res?.JsonData?.msg)
        }
      })
    },
    changeTopupAuth(row,number) {
      
      const row_ = JSON.parse(JSON.stringify(row))

      this.$dialog.confirm({title:`您确定要 ${number == 1 ? '关闭' : '开启'} 该权限吗? `, 
      })
        .then(() => {
          
      const sendStr = {
        router: 'editTopupAuth',
        JsonData: {
          Id: row_.Id,
          name: row_.agentAccount,
          nikename: row_.name || '',
          level: row_.level,
          ip: this.$store.state.ht.ip || '',
          optName: this.$Global.optioner.UserName,
          proxyname: this.isSub ? this.subInfo.name : '',
          topup_auth: row_.topup_auth ? 0 : 1
        }
      }
      this.$pomelo.sendcb(sendStr, res => {
        if (res && res.msg === 'success' && res.router === 'editTopupAuth') {
          this.$toast('修改成功')
          if (row_.level === 2) {
            this.refreshThisPage()
          } else {
            this.refreshThisPlayerPage()
          }
        } else {
          this.$toast('修改失败！')
        }
      })
        })
        .catch(() => { })

    },
    doGetUser(name) {
      if (this.arrJxb[0] !== '1') {
        this.$toast('抱歉! 您没有该权限! 请联系上级!')
        return
      }
      const sendStr = {
        router: 'GetAgentInfo',
        JsonData: {
          name: name.trim(),
          Id: '',
          pageSize: this.pageSize,
          currentPage: this.currentPage
        }
      }
      this.$store.state.ht.agentAdminForm.state = 0
      this.loading = true
      this.$pomelo.send(sendStr)
    },
    doSearchUser() {
      if (this.arrJxb[0] !== '1') {
        this.$toast('抱歉! 您没有该权限! 请联系上级!')
        return
      }
      if (this.input3.trim() === '') return
      if (this.isMe === this.input3.trim()) {
        this.$store.commit('ht/setRelations', [this.$Global.optioner.UserName])
        if (this.showAgent) {
          this.getOneUser(this.isMe)
          this.doGetUser(this.isMe)
        } else {
          this.searchRelatnNew(this.isMe)
          this.$refs.player.reqt({ name: this.isMe, pageSize: this.pageSize, currentPage: this.currentPage })
        }
        return
      }
      this.loading = true
      const sendStr = {
        router: 'FindUserList',
        JsonData: {
          opt_id: this.$Global.optioner.Id,
          opt_name: this.$Global.optioner.UserName,
          input3: this.input3.trim(),
          pageSize: this.pageSize,
          currentPage: this.currentPage
        }
      }
      this.$pomelo.sendcb(sendStr, (res) => {
        this.loading = false
        // console.log('FindUserList ', res)
        // if (res?.totalItem === 0) {
        //   return this.$message.info('查询不到记录')
        // }
        if (!res?.JsonData?.top) {
          return this.$toast('查询不到记录')
        }
        if (res.JsonData?.top) {
          var data = res.JsonData?.top
          this.searchRelatnNew(data.name)
          this.oneUser.Id = data.Id
          this.oneUser.agentAccount = data.name
          this.oneUser.name = data.nikename
          this.oneUser.user_type = data.user_type
          this.oneUser.aBalance = Number((data.ye).toFixed(0))
          this.oneUser.level = data.level
          // eslint-disable-next-line
          this.oneUser.topup_auth = data.yj == 1 ? true : false
          this.oneUser.zcb = data.zcb
          this.oneUser.xmb_s = data.xmb_s
          this.oneUser.xmb_d = data.xmb_d
          this.oneUser.xmb = data.xmb_s + '/' + data.xmb_d
          this.oneUser.xmType = data.xmType === 0 || data.xmType === '0' ? '双边' : '单边'
          this.oneUser.withdrawPw = data.withdrawPw
          this.oneUser.sEnable = data.sEnable === 1 ? '启用' : '禁用'
          this.oneUser.createDate = data.createDate
          this.oneUser.lastLoginTime = data.lastLoginTime
          this.oneUser.ip = data.loginIp
          this.oneUser.jxb = data.jxb // 权限表
          this.oneUser.reference_name = data.reference_name
          this.oneUser.onLine = data.onLineState === 1 ? '在线' : '离线'
          this.oneUser.memo = data.memo
          this.oneUser.auto_wash = data.autoWash
          this.oneUser.wash_type = data.washType
          this.oneUser.securityLevel = data.securityLevel
          if (data.needxm) {
            this.oneUser.needXmf = data.xmType !== 1 ? (data.needxm?.xml_d * data.xmb_d / 100 + data.preXmLeft || 0).toFixed(0) : (data.needxm?.xml_s * data.xmb_s / 100 + data.preXmLeft || 0).toFixed(0)
          } else {
            this.oneUser.needXmf = data.preXmLeft || 0
          }
          this.oneUser.group_ye = data.group_ye
          this.oneUser.win_lose = data.win_lose
          this.oneUser.direct_user = data.direct_user
          if (data.xh) {
            this.oneUser.xh_min = data.xh.split('-')[0]
            this.oneUser.xh_max = data.xh.split('-')[1]
          } else {
            this.oneUser.xh_min = 20
            this.oneUser.xh_max = 50000
          }
          this.oneUser.gx = $ws.mapAgentName(data.gx)
          this.oneUser.downloadUrl = data.downloadUrl || ''
          this.oneUser.androidAddr = data.androidAddr || ''
          this.oneUser.iosAddr = data.iosAddr || ''
          this.oneUser.customerAddr = data.customerAddr || ''
          this.oneUser.webAddr = data.webAddr || ''
          this.oneUser.gameAddr = data.gameAddr || ''
          // this.oneUser.isPf = this.checkIsPf(data.jxb)
          this.oneUser.isPf = data.pf === 1 ? true : false
          this.oneUser.isTop = this.checkIsTop(data.gx)
          // console.log('set one user', this.oneUser)
          this.$store.commit('ht/setUserList', this.oneUser)
        }

        if (res?.JsonData?.is_agent) {
          // console.log('isagent ')
          this.showAgent = true
          const do_data = {
            router: 'GetAgentInfo',
            JsonData: res?.JsonData?.list,
            totalItem: res?.totalItem
          }
          $ws.setAgentAdminForm(do_data)
        } else {
          // console.log('isplayer ')
          this.showAgent = false
          const do_data = {
            router: 'GetMemberInfo',
            JsonData: res?.JsonData?.list,
            totalItem: res?.totalItem
          }
          $ws.setMemberAdminForm(do_data)
        }
      })
    },
    toHisPlayer(name) {
      this.showAgent = false
      this.searchPname = name
      this.$nextTick(() => {
        this.$refs.player.reqt({ name: name, pageSize: this.pageSize, currentPage: 1 })
      })
    },
    toHisAgent(name) {
      this.showAgent = true
      this.getOneUser(name)
      this.doGetUser(name)
    },
    relationBtnClick(name) {
      this.currentPage = 1
      // this.doSearchUser(name)
      if (name === this.$Global.optioner.UserName) {
        this.$store.commit('ht/setRelations', [this.$Global.optioner.UserName])
        this.getOwnInfo()
      }
      if (this.showAgent) {
        if (name !== this.$Global.optioner.UserName) {
          this.getOneUser(name)
        }
        this.doGetUser(name)
      } else {
        // this.$nextTick(() => {
        if (this.relation[this.relation.length - 1] != name) {
          this.getOneUser(name)
        }
        this.searchRelatnNew(name)
        // })
        this.$refs.player.reqt({ name: name, pageSize: this.pageSize, currentPage: this.currentPage })
      }
    },
    cellClick(name, Id) {
      this.currentPage = 1
      this.searchRelatnNew(name)
      this.getOneUser(name)
      this.doGetUser(name)
    },
    handleAddMyMember(type) {
      // console.log('查看洗码类型 ', index, row, n, m)
      // this.checkSD = this.$Global.optioner.xmType
      // if (m === undefined || m === '' || m === null) {
      //   this.checkSD = row.xmType
      //   if (this.$Global.optioner.arrJxb[6] === '0') {
      //     this.$message.warning(`${this.$t('message.you_do_not_have_this_permission')}`)
      //     return
      //   }
      // }
      // if (m === 1) {
      //   if (this.$Global.optioner.arrJxb[5] === '0') return this.$message.warning(`${this.$t('message.you_do_not_have_this_permission')}`)
      // }
      const sendStr = {
        router: 'GetOptionerInfo',
        JsonData: { name: this.$Global.optioner.UserName }
      }
      this.$pomelo.send(sendStr)

      const sendStr2 = {
        router: 'getReferenceInfo',
        JsonData: { name: this.$Global.optioner.UserName }
      }
      this.$pomelo.sendcb(sendStr2, res => {
        if (res) {
          var data = res.JsonData
          var obj = {}
          obj.ye = data[0].ye
          obj.is_cash = data[0].is_cash
          obj.zcb = data[0].zcb
          obj.xm_type = data[0].xm_type
          obj.xmb_s = data[0].xmb_s
          obj.xmb_d = data[0].xmb_d
          obj.xh_min = data[0].xh_min
          obj.xh_max = data[0].xh_max
          obj.auto_wash = data[0].auto_wash
          obj.topup_auth = data[0].topup_auth
          this.$store.commit('ht/setReferenceInfo', obj)
          this.$nextTick(() => {
          this.actionType = type
            setTimeout(() => {
              this.$refs.addamme.dialogFormVisible = true
            }, 500)
          })
        }
      })

    },
    addAgent(row, type) {
      // console.log('查看洗码类型 ', index, row, n, m)
      // this.checkSD = this.$Global.optioner.xmType
      // if (m === undefined || m === '' || m === null) {
      //   this.checkSD = row.xmType
      //   if (this.$Global.optioner.arrJxb[6] === '0') {
      //     this.$message.warning(`${this.$t('message.you_do_not_have_this_permission')}`)
      //     return
      //   }
      // }
      // if (m === 1) {
      //   if (this.$Global.optioner.arrJxb[5] === '0') return this.$message.warning(`${this.$t('message.you_do_not_have_this_permission')}`)
      // }
      const sendStr = {
        router: 'GetOptionerInfo',
        JsonData: { name: this.$Global.optioner.UserName }
      }
      this.$pomelo.send(sendStr)

      const sendStr2 = {
        router: 'getReferenceInfo',
        JsonData: { name: row.agentAccount }
      }
      this.$pomelo.sendcb(sendStr2, res => {
        if (res) {
          var data = res.JsonData
          var obj = {}
          obj.is_cash = data[0].is_cash
          obj.ye = data[0].ye
          obj.zcb = data[0].zcb
          obj.xm_type = data[0].xm_type
          obj.xmb_s = data[0].xmb_s
          obj.xmb_d = data[0].xmb_d
          obj.xh_min = data[0].xh_min
          obj.xh_max = data[0].xh_max
          obj.auto_wash = data[0].auto_wash
          obj.topup_auth = data[0].topup_auth
          this.$store.commit('ht/setReferenceInfo', obj)
          this.$nextTick(() => {
            this.amData = JSON.parse(JSON.stringify(row))
            this.actionType = type
            setTimeout(() => {
              this.$refs.addam.dialogFormVisible = true
            }, 500)
          })
        }
      })
      
    },
    handleAgentKick(row) {
      const name = row.agentAccount
      const Id = row.Id
      this.$dialog.confirm({
            title: '您确定要踢出' + name + '吗?',
            })
        .then(() => {
          var sendStr = {
            router: 'kickMember',
            JsonData: { Id: Id, name: name, level: 2 }
          }
          this.$pomelo.send(sendStr)
          // console.log('kickAgent: ', sendStr)
        })
        .catch(() => {})
    },
    handleOptScore(row) {
      if (this.$Global.optioner.arrJxb[7] === '0') return this.$toast(`抱歉! 您没有该权限! 请联系上级!`)
      const sendStr = {
        router: 'getOptScoreRecord',
        JsonData: { name: row.agentAccount, Id: this.$Global.optioner.Id }
      }
      this.$pomelo.send(sendStr)
      const sendStr1 = {
        router: 'getDesScoreAgent',
        JsonData: {
          Id: row.Id, // 加减分对象Id
          optId: this.$Global.optioner.Id // 操作员Id
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
          return this.$toast('操作失败')
        }
      })
    },
    handleAgentSetup(row) {
      if (this.$Global.optioner.arrJxb[3] === '0') return this.$toast(`抱歉! 您没有该权限! 请联系上级`)
      const sendStr = {
        router: 'getReferenceInfo',
        JsonData: { name: row.reference_name }
      }
      this.$pomelo.sendcb(sendStr, res => {
        if (res) {
          var data = res.JsonData
          var obj = {}
          obj.is_cashye = data[0].is_cash
          obj.ye = data[0].ye
          obj.zcb = data[0].zcb
          obj.xm_type = data[0].xm_type
          obj.xmb_s = data[0].xmb_s
          obj.xmb_d = data[0].xmb_d
          obj.xh_min = data[0].xh_min
          obj.xh_max = data[0].xh_max
          obj.auto_wash = data[0].auto_wash
          obj.topup_auth = data[0].topup_auth
          this.$store.commit('ht/setReferenceInfo', obj)
          this.$nextTick(() => {
            this.setupData = JSON.parse(JSON.stringify(row))
            setTimeout(() => {
              this.$refs.setup.dialogFormVisible = true
            }, 500)
          })
        }
      })
      
    },
    handleLimitSetup(row) {
      this.$pomelo.send({
        router: 'GetJxb',
        JsonData: {
          reference_name: row.reference_name,
          name: row.agentAccount
        }
      }) // 取上级权限
      setTimeout(() => {
        this.authData = JSON.parse(JSON.stringify(row))
        this.$refs.auths.dialogFormVisible = true
      }, 800)
    },
    handleMoreAction(action, row, type) {
      switch (action) {
        case 0:
          this.handleXM(row)
          break
        case 1:
          // this.goPage('/recordsPage/login-records', { name: row.agentAccount })
          this.goPageParams('LoginRecords', { name: row.agentAccount })
          break
        case 2:
          // this.goPage('/recordsPage/access-records', { name: row.agentAccount })
          this.goPageParams('AccessRecords', { name: row.agentAccount })
          break
        case 3:
          // this.goPage('/recordsPage/access-records', { opt_name: row.agentAccount })
          this.goPageParams('AccessRecords', { opt_name: row.agentAccount })
          break
        case 4:
          // this.goPage('/recordsPage/account-change-records', { name: row.agentAccount })
          this.goPageParams('AccountChangeRecords', { name: row.agentAccount })
          break
        case 5:
          // this.goPage('/recordsPage/account-change-records', { opt_name: row.agentAccount })
          this.goPageParams('AccountChangeRecords', { opt_name: row.agentAccount })
          break
        case 6:
          this.addAgent(row, type)
          break
        case 7:
          this.handleLimitSetup(row)
          break
        case 8:
          if (this.$Global.optioner.arrJxb[8] === '0') {
            return this.$message.warning(`${this.$t('message.you_do_not_have_this_permission')}`)
          }
          // this.goPage('/report-page/report', { name: row.agentAccount })
          this.goPageParams('ReportsPage', { name: row.agentAccount })
          break
        case 9:
          // this.goPage('/recordsPage/wash-records', { name: row.agentAccount })
          this.goPageParams('WashRecords', { name: row.agentAccount })
          break
        case 11:
          // this.goPage('/recordsPage/wash-records', { name: row.agentAccount })
          this.goPageParams('MoneyRecords', { name: row.agentAccount })
          break
        case 12:
          // this.goPage('/recordsPage/wash-records', { name: row.agentAccount })
          this.goPageParams('ReportsPage', { name: row.agentAccount })
          break
      }
    },
    handleXM(row) {
      const sendStr = {
        router: 'getXmInfo',
        JsonData: {
          level: 2,
          userId: row.Id,
          optname: this.$Global.optioner.UserName,
          token: this.token,
          proxyname: this.isSub ? this.subInfo.name : ''
        }
      }
      this.xm_disable = true
      this.$pomelo.sendcb(sendStr, res => {
        this.xm_disable = false
        const data = res.JsonData
        if (data.code && data.code === 1002) {
          this.$toast('登录时效已过期，请重新登录')
          setTimeout(() => {
            localStorage.removeItem('_SinDds_')
            window.location.reload()
          }, 1000)
          return
        }
        if (data.result === 'ok') {
          const setData = {
            curXmTime: this.transTime(data.curXmTime),
            curXmf: data.curXmf,
            // eslint-disable-next-line
            lastXmTime: data.lastXmTime != null ? this.transTime(data.lastXmTime) : '',
            prevXmTime: this.transTime(data.prevXmTime),
            // eslint-disable-next-line
            xm_type: data.xm_type == 0 ? '双边' : '单边',
            xmb_d: data.xmb_d || 0,
            xmb_s: data.xmb_s || 0,
            xml_d: data.xml_d || 0,
            xml_s: data.xml_s || 0,
            turnover: data.turnover || 0
          }
          // console.log('setData ', setData)
          this.$store.commit('ht/setGotXmInfo', setData)

          this.xmData = JSON.parse(JSON.stringify(row))
          this.$refs.xm.dialogFormVisible = true
        } else {
          this.$toast('获取洗码费失败!')
        }
      })
    },
    handleRemoveXM(row) {
      const sendStr = {
        router: 'getXmInfo',
        JsonData: {
          level: 2,
          userId: row.Id,
          optname: this.$Global.optioner.UserName,
          token: this.token,
          proxyname: this.isSub ? this.subInfo.name : ''
        }
      }
      this.xm_disable = true
      this.$pomelo.sendcb(sendStr, res => {
        this.xm_disable = false
        const data = res.JsonData
        if (data.code && data.code === 1002) {
          this.$toast('登录时效已过期，请重新登录!')
          setTimeout(() => {
            localStorage.removeItem('_SinDds_')
            window.location.reload()
          }, 1000)
          return
        }
        if (data.result === 'ok') {
          const setData = {
            curXmTime: this.transTime(data.curXmTime),
            curXmf: data.curXmf,
            // eslint-disable-next-line
            lastXmTime: data.lastXmTime != null ? this.transTime(data.lastXmTime) : '',
            prevXmTime: this.transTime(data.prevXmTime),
            // eslint-disable-next-line
            xm_type: data.xm_type == 0 ? '双边' : '单边',
            xmb_d: data.xmb_d || 0,
            xmb_s: data.xmb_s || 0,
            xml_d: data.xml_d || 0,
            xml_s: data.xml_s || 0,
            turnover: data.turnover || 0
          }
          // console.log('setData ', setData)
          this.$store.commit('ht/setGotXmInfo', setData)

          this.rxmData = JSON.parse(JSON.stringify(row))
          this.$refs.rxm.dialogFormVisible = true
        } else {
          this.$toast('获取洗码费失败!')
        }
      })
    },
    transTime(times) {
      this.$moment.suppressDeprecationWarnings = true
      return this.$moment(times).format('YYYY-MM-DD HH:mm:ss')
    },
    xmSuccess() {
      this.getOneUser(this.relation[this.relation.length - 1])
      this.doGetUser(this.relation[this.relation.length - 1])
    },
    AddMyMemberOK(val1, val2) {
      this.refreshRelations()
      if (val1 && val2) {
        this.doGetUser(this.$Global.optioner.UserName)
      } else {
        this.doGetUser(this.relation[this.relation.length - 1])
      }
    },
    goPage(router, query) {
      this.$router.push({
        path: `${router}`,
        query: query
      })
    },
    goPageParams(name, params) {
      this.$router.push({
        name: name,
        params: params
      })
    },
    changeSwitch(data) {
      if (this.$Global.optioner.arrJxb[4] === '0') return this.$toast(`抱歉! 您没有该权限! 请联系上级!`)
      var n = data.sEnable === '禁用' ? 0 : 1
      var sendStr = {
        router: 'setUserState',
        JsonData: {
          name: data.agentAccount,
          state: n,
          opt_name: this.$Global.optioner.UserName,
          Id: this.$Global.optioner.Id,
          level: this.$Global.optioner.level,
          proxyname: this.isSub ? this.subInfo.name : ''
        }
      }
      // console.log('send ', sendStr)
      this.$pomelo.sendcb(sendStr, res => {
        // console.log('changestate ', res)
        if (res?.JsonData?.result === 'ok') {
          this.$toast(res.JsonData?.msg)
        } else {
          data.sEnable = n === 1 ? 0 : 1
          this.$toast(res?.JsonData?.msg)
        }
      })
    },
    PaginationEvent(props) {
      this.handlePagination(props)
    },
    handlePagination(props) {
      props.action === 'limit' ? this.currentPage = 1 : this.currentPage = props.page
      this.pageSize = props.limit
      // const sendStr = { name: this.relation[this.relation.length - 1], Id: '', pageSize: this.pageSize, currentPage: this.currentPage }
      // console.log(sendStr)
      // this.reqt(sendStr)
      this.doGetUser(this.relation[this.relation.length - 1])
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 === 1) {
        return 'color-row'
      }
      return ''
    },
    tableCellClick(row, column, cell, event) {
      if (column.property == 'agentAccount') {
        /* Copy the text inside the text field */
        // navigator.clipboard.writeText(value)copier_account
        this.$message.closeAll()
        this.$message.success('复制成功')
        var data = JSON.parse(JSON.stringify(row))
        var oInput = document.createElement('input')
        oInput.value = data.agentAccount
        document.body.appendChild(oInput)
        oInput.select()
        document.execCommand('Copy')
        oInput.className = 'oInput'
        oInput.style.display = 'none'
        // this.$message({
        //   type: 'success',
        //   message: this.$t('message.copy_success')
        // })
      }
    },
    changeCellStyle(row, column, rowIndex, columnIndex) {
      if (row.column.property === 'aBalance' || row.column.property === 'xmb' || row.column.property === 'group_ye' || row.column.property === 'win_lose') {
        return 'padding-right: 10px !important; text-align: right;'
      }
    },
    tabClick(name,title){
         
         console.log("name "+title,name);
         switch (name) {
             case 'a':
                 
                 break;
             // case 'b':
             // this.$router.push('/user/phone-acc')
             //     break;
             // case 'c':
             // this.$router.push('/user/jk-acc')
             //     break;
             case 'd':
             this.$router.push('/manageUser/sub-acc')
                 break;
         
             default:
                 break;
         }
     },
  }
}
</script>