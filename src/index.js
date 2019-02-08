import React from 'react'
import { View, Text } from 'react-native'

import { GameProvider } from './GameContext'
import AppNavigatorContainer from './AppNavigatorContainer'

const RealTimeChess = () => {
  return (
    <View style={{ flex: 1 }}>
      <GameProvider>
        <AppNavigatorContainer />
      </GameProvider>
    </View>
  )
}

export default RealTimeChess
