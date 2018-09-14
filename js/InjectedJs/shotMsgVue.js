var isTagDel =false;
var shotMsg = new Vue({
	el: '#tags',
	data: {
		isclose:true,
		message: 'Hello Vue!',
		tags: [
			/*{ "name": "标签一", "type": "" },
			{ "name": "标签二", "type": "success" },*/			
		]
	},
	methods:{
		
	}
});
var timeInd1 = null;
$('#tags').click(function(ev) {
	clearTimeout(timeInd1);
	timeInd1 = setTimeout(function(){
		//do click function
		var event = ev || window.event;
		var target = event.target || event.srcElement; 
		if (target.nodeName.toLowerCase() == 'span' ){
			if (isTagDel) return;
			var msg =target.innerText.trim();
			PageObj.sendMsg(msg);
			$("#shotMsg").hide();
		}
	},100);
});
$('#tags').dblclick(function(ev) {
	clearTimeout(timeInd1);
	var event = ev || window.event;
	var target = event.target || event.srcElement; 
	if (target.nodeName.toLowerCase() == 'span' ){
		if (isTagDel) {
			target.remove();
		}else{
			// var msg =target.innerText.trim();
			// sendMsg(msg);
			// $("#shotMsg").hide();
		}
	}
});
function initializeTag() {
	try{
		var pageMsgObj = new Object;
		var pageMessage = {from:"pageMsg" ,type: 'function', functionName: 'getShotMsgArr'};
		pageSendMsg(pageMessage,pageMsgObj);
		self.setTimeout(function() {
			if (pageMsgObj.data == null ||pageMsgObj.data == undefined ||pageMsgObj.data.length==0) {pageMsgObj.data=""};
			var shotMsgArr = pageMsgObj.data.split("|yhc|");
			var msgArr = [];
			for (var c = 0; c < shotMsgArr.length; c++) {
				if (shotMsgArr[c] !="") {
					var tag =getTagType(shotMsgArr[c],c);
					msgArr.push(tag);
				}				
			}
			shotMsg.tags=msgArr;
		},150);
			
	}catch(err){
		console.log(err);		
	}	
};

function getTagType(s,i) {
	var index=i%5;
	switch(index)
	{		
		case 0:
			return { "name":s, "type": "" };
		break;
		case 1:
			return { "name":s, "type": "success" };
		break;
		case 2:
			return { "name":s, "type": "info" };
		break;
		case 3:
			return { "name":s, "type": "warning" };
		break;
		case 4:
			return { "name":s, "type": "danger" };
		break;
	}	
};



function saveTags(newTag) {
	var tags =$("#tags .el-tag");
	var tagStr="";
	for (var a = 0; a < tags.length; a++) {
		if (tags[a] =="") {
			continue;
		}
		if (a== tags.length-1) {
			tagStr = tagStr+tags[a].innerText.trim();
		}else{
			tagStr = tagStr+tags[a].innerText.trim()+"|yhc|";
		}
	}
	if (newTag != undefined & newTag !="" && newTag != null) {
		if (tagStr =="") {
			tagStr = newTag.trim();
		}else{
			tagStr = tagStr+"|yhc|"+newTag.trim();
		}		
	}	
	pageSendMsg( {from:"pageMsg" ,type: 'function', functionName: 'setShotMsgArr',data:tagStr});
	return tagStr;
};

function bindTagSave() {
	var tagSave =$("#tagSave");
	if (tagSave.length>0){
		if (!PageObj.isBindFunction(tagSave,"click")) {
			document.getElementById("tagSave").onclick = function(){
				if (tagSave.text().trim() == "修改") {
					isTagDel =true;
					$("#inputTag").show();
					tagSave.text("保存");
					tagSave.attr("class","el-icon-success");
					try{						
						$("#tags").sortable();
						$("#tags").sortable("enable");
					}catch(err){
					}					
				}else{
					isTagDel =false;
					$("#inputTag").hide();
					saveTags();
					tagSave.text("修改");
					tagSave.attr("class","el-icon-edit");
					$("#tags").sortable("disable");
					$("#tags").disableSelection();
				}
			};
		}
	}
};

document.getElementById('inputTag').addEventListener('keydown',function(e){
	if(e.keyCode!=13){
		return;
	}else{
		var inputTag =$("#inputTag");
		for (var d = 0; d < shotMsg.tags.length; d++) {
			if (inputTag.val().trim()=="") {
				shotMsg.$message("条目名不能为空！");
				e.preventDefault();
				this.value += '';
				return;
			}
			if (shotMsg.tags[d].name.trim() == inputTag.val().trim()) {
				shotMsg.$message("此条目已存在！")
				e.preventDefault();
				this.value += '';
				return;
			}
		}
		saveTags(inputTag.val());
		var newTag=getTagType(inputTag.val(),$("#tags .el-tag").length);
		shotMsg.tags.push(newTag);
		inputTag.val("");
		setTimeout(function(){
			$('#shotMsg').scrollTop($('#shotMsg')[0].scrollHeight);	
		},0);
		e.preventDefault();
		this.value += '';
	}	
});
$(function() {
	initializeTag();
	bindTagSave();
	
});