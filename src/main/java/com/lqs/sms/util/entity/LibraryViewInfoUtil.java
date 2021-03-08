package com.lqs.sms.util.entity;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.lqs.sms.entity.LibraryView;
import com.lqs.sms.service.impl.LibraryServiceImpl;
import com.lqs.sms.service.impl.LibraryViewServiceImpl;
import com.lqs.sms.service.impl.ViewServiceImpl;


/**
 * 库-视图信息封装工具类
 * @author luckyliuqs
 *
 */
@Component
public class LibraryViewInfoUtil {
	@Autowired
	private LibraryViewServiceImpl libraryViewServiceImpl;
	@Autowired
	private LibraryServiceImpl libraryServiceImpl;
	@Autowired
	private ViewServiceImpl viewServiceImpl;
	
	/**
	 * 设置查询出来的库-视图实体类信息
	 * @param departmentList
	 */
	public void setLibraryViewInfo(List<LibraryView> list) {
		if (list.size() != 0 || list != null) {
			for (int i = 0; i < list.size(); i++) {
				
				
			}
		}
	}
	
	
}
