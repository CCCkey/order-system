// pages/index/index.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 餐品
    meals: [],
    // 餐品类型id
    types: [],
    // 标识，判断餐品是否处于自身类型下
    flag: null
  },
  // 在横向滚动条中点击不同的类型，修改 flag 值为对应的类型id
  clickType(e){
    this.setData({
      flag: e.currentTarget.dataset.typeid
    })
  },
  // 跳转餐品详情页，传递餐品id
  toOrder(e){
    wx.navigateTo({
      url: '/pages/meal/meal?orderId=' + e.currentTarget.dataset.meadId,
    })
  },
  // 将餐品添加到购物车
  addCart(e){
    // 页面弹出提示框
    wx.showToast({
        title: '添加成功',
        icon: 'success',
        duration: 1000
    });
    // 标识，判断购物车是否为空
    let temp = true;
    // 购物车数据
    let cart = [];
    try {
      // 从本地存储中获取购物车数据
      cart = wx.getStorageSync('cart');
      // 遍历购物车
      for(let i = 0; i < cart.length; i++){
        // 若餐品 id 一致，表明购物车已存在该餐品，所以将购物车餐品数量加 1
        if(cart[i].id === e.currentTarget.dataset.mealid){
          cart[i].amount++;
          // 将 temp 修改为 false
          temp = false;
          // 更新本地存储中的购物车数据
          wx.setStorage({
            key: 'cart',
            data: cart
          })
        }
      }
      // temp 为 false，表明购物车没有该餐品
      if(temp){
        // 若购物车数据为空，重置 cart 为空数组
        if(cart == ''){
          cart = [];
        }
        // 遍历餐品数组，将对应餐品信息添加到购物车，数量为 1
        for(let item of this.data.meals) {
          if(item.id === e.currentTarget.dataset.mealid){
            // 将数据添加到 cart 数组中
            cart.push({
              id: item.id,
              name: item.name,
              amount: 1,
              price: item.price,
              img: item.img
            });
            // 更新本地存储中的购物车数据
            wx.setStorage({
              key: "cart",
              data: cart
            })
          }
        };
      }
    } catch (e) {
      // Do something when catch error
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 发送请求，获取所有餐品信息
    wx.request({
      url: app.globalData.b_url + '/meals',
      method: 'GET',
      success: result => {
        if (result.data.code === 200) {
          // 解析类型id
          for(let item of result.data.data.meals) {  
            item.type_id = item.type_id.split(',');
          };
          // 初始化数据
          this.setData({
            meals: result.data.data.meals,
            types: result.data.data.types,
            flag: result.data.data.types[0].id
          })
        }
      }
    })
  }

})