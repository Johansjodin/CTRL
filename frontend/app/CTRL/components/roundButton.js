import React from 'react';
import { StyleSheet } from 'react-native';
import { Button} from 'react-native-elements';


export const RoundButton = (props) => {
    return (
        <Button
            backgroundColor={props.backgroundColor}
            buttonStyle={[styles.buttonStyle, props.border ? {borderWidth: 1, borderColor: '#e3e3e3'} : null]}
            containerViewStyle={[styles.buttonContainer, props.width ? {width: props.width + '%'} : null, (props.style ? {...props.style} : null)]}
            title={props.title} 
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