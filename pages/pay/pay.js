// pages/pay/pay.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 微信支付 API 所需参数
    prepay_id: '',
    // 支付id
    pay_id: 0,
    // 总金额
    total_price: 0,
    // 订单号
    order_num: ''
  },
  pay(e){
    // 发起微信支付 package = 'prepay_id=***'
    // wx.requestPayment({
    //   timeStamp: '',
    //   nonceStr: '',
    //   package: '',
    //   signType: 'MD5',
    //   paySign: '',
    //   success (res) { },
    //   fail (res) { }
    // })
    // 发送请求，修改支付信息
    wx.request({
      url: app.globalData.b_url + '/pays/' + this.data.pay_id,
      method: 'PUT',
      data: {
        // 从本地存储中获取 api_token
        api_token: wx.getStorageSync('api_token')
      },
      success: result => {
        // 修改成功，弹出提示信息
        if(result.data.code === 200){
          wx.showToast({
            title: '支付成功',
            icon: 'success',
            duration: 1000
          });
          // 1秒后返回上一页
          setTimeout(function(){
            wx.navigateBack({delta: 1});
          }, 1000)
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 数据初始化
    this.setData({
      pay_id: options.pay_id,
      total_price: options.total_price,
      order_num: options.order_num
    })
    // 调用接口获取登录凭证
    wx.login({
      success: res => {
        if (res.code) {
          // 发送支付请求
          wx.request({
            url: app.globalData.b_url + '/pays/' + options.pay_id,
            method: 'GET',
            data: {
              // 登录凭证
              code: res.code,
              // 从本地存储中获取 api_token
              api_token: wx.getStorageSync('api_token')
            },
            success: result => {
              // 获取 prepay_id
              this.setData({
                prepay_id: result.data.data.prepay_id
              })
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  }

})