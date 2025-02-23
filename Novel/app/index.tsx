import React, { useEffect, useState } from "react";
import { Text, View, Image, Button, StyleSheet } from "react-native";
import images, { ImageKeys } from './_dataimport';
import { Audio } from 'expo-av';

interface Scene {
  image: ImageKeys;
  text: string;
  options: Array<{
  text: string;
  nextIndex: number;
  }>;
}

interface StoryData {
  scenes: Scene[];
}

const initialStoryData: StoryData = {
  scenes: [
    {
      image: "image1",
      text: "Вам снится прекрасный сон, но звук будильника мешает его смотреть.",
      options: [
        {
          text: "Открыть глаза.",
          nextIndex: 1
        },
        {
          text: "Спать дальше.",
          nextIndex: 2
        }
      ]
    }
  ],
};

export default function Index() {

  const [storyData, setStoryData] = useState<StoryData>(initialStoryData);;
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://raw.githubusercontent.com/PrAl4/ReactNative/main/text_data.json');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setStoryData(data);
      } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
      }
    };
    fetchData();
  }, []);

  const currentScene = storyData.scenes[currentIndex];
  const imageSource = { uri: images[currentScene.image] };


  const playSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require('../assets/sounds/punch.mp3')
    );
    await sound.playAsync();
  };

  const handleOptionPress = (nextIndex: number) => {
    playSound(); 
    setCurrentIndex(nextIndex); 
  };

  const [backgroundSound, setBackgroundSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const playBackgroundMusic = async () => {
    try {
      const { sound } = await Audio.Sound.createAsync(
        require('../assets/sounds/background_sound.mp3') // Укажите путь к вашему музыкальному файлу
      );
      setBackgroundSound(sound);
      await sound.playAsync();
      await sound.setIsLoopingAsync(true); // Зацикливание музыки
      setIsPlaying(true);
    } catch (error) {
      console.error("Ошибка при воспроизведении фоновой музыки:", error);
    }
  };

  const stopBackgroundMusic = async () => {
    if (backgroundSound) {
      await backgroundSound.stopAsync();
      await backgroundSound.unloadAsync(); // Освобождаем ресурсы
      setIsPlaying(false);
    }
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      stopBackgroundMusic();
    } else {
      playBackgroundMusic();
    }
  };

  // Очистка ресурсов при размонтировании компонента
  useEffect(() => {
    return () => {
      stopBackgroundMusic();
    };
  }, []);

  return (
    
    <View style={styles.container}>
      <Image source={imageSource} style={styles.image} resizeMode="contain" />
      <View style={styles.textContainer}>
        <Text style={styles.Text}>{currentScene.text}</Text>
      </View>
      {currentScene.options.map((option, index) => (
          <Button key={index} title={option.text} onPress={() => handleOptionPress(option.nextIndex) }  
          color="rgba(117, 10, 69, 0.52)"
          />
        ))}
        <Button
        title={isPlaying ? "Остановить музыку" : "Играть музыку"}
        onPress={handlePlayPause}
      />
    </View>
    
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: 'relative',
    backgroundColor: '#000'
  },
  textContainer: {
    backgroundColor: 'rgba(234, 67, 92, 0.22)',
    marginTop:'30%', 
    position: 'absolute',
    alignItems: 'center',
    paddingHorizontal: '30%',
    width: '100%', 
  },
  image: {
    width: '100%', 
    height: '100%',
    position: 'absolute',
  },
  Text: {
    color: '#fff',
    fontSize: 22,
    textAlign: 'center',
    fontWeight: 'bold',
    textShadowColor: 'rgba(255, 0, 0, 50)',
    textShadowRadius: 3
  }
})
