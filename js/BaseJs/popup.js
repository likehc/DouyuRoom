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
var roomId="";
var bg = chrome.extension.getBackgroundPage();

window.onload =function(){
	document.getElementById("roomfilterchk").onclick  = function(){
		try{
			if(this.checked) {
				var des = $("input[id='roomfiltertext']").val();
				des = des =="" ? undefined:des;
				bg.addRooms(new Room(roomId,des),true);
			}else{
				bg.addRooms(new Room(roomId));
			}
		}catch(err){
		}
	};	
}
// 判断是否已移除,返回 room 实体
function roomRemoved(_roomId) {
	var result;
	var roomAr = bg.getRooms();
	for (var i = 0; i < roomAr.length; i++) {
		if (roomAr[i].id == _roomId) {
			result = roomAr[i];
			break;
		}
	}
	return result;
}


var msg ={type:"function",functionName:"getRoomId"};
var strId ="";
chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
	chrome.tabs.sendMessage(tabs[0].id, msg, function(response) { 
		strId = response;
	});
});

setTimeout(function(){
	roomId = strId;
	console.log(roomId);
},100);

setTimeout(function(){
	delayDo();
},150);

function delayDo() {
	var removedRoom = roomRemoved(roomId);
	var roomfilterchk = document.getElementById("roomfilterchk");
	if (roomId =="" ||roomId ==undefined) {
		$("#roomfilterp").remove();
		return;
	}
	if(removedRoom != undefined){	
		roomfilterchk.checked = true;
		$("input[id='roomfiltertext']").val(removedRoom.des);
	}
}