// 导入时间格式转换工具
const util = require('../../utils/util.js')

Page({
    data: {
        title: 'test', //保存新闻详情数据
        content: 'test',
    },
    //接收url传过来的id值，通过setData到page data的id中
    onLoad: function (options) {
        const title = options.id
        console.log(title)
        this.setData({
            title: title,
         //   content: content,
        })
        //console.log(id1) check imported id and set data for id
    },
    returnToList(event) {
        wx.navigateBack()
    }
})