// pages/resultItem/resultItem.js

var title = ""
// const hide= [true, true, true, true, true, true, true, true, true]
Page({

  /**
   * 页面的初始数据
   */
  data: {
    item: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    //type="QR"
    wx.getStorage({
      key: 'QR',
      success: function (res) {
        console.log(res)
        that.setData({
          item: res.data
        })
      },
    })
  },

  //点击信息上传
  uploadinfo: function () {
    var name = this.data.item.chName
    wx.navigateTo({
      url: '../infoUpload/infoUpload?itemname=' + name,
    })
  },



  //点击报警
  alarm: function () {
    var name = this.data.item.chName
    wx.navigateTo({
      url: '../alarm/alarm?itemname=' + name,
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