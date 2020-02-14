// miniprogram/pages/person/homebg/homebg.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bglist: []

  },
  viewimg: function (e) {
    wx.previewImage({
      urls: this.data.bglist,
      current: e.currentTarget.dataset.url
    });
  },
  selectbg:function(e){
    this.setData({
      selbg: e.currentTarget.dataset.url
    })
  },
  suresel:function(){
    app.globalData.selbg=this.data.selbg
    var updata = { selbg: this.data.selbg}
    wx.showLoading({
      title: '设置中',
    })
    app.onUpdate("defaultdata", app.globalData.dbid, updata)

    setTimeout(function () {
      wx.navigateBack({
      })
    }, 1000);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      bglist: app.globalData.bglist,
      selbg: app.globalData.selbg
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