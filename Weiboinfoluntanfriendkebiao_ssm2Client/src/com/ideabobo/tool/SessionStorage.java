package com.ideabobo.tool;

import java.util.HashMap;

public class SessionStorage {
	public static HashMap<String, String> map = new HashMap<String, String>();
	public static void set(String key,String value){
		map.put(key, value);
	}
	public static String get(String key){
		return map.get(key);
	}
}
