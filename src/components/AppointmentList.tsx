import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

type Appointment = {
  appointmentId: number;
  reason: string;
  doctor: string;
  patient: string;
  created_at: string;
};

type AppointmentListProps = {
  appointments: Appointment[];
};

function AppointmentList({ appointments }: AppointmentListProps): React.JSX.Element {
  const renderItem = ({ item }: { item: Appointment }) => (
    <View style={styles.appointmentContainer}>
      <Text style={styles.appointmentText}>Reason: {item.reason}</Text>
      <Text style={styles.appointmentText}>Doctor: {item.doctor}</Text>
      <Text style={styles.appointmentText}>Patient: {item.patient}</Text>
      <Text style={styles.appointmentText}>Created At: {item.created_at}</Text>
    </View>
  );

  return (
    <FlatList
      data={appointments}
      renderItem={renderItem}
      keyExtractor={(item) => item.appointmentId.toString()}
    />
  );
}

const styles = StyleSheet.create({
  appointmentContainer: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  appointmentText: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default AppointmentList;