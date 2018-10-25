var basePath = "chrome-extension://"+chrome.runtime.id+"/";
// RoomObj.insertJs(basePath+"js/QuoteJs/jquery.min.js");	//引用jquery
RoomObj.insertJs(basePath+"js/InjectedJs/pageObj.js");	//前台方法汇总
RoomObj.insertJs(basePath+"js/InjectedJs/sendGifts.js",5000);	//礼物连点方法
RoomObj.insertCss(basePath+"css/sendGfts.css");	//前台方法汇总