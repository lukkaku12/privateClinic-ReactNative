import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

function RegisterScreen({ navigation }: any): React.JSX.Element {
  const [completeName, setCompleteName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [role, setRole] = useState<string>(''); // Optional field
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleRegister = async () => {
    if (!completeName || !email || !password) {
      Alert.alert('Please fill out all required fields');
      return;
    }

    setIsLoading(true);

    try {
      // Prepare the payload
      const payload: Record<string, string> = {
        completeName,
        email,
        password,
      };
      if (role) {
        payload.role = role; // Include role if provided
      }

      // Send the registration request to the backend
      const response = await axios.post('http://159.223.175.64:3002/users', payload);

      if (response.status === 201) {
        // Registration successful, redirect to Login screen
        Alert.alert('Registration Successful', 'Please log in now.');
        navigation.replace('Login');
      } else {
        // Handle unexpected status
        Alert.alert('Registration Failed', 'Something went wrong, please try again.');
      }
    } catch (error: any) {
      if (error.response) {
        // Backend returned an error response
        Alert.alert('Registration Error', error.response.data.message || 'Something went wrong!');
      } else {
        // No response received or network error
        Alert.alert('Error', 'An error occurred while registering. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Register</Text>
      <TextInput
        style={styles.input}
        placeholder="Complete Name"
        value={completeName}
        onChangeText={setCompleteName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Role (optional, e.g., patient)"
        value={role}
        onChangeText={setRole}
      />
      <Button
        title={isLoading ? 'Registering...' : 'Register'}
        onPress={handleRegister}
        disabled={isLoading}
      />
      <Text style={styles.switchScreenText}>
        Already have an account?{' '}
        <Text onPress={() => navigation.navigate('Login')} style={styles.switchScreenLink}>
          Login here
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  switchScreenText: {
    marginTop: 20,
    textAlign: 'center',
  },
  switchScreenLink: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
});

export default RegisterScreen;