import React from 'react'
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native'

import Piece from './Piece'
import { GameConsumer } from '../GameContext'

import { Color, Spacing, Layout } from '../styles'

const BoardRow = ({ row, rowIdx }) => {
  return (
    <GameConsumer>
      {({ selectUserTile, userSelectedTile, computerSelectedTile }) => {
        return (
          <View style={styles.container}>
            {row.map((piece, colIdx) => {
              let tile = { rowIdx, colIdx }
              let tileStyle = createTileStyle(tile)
              let userSelectedStyle = createSelectedStyle(
                tile,
                userSelectedTile,
                Color.userHighlight
              )
              let computerSelectedStyle = createSelectedStyle(
                tile,
                computerSelectedTile,
                Color.computerHighlight
              )

              return (
                <TouchableOpacity
                  onPress={() => selectUserTile(tile)}
                  style={[
                    styles.tile,
                    tileStyle,
                    userSelectedStyle,
                    computerSelectedStyle,
                  ]}
                  key={`col-${colIdx}`}
                >
                  <Piece piece={piece} />
                </TouchableOpacity>
              )
            })}
          </View>
        )
      }}
    </GameConsumer>
  )
}

function createTileStyle(tile) {
  const { rowIdx, colIdx } = tile
  const tileColor =
    (rowIdx + colIdx) % 2 === 0 ? Color.tileWhite : Color.tileBlack
  return { backgroundColor: tileColor, borderColor: tileColor }
}

function createSelectedStyle(tile, selectedTile, color) {
  const { rowIdx, colIdx } = tile
  const { rowIdx: selectedRowIdx, colIdx: selectedColIdx } = selectedTile
  return rowIdx === selectedRowIdx && colIdx === selectedColIdx
    ? { borderColor: color }
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
