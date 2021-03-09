package com.lqs.sms.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.lqs.sms.entity.Library;
import com.lqs.sms.entity.LibraryType;
import com.lqs.sms.json.JsonCommonResult;
import com.lqs.sms.service.impl.LibraryServiceImpl;
import com.lqs.sms.service.impl.LibraryTypeServiceImpl;
import com.lqs.sms.util.DataBaseUrlUtil;
import com.lqs.sms.util.PageRequest;
import com.lqs.sms.util.PageResult;
import com.lqs.sms.util.PageResultUtil;
import com.lqs.sms.util.StringUtil;
import com.lqs.sms.util.entity.LibraryInfoUtil;

@Controller
@RequestMapping("library")
public class LibraryController {
	@Autowired
	private LibraryServiceImpl libraryServiceImpl;
	@Autowired
	private LibraryInfoUtil libraryInfoUtil;
	@Autowired
	private LibraryTypeServiceImpl libraryTypeServiceImpl;
	@Autowired
	private StringUtil stringUtil;
	@Autowired
	private DataBaseUrlUtil dataBaseUrlUtil;
	
	
	@RequestMapping("page_libraryList.do")
	public String page_libraryList(HttpServletRequest request, PageRequest pageRequest, ModelMap map) {
		//分页
		PageHelper.startPage(pageRequest.getPageNum(), pageRequest.getPageSize());
		List<Library> libraryList = libraryServiceImpl.list();
		libraryInfoUtil.setLibraryInfo(libraryList);
		//设置分页查询结果
		PageResult pageResult = PageResultUtil.getPageResult(new PageInfo<>(libraryList));
		// 返回查询的部门信息
		map.put("pageResult", pageResult);
		return "library_view/page_libraryList";
	}
	

	@RequestMapping("addLibrary.do")
	@ResponseBody
	public JsonCommonResult<Object> addLibrary(HttpServletRequest request) {
		//获取库类型ID
		String libTypeIdStr = request.getParameter("libType_id");
		//获取库路径名称
		String pathStr = request.getParameter("path");
		//库用户名
		String portStr = request.getParameter("port");
		//获取库描述
		String descriptionStr = request.getParameter("description");
		//MySQL数据库名称
		String databaseNameStr = request.getParameter("databaseName");
		//SID名称
		String SIDStr = request.getParameter("sid");
		//库用户名
		String userNameStr = request.getParameter("userName");
		//库密码
		String passwordStr = request.getParameter("password");
		
		//拼接库地址url
		String urlStr = "";
		//测试前端返回的数据库地址是否可以连接
		boolean isConect;
		if (stringUtil.isEquqls(libraryTypeServiceImpl.get(stringUtil.getInteger(libTypeIdStr)).getName(), "oracle")) {
			//拼接Oracle数据库URL
			urlStr+=dataBaseUrlUtil.getPrefix_Oracle()+pathStr+":"+portStr+":"+SIDStr+dataBaseUrlUtil.getSuffix_Oracle();
			isConect = dataBaseUrlUtil.isConnect(dataBaseUrlUtil.getDriver_Oracle(), urlStr, userNameStr, passwordStr);
		}else {
			//拼接MySQL数据库URL
			//jdbc:mysql://localhost:3306/sms?useUnicode=true&amp;characterEncoding=utf-8&amp;
	    	//useSSL=false&amp;allowPublicKeyRetrieval=true&amp;serverTimezone=Asia/Shanghai" 
			urlStr+=dataBaseUrlUtil.getPrefix_Mysql()+pathStr+":"+portStr+"/"+databaseNameStr+dataBaseUrlUtil.getSuffix_Mysql();
			isConect = dataBaseUrlUtil.isConnect(dataBaseUrlUtil.getDriver_Mysql(), urlStr, userNameStr, passwordStr);
		}
		//dbURL:jdbc:mysql://localhost:3306/sms?useUnicode=true&characterEncoding=UTF-8&useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=Asia/Shanghai
		System.out.println("dbURL:"+urlStr);
		
		if (!isConect) {
			//前端返回的数据库地址，连接数据库失败！
			return new JsonCommonResult<Object>("100", null, "连接数据库失败，请填写正确信息！");
		}
		//前端返回的数据库地址，连接数据库成功！
		
		Library library = new Library(stringUtil.getInteger(libTypeIdStr), pathStr, urlStr, portStr, databaseNameStr, SIDStr, userNameStr, passwordStr, descriptionStr);
		
		int result = libraryServiceImpl.add(library);
		
		if (result == 0) {
			return new JsonCommonResult<Object>("100", null, "添加失败，请重试！");
		}
		return new JsonCommonResult<Object>("200", null, "添加成功");
	}
	
	/**
	 * 获取库视图字符串信息
	 * @param request
	 * @return
	 */
	@RequestMapping("libraryViewStr.do")
	@ResponseBody
	public JsonCommonResult<Object> libraryViewStr(HttpServletRequest request) {
		//库ID
		String lbIdStr = request.getParameter("lbId");
		
		//库视图字符串
		String libraryViewStr = libraryServiceImpl.get(stringUtil.getInteger(lbIdStr)).getLibraryViewStr();
		return new JsonCommonResult<Object>("200", libraryViewStr, "返回库视图字符串信息！");
	}
	
	
	
	
	
	
}
