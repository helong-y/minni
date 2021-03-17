import{request}from"../../request/index.js"
// pages/goos_detail/goos_detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsObj:{}
  },
// 商品对象
  GoodsInfo:{},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {goods_id}=options;
    this.getGoodsDetail(goods_id)
  },
  // 获取商品详情数据
  getGoodsDetail(goods_id){
      request({url:"/goods/detail",data:{goods_id}}).then(result=>{
      //  优化 只取得需要用的请求回来的数据
      const  goodsObj=result.data.message;
      this.GoodsInfo=goodsObj;
        this.setData({
        goodsObj:{
          goods_name:goodsObj.goods_name,
          goods_price:goodsObj.goods_price,
          // iphone 部分手机不识别webp图片格式
          // 临时自己改 确保后台存在 1.webp=>1.jpg
          // 最好是找到后台让其修改
          goods_introduce:goodsObj.goods_introduce.replace(/\.webp/g,'.jpg'),
          pics:goodsObj.pics
        }
      })
    });
      
  },
  // 点击轮播图 放大预览
  handlePreverwImage(e){
    const urls=this.GoodsInfo.pics.map(v=>v.pics_mid);
    const current=e.currentTarget.dataset.url
      wx-wx.previewImage({
        urls,
        current
      })
  },
  // 点击加入购物车
  handleCartAdd(){
    // 1.判断缓存中的购物车 数组
    let cart=wx.getStorageSync('cart')||[];
    // 2.判断 商品对象是否存在于购物车数组中
    let index=cart.findIndex(v=>v.goods_id===this.GoodsInfo.goods_id);
    if(index===-1){
    // 3.不存在 第一次添加
      this.GoodsInfo.num=1;
      this.GoodsInfo.checked=true;
      cart.push(this.GoodsInfo)
    }else{
      // 4.存在 执行num++
      cart[index].num++;
    }
    // 5.把购物车重新添加回缓存中
    wx-wx.setStorageSync('cart', cart);
    wx.showToast({
      title: '加入成功',
      icon:'success',
      // 防止用户手抖反复点击
      mask:true
    })
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