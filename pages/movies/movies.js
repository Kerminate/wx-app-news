const util = require('../../utils/util')
const app = getApp()

Page({
  data: {
    inTheaters: {},
    comingSoon: {},
    top250: {}
  },
  onLoad () {
    const base = app.globalData.doubanBase
    const inTheatersUrl = base + '/v2/movie/in_theaters?start=0&count=3'
    const comingSoonUrl = base + '/v2/movie/coming_soon?start=0&count=3'
    const top250Url = base + '/v2/movie/top250?start=0&count=3'
    this.getMovieListData(inTheatersUrl, 'inTheaters', '正在热映')
    this.getMovieListData(comingSoonUrl, 'comingSoon', '即将上映')
    this.getMovieListData(top250Url, 'top250', '豆瓣Top250')
  },
  getMovieListData (url, settledKey, categoryTitle) {
    const that = this
    wx.request({
      url: url,
      method: 'GET',
      header: {
        'content-type': 'application/xml'
      },
      success: function (res) {
        that.processDoubanData(res.data, settledKey, categoryTitle)
      },
      fail: function (err) {
        console.log(err)
      }
    })
  },
  processDoubanData (moviesDouban, settledKey, categoryTitle) {
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
    const readyData = {}
    readyData[settledKey] = {
      movies: movies,
      categoryTitle
    }
    this.setData(readyData)
  },
  onmoreTap (event) {
    const category = event.currentTarget.dataset.category
    wx.navigateTo({
      url: 'more-movie/more-movie?category=' + category
    })
  }
})