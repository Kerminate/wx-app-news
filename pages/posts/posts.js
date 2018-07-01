const postsData = require('../../data/posts-data.js')

Page({
  data: {
    posts_key: postsData.postList
  },
  onLoad () {
  },
  onPostTap (event) {
    const postId = event.currentTarget.dataset.postid
    wx.navigateTo({
      url: 'post-detail/post-detail?id=' + postId
    })
  },
  onSwiperTap (event) {
    // target 是被点击的组件，currentTarget 是捕获事件的组件
    const postId = event.target.dataset.postid
    wx.navigateTo({
      url: 'post-detail/post-detail?id=' + postId
    })
  }
})