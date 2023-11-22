<template>
    <div>
        <div v-if="roadData" class="scroll_main w-full overflow-y-hidden  area__   relative group">
                <div id="boxx" ref="scrollView"  v-if="roadData.rType == 'bjl' || roadData.rType == 'lh'"
                    class="dl-section border-t border-slate-500   r-section text-white whitespace-nowrap scrollbar__   h-full overflow-y-hidden">
                    <div ref="lastElement"  class="col c2   h-[168px]    text-center  " v-for="(col, iCol) in dl.lst" :key="iCol">
                        <div class="cell border-b border-slate-500 w-[26px] h-[26px]    text-center overflow-hidden "
                            v-for="(c, iRow) in col" :key="iRow">
                            <!-- {{c}} -->
                            <img v-if="c >=100" :src="'@/assets/img/dl-' + c + '.png'" alt=""
                                class="h-[100%] w-full  align-center p-[2px] " />
                        </div>
                    </div>
                </div>
                <div v-if="roadData.rType == 'nn'"
                    class="dl-section border-t border-slate-500  r-section text-white whitespace-nowrap scrollbar__   h-full overflow-y-hidden">
                    <div class="col c2  h-[168px] border-b border-slate-500    text-center  "
                        v-for="(item, idx) in nnp.lst" :key="idx">
                        <!-- {{item}} -->
                        <div class="cell_nn w-[30px] text-center overflow-hidden   ">
                            <div class="nn-b-d w-full h-full relative ">
                                <img v-if="item.n0.v !== '.'" :src="'@/assets/img/nn_b' + item.n0.v + '.png'" alt=""
                                    class="h-full w-full">
                                <img v-else src="@/assets/img/nn_n.png" alt="" class="h-full w-full">
                            </div>
                        </div>

                        <div class="cell_nn w-[30px] text-center overflow-hidden  ">
                            <div class="nn-b-d w-full h-full relative " v-if="item.n1.v !== undefined">
                                <img class="y h-full w-full" :class="{ 'active': item.n1.w === 1 }"
                                    v-if="item.n1.v !== '.'" :src="'@/assets/img/nn_' + item.n1.v + '.png'" alt="">
                                <img v-else src="@/assets/img/nn_n.png" alt="" class="h-full w-full">
                            </div>
                        </div>

                        <div class="cell_nn w-[30px] text-center overflow-hidden  ">
                            <div class="nn-b-d w-full h-full relative " v-if="item.n1.v !== undefined">
                                <img class="y w-full h-full " :class="{ 'active': item.n2.w === 1 }"
                                    v-if="item.n2.v !== '.'" :src="'/static/img/nn_' + item.n2.v + '.png'" alt="">
                                <img v-else src="/static/img/nn_n.png" alt="" class="w-full h-full">
                            </div>
                        </div>

                        <div class="cell_nn w-[30px] text-center overflow-hidden  ">
                            <div class="nn-b-d w-full h-full relative" v-if="item.n1.v !== undefined">
                                <img class="y w-full h-full" :class="{ 'active': item.n3.w === 1 }"
                                    v-if="item.n3.v !== '.'" :src="'@/assets/img/nn_' + item.n3.v + '.png'" alt="">
                                <img v-else src="@/assets/img/nn_n.png" alt="">
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div v-else class="scroll_main overflow-y-hidden  area__ relative ">
                <div ref="scrollView" @mousewheel="onScroll"
                    class="dl-section border-t border-slate-500  r-section text-white whitespace-nowrap scrollbar__   h-full overflow-y-hidden">
                    <div class="col c2 h-[168px]    text-center  " v-for="(col, iCol) in dl.lst" :key="iCol">
                        <div class="cell border-b border-slate-500 w-[26px] h-[26px]   text-center overflow-hidden "
                            v-for="(c, iRow) in col" :key="iRow">
                           
                            <img v-if="c >= 100" :src="'@/assets/img/dl-' + c + '.png'" alt=""
                                class="h-[100%] w-full p-1  align-center ">

                        </div>
                    </div>
                </div>
            </div>
    </div>
  </template>
  
  <script>
  import { mapState } from 'vuex'
  
  export default {
    props: {
      gameType: {
        type: String,
        default: 'bjl'
      }
    },
    data() {
      return {
        roadData: {
          rType: 'bjl'
        },
        statistic: {
          banker: 0,
          player: 0,
          tie: 0,
          bPair: 0,
          pPair: 0
        },
        zp: {
          lst: [],
          col: 0,
          row: 0
        },
        dl: {
          lst: [],
          row: 0,
          col: 0,
          pr: 0,
          pc: 0,
          nc: 0,
          cl: false,
          clNum: 0,
          good: 0,
          ab: {
            row: -1,
            col: -1
          },
          ap: {
            row: -1,
            col: -1
          },
          pointCol: 0,
          stat: {}
        },
        nnp: {
          lst: [],
          col: 0,
          row: 0
        },
        CowCowStatistic: {
          n0: 0,
          n1: 0,
          n2: 0,
          n3: 0,
          n4: 0,
          n5: 0
        }
      }
    },
    computed: {
      ...mapState({
        road: state => state.ht.roadData
      })
    },
    watch: {
      gameType: function(n, o) {
        this.roadData.rType = n
        this.initData()
        this.initRoad(n)
      }
    },
    mounted() {
      this.initData()
      this.initDataCowCow()
      this.initRoad(this.gameType)
    },
    methods: {
      clearRoad() {
        this.initData()
        this.initDataCowCow()
        this.initRoad(this.gameType)
      },
    //   imgPath(c) {
    //     const d = require(`@/assets/img/dl-${c}.png`)
    //     return d
    //   },
    //   nnImgPath(i) {
    //     const n = require(`@/assets/img/nn_b${i}.png`)
    //     return n
    //   },
    //   imgPath2(v) {
    //     const p = require(`@/assets/img/nn_${v}.png`)
    //     return p
    //   },
      initRoad(type) {
        if (type === 'bjl') {
          this.roadDataModifed(this.road)
        } else if (type === 'nn') {
          this.roadDataModifedCowCow(this.road)
        } else if (type === 'lh') {
          this.roadDataModifedDT(this.road)
        }
      },
      initData() {
        this.zp.col = this.zp.row = 0
        this.zp.lst = []
        const colsNumUnit = 32
        for (let i = 0; i < colsNumUnit; i++) {
          this.zp.lst.push([0, 0, 0, 0, 0, 0])
        }
        this.dl.col = this.dl.row = 0
        this.dl.lst = []
        this.dl.pr = this.dl.pc = this.dl.nc = 0
        this.dl.cl = false
        this.dl.clNum = 0
        this.dl.stat = {}
        this.dl.pointCol = 0
        for (let i = 0; i < colsNumUnit * 2; i++) {
          this.dl.lst.push([0, 0, 0, 0, 0, 0])
        }
        this.statistic.banker = 0
        this.statistic.player = 0
        this.statistic.tie = 0
        this.statistic.bPair = 0
        this.statistic.pPair = 0
      },
      addOne(item) {
        const result = item
        if (!result) return // first letter of result H
  
        let zpIdx = 0
        if (result === 'a') {
          zpIdx = 100
          this.statistic.banker++
        } else if (result === 'e') {
          zpIdx = 200
          this.statistic.player++
        } else if (result === 'i') {
          zpIdx = 300
          this.statistic.tie++
        }
        if (result === 'b') {
          zpIdx = 100
          zpIdx += 1
          this.statistic.banker++
          this.statistic.pPair++
        }
        if (result === 'c') {
          zpIdx = 100
          zpIdx += 10
          this.statistic.banker++
          this.statistic.bPair++
        }
        if (result === 'd') {
          zpIdx = 100
          zpIdx += 10
          zpIdx += 1
          this.statistic.banker++
          this.statistic.bPair++
          this.statistic.pPair++
        }
  
        if (result === 'f') {
          zpIdx = 200
          zpIdx += 1
          this.statistic.player++
          this.statistic.pPair++
        }
        if (result === 'g') {
          zpIdx = 200
          zpIdx += 10
          this.statistic.player++
          this.statistic.bPair++
        }
        if (result === 'h') {
          zpIdx = 200
          zpIdx += 1
          zpIdx += 10
          this.statistic.player++
          this.statistic.pPair++
          this.statistic.bPair++
        }
        if (result === 'j') {
          zpIdx = 300
          zpIdx += 10
          this.statistic.tie++
          this.statistic.pPair++
        }
        if (result === 'k') {
          zpIdx = 300
          zpIdx += 1
          this.statistic.tie++
          this.statistic.bPair++
        }
        if (result === 'l') {
          zpIdx = 300
          zpIdx += 10
          zpIdx += 1
          this.statistic.tie++
          this.statistic.bPair++
          this.statistic.pPair++
        }
  
        this.zp.lst[this.zp.col][this.zp.row] = zpIdx
        this.zp.lst
        this.zp.col
        this.zp.lst[this.zp.col]
        if (++this.zp.row >= 6) {
          this.zp.col++
          this.zp.row = 0
        }
  
        if (this.zp.col >= 20 - 2) {
          this.zp.lst.shift() // remove first element
          this.zp.lst.push([0, 0, 0, 0, 0, 0]) // append to end of array
          this.zp.col--
        }
        const dlIdx = Math.floor(zpIdx / 100)
        this.addOneDl(dlIdx)
      },
      roadDataModifed(data) {
        const nn = data?.split('^')
        if (nn?.length >= 32) {
          this.$nextTick(() => {
            const box = document.getElementById('boxx')
            box.scrollLeft += 220
          })
        }
        var splitData = []
        for (let i = 0; i < nn?.length; i++) {
          splitData.push(nn[i].split('-')[0])
        }
        splitData.forEach((split, i) => {
          this.addOne(split)
        })
      },
      roadDataModifedDT(data) {
        const nn = data?.split('^')
        if (nn?.length >= 32) {
          this.$nextTick(() => {
            const box = document.getElementById('boxx')
            box.scrollLeft += 220
          })
        }
        nn?.pop()
        var splitData = []
        for (let i = 0; i < nn?.length; i++) {
          splitData?.push(nn[i]?.substring('0')[0])
        }
        splitData?.forEach((split, i) => {
          this.addOneDragonTiger(split)
        })
      },
      /**
       * 龙虎
       */
      addOneDragonTiger(item) {
        const result = item
        if (!result) return // first letter of result H
  
        let zpIdx = 0
        if (result === 'a') { // dragon
          zpIdx = 100
          this.statistic.banker++
        } else if (result === 'c') { // tiger
          zpIdx = 200
          this.statistic.player++
        } else if (result === 'b') { // tie
          zpIdx = 300
          this.statistic.tie++
        }
  
        this.zp.lst[this.zp.col][this.zp.row] = zpIdx
        this.zp.lst
        this.zp.col
        this.zp.lst[this.zp.col]
        if (++this.zp.row >= 6) {
          this.zp.col++
          this.zp.row = 0
        }
  
        if (this.zp.col >= 20 - 2) {
          this.zp.lst.shift() // remove first element
          this.zp.lst.push([0, 0, 0, 0, 0, 0]) // append to end of array
          this.zp.col--
        }
        const dlIdx = Math.floor(zpIdx / 100)
        this.addOneDl(dlIdx)
      },
  
      /**
       * 牛牛
       */
      initDataCowCow() {
        this.nnp.col = 0
        this.nnp.lst = []
        const colsNumUnit = 31
        for (let i = 0; i < colsNumUnit; i++) {
          this.nnp.lst.push({ n0: {}, n1: {}, n2: {}, n3: {}, n4: {}, n5: {}})
        }
        this.CowCowStatistic.n0 = 0
        this.CowCowStatistic.n1 = 0
        this.CowCowStatistic.n2 = 0
        this.CowCowStatistic.n3 = 0
        this.CowCowStatistic.n4 = 0
        this.CowCowStatistic.n5 = 0
      },
      roadDataModifedCowCow(data) {
        // const test_data = 'dlbd-001^lfli-101^hbll-000^lllb-011^cdlf-101^lchl-110^lgha-111^llil-010^jhch-000^icld-000^alhl-010^lijj-111^jjca-000^flil-010^jlfj-001^'
        const nn = data?.split('^')
        nn.pop()
        var splitData = []
        var resultData = []
        for (let i = 0; i < nn?.length; i++) {
          splitData.push(nn[i].split('-')[0])
          resultData.push(nn[i].split('-')[1])
        }
        // addOne('abcd','111')
        // addOne('efhj','000')
        for (let index = 0; index < splitData.length; index++) {
          this.addOneCowCow(splitData[index], resultData[index])
        }
      },
      textToNum(strGame) {
        // 游戏类型转换
        var msg = {
          a: '1',
          b: '2',
          c: '3',
          d: '4',
          e: '5',
          f: '6',
          g: '7',
          h: '8',
          i: '9',
          j: 'a',
          k: 'c',
          l: '0'
        }
        return msg[strGame]
      },
      addOneCowCow(item, number) {
        const result = item
        if (!result) return
        const rs = result.split('')
        const md = number.split('')
        // if (rs.length !== 12) return;
        const ii = {
          n0: {
            v: this.textToNum(rs[0]),
            w: this.textToNum(rs[0]) === '0' ? '0' : 1
          },
          n1: {
            v: this.textToNum(rs[1]),
            w: md[0] * 1
          },
          n2: {
            v: this.textToNum(rs[2]),
            w: md[1] * 1
          },
          n3: {
            v: this.textToNum(rs[3]),
            w: md[2] * 1
          }
          // n4: {
          //     v: rs[8],
          //     w: rs[9] * 1,
          // },
          // n5: {
          //     v: rs[10],
          //     w: rs[11] * 1
          // },
        }
  
        if (ii.n1.w === 1) this.CowCowStatistic.n1++
        if (ii.n2.w === 1) this.CowCowStatistic.n2++
        if (ii.n3.w === 1) this.CowCowStatistic.n3++
        // if (ii.n4.w === 1) CowCowStatistic.n4++;
        // if (ii.n5.w === 1) CowCowStatistic.n5++;
        this.nnp.lst[this.nnp.col] = ii
        this.nnp.col++
        if (this.nnp.col >= 19 - 1) {
          this.nnp.lst.shift()
          this.nnp.lst.push({ n0: { w: 1, v: 1 }, n1: {}, n2: {}, n3: {}, n4: {}, n5: {}})
          this.nnp.col--
        }
      },
  
      /**
       * 添加路单
       */
      addOneDl(dlIdx, ask = false) {
        // let param = {}
        const pIdx = Math.floor(this.dl.lst[this.dl.pc][this.dl.pr] / 100)
        if (dlIdx === 3) {
          if (this.dl.lst[this.dl.pc][this.dl.pr] % 10 < 9) { // tie adding untial less than 9
            this.dl.lst[this.dl.pc][this.dl.pr] += 1
          }
        } else {
          if (pIdx === dlIdx) {
            if (this.dl.row > 5 || this.dl.lst[this.dl.col][this.dl.row] > 0 || this.dl.cl) {
              this.dl.row--
              this.dl.col++
              this.dl.cl = true
              this.dl.clNum++
            }
            if (!ask) this.dl.stat[this.dl.pointCol]++
          } else {
            this.dl.col = this.dl.nc
            this.dl.row = 0
            this.dl.cl = false
            this.dl.clNum = 0
            if (!ask) {
              this.dl.pointCol = this.dl.nc
              this.dl.stat[this.dl.pointCol] = 1
            }
          }
          if (this.dl.col < 0) this.dl.col = 0
          if (ask === true) {
            this.dl.lst[this.dl.col][this.dl.row] = dlIdx * -100
            if (dlIdx === 1) {
              this.dl.ab.row = this.dl.row
              this.dl.ab.col = this.dl.col
            } else {
              this.dl.ap.row = this.dl.row
              this.dl.ap.col = this.dl.col
            }
          } else {
            this.dl.lst[this.dl.col][this.dl.row] = dlIdx * 100
            this.dl.good = 0
            if (this.dl.cl) {
              this.dl.good = 4
              if (this.dl.col >= 3) {
                const clp = this.parseChangLong(this.dl.lst, this.dl.col, this.dl.row, 2)
                if (clp.col >= 2 && clp.num > 3 && this.dl.lst[clp.col - 1][1] === 0) {
                  const cln = this.parseChangLong(this.dl.lst, clp.col - 2, 0, 0)
                  if (cln.num !== -1 && cln.num > 3) this.dl.good = 5
                }
              }
            } else if (this.dl.row >= 3) {
              this.dl.good = 4
              if (this.dl.col >= 2 && this.dl.lst[this.dl.col - 1][1] === 0) {
                const cl = this.parseChangLong(this.dl.lst, this.dl.col - 2, 0, 0)
                if (cl.num !== -1 && cl.num > 3) this.dl.good = 5
              }
            } else if (this.dl.row === 2) {
              if (this.dl.col >= 3) {
                if (this.dl.lst[this.dl.col - 1][2] === 0 &&
                  this.dl.lst[this.dl.col - 1][1] > 0 &&
                  this.dl.lst[this.dl.col - 2][3] === 0 &&
                  this.dl.lst[this.dl.col - 2][2] > 0 &&
                  this.dl.lst[this.dl.col - 3][2] === 0 &&
                  this.dl.lst[this.dl.col - 3][1] > 0) {
                  this.dl.good = 3
                }
              }
            } else if (this.dl.row === 1) {
              if (this.dl.col >= 3) {
                if (this.dl.lst[this.dl.col - 1][1] === 0 &&
                  this.dl.lst[this.dl.col - 2][1] > 0 &&
                  this.dl.lst[this.dl.col - 2][2] === 0 &&
                  this.dl.lst[this.dl.col - 3][1] === 0) {
                  this.dl.good = 2
                }
              }
            } else if (this.dl.row === 0) {
              if (this.dl.col >= 3) {
                if (this.dl.lst[this.dl.col - 1][1] === 0 &&
                  this.dl.lst[this.dl.col - 2][1] === 0 &&
                  this.dl.lst[this.dl.col - 3][1] === 0) {
                  this.dl.good = 1
                }
              }
            }
          }
          this.dl.pr = this.dl.row
          this.dl.pc = this.dl.col
          if (this.dl.row === 0) this.dl.nc++
          this.dl.row++
        }
  
        if (this.dl.col >= 20 * 2 - 2 && !ask) {
          this.dl.lst.shift()
          this.dl.lst.push([0, 0, 0, 0, 0, 0])
          this.dl.col--
          this.dl.pc--
          this.dl.nc--
        }
        // debugger
      },
      parseChangLong(lst, col, row, cl) {
        const define = Math.floor(lst[col][row] / 100)
        if (define === 0) {
          return { num: -1, col: 0, row: 0 }
        }
        let num = 1
        let iCol = col
        let iRow = row
        if (cl === 0) {
          while (++iRow) {
            if (Math.floor(lst[iCol][iRow]) !== define) {
              iRow--
              break
            }
            num++
          }
          while (++iCol) {
            if (Math.floor(lst[iCol][iRow]) !== define) {
              iCol--
              break
            }
            num++
          }
        } else {
          if (cl === 2) {
            while (--iCol) {
              if (Math.floor(lst[iCol][iRow]) !== define) {
                iCol++
                break
              }
              num++
            }
          }
          while (--iRow >= 0) num++
          iRow++
        }
        return {
          num: num,
          col: iCol,
          row: iRow
        }
      }
    }
  }
  </script>
  
  <style  scoped>
.r-section {
    overflow-y: hidden;
    position: relative;
    @apply w-full;
    min-width: 100%;

    will-change: transform;
    user-select: none;
    cursor: grabbing;
    overflow-x: auto;
    scroll-behavior: smooth;
    /* -ms-overflow-style: none; 
    scrollbar-width: none;   */

    /* width: calc((100vw - 198px)); */
}

.col {
    display: inline-block;
    letter-spacing: 0;
    vertical-align: top;
    border-right: 1px solid;
    @apply border-slate-500;
    /* height: 100%; */
    position: relative;
    text-align: center;
}

.cell_nn {
    border-bottom: 1px solid;
    @apply border-slate-500;
    height: calc(240px / 4);
    /* width: calc(320px / 4); */
}

.cell_nn:last-child {
    border-bottom: 1px solid transparent;
}

.y {
    background: #1268F9;
}

.nn-b-d .active {
    background: #E00B17;
}
  </style>
  