//定义全局部门查询要跳转的地址
var href = "http://localhost:8080/department/toDepartmentList.do?pageNum=";
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
			window.location.href = "/department/toDepartmentList.do?pageNum="+pageNum+"&"+$("#form-queryDept").serialize();
		}
	}else{
		alert("请输入正确的页码！")
	}
});

//显示添加部门弹出层面板,并给部门级别和部门状态信息下拉框赋值
$("#btn-addDept").click(function(){
	//显示弹出层面板
	$(".shadeDiv").show();
	$(".panel_addDepartment").show();
	//发送Ajax请求获取部门级别信息
	$.ajax({
		url:"/departmentLevel/list.do",
		dataType:"json",
		async:false,
		success:function(result){
			if(result.code==200){
				//先清空值（除了第一个）
				$("#select-addDeptLevel option:not(:first)").remove();
				//添加值
				for(var i =0; i < result.data.length; i++){
					$("#select-addDeptLevel").append("<option value='"+result.data[i].dlId+"'>"+result.data[i].levelDesc+"</option>")
				}
				//alert("开始获取部门状态信息");
				//发送Ajax请求获取部门状态信息
				$.ajax({
					url:"/status/listDepartment.do",
					dataType:"json",
					async:false,
					success:function(result){
						//alert("开始获取部门状态信息成功");
						if(result.code==200){
							//先清空值（除了第一个）
							$("#select-addDeptStatus option:not(:first)").remove();
							//添加值
							for(var i =0; i < result.data.length; i++){
								$("#select-addDeptStatus").append("<option value='"+result.data[i].statusId+"'>"+result.data[i].statusName+"</option>")
							}
						}else{
							alert("获取信息失败！");
						}
					}
				});
			}else{
				alert("获取信息失败！");
			}
		}
	});
});
//添加部门信息弹出层面板提交按钮点击事件
$("#btn-submitEditSC").click(function(){
	if(addDeptFormEmptyCheck()){
		$.ajax({
			url:"/department/add.do",
			data:$("#form-addDept").serialize(),
			dataType:"json",
			success:function(result){
				if(result.code==200){
					alert(result.msg);
					$(".shadeDiv").hide();
					$(".panel_addDepartment").hide();
					location.reload();
				}else{
					alert(result.msg);
				}
			}
		});
	};
});
//关闭添加部门信息弹出层面板
$("#btn-hidePanelAddDepartment").click(function(){
	$(".shadeDiv").hide();
	$(".panel_addDepartment").hide();
});

