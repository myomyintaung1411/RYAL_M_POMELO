<template>
  <div style="min-width: 300px;">
    <!-- <el-button v-for="b in btn" :key="b.id" size="small" :type="'warning'" @click="doSelectDate(b.id)">{{ b.name }}</el-button> -->
    <van-button
      v-for="b in btn"
      :key="b.id"
      :size="device !== 'mobile' ? 'mini' : 'mini'"
     
      :type="(active === b.name && showActive) ? 'primary' : 'default'"
      @click="doSelectDate(b.id)"
    >
      {{ b.name }}
    </van-button><slot />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import moment from 'moment'

export default {
  props: {
    canClick: {
      type: Boolean,
      default: true
    },
    showActive: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      startDate: new Date(2023, 7, 10, 0, 0, 0),
      endDate: new Date(2023, 7, 10, 23, 59, 59),
      btn: [
        { id: 1, name: '今日' },
        { id: 2, name: '昨日' },
        { id: 3, name: '本周' },
        { id: 4, name: '上周' },
        { id: 5, name: '本月' },
        { id: 6, name: '上月' }
      ],
      active: '今日'
    }
  },
  computed: {
    ...mapState({
      device: state => state.app.device
    })
  },
  methods: {
    // 选择日期按钮点击事件
    doSelectDate(n) { 
      if (!this.canClick) return this.$notify({type:'danger',message:'查询中, 请稍后...',duration: 1500,})
      this.$emit('dateChangeShowActiveBtn', true)
      switch (n) {
        case 1:
          this.today()
          this.active = '今日'
          break
        case 2:
          this.yesterday()
          this.active = '昨日'
          break
        case 3:
          this.theWeek()
          this.active = '本周'
          break
        case 4:
          this.lastWeek()
          this.active = '上周'
          break
        case 5:
          this.thisMonth()
          this.active = '本月'
          break
        case 6:
          this.lastMonth()
          this.active = '上月'
          break
        default:
          this.today()
          this.active = '今日'
      }
    },
    // 昨日按钮
    yesterday() {
      this.startDate = moment().subtract(1, 'day').startOf('day').format('YYYY-MM-DD HH:mm:ss')
      this.endDate = moment().subtract(1, 'day').endOf('day').format('YYYY-MM-DD HH:mm:ss')
      this.$emit('dateChange', [this.startDate, this.endDate])
    },
    // 今日
    today() {
      this.startDate = moment().startOf('day').format('YYYY-MM-DD HH:mm:ss')
      this.endDate = moment().endOf('day').format('YYYY-MM-DD HH:mm:ss')
      this.$emit('dateChange', [this.startDate, this.endDate])
    },
    // 本周
    theWeek() {
      this.startDate = moment().startOf('week').format('YYYY-MM-DD HH:mm:ss')
      this.endDate = moment().endOf('week').format('YYYY-MM-DD HH:mm:ss')
      this.$emit('dateChange', [this.startDate, this.endDate])
    },
    // 上周
    lastWeek() {
      this.startDate = moment().subtract(1, 'week').startOf('week').format('YYYY-MM-DD HH:mm:ss')
      this.endDate = moment().subtract(1, 'week').endOf('week').format('YYYY-MM-DD HH:mm:ss')
      this.$emit('dateChange', [this.startDate, this.endDate])
    },
    // 本月
    thisMonth() {
      this.startDate = moment().startOf('month').format('YYYY-MM-DD HH:mm:ss')
      this.endDate = moment().endOf('month').format('YYYY-MM-DD HH:mm:ss')
      this.$emit('dateChange', [this.startDate, this.endDate])
    },
    // 上月
    lastMonth() {
      this.startDate = moment().subtract(1, 'month').startOf('month').format('YYYY-MM-DD HH:mm:ss')
      this.endDate = moment().subtract(1, 'month').endOf('month').format('YYYY-MM-DD HH:mm:ss')
      this.$emit('dateChange', [this.startDate, this.endDate])
    }
  }
}
</script>

<style  scoped>

</style>
