const config = require('../../../config');
const app = getApp();

Page({
  data: {
    vtabs: [],
    activeTab: 0,
  },

  onLoad() {
    // const titles = ['工商服务',   '增值服务', '税收筹划','财税服务', '资质认证', '社保人事']
    // const vtabs = titles.map(item => ({title: item}))
    // this.setData({vtabs})
    var that = this;
    app.Q(config.productions, 'post', { type: 4, status: 1 }, function (err, res) {
      if (!err) {
        if (res.data.code == 200) {
          var vtabs = res.data.data;
          that.setData({ vtabs });
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
          });
        }
      } else {
        wx.showToast({
          title: '加载失败！',
          icon: 'none',
        });
      }
    });
  },
  call: function () {
    wx.makePhoneCall({
      phoneNumber: '400-627-8899', //仅为示例，并非真实的电话号码
    });
  },
  onTabCLick(e) {
    const index = e.detail.index;
    console.log('tabClick', index);
  },

  onChange(e) {
    const index = e.detail.index;
    console.log('change', index);
  },
  toDetail(e) {
    console.log(e);

    wx.navigateTo({
      url: `/pages/index/detail/detail?id=${e.currentTarget.id}`,
    });
  },
});
