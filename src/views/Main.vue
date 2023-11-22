<template>
      <div
    id="main"
    class="w-full h-full sm:max-w-md sm:mx-auto sm:flex sm:justify-center sm:items-center"
  >
  <router-view></router-view>
  <van-tabbar route v-model="active" active-color="#0ba360">
  <van-tabbar-item replace to="/" icon="home-o">控制台</van-tabbar-item>
  <van-tabbar-item replace to="/manageUser/user-list-hj" icon="friends-o">用户管理</van-tabbar-item>
  <van-tabbar-item replace to="/recordsPage/bet-records" icon="newspaper-o">记录管理</van-tabbar-item>
  <!-- <van-tabbar-item replace to="/onlinePage/online-members" icon="bar-chart-o">记录管理</van-tabbar-item> -->
  <van-tabbar-item replace to="/report-page/report" icon="gold-coin-o">输赢报表</van-tabbar-item>
</van-tabbar> 
  </div> 
</template>

<script>
export default {
  data() {
    return {
      active: 0,
      icon: {
        active: 'https://img01.yzcdn.cn/vant/user-active.png',
        inactive: 'https://img01.yzcdn.cn/vant/user-inactive.png',
      },
    };
  },
};
</script>