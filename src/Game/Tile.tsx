import React, { useState, useRef, useEffect } from "react"
import { TouchableOpacity, View, StyleSheet } from "react-native"
import Animated from "react-native-reanimated"
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  State,
} from "react-native-gesture-handler"

import Piece from "./Piece"
import { Piece as PieceType, Empty } from "../utils/chess/chess"
import { Tile as TileType } from "../utils/game_helpers"

import { Colors } from "../styles"

interface TileProps {
  tile: { rowIdx: number; colIdx: number }
  piece: PieceType | Empty
  selected: boolean
  onPress: () => void
}

const {
  set,
  cond,
  eq,
  add,
  multiply,
  lessThan,
  spring,
  startClock,
  stopClock,
  clockRunning,
  sub,
  defined,
  Value,
  Clock,
  event,
} = Animated

const Tile = ({ tile, piece, selected, onPress }: TileProps) => {
  const [x, setX] = useState<number | undefined>(undefined)
  const [y, setY] = useState<number | undefined>(undefined)
  const [state] = useState<Animated.Value<number>>(new Animated.Value(-1))
  const [transX] = useState<Animated.Value<number>>(new Animated.Value(1))
  const [transY] = useState<Animated.Value<number>>(new Animated.Value(1))

  const viewRef = useRef()

  const { rowIdx, colIdx } = tile

  const cooldownStyle = (piece: PieceType | Empty) => {
    const { isPiece, cooldown } = piece
    const cooldownColor = (cooldown: number): string => {
      const base = cooldown / 10
      return `rgba(64, 95, 237, ${base})`
    }

    return isPiece && cooldown && cooldown > 0
      ? { flex: 1, width: "100%", backgroundColor: cooldownColor(cooldown) }
      : null
  }

  const createTileStyle = (tile: TileType) => {
    const { rowIdx, colIdx } = tile
    const tileColor =
      (rowIdx + colIdx) % 2 === 0 ? Colors.tileWhite : Colors.tileBlack
    return { backgroundColor: tileColor, borderColor: tileColor }
  }

  const tileStyle = createTileStyle(tile)

  const handleOnGestureEvent = (event: PanGestureHandlerGestureEvent) => {
    const { x, y, absoluteX, absoluteY } = event.nativeEvent
    transX.setValue(x)
    transY.setValue(y)
  }

  const handleOnHandlerStateChange = () => {
    transX.setValue(
      cond(
        eq(state, State.ACTIVE),
        [],
        [set(transX, cond(defined(transX), 0, 0))]
      )
    )
    transY.setValue(
      cond(
        eq(state, State.ACTIVE),
        [],
        [set(transY, cond(defined(transY), 0, 0))]
      )
    )
  }

  useEffect(() => {
    const { current } = viewRef
    current.measure(
      (
        _fx: number,
        _fy: number,
        _width: number,
        _height: number,
        px: number,
        py: number
      ) => {
        setX(px)
        setY(py)
      }
    )
  }, [])

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.tile, tileStyle]}
      key={`tile-${rowIdx}-${colIdx}`}
    >
      <PanGestureHandler
        onGestureEvent={handleOnGestureEvent}
        onHandlerStateChange={handleOnHandlerStateChange}
      >
        <View key={`col-${colIdx}`} ref={viewRef}>
          <Animated.View
            style={{
              transform: [{ translateX: transX }, { translateY: transY }],
            }}
          >
            <Piece piece={piece} isSelected={selected} />
          </Animated.View>
        </View>
      </PanGestureHandler>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  tile: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 4,
  },
  piece: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    maxHeight: 30,
    width: 30,
  },
})

export default Tile
