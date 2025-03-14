import React, { useState } from 'react';
import { View, StyleSheet, Alert, ImageBackground } from 'react-native';
import { Text, TextInput, Button, ActivityIndicator } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';

// @ts-ignore
const SignUpScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter an email and password.');
      return;
    }

    setLoading(true);

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert('Success', 'Account created successfully!');
      navigation.navigate('Home'); // Navigate after signup
    } catch (err) {
      // @ts-ignore
      Alert.alert('Error', err.message);
    }

    setLoading(false);
  };

  return (
    <ImageBackground
      source={require('../../assets/background.jpg')} // Add a peaceful, faith-inspired background image
      style={styles.background}
    >
      <LinearGradient colors={['rgba(0,0,0,0.6)', 'transparent']} style={styles.overlay}>
        <View style={styles.container}>
          <Text variant="headlineMedium" style={styles.title}>"You will seek me and find me when you seek me with all your heart"</Text>

          <TextInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            mode="outlined"
            style={styles.input}
          />
          <TextInput
            label="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            mode="outlined"
            style={styles.input}
          />

          {loading ? (
            <ActivityIndicator animating={true} size="large" color="#fff" />
          ) : (
            <Button mode="contained" onPress={handleSignUp} style={styles.button}>
              Sign Up
            </Button>
          )}

          <Button mode="text" onPress={() => navigation.navigate('Login')} textColor="#FFD700">
            Already have an account? Log in
          </Button>
        </View>
      </LinearGradient>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  overlay: { flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center' },
  container: {
    width: '85%',
    backgroundColor: 'rgba(255,255,255,0.1)', // Subtle glassmorphic effect
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  title: { fontSize: 16, fontWeight: 'normal', color: '#FFD700', marginBottom: 20, textAlign: 'center', fontStyle: 'italic', fontFamily: 'PlaywriteHU-Regular' },
  input: { width: '100%', marginBottom: 15, backgroundColor: 'rgba(255,255,255,0.2)' },
  button: { marginTop: 10, width: '100%', backgroundColor: '#FFD700' },
});

export default SignUpScreen;
