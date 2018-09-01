var targetExtensionId = "jbcfompgackcpnfcphdhpepcdnbbjfnh"; // 插件的ID

function PageObj() {
	this.roomId = 0;	//房间Id
	this.treasureMsg ="";	//抢宝箱时的弹幕
	this.insertType = 0;	//存放数据库类型
};
var pageObj = new PageObj();
/*
* 	发送弹幕
*/
pageObj.sendMsg = function (s) {
	document.getElementsByClassName('cs-textarea')[0].value = s;
	document.getElementsByClassName('b-btn')[0].click();
}
pageObj.setLocalStorage = function(key,value) {
	localStorage[key]=value;
}
pageObj.getLocalStorage = function(key) {
	return localStorage[key];
}
// 判断元素是否绑定了某方法
//isBindFunction($("#tags"),"click")
pageObj.isBindFunction=function(dom,funcName) {
	var events = dom.data("events");
	if( events && events[funcName] ){
		return true;	//绑定
	}else{
		return false;	//未绑定
	}
};
//onmessage接收
pageObj.insertData=function(_data) {	
	try{
		_data.uid =window.$SYS.uid;		
	}catch(err){
		_data.uid =0;		
	}
	console.log(_data);
	window.postMessage({"insertSql": _data}, '*');
};

pageObj.delayRun=function(t) {
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