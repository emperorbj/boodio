import "../../global.css"
import { StatusBar } from 'expo-status-bar';
import {FlatList, View,Image } from 'react-native';
import books from '../dummyBooks';
import BookList from "../components/BookList";


export default function App() {
  return (
    <View className="flex-1 justify-center bg-slate-900 pt-20 p-4">
      <FlatList
      data={books}
      keyExtractor={(item) => item.id}
      renderItem={({item}) => <BookList book={item} />}
      contentContainerClassName="gap-4"
      />
      <StatusBar style="auto" />
    </View>
  );
}


