import { Component, PropsWithChildren } from 'react'
import { View, Text } from '@tarojs/components'
import RootSiblings from 'react-native-root-siblings'

import './index.scss'
import Taro from '@tarojs/taro'
import { startTracking } from '../../utils/Location'

export default class Index extends Component<PropsWithChildren> {

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () {
    setTimeout(startTracking, 3000)
  }

  componentDidHide () { }

  render () {
    return (
      <View className='index'>
        { (new Array(1000).fill(1)).map((_item, index) => {
          return <View key={index}>{index}</View>
        })}
      </View>
    )
  }
}
