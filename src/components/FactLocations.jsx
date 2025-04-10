import { View, Image, TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { height } = Dimensions.get('window');

const FactLocations = ({ category }) => {
    const navigation = useNavigation();

    return (
      <View style={styles.container}>

            <Text style={styles.title}>Choose a location</Text>

            {
                category.locations.map((location, index) => (
                    <View key={index} style={styles.locationCard}>
                        <Text style={[styles.infoText, {fontSize: 20, marginBottom: 13}]}>{location.name}</Text>
                        <Text style={[styles.infoText, {width: '70%'}]}>{location.about}</Text>
                        <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('FactLocationInfoScreen', { location: location })}>
                            <Image source={require('../assets/icons/arrow.png')} style={{width: 34, height: 22, resizeMode: 'contain'}} />
                        </TouchableOpacity>
                    </View>
                ))
            }
        
      </View>
    )
};

const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
    },

    title: {
        fontSize: 24,
        fontWeight: '400',
        color: '#000',
        alignSelf: 'center',
        marginTop: height * 0.15,
        marginBottom: 50
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
        position: 'absolute',
        bottom: 10,
        right: 10
    },
  
    locationCard: {
        width: '100%',
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginBottom: 20,
        backgroundColor: '#292929',
        borderRadius: 7,
    },

    infoText: {
        fontSize: 14,
        fontWeight: '400',
        color: '#fff',
    }
  
});

export default FactLocations;