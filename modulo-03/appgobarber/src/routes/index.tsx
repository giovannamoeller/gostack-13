import React from 'react';
import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';
import { useAuth } from '../hooks/auth';
import { View, ActivityIndicator } from 'react-native'

const Routes: React.FC = () => {
    const { user, loading } = useAuth();
    if(loading) {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#232129'}}>
                <ActivityIndicator size="large" color="#FF9000"/>
            </View>
        )
    }
    return (
        user ? <AppRoutes/> : <AuthRoutes/>
    )
}

export default Routes;