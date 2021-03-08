package com.lqs.sms.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.lqs.sms.entity.SmsTaskPhone;
import com.lqs.sms.entity.SmsTaskPhoneExample;
import com.lqs.sms.mapper.SmsTaskPhoneMapper;
import com.lqs.sms.service.SmsTaskPhoneService;

@Service
public class SmsTaskPhoneServiceImpl implements SmsTaskPhoneService{
	@Autowired
	private SmsTaskPhoneMapper smsTaskPhoneMapper;
	
	@Override
	public List<SmsTaskPhone> list() {
		SmsTaskPhoneExample example = new SmsTaskPhoneExample();
		example.or().andIdIsNotNull();
		return smsTaskPhoneMapper.selectByExample(example);
	}
	
	@Override
	public List<SmsTaskPhone> listBySmsTaskId(Integer smstaskId) {
		SmsTaskPhoneExample example = new SmsTaskPhoneExample();
		example.or().andSmstaskIdEqualTo(smstaskId);
		return smsTaskPhoneMapper.selectByExample(example);
	}

	@Override
	public SmsTaskPhone get(Integer id) {
		return smsTaskPhoneMapper.selectByPrimaryKey(id);
	}

	@Override
	public int update(SmsTaskPhone smsTaskPhone) {
		SmsTaskPhoneExample example = new SmsTaskPhoneExample();
		example.or().andIdEqualTo(smsTaskPhone.getId());
		return smsTaskPhoneMapper.updateByExampleSelective(smsTaskPhone, example);
	}

	@Override
	public int delete(Integer id) {
		return smsTaskPhoneMapper.deleteByPrimaryKey(id);
	}

	@Override
	public int add(SmsTaskPhone smsTaskPhone) {
		return smsTaskPhoneMapper.insert(smsTaskPhone);
	}

}
