package com.ideabobo.util;

public class Robj {
	private String code;
	private String msg;
	private Object data;
	
	public Robj(){
		super();
		//默认填充成功结果
		setCode("0");
		setMsg("操作成功");
	}

	public String getCode() {
		return code;
	}
	public Robj setCode(String code) {
		this.code = code;
		return this;
	}
	public String getMsg() {
		return msg;
	}
	public Robj setMsg(String msg) {
		this.msg = msg;
		return this;
	}
	public Object getData() {
		return data;
	}
	public Robj setData(Object data) {
		this.data = data;
		return this;
	}
}
