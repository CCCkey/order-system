// pages/cart/cart.js
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
  // 购物车操作方法
  doCart(e){
    // 购物车数据
    let cart = [];
    // 操作数量
    let number = e.currentTarget.dataset.number;
    try {
      // 获取本地存储中的购物车数据
      cart = wx.getStorageSync('cart');
      // 遍历 cart
      for(let i = 0; i < cart.length; i++){
        // 若餐品 id 一致，则进行增减操作
        if(cart[i].id === e.currentTarget.dataset.mealid){
          // 若进行减操作后数量为 0，则删除 cart 数组中对应的项
          if(number + cart[i].amount === 0){
            cart.splice(i, i + 1);
          }else{
            cart[i].amount = number + cart[i].amount;
          }
          // 更新本地存储中的购物车数据
          wx.setStorage({
            key: 'cart',
            data: cart
          })
        }
      }
    } catch (e) {
      // Do something when catch error
    }
    // 更新 data 中的购物车数据
    this.setData({
      cart: cart
    })
    // 调用计算总金额方法
    this.setTotalPrice();
  },
  // 计算总金额方法
  setTotalPrice(){
    // 总金额
    let count = 0;
    // 遍历购物车数据，计算总金额
    for(let i = 0; i < this.data.cart.length; i++){
      count += this.data.cart[i].price * this.data.cart[i].amount;
    }
    // 更新 data 中的总金额
    this.setData({
      total_price: count
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 程序从首页进行了添加操作，此时页面内容应该更新，所以在 onLoad 函数中更新 data 中的 cart，达到页面更新的效果，并计算总金额
    this.setData({
      cart: wx.getStorageSync('cart')
    })
    this.setTotalPrice()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // Tabbar加载的页面会进行缓存，onLoad 函数只会运行一次，所以在 onShow 函数中更新 data 中的 cart，达到页面更新的效果，并重新计算总金额
    this.setData({
      cart: wx.getStorageSync('cart')
    })
    this.setTotalPrice()
  }

})