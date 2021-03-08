package com.lqs.sms.json;

import com.lqs.sms.util.PageResult;

/**
 * 配置分页返回信息的Json数据格式
 * @author Administrator
 *
 */
public class JsonPageResult {
	/**
	 * 状态码
	 */
	private String code;
	/**
	 * 返回数据
	 */
	private PageResult pageResult;
	/**
	 * 提示信息
	 */
	private String msg;
		
	/**
	 * 如果没有数据返回，指定状态码和返回信息
	 */
	public JsonPageResult() {}
	
	/**
	 * 指定状态码、返回数据和返回信息
	 */
	public JsonPageResult(String code, PageResult pageResult, String msg) {
		this.code = code;
		this.pageResult = pageResult;
		this.msg = msg;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public PageResult getPageResult() {
		return pageResult;
	}

	public void setPageResult(PageResult pageResult) {
		this.pageResult = pageResult;
	}

	public String getMsg() {
		return msg;
	}

	public void setMsg(String msg) {
		this.msg = msg;
	}
	
}
