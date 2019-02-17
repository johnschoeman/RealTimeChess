import React from 'react'
import { View, Image, StyleSheet } from 'react-native'

const Piece = ({piece}) => {
  let component
  if (piece.isPiece) {
    component = <Image source={require('../../assets/images/BlackPawn.png')}/>
  } else {
    component = <View/>
  }

  return (
    <View style={styles.container}>
      {component}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    width: '100%',
  }
})

export default Piece