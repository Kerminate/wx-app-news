const util = require('../../../utils/util')
const app = getApp()

Page({
  data: {
    movie: {}
  },
  onLoad (options) {
    const movieId = options.id
    const url = app.globalData.doubanBase + '/v2/movie/subject/' + movieId
    util.http(url, this.processDoubanData)
  },
  processDoubanData (data) {
    const director = {
      avatar: '',
      name: '',
      id: ''
    }
    if (data.directors[0] != null) {
      if (data.directors[0].avatar != null) {
        director.avatar = data.directors[0].avatar.large
      }
      director.name = data.directors[0].name
      director.id = data.directors[0].id
    }
    const movie = {
      movieImg: data.images ? data.images.large : '',
      country: data.countries[0],
      title: data.title,
      originalTitle: data.original_title,
      wishCount: data.wish_count,
      commentCount: data.comments_count,
      year: data.year,
      generes: data.genres.join('、'),
      stars: util.convertToStarsArray(data.rating.stars),
      score: data.rating.average,
      director: director,
      casts: util.convertToCastString(data.casts),
      castsInfo: util.convertToCastInfos(data.casts),
      summary: data.summary
    }
    this.setData({ movie: movie })
  },
  viewMoviePostImg (event) {
    const src = event.currentTarget.dataset.src
    wx.previewImage({
      current: src, // 当前显示图片的http链接
      urls: [src] // 需要预览的图片http链接列表
    })
  }
})