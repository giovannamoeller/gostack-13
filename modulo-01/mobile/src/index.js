import React from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';

// View = div, footer, header, main, section...
// Text = p, span, strong, h1, h2...

export default function App() {
    return (
        <>
        <StatusBar barStyle="light-content"/>
        <View style={styles.container}>
            <Text style={styles.text}>Olá!</Text>
        </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#7159c1',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        color: '#FFF',
        fontSize: 32,
        fontWeight: 'bold'
    }
})