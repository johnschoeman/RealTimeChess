import React from "react"
import { View, StyleSheet, Image, ImageSourcePropType } from "react-native"

import { FenId } from "../utils/chess/types"
import { Pieces } from "../utils"

import { Images } from "../assets"

interface PieceProps {
  piece: Pieces.PieceInterface
  testID?: string
}

const Piece = ({ piece, testID }: PieceProps) => (
  <View style={styles.container} testID={testID}>
    {piece.fenId === "0" ? null : <Image source={pieceImageSource(piece)} />}
  </View>
)

type PieceFlags = { [P in FenId]: ImageSourcePropType }

const pieceImageSource = (piece: Pieces.PieceType): ImageSourcePropType => {
  const styleMap: PieceFlags = {
    "0": Images.BlackPawn,
    r: Images.BlackRook,
    n: Images.BlackKnight,
    b: Images.BlackBishop,
    q: Images.BlackQueen,
    k: Images.BlackKing,
    p: Images.BlackPawn,
    R: Images.WhiteRook,
    N: Images.WhiteKnight,
    B: Images.WhiteBishop,
    Q: Images.WhiteQueen,
    K: Images.WhiteKing,
    P: Images.WhitePawn,
  }
  return styleMap[piece.fenId]
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
    flex: 1,
    maxHeight: 30,
    maxWidth: 30,
  },
})

export default Piece
