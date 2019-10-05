import React from "react"
import { Image, StyleSheet, View } from "react-native"

import { Side } from "../utils/game_helpers"
import { Color, Spacing } from "../styles"

interface GameOverProps {
  winner: Side
}

const GameOver = ({ winner }: GameOverProps) => (
  <View style={styles.container} testID={"game-over"}>
    <View style={styles.imageContainer}>
      {winner === "black" ? (
        <Image
          source={require("../assets/YouLose.png")}
          testID={"game-over-lose"}
        />
      ) : (
        <Image
          source={require("../assets/YouWin.png")}
          testID={"game-over-win"}
        />
      )}
    </View>
  </View>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.background,
    paddingHorizontal: Spacing.medium,
    paddingBottom: Spacing.xLarge,
  },
  imageContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
})

export default GameOver
