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


//插入数据库默认类型 0不保存1.Web Sql 2.MySql  
if (localStorage.insertType == undefined) {
	localStorage.insertType == 0;	
}
//共用变量
var exId;	//扩展程序id
var tabId;	//当前tab id
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
	return (localStorage.treasureMsg==undefined||localStorage.treasureMsg=="")?"666":localStorage.treasureMsg;
};
var SqlDate =[];
// var 
var ws = new WebSocket("ws://localhost:8787");
ws.onclose = function (event) {};
ws.onerror = function (event) {};
function setOnmessage() {
	ws.onmessage = function(evt) {	
		//console.log(evt.data);
		var msgType = JSON.parse(evt.data);
		if (msgType.FuncName=="getDataBetweenDay") {
			SqlDate=[];
			SqlDate = evt.data;
		}	
	};
};

function insertSql(_data) {	
	// 写入mysql
	if (localStorage.insertType ==2) {		
		//插入数据库
		try{
			if (ws.readyState !=1) {
				ws = new WebSocket("ws://localhost:8787");
				ws.onopen = function(){
					ws.send("insertSql##yhc##"+JSON.stringify(_data));
					return "inserted!";	
				};
			}else{
				ws.send("insertSql##yhc##"+JSON.stringify(_data));
				setOnmessage();
				return "inserted!";	
			}			
			return "err";
		}catch(err){
			return "err";
		}
	}
	//写入indexedDB
	if (localStorage.insertType ==1) {		
		try{
			Treasure.add(_data);			
		}catch(err){
			return "err";
		}
	}
};
function getDataBetweenDay(s,e){
	try{
		if (ws.readyState !=1) {
			ws = new WebSocket("ws://localhost:8787");
				ws.onopen = function(){
				ws.send("getDataBetweenDay##yhc##"+s+","+e);
				//return "inserted!";	
			};
		}else{
			ws.send("getDataBetweenDay##yhc##"+s+","+e);
			setOnmessage();
			//return "inserted!";	
		}
		 
		return "err";
	}catch(err){
		return "err";
	}
};
//获取快捷短语
function getShotMsgArr(_roomId) {
	if (_roomId!=undefined) {
		return localStorage[_roomId];
	}else{
		return localStorage.shotMsgArr;
	}
};
//设置快捷短语
function setShotMsgArr(tagStr,_roomId) {
	if (_roomId!=undefined) {
		localStorage[_roomId] = tagStr;
	}else{
		localStorage.shotMsgArr = tagStr;
	}
}
function getExtensionInfo(s) {
	var extInfo = new Object()
	extInfo.id=chrome.runtime.id;
	s=extInfo;
	return extInfo;
}

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
			case "getTreasureMsg":
				result = getTreasureMsg();
				break;
			case "insertSql":
				result = insertSql(message.data);
			break;
			case "getShotMsgArr":
				if (message.data!=undefined) {
					result = getShotMsgArr(message.data);
				}else{
					result = getShotMsgArr();
				}
			break;
			case "setShotMsgArr":
				if (message.data!=undefined) {
					setShotMsgArr(message.data,message.roomId);
				}else{
					setShotMsgArr(message.data);
				}
			break;
			case "getExtensionInfo":
				result = getExtensionInfo(message.data);
			break;
		}
	}
	// setTimeout(function(){
	// 	sendResponse(result);
	// },400);
	//return true;
	sendResponse(result);
});
//tab 激活事件
// chrome.tabs.onActivated.addListener(function(activeInfo){
// 	chrome.browserAction.setBadgeText({text: ''});
// 	//console.log('Tab '+activeInfo.tabId+' in window '+activeInfo.windowId+' is active now.'); 
// 	var rooms =(localStorage.RoomArr==undefined||localStorage.RoomArr=="")?[]:JSON.parse(localStorage.RoomArr);
// 	try{
// 		chrome.tabs.query({ 
// 			active: true 
// 		}, function(tabArray){	//多窗口时tabArray要处理下
// 			for (var i = tabArray.length - 1; i >= 0; i--) {
// 				if (tabArray[i].audible) {
// 					var roomStrArr =tabArray[i].url.split("/");
// 					if (roomStrArr.length !=4) return;
// 					var roomTempId = roomStrArr[3];			
// 					for (var a = 0; a < rooms.length; a++) {
// 						if (rooms[a].id ==roomTempId) {
// 							chrome.browserAction.setBadgeText({text: 'Block'});
// 							chrome.browserAction.setBadgeBackgroundColor({color: [255, 0, 0, 255]});
// 							break;
// 						}
// 					}
// 				}
// 			}
// 		});
// 	}catch(err){
// 	}	
// });
//tab 激活事件
chrome.tabs.onActivated.addListener(function(activeInfo){
	chrome.tabs.getSelected(function(tabs)
	{
		// console.log("当前的标签是:",tabs);
		chrome.browserAction.setBadgeText({text: ''});
		var rooms =(localStorage.RoomArr==undefined||localStorage.RoomArr=="")?[]:JSON.parse(localStorage.RoomArr);
		try{
			var roomStrArr =tabs.url.split("/");
			if (roomStrArr.length !=4) return;
			var roomTempId = roomStrArr[3];			
			for (var a = 0; a < rooms.length; a++) {
				if (rooms[a].id ==roomTempId) {
					chrome.browserAction.setBadgeText({text: 'Block'});
					chrome.browserAction.setBadgeBackgroundColor({color: [255, 0, 0, 255]});
					break;
				}
			}
		}catch(err){
		}
	});
});