//添加合同信息弹出层面板提交按钮点击事件
$("#btn-submitAddEmployeeInfo").click(function(){
	$.ajax({
		url:"/employee/addEmployeeInfo.do",
		data:$("#form-addEmployeeInfo").serialize(),
		dataType:"json",
		success:function(result){
			if(result.code==200){
				alert(result.msg);
				window.location.href="/contract/needEntryContractList.do";
			}else{
				alert(result.msg);
			}
		}
	});
});

//返回按钮点击事件
$("#btn-reback").click(function(){
	history.go(-1);
});

