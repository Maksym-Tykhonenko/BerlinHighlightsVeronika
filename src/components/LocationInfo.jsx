import { View, Image, TouchableOpacity, Text, StyleSheet, Dimensions, ScrollView, Alert } from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import { useNavigation } from '@react-navigation/native';

const { height } = Dimensions.get('window');

const LocationInfo = ({ item }) => {
    const navigation = useNavigation();

    const copyAddress = (text) => {
        Clipboard.setString(text);
        Alert.alert('Copied to clipboard');
    };

    return (
        <View style={styles.container}>

            <View style={{flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start', marginBottom: 25}}>
                <TouchableOpacity onPress={() => navigation.goBack('')}>
                    <Image source={require('../assets/icons/back.png')} style={{width: 34, height: 22, resizeMode: 'contain'}} />
                </TouchableOpacity>
                <Text style={styles.title}>{item.name}</Text>
            </View>

            <View style={{width: '100%', alignSelf: 'center', marginBottom: 20}}>
                <Image source={item.image} style={{width: '100%', height: 160, resizeMode: 'cover', borderRadius: 7}} />                                    
                <View style={styles.infoContainer}>
                    <View style={{width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20}}>
                        <Text style={styles.infoText}>📍 {item.address}</Text>
                        <TouchableOpacity onPress={() => copyAddress(item.address)}>
                            <Image source={require('../assets/icons/copy.png')} style={{width: 18, height: 20}} />
                        </TouchableOpacity>
                    </View>
                    <Text style={[styles.infoText, { marginBottom: 20 }]}>{item.description}</Text>
                    <Text style={[styles.infoText, { marginBottom: 20 }]}>🕒 Opening hours: {item.opened}</Text>
                    <Text style={[styles.infoText, {marginBottom: 20}]}>🚇 Nearest metro station: {item.metro}</Text>
                </View>
            </View>

            <ScrollView style={{width: '100%'}}>
                <Text style={styles.subTitle}>🌿 Nature Nearby</Text>

                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%'}}>
                    {
                        item.nearby.map((place, index) => (
                            <TouchableOpacity
                                key={index}
                                style={styles.placeCard}
                                onPress={() => navigation.navigate('PlaceInfoScreen', { place: place })}
                            >
                                <Image source={place.image} style={styles.placeImage} />
                                <View style={styles.placeTextContainer}>
                                    <Text style={styles.placeText}>{place.name}</Text>
                                </View>
                            </TouchableOpacity>
                        ))
                    }
                </View>
            </ScrollView>
                    
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
        marginLeft: 20
  },
  
  text: {
        fontSize: 53,
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

    subTitle: {
        fontSize: 24,
        fontWeight: '600',
        color: '#ff515b',
        marginBottom: 16,
        alignSelf: 'center'
    },

    placeCard: {
        width: '30%',
        height: 130,
        borderRadius: 7,
        overflow: 'hidden'
    },

    placeImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover'
    },

    placeTextContainer: {
        width: '100%',
        padding: 10,
        height: 50,
        backgroundColor: '#292929',
        alignItems: 'center',
        justifyContent: 'flex-start',
        position: 'absolute',
        bottom: 0
    },

    placeText: {
        fontSize: 12,
        fontWeight: 600,
        textAlign: 'center',
        color: '#fff'
    }
  
});

export default LocationInfo;