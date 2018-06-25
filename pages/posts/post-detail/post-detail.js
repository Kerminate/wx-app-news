const dataList = require('../../../data/posts-data.js')

Page({
  data: {
    currentPostId: 0,
    postData: [],
    collected: '',
    isPlayingMusic: false
  },
  onLoad: function (option) {
    const postId = option.id
    const postData = dataList.postList[postId]
    this.setData({
      currentPostId: postId,
      postData: postData
    })

    const postsCollected = wx.getStorageSync('posts_collected')
    if (postsCollected) {
      const postCollected = postsCollected[postId]
      this.setData({
        collected: postCollected
      })
    } else {
      const postsCollected = {}
      postsCollected[postId] = false
      wx.setStorageSync('posts_collected', postsCollected)
    }
  },
  onCollectionTap: function () {
    const postsCollected = wx.getStorageSync('posts_collected')
    let postCollected = postsCollected[this.data.currentPostId]
    postCollected = !postCollected
    postsCollected[this.data.currentPostId] = postCollected
    this.showToast(postsCollected, postCollected)
  },
  showToast: function (postsCollected, postCollected) {
    wx.setStorageSync('posts_collected', postsCollected)
    this.setData({
      collected: postCollected
    })
    wx.showToast({
      title: postCollected ? '收藏成功' : '取消成功',
      duration: 1000
    })
  },
  onShareTap: function () {
    const itemList = [
      '分享到微信好友',
      '分享到朋友圈',
      '分享到QQ',
      '分享到微博'
    ]
    wx.showActionSheet({
      itemList: itemList,
      itemColor: '#405f80',
      success: function (res) {
        wx.showModal({
          title: '用户 ' + itemList[res.tapIndex],
          content: '现在还无法实现该功能，抱歉！'
        })
      }
    })
  },
  onMusicTap: function () {
    const currentPostId = this.data.currentPostId
    const postData = dataList.postList[currentPostId]
    const isPlayingMusic = this.data.isPlayingMusic
    if (isPlayingMusic) {
      wx.pauseBackgroundAudio()
      this.setData({
        isPlayingMusic: false
      })
    } else {
      wx.playBackgroundAudio({
        dataUrl: postData.music.url,
        title: postData.music.title,
        coverImgUrl: postData.music.coverImg
      })
      this.setData({
        isPlayingMusic: true
      })
    }
  }
})