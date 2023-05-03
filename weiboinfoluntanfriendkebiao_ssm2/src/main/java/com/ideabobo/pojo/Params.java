package com.ideabobo.pojo;
 
 
import java.util.List;
import java.util.Map;
 
 
public class Params {
	/**查询的列*/
	private String[] columns;
	
	/**查询的实体*/
	private String tables;
	
	/**查询的条件*/
	private String whereSql;
	
	/**查询参数拼接*/
	private List<ParamCondition> paramList;
	
	/**起始位置*/
	private Integer start;
	
	/**结束位置*/
	private Integer end;
	
	/**排序字段*/
	private String sortColumn;
	
	/**升序或倒序*/
	private String sort;
	
	/**添加参数*/
	private Map<String, Object> insertMap;
	
	/**批量添加参数*/
	private List<Map<String, Object>> bacthInsertMap;
	
	/**接受返回的主键ID*/
	private Long id;
	
	/**删除字段集合*/
	private List<?> deleteList;
	
	/** 删除的字段名 */
	private String deleteCoulumnName;
 
 
	public Long getId() {
		return id;
	}
 
 
	public void setId(Long id) {
		this.id = id;
	}
 
 
	public String[] getColumns() {
		return columns;
	}
 
 
	public void setColumns(String[] columns) {
		this.columns = columns;
	}
 
 
	public String getTables() {
		return tables;
	}
 
 
	public void setTables(String tables) {
		this.tables = tables;
	}
 
 
	public String getWhereSql() {
		return whereSql;
	}
 
 
	public void setWhereSql(String whereSql) {
		this.whereSql = whereSql;
	}
 
 
	public List<ParamCondition> getParamList() {
		return paramList;
	}
 
 
	public void setParamList(List<ParamCondition> paramList) {
		this.paramList = paramList;
	}
 
 
	public Integer getStart() {
		return start;
	}
 
 
	public void setStart(Integer start) {
		this.start = start;
	}
 
 
	public Integer getEnd() {
		return end;
	}
 
 
	public void setEnd(Integer end) {
		this.end = end;
	}
 
 
	public String getSortColumn() {
		return sortColumn;
	}
 
 
	public void setSortColumn(String sortColumn) {
		this.sortColumn = sortColumn;
	}
 
 
	public String getSort() {
		return sort;
	}
 
 
	public void setSort(String sort) {
		this.sort = sort;
	}
 
 
	public Map<String, Object> getInsertMap() {
		return insertMap;
	}
 
 
	public void setInsertMap(Map<String, Object> insertMap) {
		this.insertMap = insertMap;
	}
 
 
	public List<Map<String, Object>> getBacthInsertMap() {
		return bacthInsertMap;
	}
 
 
	public void setBacthInsertMap(List<Map<String, Object>> bacthInsertMap) {
		this.bacthInsertMap = bacthInsertMap;
	}
 
 
	public List<?> getDeleteList() {
		return deleteList;
	}
 
 
	public void setDeleteList(List<?> deleteList) {
		this.deleteList = deleteList;
	}
 
 
	public String getDeleteCoulumnName() {
		return deleteCoulumnName;
	}
 
 
	public void setDeleteCoulumnName(String deleteCoulumnName) {
		this.deleteCoulumnName = deleteCoulumnName;
	}
	
}
