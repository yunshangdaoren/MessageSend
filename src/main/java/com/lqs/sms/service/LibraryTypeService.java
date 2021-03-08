package com.lqs.sms.service;

import java.util.List;

import com.lqs.sms.entity.LibraryType;

public interface LibraryTypeService {
	
	/**
	 * 获取库类型信息
	 * @param lbId
	 * @return
	 */
	List<LibraryType> list();
	
	LibraryType get(Integer libtypeId);
	
	int add(LibraryType libraryType);
	
	int update(LibraryType libraryType);
	
	int delete(Integer libtypeId);
}
