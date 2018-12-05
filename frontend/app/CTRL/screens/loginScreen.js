import React from 'react';
import { StyleSheet, View, Image, StatusBar } from 'react-native';
import { RoundedButton } from '../components/roundedButton';
import { signIn, signInWithGoogleAsync } from '../api/api';

export default class LoginScreen extends React.Component {

    constructor(props) {
        super(props);

        this.handleSignIn = this.handleSignIn.bind(this);
        this.handleSignUp = this.handleSignUp.bind(this);
    }

    componentDidMount() {
        StatusBar.setHidden(true);
    }

    async handleSignIn() {
        let idToken = await signInWithGoogleAsync(); 
        try {
            await signIn(idToken);
            // SAVE TO FILE or something
            this.props.navigation.navigate('MapScreen');

        } catch (err) {
            return; // TODO show something
        }
    }

    async handleSignUp() {
        let idToken = await signInWithGoogleAsync(); 
        console.log("idtoken: " + idToken);
        try {
            // SAVE TO FILE or something
            this.props.navigation.navigate('RegisterScreen', {idToken: idToken});

        } catch (err) {
            return; // TODO show something
        }
    }

	render() {
		return (
            <View style={styles.container}>
                <Image source={require('../assets/logo.png')} style={styles.image} resizeMethod={'resize'} resizeMode={'contain'}/>
                <View style={styles.buttons}>
                    <RoundedButton
                        border
                        backgroundColor='transparent'
                        title='Register' 
                        onPress={this.handleSignUp}
                    />
                    <RoundedButton
                        backgroundColor='#23A6D5'
                        title='Sign in' 
                        onPress={this.handleSignIn}
                    />
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
        backgroundColor: '#2b3d53',
    },
    image: {
        width: '30%',
        height: '30%',
        marginTop: '25%',
    },
    content: {
        flex:1, 
        width: '100%', 
        padding: 40, 
        flexDirection: 'column', 
        justifyContent: 'space-between',
    },
    buttons: {
        flex: 1,
        width: '100%',
        flexDirection: 'column', 
        justifyContent: 'flex-end',
        marginBottom: 10,
        padding: 35,
    }
});