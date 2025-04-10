import { useEffect, useRef } from 'react';
import { Animated, View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const images = {
    left: require('../assets/loader/left.png'),
    right: require('../assets/loader/right.png'),
    middle: require('../assets/loader/middle.png'),
};

const Animation = () => {
    const navigation = useNavigation();

    const leftOpacity = useRef(new Animated.Value(0)).current;
    const rightOpacity = useRef(new Animated.Value(0)).current;
    const middleOpacity = useRef(new Animated.Value(0)).current;
    const berlinOpacity = useRef(new Animated.Value(0)).current;
    const highlightsOpacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.sequence([
            Animated.timing(leftOpacity, { toValue: 1, duration: 700, useNativeDriver: true }),
            Animated.timing(rightOpacity, { toValue: 1, duration: 700, useNativeDriver: true }),
            Animated.timing(middleOpacity, { toValue: 1, duration: 700, useNativeDriver: true }),
            Animated.timing(berlinOpacity, { toValue: 1, duration: 700, useNativeDriver: true }),
            Animated.timing(highlightsOpacity, { toValue: 1, duration: 700, useNativeDriver: true }),
        ]).start(() => {
              setTimeout(() => {
                navigation.navigate('WelcomeScreen');
              }, 1000);
            });
    }, []);

    return (
      <View style={styles.container}>

          <View style={styles.logo}>
              <Animated.Image source={images.left} style={[styles.image, { opacity: leftOpacity, top: 0, left: 0 }]} />
              <Animated.Image source={images.right} style={[styles.image, { opacity: rightOpacity, bottom: 0, right: 0 }]} />
              <Animated.Image source={images.middle} style={[styles.image, { opacity: middleOpacity, top: 40, alignSelf: 'center', width: 67, height: 67 }]} />
          </View>

          <View style={{ alignItems: 'center' }}>
              <Animated.Text style={[styles.text, { opacity: berlinOpacity }]}>BERLIN</Animated.Text>
              <Animated.Text style={[styles.text, { opacity: highlightsOpacity }]}>HIGHLIGHTS</Animated.Text>
        </View>
        
      </View>
    );
};

const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
        
    logo: {
        width: 190,
        height: 150,
        marginBottom: 70,
    },
    
    image: {
        width: 180,
        height: 130,
        resizeMode: 'contain',
        position: 'absolute'
    },
    
    text: {
        fontSize: 53,
        fontWeight: '800',
        lineHeight: 63,
        color: '#000',
        marginVertical: 5,
    },
  
});

export default Animation;
