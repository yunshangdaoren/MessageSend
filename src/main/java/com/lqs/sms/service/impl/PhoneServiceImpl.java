package com.lqs.sms.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.lqs.sms.entity.Phone;
import com.lqs.sms.entity.PhoneExample;
import com.lqs.sms.mapper.PhoneMapper;
import com.lqs.sms.service.PhoneService;

@Service
public class PhoneServiceImpl implements PhoneService{
	@Autowired
	private PhoneMapper phoneMapper;
	
	@Override
	public List<Phone> list() {
		PhoneExample example = new PhoneExample();
		example.or().andPhoneIdIsNotNull();
		return phoneMapper.selectByExample(example);
	}

	@Override
	public Phone get(Integer phoneId) {
		return phoneMapper.selectByPrimaryKey(phoneId);
	}

	@Override
	public int update(Phone phone) {
		PhoneExample example = new PhoneExample();
		example.or().andPhoneIdEqualTo(phone.getPhoneId());
		return phoneMapper.updateByExampleSelective(phone, example);
	}

	@Override
	public int delete(Integer phoneId) {
		return phoneMapper.deleteByPrimaryKey(phoneId);
	}

	@Override
	public int add(Phone phone) {
		return phoneMapper.insert(phone);
	}

	@Override
	public Phone get(String number) {
		PhoneExample example = new PhoneExample();
		example.or().andNumberEqualTo(number);
		List<Phone> phoneList = phoneMapper.selectByExample(example);
		if (phoneList == null || phoneList.size() == 0) {
			return null;
		}
		return phoneList.get(0);
	}

}
