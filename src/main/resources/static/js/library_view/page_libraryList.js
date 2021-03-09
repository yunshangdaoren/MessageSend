//定义全局部门查询要跳转的地址
var href = "http://localhost:8080/phone/page_phoneList.do?pageNum=";
//当前页码
var pageNum = parseInt($(".i-pageNum").text());
//总页码
var totalPages = parseInt($(".i-totalPages").text());
//首页点击事件
$(".a-indexPage").click(function() {
	window.location.href = href + "0&" + $("#form-queryDept").serialize();
});
//上一页点击事件
$(".a-prePage").click(function() {
	if (pageNum - 1 <= 0) {
		window.location.href = href + "0&" + $("#form-queryDept").serialize();
	} else {
		window.location.href = href + "" + (pageNum - 1) + "&" + $("#form-queryDept").serialize();
	}
});
//下一页点击事件
$(".a-nextPage").click(function() {
	if (pageNum + 1 > totalPages) {
		window.location.href = href + "" + totalPages + "&" + $("#form-queryDept").serialize();
	} else {
		window.location.href = href + "" + (pageNum + 1) + "&" + $("#form-queryDept").serialize();
	}
});
//尾页点击事件
$(".a-endPage").click(function() {
	window.location.href = href + "" + totalPages + "&" + $("#form-queryDept").serialize();
});
//跳转至指定页码
$("#span-jumPageNum").click(function() {
	//获取要跳转到指定页码
	var pageNum = $("#input-pageNum").val();
	//获取总页码
	var totalPage = $(".span-totalPages").text().replace(/[^0-9]/ig, "");
	if ($.isNumeric(pageNum)) {
		totalPage = parseInt(totalPage);
		if (pageNum > totalPage || pageNum <= 0) {
			alert("请输入正确的页码！");
		} else {
			window.location.href = "/phone/page_phoneList.do?pageNum=" + pageNum + "&" + $("#form-queryDept").serialize();
		}
	} else {
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
		url: "/libraryType/libraryTypeList.do",
		dataType: "json",
		async: false,
		success: function(result) {
			if (result.code == 200) {
				//先清空值（除了第一个）
				$("#select-addlibType option:not(:first)").remove();
				//添加值
				for (var i = 0; i < result.data.length; i++) {
					if (i == 0) {
						$("#select-addlibType").append("<option selected value='" + result.data[i].libtypeId + "'>" + result.data[i].name + "</option>");
						if (result.data[i].name == "mysql") {
							//显示添加MySQL数据库名称输入框
							$("#div_addDatabaseName").show();
							//不显示添加Oracle SID输入框
							$("#div_addSID").hide();
						} else {
							//不显示添加MySQL数据库名称输入框
							$("#div_addDatabaseName").hide();
							//显示添加Oracle SID输入框
							$("#div_addSID").show();
						}
					} else {
						$("#select-addlibType").append("<option value='" + result.data[i].libtypeId + "'>" + result.data[i].name + "</option>");
					}
				}
			} else {
				alert("获取信息失败！");
			}
		}
	});
});
//监听添加库路径面板中，库类型下拉列表选项选择改变，实时改变面板中MySQL数据库名称和Oracle SID输入框显示与不显示
$('#select-addlibType').change(function() {
	if ($(this).children('option:selected').text() == "mysql") {
		//显示添加MySQL数据库名称输入框
		$("#div_addDatabaseName").show();
		//不显示添加Oracle SID输入框
		$("#div_addSID").hide();
	} else if ($(this).children('option:selected').text() == "oracle") {
		//不显示添加MySQL数据库名称输入框
		$("#div_addDatabaseName").hide();
		//显示添加Oracle SID输入框
		$("#div_addSID").show();
	}
});


//添加库路径面板提交按钮点击事件
$("#btn-submitAddLibrary").click(function() {
	//输入框非空判断
	if (addLibraryFormEmptyCheck()) {
		$.ajax({
			url: "/library/addLibrary.do",
			data: $("#form-addLibrary").serialize(),
			dataType: "json",
			success: function(result) {
				if (result.code==200) {
					alert(result.msg);
					$(".shadeDiv").hide();
					$(".panel_addLibrary").show();
					location.reload();
				}else{
					alert(result.msg);
				}
			}
		});
	}
});
//按钮点击事件：关闭添加库路径面板
$("#btn-hidePanelAddLibrary").click(function() {
	//关闭弹出层面板
	$(".shadeDiv").hide();
	$(".panel_addLibrary").hide();
});
//添加库路径面板非空判断
function addLibraryFormEmptyCheck() {
	if ($("#select-addlibType option:selected").text() == "请选择") {
		alert("库类型不能为空！");
		$("#select-addlibType").focus();
		return false;
	}
	if ($("#input-addPath").val() == '') {
		alert("库路径不能为空！");
		$("#input-addPath").focus();
		return false;
	}
	if ($("#input-addUserName").val() == '') {
		alert("库用户名不能为空！");
		$("#input-addUserName").focus();
		return false;
	}
	if ($("#input-addPassword").val() == '') {
		alert("库密码不能为空！");
		$("#input-addPassword").focus();
		return false;
	}
	//上面判断无误则返回true
	return true;
}

//添加库路径信息，为库类型信息下拉框赋值
function setUpdateDeptLevelSelect() {
	$.ajax({
		url: "/departmentLevel/list.do",
		dataType: "json",
		async: false,
		success: function(result) {
			if (result.code == 200) {
				//先清空值（除了第一个）
				$("#select-updateDeptLevel option:not(:first)").remove();
				//添加值
				for (var i = 0; i < result.data.length; i++) {
					$("#select-updateDeptLevel").append("<option value='" + result.data[i].dlId + "'>" + result.data[i].levelDesc + "</option>")
				}
			} else {
				alert("获取信息失败！");
			}
		}
	});
};


//库视图编辑按钮，鼠标放上去显示该库的视图详情信息面板
$(".a_editLibraryView").mouseenter(function(e) {
	//获取库ID
	var lbId = $(this).parent().parent().children().first().text();
	$(".panel_libraryViewDetail").show();
	//根据鼠标X，Y坐标位置设置显示面板绝对位置
	$(".panel_libraryViewDetail").css("left", e.pageX - 30 + "px");
	$(".panel_libraryViewDetail").css("top", e.pageY + 20 + "px");
	//发送Ajax请求
	$.ajax({
		url: "/library/libraryViewStr.do?lbId=" + lbId,
		dataType: "json",
		type: "post",
		success: function(result) {
			$(".panel_libraryViewDetail .panel-body").text(result.data);
		}
	});
}).mouseleave(function() {
	//发送Ajax请求
	$(".panel_libraryViewDetail").hide();
});

//库视图编辑按钮点击事件
$(".a_editLibraryView").click(function() {
	//获取库ID
	var lbId = $(this).parent().parent().children().first().text();
	window.location.href = "/view/page_viewListByLbId.do?lbId="+lbId;
});

















