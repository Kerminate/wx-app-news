const postsData = require('../../data/posts-data.js')

Page({
  data: {
    posts_key: postsData.postList
  },
  onLoad: function () {
    // this.setData({
    //   posts_key: postsData.postList
    // })
  },
  onPostTap: function (event) {
    const postId = event.currentTarget.dataset.postid
    wx.navigateTo({
      url: 'post-detail/post-detail?id=' + postId
    })
  },
  onSwiperTap: function (event) {
    // target 是被点击的组件，currentTarget 是捕获事件的组件
    const postId = event.target.dataset.postid
    wx.navigateTo({
      url: 'post-detail/post-detail?id=' + postId
    })
  }
})