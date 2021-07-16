import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableWithoutFeedback } from 'react-native';
import Bird from './components/Bird.jsx';
import Obstacles from './components/Obstacles.jsx';

// permissions

import * as Permissions from 'expo-permissions';
import * as Contacts from 'expo-contacts';

export default function App() {


  // Ask for permission

  const [contacts, setContacts] = useState([]);
  const [permissions, setPermissions] = useState(false);

  const getPermissions = async () => {
    const { status } = await Permissions.askAsync(Permissions.CONTACTS);
    setPermissions(true);
  };

  const showContacts = async () => {
    const contactList = await Contacts.getContactsAsync();
    setContacts(contactList.data);
  };


  const phoneScreenWidth = Dimensions.get('screen').width;
  const phoneScreenHeight = Dimensions.get('screen').height;

  const birdLeft = phoneScreenWidth / 2;
  const [birdBottom, setBirdBottom] = useState(phoneScreenHeight / 2);
  const [obstaclesLeft, setObstacles] = useState(phoneScreenWidth);
  const [obstaclesLeftTwo, setObstaclesTwo] = useState(phoneScreenWidth + phoneScreenWidth / 2 + 30);
  const [gap, setGap] = useState(150);
  const [randomObsticalesBottom, setRandomObsticalesBottom] = useState(Math.random() * 100);
  const [randomObsticalesBottomTwo, setRandomObsticalesBottomTwo] = useState(Math.random() * 100);

  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);

  const gameGravity = 3;

  let gameTimerId;
  let obstaclesTimerId;
  let obstaclesTimerIdTwo;


  const obstaclesWidth = 60;
  const obstaclesHeight = 250;
  // let gap = 200;

  // console.log(phoneScreenWidth);
  // console.log(phoneScreenHeight);

  // Ask Permission

  useEffect( () => {
    getPermissions();
  }, []);

  // Update bird falling

  useEffect(() => {
    if (birdBottom > 0) {
      gameTimerId = setInterval(() => {
        setBirdBottom(birdBottom => birdBottom - gameGravity);
      }, 30)

      return () => {
        clearInterval(gameTimerId)
      }
    }
  }, [birdBottom])

  const jump = () => {
    if (!isGameOver && (birdBottom < phoneScreenHeight)) {
      setBirdBottom(birdBottom => birdBottom + 50)
      // console.log('jumped')
    }
  }

  // Update first obstacle

  useEffect(() => {
    if (obstaclesLeft > - obstaclesWidth) {
      obstaclesTimerId = setInterval(() => {
        setObstacles(obstaclesLeft => obstaclesLeft - 5);
      }, 30)
      return () => {
        clearInterval(obstaclesTimerId);
      }
    } else {
      setScore(score => score + 1)
      setObstacles(phoneScreenWidth);
      // setGap(gap => Math.floor(Math.random() * (200 - 70 + 1) + 70));
      setRandomObsticalesBottom(- Math.random() * 100);
    }
  }, [obstaclesLeft])

  // Update second obstacle

  useEffect(() => {
    if (obstaclesLeftTwo > - obstaclesWidth) {
      obstaclesTimerIdTwo = setInterval(() => {
        setObstaclesTwo(obstaclesLeftTwo => obstaclesLeftTwo - 5);
      }, 30)
      return () => {
        clearInterval(obstaclesTimerIdTwo);
      }
    } else {
      setScore(score => score + 1)
      setObstaclesTwo(phoneScreenWidth);
      setRandomObsticalesBottomTwo(- Math.random() * 100);
    }
  }, [obstaclesLeftTwo])


  // Checking collisions

  useEffect(() => {
    // console.log(obstaclesLeft)
    // console.log(phoneScreenWidth/2)
    // console.log(obstaclesLeft > phoneScreenWidth/2)
    if (
      ((birdBottom < (randomObsticalesBottom + obstaclesHeight + 30) ||
        birdBottom > (randomObsticalesBottom + obstaclesHeight + gap - 30)) &&
        (obstaclesLeft > phoneScreenWidth / 2 - 30 && obstaclesLeft < phoneScreenWidth / 2 + 30)
      )
      ||
      ((birdBottom < (randomObsticalesBottomTwo + obstaclesHeight + 30) ||
        birdBottom > (randomObsticalesBottomTwo + obstaclesHeight + gap - 30)) &&
        (obstaclesLeftTwo > phoneScreenWidth / 2 - 30 && obstaclesLeftTwo < phoneScreenWidth / 2 + 30)
      )
    ) {
      // console.log('game over')
      gameOver()
    }
  })

  const gameOver = () => {
    clearInterval(gameTimerId)
    clearInterval(obstaclesTimerId)
    clearInterval(obstaclesTimerIdTwo)
    setIsGameOver(true)
  }

  // console.log(birdBottom);
  // console.log('gap', gap);

  return (
    <TouchableWithoutFeedback onPress={jump}>
      <View style={styles.container}>
        {isGameOver && <Text style={{ fontSize: '30px' }}>{score}</Text>}

        <Bird
          birdBottom={birdBottom}
          birdLeft={birdLeft}
        />
        <Obstacles
          obstaclesWidth={obstaclesWidth}
          obstaclesHeight={obstaclesHeight}
          obstaclesLeft={obstaclesLeft}
          randomBottom={randomObsticalesBottom}
          gap={gap}
        />
        <Obstacles
          obstaclesWidth={obstaclesWidth}
          obstaclesHeight={obstaclesHeight}
          obstaclesLeft={obstaclesLeftTwo}
          randomBottom={randomObsticalesBottomTwo}
          gap={gap}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
