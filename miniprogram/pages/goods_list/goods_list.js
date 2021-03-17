import{request}from"../../request/index.js"
// pages/goods_list/goods_list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:[{
      id:0,
      value:"综合",
      isActive:true
    },{
      id:1,
      value:"销量",
      isActive:false
    },{
      id:2,
      value:"价格",
      isActive:false
    }],
    goodList:[]
  },
// 接口要的参数
QueryParams:{
    query:"",
    cid:'',
    pagenum:1,
    pagesize:10
},
totalPages:1,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.QueryParams.cid=options.cid;
    this.getGoodsList()
  },
  
    //获取商品列表数据
    getGoodsList(){
      request({url:"/goods/search",data:this.QueryParams}).then(result=>{
        // 获取商品总条数
        const total=result.data.message.total;
        //计算总页数
        this.totalPages=Math.ceil(total/this.QueryParams.pagesize)
        this.setData({
          // 在请求下一页的数据时保留之前数组内容并进行拼接
          goodList:[...this.data.goodList,...result.data.message.goods]
        })
      })
      //请求数据回来后 关闭下拉刷新的窗口
      // 如果没有调用下拉刷新 触发关闭不会有报错
        wx.stopPullDownRefresh();
    },
  // 页面点击事件
  handletabsItemChange(e){
  //  1.获取被点击的索引
  const {index}=e.detail;
  // 2.修改数组元素
  let {tabs}=this.data;
  // 3.赋值到data中
  tabs.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false);
    this.setData({
      tabs
    })
  },
  // 页面上滑 滚动条触底事件
  onReachBottom(){
    if(this.QueryParams.pagenum>=this.totalPages){
      wx.showToast({
        title: '没有下一页数据',
        icon:"none"
      })
    }else{
      this.QueryParams.pagenum++;
      this.getGoodsList();
    } 
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
// 重置数组
this.setData({
  goodList:[]
})
// 重置页码
this.QueryParams.pagenum=1;
// 重新发送请求
this.getGoodsList();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})