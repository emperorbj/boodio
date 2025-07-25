import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  Modal,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import { LinearGradientProps, LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { AntDesign, MaterialIcons, Feather, Ionicons } from '@expo/vector-icons';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../../../lib/supabase';
import Toast from 'react-native-toast-message';
import { useRouter } from 'expo-router';
import LogoutModal from '../../components/LogOut';
import { useAuthStore } from '../../../store/useAuthStore';
import { fetchUserProfile,fetchUserActivity,fetchAchievements,awardAchievements } from '../../../services/bookServices';


const { width, height } = Dimensions.get('window');

const Profile = () => {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const {signOut} = useAuthStore() as any;
  const queryClient = useQueryClient();

  

  const { data: userProfile, isLoading, refetch } = useQuery({
    queryKey: ['userProfile'],
    queryFn: fetchUserProfile,
    refetchOnWindowFocus: true,
  });

  const { data: userActivity = [] ,isLoading:activityLoading} : any = useQuery({
    queryKey: ['userActivity'],
    queryFn: fetchUserActivity,
    enabled: !!userProfile,
  });

  const { mutate: awardAchievementsMutation } = useMutation({
    mutationFn: awardAchievements,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['achievements'] });
    },
  });



  const { data: NewAchievements = [], isLoading: achievementsLoading } = useQuery({
    queryKey: ['achievements'],
    queryFn: fetchAchievements,
    refetchOnWindowFocus: true,

  });

  useEffect(() => {
    if (!achievementsLoading && NewAchievements) {
      awardAchievementsMutation();
    }
  }, [achievementsLoading, NewAchievements, awardAchievementsMutation]);



  const [following, setFollowing] = useState(false);



  return (
    <SafeAreaView className="flex-1 bg-black">
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      
      <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
        {/* Header with Background */}
        <View style={{ height: height * 0.45 }} className="mb-5">
          <LinearGradient
            colors={['#FFA500', '#FF6B35', '#1a1a1a']}
            className="flex-1"
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <BlurView intensity={20} className="flex-1 p-5 justify-center items-center">
              <TouchableOpacity onPress={()=> setModalVisible(true)} className="absolute top-12 right-5 w-10 h-10 rounded-full bg-black/30 justify-center items-center">
                <Feather name="settings" size={24} color="white" />
              </TouchableOpacity>
              
              {/* Profile Image */}
              <View className="relative mb-4">
                <Image
                  source={{ uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face' }}
                  className="w-30 h-30 rounded-full border-4 border-white"
                />
                <TouchableOpacity className="absolute -bottom-0 -right-0 w-9 h-9 rounded-full bg-orange-500 justify-center items-center border-3 border-white">
                  <AntDesign name="camera" size={16} color="white" />
                </TouchableOpacity>
              </View>
              
              {/* User Info */}
              <Text className="text-3xl font-bold text-white mb-1">{userProfile?.name}</Text>
              <Text className="text-base text-white/80 mb-2">{userProfile?.email}</Text>
              
              {/* Action Buttons */}
              <View className="flex-row items-center gap-4">
                <TouchableOpacity 
                  className={`px-8 py-3 rounded-full ${following ? 'bg-white/20 border border-white/30' : 'bg-orange-500'}`}
                  onPress={() => setFollowing(!following)}
                >
                  <Text className="text-white text-base font-semibold">
                    {following ? 'Following' : 'Follow'}
                  </Text>
                </TouchableOpacity>
                
                <TouchableOpacity className="w-12 h-12 rounded-full bg-white/20 justify-center items-center border border-white/30">
                  <Feather name="message-circle" size={20} color="#FFA500" />
                </TouchableOpacity>
                
               
              </View>
            </BlurView>
          </LinearGradient>
        </View>

        {/* Stats */}
        <View className="flex-row justify-around bg-neutral-900 mx-5 rounded-2xl py-5 mb-8">
        
        </View>

        {/* Quick Actions */}
        <View className="mx-5 mb-8">
          <Text className="text-xl font-bold text-white mb-4">Quick Actions</Text>
          <View className="flex-row flex-wrap justify-between">
            
            <TouchableOpacity onPress={()=> router.push("(tabs)/playlist")} className="w-[48%] bg-neutral-900 rounded-2xl p-5 items-center mb-4">
              <View className="w-15 h-15 rounded-full bg-orange-500 justify-center items-center mb-3">
                <MaterialIcons name="library-music" size={24} color="white" />
              </View>
              <Text className="text-white text-sm font-semibold text-center">My Playlists</Text>
            </TouchableOpacity>
            
            
            <TouchableOpacity onPress={()=> router.push("(tabs)/likes")} className="w-[48%] bg-neutral-900 rounded-2xl p-5 items-center mb-4">
              <View className="w-15 h-15 rounded-full bg-red-500 justify-center items-center mb-3">
                <MaterialIcons name="favorite" size={24} color="white" />
              </View>
              <Text className="text-white text-sm font-semibold text-center">Liked Songs</Text>
            </TouchableOpacity>
            
            <TouchableOpacity className="w-[48%] bg-neutral-900 rounded-2xl p-5 items-center mb-4">
              <View className="w-15 h-15 rounded-full bg-teal-400 justify-center items-center mb-3">
                <MaterialIcons name="history" size={24} color="white" />
              </View>
              <Text className="text-white text-sm font-semibold text-center">Recently Played</Text>
            </TouchableOpacity>
            
            <TouchableOpacity className="w-[48%] bg-neutral-900 rounded-2xl p-5 items-center mb-4">
              <View className="w-15 h-15 rounded-full bg-green-400 justify-center items-center mb-3">
                <Ionicons name="download" size={24} color="white" />
              </View>
              <Text className="text-white text-sm font-semibold text-center">Downloads</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Recent Activity */}
        <View className="mx-5 mb-8">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-xl font-bold text-white">Recent Activity</Text>
            <TouchableOpacity>
              <Text className="text-orange-500 text-sm font-semibold">See All</Text>
            </TouchableOpacity>
          </View>
          
          { activityLoading ? (
            <View className="flex-1 items-center justify-center">
               <ActivityIndicator size="large" color="#FFA500" />
            </View>
          )
          :
          userActivity.length === 0 
          ? 
          (
            <Text className="text-orange-500 text-sm">No activities yet</Text>
          ) 
          :
          userActivity.map((activity:any, index:number) => (
            <TouchableOpacity key={index} className="flex-row items-center bg-neutral-900 rounded-xl p-4 mb-3">
              <View className="w-10 h-10 rounded-full bg-neutral-800 justify-center items-center mr-4">
                {activity.type === 'liked' ? (
                  <MaterialIcons name="favorite" size={20} color="#EF4444" />
                ) : (
                  <MaterialIcons name="playlist-add" size={20} color="#FFA500" />
                )}
              </View>
              <View className="flex-1">
                <Text className="text-white text-sm mb-1">
                  {activity.type === 'liked' 
                    ? `Liked "${activity?.details?.title}" by ${activity?.details?.author}`
                    : `Created playlist "${activity?.details?.author}"`
                  }
                </Text>
                <Text className="text-white/50 text-xs">{new Date(activity?.created_at).toLocaleString()}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Achievements */}
        <View className="mx-5 mb-28">
          <Text className="text-xl font-bold text-white mb-4">Achievements</Text>
          
          { achievementsLoading ? (
            <View className="flex-1 items-center justify-center">
               <ActivityIndicator size="large" color="#FFA500" />
            </View>
          )
          :
          
          NewAchievements.length === 0 ? (
            <Text className="text-orange-500 text-sm">No achievements yet</Text>
          )
          :
          
          NewAchievements.map((achievement:any, index:number) => (
            <View key={index} className="flex-row items-center bg-neutral-900 rounded-xl p-4 mb-3">
              <View className="w-12 h-12 rounded-full bg-neutral-800 justify-center items-center mr-4">
                <Ionicons name={achievement.icon} size={24} color="#FFA500" />
              </View>
              <View className="flex-1">
                <Text className="text-white text-base font-semibold mb-1">{achievement.title}</Text>
                <Text className="text-white/70 text-sm">{achievement.description}</Text>
              </View>
              <View className="ml-3">
                <MaterialIcons name="verified" size={20} color="#FFA500" />
              </View>
            </View>
          ))
          
        }
        </View>
        <LogoutModal visible={modalVisible} 
        onClose={()=>setModalVisible(false)}
        onLogout={signOut} userName={userProfile?.name} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;