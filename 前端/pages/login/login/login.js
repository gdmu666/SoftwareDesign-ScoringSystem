// pages/login/login.js
// 获取应用实例
const app = getApp();
const domain = app.globalData.domain;

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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

  },
  create_login: function (e) {
    console.log(e.detail.value)
    wx.request({
      url: domain + "/LoginServlet2",
      data: "username=" + e.detail.value["username"] + "&password=" + e.detail.value["password"] + "&method=PasswordLogin",
      method: "POST",
      header: {
        //'content-type': 'application/json' // 默认值
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: this.getResult.bind(this)
    })
  },
  getResult: function (res) {
    console.log(res.data);
    console.log(".....success request.....");

    if (res && res.header && res.header['Set-Cookie']) {
      wx.setStorageSync('cookieKey', res.header['Set-Cookie']); //保存Cookie到Storage
    }

    let cookie = wx.getStorageSync('cookieKey'); //取出Cookie
    let header = { 'Content-Type': 'application/x-www-form-urlencoded'};
    if (cookie) {
        header.Cookie = cookie;
    }
    console.log(cookie)

    if (res.data == "1") {
      wx.showToast({
        title: "登录成功",
        duration: 2000
      })
      // wx.navigateTo({
      //   url: '/pages/index/index',
      // })
      setTimeout(function () {
        wx.navigateBack({
          delta: 2 //返回上一页再返回上一页
        })
      }, 1000)
    }
    else if(res.data == "2") {
      wx.showToast({
        title: "账号或密码错误",
        icon: 'none',
        duration: 3000
      })
    }

  },
  
  goto_signup: function (res) {
    wx.navigateTo({
      url: '/pages/login/signup/signup',
    })
  }
})