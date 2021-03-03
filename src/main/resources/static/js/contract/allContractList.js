//定义全局部门查询要跳转的地址
var href = "http://localhost:8080/contract/toAllContractList.do?pageNum=";
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
			window.location.href = "/contract/toAllContractList.do?pageNum="+pageNum+"&"+$("#form-queryDept").serialize();
		}
	}else{
		alert("请输入正确的页码！")
	}
});

//点击添加合同按钮，跳转至添加合同页面
$("#btn-addContract").click(function(){
	window.location.href = "/contract/toAddContract.do";
});
//添加合同信息弹出层面板提交按钮点击事件
$("#btn-submitAddContract").click(function(){
	if(addDeptFormEmptyCheck()){
		$.ajax({
			url:"/contract/add.do",
			data:$("#form-addContract").serialize(),
			dataType:"json",
			success:function(result){
				if(result.code==200){
					alert(result.msg);
					$(".shadeDiv").hide();
					$(".panel_addContract").hide();
					location.reload();
				}else{
					alert(result.msg);
				}
			}
		});
	};
});
//关闭添加合同信息弹出层面板
$("#btn-hidePanelAddContract").click(function(){
	$(".shadeDiv").hide();
	$(".panel_addContract").hide();
});

//监听添加职位信息弹出层中合同所属部门名称输入框输入值，并动态查找指定部门信息赋值给下拉选项列表
$("#input-addDeptName").bind("input propertychange", function(){
	//部门名称
	var deptName = $("#input-addDeptName").val();
	$("#select-infoDeptId").empty();
	$("#select-infoDeptId").show();
	$.ajax({
		url:"/department/queryLikeDeptName.do?deptName="+deptName,
		dataType:"json",
		success:function(result){
			if(result.code==200){
				$.each(result.data, function(i, item){
					$("#select-infoDeptId").append("<option value='"+item.deptId+"'>"+item.deptName+"</option>");
				});
			}
		}
	});
});
//监听添加职位信息弹出层中合同所属职位信息输入框输入值，并动态查找指定职位信息赋值给下拉选项列表
$("#input-addPositionName").bind("input propertychange", function(){
	//部门名称
	var parentPositionName = $("#input-addParentPositionName").val();
	$("#select-positionId").empty();
	$("#select-positionId").show();
	$.ajax({
		url:"/position/queryLikePositionName.do?parentPositionName="+parentPositionName,
		dataType:"json",
		success:function(result){
			if(result.code==200){
				$.each(result.data, function(i, item){
					$("#select-positionId").append("<option value='"+item.positionId+"'>"+item.positionName+"</option>");
				});
			}
		}
	});
});
//监听职位所属部门、上级职位信息输入框鼠标光标移除事件
$("#input-addDeptName").focus(function(){
	$("#select-infoDeptId").show();
})
//添加职位信息弹出层：职位所属部门、上级职位信息输入框鼠标移出
$("#div-infoDeptName").mouseover(function(){
	//鼠标移入
	$("#select-infoDeptId").show();
}).mouseout(function(){
	//鼠标移出
	$("#select-infoDeptId").hide();
});
$("#div-positionName").mouseover(function(){
	//鼠标移入
	$("#select-positionId").show();
}).mouseout(function(){
	//鼠标移出
	$("#select-positionId").hide();
});

//添加职位信息弹出层的下拉列表部门信息双击事件
$("#select-infoDeptId").dblclick(function(){
	//获取到选择的下拉列表的值
	var options = $("#select-infoDeptId option:selected");
	$("#select-infoDeptId").hide();
	$("#input-addDeptName").empty();
	$("#input-addDeptName").val(options.text());
	$("#input-addDeptName").val(options.val());
});
//添加职位信息弹出层的下拉列表上级职位信息双击事件
$("#select-positionId").dblclick(function(){
	//获取到选择的下拉列表的值
	var options = $("#select-positionId option:selected");
	$("#select-positionId").hide();
	$("#input-addPositionName").empty();
	$("#input-addPositionName").val(options.val());
	$("#input-addPositionName").val(options.val());
});
//添加合同弹出层面板非空判断
function addDeptFormEmptyCheck(){
	if($("#input-addDeptName").val()==''){
		alert("部门名称不能为空！");
		$("#addDeptName").focus();
		return false;
	}
	if($("#select-addPositionId").val()==null){
		alert("职位名称不能为空！");
		$("#select-addPositionId").focus();
		return false;
	}
	if($("#select-addContractStatus").val()==null){
		alert("部门状态不能为空！");
		$("#select-addContractStatus").focus();
		return false;
	}
	//上面判断无误则返回true
	return true;
}

//重置查询条件按钮点击事件
$("#btn-resetSelect").click(function(){
	$("#form-queryDept :input").not(":button, :submit, :reset, :hidden").val("").removeAttr("checked").remove("selected");
});

//部门主管人名称点击事件：弹出显示层，显示指定职工的详细信息
$(".a-manageEmpName").click(function(){
	//获取到要查看的职工工号
	var manageEmpjobid = $(this).next().text();
	//获取到职工所属部门id
	var deptId = $(this).parent().parent().children().first().text();
	//显示面板
	$(".shadeDiv").show();
	$(".panel_employeeDetail").show();
	//发送Ajax请求
	$.ajax({
		url:"/employee/get.do?empJobid="+manageEmpjobid+"&deptId="+deptId,
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
				var deptName = "";
				for(var i = 0; i < result.data.deptNameList.length; i++){
					deptName += result.data.deptNameList[i]+" ";
				}
				$(".span-deptName").text(deptName);
				$(".span-empStatus").text(result.data.statusName);
			}else{
				alert(result.msg);
			}
		}
	});
});

//部门操作人名称点击事件：弹出显示层，显示指定职工的详细信息
$(".a-operatorEmpName").click(function(){
	//获取到要查看的职工工号
	var manageEmpjobid = $(this).next().text();
	//获取到职工所属部门id
	var deptId = $(this).parent().parent().children().first().text();
	//显示面板
	$(".shadeDiv").show();
	$(".panel_employeeDetail").show();
	//发送Ajax请求
	$.ajax({
		url:"/employee/get.do?empJobid="+manageEmpjobid+"&deptId="+deptId,
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
				var deptName = "";
				for(var i = 0; i < result.data.deptNameList.length; i++){
					deptName += result.data.deptNameList[i]+" ";
				}
				$(".span-deptName").text(deptName);
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

//跳转至操作人详情页面
$(".a_detailOperatorEmployeeByManagerEmployee").click(function(){
	var empJobId = $(this).next().text();
	window.location.href = "/employee/toEmployeeDetail.do?empJobId="+empJobId;
});
//跳转到操作人职工详情页面
$(".a-addEmpName").click(function(){
	var empJobId = $(this).next().text();
	window.location.href = "/employee/toEmployeeDetail.do?empJobId="+empJobId;
});
//跳转到审核人职工详情页面
$(".a-checkEmpName").click(function(){
	var empJobId = $(this).next().text();
	window.location.href = "/employee/toEmployeeDetail.do?empJobId="+empJobId;
});
//跳转至合同详情页面
$(".a_detailContract").click(function(){
	var conId = $(".a_detailContract").parent().parent().children().first().text();
	window.location.href="/contract/detailContract.do?conId="+conId;
});