import React from "react"
import { View, StyleSheet, ViewStyle } from "react-native"

import { Pieces } from "../utils"
import { Pieces as PieceStyles } from "../styles"

const Piece = ({ piece }: { piece: Pieces.PieceInterface }) => (
  <View style={styles.container}>
    <View style={[styles.piece, pieceStyle(piece), pieceColor(piece)]} />
  </View>
)

const pieceStyle = (piece: Pieces.PieceType): ViewStyle => {
  switch (piece.kind) {
    case "empty": {
      return PieceStyles.empty
    }
    case "pawn": {
      return PieceStyles.pawn
    }
    case "knight": {
      return PieceStyles.knight
    }
    case "bishop": {
      return PieceStyles.bishop
    }
    case "rook": {
      return PieceStyles.rook
    }
    case "queen": {
      return PieceStyles.queen
    }
    case "king": {
      return PieceStyles.king
    }
    default: {
      console.error(`Piece: ${piece} has unknown kind: ${piece.kind}`)
      return {}
    }
  }
}

const pieceColor = (piece: Pieces.PieceType): ViewStyle => {
  switch (piece.side) {
    case "black": {
      return PieceStyles.black
    }
    case "white": {
      return PieceStyles.white
    }
    default: {
      return {}
    }
  }
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
