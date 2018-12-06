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
                    icon={{
                        name: 'map',
                        size: 35,
                        color: this.props.active === 'map' ? '#23A6D5' : 'black',
                        style: { marginRight: 0 }
                    }}
                    backgroundColor='white'
                    buttonStyle={styles.buttonStyle}
                    containerViewStyle={styles.buttonContainer} 
                    onPress={() => this.props.navigate('MapScreen')}
                />
                <Button
                    icon={{
                        name: 'person',
                        size: 35,
                        color: this.props.active === 'profile' ? '#23A6D5' : 'black',
                        style: { marginRight: 0 }
                    }}
                    backgroundColor='white'
                    buttonStyle={styles.buttonStyle}
                    containerViewStyle={styles.buttonContainer} 
                    onPress={() => this.props.navigate('ProfileScreen')}
                />
                <Button
                    icon={{
                        name: 'camera',
                        size: 35,
                        color: this.props.active === 'capture' ? '#23A6D5' : 'black',
                        style: { marginRight: 0 }
                    }}
                    backgroundColor='white'
                    buttonStyle={styles.buttonStyle}
                    containerViewStyle={styles.buttonContainer} 
                    onPress={() => this.props.navigate('CaptureScreen')}
                />
            </View>
		);
	}
}

const styles = StyleSheet.create({
    menu: {
        flexShrink: 0,
        flexDirection: 'row',
        height: 70,
    },  
    buttonStyle: {
        height: '100%',
        margin: 0,
    },
    buttonContainer: {
        height: '100%',
        flexGrow: 1,
        marginLeft:0,
        marginRight:0,
    }
    
});
