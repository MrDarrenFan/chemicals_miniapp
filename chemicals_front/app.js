//app.js
import EventEmitter from './utils/event' // 事件总线
//第二版本

App({
  //服务器的地址和端口号 如有变动，直接改此处即可
  // serviceurl: "http://localhost:8080", // 本地测试
  // serviceurl: "http://192.168.31.70:8080", // 宿舍内网测试
  // serviceurl: "http://172.19.184.152:8080", 
  serviceurl: "http://2lk8460702.wicp.vip:80", // 外网

  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */

  onLaunch: function () {
 
  },

  /**
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow: function (options) {
    
  },

  /**
   * 当小程序从前台进入后台，会触发 onHide
   */
  onHide: function () {
    
  },

  /**
   * 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
   */
  onError: function (msg) {
    
  }
})
