// pages/alarm/alarm.js

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    itemname: "",
    //经纬度
    wd: "",
    jd: "",
    //状态
    state: ["生产", "存储", "运输", "经营", "使用", "废除"],

    //确认框
    toast1Hidden: true,
    modalHidden: true,
    modalHidden2: true,

    //提示信息
    notice_str: '',
    index: 0,
    //服务器ip和端口号
    serviceurl: '',

    //表单形成的数据
    item:{},

  },
  //点击报警 表单提交
  formSubmit: function (e) {
    var that = this;
    var formData = e.detail.value;
    that.setData({
      item: {
        chName: this.data.itemname,
        remark: formData.remark,
        location: formData.location
      }
    })
    //弹出提示框
    that.modalTap()
  
  },

  //这边是清空 没有用到
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

  //确认提交
  confirm_one: function (e) {
    console.log(e);

    this.setData({
      modalHidden: true,
      toast1Hidden: false,
      notice_str: '正在提交'
    });
    let that=this
    var service = that.data.serviceurl
    var tmpdata = JSON.stringify(that.data.item)

    console.log(tmpdata)
    //正式提交
    wx.request({
      method: 'POST',
      url: service + '/police/addOneByObj',
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

  //取消提交
  cancel_one: function (e) {
    console.log(e);
    this.setData({
      modalHidden: true,
      toast1Hidden: false,
      notice_str: '取消成功'
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
  uploadFailure: function () {
    this.setData({
      modalHidden: true,
      toast1Hidden: false,
      notice_str: '上传失败，请稍后重传'
    });
  },


  //弹出提示框  清除按钮的提示框
  //这里的两个函数没有用到 可以删除 也可保留为后续可能用到
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
 
 //选择状态
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
  onLoad: function (options) {
    var tmp = options.itemname
    let that = this
    that.setData({
      itemname: tmp
    })

    var url = app.serviceurl;
    that.setData({ serviceurl: url })
    console.log(that.data.serviceurl)

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        // console.log(res)
        var latitude = res.latitude
        var longitude = res.longitude
        that.setData({
          wd: latitude,
          jd: longitude
        })
      }
    })
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