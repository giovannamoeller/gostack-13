import { createContext, useCallback, useState, useContext, useEffect } from 'react';
import React from 'react';
import api from '../services/api';
import AsyncStorage from '@react-native-community/async-storage';

interface AuthState {
    token: string;
    user: object;
}

interface SignInCredentials {
    email: string;
    password: string;
}

interface AuthContextData {
    user: object;
    signIn(credentials: SignInCredentials): Promise<void>; 
    signOut(): void;
    loading: boolean;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider:React.FC = ({children}) => {

    const [data, setData] = useState<AuthState>({} as AuthState);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadStorageData(): Promise<void> {
            const token = await AsyncStorage.getItem('@GoBarber:token');
            const user = await AsyncStorage.getItem('@GoBarber:user');

            if(token && user) {
                setData({ token, user: JSON.parse(user) })
            }

            setLoading(false);
        }
        loadStorageData();
    }, []);

    const signIn = useCallback(async ({email, password}) => {
        const response = await api.post('/sessions', {
            email,
            password
        });
        const { token, user } = response.data;
        // multiSet -> seta várias propriedades ao mesmo tempo
        await AsyncStorage.setItem('@GoBarber:token', token);
        await AsyncStorage.setItem('@GoBarber:user', JSON.stringify(user));

        api.defaults.headers.authorization = `Bearer ${token[1]}`;

        setData({token, user});

      }, []);

    const signOut = useCallback(async () => {
        // multiremove -> remove várias propriedades ao mesmo tempo
        await AsyncStorage.removeItem('@GoBarber:token');
        await AsyncStorage.removeItem('@GoBarber:user');

        setData({} as AuthState);
    }, []);
      
    return (
        <AuthContext.Provider value={{ user: data.user, signIn, signOut, loading }}>
            {children}
        </AuthContext.Provider>
    )
}

function useAuth(): AuthContextData {
    const context = useContext(AuthContext);

    if(!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context;
}

export { AuthProvider, useAuth };
