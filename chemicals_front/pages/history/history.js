// pages/history/history.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      history_scan:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.getHistory()
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
      title: '清除搜索记录',
      content: '确定清除所有搜索历史？这项操作将无法撤销',
      success: res => {
        if (res.confirm) {
          wx.removeStorage({ key: 'history_scan' })
          this.setData({ 'history_scan': [] })
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