// var ExtensionUrl="chrome-extension://jbcfompgackcpnfcphdhpepcdnbbjfnh/";
var ExtensionUrl="chrome-extension://"+chrome.runtime.id+"/";
insertJsCss(ExtensionUrl+"css/shotmsg.css","css");
insertJsCss(ExtensionUrl+"node_modules/element-ui/lib/theme-chalk/index.css","css");
insertJsCss(ExtensionUrl+"node_modules/vue.js");
insertJsCss(ExtensionUrl+"node_modules/element-ui/lib/index.js");
insertJsCss(ExtensionUrl+"js/QuoteJs/jquery-ui.min.js");
// insertJsCss("https://unpkg.com/element-ui/lib/theme-chalk/index.css","css")
// insertJsCss("https://unpkg.com/vue/dist/vue.js")
// insertJsCss("https://unpkg.com/element-ui/lib/index.js")

$(document).ready(function(){
	shotMsg_Start();
});

var shotMsgIndex =0;
var roomId=0;
function shotMsg_Start() {
	roomId = roomObj.getRoomId();
	if (roomId ==0) {return}
	var timershotMsg=self.setInterval(function(){
		if (shotMsgIndex>=10) {
			window.clearInterval(timershotMsg);
			return;
		}
		createShotMsgDiv();
		shotMsgIndex++;
	},1000);
};

function createShotMsgDiv() {
	var shotMsgId =document.getElementsByClassName("shotMsg");
	var shieGiftFr= document.getElementsByClassName("shie-gift fr");
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
		$('.cs-textarea').click(function() {
			clearTimeout(timeInd);
			timeInd = setTimeout(function(){
					//do click function
				},150);
		});
		$('.cs-textarea').dblclick(function() {
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

//防止 vue.js没有加载完毕，
self.setTimeout(function() {
	roomId = roomObj.getRoomId();
	if (roomId ==0) {return}
	insertJsCss(ExtensionUrl+"js/InjectedJs/shotMsgVue.js");
},3000);