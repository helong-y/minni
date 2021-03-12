export const request=(params)=>{
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
         }
          })
    })
}