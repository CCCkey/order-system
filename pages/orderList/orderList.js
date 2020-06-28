// pages/orderList/orderList.js
//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderList: []
  },
  clickOrder(e) {
    wx.navigateTo({
      url: '../order/order?orderId=' + e.currentTarget.dataset.orderId
    })
  },
  getOrderList(){
    wx.request({
      url: app.globalData.b_url + '/orders/users',
      method: 'GET',
      data: {
        offset: 1,
        limit: 10,
        api_token: wx.getStorageSync('api_token')
      },
      success: result => {
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
    this.getOrderList();
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
    this.getOrderList();
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