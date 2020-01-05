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
    randomList:[],

    alltag:[]
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
    var str=""
    for(var i=0;i<list.length;i++){
      str+=list[i]
      if(i!=list.length-1){
        str+=" "
      }
    }

    wx.request({
      url: service + '/chemicals/getThreeByRandom/' + str,
      success: function (res) {

        that.setData({
          randomList:res.data
        })
        that.transform()
        
        wx.setStorage({
          key: 'randomList',
          data: res.data,
        })
      }
    })
  },

//换一批操作
  changeBatch:function(){

    var that = this;
    that.setData({
      toggleDelay: true
    })
    setTimeout(function () {
      that.setData({
        toggleDelay: false
      })
    }, 1000)

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

  transform: function () {
    // console.log(this.data.randomList)
    

    let that = this
    var alltag=[]
    var ranit = this.data.randomList
    var max_count=5
  
    for (var t = 0; t < ranit.length;t++){
      var count = 0
      var taglist = []
      var attribute = ['dangerCA']
      var flag = false
      for (var i = 0; i < attribute.length; i++) {
        // var list_item = []
        
        var pl = attribute[i]
       
        var origindata = ranit[t][pl]
    
        var list = origindata.split("\r\n")
        for (var j = 0; j < list.length; j++) {
          var tmp = list[j].split("：")
         
          if(count>=max_count){
            flag=true
            break;
          }
          taglist.push(tmp[0])
          count++;
        }
        if(flag){
          break;
        }
      }
      
      var data={
        'tag': taglist
      }
      alltag.push(data)
  
    }


    

    that.setData({

      alltag: alltag
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
        if(data != null){

          wx.setStorage({
            key: 'QR',
            data: data,
          })
          
          var sendData={
            'type':"QR",
          }
          var dataStr=JSON.stringify(sendData)
          wx.navigateTo({
            url: '../productItem/productItem?data='+dataStr,
          })
        }else{
          wx.showModal({
            
            content: '未检测到相关化学品产品的信息',
            showCancel:false,
            success: function (res) {
              
            }
          })
  
        }
      }
    })
    //再次清空

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