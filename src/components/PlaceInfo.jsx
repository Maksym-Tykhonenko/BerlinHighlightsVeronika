import React, { useState, useEffect } from 'react';
import { View, Image, TouchableOpacity, Text, StyleSheet, Dimensions, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Clipboard from '@react-native-clipboard/clipboard';
import { useNavigation } from '@react-navigation/native';

const { height } = Dimensions.get('window');

const PlaceInfo = ({ place }) => {
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

    const handleFavorite = async () => {
        try {
            let updated;
            if (isSaved) {
                updated = favorite.filter((f) => f.name !== place.name);
            } else {
                updated = [...favorite, place];
            }
            setFavorite(updated);
            await AsyncStorage.setItem('favoritePlaces', JSON.stringify(updated));
        } catch (err) {
            console.error('Failed to update favorite:', err);
        }
    };

    const isSaved = favorite.some((f) => f.name === place.name);

    return (
        <View style={styles.container}>

            <View style={{flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start', marginBottom: 25}}>
                <TouchableOpacity onPress={() => navigation.goBack('')}>
                    <Image source={require('../assets/icons/back.png')} style={{width: 34, height: 22, resizeMode: 'contain'}} />
                </TouchableOpacity>
                <Text style={styles.title}>{place.name}</Text>
            </View>

            <TouchableOpacity style={styles.favBtn} onPress={() => handleFavorite()}>
                <Image source={isSaved ? require('../assets/icons/fav.png') : require('../assets/icons/not-fav.png')} style={{width: 30, height: 30}} />
            </TouchableOpacity>

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
    )
};

const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
        paddingTop: height * 0.08
    },
    
    favBtn: {
        position: 'absolute',
        top: height * 0.08,
        right: 20
    },

    title: {
            fontSize: 24,
            fontWeight: '600',
        color: '#000',
            marginLeft: 20
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
    },
  
});

export default PlaceInfo;