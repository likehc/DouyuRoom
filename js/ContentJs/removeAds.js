var removeAdsIndex =0;
var roomId=0;
var roomInfo="";
function removeAds() {
	var removeAdsTimer=self.setInterval(function(){
		if (removeAdsIndex>=10) {
			window.clearInterval(removeAdsTimer);
			return;
		}
		youhua();
		delayInset();
		removeMayBtnAd();
		clearMediaBottom();	//清除视频下方 保留 竞猜
		$("#foodBoom").remove();
		$("#left").remove();	//左边侧栏
		$("#t-adv-container").remove();	//视频内 广告
		$(".recommendApp-cbeff7").remove();	//下载斗鱼APP
		//$("#js-live-room-normal-equal-left").remove();	//视频下方广告
		$(".yuba-group-active").remove();	//悬浮主播头像，小组动态
		$(".recording-wrap").remove();	//TA的视频
		$(".sq-wrap").remove();	//分享按钮
		$(".column.rec").remove();	//主播也爱看
		$(".ft-sign-cont").remove();	//任务区,网页游戏推广
		$(".bg-1a1f33").remove();	//亲密互动
		$(".focus_box_con-0797e0").remove();	//视频里右下角“关注”按钮
		$("div[data-component-id='view'][data-component-key='2']").remove(); //头部大幅广告
		$(".live-room.clearfix").css("padding-top","0px");	//头部大幅广告
		$(".QRcode").remove();	//视频内，二维码 游戏推广
		$("#js-chat-notice").remove();	//弹幕公告
		$(".chat-ad").remove();	// 关闭弹幕区内广告		
		$(".adsRoot_7c5z4").remove();	//视频框内广告
		$(".valentine1807").remove();	//删除七夕广告
		$("#canyonRace").remove();	//暑期峡谷福利战
		$(".noble-barrage-suspend ul").remove();	//删除贵族悬浮弹幕
		$(".big-gift-banner").remove();	//礼物特效
		$("#dialog-more-video").remove();	//直播结束，自动跳转
		$(".normalBg-dc300b").remove(); //亲密互动
		$(".starsgathered").remove();	//排名动态


		$(".showdanmu-f76338").click();	//关闭弹幕
		removeAdsIndex++;
	},1000);
};

//进行一些页面排版修改
function youhua() {
	setFont();
	$("#header").hide();	//隐藏头部
	
	$(".headline h2").attr("title",$(".headline h2").text());	//房间标题
	$("#header").css("border-bottom-width","0px");
	$("#mainbody").css("margin-top","0px");	//"50px"
	$("#mainbody").css("padding-top","0px");	//"20px"
	// 视频	区域
	$("#anchor-info").css("border-top-width","0px");	//"1px"
	$("#anchor-info").css("border-left-width","0px");	//"1px"
	$("#anchor-info").css("border-right-width","0px");	//"1px"
	$("#anchor-info").css("border-bottom-width","0px");	//"1px"
	$("#anchor-info").css("margin-bottom","2px");	//"10px"
	//任务 、背包
	$("#js-stats-and-actions").css("padding-top","4px");	//"14px"
	$("#js-stats-and-actions").css("padding-bottom","2px");	//"7px"
	$("#js-live-room-normal-equal-right").css("margin-top","0px");	//"24px"

	$(".live-room-normal-left").css("padding-top","1px");
};

