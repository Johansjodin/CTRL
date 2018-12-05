import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { RoundedBox } from './roundedBox';

export const IdentifierBox = (props) => {
    return (
        <RoundedBox>
            <View style={styles.horizontal}>
                {props.colors.map((color, index) => (
                    <View 
                        style={[styles.round, {backgroundColor: color}]}
                        key={index}
                    />
                ))}
            </View>
            
        </RoundedBox>
    );
}

const styles = StyleSheet.create({
    horizontal: {
        flexDirection:'row',
        justifyContent: 'space-between'
    },
    round: {
        height: 30,
        width: 30,
        backgroundColor: 'red',
        borderRadius: 15,
    }
});
