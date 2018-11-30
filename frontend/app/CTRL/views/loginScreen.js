import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, TouchableWithoutFeedback } from 'react-native';
import { Card, ListItem, Button, Icon, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import DismissKeyboard from 'dismissKeyboard';

export default class LoginScreen extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			username: "",
			email: "",
			password: "",
		};
		
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(e) {
		console.log(this.state);
	}

	render() {
		return (
			<TouchableWithoutFeedback onPress={()=>{DismissKeyboard()}}>
				<SafeAreaView style={styles.container}>
				
					<View style={styles.loginWrapper}>
                        <FormInput 
							onChangeText={(text) => this.setState({username: text})}
							containerStyle={styles.formContainer}
							inputStyle={styles.formInput}
							placeholder={"Username"}
							value={this.state.username}
						/> 
						<FormInput 
							onChangeText={(text) => this.setState({email: text})}
							containerStyle={styles.formContainer}
							inputStyle={styles.formInput}
							placeholder={"Email"}
							value={this.state.email}
						/> 
						<FormInput 
							onChangeText={(text) => this.setState({password: text})}
							containerStyle={styles.formContainer}
							inputStyle={styles.formInput}
							placeholder={"Password"}
							secureTextEntry={true}
							value={this.state.password}
						/> 
					</View>
					<Button
						backgroundColor='#23A6D5'
						buttonStyle={{borderRadius: 40, height: '105%'}}
						containerViewStyle={{width: '80%', height: '10%', marginBottom: '5%'}}
						title='Sign up' 
						onPress={this.handleSubmit}
					/>
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
	},
	loginWrapper: {
		flex: 1,
		width: '100%',
		padding: '5%',
	},
	formContainer: {
		borderRadius: 40,
		borderWidth: 1, 
        borderColor: '#e3e3e3', 
        borderBottomColor: '#e3e3e3',
        height: '10%',
        marginBottom: 20,
        paddingLeft: '5%',
	},
	formInput: {
		height: '100%',
	}
});