chrome.runtime.onMessage.addListener(function(message, sender, sendResponse)
{
	var result;
	if(message.type == "function") {
		switch(message.functionName){
			case "getRoomId":
				result= roomObj.getRoomId();
				break;
			case "getSender":
				result = sender;
				break;
		}	
	}
	sendResponse(result);
});

/*
*	定义一个类，用于写对象方法
*/
function onmessage() {
};

onmessage.getSomething = function () {
	return "";
}
//接收 window.postMessage({"insertSql": _data}, '*'); 类型的消息
window.addEventListener("message", function(e)
{
	if (e.data.hasOwnProperty("insertSql") ) {
		var data = e.data.insertSql;
		data.roomId = roomObj.getRoomId();
		var s =RoomObj.getDataFormBackground({type:"function",functionName:"insertSql",data});
	}
	if (e.data.hasOwnProperty("getShotMsgArr") ) {
		console.log("-----onmessage-");
		var shotMsgArr =RoomObj.getDataFormBackground({type:"function",functionName:"getShotMsgArr"});
		// setTimeout(function() {insertJsCss(basePath+"js/InjectedJs/shotMsgVue.js");},6000);return
		var t =self.setTimeout("return shotMsgArr ",500)
	}
}, false);