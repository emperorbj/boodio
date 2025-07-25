import "../../../global.css"
import { StatusBar } from 'expo-status-bar';
import {FlatList, View,Image,ActivityIndicator,Text } from 'react-native';
import { useQuery } from "@tanstack/react-query";
import SelectBook from "../../components/SelectBook";
import { fetchBooks } from "../../../services/bookServices";


export default function  PlayList() {

  const {data,isLoading,error} = useQuery({
    queryKey:['books'],
    queryFn:fetchBooks
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
    <View className="flex-1 justify-center bg-slate-900 pt-20 p-4">
       <View className='flex-row items-center justify-between mb-4'>
          <Text className='text-2xl text-white font-bold mb-4'>Add to Library{" "}✒️</Text>
        </View>
      <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({item}) => <SelectBook book={item} />}
      contentContainerClassName="gap-4"
      />
      <StatusBar style="auto" />
    </View>
  );
}


