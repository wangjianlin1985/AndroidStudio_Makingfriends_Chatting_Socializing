package com.ideabobo;

import org.mybatis.generator.api.MyBatisGenerator;
import org.mybatis.generator.config.Configuration;
import org.mybatis.generator.config.xml.ConfigurationParser;
import org.mybatis.generator.exception.InvalidConfigurationException;
import org.mybatis.generator.exception.XMLParserException;
import org.mybatis.generator.internal.DefaultShellCallback;

import com.alibaba.fastjson.JSON;
import com.ideabobo.util.Common;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

/**
 * @Describe
 * @Author Corey
 * @Date 2018/7/12.
 */
public class StartGenerator {
	public static void main(String[] args) {
		createMappingTables();
		List<String> warnings = new ArrayList<String>();
		boolean overwrite = true;
		String genCfg = "/generatorConfig.xml";
		File configFile = new File(StartGenerator.class.getResource(genCfg)
				.getFile());
		ConfigurationParser cp = new ConfigurationParser(warnings);
		Configuration config = null;
		try {
			config = cp.parseConfiguration(configFile);
		} catch (IOException e) {
			e.printStackTrace();
		} catch (XMLParserException e) {
			e.printStackTrace();
		}
		DefaultShellCallback callback = new DefaultShellCallback(overwrite);
		MyBatisGenerator myBatisGenerator = null;
		try {
			myBatisGenerator = new MyBatisGenerator(config, callback, warnings);
		} catch (InvalidConfigurationException e) {
			e.printStackTrace();
		}
		try {
			myBatisGenerator.generate(null);
		} catch (SQLException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
	}

	public static void createMappingTables() {
		
		Connection con = null;
		try {
			// 使用properties对象加载输入流
			
			// 获取key对应的value值

			String driver = Common.getProperty("spring.datasource.driver-class-name");// "com.mysql.jdbc.Driver";
			String url = Common.getProperty("spring.datasource.url");// "jdbc:mysql://localhost:3306/samp_db";
			String username = Common.getProperty("spring.datasource.username"); // "root";
			String password = Common.getProperty("spring.datasource.password");// "";
			Class.forName(driver); // classLoader,加载对应驱动
			con = (Connection) DriverManager.getConnection(url, username,
					password);
		} catch (Exception e) {
			e.printStackTrace();
		}

		try {
			DatabaseMetaData meta = (DatabaseMetaData) con.getMetaData();
			ResultSet rs = meta.getTables(null, null, null,
					new String[] { "TABLE" });
			ArrayList<String> tables = new ArrayList<>();
			while (rs.next()) {
				String tableName =  rs.getString(3);
				tables.add(tableName);
				System.out.println("表名：" + rs.getString(3));
				//System.out.println("表所属用户名：" + rs.getString(2));
				System.out.println("------------------------------");
			}
			con.close();
			
			String filePackage = Common.getProperty("tablemappingpackage");
			String servicePackage = Common.getProperty("servicemappingpackage").replaceAll("\\.", "\\\\")+"\\";
			String packagePath = System.getProperty("user.dir")+"\\src\\main\\java\\"+filePackage.replaceAll("\\.", "\\\\")+"\\";
			String servicePackagePath = System.getProperty("user.dir")+"\\src\\main\\java\\"+servicePackage;
			String cfilepath = "Dbtablemapping.java";
			String path = packagePath+cfilepath;
			
			File file = new File(path);
			File packageDir = new File(packagePath);
			File serviceDir = new File(servicePackagePath);
			if(packageDir.exists()){
				if(packageDir.isDirectory()){
					File[] modelFiles = packageDir.listFiles();
					for(File mfile:modelFiles){
						if(mfile.getName().equals("Dbtablemapping.java")||mfile.getName().equals("Dbservice.java")){
							continue;
						}else{
							mfile.delete();
						}
						
					}
				}
			}
			
			if(serviceDir.exists()){
				if(serviceDir.isDirectory()){
					File[] modelFiles = serviceDir.listFiles();
					for(File mfile:modelFiles){
						if(mfile.getName().equals("DatabaseService.java")){
							continue;
						}else{
							mfile.delete();
						}
						
					}
				}
			}
			StringBuilder sb = new StringBuilder();
			sb.append("package com.ideabobo.model;\r\n");
			sb.append("import com.alibaba.fastjson.JSON;\r\n");
			sb.append("public class Dbtablemapping {\r\n");
			sb.append("\tpublic static Object parseStringModel(String value, String table) {\r\n");
			sb.append("\t\tObject object = null;\r\n");
			sb.append("\t\tswitch (table) {\r\n");
			//sb.append("");//拼装
			for(String table:tables){
				String caseStr = "\t\t\tcase \""+table+"\": object = JSON.parseObject(value, "+getModeNameByTable(table)+".class); break;\r\n";
				sb.append(caseStr);
			}
			sb.append("\t\t}\r\n");
			sb.append("\t\treturn object;\r\n");
			sb.append("}\r\n");
			sb.append("public static Object getModelByTable(String table) {\r\n");
			sb.append("\tObject object = null;\r\n");
			sb.append("\tswitch (table) {\r\n");
			for(String table:tables){
				String caseStr = "\t\t\tcase \""+table+"\": object = new "+getModeNameByTable(table)+"(); break;\r\n";
				sb.append(caseStr);
			}
			sb.append("\t\t}\r\n");
			sb.append("\t\treturn object;\r\n");
			sb.append("\t}\r\n");
			sb.append("}\r\n");
			if(!file.exists()){
				System.out.println(file.getAbsolutePath());
				file.createNewFile();
			}
			
			Common.str2File(file.getAbsolutePath(), sb.toString());
			
			String mappingfilepath = System.getProperty("user.dir")+"\\src\\main\\resources\\mapper\\";
			File mfile = new File(mappingfilepath);
			if(mfile.exists() && mfile.isDirectory()){
				File[] files = mfile.listFiles();
				for(File mapperfile:files){
					String mapfilename = mapperfile.getName();
					if(!mapfilename.equals("DatabaseMapper.xml")){
						mapperfile.delete();
					}
				}
			}
			
		} catch (Exception e) {
			try {
				con.close();
			} catch (SQLException e1) {
				// TODO Auto-generated catch block
				e1.printStackTrace();
			}
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	public static String getModeNameByTable(String tableName){
		String tablePre = Common.getProperty("tableprefix");
		String modelName = tableName;
		if(tablePre!=null && !tablePre.equals("")){
			modelName = modelName.replaceAll(tablePre, "");
		}
		modelName = Common.toUpperCaseFirstOne(modelName);		
		return modelName;
	}
}
