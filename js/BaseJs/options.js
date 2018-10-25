var bg = chrome.extension.getBackgroundPage();

function inputData(str) {
	try{
		
		dataArr = str.split("\r\n");
		for (var i = 0; i < dataArr.length; i++) {
			strArr = dataArr[i].split("#yhc#");
			if (strArr.length==2) {
				bg.setLocalStorage(strArr[0],strArr[1]);
			}			
		}		
	}catch(err){
	}	
};

document.getElementById("input").addEventListener("change", function(e){
	var file=e.target.files[0];
	var reader = new FileReader();
	reader.onload = function(e){
		// console.log(e.target.result);
		inputData(e.target.result);
	};
	reader.readAsText(file);
});
document.getElementById("output").onclick = function(){
	var content ="";
	for (var i = 0; i < localStorage.length; i++) {
		content = content +localStorage.key(i) + "#yhc#" + localStorage.getItem(localStorage.key(i));
		if (i<localStorage.length-1) {
			content = content + "\r\n";
		}		
	}
	var blob = new Blob([content], {type: "text/plain;charset=utf-8"});
	saveAs(blob, "config.txt");
};

document.getElementById("treasurebtn").onclick = function(){
	var msg=$("#treasuretext").val();
	bg.setLocalStorage("treasureMsg",msg);
};
var treasureMsg = bg.getTreasureMsg();
if (treasureMsg != undefined) {
	$("#treasuretext").val(treasureMsg);
}

//数据库类型
var insertType;
function insertTypeClick() {
	if (insertType !=null &&insertType !=undefined && insertType.constructor == NodeList) {
		for (var i = 0; i < insertType.length; i++) {
			if (insertType[i].checked == true) {
				localStorage.insertType =insertType[i].value;
				alert('保存成功!');
			}
		}
	};
};

//是否提示抢到的宝箱内容
var showMsg;
function showMsgClick() {
	if (showMsg !=null &&showMsg !=undefined && showMsg.constructor == NodeList) {
		for (var i = 0; i < showMsg.length; i++) {
			if (showMsg[i].checked == true) {
				localStorage.showMsg =showMsg[i].value;
				alert('保存成功!');
			}
		}
	};
};
//开启抢宝箱模式 
var robTreasure;
function robTreasureClick() {
	if (robTreasure !=null &&robTreasure !=undefined && robTreasure.constructor == NodeList) {
		for (var i = 0; i < robTreasure.length; i++) {
			if (robTreasure[i].checked == true) {
				localStorage.robTreasure =robTreasure[i].value;
				alert('保存成功!');
			}
		}
	};
};

$(document).ready(function(){
	insertType = document.getElementsByName('insertType');
	document.getElementById('insertTypeClick').onclick = insertTypeClick;
	//初始化 Radio 的选中值
	var getTrueRadio =localStorage.insertType;
	if (getTrueRadio != null && getTrueRadio != undefined) {
		insertType[getTrueRadio].checked = true;
	};

	showMsg = document.getElementsByName('showMsg');
	document.getElementById('showMsgClick').onclick = showMsgClick;
	var showMsgVaule =localStorage.showMsg;
	if (showMsgVaule != null && showMsgVaule != undefined) {
		showMsg[showMsgVaule].checked = true;
	};

	robTreasure = document.getElementsByName('robTreasure');
	document.getElementById('robTreasureClick').onclick = robTreasureClick;
	var robTreasureVaule =localStorage.robTreasure;
	if (robTreasureVaule != null && robTreasureVaule != undefined) {
		robTreasure[robTreasureVaule].checked = true;
	};
});