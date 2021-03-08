<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>组织架构</title>
<link href="/static/css/phone/page_phoneList.css" rel="stylesheet" />
</head>
<body>
	<div class="bodys">
		<%@ include file="../top.jsp"%>
		<div id="center">
			<%@ include file="../leftNav.jsp"%>
			<div id="right">
				<span class="title">号码列表</span>
				<ul class="nav nav-tabs">
					<li role="presentation" class="active"><a href="/libraryView/page_libraryList.do">号码列表</a></li>
				</ul>
				<div class="div_search">
					<form class="form-inline" id="form-queryDept" method="get"
						action="#">
						<div class="form-group">
							<label for="exampleInputName2">姓名</label> <input type="text"
								class="form-control" name="deptName" id="input-selectDeptName"
								value="${deptNameStr }">
						</div>
						<div class="form-group">
							<label for="exampleInputName2">号码</label> <input type="text"
								class="form-control" name="deptName" id="input-selectDeptName"
								value="${deptNameStr }">
						</div>
						<button id="btn-resetSelect" type="button" class="btn btn-danger">重置</button>
						<button id="btn-selectDept" type="submit" class="btn btn-danger">查询</button>
						<c:if test="${roles.roleId!=3 }">
							<button id="btn-addPhone" type="button" class="btn btn-success">添加号码</button>
						</c:if>
					</form>
				</div>
				<table class="table table-hover" id="table-deptDtail">
					<thead>
						<tr>
							<th>序号</th>
							<th>姓名</th>
							<th>号码</th>
							<th>操作</th>
						</tr>
					</thead>
					<tbody>
						<c:forEach items="${pageResult.content }" var="phone">
							<tr>
								<td>${phone.phoneId }</td>
								<td>${phone.name }</td>
								<td>${phone.number }</td>
								<td>
									<a class="a_updateDepartment" href="#" style="text-decoration:none;">
					    				<span class="label label-primary">编辑</span>
					    			</a>
					    			<a class="a_deleteDepartment" href="#" style="text-decoration:none;">
					    				<span class="label label-danger">删除</span>
					    			</a>
								</td>
							<tr>
						</c:forEach>
					</tbody>
				</table>
				<!-- 分页代码 -->
				<div class="pageNav">
					<ul class="pagination">
						<li><a href="#" class="a-indexPage">首页</a></li>
						<li><a href="#" class="a-prePage">上一页</a></li>
						<li><span style="line-height: 1.42857143;"
							class="span-currentPage">当前第${pageResult.pageNum }页</span> <i
							style="display: none;" class="i-pageNum">${pageResult.pageNum }</i>
						</li>
						<li><a href=# " class="a-nextPage">下一页</a></li>
						<li><a href="#" class="a-endPage">尾页</a> <i
							style="display: none;" class="i-totalPages">${pageResult.totalPages }</i>
						</li>
						<li><span style="line-height: 1.42857143;"
							class="span-totalPages">共${pageResult.totalPages }页</span></li>
					</ul>
					<div class="input-group" style="width: 146px; float: right;">
						<input id="input-pageNum" type="text" class="form-control" style="z-index: 0;"> 
						<span id="span-jumPageNum" class="input-group-addon" style="cursor: pointer;">跳转至该页</span>
					</div>
				</div>
			</div>
		</div>
		<%@ include file="../bottom.jsp"%>
		
		<!-- 弹出遮罩层，用于添加号码信息 -->
		<div class="panel_addPhone">
			<div class="div-panel">
    			<div class="panel-heading">
    				<label>添加号码信息</label>
    				<button id="btn-hidePanelAddPhone" type="button" class="btn btn-success">退出</button>
    			</div>
    			<div class="panel_body">
    				<form style="width:100%;" id="form-addDept" class="form-horizontal" role="form">
  						<div class="form-group" style="margin-top:10px;">
    						<label for="name" class="col-sm-3 control-label">姓名</label>
    						<div class="col-sm-8">
      							<input type="text" class="form-control" name="name" id="input-addPhoneName">
    						</div>
  						</div>
  						<div class="form-group" style="margin-top:10px;">
    						<label for="number" class="col-sm-3 control-label">号码</label>
    						<div class="col-sm-8">
      							<input type="text" class="form-control" name="number" id="input-addPhoneNumber">
    						</div>
  						</div>
  						<div class="form-group">
    						<div class="col-sm-offset-3 col-sm-9">
      							<button id="btn-submitAddPhone" type="button" class="btn btn-primary">提交</button>
    						</div>
 	 					</div>
					</form>
    			</div>
			</div>
		</div>
		
		
		
	</div>
</body>
<script type="text/javascript"
	src="/static/js/phone/page_phoneList.js"></script>
</html>