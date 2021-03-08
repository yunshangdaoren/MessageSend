package com.lqs.sms.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.lqs.sms.entity.LibraryView;
import com.lqs.sms.entity.LibraryViewExample;
import com.lqs.sms.mapper.LibraryViewMapper;
import com.lqs.sms.service.LibraryViewService;


@Service
public class LibraryViewServiceImpl implements LibraryViewService{
	@Autowired
	private LibraryViewMapper mapper;

	@Override
	public List<LibraryView> list() {
		LibraryViewExample example = new LibraryViewExample();
		example.or().andIdIsNotNull();
		return mapper.selectByExample(example);
	}

	@Override
	public List<LibraryView> listByLbId(Integer lbId) {
		LibraryViewExample example = new LibraryViewExample();
		example.or().andLbIdEqualTo(lbId);
		return mapper.selectByExample(example);
	}

	@Override
	public int add(LibraryView libraryView) {
		return mapper.insert(libraryView);
	}

	@Override
	public int update(LibraryView libraryView) {
		LibraryViewExample example = new LibraryViewExample();
		example.or().andIdEqualTo(libraryView.getId());
		return mapper.updateByExampleSelective(libraryView, example);
	}

	@Override
	public int delete(Integer id) {
		return mapper.deleteByPrimaryKey(id);
	}
	
	
}
