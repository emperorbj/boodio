import { View, Text,ActivityIndicator,FlatList, } from 'react-native'
import React, { useCallback } from 'react'
import { useQuery } from '@tanstack/react-query'
import { supabase } from '../../../lib/supabase'
import FavoriteBooksList from '../../components/FavoriteList'
import { StatusBar } from 'expo-status-bar'
import { useFocusEffect } from 'expo-router'



const   likes = () => {

  useFocusEffect(
  useCallback(() => {
    refetch();
  }, [])
);

  const fetchLikes = async () => {
    const {data,error} = await supabase.from('library').select('*,books(*)')
    if(error){
      throw error
    }
    
    return data
  }

  const {data,isLoading,error,refetch} = useQuery({
    queryKey:['likes'],
    queryFn:fetchLikes,
    refetchOnWindowFocus: true,
    refetchOnMount: 'always'
  })

  if(isLoading) return (
    <View className="flex-1 justify-center bg-slate-900 pt-20 p-4">
      <ActivityIndicator size={"large"} color={'#ffffff'}/>
    </View>
  )

  if(error) return  (
    <View className="flex-1 items-center bg-slate-900 justify-center">
      <Text className="text-red-500 text-2xl">{error.message}</Text>
    </View>
  )
  return (
    <View className='flex-1 justify-center  bg-slate-900 pt-20 p-4'>
      <View className='flex-row items-center mb-4'>
        <Text className='text-2xl text-white font-bold'>Favorites{" "}</Text>
        <Text className='animate-spin text-2xl'>😍</Text>
      </View>
      <FlatList
      data={data}
      keyExtractor={(item) => item.books.id}
      renderItem={({item})=>(<FavoriteBooksList book={item.books} />)}
      contentContainerClassName='gap-4'
      /> 
       <StatusBar style="auto" />
    </View>
  )
}

export default likes