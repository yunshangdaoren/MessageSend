//定义全局部门查询要跳转的地址
var href = "http://localhost:8080/phone/page_phoneList.do?pageNum=";
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
			window.location.href = "/phone/page_phoneList.do?pageNum="+pageNum+"&"+$("#form-queryDept").serialize();
		}
	}else{
		alert("请输入正确的页码！")
	}
});

//添加库路径按钮点击事件
$("#btn-addLibrary").click(function() {
	//显示弹出层面板
	$(".shadeDiv").show();
	$(".panel_addLibrary").show();
	//发送Ajax请求获取库类型信息
	$.ajax({
		url:"/libraryType/libraryTypeList.do",
		dataType:"json",
		async:false,
		success:function(result){
			if(result.code==200){
				//先清空值（除了第一个）
				$("#select-AddlibType option:not(:first)").remove();
				//添加值
				for(var i =0; i < result.data.length; i++){
					$("#select-AddlibType").append("<option value='"+result.data[i].libtypeId+"'>"+result.data[i].name+"</option>")
				}
			}else{
				alert("获取信息失败！");
			}
		}
	});
});
//添加库路径面板提交按钮点击事件
$("#btn-submitAddPhone").click(function(){
	if(addPhoneFormEmptyCheck()){
		$.ajax({
			url:"/phone/addPhone.do",
			data:$("#form-addDept").serialize(),
			dataType:"json",
			success:function(result){
				if(result.code==200){
					alert(result.msg);
					$(".shadeDiv").hide();
					$(".panel_addPhone").hide();
					location.reload();
				}else{
					alert(result.msg);
				}
			}
		});
	};
});
//按钮点击事件：关闭添加库路径面板
$("#btn-hidePanelAddLibrary").click(function(){
	//关闭弹出层面板
	$(".shadeDiv").hide();
	$(".panel_addLibrary").hide();
});
//添加库路径面板非空判断
function addPhoneFormEmptyCheck(){
	if($("#input-addPhoneName").val()==''){
		alert("姓名不能为空！");
		$("#input-addPhoneName").focus();
		return false;
	}
	if($("#input-addPhoneNumber").val()==''){
		alert("号码不能为空！");
		$("#input-addPhoneNumber").focus();
		return false;
	}
	//上面判断无误则返回true
	return true;
}

//添加库路径信息，为库类型信息下拉框赋值
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
