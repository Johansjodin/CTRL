import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image } from 'react-native';
import { Button, Icon } from 'react-native-elements';

export default class LoginScreen extends React.Component {
	render() {
		return (
            <View style={styles.container}>
                <Image source={require('../assets/globe.jpg')} style={styles.image} />
                <View style={styles.content}>
                    <Text style={styles.welcome}>
                        CTRL the zones bitch.
                    </Text>
                    <View style={styles.buttons}>
                        <Button
                            backgroundColor='#ff5555'
                            buttonStyle={styles.buttonStyle}
                            containerViewStyle={styles.buttonContainer}
                            title='Register' 
                            onPress={() => this.props.navigation.navigate('HomeScreen')}
                        />
                        <Button
                            backgroundColor='#23A6D5'
                            buttonStyle={styles.buttonStyle}
                            containerViewStyle={styles.buttonContainer}
                            title='Sign in' 
                            onPress={() => this.props.navigation.navigate('HomeScreen')}
                        />
                    </View>
                </View>  
            </View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'black',
    },
    image: {
        width: '100%',
        height: '40%',
    },
    content: {
        flex:1, 
        width: '100%', 
        padding: 40, 
        flexDirection: 'column', 
        justifyContent: 'space-between',
    },
    welcome: {
        color: 'white',
        textAlign:'center',
    },
    buttons: {
        flex: 1,
        justifyContent: 'flex-end',
    },  
    buttonStyle: {
        borderRadius: 40, 
        height: '100%',
    },
    buttonContainer: {
        height: 50,
        marginTop: 20,
    }

});