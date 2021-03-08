package com.lqs.sms.service;

import java.util.List;

import com.lqs.sms.entity.Phone;


public interface PhoneService {
	
	List<Phone> list();
	
	Phone get(Integer phoneId);
	
	Phone get(String number);
	
	int update(Phone phone);
	
	int delete(Integer phoneId);
	
	int add(Phone phone);
	
}
