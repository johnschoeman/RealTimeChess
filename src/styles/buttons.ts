import { ViewStyle } from "react-native"

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
