import React from "react"
import { View, StyleSheet } from "react-native"
import { SvgProps } from "react-native-svg"

import { Piece as PieceType, Empty, FenId } from "../utils/chess/chess"

import { Icons } from "../assets"

interface PieceProps {
  piece: PieceType | Empty
  testID?: string
}

const Piece = ({ piece, testID }: PieceProps) => (
  <View style={styles.container} testID={testID}>
    {piece.kind === "empty"
      ? null
      : React.createElement(pieceIcon(piece as PieceType), styles.piece)}
  </View>
)

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
    width: 45,
    height: 45,
  },
})

export default Piece
