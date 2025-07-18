import {Text, View,Image,Pressable } from 'react-native';
import {AntDesign} from '@expo/vector-icons';
import {Book} from '../../types/data';
import { Link } from 'expo-router';

type BookListProps = {
    book: Book;
}

const BookList = ({book}: BookListProps ) => {
  return (

    <Link href={`/${book.id}`} asChild>
      <Pressable className="flex-row justify-center gap-4">
        <Image source={{uri:book.thumbnail_url}} className="w-20 aspect-square rounded-lg"/>

        <View className="flex-1 gap-1">
          <Text className="text-lg text-orange-500">{book.title}</Text>
          <Text className="text-sm text-white">{book.author}</Text>
        </View>
        <AntDesign name="playcircleo" size={24} color="gainsboro" className="text-center mt-4 mr-6"/>
      </Pressable>
      </Link>
  )
}

export default BookList