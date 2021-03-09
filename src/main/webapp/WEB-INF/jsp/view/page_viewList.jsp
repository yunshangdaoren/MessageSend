<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>组织架构</title>
<link href="/static/css/view/page_viewList.css" rel="stylesheet" />
</head>
<body>
	<div class="bodys">
		<%@ include file="../top.jsp"%>
		<div id="center">
			<%@ include file="../leftNav.jsp"%>
			<div id="right">
				<div class="div_search">
  					<button id="btn-viewListReturn" type="button" class="btn btn-success" style="margin-top:9px;width:70px;">返回</button>
				</div>
				<ul class="nav nav-tabs">
					<li role="presentation" class="active" style="margin-top:9px;"><a href="#">视图列表</a></li>
				</ul>
				<div class="div_search">
					<form class="form-inline" id="form-queryDept" method="get" action="#">
						<div class="form-group">
							<a href="#" id="a_pageViewListLibraryId" style="display:none;">${library.lbId}</a>
							<a class="a_updateDepartment" href="#" style="text-decoration:none;height:50px;">
					    		<span class="label label-info" style="font-size:17px;background-color:black;color:red;padding:7px;">
					    			库类型:${library.libTypeName }&nbsp;&nbsp;&nbsp;库路径:${library.path }&nbsp;&nbsp;&nbsp;库端口:${library.port }
					    		</span>
					    	</a>
							<label for="exampleInputName2" style="margin-left:90px;">视图名称</label> <input type="text"
								class="form-control" name="deptName" id="input-selectDeptName"
								value="${deptNameStr }">
						</div>
						<button id="btn-resetSelect" type="button" class="btn btn-warning">重置</button>
						<button id="btn-selectDept" type="submit" class="btn btn-info">查询</button>
						<button id="btn-addView" type="button" class="btn btn-primary">添加视图</button>
					</form>
				</div>
				<table class="table table-hover" id="table-deptDtail">
					<thead>
						<tr>
							<th>序号</th>
							<th>名称</th>
							<th>描述</th>
							<th>操作</th>
						</tr>
					</thead>
					<tbody>
						<c:forEach items="${pageResult.content }" var="view">
							<tr>
								<td>${view.viId }</td>
								<td>${view.name }</td>
								<td>${view.description }</td>
								<td>
									<a class="a_updateView" href="#" style="text-decoration:none;">
					    				<span class="label label-primary">编辑</span>
					    			</a>
					    			<a class="a_deleteView" href="#" style="text-decoration:none;">
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
		<div class="panel_addView">
			<div class="div-panel">
    			<div class="panel-heading">
    				<label>添加视图信息</label>
    				<button id="btn-hidePanelAddView" type="button" class="btn btn-success">退出</button>
    			</div>
    			<div class="panel_body">
    				<form style="width:100%;" id="form-addDept" class="form-horizontal" role="form">
  						<div class="form-group" style="margin-top:10px;">
    						<label for="name" class="col-sm-3 control-label">名称</label>
    						<div class="col-sm-8">
      							<input type="text" class="form-control" name="name" id="input-addViewName">
    						</div>
  						</div>
  						<div class="form-group" style="margin-top:10px;">
    						<label for="number" class="col-sm-3 control-label">描述</label>
    						<div class="col-sm-8">
      							<input type="text" class="form-control" name="description" id="input-addViewDescription">
    						</div>
  						</div>
  						<div class="form-group">
    						<div class="col-sm-offset-3 col-sm-9">
      							<button id="btn-submitAddView" type="button" class="btn btn-primary">提交</button>
    						</div>
 	 					</div>
					</form>
    			</div>
			</div>
		</div>
		
		
		
	</div>
</body>
<script type="text/javascript"
	src="/static/js/view/page_viewList.js"></script>
</html>