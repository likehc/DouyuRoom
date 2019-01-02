var pzTimerIndex =0;
$(document).ready(function(){
	var pzTimer=setInterval(function(){
		pzTimerIndex++;
		if (pzTimerIndex>=20) {
			window.clearInterval(pzTimer);
			return;
		}
		try{
			if ($(".FansMedalList-anchorName").length >0 ||　$(".fans-entrance").length>0) {
				roomObj.removePaiZi();
				var ss = setTimeout("roomObj.addPaiZi();", 700);//与移除牌子设置下时间间隔
				roomObj.setDanMuYanSe();
				window.clearInterval(pzTimer);
				return;
			}
		}catch(err){

		}
	},5000);
});