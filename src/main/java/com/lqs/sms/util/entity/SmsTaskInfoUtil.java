package com.lqs.sms.util.entity;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.lqs.sms.entity.SmsTask;
import com.lqs.sms.service.impl.LibraryServiceImpl;
import com.lqs.sms.service.impl.SmsFrequencyServiceImpl;
import com.lqs.sms.service.impl.SmsTaskServiceImpl;
import com.lqs.sms.service.impl.ViewServiceImpl;


/**
 * 短信任务信息封装工具类
 * @author luckyliuqs
 *
 */
@Component
public class SmsTaskInfoUtil {
	@Autowired
	private SmsTaskServiceImpl smsTaskServiceImpl;
	@Autowired
	private LibraryServiceImpl libraryServiceImpl;
	@Autowired
	private ViewServiceImpl viewServiceImpl;
	@Autowired
	private SmsFrequencyServiceImpl smsFrequencyServiceImpl;
	
	
	/**
	 * 设置查询出来的库实体类信息
	 * @param departmentList
	 */
	public void setSmsTaskInfo(List<SmsTask> smsTaskList) {
		if (smsTaskList.size() != 0 || smsTaskList != null) {
			for (SmsTask smsTask : smsTaskList) {
				//库路径名称
				String libraryPathStr = libraryServiceImpl.get(smsTask.getLbId()).getPath();
				//System.out.println("LbId: "+smsTask.getLbId());
				//System.out.println("libraryPathStr: "+libraryPathStr);
				//设置库路径名称
				smsTask.setLibraryPath(libraryPathStr);
				
				//视图名称
				String viewNameStr = viewServiceImpl.get(smsTask.getViId()).getName();
				//设置视图名称
				smsTask.setViewName(viewNameStr);
				
				//短信任务频次描述
				String smsfrequencyDescriptionStr = smsFrequencyServiceImpl.get(smsTask.getSmsfrequencyId()).getDescription();
				//设置短信任务频次描述
				smsTask.setSmsfrequencyDescription(smsfrequencyDescriptionStr);
				
				if (smsTask.getStatus() ==0) {
					smsTask.setStatusDescription("已关闭");
				}else {
					smsTask.setStatusDescription("已开启");
				}
			}	
		}
	}
	

}
