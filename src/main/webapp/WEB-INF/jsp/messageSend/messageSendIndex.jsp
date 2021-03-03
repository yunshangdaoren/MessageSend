<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>组织架构</title>
<link href="/static/css/workbench/employeeIndex.css" rel="stylesheet" />

<script type="text/javascript" src="/static/js/jquery.min.js"></script>
<link rel="stylesheet" href="/static/bootstrap/css/bootstrap.min.css" />
<script type="text/javascript"
	src="/static/bootstrap/js/bootstrap.min.js"></script>
<link rel="stylesheet" href="/static/css/base.css" />
<link rel="stylesheet" href="/static/css/top.css" />
<script type="text/javascript" src="/static/js/top.js"></script>
</head>
<body>
	<%@ include file="../top.jsp"%>
	<div id="center">

		<div class="row" style="margin-top: 30px;">
			<div class="col-lg-5">
				<div class="input-group">
					<span class="input-group-btn">
						<button class="btn btn-default" type="button">领导日报新</button>
					</span> <input type="text" class="form-control"
						placeholder="Search for...">
				</div>
			</div>
			<button type="button" class="btn btn-primary dropdown-toggle">点击获取领导日报新</button>
			<button type="button" class="btn btn-success dropdown-toggle">短信发送</button>
		</div>

		<div class="row" style="margin-top: 10px;">
			<div class="col-lg-5">
				<div class="input-group">
					<span class="input-group-btn">
						<button class="btn btn-default" type="button">医务报送</button>
					</span> <input type="text" class="form-control"
						placeholder="Search for...">
				</div>
			</div>
			<button type="button" class="btn btn-primary dropdown-toggle">点击获取医务报送</button>
			<button type="button" class="btn btn-success dropdown-toggle">短信发送</button>
		</div>
	</div>
	<%@ include file="../bottom.jsp"%>

</body>
<script type="text/javascript"
	src="/static/js/workbench/employeeIndex.js"></script>
</html>