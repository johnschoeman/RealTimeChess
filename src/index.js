import React from 'react'
import { SafeAreaView, Text } from 'react-native'

import { GameProvider } from './GameContext'
import AppNavigatorContainer from './AppNavigatorContainer'

const RealTimeChess = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <GameProvider>
        <AppNavigatorContainer />
      </GameProvider>
    </SafeAreaView>
  )
}

export default RealTimeChess
