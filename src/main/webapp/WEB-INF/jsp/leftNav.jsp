<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<!DOCTYPE html>
<html>
<head>
	<script type="text/javascript" src="/static/js/jquery.min.js"></script>
	<link rel="stylesheet" href="/static/bootstrap/css/bootstrap.min.css" />
	<script type="text/javascript" src="/static/bootstrap/js/bootstrap.min.js"></script>
	<link rel="stylesheet" href="/static/css/base.css" />
	<link rel="stylesheet" href="/static/css/leftNav.css" />
	<link rel="stylesheet" href="/static/css/top.css" />
	<script type="text/javascript" src="/static/js/top.js"></script>
</head>
<body>

<!-- 左侧导航栏 -->
<div id="leftNav">
	<div class="modu">
		<div class="modu-head">
			<p><a href="/sms/page_smsTaskSendList.do" style="text-decoration:none;color:white;">短信任务发送列表</a></p>
		</div>
	</div>
	<div class="modu">
		<div class="modu-head">
			<p><a href="/library/page_libraryList.do" style="text-decoration:none;color:white;">库路径与视图维护</a></p>
		</div>
	</div>
	<div class="modu">
		<div class="modu-head">
			<p>日志统计</p>
		</div>
	</div>
	<div class="modu">
		<div class="modu-head">
			<p><a href="/phone/page_phoneList.do" style="text-decoration:none;color:white;">号码维护</a></p>
		</div>
	</div>
		
</div>
<!-- <script type="text/javascript" src="/static/js/leftNav.js"></script> -->
</body>
</html>