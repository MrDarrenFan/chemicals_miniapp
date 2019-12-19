//index.js
//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    
    serviceurl:'',

    //页面开始 随机的3个化学品的list
    randomList:[]
  },

 //进入到搜索页面
  tiaozhuan:function(){
    wx.navigateTo({
      url: '../search/search'
    })
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

      //初始传1，2，3 对RandomList进行初始化
      var tmplist=[1,2,3]
      this.getRandomList(tmplist)
    

  },


  //向服务器获取到random的 3 个样本
  getRandomList:function(list){
    var service = this.data.serviceurl  
    let that=this
    wx.request({
      url: service + '/chemicals/getThreeByRandom/' + list,
      success: function (res) {
        that.setData({
          randomList:res.data
        })
        wx.setStorage({
          key: 'randomList',
          data: res.data,
        })
      }
    })
  },

//换一批操作
  changeBatch:function(){
    var list=[]
    var tmplist=this.data.randomList
    for(var i=0;i<3;i++){
      list[i]=tmplist[i].chName
    }
    this.getRandomList(list)
  },


//点击每个样本，进入详细信息
  gotodetail:function(e){
    
    var index= e.currentTarget.dataset.index
    //设置type为rangdom，主要和之后正常搜索形成的list进行区分 resultItem要确定事从randomList取还是从itemlist取
    var type="random"
    var data={
      "type":type,
      "index":index
    }
    var dataStr=JSON.stringify(data)
    wx.navigateTo({
      url: '../resultItem/resultItem?data='+dataStr,
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