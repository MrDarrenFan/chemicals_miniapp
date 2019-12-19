// pages/result/result.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //符合搜索条件的list
    itemlist: [],
    serviceurl:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //从缓存中将之前在search.js结果取到
    var that = this
    wx.getStorage({
      key: 'itemlist',
      success: function (res) {
        that.setData({
          itemlist:res.data
        })
      },
    })

    that.setData({
       serviceurl:app.serviceurl
    })

  },


//点击某个条目 进入这个item的具体页
  gotodetail:function(e){
    let that=this
    var id = e.currentTarget.dataset.index;
    //用于区别随机的list 区别于type=random
    var type = "normal"
    var data={
      "type":type,
      "index":id
    }
    var dataStr=JSON.stringify(data)
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