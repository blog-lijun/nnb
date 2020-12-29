// pages/Login/login/login.js
const config = require('../../../config')
const app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    phone:'',
    password:'',
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
  goto:function(event){ 
    wx.navigateTo({
      url: '/pages/Login/register/register',
  
    })
    console.log('zhanshi');
  },
  login:function(){
    console.log('开始登录');
     //1.验证手机号格式，是否为空，是否为11位，是否为1开头;
     if(!this.data.phone || this.data.phone.length != 11 ||  this.data.phone.slice(0,1) != 1 ){
       wx.showToast({
         title: '请输入有效的手机号',
         icon:'none',
       })
       return false;
     }
     //2.验证密码，是否为空，是否正确
     if(!this.data.password){
      wx.showToast({
        title: '请输入密码',
        icon:'none',
      })
      return false;
     }
     //3.发起登录请求
     //  @登录成功之后，进行页面跳转;
     //  @登录失败，给与提示;
     app.Q(config.login,'post',{phone:this.data.phone,password:this.data.password},function(err,res){
        if(!err){
          console.log(res.data);
          if(res.data.code == 200){
            //登录成功记录，缓存成功登录的状态
            app.globalData.loginStatus = true;
            app.globalData.name = res.data.user.name;
            app.globalData.phone = res.data.user.phone;
            console.log(app.globalData)
            //跳转页面
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
            title: '服务端错误，工程师正在抢修中...',
            icon: 'none'
          })
        }
     });
     
     

  }

})