import React from 'react';
import { View } from 'react-native';

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
            </View>
            <View style={{

                position: 'absolute',
                backgroundColor: 'green',
                width: obstaclesWidth,
                height: obstaclesHeight,
                left: obstaclesLeft,
                bottom: randomBottom,
            }}>
            </View>
            
        </>

    )
}

export default Obstacles;