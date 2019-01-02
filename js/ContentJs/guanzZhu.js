(function (){
var guanZhuRooms =[];
var clearfixTimer =setInterval(function () {
	if (window.location.href.indexOf("https://www.douyu.com/room/follow")>0) {
		window.clearInterval(clearfixTimer);
		return;
	}

	var clearfix =document.getElementsByClassName("attention clearfix");	
	if (clearfix.length>0) {
		var imgArr =clearfix[0].getElementsByTagName("img");
		var creditYhcGz =$(".creditYhcGz");
		if (imgArr.length ==creditYhcGz.length) {
			return;
		}
		for (var i = 0; i < imgArr.length; i++) {
			var roomidTemp =imgArr[i].parentElement.parentElement.parentElement.getElementsByClassName("focus fr")[0].getAttribute("data-room")
			var roomInfo=getInfoByRoomId(roomidTemp);
			if (roomInfo !=undefined) {
				var creditYhcLi=document.createElement("li");
				imgArr[i].parentElement.appendChild(creditYhcLi);
				var msg = "积分：" + JSON.parse(roomInfo.can_send_gift)["credit"];
				creditYhcLi.outerHTML=`<li class="creditYhcGz" style="background-color: #62b21b;background-color:rgba(39,40,34,0.5);position: absolute;top: 0px;padding: 2px 6px;color: #fff;font-size: 15px;z-index: 11;display: block;width: 100px;margin-left: 0px;">`+msg+`</li>`;
			
			}
		}
	}
	function getInfoByRoomId(roomId) {
		var r="";
		$.ajax({url:"https://www.douyu.com/betard/" +roomId ,async: false,success:function(result){
			if (result.hasOwnProperty("room")) {
				r=result;
			}else{
				try{
					// if (result.indexOf(`{"room_gg":{"s`)>=0) {
						r=JSON.parse(result);
					// }
				}catch(err){
					console.log(err);
				}
			}
		}});
		return r;
	};
}, 2000);
})();