// pages/history/history.js

//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    serviceurl: '',
    history_scan:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    //开始先将serviceurl从App.js里获取过来
    that.setData({
      serviceurl: app.serviceurl
    })

    this.getHistory()
  },

  //二维码扫描
  QRsearch: function () {
    var myThis = this
    wx.scanCode({
      success(res) {
        console.log(res.result)
        var casAndBatchNumber = res.result
        myThis.searchByQRCode(casAndBatchNumber)


      }
    })
  },

  searchByQRCode: function (text) {
    let that = this
    var service = this.data.serviceurl
    wx.request({
      method: 'GET',
      url: service + '/product/getOneByQRCode/' + text,
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        var data = res.data
        if (data != null) {

          wx.setStorage({
            key: 'QR',
            data: data,
          })

          var sendData = {
            'type': "QR",
          }
          var dataStr = JSON.stringify(sendData)
          wx.navigateTo({
            url: '../productItem/productItem?data=' + dataStr,
          })
        } else {
          wx.showModal({

            content: '未检测到相关化学品产品的信息',
            showCancel: false,
            success: function (res) {

            }
          })

        }
      }
    })
    //再次清空

  },

  getHistory:function(){
    let that = this
    wx.getStorage({
      key: 'history_scan',
      success: function(res) {
        // var data =JSON.parse(res)
        // console.log(data)
        console.log(res)
       
        that.setData({
          history_scan : res.data
        })
      },
      fail:function(res){
        console.log("fail")
      }
    })

  },

  clearHistory:function(){

    wx.showModal({
      title: '清除查看记录',
      content: '确定清除所有的查看记录？这项操作将无法撤销',
      success: res => {
        if (res.confirm) {
          wx.removeStorage({ key: 'history_scan' })
          this.setData({ 'history_scan': [] })
        }
      }
    })

  },

  gotodetail:function(e){
      // console.log(e)
      let that = this
      var id = e.currentTarget.dataset.index;
      //用于区别随机的list 区别于type=random
      var type = "history_scan"
      var data = {
        "type": type,
        "index": id
      }
     
      var dataStr = JSON.stringify(data)
      wx.navigateTo({
        url: '../resultItem/resultItem?data=' + dataStr,
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
    this.getHistory()
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
    this.getHistory()
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