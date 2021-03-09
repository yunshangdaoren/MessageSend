<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>组织架构</title>
<link href="/static/css/sms/page_smsTaskSendList.css" rel="stylesheet" />
</head>
<body>
	<div class="bodys">
		<%@ include file="../top.jsp"%>
		<div id="center">
			<%@ include file="../leftNav.jsp"%>
			<div id="right">
				<span class="title">短信发送</span>
				<ul class="nav nav-tabs">
					<li role="presentation" class="active"><a href="#">短信发送任务列表</a></li>
				</ul>
				<div class="div_search">
					<form class="form-inline" id="form-queryDept" method="get"
						action="/department/toDepartmentList.do">
						<div class="form-group">
							<label for="exampleInputName2">库路径</label> <input type="text"
								class="form-control" name="deptId" id="input-selectDeptId"
								value="${deptIdStr }">
						</div>
						<div class="form-group">
							<label for="exampleInputName2">视图名称</label> <input type="text"
								class="form-control" name="deptName" id="input-selectDeptName"
								value="${deptNameStr }">
						</div>
						<button id="btn-resetSelect" type="button" class="btn btn-danger">重置</button>
						<button id="btn-selectDept" type="submit" class="btn btn-danger">查询</button>
						<c:if test="${roles.roleId!=3 }">
							<button id="btn-addDept" type="button" class="btn btn-success">添加任务</button>
						</c:if>
					</form>
				</div>
				<table class="table table-hover table-bordered" id="table-deptDtail">
					<thead>
						<tr>
							<th>序号</th>
							<th>库路径</th>
							<th>视图名称</th>
							<th>短信内容(最新)</th>
							<th>接收人电话</th>
							<th>频次时间</th>
							<th>开始日期</th>
							<th>停止日期</th>
							<th>已发送次数</th>
							<th>发送次记录</th>
							<th>状态</th>
							<th>操作</th>
						</tr>
					</thead>
					<tbody>
						<c:forEach items="${pageResult.content }" var="SmsTask">
							<tr>
								<td>${SmsTask.smstaskId }</td>
								<td>${SmsTask.libraryPath }</td>
								<td>${SmsTask.viewName }</td>
								<td>${SmsTask.content }</td>
								<td>
									<a class="a_editSmsTaskPhone" href="#" style="text-decoration:none;">
					    				<span class="label label-primary">编辑</span>
					    			</a>
								</td>
								<!-- <td>
									<a class="a_updateDepartment" href="#" style="text-decoration:none;">
					    				<span class="label label-success">编辑</span>
					    			</a>
					    		</td> -->
								<td>${SmsTask.smsfrequencyDescription}</td>
								<td><fmt:formatDate value="${SmsTask.beginTime}" type="both"/></td>
								<td><fmt:formatDate value="${SmsTask.stopTime}" type="both"/></td>
								<td>${SmsTask.sendCount}</td>
								<td></td>
								<td>
									<c:choose>
										<c:when test="${SmsTask.status==0 }">
											<span style="color:red;font-weight:600;">${SmsTask.statusDescription}</span>
										</c:when>
										<c:otherwise>
											<span style="color:green;font-weight:600;">${SmsTask.statusDescription}</span>
										</c:otherwise>
									</c:choose>
								</td>
								<td>
									<a class="a_updateDepartment" href="#" style="text-decoration: none;"> 
										<span class="label label-primary">编辑</span>
									</a> 
									<c:choose>
										<c:when test="${SmsTask.status==0 }">
											<a class="a_startSMSSend" href="#" style="text-decoration: none;"> 
												<span class="label label-success">开启</span>
											</a>
										</c:when>
										<c:otherwise>
											<a class="a_stopSMSSend" href="#" style="text-decoration: none;"> 
												<span class="label label-danger">关闭</span>
											</a>
										</c:otherwise>
									</c:choose>
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
		<!-- 弹出层，用于显示短信任务接收人和号码详细信息 -->
		<div class="panel panel-primary panel_smsTaskPhoneDetail" style="display:show;position:absolute;">
			<div class="panel-heading">
    			<h5 class="panel-title">短信任务接收人号码详情</h5>
  			</div>
			<div class="panel-body"></div>
		</div>
	</div>
</body>
<script type="text/javascript"
	src="/static/js/sms/page_smsTaskSendList.js"></script>
</html>