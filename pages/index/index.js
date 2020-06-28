// pages/index/index.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    meals: [],
    types: [],
    flag: null
  },
  clickType(e){
    this.setData({
      flag: e.currentTarget.dataset.typeid
    })
  },
  addCart(e){
    wx.showToast({
        title: '添加成功',
        icon: 'success',
        duration: 1000
    });
    let temp = true;
    let cart = [];
    try {
      cart = wx.getStorageSync('cart');
      for(let i = 0; i < cart.length; i++){
        if(cart[i].id === e.currentTarget.dataset.mealid){
          cart[i].amount++;
          temp = false;
          wx.setStorage({
            key: 'cart',
            data: cart
          })
        }
      }
      if(temp){
        if(cart == ''){
          cart = [];
        }
        for(let item of this.data.meals) {
          if(item.id === e.currentTarget.dataset.mealid){
            console.log(cart.length);
            cart.push({
              id: item.id,
              name: item.name,
              amount: 1,
              price: item.price,
              img: item.img
            });
            console.log(11);
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
    wx.request({
      url: app.globalData.b_url + '/meals',
      method: 'GET',
      success: result => {
        if (result.data.code === 200) {
          for(let item of result.data.meals) {  
            item.type_id = item.type_id.split(',');
          };
          this.setData({
            meals: result.data.meals,
            types: result.data.types,
            flag: result.data.types[0].id
          })
        }
      }
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