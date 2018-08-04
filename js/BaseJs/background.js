// https://rpic.douyucdn.cn/asrpic/*.jpg // 房间外显图片一定别阻止
var blockUrls =[
	"https://sta-op.douyucdn.cn/nggsys/*.jpg",	// 视频框内游戏推广
	"https://sta-op.douyucdn.cn/nggsys/*.png",	// 视频框内游戏推广
	"https://sta-op.douyucdn.cn/vod-cover/*.jpeg",	//视频推荐 房间预览
	"https://shark.douyucdn.cn/app/douyu/res/page/*.gif",	//源图片出错预备图
	"https://cs-op.douyucdn.cn/nggsys/*.jpg",	//其它游戏推广
	"https://cs-op.douyucdn.cn/nggsys/*.png",	//其它游戏推广	
	"https://sta-op.douyucdn.cn/vod-cover/*.jpg",	//视频内的推荐图片
	"https://sta-op.douyucdn.cn/vod-cover/*.png",	//视频内的推荐图片
	"http://image.wan.douyu.com/upload/*.png",	//个人说明里的游戏推广
	"https://shark.douyucdn.cn/app/douyu/res/com/*.jpg?*",	//斗鱼公会
	"https://shark.douyucdn.cn//app/douyu/res/page/room-normal/clientdown/*.png?*",	//客户端下载页图片
	"https://hm.baidu.com/hm*",	//百度代码统计

	"https://shark.douyucdn.cn/app/douyu/js/page/room/normal/mod-all1.js?v*",	//用于替换本地js
];
var callback =function(details){
	if (details.url.indexOf("https://shark.douyucdn.cn/app/douyu/js/page/room/normal/mod-all1.js")>-1) {
		return {redirectUrl: chrome.extension.getURL("js/RedirectJs/mod-all1.js")};
	}
	return {cancel: true};
};
var filter = {urls:blockUrls};
var opt_extraInfoSpec = ["blocking"];
chrome.webRequest.onBeforeRequest.addListener(callback, filter, opt_extraInfoSpec);