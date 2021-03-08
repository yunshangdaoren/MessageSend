package com.lqs.sms.service;

import java.util.List;
import com.lqs.sms.entity.LibraryView;

public interface LibraryViewService {
	
	/**
	 * 获取所有库-视图信息
	 * @param lbId
	 * @return
	 */
	List<LibraryView> list();
	
	/**
	 * 获取指定库路径下的所有视图ID信息
	 * @param lbId
	 * @return
	 */
	List<LibraryView> listByLbId(Integer lbId);
	
	int add(LibraryView libraryView);
	
	int update(LibraryView libraryView);
	
	int delete(Integer id);
}
