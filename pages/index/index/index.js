//index.js
//获取应用实例
const config = require("../../../config");
const util = require("../../../utils/util.js");
const app = getApp();

Page({
  //点分享时候响应的title,对应页面
  // onShareAppMessage: function (res) {
  //   if (res.from === "menu") {
  //     // 来自页面内转发按钮
  //     console.log(res.target);
  //   }
  //   return {
  //     title: "自定义转发标题",
  //     path: "/pages/index/index/index?openid=" + wx.getStorageSync("openId") + "&p_id=" + wx.getStorageSync("P_id"),
  //   };
  // },
  // onShareTimeline() {
  //   return {
  //     title: "朋友圈测试",
  //     query: "openid=" + wx.getStorageSync("openId") + "&p_id=" + wx.getStorageSync("P_id"),
  //     imageUrl: "",
  //   };
  // },
  data: {
    background: ["http://qiniu.phplijun.cn/banner.png", "111", "http://qiniu.phplijun.cn/banner.png"],
    indicatorDots: true,
    vertical: true,
    autoplay: true,
    interval: 2000,
    duration: 500,
    tabs: [],
    hots: [],
    activeTab: 0,
  },
  onLoad() {
    // 分享绑定
    // let pages = getCurrentPages();
    // app.globalData.p_id = pages[0].options.p_id;
    // +wx.getStorage('openId')
    var that = this;
    // if(!app.globalData.loginStatus){
    //   wx.redirectTo({
    //     url: '/pages/Login/login/login',
    //   })
    // }


    //加载banner图;
    app.Q(config.getConfig, "post", { type: 1 }, function (err, res) {
      //console.log(res);
      if (!err) {
        if (res.data.code == 200) {
          that.setData({
            background: res.data.data[0],
          });
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: "none",
          });
        }
      } else {
        wx.showToast({
          title: "banner加载失败！",
          icon: "none",
        });
      }
    });
    // 加载热门服务
    app.Q(config.getConfigHot, "post", { type: 4, status: 1, is_hot: 1 }, function (err, res) {
      //console.log(res);
      if (!err) {
        if (res.data.code == 200) {
          that.setData({
            hots: res.data.data,
          });
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: "none",
          });
        }
      } else {
        wx.showToast({
          title: "banner加载失败！",
          icon: "none",
        });
      }
    });
    // 财税学堂加载
    app.Q(config.csxt, "post", { status: 1 }, function (err, res) {
      // console.log(res);
      if (!err) {
        if (res.data.code == 200) {
          var tabs = res.data.data;
          that.setData({ tabs });
          // console.log(res.data.data);
        
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: "none",
          });
        }
      } else {
        wx.showToast({
          title: "banner加载失败！",
          icon: "none",
        });
      }
    });
  },
  onTabCLick(e) {
    const index = e.detail.index;
    this.setData({ activeTab: index });
  },
  onChange(e) {
    const index = e.detail.index;
    this.setData({ activeTab: index });
  },
  onShow() {
    var that = this;

    if (!that.background) {
      //加载banner图;
      app.Q(config.getConfig, "post", { type: 1 }, function (err, res) {
        console.log(res);
        if (!err) {
          if (res.data.code == 200) {
            that.setData({
              background: res.data.data[0],
            });
            console.log(that.data.background);
          } else {
            wx.showToast({
              title: res.data.msg,
              icon: "none",
            });
          }
        } else {
          wx.showToast({
            title: "banner加载失败！",
            icon: "none",
          });
        }
      });
    }
    if (!that.hots) {
      // 加载热门服务
      app.Q(config.getConfigHot, "post", { type: 4, status: 1, is_hot: 1 }, function (err, res) {
        console.log(res);
        if (!err) {
          if (res.data.code == 200) {
            that.setData({
              hots: res.data.data,
            });
          } else {
            wx.showToast({
              title: res.data.msg,
              icon: "none",
            });
          }
        } else {
          wx.showToast({
            title: "banner加载失败！",
            icon: "none",
          });
        }
      });
    }
    if (!that.tabs) {
      // 财税学堂加载
      app.Q(config.csxt, "post", { status: 1 }, function (err, res) {
        // console.log(res);
        if (!err) {
          if (res.data.code == 200) {
            var tabs = res.data.data;
            that.setData({ tabs });
            // console.log(res.data.data);
          } else {
            wx.showToast({
              title: res.data.msg,
              icon: "none",
            });
          }
        } else {
          wx.showToast({
            title: "banner加载失败！",
            icon: "none",
          });
        }
      });
    }

    // const titles = ['财税干货', '政策解读', '秒懂财税', '公司动态']
    // var tabs = titles.map(item => ({title: item}))
    //  tabs = tabs.map(item => ({title: item.title,data:[1,3,4]}))
    // console.log(tabs);
    // this.setData({tabs})
  },
});
