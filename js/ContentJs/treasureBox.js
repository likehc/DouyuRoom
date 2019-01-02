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
					sendMsg("666");
					var title = $(".TreasureStatus-text ").text();
					document.title =title;
					var geetest_popup_box =$(".geetest_popup_box");
					//document.getElementById("treasure").click()  //鼠标要在宝箱上
					if (title =="领取" && geetest_popup_box.length <=0 ) {
						
						$(".TreasureStatus-text ")[0].click();//点击领取
						/*var geetest_radar_tip =$(".geetest_radar_tip");
						if(geetest_radar_tip.length>0){
							geetest_radar_tip[0].click();//点击验证板	
						}*/
					}else{
						geetest_popup_box.css("width","347px");
					}
				}else{
					// if (robTreasure.data == 1 ) {
					// 	window.close();
					// }
				}
			},200);
		}
	}catch(err){		
	}
};

function doTreasure() {

	giftBatterBoxRemove();
	//HTML5 播放器▽▽▽	
	// $("#__video").remove(); 	///html5
	//HTML5 播放器△△△
	//flash 播放器▽▽▽
	// $(".room-Player").remove();
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
		var treasureDetail=$(".TreasureDetail");
		if (treasureDetail.length>0) {
			getBoxInfo();
			sendTreasure();
			window.clearInterval(treasureTimer);
			return;
		}
	},1000);
});
function TreasureBox() {
	this.code = "";
	this.validate = "";
	this.msg="";
	this.award_type="2";
	this.src_nick="";
	this.silver="";
	this.silver_balance="";
	this.prop_name="";
	this.prop_count="";
	this.prop_id="";
	this.gt="";
	this.lk="";
	this.lt="";
	this.time="2018-09-01 05:23:20";
	this.roomId="";
	this.uid="";
};
var yanchiIndex=0;
function sendTreasure() {
var sendTreasureTimer = setInterval(function() {
		var t =$(".TreasureResult-content .TreasureResult-name");		
		if (yanchiIndex <=3) {
			yanchiIndex++;
			return;
		}		
		if (t.length==2) {
			var treasure = new TreasureBox();
			treasure.award_type="2";
			treasure.src_nick = t[0].textContent;
			var sArr = t[1].textContent.split("个");

			if (sArr[1] == "鱼丸") {			
				treasure.silver=sArr[0];
			}
			if (sArr[1] == "稳") {
				treasure.prop_count=sArr[0];
			}
			if (sArr[1] == "赞") {
				treasure.prop_count=sArr[0];
			}
			treasure.uid=RoomObj.getUid();
			treasure.time=RoomObj.getTime();
			// console.log(treasure);
			RoomObj.insertData(treasure);
			yanchiIndex=0;
		}
		var treasureDetail=$(".TreasureDetail");
		if ($(".Treasure").length<=0 && treasureDetail.length <=0) {
			if (robTreasure.data == 1) {
				window.close();
			}
		}
	}, 1000);
};
var msgIsSend = false;
function sendMsg(s) {
	if (msgIsSend) {
		return;
	}
	var chatSendText= document.getElementsByClassName("ChatSend-txt");
	if (chatSendText.length>0) {
		setTimeout(function () {
			document.getElementsByClassName('ChatSend-txt')[0].value =s;
			document.getElementsByClassName('ChatSend-button')[0].click();
			
		}, 2000)
		msgIsSend = true;
	}
	
};