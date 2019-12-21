import { Dimensions } from "react-native"

const { width }: { width: number } = Dimensions.get("screen")

export const boardWidth = width * 0.95
export const boardHeight = boardWidth
export const tileWidth = boardWidth / 8
export const tileHeight = boardHeight / 8
