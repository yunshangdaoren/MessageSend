package com.lqs.sms.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.lqs.sms.entity.Library;
import com.lqs.sms.entity.LibraryExample;
import com.lqs.sms.mapper.LibraryMapper;
import com.lqs.sms.service.LibraryService;

@Service
public class LibraryServiceImpl implements LibraryService{
	@Autowired
	private LibraryMapper libraryMapper;
	
	@Override
	public List<Library> list() {
		LibraryExample example = new LibraryExample();
		example.or().andLbIdIsNotNull();
		return libraryMapper.selectByExample(example);
	}

	@Override
	public Library get(Integer lbId) {
		return libraryMapper.selectByPrimaryKey(lbId);
	}

	@Override
	public int update(Library library) {
		LibraryExample example = new LibraryExample();
		example.or().andLbIdEqualTo(library.getLbId());
		return libraryMapper.updateByExampleSelective(library, example);
	}

	@Override
	public int delete(Integer lbId) {
		return libraryMapper.deleteByPrimaryKey(lbId);
	}

	@Override
	public int add(Library library) {
		return libraryMapper.insert(library);
	}

}
