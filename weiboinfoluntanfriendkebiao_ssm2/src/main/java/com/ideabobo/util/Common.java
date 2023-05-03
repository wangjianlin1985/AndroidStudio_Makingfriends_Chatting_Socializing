package com.ideabobo.util;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.io.UnsupportedEncodingException;
import java.lang.reflect.Field;
import java.sql.Timestamp;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;

import org.springframework.util.ResourceUtils;
import org.springframework.web.multipart.MultipartFile;

import com.ideabobo.StartGenerator;

public class Common {
	public static Object getByRequestSetfile(Object model,String fileField,String fileNames,HttpServletRequest request,boolean jsonp){

		//Object model = c.getInterfaces();
		Class c = model.getClass();
		Map<String,String> map = new HashMap();
		if(fileNames!=null){
			if(StringUtil.isNotNullOrEmpty(fileField)){
				map.put(fileField, fileNames);
			}else{
				map.put("img", fileNames);
			}
			
		}
		
		Map<String,String[]> parammap = request.getParameterMap();

		for(Map.Entry<String, String[]> entry:parammap.entrySet()){
			String[] value = entry.getValue();
			if(value.length==1){
				map.put(entry.getKey(),value[0]);
			}
		}

		Field[] fields = c.getDeclaredFields();
		try {
			for(int i=0;i<fields.length;i++){
				Field field = fields[i];
				field.setAccessible(true);
				String fname = field.getName();
				String mvalue = map.get(fname);
				if(mvalue != null && !mvalue.equals("") && !mvalue.equals("null")){
					String ftype = field.getType().getSimpleName();
					if(ftype.equals("String")){
						if(jsonp){
							field.set(model, encodeGet(mvalue));
						}else{
							field.set(model, mvalue);
						}
						
					}else if(ftype.equals("Integer") || ftype.equals("int")){
						field.set(model, Integer.parseInt(mvalue));
					}else if(ftype.equals("Double")){
						field.set(model, Double.parseDouble(mvalue));
					}else if(ftype.equals("Timestamp")){
						Timestamp timestamp = Timestamp.valueOf(mvalue);
						field.set(model,timestamp);
					}
				}
			}
		}catch (IllegalAccessException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return model;
	}
	public static Object getByRequest(Object model,HttpServletRequest request,boolean jsonp){
		//Object model = c.getInterfaces();
		Class c = model.getClass();
		Map<String,String> map = new HashMap();
		Map<String,String[]> parammap = request.getParameterMap();

		for(Map.Entry<String, String[]> entry:parammap.entrySet()){
			String[] value = entry.getValue();
			if(value.length==1){
				map.put(entry.getKey(),value[0]);
			}
		}

		Field[] fields = c.getDeclaredFields();
		try {
			for(int i=0;i<fields.length;i++){
				Field field = fields[i];
				field.setAccessible(true);
				String fname = field.getName();
				String mvalue = map.get(fname);
				if(mvalue != null && !mvalue.equals("") && !mvalue.equals("null")){
					String ftype = field.getType().getSimpleName();
					if(ftype.equals("String")){
						if(jsonp){
							field.set(model, encodeGet(mvalue));
						}else{
							field.set(model, mvalue);
						}
						
					}else if(ftype.equals("Integer") || ftype.equals("int")){
						field.set(model, Integer.parseInt(mvalue));
					}else if(ftype.equals("Double")){
						field.set(model, Double.parseDouble(mvalue));
					}else if(ftype.equals("Timestamp")){
						Timestamp timestamp = Timestamp.valueOf(mvalue);
						field.set(model,timestamp);
					}
				}
			}
		}catch (IllegalAccessException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return model;
	}
	
	public static String encodeGet(String str){
		if(str!=null){
			try {
				str = new String(str.getBytes("iso8859-1"),"utf-8");
			} catch (UnsupportedEncodingException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}		
		return str;
	}
	
	public static String copyFile2Upload(MultipartFile[] files) throws Exception{

		  
		String[] remoteNames = new String[files.length];
		String fileNames = "";
		String path = ResourceUtils.getURL("classpath:").getPath();
		String tagetPath = path+"static/upload/";
		String preplace = "target/classes";
		String targetSrcPath = tagetPath.replace(preplace,"src/main/resources");
		File targetDir = new File(tagetPath);
		if (!targetDir.exists()) {
			targetDir.mkdirs();
		}
		/*if (!targetSrcDir.exists()) {
			targetSrcDir.mkdirs();
		}*/
		// 循环获取files数组中的文件
		for (int i = 0; i < files.length; i++) {
			if (i > 0) {
				// 循环太快，会导致时间戳一样
				Thread.sleep(1);
			}
			
			MultipartFile file = files[i];
			String realName = file.getOriginalFilename();
			String filePfix = realName.substring(realName.lastIndexOf("."),realName.length());
			remoteNames[i] = UUID.randomUUID() + filePfix; // 服务器端存储的名字
			fileNames += remoteNames[i] + ",";
		}
 
		// 不加try,catch上传失败，回滚

		for (int i = 0; i < files.length; i++) {
			MultipartFile file = files[i];
			InputStream in = file.getInputStream();
			byte[] buffer = new byte[in.available()];
			in.read(buffer);
			
			File targetFile = new File(tagetPath+remoteNames[i]);
			File targetSrcFile = new File(targetSrcPath+remoteNames[i]);

			OutputStream outStream = new FileOutputStream(targetFile);
			OutputStream outSrcStream = new FileOutputStream(targetSrcFile);
			outStream.write(buffer);
			outSrcStream.write(buffer);
			if(in!=null){
				in.close();
			}
			if(outStream!=null){
				outStream.close();
				outSrcStream.close();
			}
		}
		// 返回信息
		fileNames = fileNames.substring(0, fileNames.length() - 1);// 去掉最后一个,	 
		return fileNames;
	}
	public static Properties properties = null;
	
	public static String getProperty(String key){
		String r = null;
		if(properties!=null){
			r = properties.getProperty(key);
		}else{
			properties = new Properties();
			// 使用ClassLoader加载properties配置文件生成对应的输入流
			InputStream in = Common.class.getClassLoader()
					.getResourceAsStream("application.properties");
			if(in!=null){
				try {
					properties.load(in);
					r = properties.getProperty(key);
				} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
		}
		
		
		
		return r;
	}
	
	public static String toUpperCaseFirstOne(String s){
		  if(Character.isUpperCase(s.charAt(0)))
		    return s;
		  else
		    return (new StringBuilder()).append(Character.toUpperCase(s.charAt(0))).append(s.substring(1)).toString();
		}
	
	public static void str2File(String path,String str){
	    try {
	    	OutputStreamWriter osw = new OutputStreamWriter(new FileOutputStream(path),"UTF-8");
	        osw.write(str);
	        osw.close();
	    } catch (IOException e) {
	      e.printStackTrace();
	    }

	}

}
