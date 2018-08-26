var shotMsg = new Vue({
	el: '#tags',
	data: {
		message: 'Hello Vue!',
		tags: [
			/*{ "name": "标签一22222222333333333标签一", "type": "" },
			{ "name": "标签二sdsddsdsdsd", "type": "success" },
			{ "name": "标签三", "type": "info" },
			{ "name": "标签四", "type": "warning" },
			{ "name": "标签五", "type": "danger" },
			{ "name": "标签五1", "type": "danger" },
			{ "name": "标签五2", "type": "danger" },
			{ "name": "标签五3", "type": "danger" },
			{ "name": "标签五4", "type": "danger" },
			{ "name": "标签五5", "type": "danger" },
			{ "name": "标签五6", "type": "danger" },
			{ "name": "标签五7", "type": "danger" },
			{ "name": "标签五8", "type": "danger" },
			{ "name": "标签五9", "type": "danger" },
			{ "name": "标签五0", "type": "danger" }*/			
		]
	},
	methods:{
		judge:function(row, column) { 
			var type = row[column.property];
			if (type ==1) {return "火箭"}
			if (type ==2) {return "飞机"}
		}
		
	}
});
var tags = document.getElementById("tags");
if (tags!=null) {
	tags.onclick = function( ev ){
		var event = ev || window.event;
		var target = event.target || event.srcElement; 
		if (target.nodeName.toLowerCase() == 'span' ){
			var msg =target.innerText.trim();
			sendMsg(msg);
			$("#shotMsg").hide();
		}
	};
}

/*
* 	发送弹幕
*/
function sendMsg(s) {
	document.getElementsByClassName('cs-textarea')[0].value = s;
	document.getElementsByClassName('b-btn')[0].click();
};

var pageMsgObj = new Object;
var pageMessage = {from:"pageMsg" ,type: 'function', functionName: 'getShotMsgArr'}
pageSendMsg(pageMessage,pageMsgObj);
self.setTimeout(function() {
	var shotMsgArr = pageMsgObj.data.split(",");
	var msgArr = [];
	for (var c = 0; c < shotMsgArr.length; c++) {
		var tag =getTagType(shotMsgArr[c],c);
		msgArr.push(tag);
	}
	shotMsg.tags=msgArr;	

},300);
function getTagType(s,i) {
	var index=i%5;
	switch(index)
	{		
		case 0:
			return { "name":s, "type": "" };
		break;
		case 1:
			return { "name":s, "type": "success" };
		break;
		case 2:
			return { "name":s, "type": "info" };
		break;
		case 3:
			return { "name":s, "type": "warning" };
		break;
		case 4:
			return { "name":s, "type": "danger" };
		break;
	}	
}