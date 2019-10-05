import { Dimensions } from "react-native"

const { width }: { width: number } = Dimensions.get("screen")

export const boardWidth = width * 0.95
export const boardHeight = boardWidth
