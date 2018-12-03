import React from 'react';
import { StyleSheet, View } from 'react-native';

export const RoundedBox = (props) => {
    return (
        <View style={[styles.zonesWrapper, {backgroundColor: props.color !== undefined ? props.color : 'white'}, (props.style ? {...props.style} : null)]}>
            {props.children}
        </View>
    );

}

const styles = StyleSheet.create({
    zonesWrapper: {
        flex:1,
        width: '100%',
        borderRadius: 15,
        padding: 20,
    },
});