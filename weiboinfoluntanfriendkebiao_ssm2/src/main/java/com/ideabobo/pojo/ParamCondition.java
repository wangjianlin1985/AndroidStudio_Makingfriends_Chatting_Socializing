package com.ideabobo.pojo;
 
public class ParamCondition {
	/**连接符号*/
	private String connSymbol;
	
	/**字段名*/
	private String column;
	
	/**判断符号*/
	private String judgeSymbol;
	
	/**字段等于的值*/
	private Object value;
	
	/**结束符号*/
	private String symbolEnd;
	
	public String getConnSymbol() {
		return connSymbol;
	}
 
	public void setConnSymbol(String connSymbol) {
		this.connSymbol = connSymbol;
	}
 
	public String getColumn() {
		return column;
	}
 
	public void setColumn(String column) {
		this.column = column;
	}
 
	public String getJudgeSymbol() {
		return judgeSymbol;
	}
 
	public void setJudgeSymbol(String judgeSymbol) {
		this.judgeSymbol = judgeSymbol;
	}
 
	public Object getValue() {
		return value;
	}
 
	public void setValue(Object value) {
		this.value = value;
	}
 
	public String getSymbolEnd() {
		return symbolEnd;
	}
 
	public void setSymbolEnd(String symbolEnd) {
		this.symbolEnd = symbolEnd;
	}
	
}
