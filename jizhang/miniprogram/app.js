//app.js
var defaultdata = require("/data/defaultdata.js")
App({
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        env: 'lijianstudy-q1',
        traceUser: true,
      })
    }
  }
  ,
  onAdd: function (colname,adddata,obj) {
    var that=this
    const db = wx.cloud.database()
    var result=''
    db.collection(colname).add({
      data: adddata,
      success: res => {
        // 在返回结果中会包含新创建的记录的 _id
        wx.showToast({
          title: '开启成功',
        })
        if (obj != null) {
          obj(res)
        }
        that.globalData.dbid(res._id)
        that.globalData.ifnew=false
        
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '开启失败,请检查网路'
        })
        console.log('[数据库] [新增记录] 失败：', err)
      }
    })
  }
  ,
  onQuery: function (colname,query,obj) {
    var that=this
    const db = wx.cloud.database()
    // 查询当前用户所有的 counters
    db.collection(colname).where(query).get({
      success: res => {
        if (obj!=null){
          obj(res.data)
        }
        if (res.data.length == 0) {
          that.globalData.ifnew = true
        }else{
          that.globalData.ifnew = false
        }
        that.globalData.dbid = res.data[0]._id
        that.globalData.myData = res.data[0]
        that.globalData.paymoney = res.data[0].paymoney
        that.globalData.incomemoney = res.data[0].incomemoney
        that.globalData.property = res.data[0].property
        that.globalData.payclassify = res.data[0].payclassify
        that.globalData.incomeclassify = res.data[0].incomeclassify
        that.globalData.propertyclassify = res.data[0].propertyclassify
        that.globalData.bglist = res.data[0].bglist
        that.globalData.selbg = res.data[0].selbg
        console.log('appjs',that.globalData.payclassify)
        if (that.querycallback) {
          that.querycallback(res.data)
        }
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
        console.error('[数据库] [查询记录] 失败：', err)
      }
    })
  }, 
  onUpdate: function (colname,whichid, adddata) {
    var that = this
    const db = wx.cloud.database()
    var result = ''
    db.collection(colname).doc(whichid).update({
      data: adddata,
      success: res => {
        // 在返回结果中会包含新创建的记录的 _id
        wx.showToast({
          title: '更新记录成功',
        })
        console.log('[数据库] [更新记录] 成功，记录 _id: ', res)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '记录失败'
        })
        console.log('[数据库] [更新记录] 失败：', err)
      }
    })
  }
  ,
  globalData:{
    defaultdata: defaultdata.defaultdata,
    ifnew:false,
    payclassify:null,
    dbid:''
  }
})
