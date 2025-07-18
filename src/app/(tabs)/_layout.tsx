import { AntDesign } from "@expo/vector-icons";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import {BottomTabBar} from '@react-navigation/bottom-tabs'
import { Tabs } from 'expo-router';
import React from 'react';
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AuthGate from "../_auth";
import FloatPlayer from "../../components/FloatPlayer";

export default function Tabslayout() {
  const insets = useSafeAreaInsets();

  return (
    <AuthGate>
      <Tabs
        tabBar={(props)=>(
          <>
            <FloatPlayer/>
            <BottomTabBar {...props}/>
          </>
        )}
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: "#FFA500",
          tabBarInactiveTintColor: "white",
          tabBarStyle: {
            position: "absolute",
            backgroundColor: "#000000",
            borderTopColor: "#000000",
            borderTopWidth: 0,
            height: 60 + insets.bottom,
            paddingBottom: insets.bottom,
            paddingTop:10,
            elevation: 5,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 5 },
            shadowOpacity: 0.1,
            shadowRadius: 10,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color, size }) => (
              <Feather name="home" size={24} color={color} />
            ),
           
          }}
        />
        <Tabs.Screen
          name="playlist"
          options={{
            title: "Playlist",
            tabBarIcon: ({ color, size }) => (
              <AntDesign name="play" size={24} color={color} />
            ),
          
          }}
        />
        <Tabs.Screen
          name="likes"
          options={{
            title: "Favorites",
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="favorite" size={24} color={color} />
            ),
            
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ color, size }) => (
              <FontAwesome name="user-circle-o" size={24} color={color}/>
            ),
          
          }}
        />
      </Tabs>
    </AuthGate>
  );
}
