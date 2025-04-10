import React, { useState, useEffect } from 'react';
import { View, Image, TouchableOpacity, Text, StyleSheet, Dimensions, Alert, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Clipboard from '@react-native-clipboard/clipboard';
import { useNavigation } from '@react-navigation/native';

const { height } = Dimensions.get('window');

const Favorite = () => {
    const navigation = useNavigation();
    const [favorite, setFavorite] = useState([]);

     useEffect(() => {
        const loadFavorites = async () => {
            try {
                const stored = await AsyncStorage.getItem('favoritePlaces');
                const parsed = stored ? JSON.parse(stored) : [];
                setFavorite(parsed);
            } catch (err) {
                console.error('Failed to load favorites:', err);
            }
        };
        loadFavorites();
    }, []);

    const copyAddress = (text) => {
        Clipboard.setString(text);
        Alert.alert('Copied to clipboard');
    };

    return (
        <View style={styles.container}>

            <TouchableOpacity style={[styles.btn, {alignSelf: 'flex-end', width: 53, height: 53}]} onPress={() => navigation.goBack('')}>
                <Image source={require('../assets/icons/fav-star-white.png')} style={{width: 30, height: 30, resizeMode: 'contain'}} />
            </TouchableOpacity>

            {
                favorite.length > 0 && (
                    <ScrollView style={{width: '100%'}}>
                        {
                            favorite.map((place, index) => (
                                <View key={index} style={{width: '100%'}}>
                                    <Text style={styles.title}>{place.name}</Text>

                                    <View style={{width: '100%', alignSelf: 'center', marginBottom: 20}}>
                                        <Image source={place.image} style={{width: '100%', height: 160, resizeMode: 'cover', borderRadius: 7}} />                                    
                                        <View style={styles.infoContainer}>
                                            <View style={{width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20}}>
                                                <Text style={styles.infoText}>📍 {place.address}</Text>
                                                <TouchableOpacity onPress={() => copyAddress(place.address)}>
                                                    <Image source={require('../assets/icons/copy.png')} style={{width: 18, height: 20}} />
                                                </TouchableOpacity>
                                            </View>
                                            <Text style={styles.infoText}>{place.description}</Text>
                                        </View>
                                    </View>
                                </View>
                            ))
                        }
                    </ScrollView>
                )
            }
            
        </View>
    )
};

const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
        paddingTop: height * 0.08
    },

    title: {
        fontSize: 24,
        fontWeight: '600',
        color: '#000',
        marginBottom: 20,
        alignSelf: 'center'
    },

    btn: {
        width: 78,
        height: 53,
        backgroundColor: '#ff515b',
        borderRadius: 7,
        alignItems: 'center',
        justifyContent: 'center',
    },

    infoContainer: {
        width: '100%',
        marginTop: -4,
        paddingTop: 40,
        paddingHorizontal: 20,
        paddingBottom: 18,
        marginBottom: 20,
        backgroundColor: '#292929',
        borderBottomRightRadius: 7,
        borderBottomLeftRadius: 7,
        zIndex: 2
    },

    infoText: {
        fontSize: 14,
        fontWeight: '400',
        color: '#fff',
    }
  
});

export default Favorite;