/* eslint-disable */
import store from '@/store/index'
import $Global from '@/api/global'

export function deepSort(datas, dataArray) {
  for (let j = 0; j < dataArray.length; j++) {
    let dataArrayIndex = dataArray[j]
    let childrenArray = []
    let Id = dataArrayIndex.Id
    for (let i = 0; i < datas.length; i++) {
      let data = datas[i]
      let pid = data.pid
      if (pid == Id) {
        // 判断是否为儿子节点
        let objTemp = {
          Id: data.Id,
          name: data.name,
          gx: data.gx,
          pid: pid,
          xmb_s: data.xmb_s,
          xmb_d: data.xmb_d
        }
        childrenArray.push(objTemp)
      }
    }
    dataArrayIndex.children = childrenArray
    if (childrenArray.length > 0) {
      // 有子节点则递归
      deepSort(datas, childrenArray)
    }
  }
  let treeData = dataArray // treeData
  store.state.ht.newTreeData = treeData
  return dataArray
}


export function  getData(data) {
  var content = data.tableData
  for (var i = 0; i < content.length; i++) {
    var d = content[i].gx.split('^')
    var dd = d[d.length - 2]
    content[i].pid = dd // 上家的id
    content[i].children = []
  }
  let dataArray = []
  content.forEach(function(data) {
    let pid = data.pid
    if (data.Id == $Global.optioner.Id) {
      let objTemp = {
        Id: data.Id,
        name: data.name,
        gx: data.gx,
        pid: pid,
        xmb_s: data.xmb_s,
        xmb_d: data.xmb_d
      }
      dataArray.push(objTemp)
    }
  })
  deepSort(content, dataArray)
}

export function setTreeData(treeData, JsonData) {
  store.commit('ht/setTreeData', treeData)
  // 抽离id, name, gx, pid(用于显示表格里的关系)
  store.commit('ht/setAgentAllInfo', JsonData)
}

export function searchRelatnNew(value) {
  if (value === '') return
  // this.expandedData = []
  // this.expandedData.push(value)
  let re = findPatentValue(store.state.ht.newTreeData, value)
  if (re != null) {
    store.commit('ht/setRelations', re)
  }
}

export function findPatentValue(array, value, valueName = 'name', childrenName = 'children') {
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
}