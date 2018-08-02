var removeAdsIndex =0; 
function removeAds() {
	var removeAdsTimer=self.setInterval(function(){		
		if (removeAdsIndex>=10) {
			window.clearInterval(removeAdsTimer);
		}
		$("#left").remove();	//左边侧栏
		$(".recommendApp-cbeff7").remove();	//下载斗鱼APP
		$(".live-room-normal-left").remove();	//视频下方广告
		$(".yuba-group-active").remove();	//悬浮主播头像，小组动态
		$(".recording-wrap").remove();	//TA的视频
		$(".sq-wrap").remove();	//分享按钮
		$(".column.rec").remove();	//主播也爱看
		$(".ft-sign-cont").remove();	//任务区,网页游戏推广

		$(".showdanmu-f76338").click();	//关闭弹幕
		removeAdsIndex++;
	},1000);
};
//进行一些页面排版修改
function youhua() {
	$("#header").hide();	//隐藏头部
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
};

function delayInset() {
	//添加 排行on/off 按钮
	var span =document.createElement("span");
	span.innerHTML = "排行on";
	var ii =document.createElement("i");
	ii.setAttribute("class","icon");
	var a =document.createElement("a");
	a.setAttribute("href","javascript:;");
	a.setAttribute("id","fansRankId");
	a.appendChild(ii);
	a.appendChild(span);
	document.getElementsByClassName("chat-cls")[0].appendChild(a);
	document.getElementById("fansRankId").onclick = function(){
		var fansRan =$("#fansRankId span");
		if (fansRan.text() == "排行off") {
			fansRan.text("排行on");
			$("#js-fans-rank").show();	//粉丝贡献榜
			$("#js-chat-cont").css("top","217px");	//"217px"
		}else{
			fansRan.text("排行off");
			$("#js-fans-rank").hide();	//粉丝贡献榜
			$("#js-chat-cont").css("top","2px");	//"217px"
		}
	};

	//添加 隐藏\显示头部信息 按钮
	var a =document.createElement("a");
	a.innerHTML = "隐藏头部信息";
	a.setAttribute("href","javascript:;");
	a.setAttribute("id","headInfoId");
	document.getElementsByClassName("r-else clearfix")[0].appendChild(a);
	document.getElementById("headInfoId").onclick = function(){
		var headInfo =$("#headInfoId");
		if (headInfo.text() == "显示头部信息") {
			headInfo.text("隐藏头部信息");
			$("#header").hide();	//隐藏头部
		}else{
			headInfo.text("显示头部信息");
			$("#header").show();	//隐藏头部
		}
	};

	//添加 on\of  显示\隐藏直播公告 按钮
	var a =document.createElement("a");
	a.innerHTML = "on";
	if ($(".column-cotent").text() =="") {
		$(".live-room-normal-right.fl").hide();	//直播公告
		a.innerHTML = "off";
	}
	a.setAttribute("href","javascript:;");
	a.setAttribute("id","roomAnnounceId");
	document.getElementById("js-shie-gift").appendChild(a);
	document.getElementById("roomAnnounceId").onclick = function(){
		var roomAnnounce =$("#roomAnnounceId");
		if (roomAnnounce.text() == "on") {
			roomAnnounce.text("off");
			$(".live-room-normal-right.fl").hide();
		}else{
			roomAnnounce.text("on");
			$(".live-room-normal-right.fl").show();
		}
	};
};
$(document).ready(function(){
	if (roomObj.getRoomId() =="") {
		return;
	}
	removeAds();
	var youhuaTimer=setTimeout("youhua()",3000);
	var delayInsetTimer = setTimeout("delayInset()", 2500);
});