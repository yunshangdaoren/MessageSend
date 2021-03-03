//定义全局部门查询要跳转的地址
var href = "http://localhost:8080/attendanceEmployee/toMyAttendanceEmployeeList.do?pageNum=";
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
			window.location.href = "/attendanceEmployee/toMyAttendanceEmployeeList.do?pageNum="+pageNum+"&"+$("#form-queryDept").serialize();
		}
	}else{
		alert("请输入正确的页码！")
	}
});

//重置查询条件按钮点击事件
$("#btn-resetSelect").click(function(){
	$("#form-queryDept :input").not(":button, :submit, :reset, :hidden").val("").removeAttr("checked").remove("selected");
});

//弹出显示层，显示指定部门的详细信息
$(".a-deptName").click(function(){
	//获取到部门id
	var deptId = $(this).parent().parent().children().first().text();
	//显示面板
	$(".shadeDiv").show();
	$(".panel_departmentDetail").show();
	//发送Ajax请求
	$.ajax({
		url:"/department/get.do?deptId="+deptId,
		dataType:"json",
		type:"post",
		success:function(result){
			if(result.code==200){
				//填充部门信息
				$(".span-deptId").text(result.data.deptId);
				$(".span-deptName").text(result.data.deptName);
				$(".span-dlLevel").text(result.data.dlLeve+"级");
				$(".span-manageEmpName").text(result.data.manageEmpName);
				$(".span-deptEmpnum").text(result.data.deptEmpnum);
				$(".span-parentDeptName").text(result.data.parentDeptName);
				$(".span-deptDesc").text(result.data.deptDesc);
				$(".span-lastOperatorDate").text(result.data.lastOperatorDate);
				$(".span-operatorEmpName").text(result.data.operatorEmpName);
			}else{
				alert(result.msg);
			}
		}
	});
});
//关闭职工详细信息弹出层面板
$("#btn-hidePanelDepartmentDetail").click(function(){
	$(".shadeDiv").hide();
	$(".panel_departmentDetail").hide();
});
//弹出显示层，显示指定职位的详细信息
$(".a-positionName").click(function(){
	//获取到职位id
	var positionId = $(this).next().text();
	//显示面板
	$(".shadeDiv").show();
	$(".panel_positionDetail").show();
	//发送Ajax请求
	$.ajax({
		url:"/position/get.do?positionId="+positionId,
		dataType:"json",
		type:"post",
		success:function(result){
			if(result.code==200){
				//填充部门信息
				$(".span-positionId").text(result.data.positionId);
				$(".span-positionName").text(result.data.positionName);
				$(".span-plLevelDesc").text(result.data.plLevelDesc);
				$(".span-deptName").text(result.data.deptName);
				$(".span-parentPositionName").text(result.data.parentPositionName);
				$(".span-statusName").text(result.data.statusName);
				$(".span-positionDesc").text(result.data.positionDesc);
				$(".span-lastOperatorDate").text(result.data.lastOperatorDate);
				$(".span-operatorEmpName").text(result.data.operatorEmpName);
			}else{
				alert(result.msg);
			}
		}
	});
});
//关闭职位详细信息弹出层面板
$("#btn-hidePanelPositionDetail").click(function(){
	$(".shadeDiv").hide();
	$(".panel_positionDetail").hide();
});

//跳转至考勤补录详情页面
$(".a_detailContract").click(function(){
	var conId = $(".a_detailContract").parent().parent().children().first().text();
	window.location.href="/contract/detailContract.do?conId="+conId;
});
