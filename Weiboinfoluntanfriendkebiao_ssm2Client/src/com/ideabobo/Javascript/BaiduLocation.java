package com.ideabobo.Javascript;


import org.apache.cordova.CordovaActivity;
import org.json.JSONException;
import org.json.JSONObject;

import com.baidu.location.BDLocation;
import com.baidu.location.BDLocationListener;
import com.baidu.location.LocationClient;
import com.baidu.location.LocationClientOption;
import com.baidu.location.LocationClientOption.LocationMode;

import android.content.Context;
import android.util.Log;
import android.webkit.JavascriptInterface;
import android.webkit.WebView;
import android.widget.Toast;

public class BaiduLocation {
	public Context ctx= null;
	public JSONObject json = new JSONObject();
	public  LocationClient mLocationClient = null;
	public BDLocationListener myListener = new MyLocationListener();
    private CordovaActivity mGap;
    public static boolean flag = false;
	public BaiduLocation(CordovaActivity mGap){
		this.mGap = mGap;
		ctx = mGap.getApplicationContext();
		mLocationClient = new LocationClient(ctx); // 声明LocationClient类
		mLocationClient.registerLocationListener(myListener); // 注册监听函数
		LocationClientOption option = new LocationClientOption();
		option.setLocationMode(LocationMode.Hight_Accuracy);// 设置定位模式
		option.setCoorType("bd09ll");// 返回的定位结果是百度经纬度，默认值gcj02
		option.setScanSpan(300000);// 设置发起定位请求的间隔时间为5000ms
		option.setIsNeedAddress(true);// 返回的定位结果包含地址信息
		option.setNeedDeviceDirect(true);// 返回的定位结果包含手机机头的方向
		mLocationClient.setLocOption(option);
		mLocationClient.start();
		
	}
	@JavascriptInterface
	public String getLocation() {
		//Toast.makeText(ctx, "location", Toast.LENGTH_LONG).show();
		flag = true;
		if (mLocationClient != null && mLocationClient.isStarted()) {
			mLocationClient.requestLocation();
		} else {
			Log.d("LocSDK3", "locClient is null or not started");
		}
		return "phonegap";
	}
	
	public class MyLocationListener implements BDLocationListener {
		@Override
		public void onReceiveLocation(BDLocation location) {
			if (location == null)
				return;
			try {
				json.put("time", location.getTime());
				json.put("code", location.getLocType());
				json.put("latitude", location.getLatitude());
				json.put("longitude", location.getLongitude());

				if (location.getLocType() == BDLocation.TypeGpsLocation) {
					json.put("speed", location.getSpeed());
					json.put("satellite", location.getSatelliteNumber());
				} else if (location.getLocType() == BDLocation.TypeNetWorkLocation) {
					json.put("addr", location.getAddrStr());
				}
				if(flag){
					mGap.sendJavascript("getPositionByBaidu('"+json.toString()+"')");
				}
				
			} catch (JSONException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			 

			//Toast.makeText(ctx, json.toString()+"flag:"+flag, Toast.LENGTH_LONG).show();
		}

	}
	
	
}
