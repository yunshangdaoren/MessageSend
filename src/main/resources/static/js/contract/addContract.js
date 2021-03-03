//添加合同信息弹出层面板提交按钮点击事件
$("#btn-submitAddContract").click(function(){
	if(addContractFormEmptyCheck()){
		$.ajax({
			url:"/contract/add.do",
			data:$("#form-addContract").serialize(),
			dataType:"json",
			success:function(result){
				if(result.code==200){
					alert(result.msg);
					window.location.href="/contract/toAllContractList.do";
				}else{
					alert(result.msg);
				}
			}
		});
	}
});

//监听添加职位信息弹出层中合同所属部门名称输入框输入值，并动态查找指定部门信息赋值给下拉选项列表
$("#input-addDeptName").bind("input propertychange", function(){
	//部门名称
	var deptName = $("#input-addDeptName").val();
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
//监听添加职位信息弹出层中合同所属职位信息输入框输入值，并动态查找指定职位信息赋值给下拉选项列表
$("#input-addPositionName").bind("input propertychange", function(){
	//部门名称
	var positionName = $("#input-addPositionName").val();
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
//监听职位所属部门、上级职位信息输入框鼠标光标移除事件
$("#input-addDeptName").focus(function(){
	$("#select-deptId").show();
})
//添加职位信息弹出层：职位所属部门、上级职位信息输入框鼠标移出
$("#div-infoDeptName").mouseover(function(){
	//鼠标移入
	$("#select-deptId").show();
}).mouseout(function(){
	//鼠标移出
	$("#select-deptId").hide();
});
$("#div-positionName").mouseover(function(){
	//鼠标移入
	$("#select-positionId").show();
}).mouseout(function(){
	//鼠标移出
	$("#select-positionId").hide();
});

//添加职位信息弹出层的下拉列表部门信息双击事件
$("#select-deptId").dblclick(function(){
	//获取到选择的下拉列表的值
	var options = $("#select-deptId option:selected");
	$("#select-deptId").hide();
	$("#input-addDeptName").empty();
	$("#input-addDeptName").val(options.text());
	$("#input-addDeptId").val(options.val());
});
//添加职位信息弹出层的下拉列表上级职位信息双击事件
$("#select-positionId").dblclick(function(){
	//获取到选择的下拉列表的值
	var options = $("#select-positionId option:selected");
	$("#select-positionId").hide();
	$("#input-addPositionName").empty();
	$("#input-addPositionName").val(options.text());
	$("#input-addPositionId").val(options.val());
});
//添加合同信息弹出层面板非空判断
function addContractFormEmptyCheck(){
	if($("#input-empName").val()==''){
		alert("职工姓名不能为空！");
		$("#input-empName").focus();
		return false;
	}
	if($("#input-empIdcard").val()==''){
		alert("职工身份证号不能为空！");
		$("#input-empIdcard").focus();
		return false;
	}
	if($("#input-addDeptName").val()==''){
		alert("合同所属部门不能为空！");
		$("#input-addDeptName").focus();
		return false;
	}
	if($("#input-addPositionName").val()==''){
		alert("合同所属职位不能为空！");
		$("#input-addPositionName").focus();
		return false;
	}
	if($("#input-beginDate").val()==''){
		alert("合同开始日期不能为空！");
		$("#input-beginDate").focus();
		return false;
	}
	if($("#input-endDate").val()==''){
		alert("合同结束日期不能为空！");
		$("#input-endDate").focus();
		return false;
	}
	if($("#input-signDate").val()==''){
		alert("合同签订日期不能为空！");
		$("#input-signDate").focus();
		return false;
	}
	if($("#input-monthlySalary").val()==''){
		alert("合同月薪不能为空！");
		$("#input-monthlySalary").focus();
		return false;
	}
	//上面判断无误则返回true
	return true;
}
