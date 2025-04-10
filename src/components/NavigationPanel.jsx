import React, { useEffect, useState } from 'react';
import { TouchableOpacity, StyleSheet, View, Image } from "react-native";
import { useNavigation } from '@react-navigation/native';

const NavigationPanel = () => {
    const navigation = useNavigation();
    const [focus, setFocus] = useState('MiniGameScreen');

    const handleFocus = (screen) => {
        setFocus(screen);
        navigation.navigate(screen)
    };    

    useEffect(() => {
        const unfollow = navigation.addListener('focus', () => {
            const currentRoute = navigation.getState().routes[navigation.getState().index].name;
            setFocus(currentRoute);
        });

        return unfollow;
    }, [navigation]);

    return (
        <View style={styles.container}>
{/** 
            <TouchableOpacity onPress={() => handleFocus('MiniGameScreen')}>
                <Image
                    source={require('../assets/nav/minigame.png')}
                    style={[{width: 26, height: 26}, focus === 'MiniGameScreen' && {tintColor: '#ff515b'}]}
                />
            </TouchableOpacity>
*/}
            <TouchableOpacity onPress={() => handleFocus('RandomFactScreen')}>
                <Image
                    source={require('../assets/nav/random.png')}
                    style={[{width: 26, height: 26}, focus === 'RandomFactScreen' && {tintColor: '#ff515b'}]}
                />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handleFocus('LocationsScreen')}>
                <Image
                    source={require('../assets/nav/locations.png')}
                    style={[{width: 26, height: 26}, focus === 'LocationsScreen' && {tintColor: '#ff515b'}]}
                />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handleFocus('FactsScreen')}>
                <Image
                    source={require('../assets/nav/facts.png')}
                    style={[{width: 26, height: 26}, focus === 'FactsScreen' && {tintColor: '#ff515b'}]}
                />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handleFocus('SettingsScreen')}>
                <Image
                    source={require('../assets/nav/settings.png')}
                    style={[{width: 26, height: 26}, focus === 'SettingsScreen' && {tintColor: '#ff515b'}]}
                />
            </TouchableOpacity>

        </View>
    );
};

const styles = StyleSheet.create({

    container: {
        width: '100%',
        justifyContent: "space-between",
        alignItems: "center",
        alignSelf: 'center',
        flexDirection: 'row',
        backgroundColor: '#f0f0f0',
        padding: 20,
        paddingHorizontal: 40,
        paddingBottom: 35
    }

});

export default NavigationPanel;
