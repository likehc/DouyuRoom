// https://rpic.douyucdn.cn/asrpic/*.jpg // 房间外显图片一定别阻止
var blockUrls =[
	// "https://sta-op.douyucdn.cn/front-publish/live-master/js/room/common_*.js",	//宝箱验证
	// "https://msgstatic.douyucdn.cn/dist/build-*.js",
	// "https://sta-op.douyucdn.cn/front-publish/live-master/js/room/playerAside_*.js",	//宝箱验证	
	"https://api.geetest.com/get.php?gt=*",//打码平台

	"https://sta-op.douyucdn.cn/nggsys/*.jpg",	// 视频框内游戏推广	
	"https://sta-op.douyucdn.cn/nggsys/*.png",	// 视频框内游戏推广
	"https://sta-op.douyucdn.cn/vod-cover/*.jpg",	//视频内的推荐图片
	"https://sta-op.douyucdn.cn/vod-cover/*.png",	//视频内的推荐图片
	"https://sta-op.douyucdn.cn/dypart/*.jpg",
	"https://sta-op.douyucdn.cn/dypart/*.png",
	"https://sta-op.douyucdn.cn/vod-cover/*.jpeg",	//视频推荐 房间预览
	"https://shark.douyucdn.cn/app/douyu/res/page/*.gif",	//源图片出错预备图
	"https://cs-op.douyucdn.cn/nggsys/*.jpg",	//其它游戏推广
	"https://cs-op.douyucdn.cn/nggsys/*.png",	//其它游戏推广		
	"http://image.wan.douyu.com/upload/*.png",	//个人说明里的游戏推广
	"https://shark.douyucdn.cn/app/douyu/res/com/*.jpg?*",	//斗鱼公会
	"https://shark.douyucdn.cn//app/douyu/res/page/room-normal/clientdown/*.png?*",	//客户端下载页图片
	"https://hm.baidu.com/hm*",	//百度代码统计	

];
var callback =function(details){
	//window.SHARK_LOADER_CONFIG.P4[0].url
	// if (details.url.indexOf("https://sta-op.douyucdn.cn/front-publish/live-master/js/room/common_")>-1) {
	// 	return {redirectUrl: chrome.extension.getURL("js/RedirectJs/common_ed96b4f.js")};
	// }
	// if (details.url.indexOf("https://msgstatic.douyucdn.cn/dist/build-")>-1) {
	// 	return {redirectUrl: chrome.extension.getURL("js/RedirectJs/build-dd50508.js")};
	// }
	//宝箱验证
	// if (details.url.indexOf("https://sta-op.douyucdn.cn/front-publish/live-master/js/room/playerAside_")>-1) {
	// 	return {redirectUrl: chrome.extension.getURL("js/RedirectJs/playerAside_dfa5c9b.js")};
	// }
	// 打码平台				"https://api.geetest.com/get.php?gt="
	if (details.url.indexOf("https://api.geetest.com/get.php?gt=")>-1) {		
		var s = getGtAndChallenge(details.url);
		console.log(s);
		return {cancel: false};
	}

	return {cancel: true};
};
var filter = {urls:blockUrls};
var opt_extraInfoSpec = ["blocking"];
chrome.webRequest.onBeforeRequest.addListener(callback, filter, opt_extraInfoSpec);

//获取gt与challenge
function getGtAndChallenge(_s) {
	try{
		var strArr = _s.split("&");
		var gt = strArr[0].split("=")[1];
		var challenge = strArr[1].split("=")[1];
		return "gt="+gt+"&challenge="+challenge;
	}catch(err){
	}
	return "can't get the gt&challenge";
};