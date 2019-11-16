import { ViewStyle } from "react-native"

import * as Colors from "./colors"
import * as Spacing from "./spacing"

const base: ViewStyle = {
  alignItems: "center",
  justifyContent: "center",
}

const small: ViewStyle = {
  padding: 4,
  width: "80%",
}

const large: ViewStyle = {
  maxHeight: 60,
  padding: 10,
}

const square: ViewStyle = {
  borderRadius: 2,
}

const rounded: ViewStyle = {
  borderRadius: 30,
}

const red: ViewStyle = {
  backgroundColor: Colors.red,
}

export const largeRounded: ViewStyle = {
  ...base,
  ...large,
  ...rounded,
}

export const smallSquareRed: ViewStyle = {
  ...base,
  ...small,
  ...square,
  ...red,
}

export const largeBlueBorder: ViewStyle = {
  ...base,
  ...large,
  ...rounded,
  borderWidth: 1,
  borderColor: Colors.blue,
  backgroundColor: Colors.transparentFull,
}

export const primaryContainer: ViewStyle = {
  backgroundColor: Colors.white,
  height: Spacing.xxLarge,
  borderRadius: Spacing.large,
  padding: Spacing.xSmall,
}

export const primary: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  shadowColor: Colors.black,
  shadowOffset: {
    width: 0,
    height: 0,
  },
  shadowOpacity: 0.5,
  shadowRadius: 2.5,
  borderRadius: Spacing.large,
  elevation: 8,
  borderWidth: 1,
  backgroundColor: Colors.white,
  borderColor: Colors.darkGray,
}
