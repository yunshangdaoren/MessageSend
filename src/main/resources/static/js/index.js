//
$("#start1").click(function(){
	//发送Ajax请求
	$.ajax({
		url:"start1?",
		dataType:"json",
		type:"post",
		success:function(result){
			if(result.code==200){
				alert(result.msg);
			}else{
				alert(result.msg);
			}
		}
	});
});

$("#stop1").click(function(){
	$.ajax({
		//url:"http://47.93.25.215:8088/sms.aspx?action=send&rt=json&userid=113&account=账号&password=密码&mobile=15310443790&content="+$("#input_leaderMessage").val()+"&sendTime=&extno=",
		url:"stop1",
		dataType:"json",
		type:"post",
		success:function(result){
			if(result.code==200){
				alert(result.msg);
			}else{
				alert(result.msg);
			}
		},
		error:function(result){
			console.log(result[0]);
			alert(result[0]);
			alert(result[0].ReturnStatus);
		}
	});
	
});

/*function sendMessage(src){
	var script = document.createElement('script');
	script.setAttribute("type","text/javascript");
	script.src=src;
	document.body.appendChild(script);
}

window.onload=function(){
	sendMessage('http://47.93.25.215:8088/sms.aspx?action=send&rt=json&userid=113&account=cqsrm001&password=cqsrm001@&mobile=15310443790&content=这是测试的内容&sendTime=&extno=&callback=foo');
}
function foo(){
	console.log("返回值："+callback);
}*/

