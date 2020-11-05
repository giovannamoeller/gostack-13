import React from 'react';
import { View, Button, Text } from 'react-native';
import { useAuth } from '../../hooks/auth';

const CreateAppointment: React.FC = () => {
    const { signOut } = useAuth();
    return (
        <View style={{justifyContent: 'center', flex: 1}}>
            <Button title="Sair" onPress={signOut} color='#FF9000' />
        </View>
    )
}

export default CreateAppointment;