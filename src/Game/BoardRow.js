import React from 'react'
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native'

import { GameConsumer } from '../GameContext'

import { Color, Spacing, Layout } from '../styles'

const BoardRow = ({ row, rowIdx }) => {
  let color
  let piece
  return (
    <GameConsumer>
    {({ selectTile }) => {
      return (
    <View style={styles.container}>
      {row.map((piece, colIdx) => {
        color = (rowIdx + colIdx) % 2 === 0 ? Color.white : Color.black
        return (
          <View
            style={[styles.column, { backgroundColor: color }]}
            key={`col-${colIdx}`}
          >
          <TouchableOpacity onPress={() => selectTile(rowIdx, colIdx)}>
            <View style={[styles.piece, piece.style]} />
          </TouchableOpacity>
          </View>
        )
      })}
    </View>
    )}}</GameConsumer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    height: '100%',
  },
  column: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  piece: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    maxHeight: 30,
    width: 30,
  },
})

export default BoardRow
