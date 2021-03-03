//定义全局部门查询要跳转的地址
var href = "/departmentLevel/query.do?pageNum=";
//当前页码
var pageNum = parseInt($(".i-pageNum").text());
//总页码
var totalPages = parseInt($(".i-totalPages").text());
//首页点击事件
$(".a-indexPage").click(function(){
	query(0);
});
//上一页点击事件
$(".a-prePage").click(function(){
	if(pageNum-1 <= 0){
		query(0);
	}else{
		query(pageNum-1);
	}
});
//下一页点击事件
$(".a-nextPage").click(function(){
	if(pageNum+1 > totalPages){
		query(totalPages);
	}else{
		query((pageNum+1));
	}
});
//尾页点击事件
$(".a-endPage").click(function(){
	query(totalPages);
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
			query(pageNum);
		}
	}else{
		alert("请输入正确的页码！")
	}
});
//部门级别点击事件：查询该级别对应的所有部门信息并赋值给下拉列表
$("select").click(function(){
	//alert($(this).attr("id"));
	//部门级别值
	var level = $(this).attr("id");
	//上级部门id
	var parentDeptId;
	if(level-1 >0){
		parentDeptId = $("#"+(level-1)).val();
	}else{
		parentDeptId = 0;
	}
	$.ajax({
		url:"/department/getChildDepartmentList.do?level="+level+"&parentDeptId="+parentDeptId,
		dataType:"json",
		success:function(result){
			if(result.code==200){
				//先清空值（除了第一个）
				$("#"+level+" option:not(:first)").remove();
				//添加值
				for(var i =0; i < result.data.length; i++){
					$("#"+level).append("<option value='"+result.data[i].deptId+"'>"+result.data[i].deptName+"</option>");
				}
			}else{
				alert(result.msg);
			}
		}
	});
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
//部门信息操作人名称点击事件：弹出显示层，显示指定职工的详细信息
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

//查询点击事件
$("#btn-selectDeptLevel").click(function(){
	query(0);
});
//分页查询方法
function query(pageNum){
	$.ajax({
		url:href+pageNum,
		data:$("#form-queryDeptLevel").serialize(),
		dataType:"json",
		success:function(result){
			if(result.code==200){
				//转换日期
				var lastOperatorDate;
				//先清空值（除了第一个）
				$("#table-deptLevelDtail tr:not(:first)").remove();
				//添加值
				for(var i =0; i < result.pageResult.content.length; i++){
					//lastOperatorDate = result.pageResult.content[i].lastOperatorDate.Format("yyyy-MM-dd HH:mm:ss");
					$("#table-deptLevelDtail").append("<tr>"+
							"<td>"+result.pageResult.content[i].deptId+"</td>"+
							"<td>"+result.pageResult.content[i].deptName+"</td>"+
							"<td>"+result.pageResult.content[i].dlLeve+"级</td>"+
							"<td>"+
								"<a href='#' class='a-manageEmpName'>"+result.pageResult.content[i].manageEmpName+"</a>"+
								"<i style='display:none;'>"+result.pageResult.content[i].manageEmpjobid+"</i>"+
							"</td>"+
							"<td>"+result.pageResult.content[i].deptEmpnum+"</td>"+
							"<td>"+result.pageResult.content[i].parentDeptName+"</td>"+
							"<td class='td-hideContent'>"+result.pageResult.content[i].statusName+"</td>"+
							"<td>"+result.pageResult.content[i].lastOperatorDate+"</td>"+
							"<td>"+
								"<a href='#' class='a-operatorEmpName'>"+result.pageResult.content[i].operatorEmpName+"</a>"+
								"<i style='display:none;'>"+result.pageResult.content[i].operatorEmpjobid+"</i>"+
							"</td>"+
							"<td>"+
								"<a class='a_deptDetail' href='/department/detail.do'>"+
					    			"<span class='label label-primary'>详情</span>"+
					    		"</a>"+
					    	"</td>"+
					    	"<td>"+
								"<a class='a_deptStatus' href='#' style='text-decoration:none;'>"+
					    			"<span class='label label-primary'>状态管理</span>"+
					    		"</a>"+
					    	"</td>"+
						"</tr>");
				}
				//重新赋值页码
				//当前页码
				$(".i-pageNum").text(""+result.pageResult.pageNum);
				$(".span-currentPage").text("当前第"+result.pageResult.pageNum+"页");
				//总页码
				$(".i-totalPages").text(""+result.pageResult.totalPages);
				$(".span-totalPages").text("共"+result.pageResult.totalPages+"页");
			}else{
				alert(result.msg);
				//先清空值（除了第一个）
				$("#table-deptLevelDtail tr:not(:first)").remove();
				//重新赋值页码
				//当前页码
				$(".i-pageNum").text("0");
				$(".span-currentPage").text("当前第0页");
				//总页码
				$(".i-totalPages").text("0");
				$(".span-totalPages").text("共0页");
			}
		}
	});
}
//重置查询条件按钮点击事件
$("#btn-resetSelect").click(function(){
	$("#form-queryDeptLevel")[0].reset();
	//$("#queryDeptLevel option:first").prop("selected", 'selected')
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

//监听添加部门信息弹出层中部门名称输入框输入值，并动态查找指定部门信息赋值给下拉选项列表
$("#input-addParentDeptName").bind("input propertychange", function(event){
	//alert($("#input-addParentDeptName").val());
});
//添加部门弹出层面板非空判断
function addDeptFormEmptyCheck(){
	if($("#input-addDeptName").val()==''){
		alert("部门名称不能为空！");
		$("#addDeptName").focus();
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
//弹出显示层，显示指定部门的详细信息
$(".a_departmentDetail").click(function(){
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
//修改职位信息弹出层：职位所属部门、上级职位信息输入框鼠标移出
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
