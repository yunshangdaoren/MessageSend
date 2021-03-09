package com.lqs.sms.service;

import java.util.List;

import com.lqs.sms.entity.View;

public interface ViewService {
	
	List<View> list();
	
	List<View> listByLbId(Integer lbId);
	
	View get(Integer viId);
	
	int update(View view);
	
	int delete(Integer viId);
	
	int add(View view);
	
	
}
