package com.lqs.sms.controller;

import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.lqs.sms.entity.LibraryType;
import com.lqs.sms.entity.SmsTask;
import com.lqs.sms.json.JsonCommonResult;
import com.lqs.sms.service.impl.LibraryTypeServiceImpl;

@Controller
@RequestMapping("libraryType")
public class LibraryTypeController {
	@Autowired
	private LibraryTypeServiceImpl libraryTypeServiceImpl;
	

	@RequestMapping("libraryTypeList.do")
	@ResponseBody
	public JsonCommonResult<List<LibraryType>> libraryTypeList(HttpServletRequest request) {
		List<LibraryType> libraryTypeList = libraryTypeServiceImpl.list();
		if (libraryTypeList.size() == 0 ||libraryTypeList == null) {
			return new JsonCommonResult<List<LibraryType>>("100", null, "没有数据！");
		}
		return new JsonCommonResult<List<LibraryType>>("200", libraryTypeList, "数据返回成功");
	}
}
