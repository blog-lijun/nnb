// pages/account/index/index.js
const config = require("../../../config");
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '我的企业', // 状态
    list: [], // 数据列表
    type: '', // 数据类型
    loading: false, // 显示等待框
    showModal:false,
    company_name:'',
    bindPhone:'',
    phone:'',
    loginStatus:''
  }, 

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  show: function(e){
    console.log(e.target.dataset.id);
    wx.navigateTo({
      url: '/pages/account/show/show?id='+e.target.dataset.id ,
    })
    this.setData({
      loginStatus:app.globalData.loginStatus,
    });
  },
//外面的弹窗
btn:function () {
  this.setData({
    showModal:true
  })
},

// 禁止屏幕滚动
preventTouchMove:function () {
},

// 弹出层里面的弹窗
cancel:function () {
  this.setData({
    showModal:false
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
    this.setData({
      phone: app.globalData.phone,
      list: [],
      loginStatus: app.globalData.loginStatus,
    });
    var that = this;
    //请求绑定企业数据，并渲染到页面中
    app.Q(config.getBindLists,'get',{phone:app.globalData.phone},function(err,res){
        console.log(res.data);
        if(!err){
          if(res.data.code == 200){
            //查询企业信息列表
            that.setData({
              list:res.data.list,
            });
           
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
//绑定查账企业
bind:function(){
  var that = this;
  //1.请输入公司名称
  if(!this.data.company_name){
      wx.showToast({
        title: '请输入公司名称',
        icon: 'none',
      })
      return false;
  }
  //2.判断电话是否正确，给出正确提示;
  if(!this.data.bindPhone || this.data.bindPhone.length != 11 ||  this.data.bindPhone.slice(0,1) != 1 ){
    wx.showToast({
      title: '请输入有效的手机号',
      icon:'none',
    })
    return false;
  }
  //3.发起请求,后台建立绑定关系
  app.Q(config.bind,'post',{company_name:that.data.company_name,bindPhone:that.data.bindPhone,phone:that.data.phone},function(err,res){
    console.log(res.data);
    if(!err){
      if(res.data.code == 200){
       //查询成功之后，刷新列表
      that.onShow();
       //关闭弹层
       that.setData({
        showModal:false
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
                that.setData({
                  showModal:true,
                  loginStatus: true
                })
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
          app.login(function(err){
             if(!err){
              app.Q(config.getPhoneNumber,'post',{ encryptedData:e.detail.encryptedData,iv:e.detail.iv,session_key: app.globalData.session_key,openid:app.globalData.openid },function(err,res){ 
                if(!err){
                  if(res.data.code == 200){
                    //更新登录状态
                    app.globalData.loginStatus = true;
                    app.globalData.name = res.data.user.name;
                    app.globalData.phone = res.data.user.phone;
                    that.setData({
                      showModal:true,
                      loginStatus: true
                    })
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
        }
       })
  }else{ //用户决绝授权
      //拒绝授权
  }
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