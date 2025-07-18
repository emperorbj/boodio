import {Text, View,Image,Pressable,StyleSheet,Dimensions } from 'react-native';
import {AntDesign} from '@expo/vector-icons';
import { Link } from 'expo-router';
import { useAudioPlayer,useAudioPlayerStatus } from 'expo-audio';
import dummyBooks from '../dummyBooks';
import { usePlayer } from '../provider/PlayerProvider';
import { PlayerTypeProps } from '../../types/data';


const {width} = Dimensions.get('window')
const FloatPlayer = () => {
  
  const { player,book,setBook } = usePlayer() as PlayerTypeProps
  // const player = useAudioPlayer({uri:book?.audio_url})
  const PlayerStatus = useAudioPlayerStatus(player)

  if(!book) return null 
  
  return (
    <View style={styles.container}>
    <Link href={`/${book?.id}`} asChild>
      <Pressable
      className={`flex-row justify-center bg-slate-700 gap-4 rounded-md p-2`}>
        <Image source={{uri:book?.thumbnail_url}} className="w-20 aspect-square rounded-lg"/>
        <View className="flex-1 gap-1">
          <Text className={`text-lg ${PlayerStatus.playing ? "text-orange-600" : "text-white"}`}>{book?.title}</Text>
          <Text className={`text-sm ${PlayerStatus.playing ? "text-orange-600" : "text-white"}`}>{book?.author}</Text>
        </View>
        <AntDesign
        onPress={()=>PlayerStatus.playing ? player.pause() : player.play()}
        name={PlayerStatus.isBuffering ? 'loading1' : PlayerStatus.playing?"pause" : "playcircleo"} size={24}
        color={PlayerStatus.playing ? "orange":"gainsboro"} className="text-center mt-4 mr-6"/>
      </Pressable>
      </Link>
    </View>
  )
}



const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 60 + 40, // tab bar height + margin
    left: 10,
    right: 10,
    zIndex: 999,
    width: width - 20,
    alignSelf: 'center',
  },
});

export default FloatPlayer