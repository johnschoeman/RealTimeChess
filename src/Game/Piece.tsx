import React from "react"
import { View, StyleSheet } from "react-native"

import { Piece as PieceType } from "../utils/pieces"

const Piece = ({ piece }: { piece: PieceType }) => (
  <View style={styles.container}>
    <View style={[styles.piece, piece.style]} />
  </View>
)

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