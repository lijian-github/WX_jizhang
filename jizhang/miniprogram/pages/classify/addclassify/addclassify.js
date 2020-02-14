// miniprogram/pages/classify/addclassify/addclassify.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cfchoose:[],
    flname:'',
    index:0,
    imgid:'',
    iftop:false
  },
  getinput:function(e){
    this.setData({
      flname:e.detail.value
    })
  },
  switchtop:function(e){
      this.setData({
        iftop: e.detail.value
      })
  },
  chooselm:function(e){
    this.setData({
      index:e.detail.value
    })
  },
  chooseimg:function(){
    var that=this
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
    if (this.data.flname.length!=0){
    if (this.data.iftop){
      var newcf = { "classify":[], "icon": this.data.imgid, "title": this.data.flname,"money":0 }
      app.globalData[this.data.listid].push(newcf)
    }
    else {
      var newcf = { "icon": this.data.imgid,"title":this.data.flname,"money":0,"list":[]}
      app.globalData[this.data.listid][this.data.index].classify.push(newcf)
    }

      app.onUpdate("defaultdata", app.globalData.dbid, { [this.data.listid]: app.globalData[this.data.listid] })
      wx.navigateBack({
      })
    }
    else{
      wx.showToast({
        title: '请输入分类名称',
        icon:'none'
      })
    }
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
        cfchoose: app.globalData[data.listid],
        type:data.type,
        listid:data.listid
      })
      if (data.iftop!=null) {
        if (data.iftop){
        that.setData({
          iftop: data.iftop
        })
        }else{
          that.setData({
            iftop: data.iftop,
            index: data.index
          })
        }
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
    var that = this
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.emit('someEvent', { iftop: that.data.iftop,addindex:that.data.index });

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