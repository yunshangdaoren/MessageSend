//定义全局部门查询要跳转的地址
var href = "http://localhost:8080/position/positionList.do?pageNum=";
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
			window.location.href = "/position/positionList.do?pageNum="+pageNum+"&"+$("#form-queryDept").serialize();
		}
	}else{
		alert("请输入正确的页码！")
	}
});

//显示添加职位弹出层面板,并给职位级别和职位状态信息下拉框赋值
$("#btn-addPosition").click(function(){
	//显示弹出层面板
	$(".shadeDiv").show();
	$(".panel_addPosition").show();
	//发送Ajax请求获取职位级别信息
	$.ajax({
		url:"/positionLevel/list.do",
		dataType:"json",
		async:false,
		success:function(result){
			if(result.code==200){
				//先清空值（除了第一个）
				$("#select-addPositionLevel option:not(:first)").remove();
				//添加值
				for(var i =0; i < result.data.length; i++){
					$("#select-addPositionLevel").append("<option value='"+result.data[i].plId+"'>"+result.data[i].levelDesc+"</option>")
				}
				//发送Ajax请求获取职位状态信息
				$.ajax({
					url:"/status/listPosition.do",
					dataType:"json",
					async:false,
					success:function(result){
						if(result.code==200){
							//先清空值（除了第一个）
							$("#select-addPositionStatus option:not(:first)").remove();
							//添加值
							for(var i =0; i < result.data.length; i++){
								$("#select-addPositionStatus").append("<option value='"+result.data[i].statusId+"'>"+result.data[i].statusName+"</option>")
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
//添加职位信息弹出层面板提交按钮点击事件
$("#btn-submitEditPosition").click(function(){
	if(addPositionFormEmptyCheck()){
		$.ajax({
			url:"/position/add.do",
			data:$("#form-addPosition").serialize(),
			dataType:"json",
			success:function(result){
				if(result.code==200){
					alert(result.msg);
					$(".shadeDiv").hide();
					$(".panel_addPosition").hide();
					location.reload();
				}else{
					alert(result.msg);
				}
			}
		});
	};
});
//关闭添加职位信息弹出层面板
$("#btn-hidePanelAddPosition").click(function(){
	$(".shadeDiv").hide();
	$(".panel_addPosition").hide();
});

//监听添加职位信息弹出层中职位所属部门名称输入框输入值，并动态查找指定部门信息赋值给下拉选项列表
$("#input-addDeptName").bind("input propertychange", function(){
	//部门名称
	var deptName = $("#input-addDeptName").val();
	$("#select-infoDeptName").empty();
	$("#select-infoDeptName").show();
	$.ajax({
		url:"/department/queryLikeDeptName.do?deptName="+deptName,
		dataType:"json",
		success:function(result){
			if(result.code==200){
				$.each(result.data, function(i, item){
					$("#select-infoDeptName").append("<option value='"+item.deptId+"'>"+item.deptName+"</option>");
				});
			}
		}
	});
});
//监听添加职位信息弹出层中职位的上级职位信息输入框输入值，并动态查找指定上级职位信息赋值给下拉选项列表
$("#input-addParentPositionName").bind("input propertychange", function(){
	//部门名称
	var parentPositionName = $("#input-addParentPositionName").val();
	$("#select-parentPositionName").empty();
	$("#select-parentPositionName").show();
	$.ajax({
		url:"/position/queryLikePositionName.do?positionName="+parentPositionName,
		dataType:"json",
		success:function(result){
			if(result.code==200){
				$.each(result.data, function(i, item){
					$("#select-parentPositionName").append("<option value='"+item.positionId+"'>"+item.positionName+"</option>");
				});
			}
		}
	});
});
//监听职位所属部门、上级职位信息输入框鼠标光标移除事件
$("#input-addDeptName").focus(function(){
	$("#select-infoDeptName").show();
})
//添加职位信息弹出层：职位所属部门、上级职位信息输入框鼠标移出
$("#div-infoDeptName").mouseover(function(){
	//鼠标移入
	$("#select-infoDeptName").show();
}).mouseout(function(){
	//鼠标移出
	$("#select-infoDeptName").hide();
});
$("#div-parentPositionName").mouseover(function(){
	//鼠标移入
	$("#select-parentPositionName").show();
}).mouseout(function(){
	//鼠标移出
	$("#select-parentPositionName").hide();
});

//添加职位信息弹出层的下拉列表部门信息双击事件
$("#select-infoDeptName").dblclick(function(){
	//获取到选择的下拉列表的值
	var options = $("#select-infoDeptName option:selected");
	$("#select-infoDeptName").hide();
	$("#input-addDeptName").empty();
	$("#input-addDeptName").val(options.text());
	$("#input-addDeptId").val(options.val());
});
//添加职位信息弹出层的下拉列表上级职位信息双击事件
$("#select-parentPositionName").dblclick(function(){
	//获取到选择的下拉列表的值
	var options = $("#select-parentPositionName option:selected");
	$("#select-parentPositionName").hide();
	$("#input-addParentPositionName").empty();
	$("#input-addParentPositionName").val(options.text());
	$("#input-addParentPositionid").val(options.val());
});
//添加职位信息弹出层面板非空判断
function addPositionFormEmptyCheck(){
	if($("#input-addPositionName").val()==''){
		alert("职位名称不能为空！");
		$("#addPositionName").focus();
		return false;
	}
	if($("#select-addPositionLevel").val()==null){
		alert("职位级别不能为空！");
		$("#selec-addPositionLevel").focus();
		return false;
	}
	if($("#select-addPositionStatus").val()==null){
		alert("职位状态不能为空！");
		$("#select-addPositionStatus").focus();
		return false;
	}
	//上面判断无误则返回true
	return true;
}

//重置查询条件按钮点击事件
$("#btn-resetSelect").click(function(){
	$("#form-queryPosition :input").not(":button, :submit, :reset, :hidden").val("").removeAttr("checked").remove("selected");
});


//部门操作人名称点击事件：弹出显示层，显示指定职工的详细信息
$(".a_detailOperatorEmployeeByNormalEmployee").click(function(){
	//获取到要查看的职工工号
	var manageEmpjobid = $(this).next().text();
//	//获取到职工所属部门id
//	var deptId = $(this).parent().parent().children().first().text();
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

//删除职位信息点击事件
$(".a_deletePosition").click(function(){
	var value = confirm("删除该职位信息？");
	//如果确认删除
	if(value == true){
		var positionId = $(this).parent().parent().children().first().text();
		$.ajax({
			url:"/position/delete.do?positionId="+positionId,
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

//弹出显示层，显示要修改的指定部门信息
$(".a_updatePosition").click(function(){
	//获取到部门id
	var positionId = $(this).parent().parent().children().first().text();
	//显示面板
	$(".shadeDiv").show();
	$(".panel_updatePosition").show();
	//发送Ajax请求
	$.ajax({
		url:"/position/get.do?positionId="+positionId,
		dataType:"json",
		type:"post",
		success:function(result){
			if(result.code==200){
				//填充部门信息
				$("#input-updatePositionId").val(result.data.positionId);
				$("#input-updatePositionName").val(result.data.positionName);
				$("#input-updateDeptName").val(result.data.deptName);
				$("#input-updateDeptId").val(result.data.deptId);
				$("#input-updateIsOnly").val(result.data.isOnly);
				$("#input-updateParentPositionName").val(result.data.parentPositionName);
				$("#input-updateParentPositionid").val(result.data.parentPositionid);
				$("#input-updatePositionDesc").text(result.data.positionDesc);
				//修改职位信息，为职位级别信息下拉框赋值
				setUpdatePositionLevelSelect();
				//修改职位信息，为职位状态信息下拉框赋值
				setUpdatePositionStatusSelect();
			}else{
				alert(result.msg);
			}
		}
	});
});
//修改部门信息弹出层面板提交按钮点击事件
$("#btn-submitUpdatePosition").click(function(){
	if(updateDeptFormEmptyCheck()){
		$.ajax({
			url:"/position/update.do",
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
//关闭修改职位信息弹出层面板
$("#btn-hidePanelUpdatePosition").click(function(){
	$(".shadeDiv").hide();
	$(".panel_updatePosition").hide();
});
//监听修改职位信息弹出层中所属部门名称输入框输入值，并动态查找指定部门信息赋值给下拉选项列表
$("#input-updateDeptName").bind("input propertychange", function(){
	//部门名称
	var deptName = $("#input-updateDeptName").val();
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
//监听修改职位信息弹出层中，上级职位信息输入框输入值，并动态查找指定职位信息赋值给下拉选项列表
$("#input-updateParentPositionName").bind("input propertychange", function(){
	//部门名称
	var positionName = $("#input-updateParentPositionName").val();
	$("#select-updateParentPositionid").empty();
	$("#select-updateParentPositionid").show();
	$.ajax({
		url:"/position/queryLikePositionName.do?positionName="+positionName,
		dataType:"json",
		success:function(result){
			if(result.code==200){
				$.each(result.data, function(i, item){
					$("#select-updateParentPositionid").append("<option value='"+item.positionId+"'>"+item.positionName+"</option>");
				});
			}
		}
	});
});
//监听修改职位所属部门信息输入框鼠标光标移除事件
$("#input-updateDeptName").focus(function(){
	$("#select-updateDeptId").show();
})
//修改职位信息弹出层：职位所属部门、上级职位信息输入框鼠标移出
$("#div-updateDeptName").mouseover(function(){
	//鼠标移入
	$("#select-updateDeptId").show();
}).mouseout(function(){
	//鼠标移出
	$("#select-updateDeptId").hide();
});
$("#div-updateParentPositionName").mouseover(function(){
	//鼠标移入
	$("#select-updateParentPositionid").show();
}).mouseout(function(){
	//鼠标移出
	$("#select-updateParentPositionid").hide();
});

//修改职位信息弹出层下拉列表，职位所属部门信息双击事件
$("#select-updateDeptId").dblclick(function(){
	//获取到选择的下拉列表的值
	var options = $("#select-updateDeptId option:selected");
	$("#select-updateDeptId").hide();
	$("#input-updateDeptName").empty();
	$("#input-updateDeptName").val(options.text());
	$("#input-updateDeptId").val(options.val());
});
//修改职位信息弹出层的下拉列表，上级职位信息双击事件
$("#select-updateParentPositionid").dblclick(function(){
	//获取到选择的下拉列表的值
	var options = $("#select-updateParentPositionid option:selected");
	$("#select-updateParentPositionid").hide();
	$("#input-updateParentPositionName").empty();
	$("#input-updateParentPositionName").val(options.text());
	$("#input-updateParentPositionid").val(options.val());
});

//修改职位弹出层面板非空判断
function updateDeptFormEmptyCheck(){
	if($("#input-updatePositionName").val()==''){
		alert("职位名称不能为空！");
		$("#input-updatePositionName").focus();
		return false;
	}
	if($("#select-updatePositionLevel").val()==null){
		alert("职位级别不能为空！");
		$("#select-updatePositionLevel").focus();
		return false;
	}
	if($("#select-updatePositionStatus").val()==null){
		alert("职位状态不能为空！");
		$("#select-updatePositionStatus").focus();
		return false;
	}
	//上面判断无误则返回true
	return true;
}
//修改职位信息，为职位级别信息下拉框赋值
function setUpdatePositionLevelSelect(){
	$.ajax({
		url:"/positionLevel/list.do",
		dataType:"json",
		async:false,
		success:function(result){
			if(result.code==200){
				//先清空值（除了第一个）
				$("#select-updatePositionLevel option:not(:first)").remove();
				//添加值
				for(var i =0; i < result.data.length; i++){
					$("#select-updatePositionLevel").append("<option value='"+result.data[i].plId+"'>"+result.data[i].levelDesc+"</option>")
				}
			}else{
				alert("获取信息失败！");
			}
		}
	});
};

//修改职位信息，为职位状态信息下拉框赋值
function setUpdatePositionStatusSelect(){
	$.ajax({
		url:"/status/listPosition.do",
		dataType:"json",
		async:false,
		success:function(result){
			if(result.code==200){
				//先清空值（除了第一个）
				$("#select-updatePositionStatus option:not(:first)").remove();
				//添加值
				for(var i =0; i < result.data.length; i++){
					$("#select-updatePositionStatus").append("<option value='"+result.data[i].statusId+"'>"+result.data[i].statusName+"</option>")
				}
			}else{
				alert("获取信息失败！");
			}
		}
	});
};


//跳转到指定部门的详细信息页面
$(".a_departmentDetail").click(function(){
	//获取到部门id
	var deptId = $(this).next().text();
	window.location.href = "/department/toDepartmentDetail.do?deptId="+deptId;
});
//跳转到部门操作人职工详情页面
$(".a_detailOperatorEmployeeByManagerEmployee").click(function(){
	var empJobId = $(this).next().text();
	window.location.href = "/employee/toEmployeeDetail.do?empJobId="+empJobId;
});
//跳转到指定职位的详细信息页面
$(".a_positionDetail").click(function(){
	//获取到职位id
	var positionId = $(this).parent().parent().children().first().text();
	window.location.href = "/position/toPositionDetail.do?positionId="+positionId;
});
