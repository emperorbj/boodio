import { View, Text } from 'react-native'
import React from 'react'
import { ProgressProps } from '../../types/data'


const ProgressBar = ({currentTime,duration}:ProgressProps) => {

    const value = currentTime/duration
    const formatTime = (time:number) => {
        const minutes = Math.floor(time/60);
        const seconds = Math.floor(time%60)
        return `${minutes}:${seconds.toString().padStart(2,'0')}`
    }
  return (
    <View className='w-full'>
        <View className='w-full h-2 bg-slate-800 justify-center rounded-full mt-6'>
            <View style={{width: `${value * 100}%`}} className='h-full bg-orange-600 rounded-full'/>
            <View className='absolute rounded-full w-3 h-3 -translate-x-1/2 bg-orange-600' style={{left: `${value*100}%`}}/>
        </View>
        <View className='w-full flex-row px-2 justify-between mt-2'>
            <Text className='text-white'>
                {formatTime(currentTime)}
            </Text>
            <Text className='text-white'>
                {formatTime(duration)}
            </Text>
        </View>
    </View>
  )
}

export default ProgressBar