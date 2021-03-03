//添加合同信息弹出层面板提交按钮点击事件
$("#btn-submitUpdateUserInfo").click(function(){
	$.ajax({
		url:"/user/update.do",
		data:$("#form-updateUserInfo").serialize(),
		dataType:"json",
		success:function(result){
			if(result.code==200){
				alert(result.msg);
				window.location.href="/user/toUserList.do";
			}else{
				alert(result.msg);
			}
		}
	});
});

//返回按钮点击事件
$("#btn-reback").click(function(){
	history.go(-1);
});

