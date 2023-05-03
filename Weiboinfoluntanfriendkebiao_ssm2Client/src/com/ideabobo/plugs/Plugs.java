package com.ideabobo.plugs;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.net.URISyntaxException;
import java.util.HashMap;
import java.util.Map;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaInterface;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.PluginResult;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

//import com.google.zxing.WriterException;
//import com.ideabobo.codescan.MipcaActivityCapture;
import com.ideabobo.gap.MainActivity;
import com.ideabobo.tool.FileTool;
//import com.zxing.encoding.EncodingHandler;

import android.app.Activity;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.database.Cursor;
import android.graphics.Bitmap;
import android.net.Uri;
import android.os.Bundle;
import android.provider.MediaStore;
import android.util.Log;
import android.widget.EditText;
import android.widget.Toast;

public class Plugs extends CordovaPlugin {
	public String str = "";
	private Bitmap qrCodeBitmap;
	private CallbackContext callbackContext=null;

	@Override
	public boolean execute(String action, JSONArray args,
			CallbackContext callbackContext) throws JSONException {
		this.callbackContext = callbackContext;
		// TODO Auto-generated method stub
		if (action.equals("backup")) {
			this.backUp(callbackContext);
			return true;
		} else if (action.equals("upload")) {
			String jo = args.getString(0);
			return true;
		} else if (action.equals("setting")) {
			this.openSetting();
			return true;
		} else if (action.equals("restore")) {
			this.restore(callbackContext);
			return true;
		} else if (action.equals("share")) {
			JSONObject jo = args.getJSONObject(0);
			this.share(jo.getString("subject"), jo.getString("text"));
			return true;
		} else if (action.equals("downloadFile")) {
			String fileUrl = args.getString(0);
			this.downLoad(fileUrl);
			return true;
		}else if (action.equals("scan")) {
			//this.scan(callbackContext);
			return true;
		}else if (action.equals("createcode")) {
			String json = args.getString(0);
			Intent intent = new Intent();
			intent.putExtra("json", json);
			intent.setClass(this.cordova.getActivity(), MainActivity.class);
			this.cordova.startActivityForResult(this, intent, 1);
			//this.createCodeImg(json, callbackContext);
			return true;
		} else if (action.equals("jisuanqi")) {
			Intent intent = new Intent();
			intent.setClassName("com.android.calculator2",
					"com.android.calculator2.Calculator");
			this.cordova.startActivityForResult(this, intent, 0);
			return true;
		} else if(action.equals("tobaidu")){
			JSONObject jo = args.getJSONObject(0);
			this.toBaidu(jo.getString("city"),jo.getString("str"));
		}
		else if(action.equals("toDail")){
			JSONObject jo = args.getJSONObject(0);
			this.toDail(jo.getString("tel"));
		}
		else if(action.equals("toAddress")){
			JSONObject jo = args.getJSONObject(0);
			this.toAddress(jo.getString("address"));
		}else if(action.equals("uri2Path")){
			JSONObject jo = args.getJSONObject(0);
			String uri = jo.getString("uri");
			uri2Path(callbackContext,uri);
		}
		return false;
	}

	private void toBaidu(String city,String str) {
		try {

			//Intent intent = Intent.getIntent("intent://map/direction?origin=latlng:34.264642646862,108.95108518068|name:我家&destination=大雁塔&mode=driving®ion=西安&referer=Autohome|GasStation#Intent;scheme=bdapp;package=com.baidu.BaiduMap;end");
			Intent intent = Intent.getIntent("intent://map/place/search?query="+str+"&region="+city+"&referer=yourCompanyName|yourAppName#Intent;scheme=bdapp;package=com.baidu.BaiduMap;end");
			if (isInstallByread("com.baidu.BaiduMap")) {
				this.cordova.startActivityForResult(this, intent, 0); // 启动调用
				Log.e("GasStation", "百度地图客户端已经安装");
			} else {
				Log.e("GasStation", "没有安装百度地图客户端");
			}
		} catch (URISyntaxException e) {
			e.printStackTrace();
		}
	}
	
	
	
	private void toDail(String tel) {
		Intent intent = new Intent(Intent.ACTION_CALL,Uri.parse("tel:"+tel));
		intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        this.cordova.startActivityForResult(this, intent, 0);//内部类
	}
	private void toAddress(String address) {
		try {

			//Intent intent = Intent.getIntent("intent://map/direction?origin=latlng:34.264642646862,108.95108518068|name:我家&destination=大雁塔&mode=driving®ion=西安&referer=Autohome|GasStation#Intent;scheme=bdapp;package=com.baidu.BaiduMap;end");
			Intent intent = Intent.getIntent("intent://map/geocoder?address="+address+"&src=yourCompanyName|yourAppName#Intent;scheme=bdapp;package=com.baidu.BaiduMap;end"); 
			//Intent intent = Intent.getIntent("intent://map/place/search?query="+address+"&referer=yourCompanyName|yourAppName#Intent;scheme=bdapp;package=com.baidu.BaiduMap;end");
			if (isInstallByread("com.baidu.BaiduMap")) {
				this.cordova.startActivityForResult(this, intent, 0); // 启动调用
				Log.e("GasStation", "百度地图客户端已经安装");
			} else {
				Log.e("GasStation", "没有安装百度地图客户端");
			}
		} catch (URISyntaxException e) {
			e.printStackTrace();
		}
	}

