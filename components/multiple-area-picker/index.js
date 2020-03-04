// components/multiple-column-selection/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    show: {
      type: Boolean,
      value: '',
      observer: function(e) {
        // console.log(e)
        if (e == false) {
          this.setData({
            animateClass: 'bounceOutDown'
          })
        } else {
          this.setData({
            animateClass: 'zoomInUp'
          })
        }
      }
    },
    pcasData: {
      type: Object,
      observer: function(pcasData) {
        // console.log(111, pcasData)
        if (pcasData != {}) {
          let provinceData = []
          for (let key in pcasData) {
            provinceData.push(key)
          }
          //设置默认城市列表
          let cityMap = pcasData['安徽省']
          let cityData = []
          for (let key in cityMap) {
            cityData.push(key)
          }
          //设置默认区县列表
          let countyMap = pcasData['安徽省']['阜阳市']
          let countyData = []
          for (let key in countyMap) {
            countyData.push(key)
          }
          //设置默认街道列表
          let townData = pcasData['安徽省']['阜阳市'][countyData[0]]
          // console.log(pcasData['安徽省']['阜阳市'])
          this.setData({
            provinceData,
            province: '安徽省',
            provinceIndex: [provinceData.indexOf('安徽省')],
            cityData,
            city: '阜阳市',
            cityIndex: [cityData.indexOf('阜阳市')],
            countyData,
            county: countyData[0],
            townData,
            town: townData[0]
          })
        }
      }
    },
  },

  ready: function(e) {
    // this.properties.experienceData = ['经验不限', '无经验', '1年以下']
    // console.log(this.properties.pcasData)


  },

  /**
   * 组件的初始数据
   */
  data: {
    currentPickerData: [],
    show: false,
    animateClass: 'zoomInUp',
    provinceData: [],
    province: '',
    cityData: [],
    cityIndex: [0],
    city: '',
    countyData: [],
    county: '',
    townData: [],
    town: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //省份改变
    provinceChange: function(e) {
      let province = this.data.provinceData[e.detail.value[0]]
      console.log(this.properties.pcasData[province])
      let cityMap = this.properties.pcasData[province]
      let cityData = []
      for (let key in cityMap) {
        cityData.push(key)
      }
      //设置默认区县数据
      let countyData = []
      let countyMap = this.properties.pcasData[province][cityData[0]]
      for (let key in countyMap) {
        countyData.push(key)
      }
      //设置默认街道数据
      let townData = this.properties.pcasData[province][cityData[0]][countyData[0]]
      // console.log(townData)
      this.setData({
        province,
        provinceIndex: e.detail.value,
        cityData,
        city: cityData[0],
        countyData,
        county: countyData[0],
        townData,
        town: townData[0],
        cityIndex: [0],
        countyIndex: [0],
        townIndex: [0]
      })
    },

    //城市改变
    cityChange: function(e) {
      let city = this.data.cityData[e.detail.value[0]]
      //设置区县列表数据
      let countyMap = this.properties.pcasData[this.data.province][city]
      // console.log(countyMap)
      let countyData = []
      for (let key in countyMap) {
        countyData.push(key)
      }
      //设置街道列表数据
      let townData = this.properties.pcasData[this.data.province][city][countyData[0]]
      // console.log(townData)
      this.setData({
        city,
        cityIndex: e.detail.value,
        countyData,
        county: countyData[0],
        countyIndex: [0],
        townData,
        town: townData[0],
        townIndex: [0]
      })
    },

    //区县改变
    countyChange: function(e) {
      let county = this.data.countyData[e.detail.value[0]]
      // console.log(county)
      let townData = this.properties.pcasData[this.data.province][this.data.city][county]
      // console.log(townData)
      this.setData({
        county,
        countyIndex: e.detail.value,
        townData,
        town: townData[0],
        townIndex: [0]
      })
    },

    //街道改变
    townChange: function(e) {
      let town = this.data.townData[e.detail.value[0]]
      this.setData({
        town,
        townIndex: e.detail.value
      })
    },

    //完成
    submit: function() {
      // console.log(this.data.province, this.data.city, this.data.county, this.data.town)
      var myEventDetail = {} // detail对象，提供给事件监听函数
      var myEventOption = {} // 触发事件的选项
      this.triggerEvent('areaSelect', {
        province: this.data.province,
        city: this.data.city,
        county: this.data.county,
        town: this.data.town,
      })
      this.setData({
        animateClass: 'bounceOutDown',
        // show: false
      }, () => {
        let that = this
        var timeOut = setTimeout(function() {
          // console.log("延迟调用============")
          that.setData({
            show: false
          })
        }, 700)
      })
    },

    closeModal: function() {
      this.setData({
        animateClass: 'bounceOutDown',
        // show: false
      }, () => {
        let that = this
        var timeOut = setTimeout(function() {
          // console.log("延迟调用============")
          that.setData({
            show: false
          })
        }, 700)
      })
    },

  }
})