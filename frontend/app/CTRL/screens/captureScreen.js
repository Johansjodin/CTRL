import React from 'react';
import {StyleSheet, View, TouchableOpacity, ScrollView} from 'react-native';
import { Text } from 'react-native-elements';
import Navbar from "../components/navbar";

export default class CaptureScreen extends React.Component {

    constructor(props) {
        super(props);
    }

	render() {
		return (
            <View style={{flex: 1}}>
                <View style={styles.container}>
                    <TouchableOpacity style={styles.circle} >
                        <Text style={styles.text}>Capture</Text>
                    </TouchableOpacity>
                </View>
                <Navbar navigate={this.props.navigation.navigate} active={'capture'} />
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
    circle: {
        width: 250,
        height: 250,
        borderWidth: 10,
        borderColor: '#200808',
        borderRadius: 125,
        backgroundColor: '#ff5555',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: 'white',
        fontSize: 28,
    },
});