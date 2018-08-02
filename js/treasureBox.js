var roomId="";
function getBoxInfo() {
	try{
		if ($("#treasure").css("display") == "block") { //"none"无，  "block"有
			removeTreasureDiv();
			var openBoxTimer=setInterval(function(){
				if ( $("#treasure").css("display") == "block") {
					document.title = roomId +"         "+ $(".peck-cdn").text();	//宝箱信息显示在网页标题上
					//从未开过宝箱undefined,开过"none",正在开"block"
					if ($(".geetest_fullpage_click.geetest_float.geetest_wind.geetest_click").css("display") != "block") {
						$(".peck-cdn").click();	//点击领取						
						$(".geetest_radar_tip").click();	//点击按钮进行验证
					}
				}else{
					this.close();
				}
			},800);
		}
	}catch(err){		
	}
};
function removeTreasureDiv() {
	$(".live-room-normal-right.fl").remove();	//直播公告
	$(".shie-gift").remove();	//屏蔽特效
}
$(document).ready(function(){
	roomId = roomObj.getRoomId();
	if (roomId =="") {return}	
	var boxInfoTimer=setTimeout("getBoxInfo()",8000);
});