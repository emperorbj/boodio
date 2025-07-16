// import { AntDesign } from "@expo/vector-icons"
// import MaterialIcons from '@expo/vector-icons/MaterialIcons';
// import Feather from '@expo/vector-icons/Feather';
// import FontAwesome from '@expo/vector-icons/FontAwesome';
// import AnimatedTabBar from "./_components/AnimatedTabBar";

// import { Tabs } from 'expo-router'
// import React from 'react'
// import { useSafeAreaInsets } from "react-native-safe-area-context"
// import AuthGate from "../_auth"

// export default function Tabslayout() {
//     const insets = useSafeAreaInsets()

//     return (
//         <AuthGate>
//             <Tabs
                
//                 screenOptions={{
//                     headerShown: false,
//                     tabBarActiveTintColor: "#1E40AF",

//                     headerShadowVisible: false,
//                     tabBarStyle: {
//                         position: "absolute",
//                         backgroundColor: "rgba(255, 255, 255, 0.85)",
//                         borderTopColor: "rgba(255, 255, 255, 0.2)",
//                         borderTopWidth: 1,
//                         paddingTop: 5,
//                         height: 60 + insets.bottom,

//                     }
//                 }}
//                 >

//                 <Tabs.Screen name="index" options={{
//                     title: "Home",
//                     tabBarIcon: ({ color, size }) => (<Feather name="home" size={size} color={color} />),
//                     tabBarButton: (props) => <AnimatedTabBar {...props}
//                 }} />

//                 <Tabs.Screen name="playlist" options={{
//                     title: "Playlist",
//                     tabBarIcon: ({ color, size, focused }) => (<AntDesign name="play" size={size} color={color} />)
//                 }} />


//                 <Tabs.Screen name="likes" options={{
//                     title: "favorites",
//                     tabBarIcon: ({ color, size, focused }) => (<MaterialIcons name="favorite" size={size} color={color} />)
//                 }} />


//                 <Tabs.Screen name="profile" options={{
//                     title: "Profile",
//                     tabBarIcon: ({ color, size, focused }) => (<FontAwesome name="user-circle-o" size={size} color={color} />)
//                 }} />

//             </Tabs>
//         </AuthGate>
//     )
// }


import { AntDesign } from "@expo/vector-icons";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import { Tabs } from 'expo-router';
import React from 'react';
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AuthGate from "../_auth";

export default function Tabslayout() {
  const insets = useSafeAreaInsets();

  return (
    <AuthGate>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: "#1E40AF",
          tabBarInactiveTintColor: "#64748B",
          tabBarStyle: {
            position: "absolute",
            backgroundColor: "rgba(255,255,255,0.95)",
            borderTopColor: "rgba(0,0,0,0.1)",
            borderTopWidth: 1,
            height: 60 + insets.bottom,
            paddingBottom: insets.bottom,
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
              <Feather name="home" size={24} color={'black'} />
            ),
           
          }}
        />
        <Tabs.Screen
          name="playlist"
          options={{
            title: "Playlist",
            tabBarIcon: ({ color, size }) => (
              <AntDesign name="play" size={24} color={'black'} />
            ),
          
          }}
        />
        <Tabs.Screen
          name="likes"
          options={{
            title: "Favorites",
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="favorite" size={24} color={'black'} />
            ),
            
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ color, size }) => (
              <FontAwesome name="user-circle-o" size={24} color={'black'}/>
            ),
          
          }}
        />
      </Tabs>
    </AuthGate>
  );
}
