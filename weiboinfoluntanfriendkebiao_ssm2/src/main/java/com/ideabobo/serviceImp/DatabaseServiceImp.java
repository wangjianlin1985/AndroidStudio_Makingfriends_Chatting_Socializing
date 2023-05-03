package com.ideabobo.serviceImp;
 
import java.beans.BeanInfo;
import java.beans.IntrospectionException;
import java.beans.Introspector;
import java.beans.PropertyDescriptor;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
 
import org.springframework.beans.factory.annotation.Autowired;

import com.ideabobo.pojo.Params;
import com.ideabobo.service.DatabaseService;

 
/**
 * 类名称:
 */
public class DatabaseServiceImp<T> {
 
	@Autowired
	private DatabaseService databaseService;
 
	/**
	 * 增删改SQL操作
	 * 
	 * @param sql 操作的sql语句
	 * @return
	 */
	public long executeAction(String sql) {
		return databaseService.executeAction(sql);
	}
 
	/**
	 * 查询单条语句
	 * 
	 * @param sql 操作的sql语句
	 * @return
	 */
	public Map<String, Object> findFirst(String sql) {
		return databaseService.findFirst(sql);
	}
 
	/**
	 * 查询多条语句
	 * 
	 * @param sql 操作的sql语句
	 * @return
	 */
	public List<Map<String, Object>> find(String sql) {
		return databaseService.find(sql);
	}
 
	/**
	 * 查找数量
	 * 
	 * @author zhy
	 * @param sql 查询的sql 语句
	 * @return
	 */
	public long findCount(String sql) {
		return databaseService.findCount(sql);
	}
	
	/**
	 * 查询单个
	 * 
	 * @author zhy
	 * @param sql 查询的sql 语句
	 * @return
	 */
	public Object findOneValue(String sql) {
		return databaseService.findOneValue(sql);
	}
	
	/**
	 * 拼接SQL实现预处理语句
	 * 
	 * @author zhy
	 * @param sql 预处理的语句
	 * @param param 拼接的参数
	 * @return
	 */
	protected String sqlAppend(String sql, Map<String, Object> searchParams) {
		for (String key : searchParams.keySet()) {
			sql = sql.replaceAll(':' + key, '\'' + searchParams.get(key).toString().replaceAll("'", "") + '\'');
		}
		return sql;
	}
	
	/**
	 * 验证字符串防止sql注入
	 * 
	 * @author zhy
	 * @param value 要过滤的值
	 * @return
	 */
	protected String validateValue(String value) {
		return '\'' + value.replaceAll("'", "") + '\'';
	}
	
	/**
	 * 去掉所有单引号
	 * 
	 * @author zhy
	 * @param value 传入的字符串
	 * @return
	 */
	protected String deleteSpoit(String value) {
		return value.replaceAll("'", "");
	}
	
	/**
	 * 直接拼接参数
	 * 
	 * @author zhy
	 * @param searchParams 查询参数
	 * @return
	 */
	protected StringBuffer appendWhereSql(Map<String, Object> searchParams) {
		StringBuffer sqlBuffer = new StringBuffer("");
		if(searchParams != null && searchParams.size() > 0) {
			sqlBuffer.append(" where ");
			for (String key : searchParams.keySet()) {
				sqlBuffer.append(key).append(" = ").append('\'').append(searchParams.get(key).toString().replaceAll("'", "")).append("' or ");
			}
			int length = sqlBuffer.length();
			return sqlBuffer.delete(length - 3, length);
		} else {
			return sqlBuffer;
		}
	}
	
	/**
	 * 得到实体名
	 * 
	 * @author 周化益
	 * @param entityName 实体Class
	 * @return 实体名
	 */
	private String getTableName(Class<? extends Object> entityName) {
		return entityName.getSimpleName().toUpperCase();
	}
	
	/**
	 * 添加实体
	 * 
	 * @author 周化益
	 * @param entityName 实体Class
	 * @param addData 添加的数据
	 * @return 主键ID
	 */
	public long addClass(Class<T> entityName, Map<String, Object> addData) {
		Params params = new Params();
		params.setTables(getTableName(entityName));
		params.setInsertMap(addData);
		databaseService.addEntity(params);
		return params.getId();
	}
	
	/**
	 * 批量添加数据
	 * 
	 * @author zhy
	 * @param entityName 实体Class
	 * @param listMap	批量数据集合
	 * @return
	 */
	public int batchAdd(Class<T> entityName, List<Map<String, Object>> listMap) {
		Params params = new Params();
		params.setTables(getTableName(entityName));
		params.setInsertMap(listMap.get(0));
		params.setBacthInsertMap(listMap);
		return databaseService.batchAdd(params);
	}
	