//监听添加部门信息弹出层中上级部门名称输入框输入值，并动态查找指定部门信息赋值给下拉选项列表
$("#input-addParentDeptName").bind("input propertychange", function(){
	//部门名称
	var deptName = $("#input-addParentDeptName").val();
	$("#select-deptId").empty();
	$("#select-deptId").show();
	$.ajax({
		url:"/department/queryLikeDeptName.do?deptName="+deptName,
		dataType:"json",
		success:function(result){
			if(result.code==200){
				$.each(result.data, function(i, item){
					$("#select-deptId").append("<option value='"+item.deptId+"'>"+item.deptName+"</option>");
				});
			}
		}
	});
});
//监听添加部门主管职位信息弹出层中主管职位信息输入框输入值，并动态查找指定职位信息赋值给下拉选项列表
$("#input-addManagePositionName").bind("input propertychange", function(){
	//部门名称
	var positionName = $("#input-addManagePositionName").val();
	$("#select-positionId").empty();
	$("#select-positionId").show();
	$.ajax({
		url:"/position/queryLikePositionName.do?positionName="+positionName,
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
//监听上级部门信息输入框鼠标光标移除事件
$("#input-addParentDeptName").focus(function(){
	$("#select-deptId").show();
})
//添加职位信息弹出层：职位所属部门、上级职位信息输入框鼠标移出
$("#div-parentDeptName").mouseover(function(){
	//鼠标移入
	$("#select-deptId").show();
}).mouseout(function(){
	//鼠标移出
	$("#select-deptId").hide();
});
$("#div-managePositionName").mouseover(function(){
	//鼠标移入
	$("#select-positionId").show();
}).mouseout(function(){
	//鼠标移出
	$("#select-positionId").hide();
});

//添加部门信息弹出层下拉列表上级部门信息双击事件
$("#select-deptId").dblclick(function(){
	//获取到选择的下拉列表的值
	var options = $("#select-deptId option:selected");
	$("#select-deptId").hide();
	$("#input-addParentDeptName").empty();
	$("#input-addParentDeptName").val(options.text());
	$("#input-addParentId").val(options.val());
});
//添加部门信息弹出层的下拉列表主管职位信息双击事件
$("#select-positionId").dblclick(function(){
	//获取到选择的下拉列表的值
	var options = $("#select-positionId option:selected");
	$("#select-positionId").hide();
	$("#input-addManagePositionName").empty();
	$("#input-addManagePositionName").val(options.text());
	$("#input-addManagePositionid").val(options.val());
});

//添加部门弹出层面板非空判断
function addDeptFormEmptyCheck(){
	if($("#input-addDeptName").val()==''){
		alert("部门名称不能为空！");
		$("#input-addDeptName").focus();
		return false;
	}
	if($("#select-addDeptLevel").val()==null){
		alert("部门级别不能为空！");
		$("#select-addDeptLevel").focus();
		return false;
	}
	if($("#select-addDeptStatus").val()==null){
		alert("部门状态不能为空！");
		$("#select-addDeptStatus").focus();
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
$(".a_detailManageEmployeeByNormalEmployee").click(function(){
	//获取到要查看的职工工号
	var manageEmpjobId = $(this).next().text();
	//显示面板
	$(".shadeDiv").show();
	$(".panel_employeeDetail").show();
	//发送Ajax请求
	$.ajax({
		url:"/employee/get.do?empJobId="+manageEmpjobId,
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

//a_updateDepartment
//弹出显示层，显示要修改的指定部门信息
$(".a_updateDepartment").click(function(){
	//获取到部门id
	var deptId = $(this).parent().parent().children().first().text();
	//显示面板
	$(".shadeDiv").show();
	$(".panel_updateDepartment").show();
	//发送Ajax请求
	$.ajax({
		url:"/department/get.do?deptId="+deptId,
		dataType:"json",
		type:"post",
		success:function(result){
			if(result.code==200){
				//填充部门信息
				$("#input-updateDeptId").val(result.data.deptId);
				$("#input-updateDeptName").val(result.data.deptName);
				$("#input-updateParentDeptName").val(result.data.parentDeptName);
				$("#input-updateParentId").val(result.data.parentId);
				$("#input-updateManagePositionName").val(result.data.managePositionName);
				$("#input-updateManagePositionid").val(result.data.managePositionid);
				$("#input-updateDeptDesc").text(result.data.deptDesc);
				//修改部门信息，为部门级别信息下拉框赋值
				setUpdateDeptLevelSelect();
				//修改部门信息，为部门状态信息下拉框赋值
				setUpdateDeptStatusSelect();
			}else{
				alert(result.msg);
			}
		}
	});
});
//修改部门信息弹出层面板提交按钮点击事件
$("#btn-submitUpdateDepartment").click(function(){
	if(updateDeptFormEmptyCheck()){
		$.ajax({
			url:"/department/update.do",
			data:$("#form-updateDept").serialize(),
			dataType:"json",
			success:function(result){
				if(result.code==200){
					alert(result.msg);
					$(".shadeDiv").hide();
					$(".panel_updateDepartment").hide();
					location.reload();
				}else{
					alert(result.msg);
				}
			}
		});
	};
});

//关闭修改部门信息弹出层面板
$("#btn-hidePanelUpdateDepartment").click(function(){
	$(".shadeDiv").hide();
	$(".panel_updateDepartment").hide();
});

//监听修改部门信息弹出层中上级部门名称输入框输入值，并动态查找指定部门信息赋值给下拉选项列表
$("#input-updateParentDeptName").bind("input propertychange", function(){
	//部门名称
	var deptName = $("#input-updateParentDeptName").val();
	$("#select-updateDeptId").empty();
	$("#select-updateDeptId").show();
	$.ajax({
		url:"/department/queryLikeDeptName.do?deptName="+deptName,
		dataType:"json",
		success:function(result){
			if(result.code==200){
				$.each(result.data, function(i, item){
					$("#select-updateDeptId").append("<option value='"+item.deptId+"'>"+item.deptName+"</option>");
				});
			}
		}
	});
});
//监听修改部门主管职位信息弹出层中主管职位信息输入框输入值，并动态查找指定职位信息赋值给下拉选项列表
$("#input-updateManagePositionName").bind("input propertychange", function(){
	//部门名称
	var positionName = $("#input-updateManagePositionName").val();
	$("#select-updatePositionId").empty();
	$("#select-updatePositionId").show();
	$.ajax({
		url:"/position/queryLikePositionName.do?positionName="+positionName,
		dataType:"json",
		success:function(result){
			if(result.code==200){
				$.each(result.data, function(i, item){
					$("#select-updatePositionId").append("<option value='"+item.positionId+"'>"+item.positionName+"</option>");
				});
			}
		}
	});
});
//监听修改上级部门信息输入框鼠标光标移除事件
$("#input-updateParentDeptName").focus(function(){
	$("#select-updateDeptId").show();
})
//修改部门信息弹出层：上级部门、主管职位信息输入框鼠标移出
$("#div-updateParentDeptName").mouseover(function(){
	//鼠标移入
	$("#select-updateDeptId").show();
}).mouseout(function(){
	//鼠标移出
	$("#select-updateDeptId").hide();
});
$("#div-updateManagePositionName").mouseover(function(){
	//鼠标移入
	$("#select-updatePositionId").show();
}).mouseout(function(){
	//鼠标移出
	$("#select-updatePositionId").hide();
});

//修改部门信息弹出层下拉列表上级部门信息双击事件
$("#select-updateDeptId").dblclick(function(){
	//获取到选择的下拉列表的值
	var options = $("#select-updateDeptId option:selected");
	$("#select-updateDeptId").hide();
	$("#input-updateParentDeptName").empty();
	$("#input-updateParentDeptName").val(options.text());
	$("#input-updateParentId").val(options.val());
});
//修改部门信息弹出层的下拉列表主管职位信息双击事件
$("#select-updatePositionId").dblclick(function(){
	//获取到选择的下拉列表的值
	var options = $("#select-updatePositionId option:selected");
	$("#select-updatePositionId").hide();
	$("#input-updateManagePositionName").empty();
	$("#input-updateManagePositionName").val(options.text());
	$("#input-updateManagePositionid").val(options.val());
});

//修改部门弹出层面板非空判断
function updateDeptFormEmptyCheck(){
	if($("#input-updateDeptName").val()==''){
		alert("部门名称不能为空！");
		$("#input-updateDeptName").focus();
		return false;
	}
	if($("#select-updateDeptLevel").val()==null){
		alert("部门级别不能为空！");
		$("#select-updateDeptLevel").focus();
		return false;
	}
	if($("#select-updateDeptStatus").val()==null){
		alert("部门状态不能为空！");
		$("#select-updateDeptStatus").focus();
		return false;
	}
	//上面判断无误则返回true
	return true;
}
//修改部门信息，为部门级别信息下拉框赋值
function setUpdateDeptLevelSelect(){
	$.ajax({
		url:"/departmentLevel/list.do",
		dataType:"json",
		async:false,
		success:function(result){
			if(result.code==200){
				//先清空值（除了第一个）
				$("#select-updateDeptLevel option:not(:first)").remove();
				//添加值
				for(var i =0; i < result.data.length; i++){
					$("#select-updateDeptLevel").append("<option value='"+result.data[i].dlId+"'>"+result.data[i].levelDesc+"</option>")
				}
			}else{
				alert("获取信息失败！");
			}
		}
	});
};

//修改部门信息，为部门状态信息下拉框赋值
function setUpdateDeptStatusSelect(){
	$.ajax({
		url:"/status/listDepartment.do",
		dataType:"json",
		async:false,
		success:function(result){
			if(result.code==200){
				//先清空值（除了第一个）
				$("#select-updateDeptStatus option:not(:first)").remove();
				//添加值
				for(var i =0; i < result.data.length; i++){
					$("#select-updateDeptStatus").append("<option value='"+result.data[i].statusId+"'>"+result.data[i].statusName+"</option>")
				}
			}else{
				alert("获取信息失败！");
			}
		}
	});
};

//删除部门信息点击事件
$(".a_deleteDepartment").click(function(){
	var value = confirm("删除该部门信息？");
	//如果确认删除
	if(value == true){
		var deptId = $(this).parent().parent().children().first().text();
		$.ajax({
			url:"/department/delete.do?deptId="+deptId,
			dataType:"json",
			success:function(result){
				if(result.code==100){
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

//跳转到指定部门的详细信息页面
$(".a_departmentDetail").click(function(){
	//获取到部门id
	var deptId = $(this).parent().parent().children().first().text();
	window.location.href = "/department/toDepartmentDetail.do?deptId="+deptId;
});
//跳转到指定职位的详细信息页面
$(".a_detailManagePosition").click(function(){
	//获取到职位id
	var positionId = $(this).next().text();
	window.location.href = "/position/toPositionDetail.do?positionId="+positionId;
});
//跳转到部门主管人职工详情页面
$(".a_detailManageEmployeeByManagerEmployee").click(function(){
	var empJobId = $(this).next().text();
	window.location.href = "/employee/toEmployeeDetail.do?empJobId="+empJobId;
});
//跳转到部门操作人职工详情页面
$(".a_detailOperatorEmployeeByManagerEmployee").click(function(){
	var empJobId = $(this).next().text();
	window.location.href = "/employee/toEmployeeDetail.do?empJobId="+empJobId;
});


