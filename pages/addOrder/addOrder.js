// pages/addOrder/addOrder.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    cart: [],
    total_price: 0
  },
  formSubmit(e) {
    wx.request({
      url: app.globalData.b_url + '/orders',
      method: 'POST',
      data: {
        total_price: this.data.total_price,
        pay_way: e.detail.value.pay_way,
        contact_name: e.detail.value.contact_name,
        mobile_number: e.detail.value.mobile_number,
        address: e.detail.value.address,
        delivery_way: e.detail.value.delivery_way,
        meals: this.data.cart,
        api_token: wx.getStorageSync('api_token')
      },
      success: result => {
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
    let cart = wx.getStorageSync('cart');
    for(let item of cart){
      for(let key in item){
        if(key == 'img' || key == 'id'){
          delete item[key];
        }
      }
    }
    this.setData({
      total_price: options.total_price,
      cart: cart
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