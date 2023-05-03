package com.ideabobo.model;

import java.lang.reflect.Field;
import java.util.List;
import java.util.Map;
import com.ideabobo.service.DatabaseService;
import com.ideabobo.util.Common;
import com.ideabobo.util.GetNowTime;
import com.ideabobo.util.Page;

public class Dbservice {
	private DatabaseService databaseService;
	public Dbservice(DatabaseService databaseService){
		this.databaseService = databaseService;
	}
	public static String getTableName(String table){
		String pre = Common.getProperty("tableprefix");
		return pre+table;
	}
	
	public String add(Object o,String tableName) throws Exception {
		Class c = o.getClass();
		Field[] fs = c.getDeclaredFields();
		StringBuffer sql = new StringBuffer();
		sql.append("insert into " + tableName);
		StringBuffer sql_name = new StringBuffer();
		StringBuffer sql_value = new StringBuffer();
		for (Field f : fs) {
			f.setAccessible(true);
			String fieldName = f.getName();
			if ("id".equals(fieldName)) {
				continue;
			}else if("serialVersionUID".equals(fieldName)){
				continue;
			} else {
				if (f.getType().getSimpleName().equals("String")) {
					sql_name.append(fieldName.toLowerCase() + ",");
					String fd="";
					if(f.get(o)!=null){
						fd = (String) f.get(o);
					}
					sql_value.append("\'" + fd + "\'" + ",");
				} else {
					sql_name.append(f.getName().toLowerCase() + ",");
					sql_value.append(f.get(o) + ",");
				}
			}
		}
		String names = sql_name.toString().substring(0, sql_name.length() - 1);
		String values = sql_value.toString().substring(0,sql_value.length() - 1);
		sql.append("(" + names + ")").append(" ").append("values(").append(values).append(");");
		System.out.println(sql.toString());
		return sql.toString();	
	}
	
	public String save(Object o, String tableName) throws Exception {
		Class c = o.getClass();
		Field[] fs = c.getDeclaredFields();
		StringBuffer sql = new StringBuffer();
		sql.append("insert into " + tableName);
		StringBuffer sql_name = new StringBuffer();
		StringBuffer sql_value = new StringBuffer();
		boolean flag = false;
		for (Field f : fs) {
			f.setAccessible(true);
			String fieldName = f.getName();
			if ("id".equals(fieldName) && f.get(o) != null) {
				flag = true;
			}else if ("ndate".equals(fieldName) && (f.get(o) == null || f.get(o).equals(""))) {
				f.set(o,GetNowTime.getNowTimeEn());
			}
		}
		if (flag) {
			return update(o, tableName);
		} else {
			return add(o, tableName);
		}
	}
	
	public String update(Object o,String tableName) throws Exception {
		Class c = o.getClass();
		Field[] fs = c.getDeclaredFields();
		StringBuffer sql = new StringBuffer();
		sql.append("update " + tableName + " set ");
		String id = "";
		for(int i=0;i<fs.length;i++){			
			Field f = fs[i];
			f.setAccessible(true);
			String fieldName = f.getName();
			if ("id".equals(fieldName)) {
				id = f.get(o).toString();
				continue;
			}else if("serialVersionUID".equals(fieldName)){
				continue;
			}  else {
				if (f.getType().getSimpleName().equals("String")) {
					if(f.get(o)!=null){
						sql.append(fieldName.toLowerCase()+"="+"\'" + f.get(o) + "\'" + ",");
					};					
				} else {
					if(f.get(o)!=null){
						sql.append(fieldName.toLowerCase()+"=" + f.get(o)+",");
					}					
				}
			}			
		}
		String sql2 = sql.toString().substring(0,sql.length() - 1)+" where id="+id;
		System.out.println("update sql:"+sql2);
		return sql2;	
	}
	
