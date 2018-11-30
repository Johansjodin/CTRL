import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, StatusBar } from 'react-native';
import { Button, Icon } from 'react-native-elements';

export default class Navbar extends React.Component {
    constructor(props) {
        super(props);
    }
    
	render() {
		return (
            <View style={styles.menu}>
                <Button
                    backgroundColor='#ff5555'
                    title='Press meh PsO'
                    buttonStyle={styles.buttonStyle}
                    containerViewStyle={styles.buttonContainer} 
                    onPress={() => this.props.navigate('LoginScreen')}
                />
                <Button
                    backgroundColor='#ff5555'
                    title='Press meh PRO2'
                    buttonStyle={styles.buttonStyle}
                    containerViewStyle={styles.buttonContainer} 
                    onPress={() => this.props.navigate('LoginScreen')}
                />
            </View>
		);
	}
}

const styles = StyleSheet.create({
    menu: {
        flexDirection: 'row',
        height: 60,
    },  
    buttonStyle: {
        height: 60,
        margin:0,
    },
    buttonContainer: {
        height: 60,
        flexGrow: 1,
        marginLeft:0,
        marginRight:0,
    }
    
});
