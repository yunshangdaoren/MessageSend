package com.lqs.sms.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.lqs.sms.entity.Phone;
import com.lqs.sms.json.JsonCommonResult;
import com.lqs.sms.service.impl.PhoneServiceImpl;
import com.lqs.sms.util.PageRequest;
import com.lqs.sms.util.PageResult;
import com.lqs.sms.util.PageResultUtil;
import com.lqs.sms.util.StringUtil;


@Controller
@RequestMapping("phone")
public class PhoneController {
	@Autowired
	private PhoneServiceImpl phoneServiceImpl;
	@Autowired
	private StringUtil stringUtil;
	
	@RequestMapping("page_phoneList.do")
	public String page_phoneList(HttpServletRequest request, PageRequest pageRequest, ModelMap map) {
		//分页
		PageHelper.startPage(pageRequest.getPageNum(), pageRequest.getPageSize());
		List<Phone> phoneList = phoneServiceImpl.list();
		//设置分页查询结果
		PageResult pageResult = PageResultUtil.getPageResult(new PageInfo<>(phoneList));
		//返回查询的部门信息
		map.put("pageResult", pageResult);
		return "phone/page_phoneList";
	}
	
	@RequestMapping("addPhone.do")
	@ResponseBody
	public JsonCommonResult<Object> addPhone(HttpServletRequest request) {
		//姓名
		String nameStr = request.getParameter("name");
		//号码
		String numberStr = request.getParameter("number");
		
		//查询数据库中是否已存在该号码
		if (phoneServiceImpl.get(numberStr)!=null) {
			return new JsonCommonResult<Object>("100", null, "已存在该号码，请勿重复添加！");
		}
		
		Phone phone = new Phone(nameStr, numberStr);
		int result = phoneServiceImpl.add(phone);
		if (result == 0) {
			return new JsonCommonResult<Object>("100", null, "添加失败！");
		}
		return new JsonCommonResult<Object>("200", null, "添加成功！");
	}
	
}
