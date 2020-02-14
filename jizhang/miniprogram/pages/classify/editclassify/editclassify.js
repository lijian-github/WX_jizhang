// miniprogram/pages/classify/editclassify/editclassify.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  getinput:function(e){
    this.setData({
      classifyname:e.detail.value
    })
  },
  chooselm: function (e) {
    this.setData({
      index: e.detail.value
    })
  },
  chooseimg: function () {
    var that = this
    wx.navigateTo({
      url: '../../icon/icon',
      events: {
        someEvent: function (data) {
          console.log(data.iconname)
          that.setData({
            imgid: data.iconname
          })
        }
      },
      success: function (res) {
      }
    })
  },
  save:function(){
    if (this.data.classifyname.length==0){
      wx.showToast({
        title: '请输入名称',
        icon:"none"
      })
    }else{
    if (this.data.iftop){
      this.data.showlist[this.data.index].title=this.data.classifyname
      this.data.showlist[this.data.index].icon=this.data.imgid
      app.globalData[this.data.listid] = this.data.showlist
      app.onUpdate("defaultdata", app.globalData.dbid, { [this.data.listid]: this.data.showlist})
    }
    else{
      if (this.data.index==this.data.editdata.classifyindex){
        this.data.showlist[this.data.editdata.classifyindex].classify[this.data.index2].title = this.data.classifyname
        this.data.showlist[this.data.editdata.classifyindex].classify[this.data.index2].icon = this.data.imgid
      }else{
        this.data.showlist[this.data.editdata.classifyindex].classify.splice(this.data.index2, 1)
        this.data.showlist[this.data.index].classify.unshift({ "icon": this.data.imgid, "title": this.data.classifyname })
      }
      console.log(this.data.showlist[this.data.index].classify)
      app.globalData.payclassify = this.data.showlist
      app.onUpdate("defaultdata", app.globalData.dbid, { [this.data.listid]: this.data.showlist })
    }
    }
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
      console.log(data)
      that.setData({
        showlist: app.globalData[data.listid],
        listid:data.listid
      })
        if (data.iftop){
          that.setData({
            editdata:data,
            type: data.type,
            classifyname: that.data.showlist[data.classifyindex].title,
            imgid: that.data.showlist[data.classifyindex].icon,
            iftop: data.iftop,
            index:data.classifyindex
          })
        }
        else{
          that.setData({
            editdata:data,
            type: data.type,
            classifyname: that.data.showlist[data.classifyindex].classify[data.index].title,
            imgid: that.data.showlist[data.classifyindex].classify[data.index].icon,
            iftop: data.iftop,
            index: data.classifyindex,
            index2:data.index
          })
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
    var that=this
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.emit('someEvent', { iftop: that.data.iftop });
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