	private boolean isInstallByread(String packageName) {
		return new File("/data/data/" + packageName).exists();
	}

	private void downLoad(String fileUrl) {
		Uri uri = Uri.parse(fileUrl);
		Intent intent = new Intent(Intent.ACTION_VIEW, uri);
		this.cordova.startActivityForResult(this, intent, 0);
	}

	private void share(String subject, String text) {
		// TODO Auto-generated method stub
		Intent sendIntent = new Intent(android.content.Intent.ACTION_SEND);
		sendIntent.setType("text/plain");
		sendIntent.putExtra(android.content.Intent.EXTRA_SUBJECT, subject);
		sendIntent.putExtra(android.content.Intent.EXTRA_TEXT, text);
		this.cordova.startActivityForResult(this, sendIntent, 0);
	}

	private void openSetting() {
		Intent intent = new Intent("/");
		ComponentName cm = new ComponentName("com.android.settings",
				"com.android.settings.Settings");
		intent.setComponent(cm);
		this.cordova.startActivityForResult(this, intent, 0);
	}

	private void backUp(CallbackContext callbackContext) {
		// TODO Auto-generated method stub
		// TODO Auto-generated method stub
		new FileTool(this.cordova.getActivity())
				.doInBackground("backupDatabase");
		callbackContext.success("数据库备份成功");
	}

	private void restore(CallbackContext callbackContext) {
		// TODO Auto-generated method stub
		// TODO Auto-generated method stub
		new FileTool(this.cordova.getActivity())
				.doInBackground("restroeDatabase");
		callbackContext.success("数据库恢复成功");
	}

	/*public void scan(CallbackContext callbackContext) {
		Intent intent = new Intent();
		intent.setClass(this.cordova.getActivity(), MipcaActivityCapture.class);
		intent.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);
		this.cordova.startActivityForResult(this, intent, 1);
		PluginResult mPlugin = new PluginResult(PluginResult.Status.NO_RESULT);
		mPlugin.setKeepCallback(true);
		callbackContext.sendPluginResult(mPlugin);
		// Toast.makeText(this.cordova.getActivity(), str,
		// Toast.LENGTH_LONG).show();
		//callbackContext.success(str);
	}*/

	/*public void createCodeImg(String data,CallbackContext callbackContext) {
		try {
			String contentString = "这是我的二维码";
			if (!contentString.equals("")) {
				// 根据字符串生成二维码图片并显示在界面上，第二个参数为图片的大小（350*350）
				qrCodeBitmap = EncodingHandler.createQRCode(contentString, 350);
				if (!android.os.Environment.getExternalStorageState().equals(
						android.os.Environment.MEDIA_MOUNTED)) {
					Toast.makeText(this.cordova.getActivity(), "没有检测到内存卡",
							Toast.LENGTH_LONG).show();
					return;
				}
				String input = "test";
				File file = new File("/sdcard/ideacode/");

				if (!file.exists()) {
					file.mkdirs();
				}
				File imageFile = new File(file, input + ".png");

				try {
					imageFile.createNewFile();
					FileOutputStream fos = new FileOutputStream(imageFile);
					// Bitmap obmp = qrCodeBitmap;
					qrCodeBitmap.compress(Bitmap.CompressFormat.PNG, 100, fos);
					fos.flush();
					fos.close();
					Toast.makeText(this.cordova.getActivity(),
							"图片已经保存至" + imageFile, Toast.LENGTH_LONG).show();
					Log.i("1", "meicuo");
					callbackContext.success("success");
				} catch (IOException e) {
					// TODO Auto-generated catch block
					Log.i("1", "catch");
					e.printStackTrace();
				}
			} else {

			}

		} catch (WriterException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}*/

	@Override
	public void onActivityResult(int requestCode, int resultCode, Intent intent) {
		// TODO Auto-generated method stub
		super.onActivityResult(requestCode, resultCode, intent);
		switch (resultCode) { // resultCode为回传的标记，我在第二个Activity中回传的是RESULT_OK
		case Activity.RESULT_OK:
			Bundle b = intent.getExtras(); // data为第二个Activity中回传的Intent
			str = b.getString("result");// str即为回传的值
			callbackContext.success(str);
			break;
		default:
			break;
		}
	}
	
	private void uri2Path(CallbackContext callbackContext,String uristr) {

		Uri uri = Uri.parse(uristr);  
		  
		  
		String[] proj = { MediaStore.Images.Media.DATA };     
		Cursor actualimagecursor = this.cordova.getActivity().managedQuery(uri,proj,null,null,null);    
		int actual_image_column_index = actualimagecursor.getColumnIndexOrThrow(MediaStore.Images.Media.DATA);     
		actualimagecursor.moveToFirst();     
		  
		  
		String img_path = actualimagecursor.getString(actual_image_column_index);    
		File file = new File(img_path);  
		Uri fileUri = Uri.fromFile(file);  
		callbackContext.success("数据库恢复成功");
	}
	

}
