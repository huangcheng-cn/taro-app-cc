import { Component, PropsWithChildren } from 'react'
import { View, Text } from '@tarojs/components'
import RootSiblings from 'react-native-root-siblings'

import './index.scss'
import Taro from '@tarojs/taro'

export default class Index extends Component<PropsWithChildren> {

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () {
    // const view = new RootSiblings(<View
    //   style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: '#00000099'}}>
    //   </View>)
    // console.log(view)
  }

  componentDidHide () { }

  render () {
    return (
      <View className='index'>
        <Text>Hello world!</Text>
      </View>
    )
  }
}
