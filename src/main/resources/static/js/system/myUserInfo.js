//跳转到修改账户信息页面
$("#btn-updateMyUserInfo").click(function(){
	//获取到账户
	var userAccount = $(".span-userAccount").text();
	window.location.href = "/user/toUpdateUserInfo.do?userAccount="+userAccount;
});
