import React, { createContext, useContext, useEffect, useState } from 'react';
import TrackPlayer, { Event, RepeatMode } from 'react-native-track-player';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MusicContext = createContext();

export const useMusic = () => useContext(MusicContext);

export const MusicProvider = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [volume, setVolume] = useState(1); // add volume state

  useEffect(() => {
    const setupPlayer = async () => {
      try {
        await TrackPlayer.setupPlayer();

        await TrackPlayer.add({
          id: '1',
          url: require('../assets/music.mp3'),
          title: 'Background Music',
          artist: 'Artist Name',
        });

        await TrackPlayer.setRepeatMode(RepeatMode.Track);

        const savedState = await AsyncStorage.getItem('toggleLoudness');
        if (savedState !== null) {
          const parsedState = JSON.parse(savedState);
          setIsPlaying(parsedState);
          parsedState ? await TrackPlayer.play() : await TrackPlayer.pause();
        } else {
          await TrackPlayer.play();
        }

        await TrackPlayer.setVolume(volume); // initial volume
      } catch (error) {
        console.log('Error setting up TrackPlayer', error);
      }
    };

    setupPlayer();

    return () => {
      TrackPlayer.stop();
    };
  }, []);

  useEffect(() => {
    isPlaying ? TrackPlayer.play() : TrackPlayer.pause();
  }, [isPlaying]);

  useEffect(() => {
    TrackPlayer.setVolume(volume);
  }, [volume]);

  const togglePlay = async () => {
    const newState = !isPlaying;
    setIsPlaying(newState);
    await AsyncStorage.setItem('toggleLoudness', JSON.stringify(newState));
  };

  return (
    <MusicContext.Provider value={{ isPlaying, togglePlay, volume, setVolume }}>
      {children}
    </MusicContext.Provider>
  );
};
