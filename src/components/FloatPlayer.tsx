import {Text, View,Image,Pressable,StyleSheet,Dimensions } from 'react-native';
import {AntDesign} from '@expo/vector-icons';
import { Link } from 'expo-router';
import { useAudioPlayer,useAudioPlayerStatus } from 'expo-audio';
import dummyBooks from '../dummyBooks';
import { usePlayer } from '../provider/PlayerProvider';
import { PlayerTypeProps } from '../../types/data';
import { useState } from 'react';
import { supabase } from '../../lib/supabase';
import Toast from 'react-native-toast-message';
import { useQuery,useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

const {width} = Dimensions.get('window')
const FloatPlayer = () => {
  const queryClient = useQueryClient()
  const { player,book,setBook } = usePlayer() as PlayerTypeProps
  const [startTime, setStartTime] = useState<number|null>(null);
  // const player = useAudioPlayer({uri:book?.audio_url})
  const PlayerStatus = useAudioPlayerStatus(player)

  const LogListenSessions = async (minutes:number) => {
    if (!book || !PlayerStatus) return;

    const {data:userData,error:userError} = await supabase.auth.getUser()
    if(userError || !userData.user) {
      Toast.show({
        type: 'error',
        text1: 'Error fetching user',
        text2: userError?.message || 'Unable to fetch user data.',
    }
      );
      return;
    }

    const {error} = await supabase.from('listening_sessions').insert({
      user_id: userData.user.id,
      book_id: book.id,
      duration_minutes: minutes,
      listened_at: new Date().toISOString(),
    });
    if (error) {
      Toast.show({
        type: 'error',
        text1: 'Error logging session',
        text2: error.message,
      });
    } else {
      queryClient.invalidateQueries({queryKey: ['listening_sessions']});
    }
  }

    // Track play time
  useEffect(() => {
    if (PlayerStatus.playing && !startTime) {
      setStartTime(Date.now());
    } else if (!PlayerStatus.playing && startTime) {
      const durationMs = Date.now() - startTime;
      const durationMinutes = Math.round(durationMs / 60000); // Convert to minutes
      if (durationMinutes > 0) {
        LogListenSessions(durationMinutes);
      }
      setStartTime(null);
    }
  }, [PlayerStatus.playing, startTime]);



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