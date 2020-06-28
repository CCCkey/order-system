//app.js
App({
  onLaunch: function () {
    // 调用接口获取登录凭证
    wx.login({
      success: res => {
        if (res.code) {
          // 发送 res.code 到后台换取 openId, sessionKey，加密后得到 api_token
          wx.request({
            url: this.globalData.b_url + '/users',
            method: 'POST',
            data: {
              code: res.code
            },
            success: result => {
              // 将 api_token 添加到本地存储中
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
    // 后端服务器地址
    b_url: 'http://localhost:9090/api/v1'
  }
})