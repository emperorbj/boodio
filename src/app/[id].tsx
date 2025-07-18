import { View, Text,Pressable,Image } from 'react-native'
import React from 'react'
import Entypo from '@expo/vector-icons/Entypo';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import dummyBooks from '../dummyBooks';
import { Ionicons } from '@expo/vector-icons';
import ProgressBar from '../components/ProgressBar';
import { useLocalSearchParams } from 'expo-router';
import { useAudioPlayer,useAudioPlayerStatus } from 'expo-audio';
import { usePlayer } from '../provider/PlayerProvider';
import { PlayerTypeProps } from '../../types/data';

const player = () => {

  const {id} = useLocalSearchParams()
  // const book = dummyBooks.find((item)=> item.id === id)
  
    const { player,book,setBook } = usePlayer() as PlayerTypeProps
  // const player = useAudioPlayer({uri:book?.audio_url})
  const playerStatus = useAudioPlayerStatus(player)


  return (
    <SafeAreaView className='flex-1 bg-slate-900 p-4 py-24'>
        <Pressable onPress={()=> router.back()} className='absolute top-16 left-5 p-2 rounded-full bg-slate-800'>
          <Entypo name="chevron-down" size={24} color="white" />
        </Pressable>
        <Image source={{uri:book?.thumbnail_url}} className="w-[95%] aspect-square rounded-md self-center"/>

        <View className='flex-1 items-center gap-6'>
          <Text className='text-2xl text-white mt-6'>{book?.title}</Text>
          <Text className='text-white'>by{" "}{book?.author}</Text>
          <ProgressBar
          onSeek={(seconds:number)=> player.seekTo(seconds)}
          currentTime={playerStatus.currentTime}
          duration={playerStatus.duration}/>

          <View className='flex-row items-center justify-center gap-10 mt-12'>
            <Ionicons name='play-skip-back' size={24} color={'white'}/>
            <Ionicons name='play-back' size={24} color={'white'}/>
            <Ionicons onPress={()=> playerStatus.playing ? player.pause() : player.play()}
            name={playerStatus.playing ? 'pause' : 'play'} size={50} color={'white'}/>
            <Ionicons name='play-forward' size={24} color={'white'}/>
            <Ionicons name='play-skip-forward' size={24} color={'white'}/>
          </View>
        </View>
    </SafeAreaView>
  )
}

export default player