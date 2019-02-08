import React from 'react'
import { View } from 'react-native'
import { createStackNavigator, createAppContainer } from 'react-navigation'

import LandingScreen from './Landing'
import GameScreen from './Game'

const AppNavigator = createStackNavigator(
  {
    Landing: LandingScreen,
    Game: GameScreen,
  },
  {
    initialRouteName: 'Landing',
    headerMode: 'none',
    defaultNavigationOptions: {
      gesturesEnabled: false,
    },
  }
)

const AppNavigatorContainer = createAppContainer(AppNavigator)

export default AppNavigatorContainer
