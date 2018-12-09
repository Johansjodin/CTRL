import React from 'react';
import { StyleSheet, View, SafeAreaView, Image, StatusBar } from 'react-native';
import { Button, Icon, Text } from 'react-native-elements';
import {IdentifierBox} from "./identifierBox";

export default class nodeInfo extends React.Component {
    constructor(props) {
        super(props);
    }
    
	render() {
        // TODO get user from owner, reformat captured_at
		return (
            <View style={styles.nodeInfo}>
                <Text style={{fontSize: 18}}>Node: {this.props.nodeInfo.title}</Text>
                <Text style={{fontSize: 18}}>Owner: {this.props.nodeInfo.ownerName}</Text>
                <Text>Coordinates: {this.props.nodeInfo.coordinates.latitude}, {this.props.nodeInfo.coordinates.longitude}</Text>
                <Text>Captured at: {this.props.nodeInfo.captured_at}</Text>
                <IdentifierBox colors={this.props.nodeInfo.colors} />
            </View>
		);
	}
}

const styles = StyleSheet.create({
    nodeInfo: {
        flex: 0,
        flexShrink: 1,
        backgroundColor: 'white',
        width: '100%',
        marginTop: -200,
        padding: 25,
        flexDirection: 'column',
    }
});
