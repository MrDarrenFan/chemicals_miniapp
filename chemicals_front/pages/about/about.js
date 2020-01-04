// pages/about/about.js

//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    serviceurl: '',
    aboutus:"此款软件查询出来的化学品GHS危险分类信息仅供参考，我们不对此信息承担任何法律责任。有任何问题和建议请与我们联系。"
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

  showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
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