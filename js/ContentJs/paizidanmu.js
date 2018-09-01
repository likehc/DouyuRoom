var roomId=0;
var pzTimerIndex =0;
$(document).ready(function(){
	var pzTimer=setInterval(function(){
		if (pzTimerIndex>=5) {
			window.clearInterval(pzTimer);
			return;
		}
		if ($(".fans-entrance").length ==1) {
			roomObj.removePaiZi();
			roomId = roomObj.getRoomId();
			var ss = setTimeout("roomObj.addPaiZi(roomId);", 500);//与移除牌子设置下时间间隔
			roomObj.setDanMuYanSe();
			window.clearInterval(pzTimer);
			return;
		}
		pzTimerIndex++;
	},5000);
});