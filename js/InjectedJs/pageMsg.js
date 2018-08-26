var targetExtensionId = "jbcfompgackcpnfcphdhpepcdnbbjfnh"; // 插件的ID

//s 如 {from:"pageMsg" ,type: 'function', functionName: 'getShotMsgArr'}
//obj 对象
function pageSendMsg(s,_obj) {
	try{
		chrome.runtime.sendMessage(targetExtensionId, s, function(response) {
			// console.log(response);
			_obj.data =response;
		});		
	}catch(err){
	}
}