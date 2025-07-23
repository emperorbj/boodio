import {Text, View,Image,Pressable } from 'react-native';
import {AntDesign} from '@expo/vector-icons';
import { Link } from 'expo-router';
import { BookListProps } from '../../types/data';
import { usePlayer } from '../provider/PlayerProvider';
import { useAuthStore } from '../../store/useAuthStore';
import { supabase } from '../../lib/supabase';
import { useMutation,useQueryClient } from '@tanstack/react-query';
import Toast from 'react-native-toast-message'
import Feather from '@expo/vector-icons/Feather';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';


const FavoriteBooksList = ({book}: BookListProps ) => {
  const queryClient = useQueryClient()
  const {setBook} = usePlayer() as any
  const {user} = useAuthStore() as any

  const removeBookFromLibrary = async ()=> {
    const {data:existing,error:errorExisting} = await supabase.from('library')
    .select('*')
    .eq('user_id', user.id)
    .eq('book_id', book.id)
    .maybeSingle()

    if(errorExisting){
      Toast.show({
        type: 'error',
        text1: 'Error checking book',
        text2: errorExisting.message,
      });
      return;
    }

    if(!existing){
      Toast.show({
        type: 'info',
        text1: `${book.title} not found`,
        text2: 'This book is not in your Favorites.',
      });
      return;
    }

    const {error:deleteError} = await supabase.from('library')
    .delete()
    .eq('user_id', user.id)
    .eq('book_id', book.id)

    if(deleteError){
      Toast.show({
        type: 'error',
        text1: 'Failed to remove book', 
        text2: deleteError.message,
      });
      return;
    }

    Toast.show({
      type: 'success',
      text1: 'Book removed',
      text2: `${book.title} has been removed from your Favorites.`,
    });
  }

  const {mutate,isPending} = useMutation({
    mutationFn: removeBookFromLibrary,
    onSuccess: () =>{
      queryClient.invalidateQueries({queryKey: ['likes']});
    }  });





  return (

    // <Link href={`/${book.id}`} asChild>
      <Pressable
      onPress={()=> setBook(book)}
      className="flex-row justify-center gap-4">
        <Image source={{uri:book?.thumbnail_url}} className="w-20 aspect-square rounded-lg"/>
        <View className="flex-1 gap-1">
          <Text className="text-lg text-orange-500">{book?.title}</Text>
          <Text className="text-sm text-white">{book?.author}</Text>
        </View>
        {
        isPending ? 
        <Feather onPress={()=> mutate()} name="loader" size={24} color="gainsboro"
        className={`text-center mt-4 mr-6 animate-ping`}/>
        : 
        <MaterialIcons onPress={()=> mutate()} name="delete-outline" size={24} color="orange"
        className={`text-center mt-4 mr-6`}/>
        
        }
      </Pressable>
      // </Link>
  )
}

export default FavoriteBooksList