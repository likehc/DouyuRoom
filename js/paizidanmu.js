var roomId="";
function delayOnload() {
	roomObj.removePaiZi();
	var ss = setTimeout("roomObj.addPaiZi(roomId);", 1000);//与移除牌子设置下时间间隔
	roomObj.setDanMuYanSe();
		
};
window.onload=function(){
	roomId = roomObj.getRoomId();
	if (roomId =="") {return}
	var delayOnloadTimer = setTimeout("delayOnload()", 2500);
};