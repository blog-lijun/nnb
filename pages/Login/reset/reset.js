// pages/Login/reset/reset.js
const config = require("../../../config");
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone:'',
    password:'',
    repassword:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      phone: options.phone
    })
  },
  reset: function(){
    //1.判断电话是否正确，给出正确提示;
    if(!this.data.phone || this.data.phone.length != 11 ||  this.data.phone.slice(0,1) != 1 ){
      wx.showToast({
        title: '请输入有效的手机号',
        icon:'none',
      })
      return false;
    }
    //2.判断密码是否填写
    if(!this.data.password){
      wx.showToast({
        title: '请输入密码',
        icon: 'none'
      })
      return false;
    }
     //3.判断密码是否填写
     if(!this.data.repassword){
      wx.showToast({
        title: '请确认密码',
        icon: 'none'
      })
      return false;
    }
    //4.判断密码是否填写
    if(this.data.repassword != this.data.password){
      wx.showToast({
        title: '前后输入密码不一致!',
        icon: 'none'
      })
      return false; 
    }

    //5.发起请求，新建客户信息，并跳转到首页
    app.Q(config.reset,'post',{phone:this.data.phone,password:this.data.password},function(err,res){
       if(!err){
        if(res.data.code == 200){
          //如果新建立成功，直接跳转到首页
          app.globalData.loginStatus = true;
          app.globalData.name = res.data.user.name;
          app.globalData.phone = res.data.user.phone;
          wx.switchTab({
            url: '/pages/index/index/index',
          })
        }else{
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          })
        }
       }else{
         wx.showToast({
           title: '服务器故障，抢修中...',
           icon: 'none'
         })
       }
    });
    
  },
  goto: function(){
    wx.navigateTo({
      url: '/pages/Login/login/login',
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