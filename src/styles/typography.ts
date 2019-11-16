import { TextStyle } from "react-native"

import * as Colors from "./colors"

export const baseFontSize = 12
export const largeFontSize = 24
export const countFontSize = 180

export const heavyFontWeight = "600"
export const heaviestFontWeight = "900"

export const helvetica = "Helvetica-Bold"
const baseFont = helvetica

export const smallWhiteBold: TextStyle = {
  color: Colors.white,
  fontSize: baseFontSize,
  fontWeight: heaviestFontWeight,
}

export const smallWhite: TextStyle = {
  color: Colors.white,
  fontSize: baseFontSize,
}

export const largeWhite: TextStyle = {
  color: Colors.white,
  fontSize: largeFontSize,
  fontWeight: heaviestFontWeight,
}

export const landing: TextStyle = {
  color: Colors.white,
  fontSize: largeFontSize,
  paddingBottom: 12,
  fontFamily: baseFont,
}

export const mainButton: TextStyle = {
  color: Colors.black,
  fontSize: baseFontSize,
  fontFamily: baseFont,
}

export const header: TextStyle = {
  color: Colors.white,
  fontSize: largeFontSize,
}

export const darkHeader: TextStyle = {
  color: Colors.black,
  fontSize: largeFontSize,
}

export const label: TextStyle = {
  color: Colors.black,
  fontSize: baseFontSize,
}
