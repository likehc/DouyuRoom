var dir = "https://www.douyu.com/gapi/rkc/directory/";
var tableDataArr=[];	//最终数据
var roomIdNum=0;	//一共要查多少个房间
var betardArr=[];	//betard为返回值 数组
var roomIdArr=[];	//roomId数组
var app = new Vue({
	el: '#app',
	data:{
		input: 'https://www.douyu.com/g_yz',
		fixData:"修改漏查数据",
		receiveCount:betardArr.length,
		jifenValue:12,
		tableData:tableDataArr,
		options: [{value: '1',label: '1'},{value: '2',label: '2'},{value: '3',label: '3'},{	value: '4',	label: '4'},
			{value: '5',label: '5'},{value: '6',label: '6'},{value: '7',label: '7'},{value: '8',label: '8'},
			{value: '9',label: '9'},{value: '10',label: '10'},{value: '11',label: '11'},{value: '12',label: '12'},],
		value: ''
	},
	methods:{
		onClick: function () {
			roomIdNum=0;
			betardArr=[];					
			roomIdArr=[];
			app.tableData=[];

			var sourceUrl=app.input;
			var html = getHtmlByUrl(sourceUrl);
			var typeId = getTpyeByHtml(html);
			var pageNumStr =getPageNumByHtml(html);
			var pageNum =parseInt(pageNumStr);
			for (var a = 0; a < pageNum; a++) {
			// for (var a = 0; a < 1; a++) {
				try{
					var urlTemp = dir+typeId+"/"+parseInt(a+1);
					var objTemp = getHtmlByUrl(urlTemp);
					for (var b = 0; b < objTemp.data.rl.length; b++) {
						roomIdArr.push(objTemp.data.rl[b].rid);
					}
					roomIdNum =roomIdNum+objTemp.data.rl.length ;
				}catch(err){
					app.$message('获取数据错误');
					return;
				}
			}

			var setDataTimer =self.setInterval(function () {
			if (roomIdArr.length ==betardArr.length && betardArr.length !=0) {
				app.tableData=betardArr;
				// log(betardArr);
				window.clearInterval(setDataTimer);
				alert('查询成功！');
			}
		}, 5000);			
			getBetard(roomIdArr);
		},
		onFixData:function () {
			// roomIdNum=0;
			// betardArr=[];
			// alert("些功能正在完善");
			app.fixData="正在修复中...";
			fixData();
			setTimeout(function () {
				app.fixData="修改漏查数据";
			}, 1500)
		},
		onClickSave(){
			var jiFen =12;
			try{
				jiFen =parseInt(app.value);
				if (isNaN(jiFen)) {
					alert("请选择筛选积分");
					return;
				}
				saveData(jiFen);

			}catch(err){
				alert("请选择筛选积分");
			}
		},
	},
});

function getHtmlByUrl(_url) {
	var r="";
	$.ajax({url:_url ,async: false,success:function(result){
		r =result;
	}});
	return r;
};

function getPageNumByHtml(_html) {
	return _html.substr(_html.indexOf("$PAGE.pager = {"),65).split('"')[1];	
};
function getTpyeByHtml(_html) {
	return _html.substr(_html.indexOf("$PAGE.rk"),40).split('"')[1];
};
function log(s) {
	console.log(s);	
};
function getBetard(_roomIdArr) {
	var result=[];
	for (var c = 0; c < _roomIdArr.length; c++) {
		var t= getInfoByRoomId(_roomIdArr[c],true);
		if (t!="") {
			result.push(t);
		}
	}
	return result;
};
function getInfoByRoomId(roomId,async) {
	var r= new Object();
	var tempAsync=async||false;
	$.ajax({url:"https://www.douyu.com/betard/" +roomId ,async:tempAsync,success:function(result){
		if (result.hasOwnProperty("room")) {
			r.room_id = result.room.room_id;
			r.credit = JSON.parse(result.can_send_gift)["credit"];
			r.owner_name =result.room.owner_name;
			r.room_name =result.room.room_name;
			betardArr.push(r);
			app.receiveCount=betardArr.length +"/" + roomIdArr.length;;
		}else{
			try{
				// if (result.indexOf(`{"room_gg":{"s`)>=0) {
					result=JSON.parse(result);
					r.room_id = result.room.room_id;
					r.credit = JSON.parse(result.can_send_gift)["credit"];
					r.owner_name =result.room.owner_name;
					r.room_name =result.room.room_name;
					betardArr.push(r);
					app.receiveCount=betardArr.length+"/" + roomIdArr.length;;
				// }
			}catch(err){
				console.log(err);
			}
		}
	}});
	return r;
};

function saveData(_jiFen) {	
	var result="";
	var title= "记录时间"+"		"+"房间ID"+"		"+"积分"+"	"+"主播名称"+"			"+"房间名称"+"\r\n";
	for (var e = 0; e < betardArr.length; e++) {
		if (betardArr[e].credit<=_jiFen) {
			var msg= getTime()+"	";
			msg=msg+ betardArr[e].room_id+"		";
			msg=msg+ betardArr[e].credit+"	";
			msg=msg+ betardArr[e].owner_name.replace(/\r/g,"").replace(/\n/g,"")+"			";
			msg=msg+ betardArr[e].room_name.replace(/\r/g,"").replace(/\n/g,"")+"\r\n";
			result=result+msg;
		}
	}
	var content =title+result;   
	var blob = new Blob([content], {type: "text/plain;charset=utf-8"});
	saveAs(blob, "Credit.txt");
};
function getTime() {
	var date = new Date();
	var y = date.getFullYear();  
	var m = date.getMonth() + 1;  
	m = m < 10 ? ('0' + m) : m;  
	var d = date.getDate();  
	d = d < 10 ? ('0' + d) : d;  
	var h = date.getHours();
	h = h < 10 ? ('0' + h) : h;
	var minute = date.getMinutes();
	var second = date.getSeconds();
	minute = minute < 10 ? ('0' + minute) : minute;  
	second = second < 10 ? ('0' + second) : second; 
	return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;  
};

function fixData() {
	var errIdArr=[];
	for (var f = 0; f < roomIdArr.length; f++) {
		var hasId = hasRoomId(roomIdArr[f]);
		if (!hasId) {
			getInfoByRoomId(roomIdArr[f],true);
			// errIdArr.push(roomIdArr[f]);

		}
	}
};

function hasRoomId(_id) {
	var result =false;
	for (var k = 0; k < betardArr.length; k++) {
		if (betardArr[k].room_id == _id) {
			result =true;
			break;
		}
	}
	return result;
}
/*var setDataTimer =self.setInterval(function () {
	if (roomIdArr.length ==betardArr.length && betardArr.length !=0) {
		app.tableData=betardArr;
		// log(betardArr);		
		window.clearInterval(setDataTimer);
		alert('查询成功！');
	}
}, 5000);*/

