package com.lqs.ms.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.lqs.ms.json.JsonCommonResult;


@Controller
public class SendMessageController {
	
	@RequestMapping("index")
	public String index() {
		return "top";
	}
	
	@RequestMapping("messageSendIndex")
	public String messageSendIndex() {
		return "messageSend/messageSendIndex";
	}
	
	@RequestMapping("getLeaderMessage.do")
	@ResponseBody
	public JsonCommonResult<Object>  getLeaderMessage(){
		
		return new JsonCommonResult<Object>("100", null, "修改成功！");
	}
	
}
