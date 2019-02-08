import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

import BoardRow from './BoardRow'
import { GameConsumer } from '../GameContext'

import { Color, Spacing, Layout } from '../styles'

const Board = () => (
  <GameConsumer>
    {({ board }) => {
      return (
        <View style={styles.container}>
          {board.map((row, rowIndex) => {
            return (
              <View style={styles.row} key={`row-${rowIndex}`}>
                <BoardRow row={row} rowIndex={rowIndex} />
              </View>
            )
          })}
        </View>
      )
    }}
  </GameConsumer>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  row: {
    flex: 1,
  },
})

export default Board
