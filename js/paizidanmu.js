var roomId="";
function delayOnload() {
	roomObj.removePaiZi();
	var ss = setTimeout("roomObj.addPaiZi(roomId);", 2000);//与移除牌子设置下时间间隔
	roomObj.setDanMuYanSe();
		
};
window.onload=function(){
	roomId = roomObj.getRoomId();
	if (roomId =="") {return}
	var delayOnloadTimer = setTimeout("delayOnload()", 1500);
};