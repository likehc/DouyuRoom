function RoomObj() {
};
var roomObj = new RoomObj();
//获取房间id
RoomObj.prototype.getRoomId=function () {
		var roomUrl = $("link[rel='canonical']")[0].href;
		var roomUrlArr = roomUrl.split("/");
		return roomUrlArr[3];
	};
//点击"未佩戴"
RoomObj.prototype.removePaiZi=function () {
	if ($(".radiobox").length<=0 ) {
		var label =document.createElement("label");
		label.setAttribute("class","radiobox");
		var fansHasDiv =document.createElement("div");
		fansHasDiv.setAttribute("class","fans-has-badge nowear-badge");
		fansHasDiv.setAttribute("data-tag","fans-medal-item");
		fansHasDiv.setAttribute("data-flag","medal-take-off");
		fansHasDiv.appendChild(label);
		var entranceDiv =document.createElement("div");
		entranceDiv.setAttribute("class","entrance-select");
		entranceDiv.setAttribute("data-flag","medal-list-warp");
		entranceDiv.appendChild(fansHasDiv);
		var contentDiv =document.createElement("div");
		contentDiv.setAttribute("id","tempRemovePaizi");
		contentDiv.setAttribute("class","entrance-content fans-badge-second");
		contentDiv.setAttribute("style","display: none;");
		contentDiv.setAttribute("data-flag","medal-info-warp");
		contentDiv.appendChild(entranceDiv);
		document.getElementsByClassName("fans-entrance")[0].appendChild(contentDiv);  
	}
	document.getElementsByClassName("radiobox")[document.getElementsByClassName("radiobox").length-1].click();
	document.getElementById("tempRemovePaizi").remove();	
};

//点击相应的牌子
RoomObj.prototype.addPaiZi=function (roomId) {
		var a =document.createElement("a");
		a.setAttribute("href","javascript:;");
		a.setAttribute("data-flag","medal-get-use");
		a.setAttribute("data-medal-rid",roomId);
		a.setAttribute("class","adornbtn");
		var p =document.createElement("p");
		p.appendChild(a);
		var tipswrapDiv =document.createElement("div");
		tipswrapDiv.setAttribute("id","tempAddPaizi");
		tipswrapDiv.setAttribute("class","entrance-tipswrap");
		tipswrapDiv.setAttribute("data-action","medal-tip-warp");
		tipswrapDiv.setAttribute("data-tip-type","ownerRoomMedalRemain");
		tipswrapDiv.setAttribute("style","display: block;");
		tipswrapDiv.appendChild(p);
		document.getElementsByClassName("fans-entrance")[0].appendChild(tipswrapDiv);
		document.getElementsByClassName("adornbtn")[0].click();
		document.getElementById("tempAddPaizi").remove();
};
//设置弹幕颜色
RoomObj.prototype.setDanMuYanSe=function () {
	var danmuYs = $(".fans-barrage-list.clearfix li");
	for (var i = danmuYs.length - 1; i >= 0; i--) {
		var liClass = danmuYs[i].getAttribute("class");
		if (liClass == null||liClass.indexOf("fans-barrage-lock") ==-1) {
			var divClass = danmuYs[i].childNodes[0].getAttribute("class");
			document.getElementsByClassName(divClass)[0].click();
			break;
		}	
	}
};