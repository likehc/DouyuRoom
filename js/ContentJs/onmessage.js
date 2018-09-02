//popup 调用了getRoomId
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
		RoomObj.getDataFormBackground({type:"function",functionName:"insertSql",data});
	}
}, false);

//延迟省,发送 扩展 id
setTimeout(function() {
	window.postMessage({"getExtensionId": chrome.runtime.id}, '*');
}, 2000);
