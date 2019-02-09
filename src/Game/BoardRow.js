import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

import { Color, Spacing, Layout } from '../styles'

const BoardRow = ({ row, rowIndex }) => {
  let color
  let piece
  return (
    <View style={styles.container}>
      {row.map((piece, colIndex) => {
        color = (rowIndex + colIndex) % 2 === 0 ? Color.white : Color.black
        return (
          <View
            style={[styles.column, { backgroundColor: color }]}
            key={`col-${colIndex}`}
          >
            <Text>{piece.text}</Text>
          </View>
        )
      })}
    </View>
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
})

export default BoardRow
