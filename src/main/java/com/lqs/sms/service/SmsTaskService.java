package com.lqs.sms.service;

import java.util.List;

import com.lqs.sms.entity.SmsTask;

public interface SmsTaskService {
	
	List<SmsTask> list();
	
	SmsTask get(Integer smstaskId);
	
	int update(SmsTask smsTask);
	
	int delete(Integer smstaskId);
	
	int add(SmsTask smsTask);
	
	int updateSmsTaskStopTimeNull(Integer smstaskId);
	
}
