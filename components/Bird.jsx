import React from 'react';
import {View,ImageBackground,StyleSheet} from 'react-native';

const Bird = ({birdBottom,birdLeft}) => {
    const birdWidth = 50;
    const birdHeight =60;
    return(
        <View style = {{
            position: 'absolute',
            width: birdWidth,
            height: birdHeight,
            bottom: birdBottom - (birdHeight/2),
            left: birdLeft - (birdWidth/2),
        }}>
        <ImageBackground source=
        {{ uri: 'https://opengameart.org/sites/default/files/GIF-sample.gif' }}
        resizeMode="cover" style={styles.image}>
        </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    image: {
      flex: 1,
      justifyContent: "center",
      width: 50,
      height: 60,
    },
  });

export default Bird;