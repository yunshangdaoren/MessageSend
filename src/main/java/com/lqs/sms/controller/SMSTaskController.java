package com.lqs.sms.controller;

import javax.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import com.lqs.sms.json.JsonCommonResult;
import com.lqs.sms.service.impl.SmsTaskServiceImpl;
import com.lqs.sms.util.StringUtil;


@Controller
@RequestMapping("smsTask")
public class SMSTaskController {
	@Autowired
	private SmsTaskServiceImpl smsTaskServiceImpl;
	@Autowired
	private StringUtil stingUtil;
	
	@RequestMapping("SMSTaskPhone.do")
	@ResponseBody
	public JsonCommonResult<Object> start1(HttpServletRequest request) {
		//短信任务ID
		//短信任务ID
		String smsTaskIdStr = request.getParameter("smstaskId");
		
		//短信任务接收人字符串
		String receivePhoneStr = smsTaskServiceImpl.get(stingUtil.getInteger(smsTaskIdStr)).getReceivePhoneStr();
		return new JsonCommonResult<Object>("200", receivePhoneStr, "返回短信任务接收人信息！");
	}
	
	
}
