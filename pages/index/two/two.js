const config = require("../../../config");
const app = getApp()

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
     // 财税学堂加载
     app.Q(config.productions,'post',{type:4,status:1},function(err,res){
      console.log(res);
      if(!err){
        if(res.data.code == 200){
          var vtabs = res.data.data;
           that.setData({vtabs});
        }else{
          wx.showToast({
            title: res.data.msg,
            icon:'none'
          })
        }
    }else{
      wx.showToast({
        title: 'banner加载失败！',
        icon:'none'
      })
    }
  });
  },

  onTabCLick(e) {
    const index = e.detail.index
    console.log('tabClick', index)
  },

  onChange(e) {
    const index = e.detail.index
    console.log('change', index)
  }

})
