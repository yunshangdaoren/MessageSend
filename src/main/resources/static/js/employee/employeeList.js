//定义全局部门查询要跳转的地址
var href = "http://localhost:8080/employee/toEmployeeList.do?pageNum=";
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
			window.location.href = "/employee/toEmployeeList.do?pageNum="+pageNum+"&"+$("#form-queryDept").serialize();
		}
	}else{
		alert("请输入正确的页码！")
	}
});

//重置查询条件按钮点击事件
$("#btn-resetSelect").click(function(){
	$("#form-queryDept :input").not(":button, :submit, :reset, :hidden").val("").removeAttr("checked").remove("selected");
});

//职工操作人名称点击事件：弹出显示层，显示指定职工的详细信息
$(".a_detailOperatorEmployeeByNormalEmployee").click(function(){
	//获取到要查看的职工工号
	var manageEmpjobid = $(this).next().text();
	//显示面板
	$(".shadeDiv").show();
	$(".panel_employeeDetail").show();
	//发送Ajax请求
	$.ajax({
		url:"/employee/get.do?empJobId="+manageEmpjobid,
		dataType:"json",
		type:"post",
		success:function(result){
			if(result.code==200){
				//填充职工信息
				$(".span-empJobId").text(result.data.empJobid);
				$(".span-empName").text(result.data.empName);
				$(".span-empSex").text(result.data.empSexName);
				$(".span-empPhone").text(result.data.empPhone);
				$(".span-empEntryTime").text(result.data.entryTime);
				$(".span-deptName").text(result.data.deptNameListStr);
				$(".span-empStatus").text(result.data.statusName);
			}else{
				alert(result.msg);
			}
		}
	});
});

//职工详情称点击事件：弹出显示层，显示指定职工的详细信息
$(".a_detailEmployeeByNormalEmployee").click(function(){
	//获取到要查看的职工工号
	var manageEmpjobid = $(this).parent().parent().children().first().text();
	//显示面板
	$(".shadeDiv").show();
	$(".panel_employeeDetail").show();
	//发送Ajax请求
	$.ajax({
		url:"/employee/get.do?empJobId="+manageEmpjobid,
		dataType:"json",
		type:"post",
		success:function(result){
			if(result.code==200){
				//填充职工信息
				$(".span-empJobId").text(result.data.empJobid);
				$(".span-empName").text(result.data.empName);
				$(".span-empSex").text(result.data.empSexName);
				$(".span-empPhone").text(result.data.empPhone);
				$(".span-empEntryTime").text(result.data.entryTime);
				$(".span-deptName").text(result.data.deptNameListStr);
				$(".span-empStatus").text(result.data.statusName);
			}else{
				alert(result.msg);
			}
		}
	});
});
//关闭职工详细信息弹出层面板
$("#btn-hidePanelEmployeeDetail").click(function(){
	$(".shadeDiv").hide();
	$(".panel_employeeDetail").hide();
});

//跳转到指定部门的详细信息页面
$(".a_departmentDetail").click(function(){
	//获取到职工工号
	var empJobId = $(this).parent().parent().children().first().text();
	window.location.href = "/department/toDepartmentDetail.do?empJobId="+empJobId;
});
//跳转到指定职位的详细信息页面
$(".a_positionDetail").click(function(){
	//获取到职工工号
	var empJobId = $(this).parent().parent().children().first().text();
	window.location.href = "/position/toPositionDetail.do?empJobId="+empJobId;
});
//跳转到部门操作人职工详情页面
$(".a_detailOperatorEmployeeByManagerEmployee").click(function(){
	var empJobId = $(this).next().text();
	window.location.href = "/employee/toEmployeeDetail.do?empJobId="+empJobId;
});

//职工入职按钮点击事件，跳转到职工入职页面
$("#btn-entryContract").click(function(){
	window.location.href = "/contract/needEntryContractList.do";
});
//跳转到职工详情页面
$(".a_detailEmployeeByManagerEmployee").click(function(){
	var empJobId = $(this).parent().parent().children().first().text();
	window.location.href = "/employee/toEmployeeDetail.do?empJobId="+empJobId;
});

