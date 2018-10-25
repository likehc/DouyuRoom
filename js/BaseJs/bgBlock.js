// https://rpic.douyucdn.cn/asrpic/*.jpg // 房间外显图片一定别阻止
var blockUrls =[
	// "https://sta-op.douyucdn.cn/front-publish/live-master/js/room/common_*",
	// "https://api.geetest.com/ajax.php?gt=*",//打码平台

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
	// window.SHARK_LOADER_CONFIG.P4[0].url
	// if (details.url.indexOf("https://sta-op.douyucdn.cn/front-publish/live-master/js/room/common_")>-1) {
	// 	console.log(details.url);
	// 	return {redirectUrl: chrome.extension.getURL("js/RedirectJs/common_954966b.js")};
	// }
	// // 打码平台
	// if (details.url.indexOf("https://api.geetest.com/ajax.php?gt=")>-1) {
	// 	var s = getGtAndChallenge(details.url);
	// 	console.log(s);
	// 	return {cancel: false};
	// }

	return {cancel: true};
};
var filter = {urls:blockUrls};
var opt_extraInfoSpec = ["blocking"];
chrome.webRequest.onBeforeRequest.addListener(callback, filter, opt_extraInfoSpec);

//打码平台
function getGtAndChallenge(_s) {
	try{
		var strArr = _s.split("&");
		var gt = strArr[0].split("=")[1];
		var challenge = strArr[1].split("=")[1];
		return "gt="+gt+"&challenge="+challenge;		
	}catch(err){
	}
	return "can't get the gt&challenge";
}