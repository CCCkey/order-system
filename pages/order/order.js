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
  // 调转支付页方法，传递支付 id、总金额和订单号
  clickPay(e){
    wx.navigateTo({
      url: '/pages/pay/pay?pay_id=' + e.currentTarget.dataset.payId + '&total_price=' + e.currentTarget.dataset.totalPrice + '&order_num=' + e.currentTarget.dataset.orderNum
    })
  },
  // 获取订单方法
  getOrder(id){
    // 发送请求，获取订单、餐品、地址、支付等信息
    wx.request({
      url: app.globalData.b_url + '/orders/users/' + id,
      method: 'GET',
      data: {
        // 从本地存储中获取密匙
        api_token: wx.getStorageSync('api_token')
      },
      success: result => {
        // 若请求成功，则更新 data 中的订单、餐品、地址、支付等信息
        if(result.data.code === 200){
          this.setData({
            order: result.data.data.order,
            meals: result.data.data.meals,
            delivery: result.data.data.delivery,
            pay: result.data.data.pay
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 调用获取订单方法
    this.getOrder(options.orderId);
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // 若订单信息不存在，则调用获取订单方法
    if(this.data.order != null){
      this.getOrder(this.data.order.id);
    }
  }

})