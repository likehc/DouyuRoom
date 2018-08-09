//从bg.js获取要过滤的房间数组
var roomObjArr = new Object;
if (roomObjArr.data == undefined) {	//从 localStorage.RoomArr 获取要过滤的房间
	RoomObj.getDataFormBackground({type:"function",functionName:"getRooms"},roomObjArr);
}
// 10秒过滤一次，因为无刷新更新页面，下次刷新会继续过滤
var removeRoomTimer=setInterval(function(){
	if (window.location.href == "https://www.douyu.com/g_wzry") {
		$("#left").remove();	//左侧快栏
		var roomIdArr = $("#live-list-contentbox li");
		for (var j = 0; j < roomIdArr.length; j++) {
			var dataRid = roomIdArr[j].getAttribute("data-rid");
			var RoomArr =roomObjArr.data;
			for (var k = 0; k < RoomArr.length; k++) {
				if (RoomArr[k].id == dataRid) {
					roomIdArr[j].remove();
					break;
				}
			}
		}
	}else{
		window.clearInterval(removeRoomTimer);
	}	
},3000);