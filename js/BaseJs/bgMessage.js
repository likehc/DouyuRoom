chrome.runtime.onMessageExternal.addListener(function(request, sender, sendResponse) {
	// 可以针对sender做一些白名单检查
	// sendResponse返回响应
	var result;
	if (request.type == 'function') {
		switch(request.functionName){
			case "getShotMsgArr":
				if (request.data!=undefined) {
					result = getShotMsgArr(request.data);
				}else{
					result = getShotMsgArr();
				}
			break;
			case "":
			break;
		}
	sendResponse(result);
	}
});