// pages/order/order.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 订单信息
    order: null,
    // 订单餐品信息
    meals: null,
    // 订单地址信息
    delivery: null,
    // 订单支付信息
    pay: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 发送请求，获取订单、餐品、地址、支付等信息
    wx.request({
      url: app.globalData.b_url + '/orders/users/' + options.orderId,
      method: 'GET',
      data: {
        // 从本地存储中获取密匙
        api_token: wx.getStorageSync('api_token')
      },
      success: result => {
        // 若请求成功，则更新 data 中的订单、餐品、地址、支付等信息
        if(result.data.code === 200){
          this.setData({
            order: result.data.order,
            meals: result.data.meals,
            delivery: result.data.delivery,
            pay: result.data.pay
          })
        }
      }
    })
  }

})