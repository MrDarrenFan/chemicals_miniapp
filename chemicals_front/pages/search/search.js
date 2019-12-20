// pages/search/search.js
const app = getApp()
var searchBar
Page({

  /**
   * 页面的初始数据
   */
  data: {
    place:"输入化学品中文名",
    index:0,
    picker:['中文名', 'CAS号'],
    // 清除键
    isHidden: true,
    //搜索的内容
    text:"",
    //历史记录
    history:[],
    //服务器地址
    serviceurl:"",
    //符合搜索条件的item 形成的list
    itemlist:[]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
  },


  // 选择框
  PickerChange(e) {
    let that = this
    var pre = "输入化学品"
    that.setData({
      index: e.detail.value,
      place: pre+this.data.picker[e.detail.value]

    })
    
  },

  //点击历史记录的条目，进行又一次的搜索
  reSearch:function(e){
    var data={
      'detail':e.currentTarget.dataset
    }
    this.onSearch(data)
  },

  // input聚焦，显示清除按钮
  onFocus:function(){
    this.setData({
      isHidden:false
    })
  },

  // input失焦，隐藏清除按钮
  onBlur:function(){
    this.setData({
      isHidden:true
    })
  },

  //随时更新搜索框里的值
  inputTyping:function(e){
    var value = e.detail.value
    let that = this
    that.setData({
      text:value
    })
  },

  // 清除输入栏
  onClear:function(e){

    let that=this
    that.setData({
      text:""
    })
  },

  //搜索回车执行的函数
  onSearch:function(e){
   
    console.log(e)

    var detail=e.detail
    var type=this.data.picker[this.data.index]
    var text=detail.value
    //type有两种 中文名和cas号
    if(text == null || text == "") {
      return
    }
    if(type=="中文名"){
      this.searchByCHName(text)
    }else{
      //按CAS搜索
      this.searchByCAS(text)
    }
    //将搜索的内容存到历史
    this._saveHistory(type,text)
  },
 
//搜索按键点击事件
btnSearch:function(event){
  var value=this.data.text
  var detail={
    'value':value
  }
  var e={
    'detail':detail
  }

  this.onSearch(e)
},


//按中文名搜索
  searchByCHName: function (text) {
    var service=this.data.serviceurl

    wx.request({
      method: 'GET',
      url: service + '/chemicals/getByCHName/'+text,
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log(res)

        //由于按照json放回 split后格式出现问题
        //需要进行调整
        if(res.data.length!=0){
          var data = JSON.stringify(res.data)
          var tmp = data.split("},{")
          for (var i = 0; i < tmp.length; i++) {
            if (tmp[i][0] == "[") {
              tmp[i] = tmp[i].substring(2)
              // tmp[i] = tmp[i] + "}"
            } 
            if (tmp[i][tmp[i].length - 1] == "]") {
                tmp[i] = tmp[i].substring(0, tmp[i].length - 2)
              
            }
            tmp[i] = "{" + tmp[i] + "}"
            tmp[i] = JSON.parse(tmp[i])
          }


          // 将调整好的的数组tmp 设置到itemlist
          wx.setStorage({
            key: 'itemlist',
            data: tmp,
          })
        }else{

          //没有查到所搜索的内容，就设置为空
          wx.setStorage({
            key: 'itemlist',
            data: [],
          })
          
        }
      
        //跳转到result页面
        wx.navigateTo({
          url: '../result/result',
        })


      }
    })


   

  },

//按cas搜索
  searchByCAS:function(text){
    var service = this.data.serviceurl
    wx.request({
      method: 'GET',
      url: service + '/chemicals/getByCAS/' + text,
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        if (res.data.length != 0) {
          var data = JSON.stringify(res.data)
          var tmp = data.split("},{")
          for (var i = 0; i < tmp.length; ++i) {
            if (tmp[i][0] == "[") {
              tmp[i] = tmp[i].substring(1)
              tmp[i] = tmp[i] + "}"
            } else {
              if (tmp[i][tmp[i].length - 1] == "]") {
                tmp[i] = tmp[i].substring(0, tmp[i].length - 1)
                tmp[i] = "{" + tmp[i]
              } else {
                tmp[i] = "{" + tmp[i] + "}"
              }
            }
            tmp[i] = JSON.parse(tmp[i])
          }

          wx.setStorage({
            key: 'itemlist',
            data: tmp,
          })
        } else {
          //没有查到所搜索的内容
          wx.setStorage({
            key: 'itemlist',
            data: [],
          })

        }
        console.log("setlist success")
        wx.navigateTo({
          url: '../result/result',
        })


      }
    })   

  },

  //保存历史记录
  _saveHistory: function (type,value) {
    var data={
      "type":type,
      "value":value
    }
   
   let history = this.data.history.filter(v => v.value !== value)
    // history.unshift(value)
    history.unshift(data)
    if (history.length > 10) {
      history = history.slice(0, 10)
    }
    this.setData({ 'history': history })
    wx.setStorage({
      key: 'history',
      data: history
    })
  },

//清除历史记录
  clearHistory:function(){
   
    wx.showModal({
      title: '清除搜索记录',
      content: '确定清除所有搜索历史？这项操作将无法撤销',
      success: res => {
        if (res.confirm) {
          wx.removeStorage({ key: 'history' })
          this.setData({ 'search.history': [] })
        }
      }
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
   
    var url=app.serviceurl;


    this.setData({serviceurl:url })
    console.log(this.data.serviceurl)

    searchBar = this.selectComponent('#searchBar')
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