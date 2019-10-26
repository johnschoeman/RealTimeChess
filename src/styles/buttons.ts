import { ViewStyle } from "react-native"

import * as Colors from "./colors"
import * as Spacing from "./spacing"

const base: ViewStyle = {
  alignItems: "center",
  justifyContent: "center",
}

const large: ViewStyle = {
  maxHeight: 60,
  padding: 10,
}

const rounded: ViewStyle = {
  borderRadius: 30,
}

export const largeRounded: ViewStyle = {
  ...base,
  ...large,
  ...rounded,
}

export const primaryContainer: ViewStyle = {
  backgroundColor: Colors.white,
  height: Spacing.huge,
  borderRadius: Spacing.huge / 2,
  padding: Spacing.base,
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
  borderRadius: Spacing.huge / 2,
  elevation: 8,
  borderWidth: 1,
  backgroundColor: Colors.white,
  borderColor: Colors.darkGray,
}
