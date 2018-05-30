//获取应用实例
const app = getApp()
// 导入时间格式转换工具
const util = require('../../utils/util.js')
Page({
    data: {
        //新闻分类标题数组, wx:for-item = nlType = {key:, name:}
        newsList: [{
            key: '头条', name: '头条'
        }, {
            key: '新闻', name: '新闻'
        }, {
            key: '财经', name: '财经'
        }, {
            key: '科技', name: '科技'
        }, {
            key: '女性', name: '女性'
        }, {
            key: '体育', name: '体育'
        }, {
            key: 'NBA', name: 'NBA'
        }],
        activeType: '头条',
        //appKey: 
        newsResults: [], //保存新闻数据组
    },
    //启动
    onLoad() {
        this.getNews()
    },
    //下拉刷新，更新数据
    onPullDownRefresh() {
        this.getNews(() => {
            wx.stopPullDownRefresh()
        })
    },
    //获取API数据，更新数据
    getNews(callback) {
        const nltype = this.data.activeType
        //const appkey = this.data.appkey
        //console.log(nltype+'  get news nltype for api input')
        wx.request({
            url: 'https://way.jd.com/jisuapi/get',
            data: {
                //type: nltype,
                channel: nltype,
                num: 10,
                start: 0,
                appkey: '0f00cdf35c041143579fedef5e4ce47',
            },
            //数据数组成功返回d
            success: res => {
                let results = res.data.result.result.list
                console.log(results) 
                let newsLength = results.length //length of result data array
                let code = res.data.code
                let message = res.data.msg
                let newsResults = [] //api news result array
                console.log(results, code, message) 
                //testing api results
                if (code == "10000" && message == "查询成功") {
                    for (let i = 0; i < newsLength; i += 1) {
                        newsResults.push({
                            newsTitle: results[i].title,
                            newsDate: util.formatTime(new Date(results[i].time)),
                            newsSource: results[i].src,
                            //imagePath: results[i].firstImage,
                            imagePath: !!results[i].pic ? results[i].pic : '/images/news-image.jpg',
                            //检查是否有配图
                            id: results[i].url,
                            content: results[i].content,
                        })
                    }
                    this.setData({
                        newsResults: newsResults, //update data
                    })
                    //  console.log(newsResults)  //testing setData result
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
    //激活当前新闻类别，更新获取新闻数据，显示loading
    switchNewsType(event) {
        const newType = event.currentTarget.dataset.nltype
        // console.log(newType + ' new news type after click') //check news type key
        if (newType !== this.data.activeType) {
            this.setData({
                activeType: newType
            })
            this.getNews()
            // console.log(newType + ' after reload data') //check news type key
            // console.log(event)
            wx.showLoading({
                title: '努力加载中',
            })
        }
    }
})

