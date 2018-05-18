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
     array: [{mode: 'scaleToFill'}],
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
     duration: 1000
   }
  ,
  
  //事件处理函数
  bindViewTap: function() {
  }
})
