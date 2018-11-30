import React from 'react';
import LoginScreen from './screens/loginScreen';
import HomeScreen from './screens/homeScreen';
import { createStackNavigator, createAppContainer } from 'react-navigation';

const AppNavigator = createStackNavigator(
    {
        LoginScreen: {screen: LoginScreen},
        HomeScreen: {screen: HomeScreen}
    },
    {
        initialRouteName: "LoginScreen",
        headerMode: 'none',
    }
)
const App = createAppContainer(AppNavigator);

export default App;



/*<View style={styles.formWrapper}>
		  <Text>hej3</Text>
		  <Button
			onPress={() => {}}
			title="Press me"
			color="#0000ff"
			accessibilityLabel="Learn more about this purple button"
		  />
		</View>*/