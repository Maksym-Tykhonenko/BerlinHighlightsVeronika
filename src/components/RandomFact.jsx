import React, { useState } from 'react';
import { View, Image, TouchableOpacity, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import randomFacts from '../constants/randomFacts';

const { height } = Dimensions.get('window');

const RandomFact = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [fact, setFact] = useState(null);

    const generateFact = () => {
        const randomIndex = Math.floor(Math.random() * randomFacts.length);
        setFact(randomFacts[randomIndex]);
    };

    return (
        <View style={styles.container}>

            {
                currentIndex === 0 && (
                    <View style={{ width: '100%', alignItems: 'center' }}>
                        
                        <View style={{height: 44}} />

                        <Image source={require('../assets/decor/logo.png')} style={{width: 135, height: height * 0.11, resizeMode: 'contain', marginBottom: height * 0.05, marginTop: 20}} />
                        
                        <Text style={[styles.text, {marginBottom: height * 0.06}]}>🕒 Discover an interesting fact about Berlin in just a second!
                            Press the button, and we’ll share something fascinating.
                        </Text>

                        <TouchableOpacity style={styles.btn} onPress={() => setCurrentIndex((prev) => prev + 1)}>
                            <Image source={require('../assets/icons/arrow.png')} style={{width: 34, height: 22, resizeMode: 'contain'}} />
                        </TouchableOpacity>

                    </View>
                )
            }

            {
                currentIndex === 1 && (
                    <View style={{width: '100%', flexGrow: 1, alignItems: 'center'}}>
                        {
                            fact && (
                                <View style={{width: '100%', position: 'absolute', top: height * 0.15}}>
                                    <Text style={styles.factTitle}>{fact.title}</Text>
                                    <Text style={styles.fact}>{fact.description}</Text>
                                </View>
                            )
                        }
                        <View style={styles.infoContainer}>
                            <Text style={styles.infoText}>{fact ? 'Another Fact' : 'Fact of the Day'}</Text>
                            <TouchableOpacity style={styles.btn} onPress={generateFact}>
                                <Image source={require('../assets/icons/arrow.png')} style={{width: 34, height: 22, resizeMode: 'contain'}} />
                            </TouchableOpacity>
                        </View>
                    </View>
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
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#292929',
        borderRadius: 7,
        zIndex: 2,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: height * 0.4
    },

    infoText: {
        fontSize: 20,
        fontWeight: '500',
        color: '#fff',
    },

    factTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#000',
        marginBottom: 20,
        alignSelf: 'flex-start'
    },

    fact: {
        fontSize: 18,
        fontWeight: '500',
        color: '#000',
        alignSelf: 'flex-start'
    }
  
});

export default RandomFact;