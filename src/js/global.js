const global={
    openid:'',
    baseURI:''
}

//获取openid
function getWeixinUserInfo() {
  let openid = localStorage.getItem("openid");
  let href=window.location.href;
  if (openid) {
    console.log("有openid");
    global.openid = openid;
  } else if (href.indexOf("openid") !== -1) {
    console.log("地址栏上有openid参数");
    let params = util.getUrlQuery(href);
    global.openid = params.openid;
    localStorage.setItem("openid", global.openid);
    history.back();
  } else {
    setTimeout(function() {
      console.log("跳转到后台"); 
      window.location.href = `${global.baseURI}Home/Weixin/index?url=${href}`;
    }, 0);
  }
}