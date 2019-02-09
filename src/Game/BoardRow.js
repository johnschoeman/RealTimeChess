import React from 'react'
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native'

import { GameConsumer } from '../GameContext'

import { Color, Spacing, Layout } from '../styles'

const BoardRow = ({ row, rowIdx }) => {
  return (
    <GameConsumer>
      {({
        selectTile,
        selectedTile: { rowIdx: selectedRowIdx, colIdx: selectedColIdx },
      }) => {
        return (
          <View style={styles.container}>
            {row.map((piece, colIdx) => {
              let tileStyle = createTileStyle(rowIdx, colIdx)
              let selectedStyle = createSelectedStyle(
                rowIdx,
                colIdx,
                selectedRowIdx,
                selectedColIdx
              )
              return (
                <TouchableOpacity
                  onPress={() => selectTile(rowIdx, colIdx)}
                  style={[styles.tile, tileStyle, selectedStyle]}
                  key={`col-${colIdx}`}
                >
                  <View style={[styles.piece, piece.style]} />
                </TouchableOpacity>
              )
            })}
          </View>
        )
      }}
    </GameConsumer>
  )
}

function createTileStyle(rowIdx, colIdx) {
  const tileColor = (rowIdx + colIdx) % 2 === 0 ? Color.white : Color.black
  return { backgroundColor: tileColor, borderColor: tileColor }
}

function createSelectedStyle(rowIdx, colIdx, selectedRowIdx, selectedColIdx) {
  return rowIdx === selectedRowIdx && colIdx === selectedColIdx
    ? { borderColor: Color.selectedTile }
    : {}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    height: '100%',
  },
  tile: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
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
