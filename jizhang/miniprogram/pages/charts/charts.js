// pages/charts/charts.js
var wxCharts = require('../../utils/wxcharts.js');
const app=getApp()
var lineChart = null;
var pieChart=null;
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

  },

  /**
   * 组件的方法列表
   */
  methods: {
    touchHandler1(e) {
      this.data.monthchart.showToolTip(e, {
        background: '#7cb5ec',
        format: function (item, category) {
          return category + ' ' + item.name + ':' + item.data
        }
      });
    },
    touchHandler2(e) {
      this.data.yearchart.showToolTip(e, {
        background: '#7cb5ec',
        format: function (item, category) {
          return category + ' ' + item.name + ':' + item.data
        }
      });
    },
    updateData() {
      var simulationData = this.createSimulationData();
      var series = [{
        name: '成交量1',
        data: simulationData.data,
        format: function (val, name) {
          return val.toFixed(2) + '万';
        }
      }];
      lineChart.updateData({
        categories: simulationData.categories,
        series: series
      });
    },
    creatlineCharts(id,datalist,xdata,ytitle){
      var linechart=new wxCharts({
        canvasId: id,
        type: 'line',
        categories: xdata,
        animation: true,
        // background: '#f5f5f5',
        series: datalist,
        xAxis: {
          disableGrid: true
        },
        yAxis: {
          title: ytitle,
          format: function (val) {
            return val.toFixed(2);
          }
        },
        width: this.data.windowWidth,
        height: 200,
        dataLabel: false,
        dataPointShape: false,
        componentInstance: this,
        extra: {
          lineStyle: 'curve'
        }
      });
      return linechart
    },
    creatpieCharts(id,datalist){
      new wxCharts({
        animation: true,
        canvasId: id,
        type: 'pie',
        series: datalist,
        width: this.data.windowWidth,
        height: 300,
        dataLabel: true,
        componentInstance: this,
      });
    },
    getcharts(year, month) {
      var mc = new Date(year,month, 0).getDate()
      var xday=[]
      var xmonth=[]
      var paydata=[]
      var incomedata=[]
      var paycfdata=[]
      var yearpaydata=[]
      var yearincomedata = []
      for (var i=1;i<=mc;i++){
        xday.push(i)
        paydata.push(0)
        incomedata.push(0)
      }
      for (var i=1;i<=12;i++){
        xmonth.push(i)
        yearpaydata.push(0)
        yearincomedata.push(0)
      }
      for (var i in this.data.payclassify){
        var paycfm=0
        for (var j in this.data.payclassify[i].classify){
          for (var k in this.data.payclassify[i].classify[j].list){
            if (parseInt(this.data.payclassify[i].classify[j].list[k].date.month)==month){
              paydata[parseInt(this.data.payclassify[i].classify[j].list[k].date.day)-1] += this.data.payclassify[i].classify[j].list[k].money
              paycfm += this.data.payclassify[i].classify[j].list[k].money
            }
            if (parseInt(this.data.payclassify[i].classify[j].list[k].date.year) == year) {
              yearpaydata[parseInt(this.data.payclassify[i].classify[j].list[k].date.month)-1] += this.data.payclassify[i].classify[j].list[k].money
            }
          }
        }
        if (paycfm!=0){
          paycfdata.push({ name: this.data.payclassify[i].title,data:paycfm})
        }
      }
      for (var i in this.data.incomeclassify) {
        for (var j in this.data.incomeclassify[i].classify) {
          for (var k in this.data.incomeclassify[i].classify[j].list) {
            if (parseInt(this.data.incomeclassify[i].classify[j].list[k].date.month) == month) {
              incomedata[parseInt(this.data.incomeclassify[i].classify[j].list[k].date.day) - 1] += this.data.incomeclassify[i].classify[j].list[k].money
            }
            if (parseInt(this.data.incomeclassify[i].classify[j].list[k].date.year) == year) {
              yearincomedata[parseInt(this.data.incomeclassify[i].classify[j].list[k].date.month) - 1] += this.data.incomeclassify[i].classify[j].list[k].money
            }
          }
        }
      }
      if (paycfdata.length==0){
        paycfdata=[{name:"无支出",data:1}]
      }
      var monthdatalist = [{
        name: '支出',
        data: paydata,
        format: function (val, name) {
          return val.toFixed(2) + '元';
        }
      },{
        name: '收入',
        data: incomedata,
        format: function (val, name) {
          return val.toFixed(2) + '元';
        }
      }]
      var yeardatalist = [{
        name: '支出',
        data: yearpaydata,
        format: function (val, name) {
          return val.toFixed(2) + '元';
        }
      }, {
        name: '收入',
        data: yearincomedata,
        format: function (val, name) {
          return val.toFixed(2) + '元';
        }
      }]
      var monthchart=this.creatlineCharts('lineCanvas', monthdatalist,xday,month+'月收支(元)')
      var yearchart=this.creatlineCharts('lineCanvas2', yeardatalist, xmonth, year + '年收支(元)')
      this.creatpieCharts('pieCanvas', paycfdata)
      this.setData({
        monthchart: monthchart,
        yearchart: yearchart
      })
    }

  },
  attached: function () {
    var windowWidth = 320;
    try {
      var res = wx.getSystemInfoSync();
      windowWidth = res.windowWidth;
    } catch (e) {
      console.error('getSystemInfoSync failed!');
    }
    var d=new Date()
    var thisyear=d.getFullYear()
    var thismonth = d.getMonth() + 1
    this.setData({
      windowWidth: windowWidth,
      thisyear: thisyear,
      thismonth: thismonth
    })
    if (this.data.payclassify == null || this.data.incomeclassify == null) {
      if (app.globalData.payclassify != null && app.globalData.incomeclassify != null) {
        this.setData({
          payclassify: app.globalData.payclassify,
          incomeclassify: app.globalData.incomeclassify
        })
        this.getcharts(thisyear, thismonth)
      }
      else {
        app.querycallback = res => {
          console.log("app.js onQuery回调函数")
          this.setData({
            payclassify: res[0].payclassify,
            incomeclassify: res[0].incomeclassify
          })
          this.getcharts(thisyear,thismonth)
        }
      }
    }else{
      this.getcharts(thisyear, thismonth)
    }
    
  }
})
