//app.js
const config = require("./config");

App({
  onLaunch: function () {
    var that = this;
    // 展示本地存储能力
    var logs = wx.getStorageSync("logs") || [];
    logs.unshift(Date.now());
    wx.setStorageSync("logs", logs);

    //获取设备信息
    wx.getSystemInfo({
      success(res) {
        //console.log(res)
      },
    });

    // 获取用户信息
    wx.login({
      success: function (res) {
        if (res.code) {
          //发起网络请求
          //console.log(res.code)
          that.Q(config.openid, "post", { code: res.code }, function (err, res) {
            if (!err) {
              //请求成功;
              that.globalData.openid = res.data.openid;
              that.globalData.session_key = res.data.session_key;
              wx.setStorageSync("openId", res.data.openid);
            } else {
              //请求失败;
              console.log(err);
            }
          });
        } else {
          console.log("获取用户登录态失败！" + res.errMsg);
        }
      },
    });
  },
  globalData: {
    loginStatus: false,
    name: "",
    phone: "",
    getUsername: "",
    session_key: "",
    openid: "",
    p_id: "",
  },
  Q(url, method, data, callback) {
    // wx.showLoading({
    //   title: "页面加载中",
    //   mask: true,
    // });
    wx.request({
      url: url,
      method: method,
      data: data,
      success(res) {
        callback(null, res);
        // wx.hideLoading();
      },
      fail(err) {
        console.log("远程请求失败，请求地址：".url, err);
        callback(err);
      },
    });
  },
  login(callback) {
    // 获取用户信息
    wx.login({
      success: function (res) {
        if (res.code) {
          //发起网络请求
          //console.log(res.code)
          that.Q(config.openid, "post", { code: res.code }, function (err, res) {
            if (!err) {
              //请求成功;
              //console.log(res);
              that.globalData.openid = res.data.openid;
              that.globalData.session_key = res.data.session_key;
              callback(null);
            } else {
              //请求失败;
              console.log(err);
              callback(err);
            }
          });
        } else {
          console.log("获取用户登录态失败！" + res.errMsg);
        }
      },
    });
  },
  getAccountList() {},
  //获取open_id;
  getOpenid(callback) {
    const self = this;
    if (self.globalData.openid) {
      callback(null, self.globalData.openid);
    } else {
      // 登录
      wx.login({
        success: (res) => {
          //console.log(res);
          if (res.code) {
            //登录成功后，获取open_id和session_key;
            wx.request({
              url: config.openIdUrl,
              data: { code: res.code },
              method: "POST",
              success(res) {
                //console.log(res.data);
                self.globalData.session_key = res.data.session_key;
                self.globalData.openid = res.data.openid;
                callback(null, self.globalData.openid);
              },
              fail(err) {
                console.log("config.openIdUrl 接口调用失败，将无法正常使用开放接口等服务", err);
                callback(err);
              },
            });
          }
        },
        fail(err) {
          console.log("wx.login 接口调用失败，将无法正常使用开放接口等服务", err);
          callback(err);
        },
      });
    }
  },
  //设置open_id;
  setOpenid(callback, id, openid) {
    wx.request({
      url: config.setOpenid,
      data: { id: id, openid: openid },
      method: "POST",
      success: function (res) {
        callback(null, res.data);
      },
      fail(err) {
        console.log("config.setOpenid 接口调用失败", err);
        callback(err);
      },
    });
  },
  //取消openid绑定;
  unOpenid(callback, id, openid) {
    wx.request({
      url: config.unOpenid,
      data: { id: id, openid: openid },
      method: "POST",
      success: function (res) {
        callback(null, res.data);
      },
      fail(err) {
        console.log("config.unOpenid 接口调用失败", err);
        callback(err);
      },
    });
  },
  //获取userid
  getUserid(callback, openid) {
    const self = this;
    wx.request({
      url: config.getUserid,
      method: "POST",
      data: { openid: openid },
      success: function (res) {
        console.log(res.data);
        self.globalData.userid = res.data;
        callback(null, self.globalData.userid);
      },
      error: function (err) {
        console.log("config.getUserid 接口调用失败", err);
        callback(err);
      },
    });
  },
  //获取username
  getUsername(callback, openid) {
    const self = this;
    wx.request({
      url: config.getUsername,
      method: "POST",
      data: { openid: openid },
      success: function (res) {
        console.log(res.data);
        self.globalData.getUsername = res.data;
        callback(null, self.globalData.getUsername);
      },
      error: function (err) {
        console.log("config.getUserid 接口调用失败", err);
        callback(err);
      },
    });
  },
  //获取用户对应数据
  getTasks(callback, userid, status) {
    wx.request({
      url: config.getTasks,
      method: "POST",
      data: { userid: userid, status: status },
      success: function (res) {
        console.log(res.data);
        callback(null, res.data);
      },
      error: function (err) {
        console.log("config.getTasks 接口调用失败", err);
        callback(err);
      },
    });
  },
  //获取用户对应数据，以搜索条件
  getTasksBySearch(callback, userid, status, search) {
    wx.request({
      url: config.getTasks,
      method: "POST",
      data: { userid: userid, status: status, search: search },
      success: function (res) {
        console.log(res.data);
        callback(null, res.data);
      },
      error: function (err) {
        console.log("config.getTasks 接口调用失败", err);
        callback(err);
      },
    });
  },
  //获取用户对应数据
  getTask(callback, taskid) {
    wx.request({
      url: config.getTask,
      method: "POST",
      data: { taskid: taskid },
      success: function (res) {
        console.log(res.data);
        callback(null, res.data);
      },
      error: function (err) {
        console.log("config.getTask 接口调用失败", err);
        callback(err);
      },
    });
  },
  //完成某个任务
  successTask(callback, taskid, date, time, remark, url, userid) {
    wx.request({
      url: config.successTask,
      method: "POST",
      data: { taskid: taskid, date: date, time: time, remark: remark, url: url, userid: userid },
      success: function (res) {
        console.log(res.data);
        callback(null, res.data);
      },
      error: function (err) {
        console.log("config.successTask 接口调用失败", err);
        callback(err);
      },
    });
  },
  //未完成某个任务
  errorTask(callback, taskid, undone_remark, remark, userid, date, time, url) {
    wx.request({
      url: config.errorTask,
      method: "POST",
      data: { taskid: taskid, undone_remark: undone_remark, remark: remark, userid: userid, date: date, time: time, url: url },
      success: function (res) {
        console.log(res.data);
        callback(null, res.data);
      },
      error: function (err) {
        console.log("config.errorTask 接口调用失败", err);
        callback(err);
      },
    });
  },
  //获取需要绑定的客户
  getUsers(callback) {
    wx.request({
      url: config.getUsers,
      method: "get",
      header: {},
      data: {},
      dataType: "json",
      success(res) {
        callback(null, res.data);
      },
      fail(res) {
        console.log(res);
      },
      complete(res) {
        //console.log(res);
      },
    });
  },
  //直接通过状态获取当前用户下所有任务
  getTasksByStatus(callback, status) {
    var _this = this;
    _this.getOpenid(function (err, openid) {
      _this.getUserid(function (err, userid) {
        if (userid) {
          _this.getTasks(
            function (err, tasks) {
              callback(null, tasks);
            },
            userid,
            status
          );
        } else {
          console.log("config.getuserid:获取用户userid失败!", err);
          callback(err);
        }
      }, openid);
    });
  },
  //上传图片
  uploadImg(callback, taskid, filePath) {
    wx.uploadFile({
      url: config.uploadImg,
      filePath: filePath,
      name: "file",
      formData: { taskid: taskid },
      success(res) {
        console.log(res);
        callback(null, res.data);
      },
      fail(err) {
        console.log("config.uploadImg 图片上传接口调用失败！", err);
        callback(err);
      },
    });
  },
  //批量传图
  uploadImgs(callback, taskid, filepaths) {
    var _this = this,
      i = data.i ? data.i : 0,
      success = data.success ? data.success : 0,
      fail = data.fail ? data.fail : 0,
      url = data.url ? data.url : [];
    _this.uploadImg(
      function (err, url) {
        if (!err) {
          success++;
          url = url.push(url);
        } else {
          fail++;
        }
        i++;
        //公共调用
        if (i == filepaths.length) {
          callback(null, url);
        } else {
          data.i = i;
          data.success = success;
          data.fail = fail;
          _this.uploadImgs(
            function (err, url) {
              url = url.concat(url);
            },
            taskid,
            filepaths,
            data
          );
        }
      },
      taskid,
      filepaths[i]
    );
  },
});
