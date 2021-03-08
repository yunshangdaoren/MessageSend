//获取领导日报
$("#btn_smsLingDao").click(function(){
	//发送Ajax请求
	$.ajax({
		url:"smsLingDao.do",
		dataType:"json",
		type:"get",
		success:function(result){
			if(result.code==200){
				$(".input_smsLingDao").val(result.data);
			}else{
				alert(result.msg);
			}
		}
	});
});
//发送领导日报
$("#btn_smsLingDaoSend").click(function(){
	var smsContent = $(".input_smsLingDao").val();
	alert("smsContent；"+smsContent);
	//发送Ajax请求
	$.ajax({
		url:"/smsLingDaoSend.do?smsContent="+smsContent,
		dataType:"json",
		type:"get",
		success:function(result){
			alert("返回信息为:"+result.data.Message+" 返回余额为:"+result.data.RemainPoint+" 成功短信数量:"+result.data.SuccessCounts);
			/*result = JSON.stringify(result);
			result = JSON.parse(result);*/
			/*if(result.data.ReturnStatus == "Success"){
				alert("发送成功");
				alert("返回信息为:"+result.data.Message+" 返回余额为:"+result.data.RemainPoint+" 成功短信数量:"+result.data.SuccessCounts);
			}else{
				alert("发送失败1");
				alert("返回信息为:"+result.data.Message+" 返回余额为:"+result.data.RemainPoint+" 成功短信数量:"+result.data.SuccessCounts);
			}*/
			var result = JSON.stringify(result);
			alert(result);
			
		}
	});
});

//获取医务日报
$("#btn_smsYiwu").click(function(){
	//发送Ajax请求
	$.ajax({
		url:"smsYiWu.do",
		dataType:"json",
		type:"get",
		success:function(result){
			if(result.code==200){
				$(".input_smsYiWu").val(result.data);
			}else{
				alert(result.msg);
			}
		}
	});
});
//发送医务日报
$("#btn_smsYiWuSend").click(function(){
	var smsContent = $(".input_smsYiWu").val();
	alert("smsContent；"+smsContent);
	//发送Ajax请求
	$.ajax({
		url:"/smsYiWuSend.do?smsContent="+smsContent,
		dataType:"json",
		type:"get",
		success:function(result){
			alert("返回信息为:"+result.data.Message+" 返回余额为:"+result.data.RemainPoint+" 成功短信数量:"+result.data.SuccessCounts);
			/*result = JSON.stringify(result);
			result = JSON.parse(result);*/
			/*if(result.data.ReturnStatus == "Success"){
				alert("发送成功");
				alert("返回信息为:"+result.data.Message+" 返回余额为:"+result.data.RemainPoint+" 成功短信数量:"+result.data.SuccessCounts);
			}else{
				alert("发送失败1");
				alert("返回信息为:"+result.data.Message+" 返回余额为:"+result.data.RemainPoint+" 成功短信数量:"+result.data.SuccessCounts);
			}*/
			var result = JSON.stringify(result);
			alert(result);
			
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

