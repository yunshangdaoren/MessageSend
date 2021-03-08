package com.lqs.sms.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.lqs.sms.entity.SmsTask;
import com.lqs.sms.entity.SmsTaskExample;
import com.lqs.sms.mapper.SmsTaskMapper;
import com.lqs.sms.service.SmsTaskService;

/**
 * 定时Service impl
 * @author Administrator
 *
 */
@Service
public class SmsTaskServiceImpl implements SmsTaskService{
	@Autowired
	private SmsTaskMapper smsTaskMapper;
	
	@Override
	public List<SmsTask> list() {
		SmsTaskExample example = new SmsTaskExample();
		example.or().andSmstaskIdIsNotNull();
		return smsTaskMapper.selectByExample(example);
	}

	@Override
	public SmsTask get(Integer smsfrequencyId) {
		return smsTaskMapper.selectByPrimaryKey(smsfrequencyId);
	}

	@Override
	public int update(SmsTask smsTask) {
		SmsTaskExample example = new SmsTaskExample();
		example.or().andSmstaskIdEqualTo(smsTask.getSmstaskId());
		return smsTaskMapper.updateByExampleSelective(smsTask, example);
	}

	@Override
	public int delete(Integer smsfrequencyId) {
		return smsTaskMapper.deleteByPrimaryKey(smsfrequencyId);
	}

	@Override
	public int add(SmsTask SmsTask) {
		return smsTaskMapper.insert(SmsTask);
	}

	@Override
	public int updateSmsTaskStopTimeNull(Integer smstaskId) {
		return smsTaskMapper.updateSmsTaskStopTimeNull(smstaskId);
	}

}
