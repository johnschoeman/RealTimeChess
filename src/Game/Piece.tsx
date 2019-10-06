import React from "react"
import { View, StyleSheet, ViewStyle } from "react-native"

import { Pieces } from "../utils"
import { Pieces as PieceStyles } from "../styles"

interface PieceProps {
  piece: Pieces.PieceInterface
  testID?: string
}

const Piece = ({ piece, testID }: PieceProps) => (
  <View style={styles.container} testID={testID}>
    <View style={[styles.piece, ...pieceStyle(piece)]} />
  </View>
)

type PieceFlags = { [P in Pieces.FenCode]: ViewStyle[] }

const pieceStyle = (piece: Pieces.PieceType): ViewStyle[] => {
  const styleMap: PieceFlags = {
    "0": [PieceStyles.empty],
    r: [PieceStyles.rook, PieceStyles.black],
    n: [PieceStyles.knight, PieceStyles.black],
    b: [PieceStyles.bishop, PieceStyles.black],
    q: [PieceStyles.queen, PieceStyles.black],
    k: [PieceStyles.king, PieceStyles.black],
    p: [PieceStyles.pawn, PieceStyles.black],
    R: [PieceStyles.rook, PieceStyles.white],
    N: [PieceStyles.knight, PieceStyles.white],
    B: [PieceStyles.bishop, PieceStyles.white],
    Q: [PieceStyles.queen, PieceStyles.white],
    K: [PieceStyles.king, PieceStyles.white],
    P: [PieceStyles.pawn, PieceStyles.white],
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
