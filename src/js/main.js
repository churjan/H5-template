window.global={
    openid:'',
    api:''
}

//获取openid
function getWeixinUserInfo() {
  let openid = localStorage.getItem("openid");
  if (openid) {
    console.log("有openid");
    window.global.openid = openid;
  } else if (window.location.href.indexOf("openid") != -1) {
    console.log("地址栏上有openid参数");
    let params = getUrlQuery(window.location.href);
    window.global.openid = params.openid;
    localStorage.setItem("openid", window.global.openid);
    history.back();
  } else {
    setTimeout(function() {
      console.log("跳转到后台"); 
      window.location.href = `${window.global.api}Home/Weixin/index?url=${window.location.href}`;
    }, 0);
  }
}

window.addEventListener("DOMContentLoaded", () => {

});
