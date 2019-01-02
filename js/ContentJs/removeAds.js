var removeAdsIndex =0;
var roomId=0;
var roomInfo="";
var roomBetard="";
function removeAds() {
	var removeAdsTimer=self.setInterval(function(){		
		if (removeAdsIndex>=10) {
			window.clearInterval(removeAdsTimer);
			return;
		}
		removeAdsIndex++;
		titleAnchorPicMouseenter();
		youhua();
		delayInset();
		removeMayBtnAd();	//on\off
		clearMediaBottom();	//清除视频下方 保留 竞猜
		if($(".left-menu-small").length <=0){	//缩小左侧框
			$(".AsideToggleButton").click();
		}
		if ($(".left-menu-small").length>0) {
			$(".layout-Aside").remove();	//移除左侧框
		}
		$(".YubaGroup-active").remove();	//移除悬浮鱼吧
		$(".SignBarrage").remove();		//弹幕区悬浮广告
		$(".QRcode").remove();//视频内二维码游戏推广
		$(".normalBg-a5403d").remove(); // 视频内亲密互动
		// $(".Title-roomOtherBottom").remove(); 	//分享，客户端，下载游戏
		$(".Title-roomOtherBottom .Title-blockInline").remove(); //分享，客户端，下载游戏
		$(".PlayerToolbar-signCont").remove(); //背包左边循环浮动广告
		$(".recommendApp-0e23eb").remove();		//下载斗鱼APP
		$(".ToolbarActivityArea").remove();		//打页游戏,领鱼丸
		$(".bg-d4758b").remove();		//亲密互动
		$(".focus_box_con-7adc83").remove();	//小桃心关注
		$("#js-room-activity").remove();	//弹幕右侧悬浮广告
		$(".yuba-group-active").remove();	//定制房间鱼吧
		
	},800);
};

