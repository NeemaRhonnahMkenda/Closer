import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SignUpScreen from './src/screens/SignUpScreen';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import {auth} from './src/firebaseConfig.ts';
import {Provider as PaperProvider} from 'react-native-paper';

const Stack = createStackNavigator();

function App(): React.JSX.Element {
    return (
        <PaperProvider>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="SignUp">
                    <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }}/>
                    <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }}/>
                    <Stack.Screen name="Home" component={HomeScreen}/>
                </Stack.Navigator>
            </NavigationContainer>
        </PaperProvider>
    );
}

export default App;


console.log('Firebase Auth:', auth);
