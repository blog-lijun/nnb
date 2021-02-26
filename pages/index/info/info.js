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
    inner: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    this.setData({
      id: options.id,
    });

    var pattern = new RegExp('<video(\\S*?)[^>]*>.*?|<.*? /video>');
    let del = new RegExp('src="(\\S*)"');
    let a = '<video>123</video>';
    //加载对应产品的图片信息;
    //加载banner图;
    app.Q(config.getZx, 'post', { id: options.id }, function (err, res) {

      if (!err) {
        if (res.data.code == 200) {
          res.data.data[0].content = res.data.data[0].content.replace(/style='max-width:100%;'/g, "style='width:100%;display:block' ").replace(/style="height:auto;"/g,"");
          console.log(res.data.data[0].content);

          that.setData({
            info: res.data.data[0],
          });

          if (pattern.test(res.data.data[0].content)) {
            that.setData({
              video: res.data.data[0].content.match(del)[1],
            });
          }
          console.log(pattern.test(a));
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
  call:function(){
    wx.makePhoneCall({
      phoneNumber: '400-627-8899' //仅为示例，并非真实的电话号码
    })
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
