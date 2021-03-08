//短信任务开启点击事件
$(".a_startSMSSend").click(function() {
	//获取短信任务ID
	var smstaskId = $(this).parent().parent().children().first().text();
	//发送Ajax请求
	$.ajax({
		url:"/SMSSendStart.do?smstaskId="+smstaskId,
		dataType:"json",
		type:"post",
		success:function(result){
			if(result.code==200){
				alert(result.msg);
				window.location.reload();
			}else{
				alert(result.msg);
			}
		}
	});
});

//短信任务关闭点击事件
$(".a_stopSMSSend").click(function() {
	//获取短信任务ID
	var smstaskId = $(this).parent().parent().children().first().text();
	//发送Ajax请求
	$.ajax({
		url:"/SMSSendStop.do?smstaskId="+smstaskId,
		dataType:"json",
		type:"post",
		success:function(result){
			if(result.code==200){
				alert(result.msg);
				window.location.reload();
			}else{
				alert(result.msg);
			}
		}
	});
});

//短信任务接收人号码编辑按钮，鼠标放上去显示接收人号码详情信息面板
$(".a_smsTaskPhone").mouseenter(function(e) {
	//获取短信任务ID
	var smstaskId = $(this).parent().parent().children().first().text();
	//发送Ajax请求
	$(".panel_smsTaskPhoneDetail").show();
	//根据鼠标X，Y坐标位置设置显示面板绝对位置
	$(".panel_smsTaskPhoneDetail").css("left",e.pageX-30+"px");
	$(".panel_smsTaskPhoneDetail").css("top",e.pageY+20+"px");
	//发送Ajax请求
	$.ajax({
		url:"/smsTask/SMSTaskPhone.do?smstaskId="+smstaskId,
		dataType:"json",
		type:"post",
		success:function(result){
			$(".panel_smsTaskPhoneDetail .panel-body").text(result.data);
		}
	});
}).mouseleave(function() {
	//发送Ajax请求
	$(".panel_smsTaskPhoneDetail").hide();
});




