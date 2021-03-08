package com.lqs.sms.util;

import com.github.pagehelper.PageInfo;

/**
 * 封装分页返回数据工具类
 * @author Administrator
 *
 */
public class PageResultUtil {

	/**
	 * 封装分页返回数据信息
	 * @param pageRequest
	 * @param pageInfo
	 * @return
	 */
	public static PageResult getPageResult(PageInfo<?> pageInfo) {
		PageResult pageResult = new PageResult();
		//设置当前页码
		pageResult.setPageNum(pageInfo.getPageNum());
//		System.out.println("==========================");
//		System.out.println("当前页码:"+pageInfo.getPageNum());
//		System.out.println("每页数量:"+pageInfo.getPageSize());
//		System.out.println("记录总数:"+pageInfo.getTotal());
//		System.out.println("页码总数:"+pageInfo.getPages());
//		System.out.println("==========================");
		//设置每页数量
		pageResult.setPageSize(pageInfo.getPageSize());
		//设置记录总数
		pageResult.setTotalSize(pageInfo.getTotal());
		//设置页码总数
		pageResult.setTotalPages(pageInfo.getPages());
		//设置返回的数据
		pageResult.setContent(pageInfo.getList());
		return pageResult;
	}
}
