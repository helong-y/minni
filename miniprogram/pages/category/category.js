// pages/category/category.js
import{request}from"../../request/index.js"
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 左侧菜单数据
    leftMenuList:[],
    // 右侧商品数据
    rightContent:[],
    // 被点击的左侧的菜单
    currentIdex:0,
    // 右侧内容的滚动条距离顶部的距离
    scrolltop:0
  },
// 接口的返回数据
Cates:[],
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 判断本地存储中有没有旧的数据
  //  获取本地存储中的数据（小程序也是有本地存储技术）
   const Cates=wx.getStorageSync('cates');
    // 做判断
    if(!Cates){
      this.getCates();
    }else{
      // 有旧数据 定义过期时间 10s
      if(Date.now()-Cates.time>1000*10){
        // 过期了 重新发送请求
        this.getCates();
      }else{
        // 未过期
        this.Cates=Cates.data;
        let leftMenuList=this.Cates.map(v=>v.cat_name);
        //构造右侧的商品数据
        let rightContent=this.Cates[0].children;
        this.setData({
         leftMenuList,
         rightContent
        })
      }
    }
  },
  getCates(){
    request({url:"/categories"}).then(res=>{
     this.Cates=res.data.message;
    //  把接口的数据存到本地存储中
    wx.setStorageSync('cates',{time:Date.now(),data:this.Cates})
     //构造左侧的大菜单数据
     let leftMenuList=this.Cates.map(v=>v.cat_name);
     //构造右侧的商品数据
     let rightContent=this.Cates[0].children;
     this.setData({
      leftMenuList,
      rightContent
     })
    })
  },
  handleItemTap(e){
  //  获取被点击的标题身上的索引  给currentIdex赋值
  const target=e.target.dataset.index;
  // 根据不同的索引来改变相应的商品内容
  let rightContent=this.Cates[target].children;
  this.setData({
     currentIdex:target,
   rightContent,
   scrolltop:0
  })
  //重新设置scrolltop的值
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})