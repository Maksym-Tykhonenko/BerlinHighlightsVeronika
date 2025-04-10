import React, { useState } from 'react';
import { View, Image, TouchableOpacity, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import facts from '../constants/facts';

const { height } = Dimensions.get('window');

const Facts = () => {
    const navigation = useNavigation();
    const [currentIndex, setCurrentIndex] = useState(0);

    return (
        <View style={styles.container}>

            {
                currentIndex === 0 && (
                    <View style={{ width: '100%', alignItems: 'center' }}>
                        
                        <View style={{height: 44}} />

                        <Image source={require('../assets/decor/logo.png')} style={{width: 135, height: height * 0.11, resizeMode: 'contain', marginBottom: height * 0.05, marginTop: 20}} />
                        
                        <Text style={[styles.text, { marginBottom: 20 }]}>Explore Berlin from an unexpected perspective! You’ll encounter both iconic landmarks and hidden gems of the city.</Text>
                        

                        <Text style={styles.text}>📍 Discover interesting facts about locations</Text>
                        <Text style={[styles.text, {marginBottom: 20}]}>🔄 Get a new route every time</Text>

                        <Text style={[styles.text, {marginBottom: height * 0.06}]}>Ready to hit the road? 🎒</Text>

                        <TouchableOpacity style={styles.btn} onPress={() => setCurrentIndex((prev) => prev + 1)}>
                            <Image source={require('../assets/icons/arrow.png')} style={{width: 34, height: 22, resizeMode: 'contain'}} />
                        </TouchableOpacity>

                    </View>
                )
            }

            {
                currentIndex === 1 && (
                    <ScrollView style={{width: '100%'}}>
                        {
                            facts.map((fact, index) => (
                                <View key={index} style={{width: '100%'}}>
                                    <View style={{width: '100%', alignSelf: 'center', marginBottom: 20}}>
                                        <Image source={fact.image} style={{width: '100%', height: 160, resizeMode: 'cover', borderRadius: 7}} />                                    
                                        <View style={styles.infoContainer}>
                                            <Text style={[styles.infoText, {fontSize: 20}]}>{fact.name}</Text>
                                            <Text style={[styles.infoText, {width: '70%'}]}>{fact.description}</Text>
                                        </View>
                                        <TouchableOpacity style={[styles.btn, {position: 'absolute', bottom: 30, right: 10}]} onPress={() => navigation.navigate('FactCategoriesScreen', { item: fact })}>
                                            <Image source={require('../assets/icons/arrow.png')} style={{width: 34, height: 22, resizeMode: 'contain'}} />
                                        </TouchableOpacity>
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

    text: {
        fontSize: 18,
        fontWeight: '500',
        color: '#000',
        textAlign: 'left',
        alignSelf: 'flex-start'
    },

    btn: {
        width: 78,
        height: 53,
        backgroundColor: '#ff515b',
        borderRadius: 7,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10
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

export default Facts;