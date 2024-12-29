import { Text, View, StyleSheet, Image } from 'react-native';

export default function AboutScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.imgContainer}>
        <Image source={require('D:/universitet/magister/кп/ReactNative/Novel/assets/images/icon.png')}
               style={styles.storyImg}
        ></Image>
        <Text style={styles.text}>About screen</Text>
        <Text style={styles.text}>About screen</Text>
        <Text style={styles.text}>About screen</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    top: 30,
    color: '#fff',
    textAlign: 'center',
  },
  imgContainer: {
    alignItems: 'center',
    paddingTop: '10%',
    width: '100%',
    height: '150%',
  },
  storyImg:{
    width: '50%',
    height: '50%',
    left:0,
    bottom:0,
    right:0,
    top:0,
  },
});