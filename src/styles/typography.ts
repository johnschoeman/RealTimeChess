import { TextStyle } from "react-native"

import * as Color from "./color"

export const baseFontSize = 12
export const largeFontSize = 24
export const countFontSize = 180

export const heavyFontWeight = "600"

export const helvetica = "Helvetica-Bold"
const baseFont = helvetica

export const landing: TextStyle = {
  color: Color.white,
  fontSize: largeFontSize,
  paddingBottom: 12,
  fontFamily: baseFont,
}

export const mainButton: TextStyle = {
  color: Color.black,
  fontSize: largeFontSize,
  fontFamily: baseFont,
}

export const header: TextStyle = {
  color: Color.white,
}
