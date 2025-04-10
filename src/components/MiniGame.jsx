import React, { useEffect, useRef, useState } from 'react';
import { View, TouchableOpacity, Image, StyleSheet, Dimensions, Text, Animated, Easing, Alert, Modal } from 'react-native';

const { height } = Dimensions.get('window');

const horizontalPlatform = require('../assets/game/horizontal.png');
const verticalPlatform = require('../assets/game/vertical.png');
const coin = require('../assets/game/coin.png');
const runnerImage = require('../assets/game/runner.png');

const MiniGame = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalOverVisible, setModalOverVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(1);
  const [platforms, setPlatforms] = useState(generateInitialPlatforms());
  const [runnerY, setRunnerY] = useState(new Animated.Value(0));
  const [jumping, setJumping] = useState(false);
  const [runnerPosition, setRunnerPosition] = useState({ x: 50, y: height * 0.6 });
  const [coins, setCoins] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const moveIntervalRef = useRef(null);
  const crashCheckRef = useRef(null);
  const gameOver = useRef(false);

  useEffect(() => {
    setCurrentIndex(0)
  }, [])

  let patternIndex = 6;

  function generateInitialPlatforms() {
    const pattern = ['horizontal', 'horizontal', 'vertical'];
    return new Array(6).fill(null).map((_, i) => ({
      type: pattern[i % pattern.length],
      x: 100 + i * 120,
      y: height * 0.6,
      hasCoin: Math.random() > 0.5,
    }));
  }

useEffect(() => {
  if (isPaused) return;

  moveIntervalRef.current = setInterval(() => {
    if (gameOver.current) {
      setModalOverVisible(true);
      return;
    }

    setPlatforms((prevPlatforms) => {
      const updated = prevPlatforms.map((p) => ({ ...p, x: p.x - 4 }));

      if (updated.length && updated[0].x < -100) {
        updated.shift();

        const prev = updated[updated.length - 1];
        const pattern = ['horizontal', 'horizontal', 'vertical'];
        const newType = pattern[patternIndex % pattern.length];

        updated.push({
          type: newType,
          x: prev.x + 120,
          y: height * 0.6,
          hasCoin: Math.random() > 0.5,
        });

        patternIndex++;
      }

      return updated;
    });
  }, 16);

  return () => clearInterval(moveIntervalRef.current);
}, [isPaused]);

