import React, { useState } from 'react';
import { View, Image, TouchableOpacity, Text, StyleSheet, Switch } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Slider from '@react-native-community/slider';
import { useMusic } from '../constants/music';

const Settings = () => {
    const { isPlaying, togglePlay, volume, setVolume } = useMusic();
    const [isVibrate, setIsVibrate] = useState(false);

    const resetProgress = () => {
        AsyncStorage.removeItem('favorites')
            .then(() => console.log('Progress reset successfully'))
            .catch((error) => console.error('Failed to reset progress:', error));
    };

    return (
        <View style={styles.container}>
            
            <View style={styles.infoContainer}>
                <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 16}}>
                    <Image source={require('../assets/icons/music.png')} style={{ width: 21, height: 28, resizeMode: 'contain', marginRight: 12}} />
                    <Text style={styles.label}>Music</Text>
                </View>
                <Slider
                    style={{ width: '100%', marginBottom: 30 }}
                    minimumValue={0}
                    maximumValue={1}
                    step={0.01}
                    minimumTrackTintColor="#ff515b"
                    maximumTrackTintColor="#ccc"
                    thumbTintColor="#fff"
                    value={volume}
                    onValueChange={(val) => {
                        setVolume(val);
                        if (val === 0 && isPlaying) togglePlay();
                        if (val > 0 && !isPlaying) togglePlay();
                    }}
                />
                <View style={{flexDirection: 'row', alignItems: 'center', width: '100%', justifyContent: 'space-between'}}>
                    <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 16}}>
                        <Image source={require('../assets/icons/vibro.png')} style={{ width: 34, height: 28, resizeMode: 'contain', marginRight: 12, marginLeft: -6}} />
                        <Text style={styles.label}>Vibration</Text>
                    </View>
                    <Switch value={isVibrate} onValueChange={() => setIsVibrate((prev) => !prev)} thumbColor="#fff" trackColor={{ false: "#ccc", true: "#ff515b" }} />
                </View>
            </View>
            
            <View style={{width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                <Text style={styles.btnText}>Reset Progress</Text>
                <TouchableOpacity style={styles.btn} onPress={resetProgress}>
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
        justifyContent: 'center',
        padding: 20
    },

    btnText: {
        fontSize: 24,
        fontWeight: '600',
        color: '#000',
        marginRight: 20
    },
  
    infoContainer: {
        width: '100%',
        paddingVertical: 40,
        paddingHorizontal: 20,
        marginBottom: 43,
        backgroundColor: '#292929',
        borderRadius: 7,
    },

    label: {
        fontSize: 24,
        fontWeight: '700',
        color: '#fff'
    },

    btn: {
        width: 78,
        height: 53,
        backgroundColor: '#ff515b',
        borderRadius: 7,
        alignItems: 'center',
        justifyContent: 'center',
    }    
  
});

export default Settings;