import React from "react"
import { View, StyleSheet, Image, ImageSourcePropType } from "react-native"

import { Pieces } from "../utils"

const blackPawn = require("../assets/BlackPawn.png")
const whitePawn = require("../assets/WhitePawn.png")
const blackKnight = require("../assets/BlackKnight.png")
const whiteKnight = require("../assets/WhiteKnight.png")
const blackBishop = require("../assets/BlackBishop.png")
const whiteBishop = require("../assets/WhiteBishop.png")
const blackRook = require("../assets/BlackRook.png")
const whiteRook = require("../assets/WhiteRook.png")
const blackQueen = require("../assets/BlackQueen.png")
const whiteQueen = require("../assets/WhiteQueen.png")
const blackKing = require("../assets/BlackKing.png")
const whiteKing = require("../assets/WhiteKing.png")

interface PieceProps {
  piece: Pieces.PieceInterface
  testID?: string
}

const Piece = ({ piece, testID }: PieceProps) => (
  <View style={styles.container} testID={testID}>
    {piece.fenCode === "0" ? null : <Image source={pieceImageSource(piece)} />}
  </View>
)

type PieceFlags = { [P in Pieces.FenCode]: ImageSourcePropType }

const pieceImageSource = (piece: Pieces.PieceType): ImageSourcePropType => {
  const styleMap: PieceFlags = {
    "0": blackPawn,
    r: blackRook,
    n: blackKnight,
    b: blackBishop,
    q: blackQueen,
    k: blackKing,
    p: blackPawn,
    R: whiteRook,
    N: whiteKnight,
    B: whiteBishop,
    Q: whiteQueen,
    K: whiteKing,
    P: whitePawn,
  }
  return styleMap[piece.fenCode]
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
