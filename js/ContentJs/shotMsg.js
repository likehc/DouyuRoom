// var ExtensionUrl="chrome-extension://jbcfompgackcpnfcphdhpepcdnbbjfnh/";
var ExtensionUrl="chrome-extension://"+chrome.runtime.id+"/";
insertJsCss(ExtensionUrl+"css/shotmsg.css","css");
insertJsCss(ExtensionUrl+"node_modules/element-ui/lib/theme-chalk/index.css","css");
insertJsCss(ExtensionUrl+"node_modules/vue.js");
insertJsCss(ExtensionUrl+"node_modules/element-ui/lib/index.js");
// insertJs(ExtensionUrl+"js/QuoteJs/jquery.min.js",5000);

// inserjQuery(ExtensionUrl+"js/QuoteJs/jquery.min.js",5000);
insertJs(ExtensionUrl+"js/QuoteJs/jquery-ui.min.js",5500);
var shotMsgIndex =0;
var roomId=0;
function shotMsg_Start() {	
	var timershotMsg=self.setInterval(function(){
		if (document.getElementsByClassName("shotMsg").length>0) {
			window.clearInterval(timershotMsg);
			return;
		}
		roomId = roomObj.getRoomId();
		if (roomId ==0) {return}
		if (shotMsgIndex>=10) {
			window.clearInterval(timershotMsg);
			return;
		}
		createShotMsgDiv();
		shotMsgIndex++;
	},800);
};

function createShotMsgDiv() {
	var shotMsgId =document.getElementsByClassName("shotMsg");
	var shieGiftFr= document.getElementsByClassName("ChatToolBar");
	if (shotMsgId.length<=0  && shieGiftFr.length>0) {
		var shotDiv =document.createElement("div");
		shotDiv.setAttribute("class","shotMsg");
		shotDiv.setAttribute("id","shotMsg");
		shotDiv.setAttribute("style","overflow-y:auto;overflow-x:hidden;");
		shotDiv.setAttribute("icon","el-icon-edit");
		shotDiv.innerHTML = '<div class="el-icon-document"> 快捷短语 </div><div class="el-icon-edit" id="tagSave">修改</div>';
		var subDiv = document.createElement("div");
		subDiv.setAttribute("id","tags");
		subDiv.innerHTML ='<el-tag v-for="tag in tags" :key="tag.name" closable:true hit:true :type="tag.type" >{{tag.name}}</el-tag><br/>';
		shotDiv.appendChild(subDiv);
		var input = document.createElement("textarea");
		input.setAttribute("id","inputTag");
		input.setAttribute("cols","40");
		input.setAttribute("rows","2");
		input.setAttribute("placeholder","输入内容,回车添加。双击条目执行删除。拖拽调整位置。");
		shotDiv.appendChild(input);
		shieGiftFr[0].appendChild(shotDiv);
		var timeInd = null;
		$('.ChatSend-txt').click(function() {
			clearTimeout(timeInd);
			timeInd = setTimeout(function(){
					//do click function
				},150);
		});
		$('.ChatSend-txt').dblclick(function() {
			clearTimeout(timeInd);
			var div = $("#shotMsg");
			if (div.is(":hidden")) {
				div.show();
			} else {
				div.hide();
			}
		});
	}
};

function insertJsCss(filePath,isCss) {
	var hm;
	if (isCss!=undefined) {
		hm = document.createElement("link");
		hm.setAttribute('rel','stylesheet');
		hm.setAttribute('type','text/css');
		hm.href=filePath;

	}else{
		hm = document.createElement("script");
		hm.setAttribute("type","text/javascript");
		hm.src = filePath;
	}
	var s = document.getElementsByTagName("title")[0]; 
	s.parentNode.insertBefore(hm, s);	
};
function insertJs(filePath,time) {
	setTimeout(function() {
		var hm;
		hm = document.createElement("script");
		hm.setAttribute("type","text/javascript");
		hm.src = filePath;
		var s = document.getElementsByTagName("title")[0]; 
		s.parentNode.insertBefore(hm, s);
	}, time);
};
function inserjQuery(filePath,time) {
	setTimeout(function() {
		var hm;
		hm = document.createElement("script");
		hm.setAttribute("type","text/javascript");
		hm.src = filePath;
		var s = document.getElementsByTagName("title")[0]; 
		s.parentNode.insertBefore(hm, s);
		// setTimeout(function() {
		// 	jQuery.noConflict();
		// 	jQuery(document).ready(function ($){
		// 	});
		// },100);
	}, time);
};

//防止 vue.js没有加载完毕，
self.setTimeout(function() {
	roomId = roomObj.getRoomId();
	if (roomId ==0) {return}		
	// insertJsCss(ExtensionUrl+"js/InjectedJs/shotMsgVue.js");
},6000);

$(document).ready(function(){
	shotMsg_Start();
});