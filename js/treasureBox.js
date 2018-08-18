var roomId="";
var treasureMsg = new Object;
if (treasureMsg.data == undefined) {	//从 localStorage.RoomArr 获取要过滤的房间
	RoomObj.getDataFormBackground({type:"function",functionName:"getTreasureMsg"},treasureMsg);
}
function getBoxInfo() {
	try{
		if ($("#treasure").css("display") == "block") { //有无宝箱, "none"无，  "block"有			
			doTreasure();
			var openBoxTimer=setInterval(function(){
				if($(".js-danmu-reconnect.highLight").text()=="点击重新连接弹幕"){	//此页面已在别处打开
					window.close();
				}
				if ( $("#treasure").css("display") == "block") {
					document.title = $(".peck-cdn").text();	//宝箱信息显示在网页标题上
					//从未开过宝箱undefined,开过"none",正在开"block"
					if ($(".geetest_fullpage_click.geetest_float.geetest_wind.geetest_click").css("display") != "block") {
						$(".peck-cdn").click();	//点击领取
						$("#treasure").click();	//点击领取			
						$(".geetest_radar_tip").click();	//点击按钮进行验证
					}
				}else{
					window.close();
				}
			},800);
		}
	}catch(err){
	}
};
function doTreasure() {
	$(".live-room-normal-right.fl").remove();	//删除直播公告
	$("#js-fans-rank").remove();	//粉丝贡献榜
	$("#js-chat-cont").css("top","2px");	//升高弹幕区
	$(".giftbatter-box ").remove();	//礼物特效
	$(".shie-gift").remove();	//屏蔽特效
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
		if (treasureTimerIndex>=5) {
			window.clearInterval(treasureTimer);
			if (roomId =="") {return}
			return;
		}
		roomId = roomObj.getRoomId();		
		getBoxInfo();
		if ($("#treasure").css("display") == "block") {
			window.clearInterval(treasureTimer);
			setTimeout("RoomObj.sendMsg(treasureMsg.data)",8000);//听说发个弹幕,能提高中奖率
			return;
		}
		treasureTimerIndex++;
	},1000);
});

window.addEventListener("message", function(e)
{
	if (e.data.hasOwnProperty("insertSql") ) {		
		// console.log(JSON.stringify(e.data));
		// console.log(e.data);
		var data = e.data.insertSql;
		data.roomId = roomId;
		var s =RoomObj.getDataFormBackground({type:"function",functionName:"insertSql",data});
	}
}, false);