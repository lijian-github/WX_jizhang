// miniprogram/pages/particulars/particulars.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showimg:false,
    ifupdate:false,

  },
  viewimg:function(e){
    wx.previewImage({
      urls: this.data.imglist,
      current: e.currentTarget.dataset.url
    });
  },
  edit:function(){
    var that=this
    wx:wx.navigateTo({
      url: './edit/edit',
      events:{
      someEvent: function (data) {
        that.setData({
          datalist:data,
          imglist:data.pictures,
          ifupdate:true
        })
      }
      },
      success: function(res) {
        res.eventChannel.emit('acceptDataFromOpenerPage', that.data.datalist)
      }
    })
  },
  del:function(){
    var that=this
    wx.showModal({
      title: '删除',
      content: '确认删除？',
      success: function (res) {
        if (res.confirm) {
          that.deldata()
          that.setData({
            ifupdate:true
          })
          wx.navigateBack({
          })
        }
        else if (res.cancel) {
          console.log("取消")
        }

      }
    })
  },
  deldata:function(){
    if (this.data.datalist.type == "支出") {
      var yindex = app.globalData.payclassify.findIndex(item => item.title == this.data.datalist.typeclassify)
      var yindex1 = app.globalData.payclassify[yindex].classify.findIndex(item => item.title == this.data.datalist.classify)
      var yindex2 = app.globalData.payclassify[yindex].classify[yindex1].list.findIndex(item => item == this.data.datalist)
      console.log(yindex, yindex1, yindex2)
      app.globalData.payclassify[yindex].classify[yindex1].list.splice(yindex2, 1)
      console.log("删除原来列表数据")
      var yzhcfindex = app.globalData.propertyclassify.findIndex(item => item.title == this.data.datalist.account)
      var yzhindex = app.globalData.propertyclassify[yzhcfindex].classify.findIndex(item => item.title == this.data.datalist.accountclassify)
      app.globalData.payclassify[yindex].classify[yindex1].money -= this.data.datalist.money
      app.globalData.payclassify[yindex].money -= this.data.datalist.money
      console.log("删除原来账户数据")
        if (this.data.datalist.account.indexOf("负债") != -1) {
          app.globalData.propertyclassify[yzhcfindex].money -= this.data.datalist.money
          app.globalData.propertyclassify[yzhcfindex].classify[yzhindex].money -= this.data.datalist.money
        } else {
          app.globalData.propertyclassify[yzhcfindex].money += this.data.datalist.money
          app.globalData.propertyclassify[yzhcfindex].classify[yzhindex].money += this.data.datalist.money
        }
      var updata = { payclassify: app.globalData.payclassify, paymoney: app.globalData.paymoney - this.data.datalist.money, property: app.globalData.property + this.data.datalist.money, propertyclassify: app.globalData.propertyclassify }
      app.onUpdate("defaultdata", app.globalData.dbid, updata)
    } else if (this.data.datalist.type == "收入") {
      var yindex = app.globalData.incomeclassify.findIndex(item => item.title == this.data.datalist.typeclassify)
      var yindex1 = app.globalData.incomeclassify[yindex].classify.findIndex(item => item.title == this.data.datalist.classify)
      var yindex2 = app.globalData.incomeclassify[yindex].classify[yindex1].list.findIndex(item => item == this.data.datalist)
      console.log(yindex, yindex1, yindex2)
      app.globalData.incomeclassify[yindex].classify[yindex1].list.splice(yindex2, 1)
      console.log("删除原来列表数据")
      var yzhcfindex = app.globalData.propertyclassify.findIndex(item => item.title == this.data.datalist.account)
      var yzhindex = app.globalData.propertyclassify[yzhcfindex].classify.findIndex(item => item.title == this.data.datalist.accountclassify)
      app.globalData.incomeclassify[yindex].classify[yindex1].money -= this.data.datalist.money
      app.globalData.incomeclassify[yindex].money -= this.data.datalist.money
      console.log("删除原来账户数据")
        if (this.data.datalist.account.indexOf("负债") != -1) {
          app.globalData.propertyclassify[yzhcfindex].money += this.data.datalist.money
          app.globalData.propertyclassify[yzhcfindex].classify[yzhindex].money += this.data.datalist.money
        } else {
          app.globalData.propertyclassify[yzhcfindex].money -= this.data.datalist.money
          app.globalData.propertyclassify[yzhcfindex].classify[yzhindex].money -= this.data.datalist.money
        }
      var updata = { incomeclassify: app.globalData.incomeclassify, incomemoney: app.globalData.incomemoney - this.data.datalist.money, property: app.globalData.property - this.data.datalist.money, propertyclassify: app.globalData.propertyclassify }
      app.onUpdate("defaultdata", app.globalData.dbid, updata)
      }
    else {
      var yindex = app.globalData.propertyclassify.findIndex(item => item.title == this.data.datalist.fkaccount)
      var yindex1 = app.globalData.propertyclassify[yindex].classify.findIndex(item => item.title == this.data.datalist.fkaccountclassify)
      var yindex2 = app.globalData.propertyclassify[yindex].classify[yindex1].list.findIndex(item => item == this.data.datalist)
      app.globalData.propertyclassify[yindex].classify[yindex1].list.splice(yindex2, 1)
      var yskindex = app.globalData.propertyclassify.findIndex(item => item.title == this.data.datalist.skaccount)
      var yskindex1 = app.globalData.propertyclassify[yindex].classify.findIndex(item => item.title == this.data.datalist.skaccountclassify)
      if (this.data.datalist.fkaccount.indexOf("负债") != -1) {
        app.globalData.propertyclassify[yindex].money -= this.data.datalist.money
        app.globalData.propertyclassify[yindex].classify[yindex1].money -= this.data.datalist.money
      } else {
        app.globalData.propertyclassify[yindex].money += this.data.datalist.money
        app.globalData.propertyclassify[yindex].classify[yindex1].money += this.data.datalist.money
      }
      if (this.data.datalist.skaccount.indexOf("负债") != -1) {
        app.globalData.propertyclassify[yskindex].money += this.data.datalist.money
        app.globalData.propertyclassify[yskindex].classify[yskindex1].money += this.data.datalist.money
      } else {
        app.globalData.propertyclassify[yskindex].money -= this.data.datalist.money
        app.globalData.propertyclassify[yskindex].classify[yskindex1].money -= this.data.datalist.money
      }
      var updata = { propertyclassify: app.globalData.propertyclassify }
      app.onUpdate("defaultdata", app.globalData.dbid, updata)
    }
    wx.cloud.deleteFile({
      fileList: this.data.datalist.pictures,
      success: res => {
        console.log('del', res.fileList)
      },
      fail: err => {
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that =this
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('acceptDataFromOpenerPage', function (data) {
      that.setData({
        datalist:data,
        imglist: data.pictures
      })
    })

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
    const eventChannel = this.getOpenerEventChannel()
    if (this.data.ifupdate){
      eventChannel.emit('someEvent', { update: true });
    }

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