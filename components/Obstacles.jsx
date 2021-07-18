import React from 'react';
import { View, ImageBackground, StyleSheet } from 'react-native';
// https://noobtuts.com/content/unity/2d-flappy-bird-game/obstacle.png
const Obstacles = ({
    obstaclesWidth,
    obstaclesHeight,
    obstaclesLeft,
    gap,
    randomBottom,
}) => {
    // const obstaclesWidth = 60;
    // const obstaclesHeight = 300;
    // const gap = 50;

    return (
        <>
            <View style={{

                position: 'absolute',
                backgroundColor: 'green',
                width: obstaclesWidth,
                height: obstaclesHeight,
                left: obstaclesLeft,
                bottom: randomBottom + obstaclesHeight + gap,
            }}>
                {/* <ImageBackground source=
                    {{ uri: 'https://noobtuts.com/content/unity/2d-flappy-bird-game/obstacle.png' }}
                    resizeMode="cover" style={styles.image}>
                </ImageBackground> */}
            </View>
            <View style={{

                position: 'absolute',
                backgroundColor: 'green',
                width: obstaclesWidth,
                height: obstaclesHeight,
                left: obstaclesLeft,
                bottom: randomBottom,
            }}>
                {/* <ImageBackground source=
                    {{ uri: 'https://noobtuts.com/content/unity/2d-flappy-bird-game/obstacle.png' }}
                    resizeMode="cover" style={styles.image}>
                </ImageBackground> */}
            </View>

        </>

    )
}

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//     },
//     image: {
//         flex: 1,
//         justifyContent: "center",
//         width: 60,
//         height: 300,
//     },
// });

export default Obstacles;