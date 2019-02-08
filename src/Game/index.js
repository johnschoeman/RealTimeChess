import React from 'react'
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native'

import { GameConsumer } from '../GameContext'

import { Colors } from '../styles'

const GameScreen = ({ navigation }) => (
  <GameConsumer>
    {({ count, incrementCount, resetState }) => (
      <View style={styles.container}>
        <Text>GameScreen</Text>

        <Text>Number of Snakes: {count}</Text>
        <TouchableOpacity onPress={() => incrementCount()}>
          <Text>More Snakes!</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => resetState()}>
          <Text>No Snakes :(</Text>
        </TouchableOpacity>

        <TouchableOpacity
          title="Reset"
          onPress={() => navigation.navigate('Landing')}
        >
          <Text>Go Back</Text>
        </TouchableOpacity>
      </View>
    )}
  </GameConsumer>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
  },
})

export default GameScreen
