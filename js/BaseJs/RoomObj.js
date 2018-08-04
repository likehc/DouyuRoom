function RoomObj() {
	//获取房间信息
	this.getRoomInfoById = function (roomId) {
		var r="";
		$.ajax({url:"https://bird.ioliu.cn/v1?url=http://open.douyucdn.cn/api/RoomApi/room/" +roomId ,async: false,success:function(result){
			r =result;
		}});
		return r;
	};
	//获取房间id
	this.getRoomId = function () {
		try{
			var roomUrl = $("link[rel='canonical']")[0].href;
			var roomUrlArr = roomUrl.split("/");
			return roomUrlArr[3];
		}catch(err){
			return "";
		}		
	};
	//点击"未佩戴"
	this.removePaiZi=function () {
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
	this.addPaiZi=function (roomId) {
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
	this.setDanMuYanSe=function () {
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
};
var roomObj = new RoomObj();

/*通用方法
* t 为开始时间，格式xx-xx-xx xx:xx:xx
*/
RoomObj.getEquationOfTime = function (t) {
	var date1=new Date(t);	//开始时间 
	var date2=new Date();	//结束时间
	var date3=date2.getTime()-date1.getTime();	//时间差的毫秒数
	var days=Math.floor(date3/(24*3600*1000));
	var leave1=date3%(24*3600*1000);	//计算天数后剩余的毫秒数
	var hours=Math.floor(leave1/(3600*1000));
	hours = (days*24)+hours >10 ? hours:"0"+hours;	//计算相差分钟数
	var leave2=leave1%(3600*1000);	//计算小时数后剩余的毫秒数
	var minutes=Math.floor(leave2/(60*1000));
	minutes = minutes>10 ? minutes:"0"+minutes;	//计算相差秒数
	var leave3=leave2%(60*1000);	//计算分钟数后剩余的毫秒数
	var seconds=Math.round(leave3/1000);
	seconds = seconds>10 ? seconds:"0"+seconds;
	return hours+":"+minutes+":"+seconds;
}

/*
* 	发送弹幕
*/
RoomObj.sendMsg = function (s) {
	document.getElementsByClassName('cs-textarea')[0].value = s;
	document.getElementsByClassName('b-btn')[0].click();
}