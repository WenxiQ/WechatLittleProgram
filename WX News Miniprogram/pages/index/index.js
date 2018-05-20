//index.js
//获取应用实例
const app = getApp()
const newsTypeMap = {
   'gl': '国内',
   'gj': '国际',
   'cj': '财经',
   'yl': '娱乐',
   'js': '军事',
   'ty': '体育',
   'other': '其他'
}

Page({
  data: {
    // array: [{mode: 'scaleToFill'}],
     newsTab: ['国内', '国际', '财经', '娱乐', '军事', '体育', '其他'],
     frontpageHeading: ['新浪网新闻中心是新浪网最重要的频道之一，24小时滚动报道国内、国际及社会新闻。'],
     imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
        'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
     ],
     indicatorDots: true,
     autoplay: true,
     interval: 5000,
     duration: 1000,
     newsResults: []
   }
  ,
  //事件处理函数
  bindViewTap: function() {
  },
  //启动
  onLoad() {
     this.getNow()
  },
  //下拉刷新，回调停止
  onPullDownRefresh() {
     this.getNow(() => {
        wx.stopPullDownRefresh()
     })
  },
  //获取API数据，返回结果
  getNow(callback) {
     wx.request({
        url: 'https://test-miniprogram.com/api/news/list',
        data: {
           type: 'gj',
        },
        //数据数组成功返回
        success: res => {
           let results = res.data.result
           let newsLength = results.length //新闻数据数组长度
           //console.log(arrayLength) 
           let code =res.data.code
           let message = res.data.message
           console.log(results, code, message) //测试api数据结果

           let newsResults = [] //建立新闻类别数组
           let imgUrls = []
           for (let i=0; i<newsLength; i+=1) {
              newsResults.push({
                  newsTitle: results[i].title,
                  newsDate: results[i].date, 
                  newsSource: results[i].source,
              })

              imgUrls.push(
                 results[i].firstImage
              )
           }
           console.log(newsResults[0].newsDate)
           console.log(newsResults[8].newsTitle+newsResults[8].newsDate) //testing for data

            this.setData({
               newsResults: newsResults,
               imgUrls: imgUrls
            })
            console.log(newsResults)  //testing setData result
            console.log(imgUrls)

          /* let result = res.data.result
           let temp = result.now.temp
           let weather = result.now.weather
           this.setData({
              nowTemp: temp + '°',
              nowWeather: weatherMap[weather],
              nowWeatherBackground: '/images/' + weather + '-bg.png'
           })
           wx.setNavigationBarColor({
              frontColor: '#000000',
              backgroundColor: weatherColorMap[weather],
           })

           //set hourlyWeather
           let forecast = result.forecast
           let hourlyWeather = []
           let nowHour = new Date().getHours()
           for (let i = 0; i < 24; i += 3) {
              hourlyWeather.push({
                 time: (i + nowHour) % 24 + "时",
                 iconPath: '/images/' + forecast[i / 3].weather + '-icon.png',
                 temp: forecast[i / 3].temp + '°'
              })
           }
           hourlyWeather[0].time = '现在'
           this.setData({
              hourlyWeather: hourlyWeather
           }) */
        },
        complete: () => {
           callback && callback()
        }
     })
  }
})

