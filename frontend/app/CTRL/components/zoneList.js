import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';
import { RoundedBox } from '../components/roundedBox';

export class ZoneList extends React.Component {
    render() {
        return (
            <RoundedBox>
                { (this.props.zones !== undefined && this.props.empty !== undefined) && this.props.zones.map((zone,index) => (
                    <View style={styles.zone} key={index}>
                        {this.props.empty ? (
                            <Text> You do not currently control any zones. </Text>
                        ) : (
                            <Text style={styles.zoneName}>{zone}</Text>
                        )}
                    </View>
                ))}
            </RoundedBox>
        );
    }
}
const styles = StyleSheet.create({
    zone: {
        height: 40,
        justifyContent: 'center',
    },
});