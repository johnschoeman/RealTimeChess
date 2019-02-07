import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {Colors} from './styles';

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
    backgroundColor: Colors.background,
  },
});

export default HomeScreen;
