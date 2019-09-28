import { ViewStyle } from "react-native"

import * as Colors from "./color"

export const black: ViewStyle = {
  borderColor: Colors.pieceBorder,
  backgroundColor: Colors.blackPiece,
}

export const white: ViewStyle = {
  borderColor: Colors.pieceBorder,
  backgroundColor: Colors.whitePiece,
}

export const empty: ViewStyle = {}

export const pawn: ViewStyle = {
  borderWidth: 2,
  borderRadius: 15,
  width: 20,
  maxHeight: 20,
}

export const knight: ViewStyle = {
  borderWidth: 2,
  borderRadius: 6,
  width: 20,
}

export const bishop: ViewStyle = {
  width: 15,
  maxHeight: 25,
  borderWidth: 2,
  transform: [{ skewX: "135deg" }],
}

export const rook: ViewStyle = {
  borderWidth: 2,
  width: 25,
  height: 30,
}

export const queen: ViewStyle = {
  borderWidth: 2,
  transform: [{ rotate: "45deg" }],
  width: 25,
  maxHeight: 25,
}

export const king: ViewStyle = {
  borderWidth: 2,
  width: 25,
  maxHeight: 25,
}
