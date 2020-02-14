// pages/home/index/index.js
const app=getApp()
Component({

  options: {
    addGlobalClass: true
  },
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    todaypay:0,
    monthpay:0,
    allpay:0

  },

  /**
   * 组件的方法列表
   */
  methods: {
    jiyibi(){
      var that=this
      wx.navigateTo({
        url: '../home/jiyibi/jiyibi',
        events: {
          someEvent: function () {
            that.getshowlist()
          }
        }
      })
    },
    getshowlist() {
      var d = new Date()
      var nowstamp = d.getTime()
      var day = d.getDate();
      var month = (d.getMonth() + 1)
      var year = d.getFullYear()
      var allshowlist = []
      var showlist=[]
      var alllist = this.data.payclassify.concat(this.data.incomeclassify, this.data.propertyclassify)
      var todaypay=0,monthpay=0,allpay=0
      for (var i in alllist) {
        for (var j in alllist[i].classify) {
          for (var k in alllist[i].classify[j].list) {//只显示最近7天
            if (Math.ceil((nowstamp - alllist[i].classify[j].list[k].timestamp) / (1000 * 60 * 60 * 24)) <= 7) {
              showlist.push(alllist[i].classify[j].list[k])
            }
            allshowlist.push(alllist[i].classify[j].list[k])
          }
        }
      }
      showlist.sort((a, b) => {
        return a.timestamp < b.timestamp ? 1 : -1;
      })
      for (var i in allshowlist){
        if(allshowlist[i].type=="支出"){
          if (parseInt(allshowlist[i].date.day) == day) {
            todaypay += allshowlist[i].money
          }
          if (parseInt(allshowlist[i].date.month) == month) {
            monthpay += allshowlist[i].money
          }
          allpay += allshowlist[i].money
        }
      }
      this.setData({
        showlist: showlist,
        todaypay:todaypay,
        monthpay:monthpay,
        allpay:allpay
      })
    },
    getparticulars(e){
      var that = this
      console.log(this.data.showlist[e.currentTarget.dataset.index])
      wx.navigateTo({
        url: '../particulars/particulars',
        events:{
          someEvent: function (data) {
            that.getshowlist()
          }
        },
        success: function(res) {
          res.eventChannel.emit('acceptDataFromOpenerPage', that.data.showlist[e.currentTarget.dataset.index])
        }
      })
    }

  },
  attached:function(){//组件钩子
    if (this.data.payclassify == null || this.data.incomeclassify == null || this.data.propertyclassify == null){
      if (app.globalData.payclassify != null && app.globalData.incomeclassify != null && app.globalData.propertyclassify != null) {
      this.setData({
        payclassify: app.globalData.payclassify,
        incomeclassify: app.globalData.incomeclassify,
        propertyclassify: app.globalData.propertyclassify,
        selbg:app.globalData.selbg
        })

        this.getshowlist()

    }
    else {
      app.querycallback = res => {
        console.log("app.js onQuery回调函数")
        this.setData({
          payclassify: res[0].payclassify,
          incomeclassify: res[0].incomeclassify,
          propertyclassify: res[0].propertyclassify,
          selbg: res[0].selbg
        })
        this.getshowlist()
      }
    }
  }
  }
})
