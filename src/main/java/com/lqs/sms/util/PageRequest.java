package com.lqs.sms.util;

/**
 * 分页请求
 * @author Administrator
 *
 */
public class PageRequest {
	/**
	 * 当前页码，默认为1
	 */
	private int pageNum = 1;
	
	/**
	 * 每页数量，默认为10
	 */
	private int pageSize = 10;

	public int getPageNum() {
		return pageNum;
	}

	public void setPageNum(int pageNum) {
		this.pageNum = pageNum;
	}

	public int getPageSize() {
		return pageSize;
	}

	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
	}
	
}
