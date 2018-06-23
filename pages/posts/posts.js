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
      url: 'post-detail/post-detail'
    })
  }
})