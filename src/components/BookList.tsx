import {Text, View,Image } from 'react-native';
import {AntDesign} from '@expo/vector-icons';
import {Book} from '../../types/data';


type BookListProps = {
    book: Book;
}

const BookList = ({book}: BookListProps ) => {
  return (
      <View className="flex-row justify-center gap-4">
        <Image source={{uri:book.thumbnail_url}} className="w-20 aspect-square rounded-lg"/>

        <View className="flex-1 gap-1">
          <Text className="text-lg text-orange-500">{book.title}</Text>
          <Text className="text-sm text-white">{book.author}</Text>
        </View>
        
        <AntDesign name="playcircleo" size={24} color="gainsboro" className="text-center mt-4"/>
      </View>
  )
}

export default BookList