// pages/resultItem/resultItem.js

var title = ""
// const hide= [true, true, true, true, true, true, true, true, true]
Page({

  /**
   * 页面的初始数据
   */
  

  data: {
    //在第一次点击时 重载数据 tap_num 主要用于区别是否第一次点击
    tap_num:0,
    // 当前化学品是否有别名
    haveAlias: true,
    datalist:[],

    item:{},
    //9个标记值，用于控制内容是否显示
    hide: [true, true, true, true, true, true, true, true, true],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var data = JSON.parse(options.data);
    // console.log(data.type)
   //这边就要判断是从index页面的随机三个过来的
   //还是从正常搜索的结果页面的result过来的
    
    if(data.type=="normal"){
      var index=data.index
      wx.getStorage({
        key: 'itemlist',
        success: function (res) {
          var list = res.data
          if (list[index].alias == "" || list[index].alias == null) {
            list[index].alias = "无"
          }
          that.setData({
            item: list[index],
          })
          //这边由于设置最上边为中文名
          wx.setNavigationBarTitle({
            title: list[index].chName
          })
        },
      })

    }else {
      if(data.type=="random"){
      //这边type=random的情况
      var index = data.index
      wx.getStorage({
        key: 'randomList',
        success: function (res) {
          var list = res.data
          if (list[index].alias == "" || list[index].alias == null) {
            list[index].alias = "无"
          }
          that.setData({
            item: list[index],
          })
          //这边由于设置最上边为中文名
          wx.setNavigationBarTitle({
            title: list[index].chName
          })
          

        },
      })

    }else{
        //type=history_scan
      var index = data.index
      wx.getStorage({
        key: 'history_scan',
        success: function (res) {
          var list = res.data
          if (list[index].alias == "" || list[index].alias == null) {
            list[index].alias = "无"
          }
          that.setData({
            item: list[index],
          })
          //这边由于设置最上边为中文名
          wx.setNavigationBarTitle({
            title: list[index].chName
          })

        },
      })

    

    }
  }
    
    //以防万一还是将data里的hide初始化为true
    for(var i=0 ;i<9;i++){
      this.data.hide[i]=true
    }
    
  },

  transform:function(){
    console.log(this.data.item)
    // console.log("进入")   
    let that = this
    var it= this.data.item
    // console.log(it)
    // var place ='dangerOV'
    var datalist = []
    var attribute = ['property', 'stabAndReact', 'dangerOV', 'dangerCA', 'operAndStore', 'ctrlAndDef', 'firstAid', 'leakTreatment','disposal']
    // var pl = attribute[0]
    // console.log(it.property)
    // console.log(it[pl])
    for(var i=0;i<attribute.length;i++){
      var list_item=[]
      var pl = attribute[i]
      var origindata = it[pl]
      console.log(origindata)
      var list = origindata.split("\r\n")
      for(var j=0;j<list.length;j++){
        var tmp = list[j].split("：")
        var data_single = {
          label: tmp[0],
          content: tmp[1]
        }
        list_item.push(data_single)
      }
      datalist.push(list_item)

    }

    that.setData({

      datalist: datalist
    })

   


  },



//点击信息上传
  uploadinfo:function(){
    var name=this.data.item.chName
    wx.navigateTo({
      url: '../infoUpload/infoUpload?itemname='+name,
    })
  },


 
//点击报警
  alarm:function(){
    var name = this.data.item.chName
    wx.navigateTo({
      url: '../alarm/alarm?itemname=' + name,
    })
  },




//点击每个具体的条目
//比如点击理化特性，具体内容显示，再点击，又不显示
  changehide:function(event){
    let that = this
    if(that.data.tap_num==0){
      that.transform()
      that.data.tap_num++
    }

    // let that = this
    
    var id = parseInt(event.currentTarget.dataset.index)
    var obj=this.data.hide
    for(var i=0;i<9;i++){
      if(i==id){
        obj[i] = !obj[i]
      }
    }
    this.setData({
      hide:obj,
    })

    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    for (var i = 0; i < 9; i++) {
      this.data.hide[i] = true
    }
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