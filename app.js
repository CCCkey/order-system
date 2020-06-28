//app.js
App({
  onLaunch: function () {
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if (res.code) {
          //发起网络请求
          wx.request({
            url: this.globalData.b_url + '/users',
            method: 'POST',
            data: {
              code: res.code
            },
            success: result => {
              wx.setStorageSync('api_token', result.data.api_token)
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },
  globalData: {
    b_url: 'http://localhost:9090/api/v1'
  }
})