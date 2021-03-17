// pages/cart/cart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:{},
    cart:[],
    allChecked:false,
    totalPrice:0,
    totalNum:0
  },
  handleChooseAddress(){
    // 获取 权限状态
    wx.getSetting({
      success:(result)=>{
        // 获取权限状态  主要发现一些 睡醒名很怪异的时候 用[]来获取属性值
        const scopeAddress=result.authSetting["scope.address"]
        if(scopeAddress===true||scopeAddress===undefined){
          wx.chooseAddress({
            success: (res1) => {
              console.log(res1)
                // 将地址存入到缓存中
              wx.setStorageSync('address', res1)
            }
          });
        }else{
          // 用户以前拒绝过授予过权限 诱导用户打开授权页面
          wx.openSetting({
            success:(res2)=>{
              wx.chooseAddress({
                success: (res3) => {
                  console.log(res3)
                }
              })
            },
          });
        }
      }
    })
  },
  onShow: function () {
    // 获取缓存中的商品信息
    const address=wx.getStorageSync('address');
    // 获取缓存中的购物车数据
    const cart=wx.getStorageSync('cart')||[];
    // 计算全选 every 全true为true 空数组调用every 返回值是true
    // const allChecked= cart.length?cart.every(v=>v.checked):false;
      this.setData({
        address
      });
    this.setCart(cart);
  },
  // 商品的选中
  handeItemChange(e){
    // 获取被修改的商品ID
    const goods_id=e.currentTarget.dataset.id;
    // 获取购物车数组
      let {cart}=this.data
      // 找到被修改的商品对象
    let index=cart.findIndex(v=>v.goods_id===goods_id);
    // 选中状态取反
    cart[index].checked=!cart[index].checked;
    this.setCart(cart)
  },
  // 封装购物车状态
  setCart(cart){
    wx.setStorageSync('cart', cart);
    let allChecked=true
    let  totalPrice=0;
    let totalNum=0;
    cart.forEach(v=>{
      if(v.checked){
        totalPrice+=v.num*v.goods_price;
        totalNum+=v.num;
      }else{allChecked=false}
    });
    // 判断数组是否为空
    allChecked=cart.length!=0?allChecked:false;
    // 把购物车数据重新设置入data 和缓存中
    this.setData({
      cart,totalPrice,totalNum,allChecked
    });
  },
  // 商品的全选功能
  handeItemAllcheck(){
    let {cart,allChecked}=this.data;
    allChecked=!allChecked;
    // 循环修改cart数组中商品选中的状态
    cart.forEach(v=>v.checked=allChecked);
    this.setCart(cart);
  },
    // 商品数量的编辑功能
  handleNumedit(e){
    const {operation,id}=e.currentTarget.dataset;
    let {cart}=this.data;
    const index=cart.findIndex(v=>v.goods_id===id);
      // 判断是否要执行删除
    if(cart[index].num===1&&operation===-1){
      wx.showModal({
        title: '提示',
        content: '是否确定删除',
        success:(res)=>{
          if (res.confirm) {
            cart.splice(index,1);
            this.setCart(cart)
          } 
        }
      })
    }else{
       cart[index].num+=operation;
    this.setCart(cart);
    }
  },
  // 点击结算
  handlePay(){
    // 判断地址
    const {address,totalNum}=this.data;
    if(!address.userName){
      wx.showToast({
        title: '您还没有选择收货地址',
        icon:'none'
      });
      return;
    }
    // 判断用户有没有选购商品
    if(totalNum===0){
      wx.showToast({
        title: '您还没有选购商品',
        icon:'none'
      });
      return;
    }
    wx.navigateTo({
      url: '/pages/pay/pay'
    })
  }
})