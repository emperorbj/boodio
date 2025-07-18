import { View, Text } from 'react-native'
import React from 'react'

const ProgressBar = ({value}:{value:number}) => {
  return (
    <View className='w-full h-2 bg-slate-800 justify-center rounded-full mt-6'>
      <View style={{width: `${value * 100}%`}} className='h-full bg-orange-600 rounded-full'/>
      <View className='absolute rounded-full w-3 h-3 -translate-x-1/2 bg-orange-600' style={{left: `${value*100}%`}}/>
    </View>
  )
}

export default ProgressBar