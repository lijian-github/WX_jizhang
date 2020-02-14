// miniprogram/pages/detail/filter/filter.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    monthcount: 31,
    lmonthcount: 31,
    fwd: 0,
    modalName: '',
    sort: '由近到远',
    sure: false,
    date:"2019-8"
  },


  getlastmonth: function() {
    var lmonth = this.data.month - 1
    if (lmonth == 0) {
      this.data.year -= 1
      lmonth = 12
    }
    this.getcalendar(this.data.year, lmonth)
  },
  getnextmonth:function() {
    var nmonth = this.data.month + 1
    if (nmonth == 13) {
      this.data.year += 1
      nmonth = 1
    }
    this.getcalendar(this.data.year, nmonth)
  },
  choosedate: function(e) {

    this.setData({
      cdate: e.currentTarget.dataset.date
    })
  },
  chooselmdate: function(e) {
    this.getlastmonth()
    this.setData({
      cdate: e.currentTarget.dataset.ldate
    })
  },
  choosenmdate: function(e) {
    this.getnextmonth()
    this.setData({
      cdate: e.currentTarget.dataset.ndate
    })
  },
  DateChange:function(e) {
    var d = e.detail.value.split('-')
    var year=parseInt(d[0])
    var day = parseInt(d[1])
    this.getcalendar(year,day)
  },
  getcalendar: function(year, month) {
    var monthcount = new Date(year, month, 0).getDate()
    var lmonthcount = new Date(year, month - 1, 0).getDate()
    var fwd = new Date(year, month - 1, 1).getDay()
    this.setData({
      monthcount: monthcount,
      lmonthcount: lmonthcount,
      fwd: fwd,
      year: year,
      month: month
    })
  },
  hideModal: function() {
    this.setData({
      modalName: ''
    })
  },
  getFirstCalendarModal: function(e) {
    this.getcalendar(e.currentTarget.dataset.cdate.year, e.currentTarget.dataset.cdate.month)
    this.setData({
      modalName: 'chooseCalendarModalFirst',
      cdate: e.currentTarget.dataset.cdate.day
    })
  },
  getLastCalendarModal: function(e) {
    this.getcalendar(e.currentTarget.dataset.cdate.year, e.currentTarget.dataset.cdate.month)
    this.setData({
      modalName: 'chooseCalendarModalLast',
      cdate: e.currentTarget.dataset.cdate.day
    })
  },
  sureCalendar: function() {
    if (this.data.modalName == 'chooseCalendarModalFirst') {
      var year = this.data.year
      var month = this.data.month
      var day = this.data.cdate
      var date = year + '-' + (month < 10 ? ('0' + month) : month) + '-' + (day < 10 ? ('0' + day) : day)
      var datet = year + '/' + (month < 10 ? ('0' + month) : month) + '/' + (day < 10 ? ('0' + day) : day)
      var fdatet = new Date(date + ' ' + '00:00').getTime()
      this.setData({
        modalName: '',
        firstdate: { date: date, timestamp: fdatet, cdatel: { year: year, month: month, day: day } },
      })
    }
    if (this.data.modalName == 'chooseCalendarModalLast') {
      var year = this.data.year
      var month = this.data.month
      var day = this.data.cdate
      var date = year + '-' + (month < 10 ? ('0' + month) : month) + '-' + (day < 10 ? ('0' + day) : day)
      var datet = year + '/' + (month < 10 ? ('0' + month) : month) + '/' + (day < 10 ? ('0' + day) : day)
      var ldatet = new Date(date + ' ' + '24:00').getTime()
      this.setData({
        modalName: '',
        lastdate: { date: date, timestamp: ldatet, cdatel: { year: year, month: month, day: day } }
      })
    }
  },
  getsort:function(e) {
    this.setData({
      sort: e.currentTarget.dataset.sort
    })
  },
  filtersure:function(){
    this.setData({
      sure:true
    })
    wx.navigateBack({
      
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var d = new Date()
    var year = d.getFullYear()
    var month = d.getMonth() + 1
    var day = d.getDate()
    this.setData({
      thisyear: year,
      thismonth: month,
      thisday: day
    })
    var that = this
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('acceptDataFromOpenerPage', function (data) {
      var fd=new Date(data.firstdatetamp)
      var fdate = fd.getFullYear() + '-' + (fd.getMonth() + 1) + '-' +fd.getDate()
      var ld = new Date(data.lastdatetamp)
      var ldate = ld.getFullYear() + '-' + (ld.getMonth() + 1) + '-' + ld.getDate()
      that.setData({
        firstdate: { date: fdate, timestamp: data.firstdatetamp, cdatel: { year: fd.getFullYear(), month: fd.getMonth() + 1, day: fd.getDate() } },
        lastdate: { date: ldate, timestamp: data.lastdatetamp, cdatel: { year: ld.getFullYear(), month: ld.getMonth() + 1, day: ld.getDate() } },
        sort:data.sort
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
    var that=this
    if (that.data.sure){
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.emit('someEvent', { firstdate: that.data.firstdate, lastdate: that.data.lastdate,sort:that.data.sort });
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