import React, { useEffect, useState } from "react";
import { Text, View, Image, Button, StyleSheet } from "react-native";
import images, { ImageKeys } from './_dataimport';

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

  return (
    <View style={styles.container}>
      <Image source={imageSource} style={styles.image} resizeMode="contain" />
      <View style={styles.textContainer}>
        <Text style={styles.Text}>{currentScene.text}</Text>
      </View>
      {currentScene.options.map((option, index) => (
          <Button key={index} title={option.text} onPress={() => setCurrentIndex(option.nextIndex)}  
          color="rgba(117, 10, 69, 0.52)"
          />
        ))}
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
