// miniprogram/pages/detail/edit/edit.js
const app = getApp()
var util = require('../../../utils/util.js');
var QQMapWX = require('../../../libs/qqmap-wx-jssdk.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    delimglist:[]

  },
  injine(e) {
    this.setData({
      jine: e.detail.value
    })

  },
  DateChange(e) {
    var date = e.detail.value.split('-')
    var d = new Date()
    var h = d.getHours()
    var min = d.getMinutes()
    var sec = d.getSeconds()
    if (h < 10) {
      h = '0' + h;
    };
    if (min < 10) {
      min = '0' + min;
    }; 
    if (sec < 10) {
      sec = '0' + sec;
    };
    var t = h + ':' + min + ':' + sec
    var datelist = { year: date[0], month: date[1], day: date[2], time: t }
    var timestamp = new Date(date[0] + '/' + date[1] + '/' + date[2] + ' ' + t).getTime()
    this.setData({
      date: e.detail.value,
      datelist: datelist,
      timestamp: timestamp
    })
  },
  fenlei() {
    var that = this
    wx.navigateTo({
      url: '../../classify/classifylist/classifylist',
      events: {
        someEvent: function (data) {
          that.setData({
            cffenlei: data.cftitle,
            fenlei: data.title,
            fenleiicon: data.icon
          })
        }
      },
      success: function (res) {
        res.eventChannel.emit('acceptDataFromOpenerPage', { type: that.data.type, listid: that.data.cflistid })
      }
    })

  },
  zhanghu() {
    var that = this
    wx.navigateTo({
      url: '../../classify/classifylist/classifylist',
      events: {
        someEvent: function (data) {
          that.setData({
            cfzhanghu: data.cftitle,
            zhanghu: data.title,
            zhanghuicon: data.icon
          })
        }
      },
      success: function (res) {
        res.eventChannel.emit('acceptDataFromOpenerPage', { type: that.data.type, listid: "propertyclassify" })
      }
    })

  },

  fkzhanghu() {
    var that = this
    wx.navigateTo({
      url: '../../classify/classifylist/classifylist',
      events: {
        someEvent: function (data) {
          that.setData({
            cffkzhanghu: data.cftitle,
            fkzhanghu: data.title,
            fkzhanghuicon: data.icon
          })
        }
      },
      success: function (res) {
        res.eventChannel.emit('acceptDataFromOpenerPage', { type: that.data.type, listid: "propertyclassify" })
      }
    })

  },

  skzhanghu() {
    var that = this
    wx.navigateTo({
      url: '../../classify/classifylist/classifylist',
      events: {
        someEvent: function (data) {
          that.setData({
            cfskzhanghu: data.cftitle,
            skzhanghu: data.title,
            skzhanghuicon: data.icon
          })
        }
      },
      success: function (res) {
        res.eventChannel.emit('acceptDataFromOpenerPage', { type: that.data.type, listid: "propertyclassify" })
      }
    })

  },


  location(e) {
    this.setData({
      location: e.detail.value
    })
  },
  ChooseImage() {
    wx.chooseImage({
      count: 4 - this.data.imgList.length, //默认9
      sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], //从相册选择
      success: (res) => {
        if (this.data.imgList.length != 0) {
          this.setData({
            imgList: this.data.imgList.concat(res.tempFilePaths)
          })
        } else {
          this.setData({
            imgList: res.tempFilePaths
          })
        }
        console.log(this.data.imgList)
      }
    });
  },

  DelImg(e) {
    if (this.data.imgList[e.currentTarget.dataset.index].indexOf("cloud")!=-1) {
      var index=this.data.imgidlist.findIndex(item => item == this.data.imgList[e.currentTarget.dataset.index])
      this.data.imgidlist.splice(index, 1)
      this.data.delimglist.push(this.data.imgList[e.currentTarget.dataset.index])
    }
    this.data.imgList.splice(e.currentTarget.dataset.index, 1)
    this.setData({
      imgList: this.data.imgList
    })

  },

  save() {
    if (this.data.fenlei == "请选择分类" && this.data.type != "转账") {
      wx.showToast({
        title: '请选择分类',
        icon: "none"
      })
      return
    } else if (this.data.zhanghu == "请选择账户" && this.data.type != "转账") {
      wx.showToast({
        title: '请选择账户',
        icon: "none"
      })
      return
    } else if (this.data.type == "转账" && this.data.fkzhanghu == "请选择付款账户") {
      wx.showToast({
        title: '请选择付款账户',
        icon: "none"
      })
      return
    } else if (this.data.type == "转账" && this.data.skzhanghu == "请选择收款账户") {
      wx.showToast({
        title: '请选择收款账户',
        icon: "none"
      })
      return
    }
    else if (this.data.jine == 0) {
      wx.showToast({
        title: '请输入金额',
        icon: "none"
      })
      return
    } else {
      wx.showLoading({
        title: '正在保存',
      })
      var imglist2=[]
      for (var i in this.data.imgList){
        if (this.data.imgList[i].indexOf("cloud")==-1){
          imglist2.push(this.data.imgList[i])
        }
      }
      console.log(imglist2)
      if (imglist2.length == 0) {
        this.SaveData()
      } else {
        this.SaveImage(imglist2)
      }

    }

  },

  SaveImage(imgList) {
    console.log(this.data.delimglist)
    if (this.data.delimglist.length!=0){
      wx.cloud.deleteFile({
        fileList: this.data.delimglist,
        success: res => {
          console.log('del',res.fileList)
        },
        fail: err => {
        }
      })
    }
    var tempFilePaths = imgList
    var cloudPath
    var filePath
    var that = this
    for (var i in tempFilePaths) {
      cloudPath = app.globalData.openid + '/' + tempFilePaths[i].split('/').pop()
      filePath = tempFilePaths[i]
      wx.cloud.uploadFile({
        cloudPath,
        filePath,
        success: res => {
          console.log('[上传文件] 成功：', res.fileID)
          that.data.imgidlist.push(res.fileID)
          console.log(that.data.imgidlist.length,that.data.imgList.length)
          if (that.data.imgidlist.length == that.data.imgList.length) {
            console.log("保存图片后保存数据")
            that.SaveData()
          }
        },
        fail: e => {
          console.error('[上传文件] 失败：', e)
          wx.showToast({
            icon: 'none',
            title: '上传失败',
          })
        },
        complete: () => {
          wx.hideLoading()
        }
      })
    }

  },

  SaveData() {
    this.data.jine = parseFloat(parseFloat(this.data.jine).toFixed(2))

    //删除原来数据
    console.log("删除原来数据")
    if (this.data.type == "支出" || this.data.type == "收入") {
      var yindex = app.globalData[this.data.cflistid].findIndex(item => item.title == this.data.datalist.typeclassify)
      var yindex1 = app.globalData[this.data.cflistid][yindex].classify.findIndex(item => item.title == this.data.datalist.classify)
      var yindex2 = app.globalData[this.data.cflistid][yindex].classify[yindex1].list.findIndex(item => item == this.data.datalist)
      console.log(yindex, yindex1, yindex2)
      app.globalData[this.data.cflistid][yindex].classify[yindex1].list.splice(yindex2, 1)
      console.log("删除原来列表数据")
      var yzhcfindex = app.globalData.propertyclassify.findIndex(item => item.title == this.data.datalist.account)
      var yzhindex = app.globalData.propertyclassify[yzhcfindex].classify.findIndex(item => item.title == this.data.datalist.accountclassify)
      app.globalData[this.data.cflistid][yindex].classify[yindex1].money -= this.data.datalist.money
      app.globalData[this.data.cflistid][yindex].money -= this.data.datalist.money
      console.log("删除原来账户数据")
      if (this.data.type=="支出"){
        if (this.data.datalist.account.indexOf("负债") != -1) {
          app.globalData.propertyclassify[yzhcfindex].money -= this.data.datalist.money
          app.globalData.propertyclassify[yzhcfindex].classify[yzhindex].money -= this.data.datalist.money
        } else {
          app.globalData.propertyclassify[yzhcfindex].money += this.data.datalist.money
          app.globalData.propertyclassify[yzhcfindex].classify[yzhindex].money += this.data.datalist.money
        }
      }else{
        if (this.data.datalist.account.indexOf("负债") != -1) {
          app.globalData.propertyclassify[yzhcfindex].money += this.data.datalist.money
          app.globalData.propertyclassify[yzhcfindex].classify[yzhindex].money += this.data.datalist.money
        } else {
          app.globalData.propertyclassify[yzhcfindex].money -= this.data.datalist.money
          app.globalData.propertyclassify[yzhcfindex].classify[yzhindex].money -= this.data.datalist.money
      }
      }
    }
    else{
      var yindex = app.globalData.propertyclassify.findIndex(item => item.title == this.data.datalist.fkaccount)
      var yindex1 = app.globalData.propertyclassify[yindex].classify.findIndex(item => item.title == this.data.datalist.fkaccountclassify)
      var yindex2 = app.globalData.propertyclassify[yindex].classify[yindex1].list.findIndex(item => item== this.data.datalist)
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
    }
    console.log("保存更新的数据")
    var listdata=null
    //添加新数据
    if (this.data.type == "支出" || this.data.type == "收入") {
      listdata = { "type": this.data.type, "pictures": this.data.imgidlist, "place": this.data.location, "typeclassify": this.data.cffenlei, "classify": this.data.fenlei, "date": this.data.datelist, timestamp: this.data.timestamp, "account": this.data.cfzhanghu, "accountclassify": this.data.zhanghu, "money": this.data.jine, "icon": this.data.fenleiicon, "remarks": this.data.beizhu }

      if (this.data.type == "支出") {
        var cfindex = app.globalData.payclassify.findIndex(item => item.title == this.data.cffenlei)
        console.log(this.data.cffenlei)
        var index = app.globalData.payclassify[cfindex].classify.findIndex(item => item.title == this.data.fenlei)
        app.globalData.payclassify[cfindex].classify[index].list.push(listdata)
        app.globalData.payclassify[cfindex].classify[index].list.sort((a, b) => {
          return a.timestamp < b.timestamp ? 1 : -1;
        })
        console.log('push', app.globalData.payclassify)
        app.globalData.payclassify[cfindex].classify[index].money += this.data.jine
        app.globalData.payclassify[cfindex].money += this.data.jine
        app.globalData.paymoney += this.data.jine-this.data.datalist.money
        var zhcfindex = app.globalData.propertyclassify.findIndex(item => item.title == this.data.cfzhanghu)
        var zhindex = app.globalData.propertyclassify[zhcfindex].classify.findIndex(item => item.title == this.data.zhanghu)
        if (this.data.cfzhanghu.indexOf("负债") != -1) {
          app.globalData.propertyclassify[zhcfindex].money += this.data.jine
          app.globalData.propertyclassify[zhcfindex].classify[zhindex].money += this.data.jine
        } else {
          app.globalData.propertyclassify[zhcfindex].money -= this.data.jine
          app.globalData.propertyclassify[zhcfindex].classify[zhindex].money -= this.data.jine
        }
        app.globalData.property -= this.data.jine + this.data.datalist.money
        var updata = { payclassify: app.globalData.payclassify, paymoney: app.globalData.paymoney, property: app.globalData.property, propertyclassify: app.globalData.propertyclassify }
        console.log("数据正在保存", updata)
        app.onUpdate("defaultdata", app.globalData.dbid, updata)
      } else {
        var cfindex = app.globalData.incomeclassify.findIndex(item => item.title == this.data.cffenlei)
        var index = app.globalData.incomeclassify[cfindex].classify.findIndex(item => item.title == this.data.fenlei)
        app.globalData.incomeclassify[cfindex].classify[index].list.push(listdata)
        app.globalData.incomeclassify[cfindex].classify[index].list.sort((a, b) => {
          return a.timestamp < b.timestamp ? 1 : -1;
        })
        app.globalData.incomeclassify[cfindex].classify[index].money += this.data.jine
        app.globalData.incomeclassify[cfindex].money += this.data.jine
        app.globalData.incomemoney += this.data.jine - this.data.datalist.money
        var zhcfindex = app.globalData.propertyclassify.findIndex(item => item.title == this.data.cfzhanghu)
        var zhindex = app.globalData.propertyclassify[zhcfindex].classify.findIndex(item => item.title == this.data.zhanghu)
        if (this.data.cfzhanghu.indexOf("负债") != -1) {
          app.globalData.propertyclassify[zhcfindex].money -= this.data.jine
          app.globalData.propertyclassify[zhcfindex].classify[zhindex].money -= this.data.jine
        } else {
          app.globalData.propertyclassify[zhcfindex].money += this.data.jine
          app.globalData.propertyclassify[zhcfindex].classify[zhindex].money += this.data.jine
        }
        app.globalData.property += this.data.jine - this.data.datalist.money
        var updata = { incomeclassify: app.globalData.incomeclassify, incomemoney: app.globalData.incomemoney, property: app.globalData.property, propertyclassify: app.globalData.propertyclassify }
        console.log("数据正在保存", updata)
        app.onUpdate("defaultdata", app.globalData.dbid, updata)
      }
    } else {//转账数据保存
      listdata = { "type": this.data.type, "pictures": this.data.imgidlist, "place": this.data.location, "classify": "[转帐]" + this.data.fkzhanghu + "->" + this.data.skzhanghu, "accountclassify": this.data.fkzhanghu, "date": this.data.datelist, timestamp: this.data.timestamp, "fkaccount": this.data.cffkzhanghu, "fkaccountclassify": this.data.fkzhanghu, "skaccount": this.data.cfskzhanghu, "skaccountclassify": this.data.skzhanghu, "money": this.data.jine, "icon": "cunkuanlixi", "remarks": this.data.beizhu }
      var fkzhcfindex = app.globalData.propertyclassify.findIndex(item => item.title == this.data.cffkzhanghu)
      var fkzhindex = app.globalData.propertyclassify[fkzhcfindex].classify.findIndex(item => item.title == this.data.fkzhanghu)
      var skzhcfindex = app.globalData.propertyclassify.findIndex(item => item.title == this.data.cfskzhanghu)
      var skzhindex = app.globalData.propertyclassify[skzhcfindex].classify.findIndex(item => item.title == this.data.skzhanghu)
      app.globalData.propertyclassify[fkzhcfindex].classify[fkzhindex].list.push(listdata)
      app.globalData.propertyclassify[fkzhcfindex].classify[fkzhindex].list.sort((a, b) => {
        return a.timestamp < b.timestamp ? 1 : -1;
      })
      if (this.data.cffkzhanghu.indexOf("负债")) {
        app.globalData.propertyclassify[fkzhcfindex].money += this.data.jine
        app.globalData.propertyclassify[fkzhcfindex].classify[fkzhindex].money += this.data.jine
      } else {
        app.globalData.propertyclassify[fkzhcfindex].money -= this.data.jine
        app.globalData.propertyclassify[fkzhcfindex].classify[fkzhindex].money -= this.data.jine
      }
      if (this.data.cfskzhanghu.indexOf("负债")) {
        app.globalData.propertyclassify[skzhcfindex].money -= this.data.jine
        app.globalData.propertyclassify[skzhcfindex].classify[skzhindex].money -= this.data.jine
      } else {
        app.globalData.propertyclassify[skzhcfindex].money += this.data.jine
        app.globalData.propertyclassify[skzhcfindex].classify[skzhindex].money += this.data.jine
      }
      app.onUpdate("defaultdata", app.globalData.dbid, { propertyclassify: app.globalData.propertyclassify })
    }
    wx.hideLoading()
    var that = this
    const eventChannel = this.getOpenerEventChannel()
    wx.navigateBack({
      success: function () {
        eventChannel.emit('someEvent',listdata);
      }
    })
  },

  today() {
    this.getdate(0)
  },
  today_1() {
    this.getdate(1)
  },
  today_2() {
    this.getdate(2)
  },

  switch(e) {
    var that = this
    if (e.detail.value) {
      var qqmapsdk = new QQMapWX({
        key: 'XVIBZ-RKPKV-SVQP3-UPHIV-COTQV-AXBTK' // 必填
      });
      wx.getLocation({
        success: function (res) {
          qqmapsdk.reverseGeocoder({
            location: {
              latitude: res.latitude,
              longitude: res.longitude
            },
            success: function (r) {
              var location = r.result.formatted_addresses.recommend
              that.setData({
                location: location
              })
            }
          })
        },
      })
    }
    else {
      this.setData({
        location: ''
      })
    }
  },

  beizhu(e) {
    this.setData({
      beizhu: e.detail.value
    })
  },

  getdate(md) {
    var d = new Date()
    var h = d.getHours()
    var min = d.getMinutes()
    var sec = d.getSeconds()
    d.setDate(d.getDate() - md)
    var y = d.getFullYear();
    var m = d.getMonth() + 1;
    m = m.toString()
    var d = d.getDate();
    if (m < 10) {
      m = '0' + m;
    };
    if (d < 10) {
      d = '0' + d;
    };
    if (h < 10) {
      h = '0' + h;
    };
    if (min < 10) {
      min = '0' + min;
    };
    if (sec < 10) {
      sec = '0' + sec;
    };
    var t = h + ':' + min + ':' + sec
    var date = y + '-' + m + '-' + d
    var datelist = { year: y, month: m, day: d, time: t }
    var timestamp = new Date(y + '/' + m + '/' + d + ' ' + t).getTime()
    this.setData({
      date: date,
      datelist: datelist,
      timestamp: timestamp
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
        fenleiicon:data.icon,
        type: data.type,
        datalist: data,
        jine: data.money,
        date: data.date.year + '-' + data.date.month + '-' + data.date.day,
        datelist:data.date,
        beizhu: data.remarks,
        location: data.place,
        imgList: [].concat(data.pictures),
        imgidlist: [].concat(data.pictures),
        timestamp: data.timestamp,
        iflc:data.place.length!=0?true:false
      })
      if (data.type=="转账"){
        that.setData({
          tssz:true,
          cffkzhanghu:data.fkaccount,
          fkzhanghu: data.fkaccountclassify,
          cfskzhanghu: data.skaccount,
          skzhanghu: data.skaccountclassify,
          cflistid:"propertyclassify"
        })
      }
      if (data.type == "支出"){
        that.setData({
          cffenlei: data.typeclassify,
          fenlei: data.classify,
          cfzhanghu: data.account,
          zhanghu: data.accountclassify,
          cflistid:"payclassify"
        })
      }
      if (data.type=="收入"){
        that.setData({
          cffenlei: data.typeclassify,
          fenlei: data.classify,
          cfzhanghu: data.account,
          zhanghu: data.accountclassify,
          cflistid: "incomeclassify"
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