import React from 'react';
import { StyleSheet, View, SafeAreaView, Image, StatusBar } from 'react-native';
import { Button, Icon, Text } from 'react-native-elements';
import { RoundButton } from '../components/roundButton';

export default class LoginScreen extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
           test: 0
        }
    }

    componentDidMount() {
        StatusBar.setHidden(true);
    }

	render() {
		return (
            <View style={styles.container}>
                <Image source={require('../assets/logo2.png')} style={styles.image} resizeMethod={'resize'} resizeMode={'contain'}/>
                <View style={styles.buttons}>
                    <RoundButton
                        border
                        backgroundColor='transparent'
                        title='Register' 
                        onPress={() => this.props.navigation.navigate('RegisterScreen')}
                    />
                    <RoundButton
                        backgroundColor='#23A6D5'
                        title='Sign in' 
                        onPress={() => this.props.navigation.navigate('MapScreen')}
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