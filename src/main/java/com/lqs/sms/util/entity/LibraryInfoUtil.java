package com.lqs.sms.util.entity;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.github.pagehelper.util.StringUtil;
import com.lqs.sms.entity.Library;
import com.lqs.sms.service.impl.LibraryServiceImpl;
import com.lqs.sms.service.impl.LibraryTypeServiceImpl;


/**
 * 库实体信息封装工具类
 * @author luckyliuqs
 *
 */
@Component
public class LibraryInfoUtil {
	@Autowired
	private LibraryServiceImpl libraryServiceImpl;
	@Autowired
	private LibraryTypeServiceImpl libraryTypeServiceImpl;
	
	/**
	 * 设置查询出来的库实体类信息
	 * @param departmentList
	 */
	public void setLibraryInfo(List<Library> list) {
		if (list.size() != 0 || list != null) {
			for (Library library : list) {
				//库类型名称
				String libTypeName = libraryTypeServiceImpl.get(library.getLibtypeId()).getName();
				//设置库类型名称
				library.setLibTypeName(libTypeName);
			}	
		}
	}
	

}
