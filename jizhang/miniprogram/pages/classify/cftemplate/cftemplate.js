const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showlist: [],
    type: '',
    listid:'',
    iftop: false,
  },
  bindadd: function () {
    var that = this
    wx.navigateTo({
      url: '../addclassify/addclassify',
      events: {
        someEvent: function (data) {//完成回此页面刷新数据
          if (that.data.iftop) {
            that.setData({
              showlist: app.globalData[that.data.listid]
            })
          } else {
            if (data.addindex == that.data.classifyindex) {
              that.setData({
                showlist: app.globalData[that.data.listid][that.data.classifyindex].classify
              })
            }
          }
        }
      }
      ,
      success: function (res) {
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('acceptDataFromOpenerPage', { type: that.data.type, listid: that.data.listid, iftop: that.data.iftop, index: that.data.classifyindex })
      }
    })

  },
  binditem: function (e) {
    var that = this
    if (this.data.iftop) {
      var that = this
      wx.navigateTo({
        url: './cftemplate', events: {
          someEvent: function () {
            that.setData({
              showlist: app.globalData[that.data.listid],
            })
            that.getbar()
          }
        },
        success: function (res) {
          // 通过eventChannel向被打开页面传送数据
          res.eventChannel.emit('acceptDataFromOpenerPage', { iftop: false, type: that.data.type, index: e.currentTarget.dataset.index,listid:that.data.listid })
        }
      })
    }
  },

  bindedit: function (e) {
    var that = this
    console.log(e.currentTarget.dataset.index)
    wx.navigateTo({
      url: '../editclassify/editclassify',
      events: {
        someEvent: function (data) {//编辑完成回此页面刷新数据
          if (data.iftop) {
            that.setData({
              showlist: app.globalData[that.data.listid]
            })
          } else {
            that.setData({
              showlist: app.globalData[that.data.listid][that.data.classifyindex].classify
            })
          }
        }
      },
      success: function (res) {
        // 通过eventChannel向被打开页面传送数据
        if (that.data.iftop) {
          res.eventChannel.emit('acceptDataFromOpenerPage', { iftop: that.data.iftop, classifyindex: e.currentTarget.dataset.index, type: that.data.type, listid: that.data.listid })
        }
        else {
          res.eventChannel.emit('acceptDataFromOpenerPage', { iftop: that.data.iftop, classifyindex: that.data.classifyindex, index: e.currentTarget.dataset.index, type: that.data.type, listid: that.data.listid })
        }
      }
    })
  },
  binddel: function (e) {
    console.log(e.currentTarget.dataset.index)
    var that=this
    if (that.data.iftop){
      wx.showModal({
        title: '删除',
        content: '删除类目会清除类目下所有分类及与其关联的账单，确定删除？',
        success: function (res) {
          if (res.confirm) {
            that.deldata(that.data.showlist, e.currentTarget.dataset.index)
          }
          else if (res.cancel) {
            console.log("取消")
          }

        }
      })

    }else{
    wx.showModal({
      title: '删除',
      content: '删除分类会删除与其关联的账单，确认删除？',
      success: function (res) {
        that.deldata(that.data.showlist, e.currentTarget.dataset.index)
      }
    })
    }
  },
  deldata: function (data, index) {//删除分类
    var updatedata={}
      if(this.data.type=="支出"||this.data.type=="收入"){
        if (this.data.iftop){
        for (var i in data[index].classify){
          for (var j=0;j<data[index].classify[i].list.length;j++){
            this.dellistdata(data[index].classify[i].list[j])
            j--
          }
        }
        }else{
          for (var i=0;i<data[index].list.length;i++){
            console.log(data[index].list[i])
            this.dellistdata(data[index].list[i])
            i--
          }
        }
      }
      if (this.data.type == "资产"){
        var title=data[index].title
        var accountname=''
        if (this.data.iftop) {
          accountname ="account"
        }else{
          accountname ="accountclassify"
        }
        for (var i in app.globalData.payclassify){
          for (var j in app.globalData.payclassify[i].classify){
            for (var k = 0; k < app.globalData.payclassify[i].classify[j].list.length; k++){
              if (app.globalData.payclassify[i].classify[j].list[k][accountname]==title){
                this.dellistdata(app.globalData.payclassify[i].classify[j].list[k])
                k--
              }
            }
          }
        }
        for (var i in app.globalData.incomeclassify) {
          for (var j in app.globalData.incomeclassify[i].classify) {
            for (var k=0;k<app.globalData.incomeclassify[i].classify[j].list.length;k++) {
              if (app.globalData.incomeclassify[i].classify[j].list[k][accountname] == title) {
                this.dellistdata(app.globalData.incomeclassify[i].classify[j].list[k])
                k --
              }
            }
          }
        }
        for (var i in app.globalData.propertyclassify) {
          for (var j in app.globalData.propertyclassify[i].classify) {
            for (var k = 0; k < app.globalData.propertyclassify[i].classify[j].list.length; k++) {
              if (app.globalData.propertyclassify[i].classify[j].list[k][accountname] == title) {
                this.dellistdata(app.globalData.propertyclassify[i].classify[j].list[k])
                k --
              }
            }
          }
        }
    }
    updatedata = { payclassify: app.globalData.payclassify, incomeclassify: app.globalData.incomeclassify, incomemoney: app.globalData.incomemoney, paymoney: app.globalData.paymoney, property: app.globalData.property, propertyclassify: app.globalData.propertyclassify }
    data.splice(index, 1)
    this.setData({
      showlist:data
    })
    this.getbar()
    app.onUpdate("defaultdata", app.globalData.dbid, updatedata)
  },
  dellistdata: function (datalist) {//删除账单数据///修改
    if (datalist.type == "支出") {
      var yindex = app.globalData.payclassify.findIndex(item => item.title == datalist.typeclassify)
      var yindex1 = app.globalData.payclassify[yindex].classify.findIndex(item => item.title == datalist.classify)
      var yindex2 = app.globalData.payclassify[yindex].classify[yindex1].list.findIndex(item => item == datalist)
      var yzhcfindex = app.globalData.propertyclassify.findIndex(item => item.title == datalist.account)
      var yzhindex = app.globalData.propertyclassify[yzhcfindex].classify.findIndex(item => item.title == datalist.accountclassify)
      app.globalData.payclassify[yindex].classify[yindex1].money -= datalist.money
      app.globalData.payclassify[yindex].money -= datalist.money
      console.log("删除原来账户数据")
      if (datalist.account.indexOf("负债") != -1) {
        app.globalData.propertyclassify[yzhcfindex].money -= datalist.money
        app.globalData.propertyclassify[yzhcfindex].classify[yzhindex].money -= datalist.money
      } else {
        app.globalData.propertyclassify[yzhcfindex].money += datalist.money
        app.globalData.propertyclassify[yzhcfindex].classify[yzhindex].money += datalist.money
      }
      app.globalData.paymoney -= datalist.money
      app.globalData.property += datalist.money
      app.globalData.payclassify[yindex].classify[yindex1].list.splice(yindex2, 1)
      console.log("删除原来列表数据")
    } else if (datalist.type == "收入") {
      var yindex = app.globalData.incomeclassify.findIndex(item => item.title == datalist.typeclassify)
      var yindex1 = app.globalData.incomeclassify[yindex].classify.findIndex(item => item.title == datalist.classify)
      var yindex2 = app.globalData.incomeclassify[yindex].classify[yindex1].list.findIndex(item => item == datalist)
      console.log(yindex, yindex1, yindex2)
      var yzhcfindex = app.globalData.propertyclassify.findIndex(item => item.title == datalist.account)
      var yzhindex = app.globalData.propertyclassify[yzhcfindex].classify.findIndex(item => item.title == datalist.accountclassify)
      app.globalData.incomeclassify[yindex].classify[yindex1].money -= datalist.money
      app.globalData.incomeclassify[yindex].money -= datalist.money
      console.log("删除原来账户数据")
      if (datalist.account.indexOf("负债") != -1) {
        app.globalData.propertyclassify[yzhcfindex].money += datalist.money
        app.globalData.propertyclassify[yzhcfindex].classify[yzhindex].money += datalist.money
      } else {
        app.globalData.propertyclassify[yzhcfindex].money -= datalist.money
        app.globalData.propertyclassify[yzhcfindex].classify[yzhindex].money -= datalist.money
      }
      app.globalData.incomemoney -= datalist.money
      app.globalData.property -= datalist.money
      app.globalData.incomeclassify[yindex].classify[yindex1].list.splice(yindex2, 1)
      console.log("删除原来列表数据")
    }
    else {
      var yindex = app.globalData.propertyclassify.findIndex(item => item.title == datalist.fkaccount)
      var yindex1 = app.globalData.propertyclassify[yindex].classify.findIndex(item => item.title == datalist.fkaccountclassify)
      var yindex2 = app.globalData.propertyclassify[yindex].classify[yindex1].list.findIndex(item => item == datalist)
      var yskindex = app.globalData.propertyclassify.findIndex(item => item.title == datalist.skaccount)
      var yskindex1 = app.globalData.propertyclassify[yindex].classify.findIndex(item => item.title == datalist.skaccountclassify)
      if (datalist.fkaccount.indexOf("负债") != -1) {
        app.globalData.propertyclassify[yindex].money -= datalist.money
        app.globalData.propertyclassify[yindex].classify[yindex1].money -= datalist.money
      } else {
        app.globalData.propertyclassify[yindex].money += datalist.money
        app.globalData.propertyclassify[yindex].classify[yindex1].money += datalist.money
      }
      if (datalist.skaccount.indexOf("负债") != -1) {
        app.globalData.propertyclassify[yskindex].money += datalist.money
        app.globalData.propertyclassify[yskindex].classify[yskindex1].money += datalist.money
      } else {
        app.globalData.propertyclassify[yskindex].money -= datalist.money
        app.globalData.propertyclassify[yskindex].classify[yskindex1].money -= datalist.money
      }
      app.globalData.propertyclassify[yindex].classify[yindex1].list.splice(yindex2, 1)
    }
    wx.cloud.deleteFile({
      fileList: datalist.pictures,
      success: res => {
        console.log('delimg', res.fileList)
      },
      fail: err => {
      }
    })
  },

  // ListTouch触摸开始
  ListTouchStart(e) {
    this.setData({
      ListTouchStart: e.touches[0].pageX
    })
  },

  // ListTouch计算方向
  ListTouchMove(e) {
    this.setData({
      ListTouchDirection: e.touches[0].pageX - this.data.ListTouchStart > 0 ? 'right' : 'left'
    })
  },

  // ListTouch计算滚动
  ListTouchEnd(e) {
    if (this.data.ListTouchDirection == 'left') {
      this.setData({
        modalName: e.currentTarget.dataset.target
      })
    } else {
      this.setData({
        modalName: null
      })
    }
    this.setData({
      ListTouchDirection: null
    })
  },
  getbar:function(){

    var d = new Date()
    var nowstamp = d.getTime()
    var month = (d.getMonth() + 1)
    var year = d.getFullYear()
    var qian1 = 0, qian2 = 0, qian3 = 0
    var alllist = []
    for (var i in app.globalData[this.data.listid]) {
      if (this.data.type == "资产") {
        qian2 += app.globalData[this.data.listid][i].money
        if (app.globalData[this.data.listid][i].title.indexOf("负债") != -1) {
          qian3 += app.globalData[this.data.listid][i].money
        }
        qian1 = qian2 - qian3
      } else {
        for (var j in app.globalData[this.data.listid][i].classify) {
          alllist = alllist.concat(app.globalData[this.data.listid][i].classify[j].list)
        }
      }
    }
    if (alllist != []) {
      for (var i in alllist) {
        if (parseInt(alllist[i].date.month) == month) {
          qian1 += alllist[i].money
        }
        if (parseInt(alllist[i].date.year) == year) {
          qian2 += alllist[i].money
        }
        qian3 += alllist[i].money
      }
    }
    this.setData({
      qian1: qian1,
      qian2: qian2,
      qian3: qian3
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('acceptDataFromOpenerPage', function (data) {
      
      console.log(data, app.globalData[data.listid])
        that.setData({
          type: data.type,
          listid:data.listid
        })

        if (data.iftop) {
          that.setData({
            showlist: app.globalData[data.listid],
            iftop: true
          })
          wx.setNavigationBarTitle({
            title: data.type + '分类'
          })
        }
        else {
          that.setData({
            showlist: app.globalData[data.listid][data.index].classify,
            classifyindex: data.index,
            iftop: false
          })
          wx.setNavigationBarTitle({
            title: app.globalData[data.listid][data.index].title + '分类'
          })
        }
    })
    this.getbar()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    var that = this
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.emit('someEvent');
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})