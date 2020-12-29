// pages/mail/mail.js
//获取应用实例
const util = require('../../../utils/util.js')
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    tasks: [],
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    width: '50px',
    number: 0,
    number1: 0,
    startX: 0,
    startY: 0,
  },
  touchStart(e) {
    this.setData({
      startX: e.changedTouches[0].clientX,
      startY: e.changedTouches[0].clientY
    });
  },
  touchEnd(e) {
    let x = e.changedTouches[0].clientX
    let y = e.changedTouches[0].clientY
    let fx = util.getTouchFX(x, y, this.data.startX, this.data.startY)
    if (fx == 'left') {
      wx.switchTab({
        url: '/pages/mail/mail',
      })
    } else if (fx == 'right') {
      wx.switchTab({
        url: '/pages/logs/logs',
      })
    }
  },
  //下拉刷新
  onPullDownRefresh() {
    var _this = this;
    //加载待办数据
    wx.showLoading({
      title: '拼命加载中...',
      icon: 'loading'
    })
    app.getOpenid(function (aaa, openid) {
      app.getUserid(function (err, userid) {
        if(userid){
          app.getTasks(function (err, tasks) {
            _this.setData({
              tasks: tasks,
              number1: tasks.length,
            });
            //console.log(tasks);
            wx.hideLoading({
              success: function (res) {
                wx.stopPullDownRefresh();
              }
            });
          }, userid, 7)
        } else {
          wx.hideLoading({
            success: function (res) {
              wx.stopPullDownRefresh();
            }
          });
        }
       
      }, openid)
    })
    //加载已完成数据的数量
    app.getOpenid(function (aaa, openid) {
      app.getUserid(function (err, userid) {
        if(userid){
          app.getTasks(function (err, tasks) {
            _this.setData({
              number: tasks.length,
            });
          }, userid, 6)
        }else{
          _this.setData({
            number: 0,
          });
        }
        
      }, openid)
    })
  },
  //事件处理函数
  bindViewTap: function () {

  },
  skipmail() {
    wx.switchTab({
      url: "/pages/mail/mail",
    })
  },
  onLoad: function () {

  },
  onShow: function () {
    var _this = this;
    //加载未完成数据
    app.getOpenid(function (aaa, openid) {
      app.getUserid(function (err, userid) {
        if(userid){
          app.getTasks(function (err, tasks) {
            _this.setData({
              tasks: tasks,
              number1: tasks.length
            });
            console.log(tasks);
          }, userid, 7)
        }else{
          _this.setData({
            tasks: [],
            number1: 0,
          });
        }
        
      }, openid)
    })
    //加载已完成数据的数量
    app.getOpenid(function (aaa, openid) {
      app.getUserid(function (err, userid) {
        if(userid){
          app.getTasks(function (err, tasks) {
            _this.setData({
              number: tasks.length,
            });
            console.log(tasks);
          }, userid, 6)
        }else{
          _this.setData({
            number: 0,
          });
        }
        
      }, openid)
    })
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  //搜索刷新
  getTasksBySearch: function () {
    var _this = this;
    //搜索条件加载数据
    app.getOpenid(function (aaa, openid) {
      app.getUserid(function (err, userid) {
        if (userid) {
          app.getTasksBySearch(function (err, tasks) {
            _this.setData({
              tasks: tasks,
              number: tasks.length,
            });
            //console.log(tasks);
          }, userid, 5, _this.data.search)
        } else {
          _this.setData({
            tasks: [],
            number: 0,
          });
          wx.showToast({
            title: "请先进行账户绑定！",
            icon: 'none',
            duration: 2000,
            success: function () {
              /*setTimeout(function(){
                wx.switchTab({
                  url: '/pages/logs/logs'
                })
              },3000)
             */
            }
          })
        }

      }, openid)
    })
  },
  upSearch: function (e) {
    console.log(e);
    this.setData({
      search: e.detail.value
    });
    this.getTasksBySearch();
  }
})
