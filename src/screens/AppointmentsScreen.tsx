import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function AppointmentsScreen(): React.JSX.Element {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Appointments</Text>
      {/* You can add the logic to fetch and display appointments here */}
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

export default AppointmentsScreen;