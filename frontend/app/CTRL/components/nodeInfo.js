import React from 'react';
import { StyleSheet, View, Animated } from 'react-native';
import { Text } from 'react-native-elements';
import { IdentifierRow } from './identifierRow';

export default class nodeInfo extends React.Component {
    
    constructor(props) {
        super(props);

    }

	render() {
        // TODO get user from owner, reformat captured_at
		return (
            <View style={styles.wrapper}>
                <View style={styles.nodeInfo}>
                    <View style={styles.header}>
                        <Text style={styles.nodeName}>{this.props.nodeInfo.title.toUpperCase()}</Text>
                        <Text style={styles.value}>{parseInt((new Date() - new Date(this.props.nodeInfo.captured_at)) / 1000 )}</Text>
                    </View>
                    
                    <Text style={{fontSize: 18}}>Owner: {this.props.nodeInfo.ownerName}</Text>
                    <Text>Coordinates: {this.props.nodeInfo.coordinates.latitude}, {this.props.nodeInfo.coordinates.longitude}</Text>
                    <Text>Captured at: {this.props.nodeInfo.captured_at}</Text>
                    <IdentifierRow colors={this.props.nodeInfo.colors} />
                </View>
            </View>
		);
	}
}

const styles = StyleSheet.create({
    wrapper: {
        width: '100%',
        height: 270,
        marginTop: -270,
        borderBottomWidth: 1,
        borderColor: '#e3e3e3',
        padding: 10,
    },
    nodeInfo: {
        backgroundColor: 'white',
        borderRadius: 15,
        flex: 1,
        flexDirection: 'column',
        padding: 25,
        justifyContent: 'space-between',
        shadowColor: 'black',
        shadowRadius: 10,
        elevation: 2,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    nodeName: {
        fontSize: 20,
    },  
    value: {
        color: '#23A6D5',
        fontSize: 22,
        textAlign: 'center',
    }
});
