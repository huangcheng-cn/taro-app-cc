package com.cutpictureboy;

import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.app.Service;
import android.content.Intent;
import android.location.Location;
import android.os.Build;
import android.os.IBinder;
import android.os.Looper;

import androidx.core.app.NotificationCompat;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.amap.api.location.AMapLocation;
import com.amap.api.location.AMapLocationClient;
import com.amap.api.location.AMapLocationClientOption;
import com.amap.api.location.AMapLocationListener;

public class LocationModule extends ReactContextBaseJavaModule {
    private static final String CHANNEL_ID = "location_channel";
    private AMapLocationClient locationClient;
    private final ReactApplicationContext reactContext;

    public LocationModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
        try {
            AMapLocationClient.updatePrivacyShow(reactContext, true, true);
            AMapLocationClient.updatePrivacyAgree(reactContext, true);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public String getName() {
        return "LocationModule";
    }

    @ReactMethod
    public void startLocationUpdates() {
        try {
            locationClient = new AMapLocationClient(reactContext);
            
            AMapLocationClientOption option = new AMapLocationClientOption();
            option.setLocationMode(AMapLocationClientOption.AMapLocationMode.Hight_Accuracy);
            option.setInterval(10000);
            
            locationClient.setLocationOption(option);
            locationClient.setLocationListener(new AMapLocationListener() {
                @Override
                public void onLocationChanged(AMapLocation location) {
                    if (location != null && location.getErrorCode() == 0) {
                        sendLocationToJS(location);
                    }
                }
            });
            
            locationClient.startLocation();
            startForegroundService();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @ReactMethod
    public void stopLocationUpdates() {
        if (locationClient != null) {
            locationClient.stopLocation();
            locationClient.onDestroy();
            locationClient = null;
        }
    }

    private void sendLocationToJS(AMapLocation location) {
        reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit("locationUpdate", String.format(
                        "{\"latitude\":%f,\"longitude\":%f}",
                        location.getLatitude(),
                        location.getLongitude()
                ));
    }

    private void startForegroundService() {
        Intent serviceIntent = new Intent(reactContext, LocationService.class);
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            reactContext.startForegroundService(serviceIntent);
        } else {
            reactContext.startService(serviceIntent);
        }
    }
}