var roomId=0;
var robTreasure = new Object;
if (robTreasure.data == undefined) {	//从 localStorage.RoomArr 获取要过滤的房间
	RoomObj.getDataFormBackground({type:"function",functionName:"getRobTreasure"},robTreasure);
}
function getBoxInfo() {
	try{
		var treasureDetail=$(".TreasureDetail");
		if (treasureDetail.length>0) { //有无宝箱, "none"无，  "block"有			
			if (robTreasure.data == 1) {
				doTreasure();	//清除页面，移除播放器
			}
			var openBoxTimer=setInterval(function(){
				/*if($(".Barrage-notice .Barrage-text").text()=="消息提醒：您的账号在另一地点登录，弹幕连接已断开 点击重新连接弹幕"){	//此页面已在别处打开
					window.close();
				}*/
				if ($(".Treasure").length>0) {
					var title = $(".TreasureStatus-text ").text();
					document.title =title;
					var geetest_popup_box =$(".geetest_popup_box");
					if (title =="领取" && geetest_popup_box.length <=0 ) {
						$(".TreasureStatus-text")[0].click();//点击领取
						var geetest_radar_tip =$(".geetest_radar_tip");
						if(geetest_radar_tip.length>0){
							geetest_radar_tip[0].click();//点击验证板	
						}
					}else{
						geetest_popup_box.css("width","347px");
					}
				}else{
					if (robTreasure.data == 1) {
						window.close();
					}
				}
			},800);
		}
	}catch(err){		
	}
};

function doTreasure() {

	giftBatterBoxRemove();
	//HTML5 播放器▽▽▽	
	
	//HTML5 播放器△△△
	//flash 播放器▽▽▽
	
	//flash 播放器△△△
}

//屏蔽全部特效
function giftBatterBoxRemove() {
	
};

var treasureTimerIndex =0;
$(document).ready(function(){
	var treasureTimer=setInterval(function(){
		treasureTimerIndex++;
		roomId = roomObj.getRoomId();
		if (treasureTimerIndex>=20) {
			window.clearInterval(treasureTimer);
			if (roomId =="") {return}
			return;
		}		
		getBoxInfo();
		// if ($("#treasure").css("display") == "block") {
		// 	window.clearInterval(treasureTimer);
		// 	// setTimeout("RoomObj.sendMsg(treasureMsg.data)",8000);//听说发个弹幕,能提高中奖率
		// 	return;
		// }		
	},1000);
});