// 导入时间格式转换工具
const util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
     importID: '1523074607642',
     newsDetail: [], //保存新闻详情数据
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.getNews()
  },
  //获取API数据，更新数据
  getNews(callback) {
     //const nltype = this.data.activeType
     wx.request({
        url: 'https://test-miniprogram.com/api/news/detail',
        data: {
           id: '1523074607642'
          //type: nltype
        },
        //数据数组成功返回
        success: res => {
            let results = res.data.result
            let contentLength = results.content.length //length of result data array
            let code = res.data.code
            //let hour = new Date().setTime()
            let message = res.data.message
            let newsDetail = [] //api news result array
            console.log(results, code, message, contentLength) 
            newsDetail.push({
               title: results.title,
               source:results.source,
               time: util.formatTime(new Date(results.date)), //转换时间格式
               count: '阅读 ' + results.readCount,
               image: results.firstImage
           })
           this.setData({
              newsDetail: newsDetail,
              
           })
           console.log(newsDetail)
           
           //testing api results
          /* if (code == "200" && message == "success") {
              for (let i = 0; i < newsLength; i += 1) {
                 newsResults.push({
                    newsTitle: results[i].title,
                    newsDate: results[i].date,
                    newsSource: results[i].source,
                    imagePath: results[i].firstImage,
                    id: results[i].id
                 })
               }
              this.setData({
                 newsResults: newsResults, //update data
              })
              console.log(newsResults)  //testing setData result
        } else {
              wx.showToast({
                 title: '加载错误, 请重试',
                 icon: 'none',
                 duration: 1800
              })
        } */
        },
        fall: () => {
           wx.showToast({
              title: '加载错误,请重试',
              icon: 'none',
              duration: 1800
           })
        },
        complete: () => {
           callback && callback()
        }
     })
  },
  returnToList(event) {
     wx.navigateTo({
        url: '/pages/index/index',
     })
     wx.showToast({
        title: '努力加载中',
        icon: 'loading',
        duration: 1200
     })
  }
})