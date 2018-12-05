import React, { Animated, Easing } from 'react';
import LoginScreen from './screens/loginScreen';
import MapScreen from './screens/mapScreen';
import ProfileScreen from './screens/profileScreen';
import RegisterScreen from './screens/registerScreen';
import CaptureScreen from  './screens/captureScreen';
import { createStackNavigator, createAppContainer, createSwitchNavigator } from 'react-navigation';

const fade = (props) => {
    const {position, scene} = props
    const index = scene.index
    const translateX = 0
    const translateY = 0

    const opacity = position.interpolate({
        inputRange: [index - 0.7, index, index + 0.7],
        outputRange: [0.3, 1, 0.3]
    })

    return {
        opacity,
        transform: [{translateX}, {translateY}]
    }
}

const AuthStack = createStackNavigator(
    {
        LoginScreen: {screen: LoginScreen},
        RegisterScreen: {screen: RegisterScreen},
    },
    {
        initialRouteName: "LoginScreen",
        headerMode: 'none',
        transitionConfig: () => ({
            screenInterpolator: (props) => {
                return fade(props)
            }
        })
    }
)

const AppStack = createStackNavigator(
    {
        MapScreen: {screen: MapScreen},
        ProfileScreen: {screen: ProfileScreen},
        CaptureScreen: {screen: CaptureScreen},
    },
    {
        initialRouteName: "MapScreen",
        headerMode: 'none',
        transitionConfig: () => ({
            screenInterpolator: (props) => {
                return fade(props)
            }
        })  
    }
)
const App = createAppContainer(
    createSwitchNavigator(
        {
            Auth: AuthStack,
            App: AppStack,
        }
    )
);

export default App;