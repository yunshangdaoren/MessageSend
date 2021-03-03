//定义全局部门查询要跳转的地址
var href = "http://localhost:8080/departmentLevel/levelStructureManage.do?pageNum=";
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
			window.location.href = "/departmentLevel/levelStructureManage.do?pageNum="+pageNum+"&"+$("#form-queryDept").serialize();
		}
	}else{
		alert("请输入正确的页码！")
	}
});
//显示添加部门级别弹出层面板
$("#btn-addDepartmentLevel").click(function(){
	//显示弹出层面板
	$(".shadeDiv").show();
	$(".panel_addDepartmentLevel").show();
});
//添加部门级别信息弹出层面板提交按钮点击事件
$("#btn-submitAddDepartmentLevel").click(function(){
	if(addDepartmentLevelFormEmptyCheck()){
		$.ajax({
			url:"/departmentLevel/add.do",
			data:$("#form-addDepartmentLevel").serialize(),
			dataType:"json",
			success:function(result){
				if(result.code==200){
					alert(result.msg);
					$(".shadeDiv").hide();
					$(".panel_addDepartmentLevel").hide();
					location.reload();
				}else{
					alert(result.msg);
				}
			}
		});
	};
});
//修改部门级别信息弹出层面板提交按钮点击事件
$("#btn-submitUpdateDepartmentLevel").click(function(){
	if(updateDepartmentLevelFormEmptyCheck()){
		$.ajax({
			url:"/departmentLevel/update.do",
			data:$("#form-updateDepartmentLevel").serialize(),
			dataType:"json",
			success:function(result){
				if(result.code==200){
					alert(result.msg);
					$(".shadeDiv").hide();
					$(".panel_updateDepartmentLevel").hide();
					location.reload();
				}else{
					alert(result.msg);
				}
			}
		});
	};
});
//关闭添加部门级别信息弹出层面板
$("#btn-hidePanelAddDepartmentLevel").click(function(){
	$(".shadeDiv").hide();
	$(".panel_addDepartmentLevel").hide();
});
//关闭修改部门级别信息弹出层面板
$("#btn-hidePanelUpdateDepartmentLevel").click(function(){
	$(".shadeDiv").hide();
	$(".panel_updateDepartmentLevel").hide();
});
//添加职位信息弹出层面板非空判断
function addDepartmentLevelFormEmptyCheck(){
	if($("#input-addLevel").val()==null || $("#input-addLevel").val()==""){
		alert("职位级别不能为空！");
		$("#input-addLevel").focus();
		return false;
	}
	if($("#input-addLevelDesc").val()==null || $("#input-addLevelDesc").val()==""){
		alert("级别描述不能为空！");
		$("#input-addLevelDesc").focus();
		return false;
	}
	//上面判断无误则返回true
	return true;
}
//修改职位信息弹出层面板非空判断
function updateDepartmentLevelFormEmptyCheck(){
	if($("#input-updateLevel").val()==null || $("#input-updateLevel").val()==""){
		alert("职位级别不能为空！");
		$("#input-updateLevel").focus();
		return false;
	}
	if($("#input-updateLevelDesc").val()==null || $("#input-updateLevelDesc").val()==""){
		alert("级别描述不能为空！");
		$("#input-updateLevelDesc").focus();
		return false;
	}
	//上面判断无误则返回true
	return true;
}

//部门操作人名称点击事件：弹出显示层，显示指定职工的详细信息
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
//关闭职工详细信息弹出层面板
$("#btn-hidePanelEmployeeDetail").click(function(){
	$(".shadeDiv").hide();
	$(".panel_employeeDetail").hide();
});
//修改部门级别信息点击事件：弹出显示层，显示指定要修改的部门级别的详细信息
$(".a-updateDepartmentLevel").click(function(){
	//获取到要查看的职工工号
	var manageEmpjobid = $(this).next().text();
	//获取到部门级别id
	var dlId = $(this).parent().parent().children().first().text();
	//显示面板
	$(".shadeDiv").show();
	$(".panel_updateDepartmentLevel").show();
	//发送Ajax请求
	$.ajax({
		url:"/departmentLevel/get.do?dlId="+dlId,
		dataType:"json",
		type:"post",
		success:function(result){
			if(result.code==200){
				//填充部门级别信息
				$("#input-updateDlId").val(dlId);
				$("#input-updateLevel").val(result.data.level);
				$("#input-updateLevelDesc").text(result.data.levelDesc);
				$("#input-updateLevelNote").text(result.data.levelNote);
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
//删除指定级别信息
$(".a-deleteDepartmentLevel").click(function(){
	var value = confirm("删除该级别信息？");
	//如果确认删除
	if(value == true){
		var dlId = $(this).parent().parent().children().first().text();
		$.ajax({
			url:"/departmentLevel/delete.do?dlId="+dlId,
			dataType:"json",
			success:function(result){
				if(result.code==0){
					alert(result.msg);
				}else{
					alert(result.msg);
					//删除该行记录
					$(this).parent().parent().remove();
					location.reload(); 
				}  
			}	
		});
	}
});
//跳转到部门操作人职工详情页面
$(".a_detailOperatorEmployeeByManagerEmployee").click(function(){
	var empJobId = $(this).next().text();
	window.location.href = "/employee/toEmployeeDetail.do?empJobId="+empJobId;
});
