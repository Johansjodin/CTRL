import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';


export const IconButton = (props) => {
    return (
        <Button
            icon={{
                name: props.icon,
                size: 35,
                color: 'black',
                style: { marginRight: 0 }
            }}
            backgroundColor={props.backgroundColor ? props.backgroundColor : 'white'}
            buttonStyle={styles.buttonStyle}
            containerViewStyle={[styles.buttonContainer, props.width ? {width: props.width + '%'} : null, (props.style ? {...props.style} : null)]}
            title={''}
            onPress={props.onPress}
        />
    );
}

const styles = StyleSheet.create({
    buttonStyle: {
        borderRadius: 40, 
        height: '100%',
    },
    buttonContainer: {
        height: 60,
        marginTop: 20,
    }
});