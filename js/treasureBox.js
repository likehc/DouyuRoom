var roomId="";
function getBoxInfo() {
	try{
		if ($("#treasure").css("display") == "block") { //有无宝箱, "none"无，  "block"有
			RoomObj.sendMsg("6666");	//听说发个弹幕,能提高中奖率
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
	$(".shie-gift").remove();	//屏蔽特效
	//HTML5 播放器▽▽▽	
	$(".pause-81a5c3").click();	//暂停视频
	//HTML5 播放器△△△
	//flash 播放器▽▽▽
	//flash 播放器△△△
}

$(document).ready(function(){
	roomId = roomObj.getRoomId();
	if (roomId =="") {return}	
	var boxInfoTimer=setTimeout("getBoxInfo()",7000);
});