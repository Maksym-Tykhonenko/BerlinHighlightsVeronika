import React, {useState, useEffect} from 'react';
import {
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
  Image,
  Alert,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
{
  /** */
}
const LvlFirstMarcyry = ({navigation}) => {
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

  //AsyncStorage logick
  const [venusAnlock, setVenusAnlock] = useState(false);
  console.log('venusAnlock===>', venusAnlock);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    setData();
  }, [venusAnlock]);

  const setData = async () => {
    try {
      const data = {
        venusAnlock,
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
        setVenusAnlock(parsedData.venusAnlock);
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
      setVenusAnlock(true);
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
  const [timer, setTimer] = useState(600);
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
  //////////////////////////////////////////

  return (
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
              source={require('../assets/levelsCard/BerlinerDom.png')}
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
                  borderColor: '#ffcd00',
                  //borderRadius: 20,
                  color: '#ffcd00',
                  paddingLeft: 10,
                  paddingRight: 10,
                  backgroundColor: 'rgba(0, 0, 0, 0.7)',
                  height: 60,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={handleChangeTimerRunState}>
                <Text style={{color: '#ffcd00', fontSize: 25}}>Stop</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={{
                  marginRight: 10,
                  color: '#000205',
                  borderWidth: 1,
                  borderColor: '#ffcd00',
                  //borderRadius: 20,
                  color: '#ffcd00',
                  paddingLeft: 12,
                  paddingRight: 12,
                  backgroundColor: 'rgba(0, 0, 0, 0.7)',
                  height: 60,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={handleChangeTimerRunState}>
                <Text style={{color: '#ffcd00', fontSize: 25}}>Play</Text>
              </TouchableOpacity>
            )}

            <Text
              style={{
                fontSize: 40,
                color: '#000205',
                borderWidth: 1,
                borderColor: '#ffcd00',
                //borderRadius: 20,
                color: '#ffcd00',
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
                  borderColor: '#ffcd00',
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
                  style={{color: '#ffcd00', fontWeight: 'bold', fontSize: 20}}>
                  MERKUR
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
                    borderColor: '#ffcd00',
                    justifyContent: 'flex-start',
                  }}
                  //source={require('../assets/planats/mercury.jpeg')}
                />
              </View>
            </View>
          </ScrollView>

          {venusAnlock && (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('LvlSecondVenus');
              }}
              activeOpacity={0.6}
              style={{
                position: 'absolute',
                width: 250,
                height: 150,
                borderColor: '#ffcd00',
                borderWidth: 3,
                marginTop: '50%',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 10,
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
              }}>
              <Text
                style={{
                  color: '#ffcd00',
                  fontSize: 18,
                  fontWeight: '700',
                  marginBottom: 5,
                }}>
                CONGRAT!!!
              </Text>
              <Text
                style={{
                  color: '#ffcd00',
                  fontSize: 18,
                  fontWeight: '700',
                  marginBottom: 5,
                }}>
                YOU ARE WIN
              </Text>
              <Text
                style={{
                  color: '#ffcd00',
                  fontSize: 18,
                  fontWeight: '700',
                  marginBottom: 5,
                }}>
                PRESS HIRE ADN GO
              </Text>
              <Text style={{color: '#ffcd00', fontSize: 18, fontWeight: '700'}}>
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
              borderColor: '#ffcd00',
              width: 60,
              height: 60,
              borderRadius: 10,
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
            }}
            onPress={() => {
              navigation.navigate('Home');
            }}>
            <Text style={{color: '#ffcd00'}}>GO</Text>
            <Text style={{color: '#ffcd00'}}>BACK</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

export default LvlFirstMarcyry;
