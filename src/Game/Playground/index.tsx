import React, { useState, useContext } from "react"
import { View, StyleSheet, TouchableOpacity, Text } from "react-native"

import Board from "../Board"
import GameContainer from "../GameContainer"
import PlaygroundContext, { PlaygroundProvider } from "./PlaygroundContext"
import Piece from "../Piece"
import Snappable from "./Snappable"
import { pawn } from "../../utils/pieces"

import { Typography, Colors } from "../../styles"

const PlaygroundGame = () => {
  const {
    board,
    userSelectedTile,
    computerSelectedTile,
    selectUserTile,
  } = useContext(PlaygroundContext)

  const [pieceOnLeft, setPieceOnLeft] = useState<boolean>(true)

  return (
    <View>
      <Board
        board={board}
        userSelectedTile={userSelectedTile}
        computerSelectedTile={computerSelectedTile}
        selectUserTile={selectUserTile}
      />

      <View style={styles.container}>
        <Piece piece={new pawn("b")} />
      </View>
    </View>
  )
}

const ThreeKings = () => {
  return (
    <PlaygroundProvider>
      <GameContainer title={"Playground"}>
        <PlaygroundGame />
      </GameContainer>
    </PlaygroundProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: "red",
    backgroundColor: Colors.white,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  square: {
    borderWidth: 1,
    borderColor: "blue",
    width: 44,
    height: 44,
  },
})

export default ThreeKings
