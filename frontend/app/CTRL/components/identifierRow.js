import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';

export const IdentifierRow = (props) => {
    return (
        <View style={styles.horizontal}>
            {props.colors.map((color, index) => (
                <TouchableOpacity onPress={() => {props.onPress(index)}} key={index}>
                    <View
                        style={[styles.round, {backgroundColor: color}]}
                        key={index}
                    />
                </TouchableOpacity>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    horizontal: {
        flexDirection:'row',
        justifyContent: 'space-between',
    },
    round: {
        height: 30,
        width: 30,
        borderRadius: 15,
    }
});
