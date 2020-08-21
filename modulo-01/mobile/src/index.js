import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, StatusBar, FlatList, SafeAreaView } from 'react-native';

import api from './services/api';

// View = div, footer, header, main, section...
// Text = p, span, strong, h1, h2...

export default function App() {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        api.get('/projects').then(response => {
            console.log(response.data);
            setProjects(response.data);
        });
    }, []);
    return (
        <>
        <StatusBar barStyle="light-content"/>
        <SafeAreaView  style={styles.container}>
            <FlatList 
                data={projects}
                keyExtractor={project => project.id}
                renderItem={({item}) => (
                    <Text style={styles.text} key={item.id}>{item.title}</Text>
                )}
            />
        </SafeAreaView>
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
        fontSize: 20,
        marginBottom: 10
    }
})