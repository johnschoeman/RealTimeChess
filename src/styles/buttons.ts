import { ViewStyle } from "react-native"

import * as Color from "./color"

const base: ViewStyle = {
  alignItems: "center",
  justifyContent: "center",
}

const large: ViewStyle = {
  maxHeight: 60,
  padding: 10,
}

const rounded: ViewStyle = {
  borderRadius: 20,
}

export const largeRounded: ViewStyle = {
  ...base,
  ...large,
  ...rounded,
}

export const startGame: ViewStyle = {
  ...largeRounded,
  backgroundColor: Color.white,
  borderWidth: 4,
  borderColor: Color.white,
}
