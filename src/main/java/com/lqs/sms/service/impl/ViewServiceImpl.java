package com.lqs.sms.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.lqs.sms.entity.View;
import com.lqs.sms.entity.ViewExample;
import com.lqs.sms.mapper.ViewMapper;
import com.lqs.sms.service.ViewService;

@Service
public class ViewServiceImpl implements ViewService{
	@Autowired
	private ViewMapper viewMapper;
	
	@Override
	public List<View> list() {
		ViewExample example = new ViewExample();
		example.or().andViIdIsNotNull();
		return viewMapper.selectByExample(example);
	}

	@Override
	public View get(Integer viId) {
		return viewMapper.selectByPrimaryKey(viId);
	}

	@Override
	public int update(View view) {
		ViewExample example = new ViewExample();
		example.or().andViIdEqualTo(view.getViId());
		return viewMapper.updateByExampleSelective(view, example);
	}

	@Override
	public int delete(Integer viId) {
		return viewMapper.deleteByPrimaryKey(viId);
	}

	@Override
	public int add(View view) {
		return viewMapper.insert(view);
	}

	@Override
	public List<View> listByLbId(Integer lbId) {
		ViewExample example = new ViewExample();
		example.or().andLbIdEqualTo(lbId);
		return viewMapper.selectByExample(example);
	}

}
