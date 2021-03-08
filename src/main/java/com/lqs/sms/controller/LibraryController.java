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
import com.lqs.sms.util.PageRequest;
import com.lqs.sms.util.PageResult;
import com.lqs.sms.util.PageResultUtil;
import com.lqs.sms.util.StringUtil;
import com.lqs.sms.util.entity.LibraryInfoUtil;

@Controller
@RequestMapping("libraryView")
public class LibraryController {
	@Autowired
	private LibraryServiceImpl libraryServiceImpl;
	@Autowired
	private LibraryInfoUtil libraryInfoUtil;
	@Autowired
	private LibraryTypeServiceImpl libraryTypeServiceImpl;
	@Autowired
	private StringUtil stringUtil;
	
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
		//获取库描述
		String descriptionStr = request.getParameter("description");
		String url = pathStr;
		//拼接库地址url
		if (stringUtil.isEquqls(libraryTypeServiceImpl.get(stringUtil.getInteger(libTypeIdStr)).getName(), "oracle")) {
			url+=":orcl";
		}
		
//		if (libraryTypeList.size() == 0 ||libraryTypeList == null) {
//			return new JsonCommonResult<List<LibraryType>>("100", null, "没有数据！");
//		}
		return new JsonCommonResult<Object>("200", null, "数据返回成功");
	}
	
	
	
	
	
	
	
	
	
}
