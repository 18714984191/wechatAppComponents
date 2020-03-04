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
    experienceData: {
      type: Array,
      value: []
    },
    educationData: {
      type: Array,
      value: []
    },
    salaryData: {
      type: Array,
      type: []
    }
  },

  ready: function(e) {
    // this.properties.experienceData = ['经验不限', '无经验', '1年以下']
    // console.log(this.properties)
    if (this.properties.experienceData != []) {
      this.properties.experienceData.splice(0, 0, "请选择")
      this.properties.educationData.splice(0, 0, "请选择")
      this.properties.salaryData.splice(0, 0, "请选择")
      this.setData({
        currentPickerData: this.properties.experienceData,
        show: this.properties.properties
      })
    }

  },

  /**
   * 组件的初始数据
   */
  data: {
    tabIndex: 0,
    itemTitleClass0: 'box-item-text green',
    itemSelectedClass0: 'box-item-select-text green',
    itemTitleClass1: 'box-item-text',
    itemSelectedClass1: 'box-item-select-text',
    itemTitleClass2: 'box-item-text',
    itemSelectedClass2: 'box-item-select-text',
    currentPickerData: [],
    experienceValue: '请选择',
    educationValue: '请选择',
    salaryValue: '请选择',
    experienceIndex: 0,
    educationIndex: 0,
    salaryIndex: 0,
    submit: false,
    show: false,
    animateClass: 'zoomInUp'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    changeTab: function(e) {
      // console.log(e)
      let index = e.currentTarget.dataset.index
      this.setData({
        tabIndex: e.currentTarget.dataset.index
      })
      //动态设置class以改变字体颜色
      if (index == 0) {
        this.setData({
          itemTitleClass0: 'box-item-text green',
          itemSelectedClass0: 'box-item-select-text green',
          itemTitleClass1: 'box-item-text',
          itemSelectedClass1: 'box-item-select-text',
          itemTitleClass2: 'box-item-text',
          itemSelectedClass2: 'box-item-select-text',
          currentPickerData: this.properties.experienceData
        })
      }
      if (index == 1) {
        this.setData({
          itemTitleClass0: 'box-item-text',
          itemSelectedClass0: 'box-item-select-text',
          itemTitleClass1: 'box-item-text green',
          itemSelectedClass1: 'box-item-select-text green',
          itemTitleClass2: 'box-item-text',
          itemSelectedClass2: 'box-item-select-text',
          currentPickerData: this.properties.educationData
        })
      }
      if (index == 2) {
        this.setData({
          itemTitleClass0: 'box-item-text',
          itemSelectedClass0: 'box-item-select-text',
          itemTitleClass1: 'box-item-text',
          itemSelectedClass1: 'box-item-select-text',
          itemTitleClass2: 'box-item-text green',
          itemSelectedClass2: 'box-item-select-text green',
          currentPickerData: this.properties.salaryData
        })
        if (this.data.experienceIndex == 0 || this.data.educationIndex == 0 || this.data.salaryIndex == 0) {
          this.setData({
            submit: false
          })
        } else {
          this.setData({
            submit: true
          })
        }
      }
    },

    //经验要求选择框改变
    experienceChange: function(e) {
      this.setData({
        experienceIndex: e.detail.value,
        experienceValue: this.properties.experienceData[e.detail.value[0]]
      })
    },

    //学历要求选择框改变
    educationChange: function(e) {
      this.setData({
        educationIndex: e.detail.value,
        educationValue: this.properties.educationData[e.detail.value[0]]
      })
    },

    //职位选择框改变
    salaryChange: function(e) {
      this.setData({
        salaryIndex: e.detail.value,
        salaryValue: this.properties.salaryData[e.detail.value[0]]
      })
      if (this.data.experienceIndex == 0 || this.data.educationIndex == 0 || this.data.salaryIndex == 0) {
        this.setData({
          submit: false
        })
      } else {
        this.setData({
          submit: true
        })
      }
    },

    //下一步
    nextStep: function() {
      // console.log(this.data.tabIndex)
      if (this.data.tabIndex == 0) {
        this.setData({
          itemTitleClass0: 'box-item-text',
          itemSelectedClass0: 'box-item-select-text',
          itemTitleClass1: 'box-item-text green',
          itemSelectedClass1: 'box-item-select-text green',
          itemTitleClass2: 'box-item-text',
          itemSelectedClass2: 'box-item-select-text',
          currentPickerData: this.properties.educationData,
          tabIndex: 1
        })
      } else if (this.data.tabIndex == 1) {
        this.setData({
          itemTitleClass0: 'box-item-text',
          itemSelectedClass0: 'box-item-select-text',
          itemTitleClass1: 'box-item-text',
          itemSelectedClass1: 'box-item-select-text',
          itemTitleClass2: 'box-item-text green',
          itemSelectedClass2: 'box-item-select-text green',
          currentPickerData: this.properties.salaryData,
          tabIndex: 2
        })
        if (this.data.experienceIndex == 0 || this.data.educationIndex == 0 || this.data.salaryIndex == 0) {
          this.setData({
            submit: false
          })
        } else {
          this.setData({
            submit: true
          })
        }
      }
    },

    //完成
    submit: function() {
      // console.log(this.data)
      var myEventDetail = {} // detail对象，提供给事件监听函数
      var myEventOption = {} // 触发事件的选项
      this.triggerEvent('selectComplete', {
        experienceValue: this.data.experienceValue,
        educationValue: this.data.educationValue,
        salaryValue: this.data.salaryValue,
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