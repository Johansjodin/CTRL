import React from 'react';
import { StyleSheet, View, Image, StatusBar } from 'react-native';
import { RoundedButton } from '../components/roundedButton';
import { EmergencyBar } from '../components/EmergencyBar';
import { signIn, signInWithGoogleAsync } from '../api/api';
import { SecureStore } from "expo";

export default class LoginScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showError:false,
            errorMessage:'',
        }
        this.handleSignIn = this.handleSignIn.bind(this);
        this.handleSignUp = this.handleSignUp.bind(this);
    }

    async handleSignIn() {
        let result = await signInWithGoogleAsync();
        
        if (result.cancelled) 
            return;

        if (result.error) {
            this.setState({showError:true, errorMessage: 'Sign up with Google failed. Do try again.'});
            return;
        }
            
        await signIn(result); // idToken
        this.props.navigation.navigate('MapScreen');
    }

    async handleSignUp() {
        let result = await signInWithGoogleAsync();
        
        if (result.cancelled) 
            return;

        if (result.error) {
            this.setState({showError:true, errorMessage: 'Sign in with Google failed. Do try again.'});
            return;
        }

        await signIn(result); // idToken
        this.props.navigation.navigate('RegisterScreen', {idToken: result});
    }

	render() {
		return (
            <View style={styles.container}>
                { this.state.showError ? <EmergencyBar message={this.state.errorMessage}/> : null }
                <Image source={require('../assets/logo.png')} style={styles.image} resizeMethod={'resize'} resizeMode={'contain'}/>
                <View style={styles.buttons}>
                    <RoundedButton
                        border
                        backgroundColor='transparent'
                        title='Register'
                        onPress={() => this.handleSignUp()}
                    />
                    <RoundedButton
                        backgroundColor='#23A6D5'
                        title='Sign in'
                        onPress={() => this.handleSignIn()}
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
        flex: 1, 
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