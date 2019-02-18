import React from 'react'
import {
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
} from 'react-native'

import { Color, Buttons, Typography } from '../styles'

const WelcomeText = ({ children }) => (
  <Text style={Typography.landing}>{children}</Text>
)

const LandingScreen = ({ navigation }) => (
  <View style={styles.container}>
    <View style={styles.welcomeMessage}>
      <WelcomeText>Welcome To Real-Time Chess</WelcomeText>
      <WelcomeText>There are no turns</WelcomeText>
      <WelcomeText>Only Chess</WelcomeText>
    </View>

    <View style={styles.footer}>
      <TouchableOpacity
        title="Start"
        onPress={() => navigation.navigate('Game')}
        style={styles.button}
      >
        <Text style={Typography.mainButton}>Start Game</Text>
      </TouchableOpacity>
    </View>
  </View>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Color.black,
  },
  welcomeMessage: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    flex: 1,
    ...Buttons.startGame,
  },
})

export default LandingScreen
