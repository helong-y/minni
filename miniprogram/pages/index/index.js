// 引入用来发送请求的方法
import{request}from"../../request/index.js"
Page({
  data:{
    //轮播图数组
    swiperList:[],
    //导航 数组
    catesList:[],
    //楼层数据
    floorList:[],
  },
  onLoad:function(options){
    // 生命周期函数--监听页面加载
    //1.发送异步请求获取接口文档
    // wx.request({
    //   // url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
    //   // success: (result) => {
    //   //   this.setData({swiperList:result.data.message})
    //   // }
    // })
    // 使用封装过的发送请求的方法
    this.getSwiperList();
    this.getcatesList();
    this.getfloorList()
  },
  //获取轮播图
  getSwiperList(){
    request({url:"/home/swiperdata"}).then(result=>{
      this.setData({swiperList:result.data.message})
    })
  },
  //获取分类导航数据
  getcatesList(){
    request({url:"/home/catitems"}).then(result=>{
      this.setData({catesList:result.data.message})
    })
  },
  //获取楼层数据
  getfloorList(){
    request({url:"/home/floordata"}).then(result=>{
      this.setData({floorList:result.data.message})
    })
  },
  onReady:function(){
    // 生命周期函数--监听页面初次渲染完成
  },
  onShow:function(){
    // 生命周期函数--监听页面显示
  },
  onHide:function(){
    // 生命周期函数--监听页面隐藏
  },
  onUnload:function(){
    // 生命周期函数--监听页面卸载
  },
  onPullDownRefresh: function() {
    // 页面相关事件处理函数--监听用户下拉动作
  },
  onReachBottom: function() {
    // 页面上拉触底事件的处理函数
  },
  onShareAppMessage: function() {
    // 用户点击右上角分享
    
  }
})