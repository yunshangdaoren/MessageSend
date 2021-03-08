package com.lqs.sms.controller;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.concurrent.ScheduledFuture;

import javax.servlet.http.HttpServletRequest;

import org.apache.ibatis.annotations.Update;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.concurrent.ThreadPoolTaskScheduler;
import org.springframework.scheduling.support.CronTrigger;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.client.RestTemplate;

import com.lqs.sms.entity.Phone;
import com.lqs.sms.entity.SmsFrequency;
import com.lqs.sms.entity.SmsTask;
import com.lqs.sms.entity.SmsTaskPhone;
import com.lqs.sms.json.JsonCommonResult;
import com.lqs.sms.service.impl.PhoneServiceImpl;
import com.lqs.sms.service.impl.SmsFrequencyServiceImpl;
import com.lqs.sms.service.impl.SmsTaskPhoneServiceImpl;
import com.lqs.sms.service.impl.SmsTaskServiceImpl;
import com.lqs.sms.util.StringUtil;

@Controller
@Component
public class SMSSendController {
	@Autowired
	private ThreadPoolTaskScheduler threadPoolTaskScheduler;
	private ScheduledFuture<?> future;
	@Autowired
	private SmsFrequencyServiceImpl smsFrequencyServiceImpl;
	//储存短信任务ID和定时任务
	private HashMap<Integer, ScheduledFuture<?>> scheduleMap = new HashMap<>();
	@Autowired
	private SmsTaskServiceImpl smsTaskServiceImpl;
	@Autowired
	private StringUtil stingUtil;
	@Autowired
	private RestTemplate restTemplate;
	@Autowired
	private SmsTaskPhoneServiceImpl smsTaskPhoneServiceImpl;
	@Autowired
	private PhoneServiceImpl PhoneServiceImpl;
	
	
	@Bean
    public ThreadPoolTaskScheduler threadPoolTaskScheduler() {
       return new ThreadPoolTaskScheduler();
    }

	@RequestMapping("SMSSendStart.do")
	@ResponseBody
	public JsonCommonResult<Object> start1(HttpServletRequest request) {
		//短信任务ID
		String smsTaskIdStr = request.getParameter("smstaskId");
		Integer smsTaskId = stingUtil.getInteger(smsTaskIdStr);
		System.out.println("smstaskId: "+ smsTaskIdStr);
		
		//修改该短信任务状态为已开启
		SmsTask smsTask = smsTaskServiceImpl.get(smsTaskId);
		smsTask.setStatus(1);
		//设置短信任务开始时间
		smsTask.setBeginTime(new Date());
		//设置短信任务结束时间为null
		int result1 = smsTaskServiceImpl.update(smsTask);
		int result2 = smsTaskServiceImpl.updateSmsTaskStopTimeNull(smsTask.getSmstaskId());
		//System.out.println("设置结果："+result2);
		
		//获取到短信任务对应的短信频次ID
		Integer smsfrequencyId = smsTaskServiceImpl.get(smsTaskId).getSmsfrequencyId();
		//获取短信频次信息
		SmsFrequency smsFrequency = smsFrequencyServiceImpl.get(smsfrequencyId);
		//获取到短信频次的值
		String smsFrequencyValue = smsFrequency.getValue();
		//创建一个多线程
		MyRunnable runnable = new MyRunnable();
		//实现一个定时器
		future = threadPoolTaskScheduler.schedule(runnable, new CronTrigger(smsFrequencyValue));
		//设置短信任务ID
		runnable.setSmsTaskId(smsTaskId);
		//将短信任务ID和定时任务，添加进HashMap中
		scheduleMap.put(smsTaskId, future);
		
		if (result1 == 0) {
			return new JsonCommonResult<Object>("100", null, "启动失败！");
		}
		return new JsonCommonResult<Object>("200", null, "启动成功！");
		
//		Integer smsfrequencyId =1;
//		SmsFrequency smsFrequency = smsFrequencyServiceImpl.get(smsfrequencyId);
//		String cronStr = smsFrequency.getValue();
//		MyRunnable runnable = new MyRunnable();
//		future = threadPoolTaskScheduler.schedule(runnable, new CronTrigger(cronStr));
//		runnable.setCronId(smsfrequencyId);
//		scheduleMap.put(smsfrequencyId, future);
//		System.out.println(smsFrequency.getDescription()); 
		//return new JsonCommonResult<Object>("200", null, "开始启动！");
	}
	
	
	@RequestMapping("SMSSendStop.do")
	@ResponseBody
	public JsonCommonResult<Object> stop1(HttpServletRequest request) {
		String smstaskIdStr = request.getParameter("smstaskId");
		System.out.println("smstaskId: "+ smstaskIdStr);
		
		//修改该短信任务状态为已关闭
		SmsTask smsTask = smsTaskServiceImpl.get(stingUtil.getInteger(smstaskIdStr));
		smsTask.setStatus(0);
		smsTask.setStopTime(new Date());
		int result = smsTaskServiceImpl.update(smsTask);
		if (result == 0) {
			return new JsonCommonResult<Object>("100", null, "关闭失败！");
		}
		return new JsonCommonResult<Object>("200", null, "关闭成功！");
		
//		Integer cronId =1;
//		for(Integer key: scheduleMap.keySet()) {
//			if (key == cronId) {
//				scheduleMap.get(key).cancel(true);
//			}
//			System.out.println("key:"+key +"  value:"+scheduleMap.get(key));
//		}
//		return new JsonCommonResult<Object>("200", null, "关闭成功！");
	}
	
	private class MyRunnable implements Runnable {
		private Integer smsTaskId;
		@Override
		public void run() {
			//定义短信任务的接收人手机号码字符串
			String smsTaskPhoneStr = "";
			List<SmsTaskPhone> smsTaskPhoneList = smsTaskPhoneServiceImpl.listBySmsTaskId(smsTaskId);
			for (SmsTaskPhone smsTaskPhone : smsTaskPhoneList) {
				Integer phoneId = smsTaskPhone.getPhoneId();
				smsTaskPhoneStr += PhoneServiceImpl.get(phoneId).getNumber() + ",";
			}
			System.out.println("号码接受人："+smsTaskPhoneStr);
			//短信内容
			String smsTaskContent = smsTaskServiceImpl.get(smsTaskId).getContent();
			String url="http://47.93.25.215:8088/sms.aspx?action=send&rt=json&userid=113&account=cqsrm001&password=cqsrm001@&mobile=";
			url += smsTaskPhoneStr +"&content="+smsTaskContent+"&sendTime=&extno=";
			ResponseEntity<String> results = restTemplate.exchange(url, HttpMethod.GET, null, String.class);
			String json = results.getBody();
			System.out.println("短信发送返回的json:" + json);
		}
		
		public void setSmsTaskId(Integer smsTaskId) {
			this.smsTaskId = smsTaskId;
		}
		
	} 
}
