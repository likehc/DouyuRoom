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