const app=getApp()
Component({
  options: {
    addGlobalClass: true,
  },
  data: {
   
  },
  attached() {
  },
  methods: {
    srflgl () {
      wx.navigateTo({
        url: '../classify/cftemplate/cftemplate',
        success: function (res) {
          // 通过eventChannel向被打开页面传送数据
          res.eventChannel.emit('acceptDataFromOpenerPage', { iftop: true, type: "收入", listid:"incomeclassify" })
        }
      })
    },
    zcflgl(){
      wx.navigateTo({
        url: '../classify/cftemplate/cftemplate',
        success: function (res) {
          // 通过eventChannel向被打开页面传送数据
          res.eventChannel.emit('acceptDataFromOpenerPage', { iftop: true, type: "支出", listid:"payclassify" })
        }
      })

    },
    zhflgl(){
      wx.navigateTo({
        url: '../classify/cftemplate/cftemplate',
        success: function (res) {
          // 通过eventChannel向被打开页面传送数据
          res.eventChannel.emit('acceptDataFromOpenerPage', { iftop: true, type: "资产", listid: "propertyclassify" })
        }
      })
    },
    showQrcode(){
        wx.previewImage({
          urls: ['cloud://lijianstudy-q1.6c69-lijianstudy-q1/zsm.jpg']
        });
    },
    cleardata(){
      wx.showModal({
        title: '清除所有数据',
        content: '清除所有数据恢复到首次使用状态，确定清除？',
        success: function (res) {
          if (res.confirm) {
            app.globalData.myData = app.globalData.defaultdata
            app.globalData.paymoney = app.globalData.defaultdata.paymoney
            app.globalData.incomemoney = app.globalData.defaultdata.incomemoney
            app.globalData.property = app.globalData.defaultdata.property
            app.globalData.payclassify = app.globalData.defaultdata.payclassify
            app.globalData.incomeclassify = app.globalData.defaultdata.incomeclassify
            app.globalData.propertyclassify = app.globalData.defaultdata.propertyclassify
            app.globalData.bglist = app.globalData.defaultdata.bglist
            app.globalData.selbg = app.globalData.defaultdata.selbg
            app.onUpdate("defaultdata", app.globalData.dbid, app.globalData.defaultdata)
          }
          else if (res.cancel) {
            console.log("取消")
          }

        }
      })
    }

    },
  
})