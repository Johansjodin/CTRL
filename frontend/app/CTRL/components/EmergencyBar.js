import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, StatusBar } from 'react-native';
import { Button, Icon } from 'react-native-elements';

export default class EmergencyBar extends React.Component {
    render() {
        return (
            <View style={styles.menu}>
                <Text style={styles.msg}>{this.props.message}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    menu: {
        flex: 0,
        flexShrink: 1,
        flexDirection: 'row',
        alignSelf: 'stretch',
        justifyContent: 'center',
        height: 30,
        backgroundColor: '#cc0000',
        margin:0,
        padding:0,
    },
    msg: {
        color: '#ffffff',
        alignSelf: 'center',
        textShadowColor: '#000000',
        textShadowOffset: {width:1,height:1},
        textAlignVertical: 'bottom',
    },
});
