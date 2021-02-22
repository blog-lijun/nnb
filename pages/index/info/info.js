// pages/index/detail/detail.js
const config = require('../../../config');
const app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    info: '',
    phone: '',
    code: '',
    codeText: '获取验证码',
    inter: '',
    id: 1, //咨询产品id;
    video: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    this.setData({
      id: options.id,
    });

    var pattern = new RegExp('<(\\S*?)[^>]*>.*?|<.*? />');
    let del = new RegExp('src="(\\S*)"');
   
    //加载对应产品的图片信息;
    //加载banner图;
    app.Q(config.getZx, 'post', { id: options.id }, function (err, res) {
      console.log(res);
      if (!err) {
        if (res.data.code == 200) {
          that.setData({
            info: res.data.data[0],
          });
          console.log();
          if (pattern.test(res.data.data[0].content)) {
            that.setData({
              video: res.data.data[0].content.match(del)[1],
            });
          }
          console.log(res.data.data[0].content.match(del)[1]);
          wx.setNavigationBarTitle({
            title: res.data.data[0].name,
          });
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
          });
        }
      } else {
        wx.showToast({
          title: 'banner加载失败！',
          icon: 'none',
        });
      }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
});
