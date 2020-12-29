// pages/mine/index/index.js
const config = require("../../../config");
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    loginStatus:false,
    name: '',
    phone:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
      // if(!app.globalData.loginStatus){
      //   wx.redirectTo({
      //     url: '/pages/Login/login/login',
      //   })
      // }
  
     
  },
  logout:function(){
      app.globalData.loginStatus = false;
      app.globalData.name = '';
      app.globalData.phone = '';
      this.onLoad();
      this.onShow(); 
      wx.switchTab({
        url: '/pages/mine/index/index',
      })
  },
  getPhoneNumber (e) {
    var that = this;
    //console.log(e.detail.errMsg)
    //如果检测到用户没有登录的时候才走这个授权接口; 然后刷新当前页面； 下次点击不出现授权按钮;
    if(e.detail.errMsg == 'getPhoneNumber:ok'){ //用户同意授权

       //检验session_key，是否有效：
       wx.checkSession({
        success () {
          //session_key 未过期，并且在本生命周期一直有效
          app.Q(config.getPhoneNumber,'post',{ encryptedData:e.detail.encryptedData,iv:e.detail.iv,session_key: app.globalData.session_key,openid:app.globalData.openid },function(err,res){ 
            if(!err){
              if(res.data.code == 200){
                //更新登录状态
                app.globalData.loginStatus = true;
                app.globalData.name = res.data.user.name;
                app.globalData.phone = res.data.user.phone;
                that.onLoad();
                that.onShow();
              }else{
                wx.showToast({
                  title: res.data.msg,
                  icon: 'none'
                })
              }
            }else{ //程序报错
              wx.showToast({
                title: '服务器异常，抢修中...',
                icon: 'none',
              })
            }
          }); 
        },
        fail () {
          // session_key 已经失效，需要重新执行登录流程
          app.Q(config.getPhoneNumber,'post',{ encryptedData:e.detail.encryptedData,iv:e.detail.iv,session_key: app.globalData.session_key,openid:app.globalData.openid },function(err,res){ 
            if(!err){
              if(res.data.code == 200){
                //更新登录状态
                app.globalData.loginStatus = true;
                app.globalData.name = res.data.user.name;
                app.globalData.phone = res.data.user.phone;
                that.onLoad();
                that.onShow();
              }else{
                wx.showToast({
                  title: res.data.msg,
                  icon: 'none'
                })
              }
            }else{ //程序报错
              wx.showToast({
                title: '服务器异常，抢修中...',
                icon: 'none',
              })
            }
          }); 
        }
       })

        
    }else{ //用户决绝授权
        //拒绝授权
    }
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
    this.setData({
      name:app.globalData.name,
      phone:app.globalData.phone,
      loginStatus: app.globalData.loginStatus,
      icon: '',
      slideButtons: [{
        text: '是',
        src: '/page/weui/cell/icon_love.svg', // icon的路径
      },{
        type: 'warn',
        text: '否',
        extClass: 'test',
          src: '/page/weui/cell/icon_del.svg', // icon的路径
      }],
  }); 
    this.setData({
      name:app.globalData.name,
      phone:app.globalData.phone
    });
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