function delayInset() {
	//添加 排行on/off 按钮
	var fansRank = document.getElementsByClassName("fansRankClass");
	if(fansRank.length <=0){
		var span =document.createElement("span");
		span.innerHTML = "排行↑↑";
		var ii =document.createElement("i");
		ii.setAttribute("class","icon");
		var a =document.createElement("a");
		a.setAttribute("href","javascript:;");
		a.setAttribute("id","fansRankId");
		a.setAttribute("class","fansRankClass");
		a.appendChild(ii);
		a.appendChild(span);
		if (document.getElementsByClassName("chat-cls") !=null) {
			document.getElementsByClassName("chat-cls")[0].appendChild(a);
			document.getElementById("fansRankId").onclick = function(){
				var fansRan =$("#fansRankId span");
				if (fansRan.text() == "排行↓↓") {
					fansRan.text("排行↑↑");
					$("#js-fans-rank").show();	//粉丝贡献榜
					$("#js-chat-cont").css("top","217px");	//"217px"
				}else{
					fansRan.text("排行↓↓");
					$("#js-fans-rank").hide();	//粉丝贡献榜
					$("#js-chat-cont").css("top","2px");	//升高弹幕区 //"217px"
				}
			};
		}		
	}
	//添加 隐藏\显示头部信息 按钮
	var headInfoClass = document.getElementsByClassName("headInfoClass");
	if(headInfoClass.length <=0){
		var a =document.createElement("a");
		a.innerHTML = "隐藏头部信息";
		a.setAttribute("href","javascript:;");
		a.setAttribute("id","headInfoId");
		a.setAttribute("class","headInfoClass");
		if (document.getElementsByClassName("r-else clearfix") != null) {
			document.getElementsByClassName("r-else clearfix")[0].appendChild(a);
			document.getElementById("headInfoId").onclick = function(){
				setFont();
				var headInfo =$("#headInfoId");
				if (headInfo.text() == "显示头部信息") {
					headInfo.text("隐藏头部信息");
					$("#header").hide();	//隐藏头部
				}else{
					headInfo.text("显示头部信息");
					$("#header").show();	//隐藏头部
				}
			};
		}		
	}
	//添加 on\of  显示\隐藏直播公告 按钮
	var roomAnnounceClass = document.getElementsByClassName("roomAnnounceClass");
	if(roomAnnounceClass.length <=0){
		var a =document.createElement("a");
		a.innerHTML = "on";
		if ($(".column-cotent").text() =="") {
			$(".live-room-normal-right.fl").hide();	//直播公告
			$("#js-live-room-normal-equal-left").hide();//竞猜
			a.innerHTML = "off";
		}
		a.setAttribute("style","font-weight:bold");
		a.setAttribute("href","javascript:;");
		a.setAttribute("id","roomAnnounceId");
		a.setAttribute("class","roomAnnounceClass");
		if (document.getElementById("js-shie-gift") != null) {
			document.getElementById("js-shie-gift").appendChild(a);
			document.getElementById("roomAnnounceId").onclick = function(){
				var roomAnnounce =$("#roomAnnounceId");
				if (roomAnnounce.text() == "on") {
					roomAnnounce.text("off");
					$(".live-room-normal-right.fl").hide();
					$("#js-live-room-normal-equal-left").hide();	//竞猜
				}else{
					roomAnnounce.text("on");
					$(".live-room-normal-right.fl").show();
					$("#js-live-room-normal-equal-left").show();
				}
			};
		}		
	}
};
// 斗鱼的其他js，触发一些事件会修改回原来的字体样式,所以放在了点击状况信息时，修改一次字体
function setFont() {
	$(".cs-textarea").css("color","black");	//颜色为黑
	$(".cs-textarea").css("font-size","14px"); //文字输入区  字体
	$(".cs-textarea").css("font-weight","bold");//文字输入区  字体加粗
}
function getRoomInfo() {
	if (roomInfo =="") {
		roomInfo = roomObj.getRoomInfoById(roomId);
	}
	if (roomInfo !="") {
		$(".text").css("font-size","22px");
		$(".text").css("font-weight","bold");

		if (roomInfo.data.room_status ==2) {	//1.开播 2.关播
			$(".text").text("尚未开播");
		}else{
			var t = RoomObj.getEquationOfTime(roomInfo.data.start_time);
			$(".text").text(t);
			$(".anchor-pic.fl").attr("title","开播时间:"+ roomInfo.data.start_time);
		}
	}
};
//观看时长领礼包的广告
function removeMayBtnAd() {
	try{
		document.getElementsByClassName("may-btn")[0].onclick = function(){
			setTimeout(function(){
				try{
					document.getElementsByClassName("v3-sign")[0].remove();
				}catch(err){
				}
			},200);	
		};		
	}catch(err){		
	}
};

$(document).ready(function(){
	roomId = roomObj.getRoomId();
	if (roomId ==0) {return}
	removeAds();
	// 鼠标进入主播头像区域事件
	$(".anchor-pic.fl").mouseenter(function(){
		getRoomInfo();
	});
});

//清除视频下方 保留 竞猜
function clearMediaBottom(){
	var roomLeft = $("#js-live-room-normal-equal-left").children('div');
	if (roomLeft.length>0) {
		for (var i = 0; i < roomLeft.length; i++) {
			if (roomLeft[i].getAttribute("id") != "js-room-guess-panel") {
				roomLeft[i].remove();
			}
		}
	}
};