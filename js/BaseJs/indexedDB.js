//初始化 数据库
var request;
var db;
function initDB(_name,_version){
	try {
		if (!window.indexedDB) {
			console.log("browser doesn't support indexedDB");
		} else {
			var name = _name || 'test';
			var version = _version || 2;
			
			request = window.indexedDB.open(_name,_version);
			request.onerror = function (event) {
				console.log('数据库打开报错');
			};
			request.onsuccess = function (event) {
				db = request.result;
				console.log('数据库打开成功');
			};
			//增加数据库版本号时,会触发onupgradeneeded事件(会在onsuccess之前被调用)
			request.onupgradeneeded = function (event) {
				db = event.target.result;
			};
		}
	} catch(e) {
		console.log(e.message);
	}
};

initDB("DouyuRoom",2);
request.onupgradeneeded = function(event) {
	db = event.currentTarget.result;
	var objectStore =  db.createObjectStore('t_treasure',{keyPath: 'id',autoIncrement: true });
};
function TreasureBox() {
	this.code = 0;
	this.validate = 0;
	this.msg="";
	this.award_type=0;
	this.src_nick="";
	this.silver=0;
	this.silver_balance=0;
	this.prop_name="";
	this.prop_count=0;
	this.prop_id=0;
	this.gt=0;
	this.lk=0;
	this.lt=0;
	this.time="2018-09-01 05:23:20";
	this.roomId=0;
	this.uid=0;
};
function Treasure() {	
}
var treasure = new Treasure();
Treasure.add = function(_obj) {  
	var tx = db.transaction("t_treasure", 'readwrite');
	var store = tx.objectStore("t_treasure");
	var t = new TreasureBox();
	_obj.time= formatDateTime(new Date());
	console.log(_obj);
	store.add(_obj);
};
/*Treasure.find = function(_s,_e) {
	_s=_s +"00:00:00";
	_e=_e +"59:59:59";
	dataFromIndexDb=[];
	GetAll();
	var result=[];
	var arr=[];

	setTimeout(function () {
		arr = dataFromIndexDb;
		for (var i = 0; i < arr.length; i++) {		
		// s >= res and res<=e
		if (time1Lesstime2(_s,arr[i].time) &&time1Lesstime2(arr[i].time,_e)) {
			result.push(arr[i])
		}		
	}
	console.log(result);
	return result;
	},1000);
	
};*/
function time1Lesstime2(d1,d2)
{
	return d1.replace(/-/g,"").replace(/:/g,"").replace(/ /g,"")< d2.replace(/-/g,"").replace(/:/g,"").replace(/ /g,"");

};
var dataFromIndexDb;
Treasure.find = function(_s,_e){
	_s=_s +"00:00:00";
	_e=_e +"59:59:59";
	dataFromIndexDb=[];
	var objectStore = db.transaction('t_treasure').objectStore('t_treasure');
	objectStore.openCursor().onsuccess = function (event) {
		var cursor = event.target.result;		
		if (cursor) {
			if (time1Lesstime2(_s,cursor.value.time) &&time1Lesstime2(cursor.value.time,_e)){
				var t= {time:cursor.value.time,roomId: cursor.value.roomId,src_nick:cursor.value.src_nick,award_type:cursor.value.award_type,silver:cursor.value.silver,prop_count:cursor.value.prop_count};
				// console.log('time: ' + cursor.value.time);
				dataFromIndexDb.push(t);
				cursor.continue();
			}			
		} else {
			//console.log('没有数据了！');
		}		
	};
}

function formatDateTime(inputTime) {  
    var date = new Date(inputTime);
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

