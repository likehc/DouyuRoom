/*
Room 类名
_id	房间id
_des 说明
*/
function Room(_id,_des) {
	this.id = _id;
	if (_des == undefined) {
		this.des ="打的QQ区";
	}else{
		this.des = _des;
	}	
};
//存放微信区的房间数组
var wxRoomArr=[
	new Room(1144379,"我是过滤说明"),
	new Room(4289572,"我也是")
];
//仅有QQ区房间id
var qqRoomIdArr=[
	988,2207607
];
//存放QQ区的房间数组
var qqRoomArr=[];
for (var i = 0; i < qqRoomIdArr.length; i++) {	
	qqRoomArr.push(new Room(qqRoomIdArr[i]));
}

//合并微信与QQ区的房间数组
var RoomArr = wxRoomArr.concat(qqRoomArr);

// 10秒过滤一次，因为无刷新更新页面，下次刷新会继续过滤
var removeRoomTimer=setInterval(function(){	
	if (window.location.href == "https://www.douyu.com/g_wzry") {
		var roomIdArr = $("#live-list-contentbox li");
		for (var j = 0; j < roomIdArr.length; j++) {
			var dataRid = roomIdArr[j].getAttribute("data-rid");
			for (var k = 0; k < RoomArr.length; k++) {
				if (RoomArr[k].id == dataRid) {
					roomIdArr[j].remove();
					break;
				}				
			}
		}
	}	
},10000);