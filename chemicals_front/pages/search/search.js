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
    // 搜索的内容
    text:"",
    // 历史记录
    history:[],
    // 历史记录是否隐藏
    isLogHidden: false,
    // 服务器地址
    serviceurl:"",
    // 符合搜索条件的item 形成的list
    itemlist:[],
    // 是否显示搜索结果
    isResultHidden: true,
    // 点进去才记录 的 历史记录
    history_scan: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //从缓存中将之前的搜索结果取到
    var that = this
 

    that.setData({
      serviceurl: app.serviceurl
    })

    that._getHistory()
  },

  //点击某个条目 进入这个item的具体页
  gotodetail: function (e) {
    let that = this
    var id = e.currentTarget.dataset.index;
    //用于区别随机的list 区别于type=random
    var type = "normal"
    var data = {
      "type": type,
      "index": id
    }
    this.setHistory_scan(id)

    var dataStr = JSON.stringify(data)
    wx.navigateTo({
      url: '../resultItem/resultItem?data=' + dataStr,
    })

  },


  //查看的记录· 点进去才被记录
  setHistory_scan: function (id) {
    var history_scan_data = this.data.itemlist[id]
    console.log("发现请求 请求为")
    console.log(history_scan_data)
    var newhistory = [history_scan_data]

    // console.log(history_scan_data)
    let that = this
    that.getHistory_scan()
    var history_scan = this.data.history_scan
    if (history_scan != [] || history_scan!=null){
      for (var i = 0; i < history_scan.length; i++) {
        if (history_scan[i].chName == history_scan_data.chName) {

          console.log("出现相同的")
          console.log(history_scan[i].chName)
          console.log(history_scan_data.chName)
          history_scan.splice(i, 1)
          // console.log("删除了之前出现的")
          break;
        }
      }
    }
    for (var i = 0; i < history_scan.length; i++) {
      newhistory.push(history_scan[i])
    }
    that.setData({
      history_scan:newhistory
    })

    // console.log("新添加了一个")
    console.log(newhistory)
    wx.setStorage({
      key: 'history_scan',
      data: newhistory
    })

  },


  getHistory_scan: function () {
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
    this.setData({
      text: e.currentTarget.dataset.value
    })
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
    if (value == "" || value == null) {
      that.setData({
        isResultHidden: true,
        isLogHidden: false
      })
    }
  },

  // 清除输入栏
  onClear:function(e){
    let that=this
    that.setData({
      text:"",
      isResultHidden: true,
      isLogHidden: false
    })
  },

  //搜索回车执行的函数
  onSearch:function(e){
    let that= this
    
    that.data.itemlist=[]
    console.log("此时的itemlist")
    console.log(that.data.itemlist)
    var detail=e.detail
    var type=this.data.picker[this.data.index]
    var text=detail.value

    console.log("传的是")
    console.log(text)
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
    console.log("再次设置")
    console.log(this.data.itemlist)

    // that.setData({
    //   isResultHidden: false,
    //   isLogHidden: true
    // })
  
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
    let that = this
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

          console.log("收到的是")
          console.log(tmp)

          that.setData({
            itemlist:tmp
          })

         // 将调整好的的数组tmp 设置到itemlist
          wx.setStorage({
            key: 'itemlist',
            data: tmp,
          })
          
        }else{

          //没有查到所搜索的内容，就设置为空
          that.data.itemlist = []
          // console.log("没搜到的情况 itemlist")
         
          // console.log(that.data.itemlist)
          // console.log(that.data.itemlist.length)
          wx.setStorage({
            key: 'itemlist',
            data: [],
          })
        
          
        }
      
        //跳转到result页面
        // wx.navigateTo({
        //   url: '../result/result',
        // })


      }
    })
    //再次清空
    that.setData({
      itemlist:[],
      isResultHidden: false,
      isLogHidden: true
    })
   

  },

//按cas搜索
  searchByCAS:function(text){ 
    let that = this
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

          that.setData({
            itemlist: tmp
          })

          wx.setStorage({
            key: 'itemlist',
            data: tmp,
          })
        } else {
          //没有查到所搜索的内容


          
            that.data.itemlist=[]
          // console.log("没搜到的情况 itemlist")

          // console.log(that.data.itemlist)
          // console.log(that.data.itemlist.length)
        
          
          wx.setStorage({
            key: 'itemlist',
            data: [],
          })

        }
        // console.log("setlist success")
        // wx.navigateTo({
        //   url: '../result/result',
        // })


      }
    })   
    //再次清空
    that.setData({
      itemlist: [],
      isResultHidden: false,
      isLogHidden: true
    })

  },

  //获取历史记录
  _getHistory(){
    var that = this
    wx.getStorage({
      key: 'history',
      success: function(res) {
        that.setData({
          history:res.data
        })
      },
    })
  },

  //保存历史记录
  _saveHistory: function (type,value) {
    var data={
      "type":type,
      "value":value
    }
   
   let history = this.data.history.filter(v => v.value !== value)
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
          wx.removeStorage({ key: 'history'})
          this.setData({ 'history': [] })
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
    this._getHistory()
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