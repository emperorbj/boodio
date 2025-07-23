import React, { useRef, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  Animated,
  Dimensions,
  TouchableWithoutFeedback,
  Vibration,
} from 'react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons, AntDesign } from '@expo/vector-icons';
import { LogOutModalProps } from '../../types/data';
const { width, height } = Dimensions.get('window');



const LogoutModal = ({ 
  visible, 
  onClose, 
  onLogout, 
  userName
}:LogOutModalProps) => {
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      // Entrance animation
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 50,
          friction: 8,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      // Exit animation
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 0,
          tension: 100,
          friction: 8,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  const handleLogout = () => {
    Vibration.vibrate(50); // Subtle haptic feedback
    onLogout();
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <Modal
      transparent
      visible={visible}
      animationType="none"
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View className="flex-1">
          <BlurView intensity={20} className="flex-1 justify-center items-center bg-black/50">
            <TouchableWithoutFeedback>
              <Animated.View
                style={{
                  transform: [{ scale: scaleAnim }],
                  opacity: opacityAnim,
                }}
                className="w-96 mx-5"
              >
                {/* Main Modal Container */}
                <View className="bg-neutral-900 rounded-3xl overflow-hidden shadow-2xl border border-neutral-800">
                  {/* Header with Gradient */}
                  <LinearGradient
                    colors={['#FFA500', '#FF6B35']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    className="px-6 py-8 items-center"
                  >
                    <View className="w-16 h-16 rounded-full bg-white/20 justify-center items-center mb-4 border-2 border-white/30">
                      <MaterialIcons name="logout" size={28} color="white" />
                    </View>
                    <Text className="text-white text-xl font-bold mb-1">Sign Out</Text>
                    <Text className="text-white/80 text-sm text-center">
                      Are you sure you want to sign out?
                    </Text>
                  </LinearGradient>

                  {/* Content */}
                  <View className="px-6 py-6">
                    {/* User Info */}
                    <View className="flex-row items-center bg-neutral-800 rounded-2xl p-4 mb-6">
                      <View className="w-12 h-12 rounded-full bg-orange-500 justify-center items-center mr-3">
                        <Text className="text-white font-bold text-lg">
                          {userName?.charAt(0)}
                        </Text>
                      </View>
                      <View className="flex-1">
                        <Text className="text-white font-semibold text-base">{userName}</Text>
                        <Text className="text-white/60 text-sm">You'll be signed out of your account</Text>
                      </View>
                    </View>

                    {/* Warning Message */}
                    <View className="flex-row bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4 mb-6">
                      <AntDesign name="infocirlce" size={20} color="#FFA500" className="mr-3" />
                      <View className="flex-1 ml-3">
                        <Text className="text-yellow-200 text-sm font-medium mb-1">
                          You'll lose access to:
                        </Text>
                        <Text className="text-yellow-200/80 text-xs leading-4">
                          • Your saved playlists and favorites
                          {'\n'}• Downloaded music for offline listening
                          {'\n'}• Personalized recommendations
                        </Text>
                      </View>
                    </View>

                    {/* Action Buttons */}
                    <View className="space-y-4">
                      {/* Logout Button */}
                      <TouchableOpacity
                        onPress={handleLogout}
                        className="bg-red-600 rounded-2xl py-3 px-4 shadow-lg my-2"
                        activeOpacity={0.8}
                      >
                        <LinearGradient
                          colors={['#DC2626', '#B91C1C']}
                          start={{ x: 0, y: 0 }}
                          end={{ x: 1, y: 1 }}
                          className="rounded-2xl py-1 px-1 items-center justify-center"
                        >
                          <View className="flex-row items-center">
                            <MaterialIcons name="logout" size={20} color="white" />
                            <Text className="text-white font-semibold text-base ml-2">
                              Sign Out
                            </Text>
                          </View>
                        </LinearGradient>
                      </TouchableOpacity>

                      {/* Cancel Button */}
                      <TouchableOpacity
                        onPress={handleCancel}
                        className="bg-neutral-800 rounded-2xl py-3 px-4 border border-neutral-700 my-2"
                        activeOpacity={0.8}
                      >
                        <View className="flex-row items-center justify-center">
                          <AntDesign name="close" size={18} color="#FFA500" />
                          <Text className="text-orange-500 font-semibold text-base ml-2">
                            Cancel
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>

                {/* Quick Actions Footer */}
                <View className="flex-row justify-center mt-4 gap-6">
                  <TouchableOpacity className="bg-neutral-800/80 rounded-full p-3">
                    <MaterialIcons name="settings" size={20} color="#FFA500" />
                  </TouchableOpacity>
                  <TouchableOpacity className="bg-neutral-800/80 rounded-full p-3">
                    <MaterialIcons name="help-outline" size={20} color="#FFA500" />
                  </TouchableOpacity>
                  <TouchableOpacity className="bg-neutral-800/80 rounded-full p-3">
                    <MaterialIcons name="feedback" size={20} color="#FFA500" />
                  </TouchableOpacity>
                </View>
              </Animated.View>
            </TouchableWithoutFeedback>
          </BlurView>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default LogoutModal;
