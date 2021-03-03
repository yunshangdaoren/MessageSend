//退出登录
$(".a_logout").click(function(){
	
});
//显示修改密码弹出层
$(".a_changeUserPwd").click(function(){
	$(".shadeDiv").show();
	$(".panel_changeUserPwd").show();
});
//关闭修改密码弹出层
$("#btn_hidePanelChangeUserPwd").click(function(){
	$(".shadeDiv").hide();
	$(".panel_changeUserPwd").hide();
});

//显示联系管理员弹出层
$(".a_callManager").click(function(){
	$(".shadeDiv").show();
	$(".panel_callManager").show();
});
//关闭联系管理员弹出层
$("#btn_hidePanelCallManager").click(function(){
	$(".shadeDiv").hide();
	$(".panel_callManager").hide();
});

//修改密码对话框非空判断
function changeUserPwdFormEmptyCheck(){
	if($("#currentUserPwd").val()==''){
		alert("当前密码不能为空！");
		$("#currentUserPwd").focus();
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
	//两次密码是否一致判断
	if($("#newUserPwd").val()!=$("#confirmPwd").val()){
		alert("新密码和确认密码不一致！");
		return false;
	}
	//上面判断无误则返回true
	return true;
}
//提交修改密码点击事件
$("#btn_submitChangeUserPwd").click(function(){
	//调用方法判断两次输入的密码是否一致
	if(changeUserPwdFormEmptyCheck()){
		$.ajax({
			url:"/user/changeUserPwd.do",
			data:$("#form_changeUserPwd").serialize(),
			dataType:"json",
			success:function(result){
				if(result.code==200){
					alert(result.msg);
					$(".shadeDiv").hide();
					$(".panel_changeUserPwd").hide();
					$("input").val("");
				}else{
					alert(result.msg);
					$(".span_erroCurrentPwd").text(result.msg);
					$(".span_erroCurrentPwd").show();
				}
			}
		});
	}
});
//输入框内容改变时，将错误提示隐藏
$("#currentUserPwd").change(function(){
	$(".span_erroCurrentPwd").hide();
});
//显示日期
var date = new Date();   
var year = date.getFullYear();    //获取当前年份   
var mon = date.getMonth()+1;      //获取当前月份   
var day = date.getDate();          //获取当前日   
var week = date.getDay();          //获取当前星期几   
var weeks = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
$(".span-date").text(year+'-'+mon+'-'+day+' '+weeks[week]);  
    
//未读消息
$(".img-news").mouseover(function(){
	//alert("移入");
	$(".img-news").attr("src","/static/img/news-dark.png");
}).mouseout(function () {
	$(".img-news").attr("src","/static/img/news-white.png");
});

