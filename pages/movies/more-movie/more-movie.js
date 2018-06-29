const util = require('../../../utils/util')
const app = getApp()

Page({
  data: {
    navigateTitle: '',
    movies: [],
    requestUrl: '',
    totalCount: 0
  },
  onLoad (options) {
    const category = options.category
    this.setData({ navigateTitle: category })
    const base = app.globalData.doubanBase
    let dataUrl = ''
    switch (category) {
      case '正在热映':
        dataUrl = base + '/v2/movie/in_theaters'
        break
      case '即将上映':
        dataUrl = base + '/v2/movie/coming_soon'
        break
      case '豆瓣Top250':
        dataUrl = base + '/v2/movie/top250'
        break
    }
    this.setData({ requestUrl: dataUrl })
    util.http(dataUrl, this.processDoubanData)
    wx.showNavigationBarLoading()
  },
  onReady () {
    wx.setNavigationBarTitle({
      title: this.data.navigateTitle,
      success: function (res) {
        // console.log(res)
      }
    })
  },
  processDoubanData (moviesDouban) {
    const movies = []
    for (let subject of moviesDouban.subjects) {
      let title = subject.title
      if (title.length >= 6) {
        title = title.substring(0, 6) + '...'
      }
      const temp = {
        title,
        average: subject.rating.average,
        coverageUrl: subject.images.large,
        movieId: subject.id,
        stars: util.convertToStarsArray(subject.rating.stars)
      }
      movies.push(temp)
    }
    this.setData({
      totalCount: this.data.totalCount + 20,
      movies: [...this.data.movies, ...movies]
    })
    wx.hideNavigationBarLoading()
  },
  onReachBottom () {
    const nextUrl = this.data.requestUrl + '?start=' + this.data.totalCount + '&count=20'
    util.http(nextUrl, this.processDoubanData)
    wx.showNavigationBarLoading()
  },
  onPullDownRefresh () {
    console.log('上拉刷新')
    const refreshUrl = this.data.requestUrl + '?start=0&count=20'
    this.setData({
      totalCount: 0,
      movies: []
    })
    util.http(refreshUrl, this.processDoubanData)
    wx.showNavigationBarLoading()
  },
  onMovieTap (event) {
    const movieid = event.currentTarget.dataset.movieid
    wx.navigateTo({
      url: '../movie-detail/movie-detail?id=' + movieid
    })
  }
})