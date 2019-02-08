import React from 'react'
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native'

import Board from './Board'
import { GameConsumer } from '../GameContext'

import { Color } from '../styles'

const GameScreen = ({ navigation }) => (
  <GameConsumer>
    {({ movePiece, resetBoard }) => (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text>GameScreen</Text>
        </View>

        <View style={styles.board}>
          <Board />
        </View>
        <View style={styles.footer}>
          <TouchableOpacity onPress={() => movePiece(1, 1, 5, 1)}>
            <Text>Move Piece</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => resetBoard()}>
            <Text>Reset Board</Text>
          </TouchableOpacity>

          <TouchableOpacity
            title="Reset"
            onPress={() => navigation.navigate('Landing')}
          >
            <Text>Go Back</Text>
          </TouchableOpacity>
        </View>
      </View>
    )}
  </GameConsumer>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: Color.background,
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  board: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
})

export default GameScreen
