// pages/orderList/orderList.js
//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 订单列表
    orderList: []
  },

  // 跳转订单详情页方法，传递订单 id
  clickOrder(e) {
    wx.navigateTo({
      url: '../order/order?orderId=' + e.currentTarget.dataset.orderId
    })
  },
  // 获取订单列表方法
  getOrderList(){
    // 发送请求，获取订单列表
    wx.request({
      url: app.globalData.b_url + '/orders/users',
      method: 'GET',
      data: {
        // 页码
        offset: 1,
        // 数量
        limit: 10,
        // 从本地存储中获取密匙
        api_token: wx.getStorageSync('api_token')
      },
      success: result => {
        // 若请求成功，将返回的数据赋给 orderList
        if(result.data.code === 200){
          this.setData({
            orderList: result.data.results
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 调用获取订单列表方法
    this.getOrderList();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // Tabbar加载的页面会进行缓存，onLoad 函数只会运行一次，所以在此调用获取订单列表方法，页面进行相应更新
    this.getOrderList();
  }

})