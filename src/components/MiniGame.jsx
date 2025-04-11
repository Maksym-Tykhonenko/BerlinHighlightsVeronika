import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
  Image,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MiniGame = ({ navigation }) => {
  const [showSecondScreen, setShowSecondScreen] = useState(false)
  const [board, setBoard] = useState([
    {
      id: 1,
      image: require('../assets/partsOfCard/BrandeburgGate/image_part_001.jpg'),
    },
    {
      id: 2,
      image: require('../assets/partsOfCard/BrandeburgGate/image_part_002.jpg'),
    },
    {
      id: 3,
      image: require('../assets/partsOfCard/BrandeburgGate/image_part_003.jpg'),
    },
    {
      id: 4,
      image: require('../assets/partsOfCard/BrandeburgGate/image_part_004.jpg'),
    },
    {
      id: 5,
      image: require('../assets/partsOfCard/BrandeburgGate/image_part_005.jpg'),
    },
    {
      id: 6,
      image: require('../assets/partsOfCard/BrandeburgGate/image_part_006.jpg'),
    },
    {
      id: 7,
      image: require('../assets/partsOfCard/BrandeburgGate/image_part_007.jpg'),
    },
    {
      id: 8,
      image: require('../assets/partsOfCard/BrandeburgGate/image_part_008.jpg'),
    },
    {
      id: 9,
      image: require('../assets/partsOfCard/BrandeburgGate/image_part_009.jpg'),
    },
    {
      id: 10,
      image: require('../assets/partsOfCard/BrandeburgGate/image_part_010.jpg'),
    },
    {
      id: 11,
      image: require('../assets/partsOfCard/BrandeburgGate/image_part_011.jpg'),
    },
    {
      id: 12,
      image: require('../assets/partsOfCard/BrandeburgGate/image_part_012.jpg'),
    },
    {
      id: 13,
      image: require('../assets/partsOfCard/BrandeburgGate/image_part_013.jpg'),
    },
    {
      id: 14,
      image: require('../assets/partsOfCard/BrandeburgGate/image_part_014.jpg'),
    },
    {
      id: 15,
      image: require('../assets/partsOfCard/BrandeburgGate/image_part_015.jpg'),
    },
    {
      id: 16,
      image: require('../assets/whait.jpeg'),
    },
  ]);
  const Back = () => {
    setShowSecondScreen(false);
    setTimer(300)
  };
  //AsyncStorage logick
  const [venusAnlockkkkkk, setVenusAnlockkkkkk] = useState(false);
  console.log('venusAnlockkkkkk===>', venusAnlockkkkkk);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    setData();
  }, [venusAnlockkkkkk]);

  const setData = async () => {
    try {
      const data = {
        venusAnlockkkkkk,
      };
      const jsonData = JSON.stringify(data);
      await AsyncStorage.setItem('LvlFirstMarcyry', jsonData);
      console.log('Дані збережено в AsyncStorage');
    } catch (e) {
      console.log('Помилка збереження даних:', e);
    }
  };

  const getData = async () => {
    try {
      const jsonData = await AsyncStorage.getItem('LvlFirstMarcyry');
      if (jsonData !== null) {
        const parsedData = JSON.parse(jsonData);
        console.log('parsedData==>', parsedData);
        setVenusAnlockkkkkk(parsedData.venusAnlockkkkkk);
      }
    } catch (e) {
      console.log('Помилка отримання даних:', e);
    }
  };
  //////////////////////////////////

  const [emptyIndex, setEmptyIndex] = useState(0);
  //console.log(emptyIndex);
  const [firtRender, setFirtRender] = useState(true);
  const [complited, setComplited] = useState(false);

  //перемешивает пазлы при первом рендере
  useEffect(() => {
    mixingPuzzles();
  }, []);
  //

  //если собрал пазл то сообщ о победе(пропуская первый рендер)
  useEffect(() => {
    if (firtRender) {
      setFirtRender(false);
    } else if (isBoardSolved()) {
      //Alert.alert('Ты победил!');
      setComplited(true);
      setVenusAnlockkkkkk(true);
    }
  }, []);
  /////////////////////////////

  const canMovePiece = pieceIndex => {
    const rowSize = Math.sqrt(board.length); ///
    const emptyRow = Math.floor(emptyIndex / rowSize);
    const emptyCol = emptyIndex % rowSize;
    const pieceRow = Math.floor(pieceIndex / rowSize);
    const pieceCol = pieceIndex % rowSize;

    return (
      (emptyRow === pieceRow && Math.abs(emptyCol - pieceCol) === 1) ||
      (emptyCol === pieceCol && Math.abs(emptyRow - pieceRow) === 1)
    );
  };

  const movePiece = pieceIndex => {
    if (canMovePiece(pieceIndex)) {
      const updatedBoard = [...board];
      [updatedBoard[pieceIndex], updatedBoard[emptyIndex]] = [
        updatedBoard[emptyIndex],
        updatedBoard[pieceIndex],
      ];
      setBoard(updatedBoard);
      setEmptyIndex(pieceIndex);
    }
  };

  //перемешивает пазл
  const mixingPuzzles = () => {
    const shuffledBoard = [...board];
    shuffledBoard.sort(() => Math.random() - 0.5);
    setBoard(shuffledBoard);
    //board.findIndex((piece) => piece.id === 16)
    const emptyIndex = shuffledBoard.findIndex(piece => piece.id === 16);
    setEmptyIndex(emptyIndex);
  };

  //проверяет собран ли борд
  const isBoardSolved = () => {
    for (let i = 0; i < board.length - 1; i++) {
      if (board[i].id !== i + 1) {
        return false;
      }
    }
    return true;
  };
  ///Timer
  const [timer, setTimer] = useState(300);
  const [isRuning, setIsRuning] = useState(false);
  const [btnIsVisible, setBtnIsVisible] = useState(false);
  //эфект обратного отщета времени
  useEffect(() => {
    const timerInterval = setInterval(() => {
      if (isRuning) {
        setTimer(prevTimer => prevTimer - 1);
      }
    }, 1000);

    if (timer === 0) {
      clearInterval(timerInterval);
      Alert.alert(
        'GAME OVER!!!',
        'Go back and try again',
        [
          {
            text: 'OK',
            onPress: () => {
              navigation.goBack();
            },
          },
        ],
        {cancelable: false},
      );
    }

    return () => {
      clearInterval(timerInterval);
    };
  }, [timer, isRuning]);

  //формат времени
  const formatTime = seconds => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds
      .toString()
      .padStart(2, '0')}`;
  };

  //oстановка таймера
  const handleChangeTimerRunState = () => {
    setIsRuning(!isRuning);
  };
  //////////////////////////////////////////////////////
  const [venusAnlock, setVenusAnlock] = useState(false);
  const [earthAnlock, setEarthAnlock] = useState(false);
  const [marsAnlock, setMarsAnlock] = useState(false);
  const [jupiterAnlock, setJupiterAnlock] = useState(false);
  const [saturnAnlock, setSaturnAnlock] = useState(false);
  //console.log('venusAnlock===>', venusAnlock);

  // lvl venus
  useEffect(() => {
    getDataAboutVenus();
  }, []);
  const getDataAboutVenus = async () => {
    try {
      const jsonData = await AsyncStorage.getItem('LvlFirstMarcyry');
      if (jsonData !== null) {
        const parsedData = JSON.parse(jsonData);
        console.log('parsedData==>', parsedData);
        setVenusAnlock(parsedData.venusAnlock);
      }
    } catch (e) {
      console.log('Помилка отримання даних:', e);
    }
  };

  // lvl earth
  useEffect(() => {
    getDataAboutEarth();
  }, []);
  const getDataAboutEarth = async () => {
    try {
      const jsonData = await AsyncStorage.getItem('LvlSecondVenus');
      if (jsonData !== null) {
        const parsedData = JSON.parse(jsonData);
        console.log('parsedData==>', parsedData);
        setEarthAnlock(parsedData.earthAnlock);
      }
    } catch (e) {
      console.log('Помилка отримання даних:', e);
    }
  };

  // lvl mars
  useEffect(() => {
    getDataAboutMars();
  }, []);
  const getDataAboutMars = async () => {
    try {
      const jsonData = await AsyncStorage.getItem('LvlSecondEarth');
      if (jsonData !== null) {
        const parsedData = JSON.parse(jsonData);
        console.log('parsedData==>', parsedData);
        setMarsAnlock(parsedData.marsAnlock);
      }
    } catch (e) {
      console.log('Помилка отримання даних:', e);
    }
  };

  // lvl jupiter
  useEffect(() => {
    getDataAboutJupiter();
  }, []);
  const getDataAboutJupiter = async () => {
    try {
      const jsonData = await AsyncStorage.getItem('LvlFourthMars');
      if (jsonData !== null) {
        const parsedData = JSON.parse(jsonData);
        console.log('parsedData==>', parsedData);
        setJupiterAnlock(parsedData.jupiterAnlock);
      }
    } catch (e) {
      console.log('Помилка отримання даних:', e);
    }
  };
  // lvl saturn
  useEffect(() => {
    getDataAboutSaturn();
  }, []);

  const getDataAboutSaturn = async () => {
    try {
      const jsonData = await AsyncStorage.getItem('LvlFifthJupiter');
      if (jsonData !== null) {
        const parsedData = JSON.parse(jsonData);
        console.log('parsedData==>', parsedData);
        setSaturnAnlock(parsedData.saturnAnlock);
      }
    } catch (e) {
      console.log('Помилка отримання даних:', e);
    }
  };

  // lvl uran
  useEffect(() => {
    getDataAboutUran();
  }, []);
  const getDataAboutUran = async () => {
    try {
      const jsonData = await AsyncStorage.getItem('LvlSixthSaturn');
      if (jsonData !== null) {
        const parsedData = JSON.parse(jsonData);
        console.log('parsedData==>', parsedData);
        setUranAnlock(parsedData.uranAnlock);
      }
    } catch (e) {
      console.log('Помилка отримання даних:', e);
    }
  };

  // lvl neptun
  useEffect(() => {
    getDataAboutNeptun();
  }, []);
  const getDataAboutNeptun = async () => {
    try {
      const jsonData = await AsyncStorage.getItem('LvlSeventhUran');
      if (jsonData !== null) {
        const parsedData = JSON.parse(jsonData);
        console.log('parsedData==>', parsedData);
        setNeptunAnlock(parsedData.neptunAnlock);
      }
    } catch (e) {
      console.log('Помилка отримання даних:', e);
    }
  };
  return (
  <View style={{flex:1}}>
    {
      !showSecondScreen?(
      <View style={{flex: 1}}>
      <ImageBackground
        //source={require('../assets/updDiz/backgr_2.jpg')}
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View style={{flex: 1, width: '100%', position: 'relative'}}>
          {/**LVL`s Block */}
          <View style={{marginHorizontal: 10, marginTop: 40, marginBottom: 10}}>
            {/** LOGO */}
            <View style={{alignItems: 'center', marginBottom: 10, marginTop:20}}>
              
            </View>
            <ScrollView>
              {/**MARCYRY Lvl navigation.navigate('LvlFirstMarcyry')*/}
              <TouchableOpacity
                onPress={() => setShowSecondScreen(true)}
                activeOpacity={0.8}
                style={{
                  backgroundColor: 'rgba(0, 0, 0, 0.7)',
                  width: '100%',
                  height: 230,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 10,
                  borderWidth: 2,
                  borderColor: 'red',
                  marginBottom: 15,
                }}>
                <Image
                  source={require('../assets/levelsCard/BrandeburgGate.png')}
                  style={{
                    width: '100%',
                    height: 200,
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                  }}
                />
                <Text
                  style={{color: 'red', fontWeight: '700', fontSize: 18}}>
                  Brandenburger Tor
                </Text>
              </TouchableOpacity>

              {/**VENUS Lvl*/}
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('LvlSecondVenus');
                }}
                disabled={venusAnlock ? false : true}
                activeOpacity={0.8}
                style={{
                  backgroundColor: 'rgba(0, 0, 0, 0.7)',
                  width: '100%',
                  height: 230,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 10,
                  borderWidth: 2,
                  borderColor: venusAnlock ? 'red' : '#333333',
                  marginBottom: 15,
                }}>
                <Image
                  source={require('../assets/levelsCard/EastSideGallery.png')}
                  style={{
                    width: '100%',
                    height: 200,
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                  }}
                />
                <Text
                  style={{
                    color: 'red',
                    fontWeight: '700',
                    fontSize: 18,
                  }}>
                  EastSide Gallery
                </Text>
              </TouchableOpacity>

              {/**EARTH Lvl*/}
              <TouchableOpacity
                disabled={earthAnlock ? false : true}
                onPress={() => {
                  navigation.navigate('LvlSecondEarth');
                }}
                activeOpacity={0.8}
                style={{
                  backgroundColor: 'rgba(0, 0, 0, 0.7)',
                  width: '100%',
                  height: 230,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 10,
                  borderWidth: 2,
                  borderColor: earthAnlock ? 'red' : '#333333',
                  marginBottom: 15,
                }}>
                <Image
                  source={require('../assets/levelsCard/Fernsehturm.png')}
                  style={{
                    width: '100%',
                    height: 200,
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                  }}
                />
                <Text
                  style={{color: 'red', fontWeight: '700', fontSize: 18}}>
                  Fernsehturm
                </Text>
              </TouchableOpacity>

              {/**MARS Lvl*/}
              <TouchableOpacity
                disabled={marsAnlock ? false : true}
                onPress={() => {
                  navigation.navigate('LvlFourthMars');
                }}
                activeOpacity={0.8}
                style={{
                  backgroundColor: 'rgba(0, 0, 0, 0.7)',
                  width: '100%',
                  height: 230,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 10,
                  borderWidth: 2,
                  borderColor: marsAnlock ? 'red' : '#333333',
                  marginBottom: 15,
                }}>
                <Image
                  source={require('../assets/levelsCard/Gendarmenmarkt.png')}
                  style={{
                    width: '100%',
                    height: 200,
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                  }}
                />
                <Text
                  style={{color: 'red', fontWeight: '700', fontSize: 18}}>
                  Gendarmenmarkt
                </Text>
              </TouchableOpacity>

              {/**Jupiter Lvl*/}
              <TouchableOpacity
                disabled={jupiterAnlock ? false : true}
                onPress={() => {
                  navigation.navigate('LvlFifthJupiter');
                }}
                activeOpacity={0.8}
                style={{
                  backgroundColor: 'rgba(0, 0, 0, 0.7)',
                  width: '100%',
                  height: 230,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 10,
                  borderWidth: 2,
                  borderColor: jupiterAnlock ? 'red' : '#333333',
                  marginBottom: 15,
                }}>
                <Image
                  source={require('../assets/levelsCard/Reichstag.png')}
                  style={{
                    width: '100%',
                    height: 200,
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                  }}
                />
                <Text
                  style={{color: 'red', fontWeight: '700', fontSize: 18}}>
                  Reichstag
                </Text>
              </TouchableOpacity>

              {/**SATURN Lvl*/}
              <TouchableOpacity
                disabled={saturnAnlock ? false : true}
                onPress={() => {
                  navigation.navigate('LvlSixthSaturn');
                }}
                activeOpacity={0.8}
                style={{
                  backgroundColor: 'rgba(0, 0, 0, 0.7)',
                  width: '100%',
                  height: 230,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 10,
                  borderWidth: 2,
                  borderColor: saturnAnlock ? 'red' : '#333333',
                  marginBottom: 15,
                }}>
                <Image
                  source={require('../assets/levelsCard/SchlossCharlottenburg.png')}
                  style={{
                    width: '100%',
                    height: 200,
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                  }}
                />
                <Text
                  style={{color: 'red', fontWeight: '700', fontSize: 18}}>
                  Schloss Charlottenburg
                </Text>
              </TouchableOpacity>

             
              <View style={{height: 100}}></View>
            </ScrollView>
          </View>

          {/**BTN back */}
          <TouchableOpacity
            style={{
              position: 'absolute',
              bottom: 10,
              right: 10,
              alignItems: 'center',
              justifyContent: 'center',
              borderWidth: 3,
              borderColor: 'red',
              width: 60,
              height: 60,
              borderRadius: 10,
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
            }}
            onPress={() => {
              navigation.navigate('Home');
            }}>
            <Text style={{color: 'red'}}>GO</Text>
            <Text style={{color: 'red'}}>BACK</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
      ): (
         <View style={{flex: 1}}>
               <ImageBackground
                 //source={require('../assets/updDiz/backgr_2.jpg')}
                 style={{flex: 1}}>
                 <View
                   style={{
                     flex: 1,
                     position: 'relative',
                     marginTop: 10,
                     alignItems: 'center',
                     //justifyContent: 'center',
                   }}>
                   <View style={{alignItems: 'center', marginBottom: 10}}>
                     <Image
                       //source={require('../assets/levelsCard/BerlinerDom.png')}
                       style={{width: 200, height: 60}}
                     />
                   </View>
         
                   <View style={{flexDirection: 'row', marginBottom: 20}}>
                     {isRuning ? (
                       <TouchableOpacity
                         style={{
                           marginRight: 10,
                           color: '#000205',
                           borderWidth: 1,
                           borderColor: 'red',
                           //borderRadius: 20,
                           color: 'red',
                           paddingLeft: 10,
                           paddingRight: 10,
                           backgroundColor: 'rgba(0, 0, 0, 0.7)',
                           height: 60,
                           justifyContent: 'center',
                           alignItems: 'center',
                         }}
                         onPress={handleChangeTimerRunState}>
                         <Text style={{color: 'red', fontSize: 25}}>Stop</Text>
                       </TouchableOpacity>
                     ) : (
                       <TouchableOpacity
                         style={{
                           marginRight: 10,
                           color: '#000205',
                           borderWidth: 1,
                           borderColor: 'red',
                           //borderRadius: 20,
                           color: 'red',
                           paddingLeft: 12,
                           paddingRight: 12,
                           backgroundColor: 'rgba(0, 0, 0, 0.7)',
                           height: 60,
                           justifyContent: 'center',
                           alignItems: 'center',
                         }}
                         onPress={handleChangeTimerRunState}>
                         <Text style={{color: 'red', fontSize: 25}}>Play</Text>
                       </TouchableOpacity>
                     )}
         
                     <Text
                       style={{
                         fontSize: 40,
                         color: '#000205',
                         borderWidth: 1,
                         borderColor: 'red',
                         //borderRadius: 20,
                         color: 'red',
                         paddingLeft: 10,
                         paddingRight: 10,
                         backgroundColor: 'rgba(0, 0, 0, 0.7)',
                         height: 60,
                       }}>
                       {formatTime(timer)}
                     </Text>
                   </View>
                   <ScrollView showsVerticalScrollIndicator={false}>
                     <View style={{alignItems: 'center'}}>
                       <View
                         style={{
                           flexDirection: 'row',
                           flexWrap: 'wrap',
                           width: 300,
                           borderTopWidth: 10,
                           borderLeftWidth: 10,
                           borderRightWidth: 10,
                           borderBottomWidth: 10,
                           //borderTopLeftRadius: 50,
                           //borderTopRightRadius: 50,
                           borderColor: 'red',
                         }}>
                         {board.map((piece, index) => (
                           <TouchableOpacity
                             key={index}
                             style={{
                               width: 70,
                               height: 70,
                               justifyContent: 'center',
                               //alignItems: 'center',
                               backgroundColor: 'lightblue',
                             }}
                             onPress={() => movePiece(index)}
                             disabled={!canMovePiece(index) || !isRuning}>
                             <Image
                               source={piece.image}
                               style={{width: 70, height: 70}}
                             />
                           </TouchableOpacity>
                         ))}
                       </View>
         
                       <View>
                         <Text
                           style={{color: 'red', fontWeight: 'bold', fontSize: 20}}>
                           Brandenburger Tor
                         </Text>
                       </View>
         
                       <View style={{flexDirection: 'row'}}>
                         <Image
                           style={{
                             marginLeft: 0,
                             //marginTop: 10,
                             width: 200,
                             height: 200,
                             borderWidth: 1,
                             borderColor: 'red',
                             justifyContent: 'flex-start',
                           }}
                           source={require('../assets/levelsCard/BrandeburgGate.png')}
                         />
                      </View>
                      
                      <TouchableOpacity
                        style={{
                          marginTop: 40,
                          marginLeft:250,
                           marginRight: 10,
                           color: '#000205',
                           borderWidth: 1,
                           borderColor: 'red',
                           //borderRadius: 20,
                           color: 'red',
                           paddingLeft: 12,
                           paddingRight: 12,
                           backgroundColor: 'rgba(0, 0, 0, 0.7)',
                           height: 60,
                           justifyContent: 'center',
                           alignItems: 'center',
                         }}
                        onPress={() => Back()
                    }
                    >
                         <Text style={{color: 'red', fontSize: 25}}>Back</Text>
                       </TouchableOpacity>
                     </View>
                   </ScrollView>
         
                   {venusAnlockkkkkk && (
                     <TouchableOpacity
                       onPress={() => {
                         navigation.navigate('LvlSecondVenus');
                       }}
                       activeOpacity={0.6}
                       style={{
                         position: 'absolute',
                         width: 250,
                         height: 150,
                         borderColor: 'red',
                         borderWidth: 3,
                         marginTop: '50%',
                         justifyContent: 'center',
                         alignItems: 'center',
                         borderRadius: 10,
                         backgroundColor: 'rgba(0, 0, 0, 0.7)',
                       }}>
                       <Text
                         style={{
                           color: 'red',
                           fontSize: 18,
                           fontWeight: '700',
                           marginBottom: 5,
                         }}>
                         CONGRAT!!!
                       </Text>
                       <Text
                         style={{
                           color: 'red',
                           fontSize: 18,
                           fontWeight: '700',
                           marginBottom: 5,
                         }}>
                         YOU ARE WIN
                       </Text>
                       <Text
                         style={{
                           color: 'red',
                           fontSize: 18,
                           fontWeight: '700',
                           marginBottom: 5,
                         }}>
                         PRESS HIRE ADN GO
                       </Text>
                       <Text style={{color: 'red', fontSize: 18, fontWeight: '700'}}>
                         TO NEXT LVL
                       </Text>
                     </TouchableOpacity>
                   )}
         
                   <TouchableOpacity
                     style={{
                       position: 'absolute',
                       bottom: 10,
                       right: 10,
                       alignItems: 'center',
                       justifyContent: 'center',
                       borderWidth: 3,
                       borderColor: 'red',
                       width: 60,
                       height: 60,
                       borderRadius: 10,
                       backgroundColor: 'rgba(0, 0, 0, 0.7)',
                     }}
                     onPress={() => {
                       navigation.navigate('Home');
                     }}>
                     <Text style={{color: 'red'}}>GO</Text>
                     <Text style={{color: 'red'}}>BACK</Text>
                   </TouchableOpacity>
                 </View>
               </ImageBackground>
             </View> 
    )}
    </View>
  );
};



export default MiniGame;


