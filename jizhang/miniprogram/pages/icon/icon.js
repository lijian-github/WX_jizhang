// miniprogram/pages/icon/icon.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    iconlist: [{ 'iconname': 'baobao', 'isShow': 1 }, { 'iconname': 'jijin', 'isShow': 1 }, { 'iconname': 'weibiaoti1', 'isShow': 1 }, { 'iconname': 'gupiao', 'isShow': 1 }, { 'iconname': 'dache', 'isShow': 1 }, { 'iconname': 'baojian', 'isShow': 1 }, { 'iconname': 'peixun', 'isShow': 1 }, { 'iconname': 'jinron', 'isShow': 1 }, { 'iconname': 'zulincuijiaotixing', 'isShow': 1 }, { 'iconname': 'nongyeyinxing', 'isShow': 1 }, { 'iconname': 'ditie', 'isShow': 1 }, { 'iconname': 'baoxian', 'isShow': 1 }, { 'iconname': 'xiezi', 'isShow': 1 }, { 'iconname': 'jinbi', 'isShow': 1 }, { 'iconname': 'gold', 'isShow': 1 }, { 'iconname': 'changyonglogo02', 'isShow': 1 }, { 'iconname': 'changyonglogo04', 'isShow': 1 }, { 'iconname': 'changyonglogo05', 'isShow': 1 }, { 'iconname': 'changyonglogo07', 'isShow': 1 }, { 'iconname': 'changyonglogo10', 'isShow': 1 }, { 'iconname': 'changyonglogo11', 'isShow': 1 }, { 'iconname': 'changyonglogo14', 'isShow': 1 }, { 'iconname': 'changyonglogo01', 'isShow': 1 }, { 'iconname': 'changyonglogo08', 'isShow': 1 }, { 'iconname': 'changyonglogo17', 'isShow': 1 }, { 'iconname': 'changyonglogo09', 'isShow': 1 }, { 'iconname': 'changyonglogo141', 'isShow': 1 }, { 'iconname': 'changyonglogo16', 'isShow': 1 }, { 'iconname': 'changyonglogo19', 'isShow': 1 }, { 'iconname': 'changyonglogo20', 'isShow': 1 }, { 'iconname': 'changyonglogo21', 'isShow': 1 }, { 'iconname': 'changyonglogo23', 'isShow': 1 }, { 'iconname': 'changyonglogo24', 'isShow': 1 }, { 'iconname': 'jinbi1', 'isShow': 1 }, { 'iconname': 'jijin1', 'isShow': 1 }, { 'iconname': 'yuebao', 'isShow': 1 }, { 'iconname': 'cunkuanlixi', 'isShow': 1 }, { 'iconname': 'jijinchanpinzixun', 'isShow': 1 }, { 'iconname': 'shaokao', 'isShow': 1 }, { 'iconname': 'mianmo', 'isShow': 1 }, { 'iconname': 'phone', 'isShow': 1 }, { 'iconname': 'chashui', 'isShow': 1 }, { 'iconname': 'jiaban', 'isShow': 1 }, { 'iconname': 'CombinedShape', 'isShow': 1 }, { 'iconname': 'touzizhongxin', 'isShow': 1 }, { 'iconname': 'jieru', 'isShow': 1 }, { 'iconname': 'jiechu', 'isShow': 1 }, { 'iconname': 'mayihuabei', 'isShow': 1 }, { 'iconname': 'jingdongbaitiao', 'isShow': 1 }, { 'iconname': 'xinyongqia', 'isShow': 1 }, { 'iconname': 'yinhangqia', 'isShow': 1 }, { 'iconname': 'weixinzhifu', 'isShow': 1 }, { 'iconname': 'chuzhiqia', 'isShow': 1 }, { 'iconname': 'yaopin', 'isShow': 1 }, { 'iconname': 'fangzu', 'isShow': 1 }, { 'iconname': 'taobao', 'isShow': 1 }, { 'iconname': 'yinpin', 'isShow': 1 }, { 'iconname': 'hongbao', 'isShow': 1 }, { 'iconname': 'huazhuangpin', 'isShow': 1 }, { 'iconname': 'dianying', 'isShow': 1 }, { 'iconname': 'yiwu', 'isShow': 1 }, { 'iconname': 'shuiguo', 'isShow': 1 }, { 'iconname': 'riyongpin', 'isShow': 1 }, { 'iconname': 'maicai', 'isShow': 1 }, { 'iconname': 'lingshi', 'isShow': 1 }, { 'iconname': 'yiban', 'isShow': 1 }, { 'iconname': 'canyin', 'isShow': 1 }, { 'iconname': 'jiaotong', 'isShow': 1 }, { 'iconname': 'bianji', 'isShow': 1 }, { 'iconname': 'lvyoudujia', 'isShow': 1 }, { 'iconname': 'chongwu', 'isShow': 1 }, { 'iconname': 'xiuliweihu', 'isShow': 1 }, { 'iconname': 'liwu', 'isShow': 1 }, { 'iconname': 'youxi', 'isShow': 1 }, { 'iconname': 'shujijiaocai', 'isShow': 1 }, { 'iconname': 'qicheyongpin', 'isShow': 1 }, { 'iconname': 'jiaju', 'isShow': 1 }, { 'iconname': 'yundong', 'isShow': 1 }, { 'iconname': 'jiadian', 'isShow': 1 }, { 'iconname': 'jiaoyu', 'isShow': 1 }, { 'iconname': 'yule', 'isShow': 1 }, { 'iconname': 'hunyinlianai', 'isShow': 1 }, { 'iconname': 'yinleyule', 'isShow': 1 }, { 'iconname': 'shumachanpin', 'isShow': 1 }, { 'iconname': 'yuer', 'isShow': 1 }, { 'iconname': 'yexiao', 'isShow': 1 }, { 'iconname': 'zhongjiang', 'isShow': 1 }, { 'iconname': 'diannao', 'isShow': 1 }, { 'iconname': 'yiliao', 'isShow': 1 }, { 'iconname': 'kouhong', 'isShow': 1 }, { 'iconname': 'kuzi', 'isShow': 1 }],
    choose:''


  },
  searchIcon(e) {
    let key = e.detail.value.toLowerCase();
    let list = this.data.iconlist;
    for (let i = 0; i < list.length; i++) {
      let a = key;
      let b = list[i].iconname.toLowerCase();
      if (b.search(a) != -1) {
        list[i].isShow = 1
      } else {
        list[i].isShow = 0
      }
    }
    this.setData({
      iconlist: list
    })
  }
,
  geticon:function(e){
    this.setData({
      choose: e.currentTarget.dataset.name
    })
    wx.navigateBack({
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    eventChannel.emit('someEvent', { iconname:that.data.choose});
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