	/**
	 * 通过条件修改实体
	 * 
	 * @author 周化益
	 * @param entityName 实体Class
	 * @param updataData 修改数据
	 * @param whereSql 条件语句
	 * @return 成功或失败
	 */
	public boolean updateByWhere(Class<T> entityName, Map<String , Object> updateData, String whereSql){
		boolean bool = false;
		try {
			StringBuffer sb = new StringBuffer("update ");
			sb.append(getTableName(entityName)).append(" set ");
			Iterator<String> it = updateData.keySet().iterator();
			StringBuffer updateBuffer = new StringBuffer();
			
			while (it.hasNext()) {
				String key = it.next();
				if(updateData.get(key) == null) {
					updateBuffer.append(key).append('=').append("null").append(',');
				} else{
					updateBuffer.append(key).append('=').append(':'+key).append(',');
				}
			}
			
			sb.append(updateBuffer.substring(0, updateBuffer.length() - 1)).append(whereSql);
			bool = databaseService.executeAction(sqlAppend(sb.toString(), updateData)) > 0;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return bool;
	}
	
	public long deleteById(Class<T> entityName, Object id) {
		String sql = "delete from " + getTableName(entityName) + " where id = " + id;
		return databaseService.executeAction(sql);
	}
	
	/**
	 * 获取实体字段列表
	 * 
	 * @author zhy
	 * @param clazz 实体Class
	 * @return
	 */
	public static String getClassColumns(Class<?> clazz) {
		String columns = "";
		// 定义实体信息对象
		BeanInfo beanInfo;
		try {
			// 获取实体详细信息
			beanInfo = Introspector.getBeanInfo(clazz);
 
			// 获取实体属性描述集合
			PropertyDescriptor[] propertyDescriptors = beanInfo.getPropertyDescriptors();
			for (int i = 0; i < propertyDescriptors.length; i++) {
				// 获取属性描述
				PropertyDescriptor descriptor = propertyDescriptors[i];
 
				// 获取属性名
				String propertyName = descriptor.getName();
				if (!propertyName.equals("class")) {
					columns += propertyName + ",";
				}
			}
		} catch (IntrospectionException e) {
			e.printStackTrace();
		} catch (IllegalArgumentException e) {
			e.printStackTrace();
		}
		return columns.substring(0, columns.length() - 1);
	}
	
	/**
	 * 通过实体class获取实体列表数据（无条件）
	 * 
	 * @author zhy
	 * @param clazz 实体Class
	 * @return
	 */
	public List<Map<String, Object>> getListByBean(Class<?> clazz) {
		StringBuffer sql = new StringBuffer();
		//查询部分
		sql.append("SELECT ").append(getClassColumns(clazz)).append(" FROM ").append(getTableName(clazz));
		
		return databaseService.find(sql.toString());
	}
	
	/**
	 * 通过实体class获取实体数据（无条件）
	 * 
	 * @author zhy
	 * @param clazz 实体Class
	 * @return
	 */
	public Map<String, Object> getByBean(Class<?> clazz) {
		StringBuffer sql = new StringBuffer();
		//查询部分
		sql.append("SELECT ").append(getClassColumns(clazz)).append(" FROM ").append(getTableName(clazz));
		
		return databaseService.findFirst(sql.toString());
	}
	
	/**
	 * 通过实体class获取实体数据
	 * 
	 * @author zhy
	 * @param clazz 实体Class
	 * @param whereSql 查询条件
	 * @return
	 */
	public Map<String, Object> getBean(Class<?> clazz, String whereSql) {
		StringBuffer sql = new StringBuffer();
		//查询部分
		sql.append("SELECT ").append(getClassColumns(clazz)).append(" FROM ").append(getTableName(clazz));
		//条件
		sql.append(' ').append(whereSql);
		
		return databaseService.findFirst(sql.toString());
	}
	
	/**
	 * 通过实体class获取实体列表数据
	 * 
	 * @author zhy
	 * @param clazz 实体Class
	 * @param whereSql 查询条件
	 * @return
	 */
	public List<Map<String, Object>> getListByBean(Class<?> clazz, String whereSql) {
		StringBuffer sql = new StringBuffer();
		//查询部分
		sql.append("SELECT ").append(getClassColumns(clazz)).append(" FROM ").append(getTableName(clazz));
		//条件
		sql.append(' ').append(whereSql);
		
		return databaseService.find(sql.toString());
	}
	
	/**
	 * 通过实体class获取实体列表数据
	 * 
	 * @author zhy
	 * @param clazz 实体Class
	 * @param whereSql 查询条件
	 * @param page 开始页
	 * @param rows 查询的条数
	 * @return
	 */
	public List<Map<String, Object>> getListByBean(Class<?> clazz, String whereSql, int page, int rows) {
		StringBuffer sql = new StringBuffer();
		//查询部分
		sql.append("SELECT ").append(getClassColumns(clazz)).append(" FROM ").append(getTableName(clazz));
		//条件
		sql.append(' ').append(whereSql);
		//分页
		sql.append(" limit ").append((page - 1) * rows).append(',').append(rows);
		
		return databaseService.find(sql.toString());
	}
	
	/**
	 * 通过实体class获取实体列表数据
	 * 
	 * @author zhy
	 * @param clazz 实体Class
	 * @param whereSql 查询条件
	 * @param page 开始页
	 * @param rows 查询的条数
	 * @param sortColumn 排序字段
	 * @param sort 排序方式
	 * @return
	 */
	public List<Map<String, Object>> getListByBean(Class<?> clazz, String whereSql, int page, int rows, String sortColumn, String sort) {
		StringBuffer sql = new StringBuffer();
		//查询部分
		sql.append("SELECT ").append(getClassColumns(clazz)).append(" FROM ").append(getTableName(clazz));
		//条件
		sql.append(' ').append(whereSql);
		//排序
		sql.append(" ORDER BY ").append(sortColumn).append(' ').append(sort);
		//分页
		sql.append(" LIMIT ").append((page - 1) * rows).append(',').append(rows);
		
		return databaseService.find(sql.toString());
	}
	
	/**
	 * 通过实体class获取实体列表数据
	 * 
	 * @author zhy
	 * @param clazz 实体Class
	 * @param page 开始页
	 * @param rows 查询的条数
	 * @return
	 */
	public List<Map<String, Object>> getListByBean(Class<?> clazz, int page, int rows) {
		StringBuffer sql = new StringBuffer();
		//查询部分
		sql.append("SELECT ").append(getClassColumns(clazz)).append(" FROM ").append(getTableName(clazz));
		//分页
		sql.append(" limit ").append((page - 1) * rows).append(',').append(rows);
		
		return databaseService.find(sql.toString());
	}
	
	/**
	 * 通过实体class获取实体列表数据
	 * 
	 * @author zhy
	 * @param clazz 实体Class
	 * @param whereSql 查询条件
	 * @param page 开始页
	 * @param rows 查询的条数
	 * @param sortColumn 排序字段
	 * @param sort 排序方式
	 * @return
	 */
	public List<Map<String, Object>> getListByBean(Class<?> clazz, int page, int rows, String sortColumn, String sort) {
		StringBuffer sql = new StringBuffer();
		//查询部分
		sql.append("SELECT ").append(getClassColumns(clazz)).append(" FROM ").append(getTableName(clazz));
		//排序
		sql.append(" ORDER BY ").append(sortColumn).append(' ').append(sort);
		//分页
		sql.append(" LIMIT ").append((page - 1) * rows).append(',').append(rows);
		
		return databaseService.find(sql.toString());
	}
	
	/**
	 * 通过实体class获取实体列表数据
	 * 
	 * @author zhy
	 * @param sqlStr 自己写的SQL语句
	 * @param whereSql 查询条件
	 * @param page 开始页
	 * @param rows 查询的条数
	 * @return
	 */
	public List<Map<String, Object>> getListByBean(String sqlStr, String whereSql, int page, int rows) {
		StringBuffer sql = new StringBuffer();
		//查询部分
		sql.append(sqlStr);
		//条件
		sql.append(' ').append(whereSql);
		//分页
		sql.append(" limit ").append((page - 1) * rows).append(',').append(rows);
		
		return databaseService.find(sql.toString());
	}
	
	/**
	 * 通过实体class获取实体列表数据
	 * 
	 * @author zhy
	 * @param sqlStr 自己写的SQL语句
	 * @param whereSql 查询条件
	 * @param page 开始页
	 * @param rows 查询的条数
	 * @param sortColumn 排序字段
	 * @param sort 排序方式
	 * @return
	 */
	public List<Map<String, Object>> getListByBean(String sqlStr, String whereSql, int page, int rows, String sortColumn, String sort) {
		StringBuffer sql = new StringBuffer();
		//查询部分
		sql.append(sqlStr);
		//条件
		sql.append(' ').append(whereSql);
		//排序
		sql.append(" ORDER BY ").append(sortColumn).append(' ').append(sort);
		//分页
		sql.append(" LIMIT ").append((page - 1) * rows).append(',').append(rows);
		
		return databaseService.find(sql.toString());
	}
	
	/**
	 * 通过实体class获取实体列表数据
	 * 
	 * @author zhy
	 * @param sqlStr 自己写的SQL语句
	 * @param whereSql 查询条件
	 * @param page 开始页
	 * @param rows 查询的条数
	 * @return
	 */
	public List<Map<String, Object>> getListByBean(String sqlStr, int page, int rows) {
		StringBuffer sql = new StringBuffer();
		//查询部分
		sql.append(sqlStr);
		//分页
		sql.append(" limit ").append((page - 1) * rows).append(',').append(rows);
		
		return databaseService.find(sql.toString());
	}
	
	/**
	 * 批量删除
	 * 
	 * @author zhy
	 * @param clazz 实体Class
	 * @param deleteList 删除的集合
	 * @param deleteColumnName 批量删除条件字段
	 * @return
	 */
	public int batchDelete(Class<?> clazz, List<?> deleteList, String deleteColumnName) {
		Params params = new Params();
		params.setDeleteCoulumnName(deleteColumnName);
		params.setDeleteList(deleteList);
		params.setTables(getTableName(clazz));
		
		return databaseService.batchDelete(params);
	}
}
