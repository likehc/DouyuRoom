var bg = chrome.extension.getBackgroundPage();

var SqlDate1 =[];
var app = new Vue({
	el: '#app',
	data: {
		message:'基础数据',
		tableData3:[],
		pickerOptions1: {
			disabledDate(time) {
				return time.getTime() > Date.now();
			},
		},
		value1: new Date(),
		value2: new Date(),
	},
	methods:{
		onClick: function () {
			if (app.value1 == undefined || app.value2 == undefined) {
				this.$message('请选择日期！');
				return;
			}
			var startDate = moment(app.value1).format("YYYY-MM-DD");
			var endDate = moment(app.value2).format("YYYY-MM-DD");
			var compareDate = CompareDate(startDate,endDate);
			if (compareDate) {
				this.$message('结束日期不能小于开始日期');
				return;
			}
			bg.getDataBetweenDay(startDate,endDate);
			var getbaseDataTimerindex =0;
			var getbaseDataTimer=setInterval(function(){
				if (getbaseDataTimerindex>=20) {
					window.clearInterval(getbaseDataTimer);
					app.$message('数据请求超时！');
					return;
				}
				if (bg.SqlDate.length >0) {
					SqlDate1 = JSON.parse(bg.SqlDate).Data;
					bg.SqlDate=[];
					var sqlTable = JSON.parse(SqlDate1);
					app.tableData3 =sqlTable;
					var huoJian =0;
					var feJi =0;
					var yuWan =0;
					var wen=0
					for (var i = 0; i < sqlTable.length; i++) {
						if (sqlTable[i].award_type == 1) {huoJian++}
						if (sqlTable[i].award_type == 2) {feJi++}
						yuWan = yuWan+parseInt(sqlTable[i].silver);
						wen = wen+parseInt(sqlTable[i].prop_count);
					}
					window.clearInterval(getbaseDataTimer);								
				}
				app.message = "火箭："+ huoJian + "&emsp;飞机：" +feJi +"&emsp;鱼丸："+yuWan+"&emsp;稳："+wen;
				getbaseDataTimerindex++;
			},500);			
		},
		judge:function(row, column) { 
			var type = row[column.property];
			if (type ==1) {return "火箭"}
			if (type ==2) {return "飞机"}
		},
		formatterController:function(row, column) { 
			var date = row[column.property];
			if (date === undefined) {
				return "";
			}
			return moment(date).format("YYYY-MM-DD HH:mm:ss");
		},
	}
});
function CompareDate(d1,d2)
{
	return ((new Date(d1.replace(/-/g,"\/"))) > (new Date(d2.replace(/-/g,"\/"))));
}