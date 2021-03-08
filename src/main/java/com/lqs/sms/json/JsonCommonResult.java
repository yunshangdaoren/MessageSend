package com.lqs.sms.json;

/**
 * 配置普通返回信息的Json数据格式
 * @author Administrator
 *
 */
public class JsonCommonResult<T> {
	/**
	 * 状态码
	 */
	private String code;
	/**
	 * 返回数据
	 */
	private T data;
	/**
	 * 提示信息
	 */
	private String msg;
		
	public JsonCommonResult() {}

	/**
	 * 指定状态码、返回数据和返回信息
	 */
	public JsonCommonResult(String code, T data, String msg) {
		this.code = code;
		this.data = data;
		this.msg = msg;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public T getData() {
		return data;
	}

	public void setData(T data) {
		this.data = data;
	}

	public String getMsg() {
		return msg;
	}

	public void setMsg(String msg) {
		this.msg = msg;
	}
	
}
