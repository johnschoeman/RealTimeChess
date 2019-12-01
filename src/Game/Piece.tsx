import React, { useState, useEffect } from "react"
import { Animated, Easing, View, StyleSheet, ViewStyle } from "react-native"
import { Svg, SvgProps } from "react-native-svg"

import { Piece as PieceType, Empty, FenId } from "../utils/chess/chess"

import { Icons } from "../assets"

interface PieceProps {
  piece: PieceType | Empty
  animatedStyle?: ViewStyle
  testID?: string
}

const Piece = ({ piece, animatedStyle, testID }: PieceProps) => {
  const [animatedValue] = useState<Animated.Value>(new Animated.Value(30))

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: 50,
      duration: 3000,
      easing: Easing.bounce,
    }).start()
  })

  return (
    <Animated.View style={[styles.container, animatedStyle]} testID={testID}>
      {piece.kind === "empty" ? null : (
        /* : React.createElement(pieceIcon(piece as PieceType), styles.piece)} */
        /* <Icons.BlackRook width={"100%"} height={"100%"} viewBox={"0 0 60 60"} /> */
        <Svg width="100%" height="100%">
          {pieceIcon(piece)}
        </Svg>
      )}
    </Animated.View>
  )
}

type PieceFlags = { [P in FenId]: React.StatelessComponent<SvgProps> }

const pieceIcon = (piece: PieceType) => {
  const styleMap: PieceFlags = {
    r: Icons.BlackRook,
    n: Icons.BlackKnight,
    b: Icons.BlackBishop,
    q: Icons.BlackQueen,
    k: Icons.BlackKing,
    p: Icons.BlackPawn,
    R: Icons.WhiteRook,
    N: Icons.WhiteKnight,
    B: Icons.WhiteBishop,
    Q: Icons.WhiteQueen,
    K: Icons.WhiteKing,
    P: Icons.WhitePawn,
  }
  const icon = styleMap[piece.fenId]

  const AnimatedPiece = Animated.createAnimatedComponent(
    React.createElement(icon, styles.piece)
  )

  return AnimatedPiece
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  piece: {
    width: "100%",
    height: "100%",
  },
})

export default Piece
