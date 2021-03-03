<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
	<meta charset="ISO-8859-1">
	<title>Insert title here</title>
	<script type="text/javascript" src="/static/js/jquery.min.js"></script>
	<link rel="stylesheet" href="/static/bootstrap/css/bootstrap.min.css" />
	<script type="text/javascript" src="/static/bootstrap/js/bootstrap.min.js"></script>
	<script type="text/javascript" src="/static/js/top.js"></script>
</head>
<body>
	<!-- <div style="width:500px;height:300px;background:yellow;">
		<button type="button" class="btn btn-primary dropdown-toggle">点击获取领导日报新</button>
		<div class="panel panel-danger">
			<div class="panel-heading">Panel heading without title</div>
  			<div class="panel-body">
    			Panel content
  			</div>
			</div>
		<button type="button" class="btn btn-success dropdown-toggle">发送</button>
	</div> -->
	
	<div class="row" style="margin-top:30px;">
  		<div class="col-lg-5">
    		<div class="input-group">
      			<span class="input-group-btn">
        			<button class="btn btn-default" type="button">领导日报新</button>
      			</span>
      			<input type="text" class="form-control" placeholder="Search for...">
    		</div>
  		</div>
  		<button type="button" class="btn btn-primary dropdown-toggle">点击获取领导日报新</button>
  		<button type="button" class="btn btn-success dropdown-toggle">短信发送</button>
	</div>
	
	<div class="row" style="margin-top:10px;">
  		<div class="col-lg-5">
    		<div class="input-group">
      			<span class="input-group-btn">
        			<button class="btn btn-default" type="button">医务报送</button>
      			</span>
      			<input type="text" class="form-control" placeholder="Search for...">
    		</div>
  		</div>
  		<button type="button" class="btn btn-primary dropdown-toggle">点击获取医务报送</button>
  		<button type="button" class="btn btn-success dropdown-toggle">短信发送</button>
	</div>
	
</body>
</html>