	public String delete(String tableName, Object paras) throws Exception{
		String sql = String.format("delete from %s where 1=1 ", tableName);
		if(paras!=null){
			Object o = paras;
			Class c = o.getClass();
			Field[] fields = c.getDeclaredFields();
			for(int i=0;i<fields.length;i++){
				Field field = fields[i];
				field.setAccessible(true);
				String vname = field.getName();
				if(vname.equals("serialVersionUID")){
					continue;
				}
				Object value = field.get(o); 
				if(value != null){
					if(value instanceof String){
						String fv = value.toString();
						sql+=" and "+vname+" = '"+fv+"'";
					}else if(value instanceof Integer){
						int fv = (Integer)value;
						sql+=" and "+vname+"="+fv;
											
					}
				}
			}
		}
		
		return sql;
	}
	
	
	public Page getByPage(Page page,String tableName,String sort ,String order,String pageNo,String pageSize) throws Exception {
		StringBuffer sb = new StringBuffer();
		StringBuffer countsql = new StringBuffer();
		countsql.append("select count(*) from "+tableName+" where 1=1");
		sb.append("select * from "+tableName+" where 1=1");
		if(page.model!=null){
			Object o = page.model;
			Class c = o.getClass();
			Field[] fields = c.getDeclaredFields();
			for(int i=0;i<fields.length;i++){
				Field field = fields[i];
				field.setAccessible(true);
				String vname = field.getName();
				if(vname.equals("serialVersionUID")){
					continue;
				}
				Object value = field.get(page.model); 
				if(value != null){
					if(value instanceof String){
						String fv = value.toString();
						String subSql = " and "+vname+" like '%"+fv+"%'";
						/*if(fv.contains("%")){
							fv = fv.replace("%", "");
							subSql = " and "+vname+" like '%"+fv+"%'";
						}*/
						sb.append(subSql);
						countsql.append(subSql);
					}else if(value instanceof Integer){
						int fv = (Integer)value;
						sb.append(" and "+vname+"="+fv);
						countsql.append(" and "+vname+"="+fv);
											
					}
				}
			}
		}
		long totalRow = databaseService.findCount(countsql.toString());
		page.total = totalRow;
		page.count = totalRow;

		if (sort!=null){
			sb.append(" order by "+sort+" "+order);
		}
		if (pageNo!=null){
			page.pageSize = Integer.parseInt(pageSize);
			page.pageNo = Integer.parseInt(pageNo);
		}
		sb.append(" limit "+((page.pageNo-1)*(page.pageSize))+","+page.pageSize);
		List<Map<String, Object>> al = databaseService.find(sb.toString());
		page.rows = al;
		page.data = al;
		return page;
	}
	
	public Page getByPageLike(Page page,String tableName) throws Exception {
		StringBuffer sb = new StringBuffer();
		StringBuffer countsql = new StringBuffer();
		countsql.append("select count(*) from "+tableName+" where 1=1");
		sb.append("select * from "+tableName+" where 1=1");
		if(page.model!=null){
			Object o = page.model;
			Class c = o.getClass();
			Field[] fields = c.getDeclaredFields();
			for(int i=0;i<fields.length;i++){
				Field field = fields[i];
				field.setAccessible(true);
				String vname = field.getName();
				if(vname.equals("serialVersionUID")){
					continue;
				}
				Object value = field.get(page.model); 
				if(value != null){
					if(value instanceof String){
						String fv = value.toString();
						String subSql = " and "+vname+" like '%"+fv+"%'";
						/*if(fv.contains("%")){
							fv = fv.replace("%", "");
							subSql = " and "+vname+" = '%"+fv+"%'";
						}*/
						sb.append(subSql);
						countsql.append(subSql);
					}else if(value instanceof Integer){
						int fv = (Integer)value;
						sb.append(" and "+vname+" like %"+fv+"%");
						countsql.append(" and "+vname+" like %"+fv+"%");
											
					}
				}
			}
		}
		long totalRow = databaseService.findCount(countsql.toString());
		page.total = totalRow;

		sb.append(" limit "+((page.pageNo-1)*(page.pageSize))+","+page.pageSize);
		List<Map<String, Object>> al = databaseService.find(sb.toString());
		page.rows = al;
		return page;
	}
	
	public String list(String tableName,Object paras,String ordersql) throws Exception {
		StringBuffer sb = new StringBuffer();
		sb.append("select * from "+tableName+" where 1=1");
		if(paras!=null){
			Object o = paras;
			Class c = o.getClass();
			Field[] fields = c.getDeclaredFields();
			for(int i=0;i<fields.length;i++){
				Field field = fields[i];
				field.setAccessible(true);
				String vname = field.getName();
				if(vname.equals("serialVersionUID")){
					continue;
				}
				Object value = field.get(o); 
				if(value != null){
					if(value instanceof String){
						String fv = value.toString();
						/*String subSql = " and "+vname+" = '"+fv+"'";
						if(fv.contains("%")){
							fv = fv.replace("%", "");*/
						String subSql = " and "+vname+" like '%"+fv+"%'";
						//}
						sb.append(subSql);
					}else if(value instanceof Integer){
						int fv = (Integer)value;
						sb.append(" and "+vname+"="+fv);
											
					}
				}
			}
		}

		if (ordersql!=null){
			sb.append(ordersql);
		}else{
			sb.append(" order by id desc");
		}



		return sb.toString();
	}

	public String list(String tableName,Object paras,boolean unLike) throws Exception {
		StringBuffer sb = new StringBuffer();
		sb.append("select * from "+tableName+" where 1=1");
		if(paras!=null){
			Object o = paras;
			Class c = o.getClass();
			Field[] fields = c.getDeclaredFields();
			for(int i=0;i<fields.length;i++){
				Field field = fields[i];
				field.setAccessible(true);
				String vname = field.getName();
				if(vname.equals("serialVersionUID")){
					continue;
				}
				Object value = field.get(o);
				if(value != null){
					if(value instanceof String){
						String fv = value.toString();
						String subSql = " and "+vname+" like '%"+fv+"%'";
						if (unLike){
							subSql = " and "+vname+" = '"+fv+"'";
						}
						sb.append(subSql);
					}else if(value instanceof Integer){
						int fv = (Integer)value;
						sb.append(" and "+vname+"="+fv);

					}
				}
			}
		}

		sb.append(" order by id desc");
		return sb.toString();
	}
	
}
