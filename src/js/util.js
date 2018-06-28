const util={
    //获取地址栏的params
    getUrlQuery(str) {
        str = str === null ? window.location.href : str;
        let arr = str.substring(str.lastIndexOf("?") + 1).split("&");
        let obj = {};
        for (let i = 0; i < arr.length; i++) {
            let newArr = arr[i].split("=");
            obj[newArr[0]] = newArr[1];
        }
        return obj;
    },
    
    //在微信里面自动播放
    autoPlayAudio(ele){
        if(window.WeixinJSBridge){
            WeixinJSBridge.invoke('getNetworkType', {}, function(e) {
                ele.play();
                ele.pause();
                ele.play();
            }, false);
        }else{
            document.addEventListener("WeixinJSBridgeReady", function() {
                WeixinJSBridge.invoke('getNetworkType', {}, function(e) {
                    ele.play();
                    ele.pause();
                    ele.play();
                });
            }, false);
        }
      }
}