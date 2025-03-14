import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignUpScreen from './src/screens/SignUpScreen';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import { Provider as PaperProvider } from 'react-native-paper';
import { AuthProvider, AuthContext } from './src/context/AuthContext';
import { View, ActivityIndicator } from 'react-native';

const Stack = createStackNavigator();

const AuthNavigator = () => {
    const { user, loading } = useContext(AuthContext);

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#FFD700" />
            </View>
        );
    }

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {user ? (
                <Stack.Screen name="Home" component={HomeScreen} />
            ) : (
                <>
                    <Stack.Screen name="Login" component={LoginScreen} />
                    <Stack.Screen name="SignUp" component={SignUpScreen} />
                </>
            )}
        </Stack.Navigator>
    );
};

function App(): React.JSX.Element {
    return (
        <PaperProvider>
            <AuthProvider>
                <NavigationContainer>
                    <AuthNavigator />
                </NavigationContainer>
            </AuthProvider>
        </PaperProvider>
    );
}

export default App;
