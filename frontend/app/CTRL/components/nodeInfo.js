import React from 'react';
import { StyleSheet, View, SafeAreaView, Image, StatusBar } from 'react-native';
import { Button, Icon, Text } from 'react-native-elements';

export default class nodeInfo extends React.Component {
    constructor(props) {
        super(props);
    }
    
	render() {
		return (
            <View style={styles.nodeInfo}>
                <Text style={{fontSize: 18}}>NODE NAME</Text>
                <Text style={{fontSize: 18}}>Player: PLAYER NAME</Text>
                <Text>Coordinates: {this.props.nodeInfo.coordinates.longitude}</Text>
            </View>
		);
	}
}

const styles = StyleSheet.create({
    nodeInfo: {
        backgroundColor: 'white',
        height: 200,
        width: '100%',
        marginTop: -200,
        padding: 25,
        flexDirection: 'column',
    }
    
});
