import { View, Image, TouchableOpacity, Text, StyleSheet, Dimensions, Alert, ScrollView } from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import { useNavigation } from '@react-navigation/native';

const { height } = Dimensions.get('window');

const FactLocationInfo = ({ location }) => {
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
                <Text style={styles.title}>{location.name}</Text>
            </View>

            <ScrollView style={{width: '100%'}}>
                <View style={{width: '100%', alignSelf: 'center', marginBottom: 20}}>
                    <Image source={typeof location.image === 'string' ? { uri: location.image } : location.image} style={{width: '100%', height: 160, resizeMode: 'cover', borderRadius: 7}} />                                    
                    <View style={styles.infoContainer}>
                        <View style={{width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20}}>
                            <Text style={styles.infoText}>📍 {location.address}</Text>
                            <TouchableOpacity onPress={() => copyAddress(location.address)}>
                                <Image source={require('../assets/icons/copy.png')} style={{width: 18, height: 20}} />
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.infoText}>{location.description}</Text>
                    </View>
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

export default FactLocationInfo;