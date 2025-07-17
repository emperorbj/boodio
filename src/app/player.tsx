import { View, Text,Pressable } from 'react-native'
import React from 'react'
import Entypo from '@expo/vector-icons/Entypo';
import { router } from 'expo-router';




const player = () => {
    
  return (
    <View className='flex-1 bg-slate-900 items-center justify-center'>
        <Pressable onPress={()=> router.back()} className='absolute top-16 left-5 p-2 rounded-full bg-slate-800'>
        <Entypo name="chevron-down" size={24} color="white" />
        </Pressable>
    </View>
  )
}

export default player