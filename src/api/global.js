/* eslint-disable */
import moment from 'moment'

export default {
  // 个人信息
  optioner: {
    UserName: '',
    Id: '',
    arrJsb: [],
    optionScore: 0,
    xmb_s: '',
    xmb_d: '',
    zcb: '',
    gx: '',
    xmType: '',
    level: 2,
    webSit: '',
    token: '',
    pw: '',
    enable: 1,
    customerId: ''
  },
  // 修改新密码后覆盖原始密码
  newPass: '',
  // 用于判断原始密码
  Pass: '',
  // 是否是lgf的代理
  isUsed_000Format: false,
  // 用于判断等级，是否可设置 洗码类型（单、双）
  gxLength: 0,
  selectInfo: {
    selectAgent: '',
    selectItem: '',
    xmb_d: '',
    xmb_s: ''
  },
  addPwStr: '$hn_ok$my_ok$hn_ok',
  // 协议加密 ==> '秘钥key必须是 8的倍数位', '位移iv 为了兼容 PHP 所以用 16位' 
  en: {
    key: '@hKe9@A1lKe9$Tz1kE@8HnG7',
    iv: '1234567890123456'
  },
  ena: {
    key: "#4dFER#@&wqDcv#@67$jNLj#",
    iv: '8975624324562108'
  },
  ens: {
    key: 'u*ue/7Yydiw89UWEN$nie12B',
    iv: '13598702'
  },
  // 表格头部自定义样式
  tableHeaderColor: { color:'', background: '#F5F5F5' },
  // 返回顶部样式
  myBackToTopStyle: {
    right: '50px',
    bottom: '50px',
    width: '40px',
    height: '40px',
    'border-radius': '4px',
    'line-height': '45px', // 请保持与高度一致以垂直居中 Please keep consistent with height to center vertically
    background: '#e7eaf1'// 按钮的背景颜色 The background color of the button
  },

   trasResult (strGame, result) {
    // 转换游戏结果
    // 牛1 至 牛9(a至i) 牛牛,炸弹,无牛(jkl)
    if (result == null) return ''
    if (strGame == 'nn') {
      var split1 = result.split('-')
      var strResult = ''
      for (var i = 0; i < split1[0].length; i++) {
        strResult += split1[0].substr(i, 1) == '0' ? '庄' : '闲'
        if (split1[1])
          strResult +=
            split1[1].substr(i, 1) == 1
              ? '平倍 | '
              : split1[1].substr(i, 1) + '倍 | '
      }
      return strResult
    }
    // a:庄 b:庄 闲对  c:庄 庄对  d:庄 闲对 庄对  e:闲(龙)  f:闲 闲对  g:闲 庄对  h:闲 闲对 庄对  i:和  j:和 闲对  k:和 庄对 l:和 闲对 庄对
    if (strGame == 'bjl') {
      var split1 = '庄,庄 闲对,庄 庄对,庄 闲对 庄对,闲,闲 闲对,闲 庄对,闲 闲对 庄对,和,和 闲对,和 庄对,和 闲对 庄对'.split(',')
      var m = result.charCodeAt() - 97
      let res_ = split1[m]
      let more_m = result.split('_')
      if (more_m.length > 1) {
        if (more_m[1] == 1) res_ += " 大"
        if (more_m[1] == 2) res_ += " 小"
      }
      return res_
    }
  
    if (strGame == 'lh') {
      var split1 = '龙,和,虎'.split(',')
      var m = result.charCodeAt() - 97
      let re = split1[m]
      let more_m = result.split('_')
      if (more_m.length > 1) {
        if (more_m[1] == 'a') re += " 龙双 虎双"
        if (more_m[1] == 'b') re += " 龙单 虎单"
        if (more_m[1] == 'c') re += " 龙单 虎双"
        if (more_m[1] == 'd') re += " 龙双 虎单"
      }
      // let a = result.substr(1, 1)
      // let b = result.substr(2, 1)
      // if (a == '1') re += '龙单 '
      // if (a == '2') re += '龙双 '
      // if (b == '1') re += '虎单 '
      // if (b == '2') re += '虎双 '
      return re
    }
    if (strGame == 'dx') {
      var strResult = ''
      for (var i = 0; i < result.length; i++) {
        strResult += result.substr(i, 1) + '点 '
      }
      return strResult.trim()
    }
    if (strGame == 'tts') {
      // var splitTts='//对子 0-9(a-j),0点(a),1点(b),2点(c),3点(d),4点(e),5点(f),6点(g),7点(h),8点(i),9点(j),1点半(1),2点半(2),3点半(3),4点半(4),5点半(5),6点半(6),7点半(7),8点半(8),9点半(9)'
      // var splitTts='白板对子,对A,对2,对3,对4,对5,对6,对7,对8,对9,0点,1点,2点,3点,4点,5点,6点,7点,8点,9点'
      var split1 = result.split('-')
      var strResult = ''
      for (var i = 0; i < split1[0].length; i++) {
        strResult +=
          split1[0].substr(i, 1) == '0'
            ? '庄'
            : split1[0].substr(i, 1) == '2'
            ? '闲'
            : '和'
        if (split1[0].substr(i, 1) != 1)
          if (split1[1])
            strResult +=
              split1[1].substr(i, 1) == 1
                ? '平倍 '
                : split1[1].substr(i, 1) + '倍 '
      }
      return strResult.trim()
    }
    if (strGame == 'xjh') {
      // var split1 = result.split('-')
      // var strResult = ''
      // for (var i = 0; i < split1[0].length; i++) {
      //   strResult += split1[0].substr(i, 1) == '0' ? '庄' : '闲'
      //   if (split1[1])
      //     strResult +=
      //       split1[1].substr(i, 1) == 1
      //         ? '平倍,'
      //         : split1[1].substr(i, 1) + '倍,'
      // }
      // return strResult
      // a:黑  b:红  c:有对子 d:顺子  e:金花  f:顺金  g:豹子
      const xjhMap = new Map([
        ['a', '黑'], ['b', '红'], ['c', '有对子'], ['d', ''], ['e', ''], ['f', ''], ['g', '']
        // ['a', '黑'], ['b', '红'], ['c', '有对子'], ['d', '顺子'], ['e', '金花'], ['f', '顺金'], ['g', '豹子']
      ])
      var split1 = result.split('')
      var res = split1.map(v => {
        return xjhMap.get(v)
      })
      return res.toString()
    }
    return result // 彩票
  },
   betInfoData(data, rType){
    let nn = data.split("$")
    nn.pop();
    var betnn = [];
    for(let i = 0; i < nn.length; i++){
      betnn.push(nn[i].split("^")[0])
    }
    const nnMap = new Map([
      ["1", ["庄1翻倍"]],["2", ["闲1翻倍"]],["3", ["庄1平倍"]],["4", ["闲1平倍"]],["5", ["庄2翻倍"]],["6", ["闲2翻倍"]],
      ["7", ["庄2平倍"]],["8", ["闲2平倍"]],["9", ["庄3翻倍"]],["10", ["闲3翻倍"]],["11", ["庄3平倍"]],["12", ["闲3平倍"]],["default", [""]],
    ])
    const bjlMap = new Map([
      ["1", ["庄"]],["2", ["和"]],["3", ["闲"]],["4", ["庄对"]],["5", ["闲对"]],["6", ["大"]],["7", ["小"]],["default", [""]],
    ])
    const lhMap = new Map([
      ["1", ["龙"]],["2", ["和"]],["3", ["虎"]],["4", ["龙单"]],["5", ["龙双"]],["6", ["虎单"]],["7", ["虎双"]],["default", [""]], //["龙", "和", "虎", "龙单", "龙双", "虎单", "虎双"];
    ])
    const ttsMap = new Map([
      ["1", ["闲1翻倍"]],["2", ["闲1平倍"]],["3", ["闲2翻倍"]],["4", ["闲2平倍"]],
      ["5", ["闲3翻倍"]],["6", ["闲3平倍"]],["7", ["闲4翻倍"]],["8", ["闲4平倍"]],["default", [""]],
    ])
    const xjhMap = new Map([
      ["1", ["黑"]],["2", ["幸运一击"]],["3", ["红"]]
      // ["1", ["闲1翻倍"]],["2", ["闲1平倍"]],["3", ["闲2翻倍"]],["4", ["闲2平倍"]],["5", ["闲3翻倍"]],["6", ["闲3平倍"]],["7", ["闲4翻倍"]],["8", ["闲4平倍"]],["default", [""]],
    ])
    const dxMap = new Map([
      //17点 到 4点
      ["1", ["总合17点"]],["2", ["总合16点"]],["3", ["总合15点"]],["4", ["总合14点"]],["5", ["总合13点"]],["6", ["总合12点"]],["7", ["总合11点"]],
      ["8", ["总合10点"]],["9", ["总合9点"]],["10", ["总合8点"]],["11", ["总合7点"]],["12", ["总合6点"]],["13", ["总合5点"]],["14", ["总合4点"]],
      //大，单，1,2,3,4,5,6，小，双
      ["15", ['大']],["16", ['单']],
      ["17", ['1点']],["18", ['2点']],["19", ['3点']],
      ["20", ['4点']],["21", ['5点']],["22", ['6点']],
      ["23", ['小']],["24", ['双']],
      //111, 222, 333, 444, 555, 666, 3个1 到 3个6, 22, 11, 33, 44, 55, 66
      ["25", ['三个1点']],["26", ['三个2点']],["27", ['三个3点']],
      ["28", ['三个4点']],["29", ['三个5点']],["30", ['三个6点']],
      ["31", ['同点']],
      ["32", ['两个1点']],["33", ['两个2点']],["34", ['两个3点']],
      ["35", ['两个4点']],["36", ['两个5点']],["37", ['两个6点']],
      //12, 13, 14, 15, 16, 23, 24, 25, 26, 34, 35, 35, 45, 46, 56
      ["38", ['包含1,2点']],["39", ['包含1,3点']],["40", ['包含1,4点']],
      ["41", ['包含1,5点']],["42", ['包含1,6点']],["43", ['包含2,3点']],
      ["44", ['包含2,4点']],["45", ['包含2,5点']],["46", ['包含2,6点']],
      ["47", ['包含3,4点']],["48", ['包含3,5点']],["49", ['包含3,6点']],
      ["50", ['包含4,5点']],["51", ['包含4,6点']],["52", ['包含5,6点']],
      ["default", [""]]
    ])

    var nnList = []
    var replaceNN = (r) => {
      switch (rType) {
        case "bjl":
          var action = bjlMap.get(r) || bjlMap.get("default");
          break;
        case "nn":
          var action = nnMap.get(r) || nnMap.get("default");
          break;
        case "lh":
          var action = lhMap.get(r) || lhMap.get("default");
          break;
        case "tts":
          var action = ttsMap.get(r) || ttsMap.get("default");
          break;
        case "xjh":
          var action = xjhMap.get(r) || xjhMap.get("default");
          break;
        case "dx":
          var action = dxMap.get(r) || dxMap.get("default");
          break;
        // case "sg":
        //   var action = sgMap.get(r) || sgMap.get("default");
        //   break;
      }
      nnList?.push(action[0])
    }
    betnn.forEach((v, i, o)=>{
      replaceNN(v)
    })
    // 下注金额
    var nnBet = []
    for(let i = 0; i < nn.length; i++){
      nnBet.push(nn[i].split("^")[1])
    }
    let ret = []
    ret[0] = nnList // 注头名
    ret[1] = nnBet  // 注金额
    return ret
  },
   trasBetResult (strGame, str) {
    // 转换下注
    let mx = [];
    if (
      strGame != 'bjl' &&
      strGame != 'nn' &&
      strGame != 'lh' &&
      strGame != 'tts' &&
      strGame != 'xjh'
    )
      return str.split(' ') // casue of dx(want array got String), zike replace it (origin code: => return str;)
    if (strGame == 'bjl')
      var obj = { para0: '', para1: '', para2: '', para3: '', para4: '' }
    if (strGame == 'nn')
      var obj = {
        para0: '',
        para1: '',
        para2: '',
        para3: '',
        para4: '',
        para5: '',
        para6: '',
        para7: '',
        para8: '',
        para9: '',
        para10: '',
        para11: ''
      }
    if (strGame == 'lh')
      var obj = {
        para0: '',
        para1: '',
        para2: '',
        para3: '',
        para4: '',
        para5: '',
        para6: ''
      }
    if (strGame == 'tts')
      var obj = {
        para0: '',
        para1: '',
        para2: '',
        para3: '',
        para4: '',
        para5: '',
        para6: '',
        para7: '',
        para8: ''
      }
    if (strGame == 'xjh')
      var obj = {
        para0: '',
        para1: '',
        para2: '',
        para3: '',
        para4: '',
        para5: '',
        para6: '',
        para7: '',
        para8: ''
      }
    if (str != null) {
      var splitMx = str.split('$')
      let i = 0
      for (let item in obj) {
        for (let j in splitMx) {
          if (splitMx[j] != '') {
            var split2 = splitMx[j].split('^')
            if (split2[0] - 1 == i) obj[item] = split2[1] > 0 ? Number((parseFloat(split2[1])).toFixed(0)) : ''
          }
        }
        i++
      }
      mx.push(obj)
    }
    return mx
  },
   getTablePara (rType, para) {
    if (
      !rType ||
      rType == 'dx' ||
      rType == 'bjcs' ||
      rType == 'ssc' ||
      rType == 'jsk3'
    )
      return []
    var nn = [
      '庄翻倍1',
      '闲翻倍1',
      '庄平倍1',
      '闲平倍1',
      '庄翻倍2',
      '闲翻倍2',
      '庄平倍2',
      '闲平倍2',
      '庄翻倍3',
      '闲翻倍3',
      '庄平倍3',
      '闲平倍3'
    ]
    var bjl = ['庄', '和', '闲', '庄对', '闲对']
    var lh = ['龙', '和', '虎'] // ['龙', '和', '虎', '龙单', '龙双', '虎单', '虎双'];
    var tts = [
      '闲翻倍1',
      '闲平倍1',
      '闲翻倍2',
      '闲平倍2',
      '闲翻倍3',
      '闲平倍3',
      '闲翻倍4',
      '闲平倍4'
    ]
    var xjh = [
      '闲翻倍1',
      '闲平倍1',
      '闲翻倍2',
      '闲平倍2',
      '闲翻倍3',
      '闲平倍3',
      '闲翻倍4',
      '闲平倍4'
    ]
    var gt = rType == '' ? this.mx_game : rType
    if (rType != '') {
      var obj =
        gt == 'nn'
          ? nn
          : gt == 'bjl'
          ? bjl
          : gt == 'lh'
          ? lh
          : gt == 'dx'
          ? dx
          : gt == 'tts'
          ? tts
          : xjh
    } else {
      var obj =
        gt == '牛牛'
          ? nn
          : gt == '百家乐'
          ? bjl
          : gt == '龙虎'
          ? lh
          : gt == '大小'
          ? dx
          : gt == '推筒子'
          ? tts
          : xjh
    }
    let p = []
    let a = para[0]
    for (let j in para[0]) {
      p.push(a[j])
    }
    let arrPara = []
    for (var i in obj) {
      var obj2 = {}
      obj2.label = obj[i]
      obj2.prop = 'para' + i
      let w1 = this.getTextWidth(obj[i])
      let w2 = this.getTextWidth(p[i])
      obj2.width = (w1 > w2 ? w1 : w2) + 20
      arrPara.push(obj2)
    }
    return arrPara
  },
  /**
 * 使用span标签包裹内容，然后计算span的宽度 width： px
 * @param valArr
 */
 getTextWidth (str) {
  let width = 0
  let html = document.createElement('span')
  html.innerText = str
  html.className = 'getTextWidth'
  document.querySelector('body').appendChild(html)
  width = document.querySelector('.getTextWidth').offsetWidth
  document.querySelector('.getTextWidth').remove()
  return width
},
transGameStr (strGame) {
  // 游戏类型转换
  var msg = {
    bjl: '百家乐',
    lh: '龙虎',
    nn: '牛牛',
    xjh: '炸金花',
    dx: '大小',
    tts: '推筒子',
    ssc: '时时彩',
    jsk3: '江苏快3',
    bjcs: '北京赛车'
  }
  return msg[strGame]
},
transTime (times) {
  moment.suppressDeprecationWarnings = true;
  return moment(times).format('YYYY-MM-DD HH:mm:ss')
}
}
