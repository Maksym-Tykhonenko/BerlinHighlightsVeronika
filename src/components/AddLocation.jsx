import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, ScrollView, StyleSheet, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import { launchImageLibrary } from 'react-native-image-picker';
import { useNavigation } from "@react-navigation/native"

const { height } = Dimensions.get('window');

const AddLocation = ({ item }) => {
    const navigation = useNavigation();
    const [image, setImage] = useState(item?.image || null);
    const [name, setName] = useState(item?.name || null);
    const [address, setAddress] = useState(item?.address || null);
    const [description, setDescription] = useState(item?.description || null);

    const parseTime = (timeStr) => {
        if (!timeStr) return new Date();

        const date = new Date();
        const [time, modifier] = timeStr.split(' ');
        const [hoursStr, minutesStr] = time.split(':');

        let hours = parseInt(hoursStr, 10);
        const minutes = parseInt(minutesStr, 10);

        if (modifier) {
            if (modifier.toLowerCase() === 'pm' && hours < 12) hours += 12;
            if (modifier.toLowerCase() === 'am' && hours === 12) hours = 0;
        }

        date.setHours(hours);
        date.setMinutes(minutes);
        date.setSeconds(0);
        date.setMilliseconds(0);

        return date;
    };

    const [openedFrom, setOpenedFrom] = useState(item?.openedFrom ? parseTime(item?.openedFrom) : new Date());
    const [openedTo, setOpenedTo] = useState(item?.openedTo ? parseTime(item?.openedTo) : new Date());
    const [chooseOpenedFrom, setChooseOpenedFrom] = useState(false);
    const [chooseOpenedTo, setChooseOpenedTo] = useState(false);

    const formatTime = (date) => {
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const formattedHours = ((hours + 11) % 12 + 1).toString().padStart(2, '0');
        const formattedMinutes = minutes.toString().padStart(2, '0');
        return `${formattedHours}:${formattedMinutes} ${ampm}`;
    };
    
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

    const handleAddLocation = async () => {
        try {
            const storedLocation = await AsyncStorage.getItem('locations');
            const locations = storedLocation ? JSON.parse(storedLocation) : [];

            const newLocation = {
                id: item?.id || Date.now(),
                name,
                image,
                address,
                description,
                openedFrom: formatTime(openedFrom),
                openedTo: formatTime(openedTo),
            };

            let updatedLocations;

            if (item?.id) {
                updatedLocations = locations.map((loc) =>
                    loc.id === item.id ? newLocation : loc
                );
            } else {
                updatedLocations = [...locations, newLocation];
            }

            await AsyncStorage.setItem('locations', JSON.stringify(updatedLocations));
            navigation.navigate('LocationsScreen');
        } catch (error) {
            alert('Error saving your location');
        }
    };

    return (
        <View style={styles.container}>

            <View style={{width: '100%', flexDirection: 'row', alignItems: 'center', marginBottom: 15}}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={require('../assets/icons/back.png')} style={{width: 34, height: 22, resizeMode: 'contain'}} />
                </TouchableOpacity>
                <Text style={styles.title}>{item ? 'Edit location' : 'Add a location'}</Text>
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

                <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                    <View style={{alignItems: 'flex-start', justifyContent: 'flex-start', width: '47%'}}>
                        <Text style={[styles.hoursBtnText, {marginBottom: 5}]}>Opened from</Text>
                        <TouchableOpacity style={styles.hoursBtn} onPress={() => setChooseOpenedFrom((prev) => !prev)}>
                            <Text style={styles.hoursBtnText}>{formatTime(openedFrom)}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{alignItems: 'flex-start', justifyContent: 'flex-start', width: '47%'}}>
                        <Text style={[styles.hoursBtnText, {marginBottom: 5}]}>Opened from</Text>
                        <TouchableOpacity style={styles.hoursBtn} onPress={() => setChooseOpenedTo((prev) => !prev)}>
                            <Text style={styles.hoursBtnText}>{formatTime(openedTo)}</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {
                    chooseOpenedFrom && (
                        <DateTimePicker 
                            value={item ? new Date(item.openedFrom) : openedFrom}
                            mode="time" 
                            display="spinner" 
                            themeVariant="light"
                            onChange={(event, selectedDate) => {
                                if (selectedDate) {
                                setOpenedFrom(selectedDate);
                                }
                            }}
                            style={{alignSelf: 'center'}}
                        />
                    )
                }
                {
                    chooseOpenedTo && (
                        <DateTimePicker 
                            value={item ? new Date(item.openedTo) : openedTo}
                            mode="time" 
                            display="spinner" 
                            themeVariant="light"
                            onChange={(event, selectedDate) => {
                                if (selectedDate) {
                                setOpenedTo(selectedDate);
                                }
                            }}
                            style={{alignSelf: 'center'}}
                        />
                    )
                }

                <TouchableOpacity
                    style={[styles.saveBtn, (!name || !image || !address) && {backgroundColor: '#828181'}]}
                    onPress={handleAddLocation}
                    disabled={!name || !image || !address}
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

export default AddLocation;