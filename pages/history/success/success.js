// pages/success/success.js
const util = require('../../../utils/util.js');
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    taskid:'',
    date: '2016-09-01',
    time: '12:01',
    remark:'',
    imageSrc: [],
    url: []
  },
  chooseImage() {
    const self = this
    wx.chooseImage({
      count: 10,
      sizeType: ['compressed'],
      success(res) {
        console.log('chooseImage success, temp path is', res.tempFilePaths)
        var imageSrc = res.tempFilePaths
        imageSrc = self.data.imageSrc.concat(imageSrc);
        if (imageSrc.length > 10) {
          wx.showToast({
            title: '最多上传10张图片！',
          })
        } else {
          self.setData({
            imageSrc: imageSrc
          })
        }

      },
      fail({ errMsg }) {
        console.log('chooseImage fail, err is', errMsg)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      taskid:options.taskid
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
    var date = util.formatDate(new Date());
    var HM = util.formatHM(new Date());
    this.setData({
      date:date,
      time:HM
    })
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

  bindDateChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  bindTimeChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      time: e.detail.value
    })
  },
  bindRemarkChange(e){
    console.log("textarea发送改变值,",e.detail.value)
    this.setData({
      remark:e.detail.value
    })
  },
  success(){
    
    console.log(this.data);
  },
  error(){
    wx.navigateBack({
      delta: 1
    })
  },
  bindFormSubmit: function (e) {
    var _this = this;
    console.log(e.detail.value)
    //数据验证
    if(!e.detail.value.date){
      wx.showToast({
        title: '请选择日期！',
        icon: 'none',
        duration: 2000
      })
      return false;
    }
    if (!e.detail.value.time) {
      wx.showToast({
        title: '请选择时间！',
        icon: 'none',
        duration: 2000
      })
      return false;
    }
    /*if (!e.detail.value.remark) {
      wx.showToast({
        title: '请填写备注！',
        icon: 'none',
        duration: 2000
      })
      return false;
    }*/
    _this.setData({
      date: e.detail.value.date,
      time: e.detail.value.time,
      remark: e.detail.value.remark,
    })
    //数据存储
    if (_this.data.imageSrc.length) {
      wx.showLoading({
        title: '文件上传中....',
      })
      for (var i in _this.data.imageSrc) {
        app.uploadImg(function (err, url) {
          _this.setData({
            url: _this.data.url.concat(JSON.parse(url).file)
          })

          //上传信息
          if (_this.data.url.length == _this.data.imageSrc.length) {
            app.successTask(function (err, res) {
              wx.hideLoading();
              if (res == 1) {
                wx.showToast({
                  title: '保存成功!',
                  icon: 'success',
                  duration: 2000,
                  success: function (res) {
                    setTimeout(function () {
                      wx.navigateBack({
                        delta: 2
                      })
                    }, 3000)
                  }
                })

              }else{
                wx.showToast({
                  title: '图片上传失败',
                  icon:'none',
                })
              }
            }, _this.data.taskid, _this.data.date, _this.data.time, _this.data.remark, _this.data.url, app.globalData.userid )
          }
        }, _this.data.taskid, _this.data.imageSrc[i])
      }

    }else{
      app.successTask(function (err, res) {
        wx.hideLoading();
        if (res == 1) {
          wx.showToast({
            title: '保存成功!',
            icon: 'success',
            duration: 2000,
            success: function (res) {
              setTimeout(function () {
                wx.navigateBack({
                  delta: 2
                })
              }, 3000)
            }
          })

        } else {
          wx.showToast({
            title: '图片上传失败',
            icon: 'none',
          })
        }
      }, _this.data.taskid, _this.data.date, _this.data.time, _this.data.remark, _this.data.url,app.globalData.userid )

      
    }


    

  }
})