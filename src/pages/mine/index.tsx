import { Component, PropsWithChildren } from 'react'
import { View } from '@tarojs/components'
import { AMapSdk, MapType, MapView } from 'react-native-amap3d'
import { NativeModules, Platform } from 'react-native'
import './index.scss'



async function initSDK() {
  const AMapGeolocation = NativeModules.AMapGeolocation;
  await AMapGeolocation.init(Platform.select({
    ios: 'xxx'
  }))
  
  AMapSdk.init(
    Platform.select({
      ios: 'xxx'
    })
  )
}

export default class Index extends Component<PropsWithChildren> {
  public state = {
    height: 0,
    visible: false
  }

  constructor(props: PropsWithChildren) {
    super(props)
  }
  componentDidMount() {
    setTimeout(async () => {
      await initSDK()
      this.setState({ height: 600 })
      this.setState({ visible: true })
    }, 50)
  }

  componentWillUnmount() { }

  componentDidShow() {
    // const view = new RootSiblings(<View
    //   style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: '#00000099'}}>
    //   </View>)
    // console.log(view)
  }

  componentDidHide() { }

  render() {
    return (
      <View className='index'>
        <MapView
          style={{ height: this.state.height }}
          mapType={MapType.Standard}
          myLocationButtonEnabled
          myLocationEnabled
          initialCameraPosition={{
            zoom: 16,
          }}
        />
      </View>
    )
  }
}
