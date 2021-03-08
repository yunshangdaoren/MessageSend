package com.lqs.sms.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.lqs.sms.entity.SmsFrequency;
import com.lqs.sms.entity.SmsFrequencyExample;
import com.lqs.sms.mapper.SmsFrequencyMapper;
import com.lqs.sms.service.SmsFrequencyService;

/**
 * 定时Service impl
 * @author Administrator
 *
 */
@Service
public class SmsFrequencyServiceImpl implements SmsFrequencyService{
	@Autowired
	private SmsFrequencyMapper cronMapper;
	
	@Override
	public List<SmsFrequency> list() {
		SmsFrequencyExample example = new SmsFrequencyExample();
		example.or().andSmsfrequencyIdIsNotNull();
		return cronMapper.selectByExample(example);
	}

	@Override
	public SmsFrequency get(Integer cronId) {
		return cronMapper.selectByPrimaryKey(cronId);
	}

	@Override
	public int update(SmsFrequency smsFrequency) {
		SmsFrequencyExample example = new SmsFrequencyExample();
		example.or().andSmsfrequencyIdEqualTo(smsFrequency.getSmsfrequencyId());
		return cronMapper.updateByExampleSelective(smsFrequency, example);
	}

	@Override
	public int delete(Integer cronId) {
		return cronMapper.deleteByPrimaryKey(cronId);
	}

	@Override
	public int add(SmsFrequency smsFrequency) {
		return cronMapper.insert(smsFrequency);
	}

}
