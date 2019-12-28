import React, { useState, useContext } from "react"
import {
  View,
  TouchableOpacity,
  Animated,
  Easing,
  StyleSheet,
  Image,
} from "react-native"

import { Piece as PieceType } from "../utils/chess/chess"
import { Tile as TileType, tilesAreEqual } from "../utils/game_helpers"
import UIContext from "./UIContext"
import { Tile } from "../utils/game_helpers"

import { Images } from "../assets"
import { Layout } from "../styles"

interface PieceProps {
  piece: PieceType
  tile: Tile
  isSelected: boolean
  selectUserTile: (tile: TileType) => void
  testID?: string
}

const Piece = ({
  piece,
  tile,
  isSelected,
  selectUserTile,
  testID,
}: PieceProps) => {
  const { movingPieces, finishMovingPiece } = useContext(UIContext)
  const [scaleValue] = useState<Animated.Value>(new Animated.Value(1))
  const { rowIdx, colIdx } = tile
  const xPos = colIdx * Layout.tileWidth
  const yPos = rowIdx * Layout.tileHeight
  const [transX] = useState<Animated.Value>(new Animated.Value(xPos))
  const [transY] = useState<Animated.Value>(new Animated.Value(yPos))

  movingPieces.forEach(({fromTile, toTile}) => {
    if (tilesAreEqual(fromTile, tile)) {
      const { rowIdx, colIdx } = toTile
      const x = colIdx * Layout.tileWidth
      const y = rowIdx * Layout.tileHeight
      Animated.timing(transX, {
        toValue: x,
        duration: 1000,
        easing: Easing.linear,
      }).start()
      Animated.timing(transY, {
        toValue: y,
        duration: 1000,
        easing: Easing.linear,
      }).start()
      finishMovingPiece(fromTile, toTile)
    }
  })

  if (isSelected) {
    Animated.timing(scaleValue, {
      toValue: 1.5,
      duration: 500,
      easing: Easing.bounce,
    }).start()
  } else {
    Animated.timing(scaleValue, {
      toValue: 1,
      duration: 500,
      easing: Easing.bounce,
    }).start()
  }

  const selectImageSource = (piece: PieceType) => {
    switch (piece.fenId) {
      case "p": {
        return Images.BlackPawn
      }
      case "r": {
        return Images.BlackRook
      }
      case "b": {
        return Images.BlackBishop
      }
      case "n": {
        return Images.BlackKnight
      }
      case "q": {
        return Images.BlackQueen
      }
      case "k": {
        return Images.BlackKing
      }
      case "P": {
        return Images.WhitePawn
      }
      case "R": {
        return Images.WhiteRook
      }
      case "B": {
        return Images.WhiteBishop
      }
      case "N": {
        return Images.WhiteKnight
      }
      case "Q": {
        return Images.WhiteQueen
      }
      case "K": {
        return Images.WhiteKing
      }
    }
  }

  const cooldownStyle = (piece: PieceType) => {
    const { cooldown } = piece
    const cooldownColor = (cooldown: number): string => {
      const base = cooldown / 10
      return `rgba(64, 95, 237, ${base})`
    }
    return cooldown && cooldown > 0
      ? { backgroundColor: cooldownColor(cooldown) }
      : null
  }

  const transformStyle = {
    transform: [
      { translateX: transX },
      { translateY: transY },
      { scale: scaleValue },
    ],
  }

  const handleOnPress = () => {
    selectUserTile(tile)
  }

  return (
    <Animated.View
      style={{ ...styles.container, ...transformStyle }}
      testID={testID}
    >
      <TouchableOpacity onPress={handleOnPress}>
        <View style={[styles.image, cooldownStyle(piece)]}>
          <Image source={selectImageSource(piece)} />
        </View>
      </TouchableOpacity>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
  },
  image: {
    justifyContent: "center",
    alignItems: "center",
    width: Layout.tileWidth,
    height: Layout.tileHeight,
  },
})

export default Piece
