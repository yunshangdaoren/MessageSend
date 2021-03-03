//登录页面账户和密码非空判断
function loginFormEmptyCheck(){
	if($("#userAccount").val()==''){
		alert("账户不能为空！");
		$("#userAccount").focus();
		return false;
	}
	
	if($("#userPwd").val()==''){
		alert("密码不能为空！");
		$("#userPwd").focus();
		return false;
	}
	return true;
}
//重置密码登录弹出层非空判断
function retrievePwdFormEmptyCheck(){
	if($("#find_UserAccount").val()==''){
		alert("账户不能为空！");
		$("#find_UserAccount").focus();
		return false;
	}
	if($("#securityMail").val()==''){
		alert("安全邮箱密码不能为空！");
		$("#securityMail").focus();
		return false;
	}
	if($("#emailVerificationCode").val()==''){
		alert("邮箱验证码密码不能为空！");
		$("#emailVerificationCode").focus();
		return false;
	}
	if($("#newUserPwd").val()==''){
		alert("新密码不能为空！");
		$("#newUserPwd").focus();
		return false;
	}
	if($("#confirmPwd").val()==''){
		alert("确认密码不能为空！");
		$("#confirmPwd").focus();
		return false;
	}
	if($("#newUserPwd").val()==''){
		alert("新密码不能为空！");
		$("#newUserPwd").focus();
		return false;
	}
	//两次密码是否一致判断
	if($("#newUserPwd").val()!=$("#confirmPwd").val()){
		alert("新密码和确认密码不一致！");
		return false;
	}
	//上面判断无误则返回true
	return true;
}

//显示重置密码遮罩层
$(".span_fogetPwd").click(function(){
	$(".shadeDiv").show();
});
//关闭重置密码遮罩层
$("#btn_hideShadeDiv").click(function(){
	$(".shadeDiv").hide();
});
//发送验证码点击事件
$("#btn_sendEmailVerificationCode").click(function(){
	var userAccount = $("#find_UserAccount").val();
	var securityMail = $("#securityMail").val();
	$("#btn_sendEmailVerificationCode").text("发送中...");
	$("#btn_sendEmailVerificationCode").css("pointer-events","none");
	$.ajax({ 
		url:"/login/sendEmailVerificationCode.do?userAccount="+userAccount+"&securityMail="+securityMail,
		dataType:"json",
		success:function(result){
			if(result.statusCode==1){
				alert(result.message);
				resendTime(30);
			}else{
				alert("邮件发送失败！");
			}
		}
	});
});

//倒计时发送验证码（30秒）function
function resendTime(wait) {
	if (wait == 0) {
		$("#btn_sendEmailVerificationCode").text("发送验证码");
		$("#btn_sendEmailVerificationCode").css("pointer-events","auto");
		wait = 60;
	} else { 
		$("#btn_sendEmailVerificationCode").text(wait+"秒后重新发送");
		wait--;
		setTimeout(function() {
			resendTime(wait)
		},
		1000)
	}
}
//提交重置密码点击事件
$("#btn_submitRetrievePwd").click(function(){
	//调用方法判断两次输入的密码是否一致
	if(retrievePwdFormEmptyCheck()){
		$.ajax({
			url:"/login/retrievePwd.do",
			data:$("#form_retrievePwd").serialize(),
			dataType:"json",
			success:function(result){
				if(result.statusCode==1){
					alert(result.message);
					$(".shadeDiv").hide();
				}else{
					alert(result.message);
				}
			}
		});
	}
});
//登录
$("#loginSubmit").click(function(){
	if(loginFormEmptyCheck()){
		$.ajax({
			url:"/login/loginCheck.do",
			data:$("#form_login").serialize(),
			dataType:"json",
			type:"get",
			success:function(result){
				if(result.statusCode==1){
					//登录成功后页面跳转至指定地址
					window.location.href=result.url;
				}else{
					alert(result.message);
					$(".p_erroLoginFail").text(result.message);
					$(".p_erroLoginFail").show();
				}
			}
		});
	}
});
//输入框内容改变时，将错误提示隐藏
$("input").change(function(){
	$(".p_erroLoginFail").hide();
});

