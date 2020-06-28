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
              // code === 200 表示登录成功，后将 api_token 添加到本地存储中
              // code === 304 表示已登录
              if(result.data.code === 200){
                wx.setStorageSync('api_token', result.data.data.api_token)
              }else if(result.data.code === 304){
                console.log(result.data.message)
              }
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