import { Redirect,Slot } from 'expo-router'
import React from 'react'
import { useAuthStore } from '../../store/useAuthStore';

interface AuthGateProps {
  children?: React.ReactNode;
}

const AuthGate:React.FC<AuthGateProps> = ({children}) => {

    const { user } = useAuthStore();
if (!user) {
        return <Redirect href="/(auth)/login" />
    }
    return <>{children}</>
}

export default AuthGate