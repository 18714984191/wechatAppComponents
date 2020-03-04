//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    experienceData: ['经验不限', '无经验', '1年以下'],
    educationData: ['学历不限', '本科', '专科'],
    salaryData: ['3000-4000', '6000-8000', '10000+'],
    pcasData: '',
    jobRequirements: false,
    areaShow: false
  },

  //岗位选择回调
  selectComplete: function(e) {
    console.log(e)
  },

  showJobRequirements: function() {
    this.setData({
      jobRequirements: true
    })
  },

  //地址选择回调
  areaSelect: function(e) {
    console.log(e.detail)
    wx.showModal({
      title: '',
      content: e.detail.province + e.detail.city + e.detail.county + e.detail.town,
    })
  },

  showAreaSelect: function() {
    this.setData({
      areaShow: true
    })
  },


  onLoad: function() {
    wx.request({
      url: 'http://106.54.198.47:8080/H5/pcas.json',
      success: res => {
        console.log(res)
        if (res.statusCode == 200) {
          this.setData({
            pcasData: res.data
          })
        }
      }
    })
  },
})