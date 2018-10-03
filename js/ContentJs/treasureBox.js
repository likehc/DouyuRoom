var roomId=0;
// var treasureMsg = new Object;
// if (treasureMsg.data == undefined) {	//从 localStorage.RoomArr 获取要过滤的房间
// 	RoomObj.getDataFormBackground({type:"function",functionName:"getTreasureMsg"},treasureMsg);
// }
var robTreasure = new Object;
if (robTreasure.data == undefined) {	//从 localStorage.RoomArr 获取要过滤的房间
	RoomObj.getDataFormBackground({type:"function",functionName:"getRobTreasure"},robTreasure);
}
function getBoxInfo() {	
	try{
		if ($("#treasure").css("display") == "block") { //有无宝箱, "none"无，  "block"有			
			if (robTreasure.data == 1) {
				doTreasure();	//清除页面，移除播放器
			}
			var openBoxTimer=setInterval(function(){
				if($(".js-danmu-reconnect.highLight").text()=="点击重新连接弹幕"){	//此页面已在别处打开
					window.close();
				}
				if ( $("#treasure").css("display") == "block") {
					document.title = $(".peck-cdn").text();	//宝箱信息显示在网页标题上
					//从未开过宝箱undefined,开过"none",正在开"block"
					if ($(".geetest_fullpage_click.geetest_float.geetest_wind.geetest_click").css("display") != "block") {
						$(".peck-cdn").click();	//点击领取
						// $("#treasure").click();	//点击领取			
						$(".geetest_radar_tip").click();	//点击按钮进行验证
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
	$(".live-room-normal-right.fl").remove();	//删除直播公告
	$("#js-live-room-normal-equal-left").remove();	//视频下方广告
	$("#js-fans-rank").remove();	//粉丝贡献榜
	$("#js-chat-cont").css("top","2px");	//升高弹幕区
	giftBatterBoxRemove();
	//$(".shie-gift").remove();	//屏蔽特效
	//HTML5 播放器▽▽▽	
	$(".pause-81a5c3").click();	//暂停视频
	//HTML5 播放器△△△
	//flash 播放器▽▽▽
	$("#douyu_room_flash_proxy").remove();//	移除播放区域
	//flash 播放器△△△
}
var treasureTimerIndex =0;
$(document).ready(function(){
	var treasureTimer=setInterval(function(){
		if (treasureTimerIndex>=20) {
			window.clearInterval(treasureTimer);
			if (roomId =="") {return}
			return;
		}
		roomId = roomObj.getRoomId();
		getBoxInfo();
		if ($("#treasure").css("display") == "block") {
			window.clearInterval(treasureTimer);
			// setTimeout("RoomObj.sendMsg(treasureMsg.data)",8000);//听说发个弹幕,能提高中奖率
			return;
		}
		treasureTimerIndex++;
	},1000);
});
//屏蔽全部特效
function giftBatterBoxRemove() {
	//开启
	if ($("#shie-switch").attr("data-shield-status") !=1) {
		$("#shie-switch").click();
	}
	//关闭
	if ($("#shie-switch").attr("data-shield-status") !=1) {
		$("#shie-switch").click();
	}
	$("#js-shie-gift").hide();	//礼物特效
};


/*var arrLength = 0;
//弹幕数组
var msgArr = [];
var dmTimer=setInterval(function(){	
	msgArr = treasureMsg.data||[];
	if (document.getElementsByClassName('cs-textarea')[0].value =="") {
		if (arrLength >= msgArr.length) {
			arrLength = 0;
		}
		RoomObj.sendMsg(msgArr[arrLength]);
		arrLength++;
	}	
},15000);//30000毫秒就是30秒发一次*/