package com.lqs.sms.service;

import java.util.List;

import com.lqs.sms.entity.Library;

public interface LibraryService {
	
	List<Library> list();
	
	Library get(Integer lbId);
	
	int update(Library libraryType);
	
	int delete(Integer lbId);
	
	int add(Library library);
	
}
