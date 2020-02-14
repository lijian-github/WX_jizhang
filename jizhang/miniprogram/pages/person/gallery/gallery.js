// miniprogram/pages/person/gallery/gallery.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  showdata:function(e){
    wx.navigateTo({
      url: '../../particulars/particulars',
      events: {
        someEvent: function (data) {
          that.getallimg()
        }
      },
      success: function (res) {
        res.eventChannel.emit('acceptDataFromOpenerPage', e.currentTarget.dataset.list)
      }
    })
  },
  viewimg: function (e) {
    wx.previewImage({
      urls: e.currentTarget.dataset.urls,
      current: e.currentTarget.dataset.url
    });
  },
  getallimg:function(){
    if (app.globalData.payclassify != null && app.globalData.incomeclassify != null && app.globalData.propertyclassify != null) {
      this.setData({
        payclassify: app.globalData.payclassify,
        incomeclassify: app.globalData.incomeclassify,
        propertyclassify: app.globalData.propertyclassify
      })}
    var alldata = [].concat(this.data.payclassify,this.data.incomeclassify,this.data.propertyclassify)
    var allimgsdata=[]
    for (var i in alldata){
      for (var j in alldata[i].classify){
        if (alldata[i].classify[j].list.length!=0){
          for (var k in alldata[i].classify[j].list){
            if (alldata[i].classify[j].list[k].pictures.length!=0){
              allimgsdata.push(alldata[i].classify[j].list[k])
            }
          }
        }
      }
    }
    allimgsdata.sort((a, b) => {
      return a.timestamp < b.timestamp ? 1 : -1;
    })
    this.setData({
      allimgsdata: allimgsdata
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.getallimg()

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