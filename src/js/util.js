const util={
    //图片加载
    loading(rootPath,imgArr,cb){
        let total=imgArr.length;//图片总数量
        let count=0;//图片每加载一个数量加一
        imgArr.forEach((item)=>{
          let img=new Image();
          img.src=rootPath+item;
          img.onload=function() {
            count++;
            cb&&cb(count,total);
          }
        })
    },
    //在微信里面自动播放
    weixinAutoPlay(el){
        el.play();
        if(window.WeixinJSBridge){
            WeixinJSBridge.invoke('getNetworkType', {}, function(e) {
                el.play();
            }, false);
        }else{
            document.addEventListener("WeixinJSBridgeReady", function() {
                WeixinJSBridge.invoke('getNetworkType', {}, function(e) {
                    el.play();
                });
            }, false);
        }
        
      },
    //获取地址栏的params
    getUrlQuery(str=window.location.href) {
        let arr = str.substring(str.lastIndexOf("?") + 1).split("&");
        let obj = {};
        for (let i = 0; i < arr.length; i++) {
            let newArr = arr[i].split("=");
            obj[newArr[0]] = newArr[1];
        }
        return obj;
    }
}