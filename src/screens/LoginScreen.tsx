import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

function LoginScreen({ navigation }: any): React.JSX.Element {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Please enter valid credentials');
      return;
    }

    setIsLoading(true);

    try {
      // Send the login request to the backend API using axios
      const response = await axios.post('http://159.223.175.64:3002/login', {
        email: email,
        password: password,
      });

      // Assuming the backend returns a token
      const data = response.data;

      if (response.status === 200 && data.token) {
        // Save the token to AsyncStorage or a global state (e.g., context, redux)
        // For now, just logging the token
        console.log('Authentication Token:', data.token);
        await AsyncStorage.setItem('authToken', data.token);

        // Redirect to Home screen after successful login
        navigation.replace('Home');
      } else {
        Alert.alert('Invalid credentials, please try again.');
      }
    } catch (error: any) {
      if (error.response) {
        // Backend returned an error response
        Alert.alert('Login failed', error.response.data.message || 'Something went wrong!');
      } else {
        // No response received or network error
        Alert.alert('Error', 'An error occurred while logging in. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Login</Text>
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
      <Button
        title={isLoading ? 'Logging in...' : 'Login'}
        onPress={handleLogin}
        disabled={isLoading}
      />
      <Text style={styles.switchScreenText}>
        Don't have an account?{' '}
        <Text onPress={() => navigation.navigate('Register')} style={styles.switchScreenLink}>
          Register here
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

export default LoginScreen;