useEffect(() => {
  if (isPaused) return;

  crashCheckRef.current = setInterval(() => {
    if (gameOver.current) return;

    const underRunner = platforms.find((p) => {
      const width = p.type === 'horizontal' ? 100 : 18;
      return p.x < runnerPosition.x + 40 && p.x + width > runnerPosition.x + 20;
    });

    if (!underRunner) {
      gameOver.current = true;
      Alert.alert('Game Over', 'You fell between platforms!');
      return;
    }

    if (underRunner.type === 'vertical' && !jumping) {
      gameOver.current = true;
      Alert.alert('Game Over', 'You hit a vertical platform!');
      return;
    }

    if (underRunner.hasCoin) {
      const coinCenter = underRunner.x + (underRunner.type === 'horizontal' ? 40 : 5);
      const runnerCenter = runnerPosition.x + 25;

      if (Math.abs(coinCenter - runnerCenter) < 30) {
        setCoins((prev) => prev + 1);
        setPlatforms((prev) =>
          prev.map((p) =>
            p === underRunner ? { ...p, hasCoin: false } : p
          )
        );
      }
    }
  }, 100);

  return () => clearInterval(crashCheckRef.current);
}, [isPaused, platforms, jumping, runnerPosition]);

  useEffect(() => {
    const id = runnerY.addListener(({ value }) => {
      setRunnerPosition((pos) => ({ ...pos, y: height * 0.6 + value }));
    });

    return () => runnerY.removeListener(id);
  }, []);

  const checkLanding = () => {
    const landedPlatform = platforms.find((p) => {
      const platformWidth = p.type === 'horizontal' ? 100 : 18;
      return p.x < runnerPosition.x + 40 && p.x + platformWidth > runnerPosition.x + 20;
    });

    if (landedPlatform && landedPlatform.hasCoin) {
      const coinCenter = landedPlatform.x + (landedPlatform.type === 'horizontal' ? 40 : 5);
      const runnerCenter = runnerPosition.x + 25;

      if (Math.abs(coinCenter - runnerCenter) < 30) {
        setCoins((prev) => prev + 1);
        setPlatforms((prev) =>
          prev.map((p) =>
            p === landedPlatform ? { ...p, hasCoin: false } : p
          )
        );
      }
    }
  };

  const handleJump = () => {
    if (jumping || gameOver.current) return;

    setJumping(true);
    Animated.sequence([
      Animated.timing(runnerY, {
        toValue: -80,
        duration: 300,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.timing(runnerY, {
        toValue: 0,
        duration: 300,
        easing: Easing.in(Easing.quad),
        useNativeDriver: true,
      }),
    ]).start(() => {
      setJumping(false);
      setTimeout(() => checkLanding(), 50);
    });
  };

  const togglePause = () => {
    setIsPaused((prev) => !prev);
    setModalVisible((prev) => !prev);
  }

  if (currentIndex === 0) {
    return (
      <View style={styles.container}>
        <View style={{ width: '100%', alignItems: 'center', paddingHorizontal: 20 }}>

          <View style={{height: 44}} />

          <Image
            source={require('../assets/decor/logo.png')}
            style={{
              width: 135,
              height: height * 0.11,
              resizeMode: 'contain',
              marginBottom: height * 0.05,
              marginTop: 20,
            }}
          />

          <Text style={[styles.text, { marginBottom: height * 0.06 }]}>
            Get ready for an exciting adventure across the platforms of Berlin! 🏙️ Your goal is to jump over vertical platforms ⬆️ and land on horizontal ones ⬇️, avoiding dangers ⚠️ along the way. Every 3 seconds ⏱️, the platforms change position 🔄, so always stay alert! 👀
          </Text>

          <TouchableOpacity style={styles.btn} onPress={() => setCurrentIndex(1)}>
            <Image source={require('../assets/icons/arrow.png')} style={{ width: 34, height: 22, resizeMode: 'contain' }} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <TouchableOpacity activeOpacity={1} style={styles.container} onPress={handleJump}>
      <View style={styles.header}>
        <TouchableOpacity
            style={[styles.btn, { alignSelf: 'flex-end', width: 53, height: 53 }]}
            onPress={togglePause}
          >
            <Image source={require('../assets/game/pause.png')} style={{ width: 22, height: 26, resizeMode: 'contain' }} />
          </TouchableOpacity>
        <View style={styles.coinContainer}>
          <Image source={coin} style={styles.coinIcon} />
          <Text style={styles.coinText}>{coins}</Text>
        </View>
      </View>

      {platforms.map((platform, index) => {
        const isHorizontal = platform.type === 'horizontal';
        return (
          <React.Fragment key={`platform-${index}`}>
            <Image
              source={isHorizontal ? horizontalPlatform : verticalPlatform}
              style={[
                styles.platform,
                {
                  left: platform.x + (isHorizontal ? 0 : 6),
                  top: isHorizontal ? platform.y : platform.y - 50,
                  width: isHorizontal ? 100 : 18,
                  height: isHorizontal ? 18 : 100,
                },
              ]}
            />

            {platform.hasCoin && (
              <Image
                key={`coin-${index}`}
                source={coin}
                style={[
                  styles.coin,
                  {
                    top: isHorizontal ? platform.y - 25 : platform.y - 90,
                    left: platform.x + (isHorizontal ? 40 : 4),
                  },
                ]}
              />
            )}
          </React.Fragment>
        );
      })}

      <Animated.Image
        source={runnerImage}
        style={[styles.runner, { transform: [{ translateY: runnerY }] }]}
      />

      {
        (isPaused && modalVisible) && (
          <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
          >
            <View style={styles.modalOverlay}>
              <View style={styles.modalBox}>
                <Text style={styles.modalTitle}>Pause</Text>

                <TouchableOpacity style={styles.modalButton} onPress={togglePause}>
                  <Text style={styles.modalButtonText}>Continue</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.modalButton} onPress={() => { togglePause(); setCurrentIndex(0); setCoins(0); }}>
                  <Text style={styles.modalButtonText}>Back Home</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        )
      }

      {
        modalOverVisible && (
          <Modal
            animationType="fade"
            transparent={true}
            visible={modalOverVisible}
          >
            <View style={styles.modalOverlay}>
              <View style={styles.modalBox}>
                <Text style={[styles.modalTitle, { fontWeight: '500', textAlign: 'center' }]}>You were almost there! Try again, success is near!</Text>
                
                <Image source={require('../assets/decor/gameover.png')} style={{width: 99, height: height * 0.2, resizeMode: 'contain', marginVertical: 10}} />

                <TouchableOpacity style={styles.modalButton} onPress={() => { setCurrentIndex(0); setModalOverVisible(false); gameOver.current = false; setCoins(0); }}>
                  <Text style={styles.modalButtonText}>Try again</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        )
      }

    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({

  container: {
    flex: 1,
    paddingTop: height * 0.07
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    alignItems: 'center',
  },

  timer: {
    backgroundColor: '#ff515b',
    color: '#fff',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 5,
    fontSize: 16,
    fontWeight: '600',
  },

  coinContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  coinIcon: {
    width: 33,
    height: 22,
    marginRight: 6,
    resizeMode: 'contain'
  },

  coinText: {
    fontSize: 24,
    color: '#ff515b',
    fontWeight: '600',
  },

  platform: {
    width: 60,
    height: 15,
    position: 'absolute',
    resizeMode: 'contain',
  },

  coin: {
    width: 22,
    height: 22,
    position: 'absolute',
    resizeMode: 'contain',
  },

  runner: {
    width: 50,
    height: 50,
    position: 'absolute',
    left: 50,
    top: height * 0.6 - 50,
    resizeMode: 'contain',
  },

  text: {
    fontSize: 18,
    color: '#000',
    fontWeight: '500',
    textAlign: 'left',
    alignSelf: 'flex-start',
  },

  btn: {
    width: 78,
    height: 53,
    backgroundColor: '#ff515b',
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },

  modalBox: {
    backgroundColor: 'white',
    padding: 30,
    borderRadius: 10,
    width: 280,
    alignItems: 'center',
  },

  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000',
  },

  modalButton: {
    backgroundColor: '#ff5b5b',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginVertical: 8,
    width: '100%',
    alignItems: 'center',
  },

  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },

});

export default MiniGame;
