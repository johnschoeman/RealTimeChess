import React from 'react'
import { View, Image, StyleSheet } from 'react-native'

const Piece = ({ piece }) => {
  const component = getPieceComponent(piece)

  return <View style={styles.container}>{component}</View>
}

const getPieceComponent = piece => {
  let component
  if (piece.isPiece) {
    if (piece.color === 'black') {
      component = (
        <Image source={require('../../assets/images/BlackPawn.png')} />
      )
    } else {
      component = (
        <Image source={require('../../assets/images/WhitePawn.png')} />
      )
    }
  } else {
    component = <View />
  }
  return component
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    width: '100%',
  },
})

export default Piece
