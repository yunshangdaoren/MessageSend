<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<div id="top">
	<div class="div-title">
		<span>短信发送系统</span>
	</div>
	<div class="div-date">
		<span class="span-date"></span>
	</div>
	<div class="btn-group">
		<button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown">
			设置 <span class="caret"></span>
		</button>
		<ul class="dropdown-menu dropdown-menu-right" role="menu">
			<li><a href="/user/toMyUserInfo.do">个人中心</a></li>
			<li><a href="#" class="a_changeUserPwd">修改密码</a></li>
			<li><a href="#" class="a_callManager">联系管理员</a></li>
			<li class="divider"></li>
			<li><a href="#">帮助</a></li>
			<li><a class="a-logout" href="/login/logout.do">退出登录</a></li>
		</ul>
	</div>
	<div class="div-news">
		<img title="未读消息" src="/static/img/news-white.png" class="img-news">
		<b class="b-newsAlt"></b>
	</div>
	<div class="div-userInfo">
		<span>欢迎账户${session_loginUser.userAccount }:${session_loginUser.userName }</span>
	</div>
</div>

<!-- 整个页面遮罩层 -->
<div class="shadeDiv">
	<!-- 弹出层，用于修改密码 -->
	<div class="panel_changeUserPwd">
			<div class="panel">
    			<div class="panel-heading">
    				<label>修改密码</label>
    				<button id="btn_hidePanelChangeUserPwd" type="button" class="btn btn-success">退出</button>
    			</div>
    			<div class="panel_body">
    				<form id="form_changeUserPwd">
  						<div class="form-group">
    						<input type="password" name="currentUserPwd" class="form-control" id="currentUserPwd" placeholder="请输入当前的密码">
  						</div>
  						<!-- 如果当前密码输入错误，则提示用户当前密码输入错误 -->
                        <span class="span_erroCurrentPwd">当前密码错误</span>
  						<div class="form-group">
    						<input type="password" name="newUserPwd" class="form-control" id="newUserPwd" placeholder="请输入新密码">
  						</div>
  						<div class="form-group">
    						<input type="password" name="confirmPwd" class="form-control" id="confirmPwd" placeholder="请再次确认密码">
  						</div>
  						<button type="button" id="btn_submitChangeUserPwd" class="btn btn-default">提交</button>
					</form>
    			</div>
			</div>
		</div>
		<!-- 联系管理员遮罩层 -->
	<div class="panel_callManager">
			<div class="panel">
    			<div class="panel-heading">
    				<label>联系管理员</label>
    				<button id="btn_hidePanelCallManager" type="button" class="btn btn-success">退出</button>
    			</div>
    			<div class="panel_body">
    				<form id="form_changeUserPwd">
  						<div class="form-group">
  							<label style="margin-top:20px;">请到人力资源部联系相关工作人员！</label>
  						</div>
					</form>
    			</div>
			</div>
		</div>
	
</div>

	
	
	
	
	
	
	
	