var targetExtensionId = "jbcfompgackcpnfcphdhpepcdnbbjfnh"; // 插件的ID
var ExtensionUrl = "chrome-extension://"+chrome.runtime.id+"/";
function PageObj() {
	this.roomId = 0;	//房间Id
	this.treasureMsg ="";	//抢宝箱时的弹幕
	this.insertType = 0;	//存放数据库类型
	this.extensionId = targetExtensionId;
	this.extensionUrl = ExtensionUrl;
};
var pageObj;
/*
* 	发送弹幕
*/
PageObj.sendMsg = function (s) {
	document.getElementsByClassName('ChatSend-txt')[0].value = s;
	document.getElementsByClassName('ChatSend-button')[0].click();
}
PageObj.setLocalStorage = function(key,value) {
	localStorage[key]=value;
}
PageObj.getLocalStorage = function(key) {
	return localStorage[key];
}
// 判断元素是否绑定了某方法
PageObj.isBindFunction=function(dom,funcName) {
	var events = dom.data("events");
	if( events && events[funcName] ){
		return true;	//绑定
	}else{
		return false;	//未绑定
	}
};
//onmessage接收
PageObj.insertData=function(_data) {
	try{
		_data.uid = document.getElementsByClassName("Avatar-img")[0].getAttribute("uid");
	}catch(err){
		_data.uid =0;
	}
	console.log(_data);
	setTimeout(function() {
		window.postMessage({"insertSql": _data}, '*');
	}, 500);
};

PageObj.getUid=function() {
	var result =0;
	try{
		result =document.getElementsByClassName("Avatar-img")[0].getAttribute("uid");
	}catch(err){
	}
	return result;
};


PageObj.delayRun=function(t) {
	setTimeout(function () {
		
	},t);
};



//s 如 {from:"pageMsg" ,type: 'function', functionName: 'getShotMsgArr'}
//obj 是对象
function pageSendMsg(s,_obj) {
	try{
		chrome.runtime.sendMessage(targetExtensionId, s, function(response) {
			// console.log(response);
			if (_obj !=undefined &&_obj != null ) {
				_obj.data =response;
			}
		});
	}catch(err){
	}
};
window.addEventListener("message", function(e)
{
	if (e.data.hasOwnProperty("getExtensionId") ) {
		var getExtensionId =e.data.getExtensionId
		targetExtensionId = getExtensionId;
		ExtensionUrl = "chrome-extension://"+getExtensionId+"/";
		pageObj = new PageObj();
	}
}, false);

//临时
function getUrl(s) {
	var user="likehc";
	var pass="tasbajjZWZV7";
	var referer=window.location.origin;
	// var url="http://jiyanapi.c2567.com/shibie?"+s+"&referer="+referer+"&user="+user+"&pass="+pass+"&return=json&model=3";
	// 	var url="http://jiyanapi.c2567.com/shibie?gt=请输入gt参数&challenge=请输入challenge参数&referer=请输入来源地址参数&user=test&pass=test&return=json&model=3&format=utf8"
	var url = "https://jiyanapi.c2567.com/shibie?"+s+"&referer="+referer+"&user="+user+"&pass=" + pass + "&return=json&model=3&format=utf8";
	console.log(url);
	httpGet(url);
};

// 发送get数据
function httpGet(url,async) {
	var r;
	var tempAsync=async||false;	
	$.ajax({url:url,dataType:"jsonp",async: tempAsync,success:function(result){
		console.log(result);
		r=result;
	}});
	return r;
};