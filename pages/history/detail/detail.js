// pages/detail/detail.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    taskid:0,
    task:{},
    type:0,
  },
  telphone(e){
    var phone = e.target.dataset.phone
    wx.makePhoneCall({
      phoneNumber: phone,
      fail(err){
          console.log("打电话失败！");
          wx.showToast({
            title: '拨打电话失败',
            icon:'none',
          })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this
    _this.setData({
      taskid: options.taskid,
      type: options.type,
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
    var _this = this
    //获取当前任务详情；
    app.getTask(function (err, task) {
      _this.setData({
        task: task,
      })
    }, _this.data.taskid)
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

  //完成
  complete(){
    wx.showModal({
      title: '提示',
      content: "<input> i like you</input>",
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  //大图预览
  biggerImage(e){
    const current = e.target.dataset.url
    console.log(e.target);
    wx.previewImage({
      current,
      urls: this.data.task.img_src,
    })
  },

})