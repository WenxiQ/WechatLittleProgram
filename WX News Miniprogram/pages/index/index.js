//获取应用实例
const app = getApp()
// 导入时间格式转换工具
const util = require('../../utils/util.js')
Page({
    data: {
        //新闻分类标题数组, wx:for-item = nlType = {key:, name:}
        newsList: [{
            key: 'top', name: '头条'
        }, {
            key: 'guoji', name: '国际'
        }, {
            key: 'caijing', name: '财经'
        }, {
            key: 'keji', name: '科技'
        }, {
            key: 'yule', name: '娱乐'
        }, {
            key: 'tiyu', name: '体育'
        }, {
            key: 'shishang', name: '时尚'
        }],
        activeType: 'top',
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
            url: 'https://v.juhe.cn/toutiao/index',
            data: {
                type: nltype,
                key: 'XXXXXXappkey',
            },
            //数据数组成功返回
            success: res => {
                let results = res.data.result
                let newsLength = results.data.length //length of result data array
                let code =results.stat
                let message = res.data.reason
                let newsResults = [] //api news result array
                //console.log(results, code, message) 
                //testing api results
                if (code == "1" && message == "成功的返回") {
                    for (let i = 0; i < newsLength; i += 1) {
                        newsResults.push({
                            newsTitle: results.data[i].title,
                            newsDate: util.formatTime(new Date(results.data[i].date)),
                            newsSource: results.data[i].author_name,
                            //imagePath: results[i].firstImage,
                            imagePath: !!results.data[i].thumbnail_pic_s ? results.data[i].thumbnail_pic_s : '/images/image-icon.png',
                            //检查是否有配图
                            id: results.data[i].url
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

