//定义全局部门查询要跳转的地址
var href = "http://localhost:8080/employeeResign/toEmployeeResignList.do?pageNum=";
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
			window.location.href = "/employee/toEmployeeResignList.do?pageNum="+pageNum+"&"+$("#form-queryDept").serialize();
		}
	}else{
		alert("请输入正确的页码！")
	}
});

//重置查询条件按钮点击事件
$("#btn-resetSelect").click(function(){
	$("#form-queryDept :input").not(":button, :submit, :reset, :hidden").val("").removeAttr("checked").remove("selected");
});

//离职申请按钮点击事件，跳转到填写离职申请单页面
$("#btn-toAddEmployeeResignInfo").click(function(){
	window.location.href = "/employeeResign/toAddEmployeeResignInfo.do";
});

//离职申请单详情点击事件，跳转到离职申请单详情页面
$(".a_detailEmployeeResign").click(function(){
	//离职申请单id
	var resignId = $(this).parent().parent().children().first().text();
	window.location.href = "/employeeResign/toEmployeeResignDetail.do?resignId="+resignId;
});

//跳转至合同详情页面
$(".a_detailContract").click(function(){
	var empJobId = $(this).parent().parent().children().eq(1).text();
	var deptId = $(this).parent().parent().children().eq(3).children().eq(1).text();
	var positionId = $(this).parent().parent().children().eq(4).children().eq(1).text();
	window.location.href="/contract/detailContract.do?deptId="+deptId+"&positionId="+positionId+"&empJobId="+empJobId;
});
//跳转到职工详情页面
$(".a_detailEmployeeByManagerEmployee").click(function(){
	var empJobId = $(this).parent().parent().children().eq(1).text();
	window.location.href = "/employee/toEmployeeDetail.do?empJobId="+empJobId;
});
