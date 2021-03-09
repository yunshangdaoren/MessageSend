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
import com.lqs.sms.entity.View;
import com.lqs.sms.json.JsonCommonResult;
import com.lqs.sms.service.impl.LibraryServiceImpl;
import com.lqs.sms.service.impl.LibraryTypeServiceImpl;
import com.lqs.sms.service.impl.ViewServiceImpl;
import com.lqs.sms.util.DataBaseUrlUtil;
import com.lqs.sms.util.PageRequest;
import com.lqs.sms.util.PageResult;
import com.lqs.sms.util.PageResultUtil;
import com.lqs.sms.util.StringUtil;
import com.lqs.sms.util.entity.LibraryInfoUtil;


@Controller
@RequestMapping("view")
public class ViewController {
	@Autowired
	private ViewServiceImpl viewServiceImpl;
	@Autowired
	private LibraryServiceImpl libraryServiceImpl;
	@Autowired
	private StringUtil stringUtil;
	@Autowired
	private LibraryInfoUtil libraryInfoUtil;
	@Autowired
	private DataBaseUrlUtil dataBaseUrlUtil;
	@Autowired
	private LibraryTypeServiceImpl libraryTypeServiceImpl;
	
	@RequestMapping("page_viewListByLbId.do")
	public String page_viewListByLbId(HttpServletRequest request, PageRequest pageRequest, ModelMap map) {
		//获取库ID
		String lbIdStr = request.getParameter("lbId");
		//分页
		PageHelper.startPage(pageRequest.getPageNum(), pageRequest.getPageSize());
		//获取到所有库-视图列表信息
		List<View> viewList = viewServiceImpl.listByLbId(stingUtil.getInteger(lbIdStr));
		// 设置分页查询结果
		PageResult pageResult = PageResultUtil.getPageResult(new PageInfo<>(viewList));
		// 返回查询的视图信息
		map.put("pageResult", pageResult);
		
		Library library = libraryServiceImpl.get(stingUtil.getInteger(lbIdStr));
		libraryInfoUtil.setLibraryInfo(library);
		// 返回查询的库信息
		map.put("library", library);
		
		return "view/page_viewList";
	}
	
	@RequestMapping("addView.do")
	@ResponseBody
	public JsonCommonResult<Object> addView(HttpServletRequest request) {
		//库ID
		String lbIdStr = request.getParameter("lbId");
		
		//查询数据库中，该库是否已存在该视图
		if (viewServiceImpl.listByLbId(stringUtil.getInteger(lbIdStr)) != null || viewServiceImpl.listByLbId(stingUtil.getInteger(lbIdStr)).size() != 0) {
			return new JsonCommonResult<Object>("100", null, "已存在该视图名称，请勿重复添加！");
		}
		
		//视图名称
		String nameStr = request.getParameter("name");
		
		//测试该视图是否存在
		//获取该库的库类型ID
		Integer libtypeId = libraryServiceImpl.get(stringUtil.getInteger(lbIdStr)).getLibtypeId();
		//判断库类型并连接，查询该视图
		if (stringUtil.isEquqls(libraryTypeServiceImpl.get(stringUtil.getInteger(libtypeId)).getName(), "oracle")) {
			
		}else {
			//拼接MySQL数据库URL
			//jdbc:mysql://localhost:3306/sms?useUnicode=true&amp;characterEncoding=utf-8&amp;
	    	//useSSL=false&amp;allowPublicKeyRetrieval=true&amp;serverTimezone=Asia/Shanghai" 
			urlStr+=dataBaseUrlUtil.getPrefix_Mysql()+pathStr+":"+portStr+"/"+databaseNameStr+dataBaseUrlUtil.getSuffix_Mysql();
			isConect = dataBaseUrlUtil.isConnect(dataBaseUrlUtil.getDriver_Mysql(), urlStr, userNameStr, passwordStr);
		}
		if (dataBaseUrlUtil.isViewExit(nameStr, nameStr, nameStr, lbIdStr, nameStr)) {
			
		}
		
		//视图描述
		String descriptionStr = request.getParameter("description");
				
		View view = new View(stringUtil.getInteger(lbIdStr), nameStr, descriptionStr);
		int result = viewServiceImpl.add(view);
		if (result == 0) {
			return new JsonCommonResult<Object>("100", null, "添加失败！");
		}
		
		return new JsonCommonResult<Object>("200", null, "添加成功！");
	}
	
	
}