var isPause =false;
//进行一些页面排版修改
function youhua() {
	setFont();
	$("#js-header").hide();	//隐藏头部
	$(".Title-headlineH2").attr("title",$(".Title-headlineH2").text());//房间标题
	$(".layout-Container--hasAside").css("padding-top","0px");	//51px
	$(".layout-Main").css("padding-top","0px");	//20px
	$("#js-player-title").css("margin-bottom","1px");	
	$(".PlayerToolbar").css("padding-top","1px");
	//html5
	if (!isPause) {
		if ($(".pause-c594e8").length>0) {
			$(".pause-c594e8").click();		//暂停
			$(".pause-81a5c3").click();		//暂停
			$(".pause-81a5c3").click();
			$(".showdanmu-42b0ac").click();		 //弹幕关
			$(".showdanmu-f76338").click();		//弹幕关
			$(".showdanmu-f76338").click();
			isPause = true;
		}
	}
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
		a.setAttribute("style",`display: inline-block;
    vertical-align: top;
    margin: 0 2px;
    padding: 0 8px;
    height: 22px;
    line-height: 21px;
    background-color: #fff;
    border: 1px solid #e5e4e4;
    border-radius: 0 0 4px 4px;
    cursor: pointer;
    outline: 0;
    font-family: inherit;
    color: #333;
    text-decoration: none;
    border:1px solid #3573A1`);
		a.appendChild(ii);
		a.appendChild(span);
		if (document.getElementsByClassName("Barrage-toolbar").length >0) {
			document.getElementsByClassName("Barrage-toolbar")[0].appendChild(a);
			document.getElementById("fansRankId").onclick = function(){
				var fansRan =$("#fansRankId span");
				if (fansRan.text() == "排行↓↓") {
					fansRan.text("排行↑↑");
					$(".layout-Player-rank").show()//粉丝贡献榜
					$("#js-player-barrage").css("top","217px");	//升高弹幕区 //"217px"
				}else{
					fansRan.text("排行↓↓");					
					$(".layout-Player-rank").hide()//粉丝贡献榜
					$("#js-player-barrage").css("top","-3px");	//"217px"
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
		if (document.getElementsByClassName("Title-roomOtherBottom").length >0) {
			document.getElementsByClassName("Title-roomOtherBottom")[0].appendChild(a);
			document.getElementById("headInfoId").onclick = function(){
				setFont();
				var headInfo =$("#headInfoId");
				if (headInfo.text() == "显示头部信息") {
					headInfo.text("隐藏头部信息");
					$("#js-header").hide();	//隐藏头部
				}else{
					headInfo.text("显示头部信息");
					$("#js-header").show();	//隐藏头部
				}
			};
		}		
	}
	//添加 on\of  显示\隐藏直播公告 按钮
	var roomAnnounceClass = document.getElementsByClassName("roomAnnounceClass");
	if(roomAnnounceClass.length <=0){
		var a =document.createElement("a");
		a.innerHTML = "on";
		if ($(".AnchorLike-ItemContent").text() =="") {
			$("#js-bottom").hide();
			$("#js-player-guessgame").hide(); 
			a.innerHTML = "off";
		}
		a.setAttribute("style","font-weight:bold");
		a.setAttribute("href","javascript:;");
		a.setAttribute("id","roomAnnounceId");
		a.setAttribute("class","roomAnnounceClass");
		if (document.getElementsByClassName("ChatToolBar").length >0) {
			document.getElementsByClassName("ChatToolBar")[0].appendChild(a);
			document.getElementById("roomAnnounceId").onclick = function(){
				var roomAnnounce =$("#roomAnnounceId");
				if (roomAnnounce.text() == "on") {
					roomAnnounce.text("off");
					$("#js-bottom").hide(); 					
					$("#js-player-guessgame").hide(); 
				}else{
					roomAnnounce.text("on");
					$("#js-bottom").show(); 
					$("#js-player-guessgame").show(); 
				}
			};
		}		
	}
};
// 斗鱼的其他js，触发一些事件会修改回原来的字体样式,所以放在了点击状况信息时，修改一次字体
function setFont() {
	$(".ChatSend-txt").css("color","black");	//颜色为黑
	$(".ChatSend-txt").css("font-size","14px"); //文字输入区  字体
	$(".ChatSend-txt").css("font-weight","bold");//文字输入区  字体加粗
};
function getRoomInfo() {
	if (roomInfo =="") {
		roomInfo = roomObj.getRoomInfoById(roomId);
	}
	if (roomInfo !="") {
		$(".YubaGroup-text").css("font-size","18px");
		$(".YubaGroup-text").css("font-weight","bold");	

		if (roomInfo.data.room_status ==2) {	//1.开播 2.关播
			$(".YubaGroup-text").text("尚未开播");
			$(".text").text("尚未开播");
		}else{
			var t = RoomObj.getEquationOfTime(roomInfo.data.start_time);
			$(".YubaGroup-text").text(t);
			$(".text").text(t);
			$(".Title-anchorPic").attr("title","开播时间:"+ roomInfo.data.start_time);
			$(".anchor-pic.fl").attr("title","开播时间:"+ roomInfo.data.start_time);
		}
	}
	if (roomBetard =="") {
		roomBetard = roomObj.getBetardById(roomId);
	}
	if (roomBetard !="") {
		try{
			var anchorPic = document.getElementsByClassName("Title-anchorPic");
			var creditDivFind = document.getElementsByClassName("creditDiv");
			if(anchorPic.length >0 && creditDivFind.length <=0){
				var creditDiv =document.createElement("div");
				anchorPic[0].appendChild(creditDiv);
				creditDiv.outerHTML =`<div class="creditDiv" style="font-size:24px; font-weight:bold; color:red;"></div>`;
				var jiFen =JSON.parse(roomBetard.can_send_gift)["credit"];
				document.getElementsByClassName("creditDiv")[0].innerText= "积分："+ jiFen;
			}
			var anchorPicFl = document.getElementsByClassName("anchor-pic fl");			
			if(anchorPicFl.length >0 && creditDivFind.length <=0){
				var creditDiv =document.createElement("div");
				anchorPicFl[0].appendChild(creditDiv);
				creditDiv.outerHTML =`<div class="creditDiv" style="position: absolute;font-size:24px;font-weight:bold;color:red;z-index: 9999;width: 110px;"></div>`;
				var jiFen =JSON.parse(roomBetard.can_send_gift)["credit"];
				document.getElementsByClassName("creditDiv")[0].innerText= "积分："+ jiFen;
			}else{
				var creditDiv= $(".creditDiv");
				if (creditDiv.textContent=="") {
					creditDiv.textContent=JSON.parse(roomBetard.can_send_gift)["credit"];
				}
			}
		}catch(err){
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

//清除视频下方 保留 竞猜
function clearMediaBottom(){
	$(".LazyLoad.is-visible").remove();		//鱼吧讨论相关推荐
	$(".AnchorLike--AlsoLike").parent().parent().remove(); //主播也爱看
	$(".Bottom-ad").remove();	//竞猜下面的广告
	
	
};



function titleAnchorPicMouseenter() {
	//普通房间
	var anchorPic = $(".Title-anchorPic");
	if (anchorPic.length>0 && roomInfo =="") {
		$(".YubaGroup-cover").mouseenter(function(){
			getRoomInfo();
		});
		$(".YubaGroup-cover").mouseleave(function(){
			$(".creditDiv").remove();
		});
		
	}
	//定制房间
	var anchorPic = $(".anchor-pic.fl");
	if (anchorPic.length>0 && roomInfo =="") {
		$(".anchor-pic.fl").mouseenter(function(){
			getRoomInfo();
		});
		
		$(".anchor-pic.fl").mouseleave(function(){
			$(".creditDiv").remove();
		});
	}

	
};

YubaGroupTimerIndex =0;
var removeAdsTimer = self.setInterval(function (argument) {
	YubaGroupTimerIndex++
	if (YubaGroupTimerIndex >=15) {
		window.clearInterval(removeAdsTimer);
		return;
	}
	roomId = roomObj.getRoomId();
	if (roomId ==0) {
		return;
	}	
	removeAds();

}, 1000);


// $(document).ready(function(){
// 	roomId = roomObj.getRoomId();
// 	if (roomId ==0) {return}
// 	removeAds();	
// });