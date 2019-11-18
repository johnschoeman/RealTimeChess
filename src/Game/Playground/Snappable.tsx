import React, { useState } from "react"
import { View, Text, StyleSheet } from "react-native"
import {
  PanGestureHandler,
  State,
  PanGestureHandlerGestureEvent,
  PanGestureHandlerStateChangeEvent,
  TouchableOpacity,
} from "react-native-gesture-handler"
import Animated from "react-native-reanimated"

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

function runSpring(
  clock: Animated.Clock,
  value: Animated.Value<number>,
  velocity: Animated.Value<number>,
  dest: Animated.Node<number | number>
) {
  const state = {
    finished: new Value(0),
    velocity: new Value(0),
    position: new Value(0),
    time: new Value(0),
  }

  const config = {
    damping: 7,
    mass: 1,
    stiffness: 121.6,
    overshootClamping: false,
    restSpeedThreshold: 0.001,
    restDisplacementThreshold: 0.001,
    toValue: new Value(0),
  }

  return [
    cond(clockRunning(clock), 100, [
      set(state.finished, 0),
      set(state.velocity, velocity),
      set(state.position, value),
      set(config.toValue, dest),
      startClock(clock),
    ]),
    spring(clock, state, config),
    cond(state.finished, stopClock(clock)),
    state.position,
  ]
}

interface SnappableProps {
  children: JSX.Element
}

const Snappable = ({ children }: SnappableProps) => {
  const [offsetX, setOffsetX] = useState<number>(20)
  const [offsetY, setOffsetY] = useState<number>(10)
  Animated.useCode(() => set(transX, add(_transX, offsetX)), [offsetX])
  Animated.useCode(() => set(transY, add(_transY, offsetY)), [offsetY])
  const [foo, setFoo] = useState<number>(0)

  const dragX = new Value(0)
  const dragY = new Value(0)
  const state = new Value(-1)
  const dragVX = new Value(0)

  const transX = new Value<number>(offsetX - 50)
  const transY = new Value<number>(offsetY - 50)
  const prevDragX = new Value(0)
  const prevDragY = new Value(0)

  const clock = new Clock()

  const snapPointX = new Value(offsetX)
  const snapPointY = new Value(offsetY)

  const _transX = cond(
    eq(state, State.ACTIVE),
    [
      //   stopClock(clock),
      //   set(transX, add(transX, sub(dragX, prevDragX))),
      //   set(prevDragX, dragX),
      //   transX,
    ],
    [
      //   set(prevDragX, offsetX),
      set(
        transX,
        cond(defined(transX), runSpring(clock, transX, dragVX, snapPointX), 0)
      ),
    ]
  )

  const _transY = cond(
    eq(state, State.ACTIVE),
    [
      //   stopClock(clock),
      //   set(transY, add(transY, sub(dragY, prevDragY))),
      //   set(prevDragY, dragY),
      //   transY,
    ],
    [
      //   set(prevDragY, offsetY),
      set(
        transY,
        cond(defined(transY), runSpring(clock, transY, dragVX, snapPointY), 0)
      ),
    ]
  )

  const handleOnGestureEvent = (event: PanGestureHandlerGestureEvent) => {
    setFoo(foo + 1)
  }

  const handleOnHandlerStateChange = (
    event: PanGestureHandlerStateChangeEvent
  ) => {}

  const handleOnPress = () => {
    setOffsetX(offsetX + 50)
    setOffsetY(offsetY - 50)
  }

  return (
    <View>
      <TouchableOpacity onPress={handleOnPress}>
        <Text>Move</Text>
      </TouchableOpacity>

      <PanGestureHandler
        maxPointers={1}
        minDist={10}
        onGestureEvent={handleOnGestureEvent}
        onHandlerStateChange={handleOnGestureEvent}
      >
        <Animated.View
          style={{ transform: [{ translateX: _transX, translateY: _transY }] }}
        >
          {children}
          <View>
            <Text>{foo}</Text>
          </View>
        </Animated.View>
      </PanGestureHandler>
    </View>
  )
}

export default Snappable

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "blue",
  },
})
