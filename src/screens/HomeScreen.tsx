import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

function HomeScreen({ navigation }: any): React.JSX.Element {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Home Screen</Text>
      <Button
        title="Go to Appointments"
        onPress={() => navigation.navigate('Appointments')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default HomeScreen;