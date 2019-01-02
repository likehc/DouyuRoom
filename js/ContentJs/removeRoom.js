//从bg.js获取要过滤的房间数组
var roomObjArr = new Object;
if (roomObjArr.data == undefined) {	//从 localStorage.RoomArr 获取要过滤的房间
	RoomObj.getDataFormBackground({type:"function",functionName:"getRooms"},roomObjArr);
}
// 10秒过滤一次，因为无刷新更新页面，下次刷新会继续过滤
var crEditArr = [];
var removeRoomTimer=setInterval(function(){	
	crEditArr = [];
	if ($("#live-list-contentbox").length >0) {
		if ($(".w1366").length>0) {
			$(".left-btn")[0].click();
		}
		if ($(".left-menu-small").length>0) {
			$("#left").remove();	//左侧快栏
		}		
		var roomIdArr = $("#live-list-contentbox li a");
		for (var j = 0; j < roomIdArr.length; j++) {
			var dataRid =roomIdArr[j].getAttribute("data-rid");
			var RoomArr =roomObjArr.data;
			for (var k = 0; k < RoomArr.length; k++) {
				if (RoomArr[k].id == dataRid) {
					roomIdArr[j].parentElement.remove()
					break;
				}
			}
			if (dataRid != null&&dataRid != undefined&&dataRid != "") {
				crEditArr.push(dataRid);
			}
		}
	}else{
		window.clearInterval(removeRoomTimer);
		return;
	}
	if (crEditArr.length<=0) {
		window.clearInterval(removeRoomTimer);
		return;
	}
	// getCreditByRoomIdArr(crEditArr);
	// getAndInsetCresit();
	// insertSaveCreditDiv();
},3000);


var fangWen = true;
var crEditObjArr =[];
function getCreditByRoomIdArr(roomIdArr) {
	for (var c = 0; c < roomIdArr.length; c++) {
		 getBetard(roomIdArr[c],true);
	}
};

function getBetard(roomId,async) {
	var hasElement = false;
	var result;
	for (var i = 0; i < crEditObjArr.length; i++) {
		try{
			if (crEditObjArr[i].room.room_id == roomId) {
				result=crEditObjArr[i];
				hasElement = true;
				break;
			}			
		}catch(err){
			console.log(err);
		}		
	}
	if (hasElement) {
		return result;
	}
	var tempAsync=async||false;
	$.ajax({url:"https://www.douyu.com/betard/" +roomId ,async:tempAsync,success:function(result){
		if (result != undefined && result != "" &&result != null) {
			if (result.hasOwnProperty("room")) {
				crEditObjArr.push(result);
			}else{
				try{
					// if (result.indexOf(`{"room_gg":{"s`)>=0) {
						var resultTemp=JSON.parse(result);
						crEditObjArr.push(resultTemp);
						result =resultTemp;
					// }
				}catch(err){
					console.log(err);
				}
			}			
		}
	}});
	return result;
};

function getAndInsetCresit() {
	var imgboxArr =document.getElementsByClassName("imgbox");
	for (var d = 0; d < imgboxArr.length; d++) {
		var roomid = imgboxArr[d].parentElement.getAttribute("data-rid");
		var jiFen = getJiFen(roomid);
		insertCredit(imgboxArr[d],jiFen);
	}	
}


function getJiFen(roomId) {
	var result;
	for (var e = 0; e < crEditObjArr.length; e++) {
		if(crEditObjArr[e].room.room_id == roomId) {
			try{
				result= JSON.parse(crEditObjArr[e].can_send_gift)["credit"];				
			}catch(err){
				console.log(err);
			}			
			break;
		}
	}
	return result;
};

function insertCredit(imgbox ,jiFen) {
	if (jiFen ==undefined) {
		return;
	}
	var hasCreditYhc = imgbox.getElementsByClassName("creditYhc")
	if (hasCreditYhc.length<=0) {
		var creditYhcLi=document.createElement("li");
		imgbox.appendChild(creditYhcLi);
		var msg = "积分：" + jiFen;
		creditYhcLi.outerHTML=`<li class="creditYhc" style="background-color: #62b21b; background-color:rgba(98,178,27,0.5);position: absolute;top: 0px;padding: 2px 6px;color: #fff;font-size: 25px;z-index: 11;width: 120px;height: 36px;">`+msg+`</li>`;
	}
};


function insertSaveCreditDiv() {
	var listContent = document.getElementById("live-list-content");
	var saveCreditDiv= document.getElementById("saveCreditDiv");
	if (listContent !=null && saveCreditDiv ==null) {
		var div = document.createElement("div");
		listContent.parentElement.appendChild(div);
		div.outerHTML=`<div id="saveCreditDiv" style="position:fixed;right: 10px;top: 40%;width: auto;line-height: 25px;background: #31A43F;border: 1px solid #FFFFFF;z-index: 9999;">
		<input id="creditShaiXuan" type="text" name="jifen" style="width: 20px;" >
		<button id="saveCreditInfo">保存</button>
	</div>`;
		var creditShaiXuan = document.getElementById("creditShaiXuan");
		creditShaiXuan.oninput = function(){
			creditShaiXuan.value = creditShaiXuan.value.replace(/[^\d]/g,'');
		};
		document.getElementById("saveCreditInfo").onclick = function(){
			var jiFen = document.getElementById("creditShaiXuan").value.trim();
			var title= "记录时间"+"		"+"房间ID"+"		"+"积分"+"	"+"主播名称"+"			"+"房间名称"+"\r\n";
			var result = title+getInfoByJiFen(jiFen);
			exportRaw("Credit.txt",result);
		};
	}
};
function getInfoByJiFen(_jifen) {
	var result="";
	for (var f = 0; f < crEditObjArr.length; f++) {
		var crEditObj=crEditObjArr[f];
		var jifen =JSON.parse(crEditObj.can_send_gift)["credit"];
		if (jifen<=_jifen) {
			var time = RoomObj.getTime();
			var msg=time+"	";
			msg=msg+ crEditObj.room.room_id+"		";
			msg=msg+ jifen+"	";
			msg=msg+ crEditObj.room.owner_name.replace(/\r/g,"").replace(/\n/g,"")+"			";
			msg=msg+ crEditObj.room.room_name.replace(/\r/g,"").replace(/\n/g,"")+"\r\n";
			result=result+msg;
		}
	}
	return result;
};
function exportRaw(name, data) {
	var urlObject = window.URL || window.webkitURL || window;
	var export_blob = new Blob([data]);
	var save_link = document.createElementNS("http://www.w3.org/1999/xhtml", "a")
	save_link.href = urlObject.createObjectURL(export_blob);
	save_link.download = name;
	fakeClick(save_link);
};
function fakeClick(obj) { 
	var ev = document.createEvent("MouseEvents");
	ev.initMouseEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
	obj.dispatchEvent(ev);
};