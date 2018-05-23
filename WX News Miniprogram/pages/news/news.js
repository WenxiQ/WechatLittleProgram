// 导入时间格式转换工具
const util = require('../../utils/util.js')

Page({
    data: {
        id: 1523074607642,
        newsDetail: [], //保存新闻详情数据
        newsContent: []
    },
    //接收url传过来的id值，通过setData到page data的id中
    onLoad: function (options) {
        const id = options.id
        this.setData({
            id: id
        })
        //console.log(id1) check imported id and set data for id
        this.getNews()
    },
    //获取API数据，更新数据
    getNews(callback) {
        const id = this.data.id
        //console.log(id2) check id for API input data
        wx.showLoading({
            title: '努力加载中',
        })
        //显示加载
        wx.request({
            url: 'https://test-miniprogram.com/api/news/detail',
            data: { id: id },
            //数据数组成功返回
            success: res => {
                let results = res.data.result
                let contentLength = results.content.length //length of result data array
                let code = res.data.code
                //let hour = new Date().setTime()
                let message = res.data.message
                let newsDetail = []
                let newsContent = []
                if (code == "200" && message == "success") {
                    //console.log(results, code, message, contentLength) 检查结果
                    newsDetail.push({
                        title: results.title,
                        source: results.source,
                        time: util.formatTime(new Date(results.date)), //转换时间格式
                        count: '阅读 ' + results.readCount,
                        image: !!results.firstImage ? results.firstImage : '/images/image-icon.png',
                    })
                    //get content type and info
                    for (let i = 0; i < contentLength; i += 1) {
                        newsContent.push({
                            cid: results.content[i].id,
                            ctype: results.content[i].type,
                            ctext: results.content[i].text,
                            csrc: results.content[i].src
                        })
                    }
                    this.setData({
                        newsDetail: newsDetail,
                        newsContent: newsContent
                    })
                    // console.log(newsDetail + ' this is newsDetail') 检查结果
                    //console.log(newsContent + ' this is newsContent')
                    wx.hideLoading({
                        title: '加载中',
                    })
                } else {
                    wx.showToast({
                        title: '加载错误, 请重试',
                        icon: 'none',
                        duration: 1800
                    })
                }
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
        wx.navigateBack()
    }
})