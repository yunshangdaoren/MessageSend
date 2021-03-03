//定义全局部门查询要跳转的地址
var href = "http://localhost:8080/userRole/toUserRoleList.do?pageNum=";
//当前页码
var pageNum = parseInt($(".i-pageNum").text());
//总页码
var totalPages = parseInt($(".i-totalPages").text());
//首页点击事件
$(".a-indexPage").click(function(){
	window.location.href = href+"0&"+$("#form-queryDept").serialize();
});
//上一页点击事件
$(".a-prePage").click(function(){
	if(pageNum-1 <= 0){
		window.location.href = href+"0&"+$("#form-queryDept").serialize();
	}else{
		window.location.href = href+""+(pageNum-1)+"&"+$("#form-queryDept").serialize();
	}
});
//下一页点击事件
$(".a-nextPage").click(function(){
	if(pageNum+1 > totalPages){
		window.location.href = href+""+totalPages+"&"+$("#form-queryDept").serialize();
	}else{
		window.location.href = href+""+(pageNum+1)+"&"+$("#form-queryDept").serialize();
	}
});
//尾页点击事件
$(".a-endPage").click(function(){
	window.location.href = href+""+totalPages+"&"+$("#form-queryDept").serialize();
});
//跳转至指定页码
$("#span-jumPageNum").click(function(){
	//获取要跳转到指定页码
	var pageNum = $("#input-pageNum").val();
	//获取总页码
	var totalPage = $(".span-totalPages").text().replace(/[^0-9]/ig,"");
	if($.isNumeric(pageNum)){
		totalPage = parseInt(totalPage);
		if(pageNum > totalPage || pageNum <= 0){
			alert("请输入正确的页码！");
		}else{
			window.location.href = "/userRole/toUserRoleList.do?pageNum="+pageNum+"&"+$("#form-queryDept").serialize();
		}
	}else{
		alert("请输入正确的页码！")
	}
});
//重置查询条件按钮点击事件
$("#btn-resetSelect").click(function(){
	$("#form-queryDept :input").not(":button, :submit, :reset, :hidden").val("").removeAttr("checked").remove("selected");
});

//跳转到部门操作人职工详情页面
$(".a_detailOperatorEmployeeByManagerEmployee").click(function(){
	var empJobId = $(this).next().text();
	window.location.href = "/employee/toEmployeeDetail.do?empJobId="+empJobId;
});

//显示修改用户角色弹出层面板,并给角色类型信息下拉框赋值
$(".a_updateUserRole").click(function(){
	var empJobId = $(this).parent().parent().children().first().text();
	var empName = $(this).parent().parent().children().eq(1).text();
	var oldRoleId = $(this).parent().parent().children().eq(2).text();
	//显示弹出层面板
	$(".shadeDiv").show();
	$(".panel_updateUserRole").show();
	//发送Ajax请求获取角色信息
	$.ajax({
		url:"/role/list.do",
		dataType:"json",
		async:false,
		success:function(result){
			if(result.code==200){
				//先清空值（除了第一个）
				$("#select-updateUserRole option:not(:first)").remove();
				$("#input-empJobId").val(empJobId);
				$("#input-empName").val(empName);
				$("#input-oldRoleId").val(oldRoleId);
				//添加值
				for(var i =0; i < result.data.length; i++){
					$("#select-updateUserRole").append("<option value='"+result.data[i].roleId+"'>"+result.data[i].roleName+"</option>")
				}
			}else{
				alert("获取信息失败！");
			}
		}
	});
});
//修改用户角色信息弹出层面板提交按钮点击事件
$("#btn-submitUpdateUserRole").click(function(){
	if(updateUserRoleFormEmptyCheck()){
		$.ajax({
			url:"/userRole/update.do",
			data:$("#form-updateUserRole").serialize(),
			dataType:"json",
			success:function(result){
				if(result.code==200){
					alert(result.msg);
					$(".shadeDiv").hide();
					$(".panel_updateUserRole").hide();
					location.reload();
				}else{
					alert(result.msg);
				}
			}
		});
	};
});
//关闭修改用户角色信息弹出层面板
$("#btn-hidePanelUpdateUserRole").click(function(){
	$(".shadeDiv").hide();
	$(".panel_updateUserRole").hide();
});

function updateUserRoleFormEmptyCheck(){
	if($("#select-updateUserRole").val()==null){
		alert("用户角色不能为空！");
		$("#select-updateUserRole").focus();
		return false;
	}
	//上面判断无误则返回true
	return true;
}



