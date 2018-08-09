/*
*	Room 类名
*	_id	房间id
*	_des 说明
*/
function Room(_id,_des) {
	this.id = _id;
	if (_des == undefined) {
		this.des ="打的QQ区";
	}else{
		this.des = _des;
	}	
};
function newRoom(_id,_des) {
	if (_des!="") {
		return new Room(_id,_des);
	}else{
		return new Room(_id);
	}
};
//共用变量
var exId;	//扩展程序id
var tabId;	//当前tab id

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

/*
*	_room为Room的实例,必包含Id
*	_isAdd 为true时，则为新增，为空时则删除，默认为undefined
*/
function addRooms(_room,_isAdd) {	
	var roomObjArr = localStorage.RoomArr==undefined? []:JSON.parse(localStorage.RoomArr);
	if (_isAdd == true) {		
		roomObjArr.push(_room);
		var RoomsStr =JSON.stringify(roomObjArr);
		localStorage.RoomArr =RoomsStr;
	}else{
		for (var i = roomObjArr.length - 1; i >= 0; i--) {
			if (roomObjArr[i].id == _room.id ) {
				 roomObjArr.splice(i, 1);
				 break;
			}
		}
		var RoomsStr =JSON.stringify(roomObjArr);
		localStorage.RoomArr =RoomsStr;
	}
};
function setLocalStorage(key,value) {
	localStorage[key]=value;
}
function getLocalStorage(key) {
	return localStorage[key];
}

function getRooms(){
	return (localStorage.RoomArr==undefined||localStorage.RoomArr=="")?[]:JSON.parse(localStorage.RoomArr);
};

function getTreasureMsg(){
	return (localStorage.treasureMsg==undefined||localStorage.treasureMsg=="")?[]:localStorage.treasureMsg;
};
/*
*	如果没有相应的结果,则返回null
*/

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse){
	exId=sender.id;
	if (sender.hasOwnProperty("tab")){tabId=sender.tab.id}else{return}; //点击扩展时,也会激活此事件
	var result;
	if (message.type =="function") {
		switch(message.functionName){
			case "getRooms":
				result= getRooms();
				break;
			case "getSender":
				result = sender;
				break;
		}	
	}		
	// setTimeout(function(){
	// 	sendResponse(result);
	// },400);
	//return true;
	sendResponse(result);	
});