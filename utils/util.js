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

module.exports = {
  formatTime,
  convertToStarsArray,
  http
}
