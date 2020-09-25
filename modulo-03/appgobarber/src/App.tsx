import React from 'react';
import { View, StatusBar } from 'react-native';

const App: React.FC = () => {
    return (
        <>
            <StatusBar barStyle="light-content" />
            <View style={{ backgroundColor: '#312E38', flex: 1 }}> 
            </View>
        </>
    )
}

export default App;