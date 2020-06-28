// pages/addOrder/addOrder.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 购物车数据
    cart: [],
    // 总金额
    total_price: 0
  },
  // 表单提交方法
  formSubmit(e) {
    // 发送请求，添加订单信息
    wx.request({
      url: app.globalData.b_url + '/orders',
      method: 'POST',
      data: {
        // 总金额
        total_price: this.data.total_price,
        // 支付方式
        pay_way: e.detail.value.pay_way,
        // 联系人名称
        contact_name: e.detail.value.contact_name,
        // 手机号
        mobile_number: e.detail.value.mobile_number,
        // 收货地址
        address: e.detail.value.address,
        // 配送方式
        delivery_way: e.detail.value.delivery_way,
        // 餐品
        meals: this.data.cart,
        // 密匙
        api_token: wx.getStorageSync('api_token')
      },
      success: result => {
        // 若请求成功，则删除本地存储中的购物车数据，返回上一页
        if (result.data.code === 200) {
          wx.removeStorage({key: 'cart'});
          wx.navigateBack({delta: 1});
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取本地存储中的购物车数据
    let cart = wx.getStorageSync('cart');
    // 遍历购物车数据，删除 id 和 img 字段
    for(let item of cart){
      for(let key in item){
        if(key == 'img' || key == 'id'){
          delete item[key];
        }
      }
    }
    // 更新 data 中的总金额和购物车数据
    this.setData({
      total_price: options.total_price,
      cart: cart
    })
  }

})