import React, { useState } from "react"
import { Animated, Easing, StyleSheet, Image } from "react-native"

import { Piece as PieceType, Empty } from "../utils/chess/chess"

import { Images } from "../assets"

interface PieceProps {
  piece: PieceType | Empty
  isSelected?: boolean
  testID?: string
}

const Piece = ({ piece, isSelected = false, testID }: PieceProps) => {
  const [scaleValue] = useState<Animated.Value>(new Animated.Value(1))

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

  const scaleStyle = {
    transform: [{ scale: scaleValue }],
  }

  return (
    <Animated.View
      style={{ ...styles.container, ...scaleStyle }}
      testID={testID}
    >
      {piece.kind !== "empty" ? (
        <Image source={selectImageSource(piece)} />
      ) : null}
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
})

export default Piece
