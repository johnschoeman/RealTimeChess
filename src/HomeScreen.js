import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const HomeScreen = () => (
  <View style={styles.container}>
    <Text>Welcome To RealTimeChess</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
});

export default HomeScreen;
