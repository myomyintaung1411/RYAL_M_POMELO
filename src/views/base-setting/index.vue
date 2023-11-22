<template>
    <div class="h-full relative w-full">
        <van-nav-bar fixed
        title="公共设置"
        left-arrow
        @click-left="onClickLeft"
        >
        </van-nav-bar>
     <section class="pt-12 w-full relative">
        <van-tabs v-model="activeName" @click="tabClick" sticky color="#4e6c50">
        <van-tab v-if="info.gx.split('^').length <= 2" title="公告消息设定" name="a">
            <AgentNotice ref="agentNoticeRefs" />
        </van-tab>
        <van-tab v-if="info.Id == 1"  title="入口地址设定" name="b">
            <MainAddress ref="mainAddressRefs" /></van-tab>
        <van-tab v-if="info.Id == 1"  title="IP黑名单" name="c">
            <BlackIP ref="blackIPRefs" />
        </van-tab>
       </van-tabs> 
     </section>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import AgentNotice from './agent-notice/index.vue'
import MainAddress from './main-address/index.vue'
import BlackIP from './black-ip/index.vue'

export default {
    components: {
    AgentNotice,
    MainAddress,
    BlackIP
  },
  data() {
    return{
        activeName:'a'
    }
  },
  computed: {
    ...mapState({
      device: state => state.app.device,
      info: state => state.user.info
    })
  },
  methods: {
    onClickLeft() {
      this.$router.push('/dashboard')
    },
    tabClick(name,title){
         
         console.log("name "+title,name);
         switch (name) {
             case 'a': 
             this.$refs.agentNoticeRefs?.getNotcieMsg()
                 break;
             case 'b': 
             this.$refs.mainAddressRefs?.getBaseAddress()
                 break;
             case 'c': 
             this.$refs.blackIPRefs?.getBlackList()
                 break;
             default:
                 break;
         }
     },
  },
}
</script>