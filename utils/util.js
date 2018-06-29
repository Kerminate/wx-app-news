const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const convertToStarsArray = (stars) => {
  const num = +stars.toString().substring(0, 1)
  const half = +stars.toString().substring(1, 2)
  const array = []
  for (let i = 0; i < 5; i++) {
    if (i < num || (i === num && half > 0)) {
      array.push(1)
    } else {
      array.push(0)
    }
  }
  return array
}

const http = (url, callback) => {
  wx.request({
    url,
    method: 'GET',
    header: {
      'content-type': 'application/xml'
    },
    success: function (res) {
      callback(res.data)
    },
    fail: function (err) {
      console.log(err)
    }
  })
}

const convertToCastString = (casts) => {
  let castsjoin = ''
  for (let idx in casts) {
    castsjoin += casts[idx].name + ' / '
  }
  return castsjoin.substring(0, castsjoin.length - 2)
}

const convertToCastInfos = (casts) => {
  const castsArray = []
  for (let idx in casts) {
    const cast = {
      img: casts[idx].avatars ? casts[idx].avatars.large: '',
      name: casts[idx].name
    }
    castsArray.push(cast)
  }
  return castsArray
}

module.exports = {
  formatTime,
  convertToStarsArray,
  http,
  convertToCastString,
  convertToCastInfos
}