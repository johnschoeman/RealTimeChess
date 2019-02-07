import React from 'react'
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native'

import { Colors } from '../styles'

const LandingScreen = ({ navigation }) => (
  <View style={styles.container}>
    <Text>Welcome To RealTimeChess</Text>
    <TouchableOpacity title="Start" onPress={() => navigation.navigate('Game')}>
      <Text>Start Game</Text>
    </TouchableOpacity>
  </View>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.background,
  },
})

export default LandingScreen
