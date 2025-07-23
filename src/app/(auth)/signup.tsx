import { useState } from 'react'
import { View,TextInput,TouchableOpacity,Text,ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native'
import { supabase } from '../../../lib/supabase'
import { useRouter } from 'expo-router'
import {Image} from 'expo-image'
import Toast from 'react-native-toast-message'
import { useAuthStore } from '../../../store/useAuthStore'
export default function Signup() {

  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()





const setUser = useAuthStore((state) => state.setUser)


  const handleSignup = async () => {
  if (!email || !password) {
    setError('Email and password are required.');
    Toast.show({
      type: 'error',
      text1: 'Signup Failed',
      text2: 'Please provide email and password.',
    });
    return;
  }

  setLoading(true);
  setError('');

//   const redirectUrl =
//     process.env.NODE_ENV === 'development'
//       ? 'boodio://'
//       : 'boodio://'; 

  try {
    const { data, error } = await supabase.auth.signUp({ email, password,
        options: {
        emailRedirectTo: 'boodio://(auth)/login',
    },
     })
     if(data?.user){
      await supabase.from('profile').insert([
        {
          id: data.user.id,
          email: data.user.email ?? '',
          name: name,
        }
      ])
     }
     ;

    if (error) {
      setError(error.message);
      Toast.show({
        type: 'error',
        text1: 'Signup Failed',
        text2: error.message,
      });
      return;
    }

    Toast.show({
      type: 'success',
      text1: 'Signup Successful',
      text2: 'Welcome to Boodio 😍',
    });

    router.push('/(auth)/login');

  } catch (err) {
    console.error('Unexpected signup error:', err);
    setError('An unexpected error occurred.');
    Toast.show({
      type: 'error',
      text1: 'Unexpected Error',
      text2: 'Please try again.',
    });
  } finally {
    setLoading(false);
  }
};




  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 80} // Adjust offset for iOS/Android
    >
    <View className='flex-1 justify-center bg-slate-800 items-center p-4'>
                <View className='items-center justify-center w-full mb-5'>
                    <Image
                        source={{uri:'https://res.cloudinary.com/dpp46k83h/image/upload/v1752660192/login_hnghmo.png'}}
                        style={{ width: 200, height: 200 }} 
                        contentFit='contain'
                        placeholder={{ uri: 'https://via.placeholder.com/128' }}
                    
                    />
                </View>
    
                <View className='w-full gap-4'>
                    <TextInput className='bg-slate-600 w-full text-white pl-4 py-5 rounded-md border border-slate-500'
                        placeholder="Your name" value={name} onChangeText={setName} placeholderTextColor={'white'} />
                    <TextInput className='bg-slate-600 w-full text-white pl-4 py-5 rounded-md border border-slate-500'
                        placeholder="Email" value={email} onChangeText={setEmail} placeholderTextColor={'white'} />
                    <TextInput className='bg-slate-600 w-full text-white pl-4 py-5 rounded-md border border-slate-500'
                        placeholder="Password" secureTextEntry value={password} onChangeText={setPassword}
                        placeholderTextColor={'white'} />
                    <TouchableOpacity className=' rounded-lg bg-orange-500' onPress={handleSignup} >
                    {
                        loading ? <ActivityIndicator size="large" color="#fff" />:
                        <Text className='text-xl text-white text-center py-3'>Signup</Text>
                    }
                        
                    </TouchableOpacity>
                    <Text>{error}</Text>
                </View>
    
                <View className='w-full'>
                    <TouchableOpacity onPress={() => router.push('/(auth)/login')}>
                        <Text className='text-center text-white mt-4'>Already have an account? Login</Text>
                    </TouchableOpacity>
                </View>
            </View>
          </KeyboardAvoidingView>
  )
}
