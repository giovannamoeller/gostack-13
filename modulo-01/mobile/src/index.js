import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, StatusBar, FlatList, SafeAreaView, TouchableOpacity } from 'react-native';

import api from './services/api';

// View = div, footer, header, main, section...
// Text = p, span, strong, h1, h2...

export default function App() {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        api.get('/projects').then(response => {
            setProjects(response.data);
        });
    }, []);

    async function handleAddProject() {
        const response = await api.post('/projects', {
            title: 'LaunchBase',
            owner: 'Gi'
        });
        setProjects([...projects, response.data])
    }

    return (
        <>
        <StatusBar barStyle="light-content"/>
        <SafeAreaView style={styles.container}>
            <FlatList 
                data={projects}
                keyExtractor={project => project.id}
                renderItem={({item}) => (
                    <Text style={styles.text} key={item.id}>{item.title}</Text>
                )}
            />
            <TouchableOpacity activeOpacity={0.5} style={styles.button}
                onPress={handleAddProject}>
                <Text style={styles.buttonText}>Adicionar projeto</Text>
            </TouchableOpacity>
        </SafeAreaView>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#7159c1',
        flex: 1,
    },
    text: {
        color: '#FFF',
        fontSize: 20,
        marginBottom: 10,
        textAlign: 'center'
    },
    button: {
        backgroundColor: '#FFF',
        padding: 16,
        borderRadius: 8
    },
    buttonText: {
        textAlign: 'center',
        fontWeight: 'bold'
    }
})