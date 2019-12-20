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

    //点进去才记录 的 历史记录
    history_scan:[],
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

    that.getHistory()

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
    this.setHistory(id)

    var dataStr=JSON.stringify(data)
    wx.navigateTo({
      url: '../resultItem/resultItem?data=' + dataStr,
    })
    
  },


  //查看的记录· 点进去才被记录
setHistory:function(id){
  var history_scan_data = this.data.itemlist[id]
  var newhistory = [history_scan_data]

  console.log(history_scan_data)
  let that = this
  that.getHistory()
  var history_scan = this.data.history_scan
  for (var i = 0; i < history_scan.length; i++) {
    if (history_scan[i].chName == history_scan_data.chName) {

      // console.log("出现相同的")
      // console.log(history_scan[i].chName)
      // console.log(history_scan_data.chName)
      history_scan.splice(i, 1)
      // console.log("删除了之前出现的")
      break;
    }
  }

  for (var i = 0; i < history_scan.length; i++) {
    newhistory.push(history_scan[i])
  }
  // console.log("新添加了一个")
  console.log(newhistory)
  wx.setStorage({
    key: 'history_scan',
    data: newhistory
  })

},

  
  getHistory: function () {
    let that = this
    wx.getStorage({
      key: 'history_scan',
      success: function (res) {
        // var data =JSON.parse(res)
        // console.log(data)
        console.log(res)
        that.setData({
          history_scan: res.data
        })
      },
      fail: function (res) {
        console.log("fail")
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