package com.lqs.sms.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.lqs.sms.entity.LibraryType;
import com.lqs.sms.entity.LibraryTypeExample;
import com.lqs.sms.mapper.LibraryTypeMapper;
import com.lqs.sms.service.LibraryTypeService;


@Service
public class LibraryTypeServiceImpl implements LibraryTypeService{
	@Autowired
	private LibraryTypeMapper mapper;

	@Override
	public List<LibraryType> list() {
		LibraryTypeExample example = new LibraryTypeExample();
		example.or().andLibtypeIdIsNotNull();
		return mapper.selectByExample(example);
	}

	@Override
	public int add(LibraryType libraryType) {
		return mapper.insert(libraryType);
	}

	@Override
	public int update(LibraryType libraryType) {
		LibraryTypeExample example = new LibraryTypeExample();
		example.or().andLibtypeIdEqualTo(libraryType.getLibtypeId());
		return mapper.updateByExampleSelective(libraryType, example);
	}

	@Override
	public int delete(Integer libtypeId) {
		return mapper.deleteByPrimaryKey(libtypeId);
	}

	@Override
	public LibraryType get(Integer libtypeId) {
		return mapper.selectByPrimaryKey(libtypeId);
	}
	
	
}
