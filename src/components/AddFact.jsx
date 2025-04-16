import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, ScrollView, StyleSheet, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import { launchImageLibrary } from 'react-native-image-picker';
import { useNavigation } from "@react-navigation/native"

const { height } = Dimensions.get('window');

const AddFact = ({ item }) => {
    const navigation = useNavigation();
    const [image, setImage] = useState(item?.image || null);
    const [name, setName] = useState(item?.name || null);
    const [address, setAddress] = useState(item?.address || null);
    const [description, setDescription] = useState(item?.description || null);
    
    const uploadLocationImage = async () => {
        try {
            const result = await launchImageLibrary({ mediaType: 'photo', quality: 0.8 });
            if (!result.didCancel && result.assets && result.assets.length > 0) {
                setImage(result.assets[0].uri);
            }
        } catch (error) {
            alert("Error uploading your vacation image");
        }
    };

        const handleAddLandmark = async () => {
        try {
            const newLandmark = {
                id: Date.now(),
                name: name,
                image: image,
                address: address,
                description: description,
            };

            const storedLandmarks = await AsyncStorage.getItem('landmarks');
            const facts = storedLandmarks ? JSON.parse(storedLandmarks) : [];

            const updatedLandmarks = [...facts, newLandmark];

            await AsyncStorage.setItem('landmarks', JSON.stringify(updatedLandmarks));

            navigation.navigate('FactsScreen');
        } catch (error) {
            alert('Error saving your landmark');
        }
    };

    return (
        <View style={styles.container}>

            <View style={{width: '100%', flexDirection: 'row', alignItems: 'center', marginBottom: 15}}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={require('../assets/icons/back.png')} style={{width: 34, height: 22, resizeMode: 'contain'}} />
                </TouchableOpacity>
                <Text style={styles.title}>{item ? 'Edit landmark' : 'Add a landmark'}</Text>
            </View>
            
            <Image source={require('../assets/decor/logo.png')} style={{ width: 135, height: height * 0.11, resizeMode: 'contain', marginBottom: height * 0.05, marginTop: 20 }} />

            <ScrollView style={{width: '100%'}}>
                <TextInput
                    style={styles.input}
                    value={name}
                    onChangeText={setName}
                    placeholder='Place name'
                    placeholderTextColor={'#4a4947'}
                />

                <TouchableOpacity style={styles.imagePicker} onPress={uploadLocationImage}>
                    {
                        image ? <Image source={{ uri: image }} style={{ width: '100%', height: '100%', resizeMode: 'cover' }} />
                            : <Image source={require('../assets/icons/upload.png')} style={{height: 53, width: 53, resizeMode: 'contain'}} />
                    }
                </TouchableOpacity>

                <TextInput
                    style={styles.input}
                    value={address}
                    onChangeText={setAddress}
                    placeholder='Place address'
                    placeholderTextColor={'#4a4947'}
                />

                <TextInput
                    style={[styles.input, {minHeight: 128}]}
                    value={description}
                    onChangeText={setDescription}
                    placeholder='Place description'
                    placeholderTextColor={'#4a4947'}
                    multiline
                />

                <TouchableOpacity
                    style={[styles.saveBtn, (!name || !image || !address || !description) && {backgroundColor: '#828181'}]}
                    onPress={handleAddLandmark}
                    disabled={!name || !image || !address || !description}
                >
                    <Text style={styles.saveBtnText}>Save</Text>
                </TouchableOpacity>
            </ScrollView>
            
        </View>
    )
};

const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
        paddingTop: height * 0.07
    },

    title: {
        fontSize: 24,
        fontWeight: '600',
        color: '#000',
        marginLeft: 20
    },

    imagePicker: {
        width: '100%',
        height: 180,
        borderRadius: 14,
        backgroundColor: '#ff515b',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
        overflow: 'hidden'
    },

    input: {
        width: '100%',
        paddingVertical: 16,
        paddingHorizontal: 14,
        borderRadius: 7,
        backgroundColor: 'rgba(74, 73, 71, 0.2)',
        borderWidth: 1,
        borderColor: '#ff515b',
        color: '#000',
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 10
    }, 

    hoursBtn: {
        width: '100%',
        paddingVertical: 16,
        paddingHorizontal: 14,
        borderRadius: 7,
        backgroundColor: 'rgba(74, 73, 71, 0.2)',
        borderWidth: 1,
        borderColor: '#ff515b', 
    },

    hoursBtnText: {
        color: '#000',
        fontSize: 16,
        fontWeight: '500',
    },

    saveBtn: {
        width: '70%',
        paddingVertical: 15,
        borderRadius: 14,
        backgroundColor: '#ff515b',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center'
    },

    saveBtnText: {
        color: '#fff',
        fontSize: 17,
        fontWeight: '700',
    }

});

export default AddFact;