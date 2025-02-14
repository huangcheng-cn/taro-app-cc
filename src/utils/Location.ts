import Taro from '@tarojs/taro';
import { NativeModules, NativeEventEmitter, Platform, PermissionsAndroid } from 'react-native';

const { LocationModule } = NativeModules;
const eventEmitter = new NativeEventEmitter(LocationModule);

// 请求位置权限
const requestLocationPermission = async () => {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION,
      ]);

      console.log(granted)
      
      return Object.values(granted).every(
        permission => permission === PermissionsAndroid.RESULTS.GRANTED
      );
    } catch (err) {
      console.warn('权限请求错误：', err);
      return false;
    }
  }
  return true; // iOS 在 Info.plist 中处理
};

// 开始监听位置更新
export const startTracking = async () => {
  const hasPermission = await requestLocationPermission();
  if (!hasPermission) {
    console.error('未获得位置权限');
    return;
  }
  
  LocationModule.startLocationUpdates();
  
  // 监听位置更新
  eventEmitter.addListener('locationUpdate', (location) => {
    const locationData = JSON.parse(location);
    console.log('新的位置：', locationData);
    Taro.request({
      method: 'GET',
      url: 'httt://www.baidu.com'
    })
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
  });

  // 监听错误信息
  eventEmitter.addListener('locationError', (error) => {
    console.error('定位错误：', error);
  });
};

// 停止监听
export const stopTracking = () => {
  LocationModule.stopLocationUpdates();
}; 