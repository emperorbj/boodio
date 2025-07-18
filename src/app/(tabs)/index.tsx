import "../../../global.css"
import { StatusBar } from 'expo-status-bar';
import {FlatList, View,Image,ActivityIndicator,Text } from 'react-native';
import books from '../../dummyBooks';
import BookList from "../../components/BookList";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../../lib/supabase";


export default function App() {

  const fetchBooks = async () => {
      const {data,error} = await supabase.from('books').select('*')
      if(error){
        throw error
      }
      return data
    
  }

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
      <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({item}) => <BookList book={item} />}
      contentContainerClassName="gap-4"
      />
      <StatusBar style="auto" />
    </View>
  );
}


