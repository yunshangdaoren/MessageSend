package com.lqs.sms.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.client.RestTemplate;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.lqs.sms.entity.Library;
import com.lqs.sms.entity.SmsTask;
import com.lqs.sms.service.impl.SmsTaskServiceImpl;
import com.lqs.sms.util.PageRequest;
import com.lqs.sms.util.PageResult;
import com.lqs.sms.util.PageResultUtil;
import com.lqs.sms.util.entity.SmsTaskInfoUtil;


@Controller
@RequestMapping("sms")
public class SMSController {
	@Autowired
	private RestTemplate restTemplate;
	@Autowired
	private SmsTaskServiceImpl smsTaskServiceImpl;
	@Autowired
	private SmsTaskInfoUtil smsTaskInfoUtil;
	
	@RequestMapping("page_smsTaskSendList.do")
	public String page_smsSend(HttpServletRequest request, PageRequest pageRequest, ModelMap map) {
		//分页
		PageHelper.startPage(pageRequest.getPageNum(), pageRequest.getPageSize());
		List<SmsTask> smsTaskList = smsTaskServiceImpl.list();
		smsTaskInfoUtil.setSmsTaskInfo(smsTaskList);
		// 设置分页查询结果
		PageResult pageResult = PageResultUtil.getPageResult(new PageInfo<>(smsTaskList));
		// 返回查询的部门信息
		map.put("pageResult", pageResult);
		
		return "sms/page_smsTaskSendList";
	}
	
	/*
	 * @RequestMapping("getLeaderMessage.do")
	 * 
	 * @ResponseBody public JsonCommonResult<LeaderMessage> getLeaderMessage(){
	 * LeaderMessage leaderMessage = leaderMessageServiceImpl.get(); if
	 * (leaderMessage != null) { return new JsonCommonResult<LeaderMessage>("200",
	 * leaderMessage, "获取成功！"); } return new JsonCommonResult<LeaderMessage>("100",
	 * null, "获取失败！"); }
	 */
	@GetMapping("/testGetApi")
	@ResponseBody
    public String getJson(){
        String url="http://47.93.25.215:8088/sms.aspx?action=send&rt=json&userid=113&account=cqsrm001&password=cqsrm001@&mobile=15310443790,17398891213&content=测试中&sendTime=&extno=";
        //String json =restTemplate.getForObject(url,Object.class);
        ResponseEntity<String> results = restTemplate.exchange(url, HttpMethod.GET, null, String.class);
        String json = results.getBody();
        System.out.println("json:"+json);
        return json;
    }
	
	
}
