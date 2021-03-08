package com.lqs.sms.service;

import java.util.List;

import com.lqs.sms.entity.Phone;
import com.lqs.sms.entity.SmsTaskPhone;


public interface SmsTaskPhoneService {
	
	List<SmsTaskPhone> list();
	
	List<SmsTaskPhone> listBySmsTaskId(Integer smstaskId);
	
	SmsTaskPhone get(Integer id);
	
	int update(SmsTaskPhone smsTaskPhone);
	
	int delete(Integer id);
	
	int add(SmsTaskPhone smsTaskPhone);
	
}
