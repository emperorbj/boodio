import { View, Text,Pressable, GestureResponderEvent } from 'react-native'
import React, { useState,useCallback } from 'react'
import { ProgressProps } from '../../types/data'


const ProgressBar = ({currentTime,duration,onSeek}:ProgressProps) => {

    const value = currentTime/duration

    const [width,setWidth] = useState(0)

    const formatTime = (time:number) => {
        const minutes = Math.floor(time/60);
        const seconds = Math.floor(time%60)
        return `${minutes}:${seconds.toString().padStart(2,'0')}`
    }

    const handleSeek = useCallback((event:GestureResponderEvent) => {
        const pressX = event.nativeEvent.locationX
        const percentage = pressX /width
        const seekToSeconds = Math.min(Math.max((duration*percentage),0),duration)
        onSeek(seekToSeconds)
    },[width,duration,onSeek])


  return (
    <View className='w-full'>
        <Pressable
        // get the width of the progress bar
        hitSlop={30}
        onLayout={(event)=>setWidth(event.nativeEvent.layout.width)}
        onPress={handleSeek}
        className='w-full h-2 bg-slate-800 justify-center rounded-full mt-6'>
            <View style={{width: `${value * 100}%`}} className='h-full bg-orange-600 rounded-full'/>
            <View className='absolute rounded-full w-3 h-3 -translate-x-1/2 bg-orange-600' style={{left: `${value*100}%`}}/>
        </Pressable>
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