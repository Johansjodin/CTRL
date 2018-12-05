import React from 'react';
import { StyleSheet, View, SafeAreaView, TouchableWithoutFeedback, Animated } from 'react-native';
import Expo from 'expo';
import { FormInput } from 'react-native-elements';
import DismissKeyboard from 'dismissKeyboard';
import { RoundedButton } from '../components/roundedButton';
import { signUp, signInWithGoogleAsync } from '../api/api';

export default class RegisterScreen extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
            username: "",
            headingDelay: new Animated.Value(0),
            subtitleDelay: new Animated.Value(0),
		};
		
		this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    async componentDidMount() {

        this.tokenId = this.props.navigation.getParam('idToken', null)

        Animated.timing(
            this.state.headingDelay, 
            {
                toValue: 1,
                duration: 1000, 
            },
        ).start();
        
        Animated.timing(
            this.state.subtitleDelay,
            {
                toValue: 1,
                delay: 500,
                duration: 1000, 
            },
        ).start();
    }

	async handleSubmit(e) {
        //SEND TO API
        
        await signUp(this.tokenId, this.state.username);
        this.props.navigation.navigate('MapScreen');

        //this.signInWithGoogleAsync();
	}

	render() {
		return (
			<TouchableWithoutFeedback onPress={()=>{DismissKeyboard()}}>
				<SafeAreaView style={styles.container}>
                    <Animated.Text style={{color:'white', fontSize: 40, marginTop: 50, opacity: this.state.headingDelay}}>Almost done!</Animated.Text>
                    <Animated.Text style={{color:'white', fontSize: 30, marginTop: 20, opacity: this.state.subtitleDelay}}>Select a username</Animated.Text>
					<Animated.View style={[styles.loginWrapper, {opacity: this.state.subtitleDelay}]}>
						<FormInput 
							onChangeText={(text) => this.setState({username: text})}
							containerStyle={styles.formContainer}
							inputStyle={styles.formInput}
                            placeholder={"Username"}
                            placeholderTextColor= {'#e3e3e355'}
							value={this.state.username}
						/> 
					</Animated.View>
                    <View style={styles.buttons}>
                        <RoundedButton
                            backgroundColor='#23A6D5'
                            title='Sign up' 
                            onPress={this.handleSubmit}
                        />
                    </View>
				</SafeAreaView>
			</TouchableWithoutFeedback>
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
	loginWrapper: {
		flex: 2,
		width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
	},
	formContainer: {
		borderBottomWidth: 1, 
        borderBottomColor: 'white', 
        width: '60%',
		height: 60,
	},
	formInput: {
        height: '100%',
        width: '100%',
        textAlign: 'center',
        paddingLeft: 10,
        paddingRight: 10,
        fontSize: 30,
        color: 'white',
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