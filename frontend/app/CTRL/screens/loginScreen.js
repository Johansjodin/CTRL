import React from 'react';
import { StyleSheet, View, Image, StatusBar } from 'react-native';
import { RoundedButton } from '../components/roundedButton';
import EmergencyBar from '../components/EmergencyBar';
import { signIn, signInWithGoogleAsync } from '../api/api';
import {SecureStore} from "expo";
import NodeInfo from "../components/nodeInfo";

export default class LoginScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state={showError:false, errorMessage:''}
        this.handleSignIn = this.handleSignIn.bind(this);
        this.handleSignUp = this.handleSignUp.bind(this);
    }

    async componentDidMount() {
        StatusBar.setHidden(true);
        let token = await SecureStore.getItemAsync('jwt');
        if(token != undefined){
            try{
                await signIn(token);  // TODO: fix this
                this.props.navigation.navigate('MapScreen');
            } catch (e) {
                console.log('loginScreen.js::'+e.message);
                this.setState({showError:true, errorMessage: 'Auto-Sign in failed. Manual login required.'});
            }
        }
    }

    async handleSignIn() {
        try {
            let idToken = await signInWithGoogleAsync();
            await signIn(idToken);
            this.props.navigation.navigate('MapScreen');

        } catch (e) {
            console.log('loginScreen.js::'+e.message);
            this.setState({showError:true, errorMessage: 'Sign in with Google failed. Do try again.'});
            return; // TODO show something
        }
    }

    async handleSignUp() {
        try {
            let idToken = await signInWithGoogleAsync();
            this.props.navigation.navigate('RegisterScreen', {idToken: idToken});

        } catch (e) {
            this.setState({showError:true, errorMessage: 'Sign in with Google failed. Do try again.'});
            return; // TODO show something
        }
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