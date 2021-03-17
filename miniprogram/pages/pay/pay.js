// pages/cart/cart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:{},
    cart:[],
    totalPrice:0,
    totalNum:0
  },
  onShow: function () {
    // 获取缓存中的商品信息
    const address=wx.getStorageSync('address');
    // 获取缓存中的购物车数据
    let cart=wx.getStorageSync('cart')||[];
    cart=cart.filter(v=>v.checked);
      wx.setStorageSync('cart', cart);
      let  totalPrice=0;
      let totalNum=0;
      cart.forEach(v=>{
          totalPrice+=v.num*v.goods_price;
          totalNum+=v.num;
      });
      this.setData({
        cart,totalPrice,totalNum,address
      });
  },
  
})