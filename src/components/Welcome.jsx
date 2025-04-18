import React, { useState } from 'react';
import { View, Image, TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { height } = Dimensions.get('window');

const Welcome = () => {
    const navigation = useNavigation();
    const [currentIndex, setCurrentIndex] = useState(0);
    
  const text = currentIndex === 0 ? require('../assets/welcome/text1.png')
    : currentIndex === 1 ? require('../assets/welcome/text2.png')
      : currentIndex === 2 ? require('../assets/welcome/text3.png')
        : null;

    return (
      <View style={styles.container}>

          {
              currentIndex === 0 && (
                  <Text style={styles.title}>WELCOME TO</Text>
              )
          }

            <Image source={require('../assets/decor/logo.png')} style={{width: 187, height: height * 0.16, resizeMode: 'contain', marginBottom: height * 0.04, marginTop: height * 0.07}} />
      
            <Text style={styles.text}>BERLIN</Text>
            <Text style={styles.text}>HIGHLIGHTS</Text>
            
            <View style={{width: '100%', height: 150, marginTop: height * 0.03}}>
                <Image source={text} style={{width: '100%', height: '100%', resizeMode: 'contain'}} />
                <TouchableOpacity style={styles.btn} onPress={() => currentIndex === 2 ? navigation.navigate('FactsScreen') : setCurrentIndex((prev) => prev + 1)}>
                    <Image source={require('../assets/icons/arrow.png')} style={{width: 34, height: 22, resizeMode: 'contain'}} />
                </TouchableOpacity>
            </View>
        
      </View>
    )
};

const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center',
        padding: 20
    },

    title: {
        fontSize: 20,
        fontWeight: '600',
        color: '#000',
        position: 'absolute',
        top: height * 0.05,
        alignSelf: 'center'
    },
    
    text: {
        fontSize: 43,
        fontWeight: '800',
        lineHeight: '120%',
        color: '#000',
        marginVertical: 5,
    },

    btn: {
        width: 78,
        height: 53,
        backgroundColor: '#ff515b',
        borderRadius: 7,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 10,
        right: '7%'
    }
    
});

export default Welcome;