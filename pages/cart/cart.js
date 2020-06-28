// pages/cart/cart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cart: [],
    total_price: 0
  },
  doCart(e){
    let cart = [];
    let number = e.currentTarget.dataset.number;
    try {
      cart = wx.getStorageSync('cart');
      for(let i = 0; i < cart.length; i++){
        if(cart[i].id === e.currentTarget.dataset.mealid){
          if(number + cart[i].amount === 0){
            cart.splice(i, i + 1);
          }else{
            cart[i].amount = number + cart[i].amount;
          }
          wx.setStorage({
            key: 'cart',
            data: cart
          })
        }
      }
    } catch (e) {
      // Do something when catch error
    }
    this.setData({
      cart: wx.getStorageSync('cart')
    })
    this.setTotalPrice();
  },
  setTotalPrice(){
    let count = 0;
    for(let i = 0; i < this.data.cart.length; i++){
      count += this.data.cart[i].price * this.data.cart[i].amount;
    }
    this.setData({
      total_price: count
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      cart: wx.getStorageSync('cart')
    })
    this.setTotalPrice()
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
    this.setData({
      cart: wx.getStorageSync('cart')
    })
    this.setTotalPrice()
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