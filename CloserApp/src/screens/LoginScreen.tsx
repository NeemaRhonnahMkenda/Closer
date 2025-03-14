import React, { useState } from 'react';
import { View, StyleSheet, Alert, ImageBackground } from 'react-native';
import { Text, TextInput, Button, ActivityIndicator } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';

// @ts-ignore
const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter an email and password.');
      return;
    }

    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigation.navigate('Home'); // Navigate after login
    } catch (err) {
      // @ts-ignore
      Alert.alert('Error', err.message);
    }

    setLoading(false);
  };

  return (
    <ImageBackground
      source={require('../../assets/LoginBackground.webp')} // Same background as SignUp
      style={styles.background}
    >
      <LinearGradient colors={['rgba(0,0,0,0.6)', 'transparent']} style={styles.overlay}>
        <View style={styles.container}>
          <Text variant="headlineMedium" style={styles.title}>"Come to me, all who are weary, and I will give you rest"</Text>

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
            <Button mode="contained" onPress={handleLogin} style={styles.button}>
              Log In
            </Button>
          )}

          <Button mode="text" onPress={() => navigation.navigate('SignUp')} textColor="#FFD700">
            Don't have an account? Sign Up
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
    backgroundColor: 'rgba(255,255,255,0.1)', // Same as SignUp
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

export default LoginScreen;
