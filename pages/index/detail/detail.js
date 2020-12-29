// pages/index/detail/detail.js
const config = require("../../../config");
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    production:'',
    phone:'',
    code: '',
    codeText: '获取验证码',
    inter:'',
    p_id:1, //咨询产品id;
  },
  getCode: function(){
    console.log(this.data.codeText);
    if(this.data.codeText != '获取验证码') return false; 
    //判断电话是否正确，给出正确提示;
    if(!this.data.phone || this.data.phone.length != 11 ||  this.data.phone.slice(0,1) != 1 ){
      wx.showToast({
        title: '请输入有效的手机号',
        icon:'none',
      })
      return false;
    }
    //调用接口，发送验证码，并存储验证码到缓存;
    var that = this;
    app.Q(config.code,'post',{phone:this.data.phone},function(err,res){
        console.log(err,res);
        //获取验证码成功 给出提示，并且建立定时任务，修改页面样式
        if(!err && res.data.code == 200){
          var time = 60;
         that.data.inter = setInterval(function(){
                //展示秒数
                that.setData({
                  codeText:time+'s',
                });
                if(time == 0){
                  clearInterval(that.data.inter);
                  setTimeout(function(){
                    that.setData({
                      codeText:'获取验证码',
                    });
                  },1000)
                 
                }
                time--;
          },1000);
        }else{ //获取验证码失败，给出提示 
           wx.showToast({
             title: '验证码获取失败，工程师正在抢修中...',
             icon: 'none'
           })
        }
    });
  },
  zx_insert: function(){
      var that = this;
      //1.判断电话是否正确，给出正确提示;
      if(!this.data.phone || this.data.phone.length != 11 ||  this.data.phone.slice(0,1) != 1 ){
        wx.showToast({
          title: '请输入有效的手机号',
          icon:'none',
        })
        return false;
      }
      //2.判断用户名是否填写
      if(!this.data.name){
        wx.showToast({
          title: '请输入您的称呼',
          icon: 'none',
        })
        return false;
      }
      //3.判断密码是否填写
      if(!this.data.code){
        wx.showToast({
          title: '请输入验证码',
          icon: 'none',
        })
        return false;
      }
      if(!this.data.p_id){
        wx.showToast({
          title: '您咨询产品ID为空',
          icon: 'none',
        })
        return false;
      }

      //4.发起请求，新建客户信息，并跳转到首页
      app.Q(config.zxInsert,'post',{name:this.data.name,phone:this.data.phone,code:this.data.code,p_id:this.data.p_id},function(err,res){
         if(!err){
          if(res.data.code == 200){
            //如果咨询成功，给出提示;
            wx.showToast({
              title: res.data.msg,
              icon: 'success'
            })
            that.onReady();
          }else{
            wx.showToast({
              title: res.data.msg,
              icon: 'none'
            })
          }
         }else{
           wx.showToast({
             title: '服务器故障，抢修中...',
             icon: 'none'
           })
         }
      });
      
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    this.setData({
      p_id:options.id
    });
    //加载对应产品的图片信息;
     //加载banner图;
     app.Q(config.getConfig,'post',{type:4,id:options.id},function(err,res){
      console.log(res);
      if(!err){
          if(res.data.code == 200){
             that.setData({
                production:res.data.data[0],
              });
              wx.setNavigationBarTitle({
                title:res.data.data[0].name,
              });
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

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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