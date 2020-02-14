// miniprogram/pages/classify/classifylist/classifylist.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showlist: null

  },
  choosecf:function(e){
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.emit('someEvent', e.currentTarget.dataset)
    wx.navigateBack({
      
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('acceptDataFromOpenerPage', function (data) {
      that.setData({
        showlist: app.globalData[data.listid],
        listid:data.listid
      })
    })
  },
  addclassify: function () {
    var that = this
    wx.navigateTo({
      url: '../../classify/addclassify/addclassify',
      events: {
        someEvent: function (data) {
          that.setData({
            showlist: app.globalData[that.data.listid]
          })
        }
      },
      success: function (res) {
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('acceptDataFromOpenerPage', { cfchoose: that.data.showlist, listid: that.data.listid })
      }
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