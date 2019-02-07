import React from 'react'
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native'

import { Colors } from '../styles'

const GameScreen = ({ navigation }) => (
  <View style={styles.container}>
    <Text>GameScreen</Text>
    <TouchableOpacity
      title="Reset"
      onPress={() => navigation.navigate('Landing')}
    >
      <Text>Reset</Text>
    </TouchableOpacity>
  </View>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
  },
})

export default GameScreen
