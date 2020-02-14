// miniprogram/pages/tabbar/tabbar.js
const app=getApp()
Page({

  data: {
    PageCur: 'home',
    ifnew: app.globalData.ifnew
  },
  NavChange(e) {
    this.setData({
      PageCur: e.currentTarget.dataset.cur
    })
    wx.setNavigationBarTitle({
      title: e.currentTarget.dataset.name
    })
  },
  create:function(){
    var that=this
    wx.showLoading({
      title: '正在开启',
      mask: true
    })
    var obj=function(res){
      that.setData({
        ifnew:false,
        dbid:res._id
      })
      app.onQuery("defaultdata", {
        '_openid': app.globalData.openid
      })
    }
    app.onAdd("defaultdata", app.globalData.defaultdata,obj)
  },
  setnew: function (res) {
    wx.hideLoading()
    if (res.length==0){
      this.setData({
        ifnew:true
      })
    }else{
      this.setData({
        ifnew: false
      })
    }
  },
  onGetOpenid: function () {
    wx.showLoading({
      title: '正在加载',
      mask: true
    })
    // 调用云函数
    var that=this
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        app.globalData.openid = res.result.openid
        app.onQuery("defaultdata", {
          '_openid': res.result.openid
        },that.setnew)
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
      }
    })
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title:"首页"
    })
    this.onGetOpenid()
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