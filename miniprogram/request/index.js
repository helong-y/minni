// 同事发送异步代码的次数
let ajax=0;
export const request=(params)=>{
    ajax++;
    // 显示加载中效果
    wx.showLoading({
        title:"加载中",
        mask:true
    });
        // 定义公共的url
    const baceUrl='https://api-hmugo-web.itheima.net/api/public/v1';
    return new Promise((resolve,reject)=>{
        wx.request({
         ...params,
         url:baceUrl+params.url,
         success:(result)=>{
            resolve(result); 
         },
         fail:(err)=>{
             reject(err);
         },complete:()=>{
            ajax--;
            if(ajax===0){
            //  请求发送完之后关闭加载图标
             wx.hideLoading();}
         }
          })
    })
}