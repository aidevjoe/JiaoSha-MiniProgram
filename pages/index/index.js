//index.js
//获取应用实例
const app = getApp()

var relationship = require('../../utils/relationship.min.js')
Page({
  data: {
    fuqin: "爸爸",
    muqin: "妈妈",
    zhangfu: "老公",
    qizi: "老婆",
    erzi: "儿子",
    nver: "女儿",
    gege: "哥哥",
    didi: "弟弟",
    jiejie: "姐姐",
    meimei: "妹妹",
    ce: "ce",
    ac: "ac",
    convert: "convert",
    dengyu: "=",
    inputText: "",
    result: "自己",
    inputs: [],
    husbandBtnEnabled: false,
    wifeBtnEnabled: false,
    isChecked: false
  },
  //事件处理函数
  clickButton: function (e) {
    var id = e.target.id;

  console.log("id = " + id);
    var inputs = this.data.inputs;
    if (id == "ce") {
      inputs.pop();
    } else if (id == "ac") {
      inputs = [];
    } else if (id == "convert") {
      this.data.isChecked = !this.data.isChecked
    } else if (id == "=") {

    } else {
      inputs.push(id);
    }

      let lastID = inputs[inputs.length - 1];
      if (["妈妈", "老婆", "女儿", "姐姐", "妹妹"].includes(lastID)) {
        this.data.wifeBtnEnabled = true;
        this.data.husbandBtnEnabled = false;
      } else {
        this.data.wifeBtnEnabled = false;
        this.data.husbandBtnEnabled = true;
      }

    if (inputs.length == 0) {
      this.data.wifeBtnEnabled = false;
      this.data.husbandBtnEnabled = false;
    }

    let inputText = inputs.join("的");

    var result = "自己";
    if (inputs.length > 15) {
      result = "关系有点远，年长就叫老祖宗吧~";
    } else if (inputText != '') {
      result = this.calRelationship(inputText, this.data.isChecked);
    }

    console.log(this.data.husbandBtnEnabled, this.data.wifeBtnEnabled);
    this.data.inputs = inputs;
    this.setData({
      "inputText": inputText,
      "result": result,
      "husbandBtnEnabled": this.data.husbandBtnEnabled,
      "wifeBtnEnabled": this.data.wifeBtnEnabled,
      "isChecked": this.data.isChecked
    });
  },
  calRelationship: function (inputText, reverse) {
    let result = relationship({
      text: inputText,
      sex: '-1',
      type: 'defalt',
      reverse: reverse
    });

    if (result == '') {
      return "貌似他 / 她跟你不是很熟哦!";
    }
    return result;
  },
  onShareAppMessage: function() {
    var that = this;
    　　// 设置菜单中的转发按钮触发转发事件时的转发内容
    　　var shareObj = {
          title: "搞定亲戚称谓，拒绝叫不出口的尴尬",        // 默认是小程序的名称(可以写slogan等)
              // 默认是当前页面，必须是以‘/’开头的完整路径
  　　};
　　// 返回shareObj
　　return shareObj;
  }
})