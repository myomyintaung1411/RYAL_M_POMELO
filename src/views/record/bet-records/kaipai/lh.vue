<template>
  <div class="hg_class">
    <van-popup
      v-model="dialogFormVisible"
      closeable
      @close="closeDia" position="bottom"  :style="{ height: '30%' }"
    >
      <!-- {{ lhPai.str_pai }} -->
    <section class="px-3 py-10 w-full relative">
      <span class="font-bold text-lg">开牌结果</span>
      <div v-if="lhPai" style="display: flex; justify-content: center;flex-direction: column;" class="px-3 pt-3">
        <div style="display: flex; align-items: center;" class="w-full">
          <font style="color: red; font-size: 20px; font-weight: bold; margin-right: 12px;">龙</font>
          <div v-for="(p, i) in lhPai.str_pai.dragon" :key="i" class="w-1/3">
            <div class="card">
              <div class="front">
                <div class="corner top">
                  <span v-if="p.suit === 'H' || p.suit === 'D'" class="number" style="color: rgba(255, 0, 0, 0.8)">{{ p.rank | formatPai }}</span>
                  <span v-else class="number" style="color: rgba(0, 0, 0, 0.8)">{{ p.rank | formatPai }}</span>
                  <span v-if="p.suit === 'H' || p.suit === 'D'" style="color: rgba(255, 0, 0, 0.8)">{{ p.suit == 'H' ? '♥' : p.suit == 'D' ? '♦' : p.suit == 'S' ? '♠' : '♣' }}</span>
                  <span v-else style="color: rgba(0, 0, 0, 0.8)">{{ p.suit == 'H' ? '♥' : p.suit == 'D' ? '♦' : p.suit == 'S' ? '♠' : '♣' }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style="display: flex; align-items: center;" class="w-full">
          <font style="color: blue; font-size: 20px; font-weight: bold; margin-right: 12px;">虎</font>
          <div v-for="(p, i) in lhPai.str_pai.tiger" :key="i" class="w-1/3">
            <div class="card">
              <div class="front">
                <div class="corner top">
                  <span v-if="p.suit === 'H' || p.suit === 'D'" class="number" style="color: rgba(255, 0, 0, 0.8)">{{ p.rank | formatPai }}</span>
                  <span v-else class="number" style="color: rgba(0, 0, 0, 0.8)">{{ p.rank | formatPai }}</span>
                  <span v-if="p.suit === 'H' || p.suit === 'D'" style="color: rgba(255, 0, 0, 0.8)">{{ p.suit == 'H' ? '♥' : p.suit == 'D' ? '♦' : p.suit == 'S' ? '♠' : '♣' }}</span>
                  <span v-else style="color: rgba(0, 0, 0, 0.8)">{{ p.suit == 'H' ? '♥' : p.suit == 'D' ? '♦' : p.suit == 'S' ? '♠' : '♣' }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </section>

    </van-popup>
  </div>
</template>

<script>
/* eslint-disable */
// import { bjlMap } from './data'

export default {
  props: ['lhPai'],
  data() {
    return {
      dialogFormVisible: false,
      loading: false
    }
  },
  methods: {
    closeDia() {
      this.loading = false
      this.selectValue = []
    }
  }
}
</script>

<style scoped>
.card {
  background-color: #fff;
  -moz-border-radius: 10px;
  -webkit-border-radius: 10px;
  border-radius: 10px;
  -moz-box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
  -webkit-box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
  float: left;
  height: 80px;
  margin: 0 15px 15px 0;
  position: relative;
  width: 60px;
  z-index: 2;
  cursor: pointer;
}
.card .corner {
  line-height: 1;
  overflow: hidden;
  position: absolute;
  text-align: center;
}
.card .corner span {
  display: block;
  font-size: 30px;
  font-weight: bold;
}
.card .corner .number {
  font-size: 30px;
  height: 30px;
  line-height: 30px;
}
.card .corner.top {
  left: 8px;
  top: 12px;
}
</style>
