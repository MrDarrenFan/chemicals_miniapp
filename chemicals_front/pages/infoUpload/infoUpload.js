// pages/infoUpload/infoUpload.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //产品名称
    itemname:"",

    //经纬度
    wd: "",
    jd: "",
    //状态
    state: ["生产","存储","运输","经营","使用","废除"],
    //确认提示框
    toast1Hidden: true,
    modalHidden: true,

    // modalHidden2: true,

    //提示信息
    notice_str: '',
    //用于状态选择了第几个
    index: 0,
   
    serviceurl: '',
    //页面的信息组成的item 用于向服务器传
    item:{}
  },

  onLoad: function (options) {
   
    //收到传的item的chName
    var tmp=options.itemname
    let that =this
    that.setData({
      itemname:tmp
    })

    var url = app.serviceurl;
    that.setData({ serviceurl: url })
    console.log(that.data.serviceurl)

    //获取经纬度
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        console.log(res)
        var latitude = res.latitude
        var longitude = res.longitude
        that.setData({
          wd: latitude,
          jd: longitude
        })
        console.log(latitude)
      },
      fail:function(e){
        console.log(e)
      }
      
    })

  },

//表单点击提交
  formSubmit: function (e) {
    var that = this;
    var formData = e.detail.value;
    //serialNumber: "3333", bussinessName: "4444", state: "生产", location: "32.06639 118.77013", remark: "55555555"
    //将表单的格式转为服务器要求的格式 例如 serialNumber变为batchNumber
    that.setData({
      item:{
        chName: this.data.itemname,
        batchNumber: formData.serialNumber,
        companyName: formData.bussinessName, 
        chemStatus: formData.state, 
        remark: formData.remark, 
        location: formData.location
      }
    })
    //弹出确认框
    that.modalTap()
   
  },

  //这个没有用到 ，用于重置表单
  formReset: function () {
    console.log('form发生了reset事件');
    this.modalTap2();
  },


  //弹出确认框
  modalTap: function (e) {
    this.setData({
      modalHidden: false
    })
  },

  //在确认提示框里点击的 确认
  confirm_one: function (e) {
    console.log(e);
    this.setData({
      modalHidden: true,
      toast1Hidden: false,
      notice_str: '正在提交'
    }); 
    var that = this
    var service = that.data.serviceurl
    var tmpdata = JSON.stringify(that.data.item)
    // console.log("tmpdata" + tmpdata)

    wx.request({
      method: 'POST',
      url: service + '/upload/addOneByObj',
      data: tmpdata,
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
       
        if (res.data == true) {
          that.uploadSuccess()
        } else {
          that.uploadFailure()
        }
      }
    })

   

  },
  //在确认提示框里点击  取消上传
  cancel_one: function (e) {
    // console.log(e);
    this.setData({
      modalHidden: true,
      toast1Hidden: false,
      notice_str: '已取消'
    });

  },

//上传成功
  uploadSuccess: function () {
    this.setData({
      modalHidden: true,
      toast1Hidden: false,
      notice_str: '上传成功'
    });
  },
//上传失败
uploadFailure:function(){
  this.setData({
    modalHidden: true,
    toast1Hidden: false,
    notice_str: '上传失败，请稍后重试'
  });
},

  //这边两个函数没有用到 主要是和重置选项匹配的
  modalTap2: function (e) {
    this.setData({
      modalHidden2: false
    })
  },
  modalChange2: function (e) {
    this.setData({
      modalHidden2: true
    })
  },

//对状态的选择
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },

  toast1Change: function (e) {
    this.setData({ toast1Hidden: true });
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  



  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this
    


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