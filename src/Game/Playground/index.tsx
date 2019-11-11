import React, { useState, useContext } from "react"
import {
  Animated,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native"

import Board from "../Board"
import GameContainer from "../GameContainer"
import PlaygroundContext, { PlaygroundProvider } from "./PlaygroundContext"
import Piece from "../Piece"
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

  const handleOnPress = () => {
    setPieceOnLeft(!pieceOnLeft)
    Animated.timing(new Animated.Value(0), {
      toValue: 1,
      duration: 2000,
    }).start()
  }

  return (
    <View>
      <Board
        board={board}
        userSelectedTile={userSelectedTile}
        computerSelectedTile={computerSelectedTile}
        selectUserTile={selectUserTile}
      />
      <TouchableOpacity onPress={handleOnPress}>
        <Text style={Typography.header}>Move</Text>
      </TouchableOpacity>

      <Animated.View style={styles.container}>
        <View style={styles.square}>
          {pieceOnLeft ? <Piece piece={new pawn("b")} /> : null}
        </View>
        <View style={styles.square}>
          {!pieceOnLeft ? <Piece piece={new pawn("b")} /> : null}
        </View>
      </Animated.View>
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
