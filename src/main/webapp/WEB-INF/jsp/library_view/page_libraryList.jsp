<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>组织架构</title>
<link href="/static/css/library_view/page_libraryList.css" rel="stylesheet" />
</head>
<body>
	<div class="bodys">
		<%@ include file="../top.jsp"%>
		<div id="center">
			<%@ include file="../leftNav.jsp"%>
			<div id="right">
				<span class="title">库路径列表</span>
				<ul class="nav nav-tabs">
					<li role="presentation" class="active"><a href="/libraryView/page_libraryList.do">库路径列表</a></li>
					<li role="presentation"><a href="/department/toMyDepartmentDetail.do">视图编辑</a></li>
				</ul>
				<div class="div_search">
					<form class="form-inline" id="form-queryDept" method="get"
						action="#">
						<div class="form-group">
							<label for="exampleInputName2">库路径</label> <input type="text"
								class="form-control" name="deptName" id="input-selectDeptName"
								value="${deptNameStr }">
						</div>
						<div class="form-group">
							<label for="exampleInputName2">库描述</label> <input type="text"
								class="form-control" name="deptName" id="input-selectDeptName"
								value="${deptNameStr }">
						</div>
						<button id="btn-resetSelect" type="button" class="btn btn-warning">重置</button>
						<button id="btn-selectDept" type="submit" class="btn btn-info">查询</button>
						<button id="btn-addLibrary" type="button" class="btn btn-primary">添加库路径</button>
					</form>
				</div>
				<table class="table table-hover" id="table-deptDtail">
					<thead>
						<tr>
							<th>序号</th>
							<th>库类型</th>
							<th>库路径</th>
							<th>端口号</th>
							<th>MySQL数据库名称</th>
							<th>Oracle SID</th>
							<th>用户名</th>
							<th>密码</th>
							<th>库视图</th>
							<th>库描述</th>
							<th>操作</th>
						</tr>
					</thead>
					<tbody>
						<c:forEach items="${pageResult.content }" var="library">
							<tr>
								<td>${library.lbId }</td>
								<td style="font-weight:600;color:blue;">${library.libTypeName }</td>
								<td>${library.path }</td>
								<td>${library.port }</td>
								<td>${library.databaseName }</td>
								<td>${library.sid }</td>
								<td>${library.userName }</td>
								<td>${library.password }</td>
								<td>
									<a class="a_editLibraryView" href="#" style="text-decoration:none;">
					    				<span class="label label-success">编辑</span>
					    			</a>
								</td>
								<td>${library.description }</td>
								<td>
									<a class="a_updateLibrary" href="#" style="text-decoration:none;">
					    				<span class="label label-warning">修改</span>
					    			</a>
					    			<a class="a_deleteLibrary" href="#" style="text-decoration:none;">
					    				<span class="label label-danger">删除</span>
					    			</a>
								</td>
							</tr>
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
						<input id="input-pageNum" type="text" class="form-control"
							style="z-index: 0;"> <span id="span-jumPageNum"
							class="input-group-addon" style="cursor: pointer;">跳转至该页</span>
					</div>
				</div>
			</div>
		</div>
		<%@ include file="../bottom.jsp"%>
		
		<!-- 弹出遮罩层，用于添加库路径信息 -->
		<div class="panel_addLibrary">
			<div class="div-panel">
    			<div class="panel-heading">
    				<label>添加库路径信息</label>
    				<button id="btn-hidePanelAddLibrary" type="button" class="btn btn-success">退出</button>
    			</div>
    			<div class="panel_body">
    				<form style="width:100%;" id="form-addLibrary" class="form-horizontal" role="form">
						<div class="form-group">
							<label for="lastname" class="col-sm-3 control-label">库类型</label>
							<div class="col-sm-8">
								<select class="form-control" name="libType_id"
									id="select-addlibType">
									<option value="" disabled selected hidden>请选择</option>
								</select>
							</div>
						</div>
						<div class="form-group" style="margin-top:10px;">
    						<label for="name" class="col-sm-3 control-label">库路径</label>
    						<div class="col-sm-8">
      							<input type="text" class="form-control" name="path" id="input-addPath">
    						</div>
  						</div>
  						<div class="form-group" style="margin-top:10px;">
    						<label for="name" class="col-sm-3 control-label">端口</label>
    						<div class="col-sm-8">
      							<input type="text" class="form-control" name="port" id="input-addPort">
    						</div>
  						</div>
  						<div class="form-group" style="margin-top:10px;display:none;" id="div_addDatabaseName">
    						<label for="name" class="col-sm-3 control-label">MySQL数据库名称</label>
    						<div class="col-sm-8">
      							<input type="text" class="form-control" name="databaseName" id="input-addDatabaseName">
    						</div>
  						</div>
  						<div class="form-group" style="margin-top:10px;display:none;" id="div_addSID">
    						<label for="name" class="col-sm-3 control-label">Oracle SID</label>
    						<div class="col-sm-8">
      							<input type="text" class="form-control" name=sid id="input-addSid">
    						</div>
  						</div>
  						<div class="form-group" style="margin-top:10px;">
    						<label for="number" class="col-sm-3 control-label">用户名</label>
    						<div class="col-sm-8">
      							<input type="text" class="form-control" name="userName" id="input-addUserName">
    						</div>
  						</div>
  						<div class="form-group" style="margin-top:10px;">
    						<label for="number" class="col-sm-3 control-label">密码</label>
    						<div class="col-sm-8">
      							<input type="text" class="form-control" name="password" id="input-addPassword">
    						</div>
  						</div>
  						<div class="form-group" style="margin-top:10px;">
    						<label for="number" class="col-sm-3 control-label">库描述</label>
    						<div class="col-sm-8">
      							<input type="text" class="form-control" name="description" id="input-addDescription">
    						</div>
  						</div>
  						<div class="form-group">
    						<div class="col-sm-offset-3 col-sm-9">
      							<button id="btn-submitAddLibrary" type="button" class="btn btn-primary">提交</button>
    						</div>
 	 					</div>
					</form>
    			</div>
			</div>
		</div>		
		
		<!-- 弹出层，用于显示库路径对应的视图详细信息 -->
		<div class="panel panel-primary panel_libraryViewDetail" style="display:show;position:absolute;">
			<div class="panel-heading">
    			<h5 class="panel-title">库视图详情</h5>
  			</div>
			<div class="panel-body"></div>
		</div>
		
		
	</div>

</body>
<script type="text/javascript"
	src="/static/js/library_view/page_libraryList.js"></script>
</html>