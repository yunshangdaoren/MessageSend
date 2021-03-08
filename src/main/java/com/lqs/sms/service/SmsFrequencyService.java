package com.lqs.sms.service;

import java.util.List;

import com.lqs.sms.entity.SmsFrequency;

public interface SmsFrequencyService {
	
	List<SmsFrequency> list();
	
	SmsFrequency get(Integer smsfrequencyId);
	
	int update(SmsFrequency smsFrequency);
	
	int delete(Integer smsfrequencyId);
	
	int add(SmsFrequency smsFrequency);
	
}
