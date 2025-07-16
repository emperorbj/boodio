import { useState,useEffect } from 'react'
import { View, TextInput, TouchableOpacity, Text,ActivityIndicator } from 'react-native'
import { supabase } from '../../../lib/supabase'
import { useAuthStore } from '../../../store/useAuthStore'
import { useRouter } from 'expo-router'
import {Image} from 'expo-image'
import Toast from 'react-native-toast-message'


export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const setUser = useAuthStore((state) => state.setUser)
    const router = useRouter()


    const handleLogin = async () => {
  setLoading(true);
  setError('');

  try {
    const { data, error: loginError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (loginError) {
      setError(loginError.message);
      Toast.show({
        type: 'error',
        text1: 'Login Failed',
        text2:'you have wrong email or password',
        
      })
      return;
    }

    if (!data?.user) {
      console.warn("No user returned from Supabase.");
      setError("Login failed: No user returned.");
      return;
    }

    const user = data?.user ? {
      id: data.user.id,
      email: data.user.email ?? '',
    }:null;

    setUser(user);
    router.replace('/(tabs)/');

  } catch (err) {
    console.error("Unexpected login error:", err);
    setError('An unexpected error occurred. Please try again.');
  } finally {
    setLoading(false);
  }
};






    // const handleLogin = async () => {
    //     setLoading(true)
    //     setError('')
    //     const { data, error } = await supabase.auth.signInWithPassword({
    //         email,
    //         password,
    //     })

    //      if (error) {
    //     setError(error.message);
    //     setLoading(false);
    //     return;
    // }

    //     const user = data.user ? { id: data.user.id, email: data.user.email ?? '' } : null
    //     setUser(user)
    //     setLoading(false)
    //     router.replace('/(tabs)/')
    // }

    return (
        <View className='flex-1 justify-center bg-slate-800 items-center p-4'>
            <View className='items-center justify-center w-full mb-5'>
                <Image
                    source={{uri:'https://res.cloudinary.com/dpp46k83h/image/upload/v1752660804/Sign_in-pana_zuof9b.png'}}
                    style={{ width: 200, height: 200 }} 
                    contentFit='contain'
                    placeholder={{ uri: 'https://via.placeholder.com/128' }}
                
                />
            </View>

            <View className='w-full gap-4'>
                <TextInput className='bg-slate-600 w-full text-white pl-4 py-5 rounded-md border border-slate-500'
                    placeholder="Email" value={email} onChangeText={setEmail} placeholderTextColor={'white'} />
                <TextInput className='bg-slate-600 w-full text-white pl-4 py-5 rounded-md border border-slate-500'
                    placeholder="Password" secureTextEntry value={password} onChangeText={setPassword}
                    placeholderTextColor={'white'} />
                <TouchableOpacity className=' rounded-lg bg-orange-500 py-1' onPress={handleLogin} >
                    {
                        loading? <ActivityIndicator size="large" color="#fff" />
                        : <Text className='text-xl text-white text-center py-3'>Login</Text>
                    }
                    
                </TouchableOpacity>
                <Text>{error}</Text>
            </View>

            <View className='w-full'>
                <TouchableOpacity onPress={() => router.push('/(auth)/signup')}>
                    <Text className='text-center text-white mt-4'>Don't have an account? Sign Up</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
