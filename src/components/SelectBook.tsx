import {Text, View,Image,Pressable } from 'react-native';
import {AntDesign} from '@expo/vector-icons';
import { Link } from 'expo-router';
import { BookListProps } from '../../types/data';
import { useAuthStore } from '../../store/useAuthStore';
import { useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { useMutation } from '@tanstack/react-query';
import Toast from 'react-native-toast-message'




const SelectBook = ({book}: BookListProps ) => {


  const {user} = useAuthStore() as any




  const saveBookToLibrary = async () => {

    const {data:existing,error:existError} = await supabase.from('library')
    .select('*')
    .eq('user_id', user.id)
    .eq('book_id', book.id)
    .maybeSingle();


    if (existError) {
      Toast.show({
        type: 'error',
        text1: 'Error checking book',
        text2: existError.message,
      });
      return;
    }

    if (existing) {
      Toast.show({
        type: 'info',
        text1: `${book.title} already exists`,
        text2: 'This book is already in your Favorites.',
      });
      return;
    }


    const{error:insertError} = await supabase.from('library').insert({
      user_id: user.id,
      book_id: book.id
    });
    if(insertError){
      Toast.show({
        type: 'error',
        text1: 'Failed to add book', 
        text2: insertError.message,
      });
      return;
    }
    Toast.show({
          type: 'success',
          text1: `${book?.title} Added successfully`,
        });
  }

  const {mutate} = useMutation({
    mutationFn: saveBookToLibrary,
  })

  

  return (
      <Pressable
      onPress={()=> {}}
      className="flex-row justify-center gap-4">
        <Image source={{uri:book.thumbnail_url}} className="w-20 aspect-square rounded-lg"/>

        <View className="flex-1 gap-1">
          <Text className="text-lg text-orange-500">{book.title}</Text>
          <Text className="text-sm text-white">{book.author}</Text>
        </View>
        <AntDesign onPress={() => mutate()} name="pluscircleo" size={24} color="gainsboro" className="text-center mt-4 mr-6"/>
      </Pressable>
    
  )
}

export default SelectBook