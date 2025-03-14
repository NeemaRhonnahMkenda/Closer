import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {auth} from '../firebaseConfig';

// @ts-ignore
const SignUpScreen = ({navigation}) => {
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
        <View style={styles.container}>
            <Text style={styles.title}>Sign Up</Text>

            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />

            <TouchableOpacity style={styles.button} onPress={handleSignUp} disabled={loading}>
                <Text style={styles.buttonText}>{loading ? 'Signing Up...' : 'Sign Up'}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.linkText}>Already have an account? Log in</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
    title: {fontSize: 24, fontWeight: 'bold', marginBottom: 20},
    input: {width: '80%', height: 50, borderWidth: 1, marginBottom: 10, padding: 10},
    button: {backgroundColor: '#007bff', padding: 15, borderRadius: 5},
    buttonText: {color: '#fff', fontWeight: 'bold'},
    linkText: {marginTop: 10, color: 'blue'},
});

export default SignUpScreen;
