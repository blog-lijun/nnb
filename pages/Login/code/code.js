// pages/Login/code/code.js
const config = require("../../../config");
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone:'',
    code: '',
    codeText: '获取验证码',
    inter:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  getCode: function(){
    console.log(this.data.codeText);
    if(this.data.codeText != '获取验证码') return false; 
    //判断电话是否正确，给出正确提示;
    if(!this.data.phone || this.data.phone.length != 11 ||  this.data.phone.slice(0,1) != 1 ){
      wx.showToast({
        title: '请输入有效的手机号',
        icon:'none',
      })
      return false;
    }
    //调用接口，发送验证码，并存储验证码到缓存;
    var that = this;
    app.Q(config.code,'post',{phone:this.data.phone},function(err,res){
        console.log(err,res);
        //获取验证码成功 给出提示，并且建立定时任务，修改页面样式
        if(!err && res.data.code == 200){
          var time = 60;
         that.data.inter = setInterval(function(){
                //展示秒数
                that.setData({
                  codeText:time+'s',
                });
                if(time == 0){
                  clearInterval(that.data.inter);
                  setTimeout(function(){
                    that.setData({
                      codeText:'获取验证码',
                    });
                  },1000)
                 
                }
                time--;
          },1000);
        }else{ //获取验证码失败，给出提示 
           wx.showToast({
             title: '验证码获取失败，工程师正在抢修中...',
             icon: 'none'
           })
        }
    });
  },
  login: function(){
    var that = this;
    //1.判断电话是否正确，给出正确提示;
    if(!this.data.phone || this.data.phone.length != 11 ||  this.data.phone.slice(0,1) != 1 ){
      wx.showToast({
        title: '请输入有效的手机号',
        icon:'none',
      })
      return false;
    }
    //2.判断验证码是否存在
    if(!this.data.code){
        wx.showToast({
          title: '请输入验证码',
          icon: 'none',
        })
        return false;
    }
    //3.发起请求
    app.Q(config.codeLogin,'post',{phone:this.data.phone,code:this.data.code},function(err,res){
      if(!err){
          if(res.data.code == 200){
            //登录成功记录，缓存成功登录的状态
            app.globalData.loginStatus = true;
            app.globalData.name = res.data.user.name;
            app.globalData.phone = res.data.user.phone;
            //验证成功，跳转页面到，填写用户名，密码界面;
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
          title: '服务器异常，工程师正在抢修中...',
          icon: 'none',
        })
      }
    });
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