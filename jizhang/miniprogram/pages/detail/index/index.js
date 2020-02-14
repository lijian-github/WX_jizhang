// pages/detail/index/index.js
const app=getApp()
Component({
  /**
   * 组件的属性列表
   */
  options: {
    addGlobalClass: true
  },
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    mingxi:'单笔明细',
    barbtn:'近一周',
    sort:'由近到远',
    sortlist: ['由近到远', '由远到近']

  },

  /**
   * 组件的方法列表
   */
  methods: {
    getdborcf(e){
      this.setData({
        mingxi:e.currentTarget.dataset.mx
      })
    },
    tapbarbtn(e){
      this.setData({
        barbtn: e.currentTarget.dataset.btn
      })
      if (e.currentTarget.dataset.btn == "近一周") {
        var d = new Date()
        var nowstamp = d.getTime()
        d.setDate(d.getDate()-7)
        var firstdatetamp = d.getTime()
        this.getshowlist(firstdatetamp,nowstamp,this.data.sort)
      }
      if (e.currentTarget.dataset.btn == "近一月") {
        var d = new Date()
        var nowstamp = d.getTime()
        d.setMonth(d.getMonth() - 1)
        var firstdatetamp = d.getTime()
        this.getshowlist(firstdatetamp, nowstamp, this.data.sort)
      }
      if (e.currentTarget.dataset.btn == "近三月") {
        var d = new Date()
        var nowstamp = d.getTime()
        d.setMonth(d.getMonth() - 3)
        var firstdatetamp = d.getTime()
        this.getshowlist(firstdatetamp, nowstamp, this.data.sort)
      }
      if (e.currentTarget.dataset.btn == "近一年") {
        var d = new Date()
        var nowstamp = d.getTime()
        d.setFullYear(d.getFullYear() - 1)
        var firstdatetamp = d.getTime()
        this.getshowlist(firstdatetamp, nowstamp, this.data.sort)
      }
    },
    getsort(){
      var that=this
      wx.navigateTo({
        url: '../detail/filter/filter', 
        events: {
          someEvent: function (data) {
            console.log(data)
            that.setData({
              barbtn:data.firstdate.date + '~' + data.lastdate.date,
              sort:data.sort,
              firstdatetamp: data.firstdate.timestamp, 
              lastdatetamp: data.lastdate.timestamp
            })
            that.getshowlist(data.firstdate.timestamp, data.lastdate.timestamp, data.sort)
          }
        },
        success: function (res) {
          res.eventChannel.emit('acceptDataFromOpenerPage', {
            firstdatetamp: that.data.firstdatetamp,
            lastdatetamp: that.data.lastdatetamp,
            sort:that.data.sort
          })
        }
      })
    },
    onlysort(e){
      this.setData({
        sort: this.data.sortlist[e.detail.value]
      })
      this.getshowlist(this.data.firstdatetamp, this.data.lastdatetamp, this.data.sort)
    },
    getshowlist(firstdatetamp,lastdatetamp,sort) {
      this.setData({
        firstdatetamp: firstdatetamp,
        lastdatetamp: lastdatetamp
      })
      var allshowlist = []
      var showlist = []
      var showcflist=[]
      var alllist = this.data.payclassify.concat(this.data.incomeclassify, this.data.propertyclassify)

      for (var i in alllist) {
        var forcflist = []
        for (var j in alllist[i].classify) {
          for (var k in alllist[i].classify[j].list) {
            if (firstdatetamp <= alllist[i].classify[j].list[k].timestamp && alllist[i].classify[j].list[k].timestamp<= lastdatetamp) {
              showlist.push(alllist[i].classify[j].list[k])
              forcflist.push(alllist[i].classify[j].list[k])
            }
            allshowlist.push(alllist[i].classify[j].list[k])
          }
        }
        if (forcflist.length != 0) {
          if (forcflist[0].classify.indexOf('[转帐]')!=-1){
            showcflist.push({ cftitle: '转帐', list: forcflist })
          }else{
          showcflist.push({ cftitle: alllist[i].title, list: forcflist })
          }
        }
      }
      if (sort=="由近到远"){
      showlist.sort((a, b) => {
        return a.timestamp < b.timestamp ? 1 : -1;
        })
        for (var i in showcflist){
          showcflist[i].list.sort((a, b) => {
            return a.timestamp < b.timestamp ? 1 : -1;
          })
        }
      } else if (sort == "由远到近"){
        showlist.sort((a, b) => {
          return a.timestamp > b.timestamp ? 1 : -1;
        })
        for (var i in showcflist) {
          showcflist[i].list.sort((a, b) => {
            return a.timestamp > b.timestamp ? 1 : -1;
          })
        }
      }
      this.setData({
        showlist: showlist,
        showcflist: showcflist
      })
    },
    getparticulars(e) {
      var that = this
      var showlist
      if (this.data.mingxi =="单笔明细"){
        showlist=this.data.showlist
      } else if (this.data.mingxi == "分类明细") {
        showlist = e.currentTarget.dataset.list
      }
      wx.navigateTo({
        url: '../particulars/particulars',
        events: {
          someEvent: function (data) {
            that.getshowlist(that.data.firstdatetamp, that.data.lastdatetamp,that.data.sort)
          }
        },
        success: function (res) {
          res.eventChannel.emit('acceptDataFromOpenerPage',showlist[e.currentTarget.dataset.index])
        }
      })
    }

  },
  attached: function () {//组件钩子
    if (this.data.payclassify == null || this.data.incomeclassify == null || this.data.propertyclassify == null) {
      if (app.globalData.payclassify != null && app.globalData.incomeclassify != null && app.globalData.propertyclassify != null) {
        this.setData({
          payclassify: app.globalData.payclassify,
          incomeclassify: app.globalData.incomeclassify,
          propertyclassify: app.globalData.propertyclassify
        })
        var d = new Date()
        var nowstamp = d.getTime()
        d.setDate(d.getDate() - 7)
        var firstdatetamp = d.getTime()
        this.setData({
          firstdatetamp: firstdatetamp, lastdatetamp: nowstamp
        })
        this.getshowlist(firstdatetamp, nowstamp,this.data.sort)

      }
      else {
        app.querycallback = res => {
          console.log("app.js onQuery回调函数")
          this.setData({
            payclassify: res[0].payclassify,
            incomeclassify: res[0].incomeclassify,
            propertyclassify: res[0].propertyclassify
          })
          var d = new Date()
          var nowstamp = d.getTime()
          d.setDate(d.getDate() - 7)
          var firstdatetamp = d.getTime()
          this.getshowlist(firstdatetamp, nowstamp, this.data.sort)
        }
      }
    }
  }
})
