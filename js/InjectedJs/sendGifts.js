if (document.getElementsByClassName("backpack-btn").length>0) {
	document.getElementsByClassName("backpack-btn")[0].onclick = function(){
		insertSendGifts();
	};
}

function insertSendGifts() {
	setTimeout(function () {
		if ($("#giftsSpan").length<=0) {
			var giftsSpan =document.createElement("span");
			giftsSpan.innerHTML='<a style="font-weight:bold" href="javascript:;" id="giftsSpan" class="giftsSpan">礼物连送</a>';
			var btnClose =document.getElementsByClassName("btn close");
			var con = btnClose[0].getElementsByTagName("span");
			btnClose[0].insertBefore(giftsSpan,con[0]);
			document.getElementsByClassName("giftsSpan")[0].onclick = function(){
				createGiftTab();
			}
		}		
	},300);
};

var giftsTab;
function createGiftTab() {
	var giftsDiv =document.createElement("div");
	if ($("#giftsT").length<=0) {
		document.getElementsByClassName("uinfo-ywyc")[0].appendChild(giftsDiv);
		giftsDiv.outerHTML=`<div id="giftsT" class="backpack">
		<div><i id ="giftsTabClose" class="el-icon-circle-close-outline">关闭</i></div>
		<template>
		  <el-table :data="giftTableData" height="350" border style="width: 98%">	    
			<el-table-column label="礼物名称" width="150">
			  <template slot-scope="scope">
				  <el-checkbox class="giftTabChk" v-model="scope.row.checked":label="scope.row.giftName" border style="width: 85px;"></el-checkbox>
				  <img class="giftTabPic" :src="scope.row.pic"/>
			  </template>
			</el-table-column>
			<el-table-column prop="haveNum" label="拥有个数" width="80">
				<template slot-scope="scope" >
					<div class="giftHaveNum">{{scope.row.haveNum}}</div>
				</template>
			</el-table-column>
			<el-table-column  prop="sendNum" label="赠送个数" width="90">
				<template slot-scope="scope" >
					<el-input class="giftSendNum" v-model ="scope.row.sendNum" placeholder="整数" ></el-input>				
				</template>
			</el-table-column>
		  </el-table>
		</template>
		<input type="text" id="sendTimerInt" value="500" style="float:right;margin-top: 10px;width: 30px;" />
		<el-button type="primary" v-on:click="sendGiftsBtn" id="sendGiftsBtn" style="float:right;" round>一键赠送</el-button>
		</div>`;
		
		setTimeout(function () {
			getGiftsTabVue();
		},200);		
	}
};
var giftsTab;
function getGiftsTabVue() {
	giftsTab = new Vue({
		el: '#giftsT',
		data: {
			// inputTimer:"500",
			giftTableData: [
			]
		},
		methods:{
			sendGiftsBtn: function (event) {
				//this.value= e.target.value.replace(/[^\d]/g,'');
				var tab = giftsTab.giftTableData;
				var str ="";
				for (var i = 0; i < tab.length; i++) {	
				// console.log(i);				
					if (tab[i].checked) {
						if (isNaN(tab[i].sendNum) ||tab[i].sendNum==null||tab[i].sendNum ==undefined) {
							giftsTab.$notify({
								title: '错误',
								message: giftsTab.$createElement('i', { style: 'color: red'}, '错误字符！')
							});
							return;
						}
						var num = Math.floor(parseInt(tab[i].sendNum));
						tab[i].sendNum = num;
						if (num<0) {
							giftsTab.$notify({
								title: '错误',
								message: giftsTab.$createElement('i', { style: 'color: red'}, '请输入正整数！')
							});
							//myNotify()
							return;
						}
						if (num>tab[i].haveNum) {
							giftsTab.$notify({
								title: '错误',
								message: giftsTab.$createElement('i', { style: 'color: red'}, '请核实礼物数量！')
							});
							return;
						}
						if (num>0) {
							str = str+tab[i].sendNum + "个" +tab[i].giftName +"、  ";	
						}
					}
				}
				if(str !=""){
					this.$confirm(str, '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						$("#sendGiftsBtn").attr('disabled',true);
						var TimerInt;
						try{
							if (isNaN(parseInt($("#sendTimerInt")[0].value))) {
								TimerInt=500;
							}else{
								var t=parseInt($("#sendTimerInt")[0].value);
								if (t>=150) {
									TimerInt=t
								}else{
									TimerInt=500
								}										
							}									
						}catch(err){
							TimerInt=500;									
						}
						var timeIndex=0;
						$("#sendTimerInt")[0].value=TimerInt;
						var sendTimerIndex=setInterval(function(){
							out:
							for (var j = 0; j < tab.length; j++) {
								if (tab[j].checked) {
									var len= tab[j].sendNum;
									for (var k = 1; k <= len; k++) {
										sendGiftById(tab[j].giftId);
										tab[j].haveNum--;
										tab[j].sendNum--;
										if (tab[j].sendNum==0) {
											tab[j].checked=false;
										}
										break out;
									}
								}
								// if (timeIndex> tab.length) {
								// 	window.clearInterval(sendTimerIndex);
								// }
							}
							//timeIndex++;
						},TimerInt);
						$("#sendGiftsBtn").attr('disabled',false);							
					}).catch(() => {
					  this.$message({
						type: 'info',
						message: '已取消赠送'
					  });          
					});
				}else{
					giftsTab.$notify({
						title: '提示',
						message: giftsTab.$createElement('i', { style: 'color: green'}, '没有选中礼物或数量为0')
					});
				}				
			}
			
		}
	});
	getGiftinfo();
	document.getElementById("giftsTabClose").onclick = function(){
		$('#giftsT').remove();
	};
}
/*
*title
* { style: 'color: red'}
* msg
*/
async function myNotify(title,style,msg) {
	giftsTab.$notify({
		title: title,
		message: giftsTab.$createElement('i', style, msg)
	});
}
function sendGiftById(id) {	
	$('li[class=" prop effect"][data-giftid="'+id+'"]').click();
}
var giftTableData;
function getGiftinfo() {
	giftTableData=[];
	var giftArr =$('li[class=" prop effect"]');
	for (var a = 0; a < giftArr.length; a++) {
		var id =giftArr[a].getAttribute("data-giftid");
		var giftName=getNameById(id);
		var giftNum=giftArr[a].getElementsByTagName("span")[0].innerText.trim();
		var picSrc =giftArr[a].getElementsByTagName("img")[0].src.trim();
		if (giftName !="") {
			giftTableData.push({checked:false,giftId:id,giftName:giftName,pic:picSrc,haveNum:giftNum,sendNum:0});
		}
	}
	giftsTab.giftTableData=giftTableData;
};
function getNameById(id) {
	var result="";
	switch(id){
		case "193":
			result="弱鸡";
			break;
		case "192":
			result="赞";
			break;
		case "519":
			result="呵呵";
			break;
		case "520":
			result="稳";
			break;
		case "712":
			result="棒棒哒";
			break;
		case "713":
			result="辣眼睛";
			break;
		case "714":
			result="怂";
			break;
		case "824":
			result="荧光棒";
			break;
		case "1795":
			result="哈啤";
			break;
		// case "191":
		// 	result="鱼丸";
		// 	break;
	}
	return result;
};