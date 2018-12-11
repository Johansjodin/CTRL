import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-elements';
import { RoundedBox } from '../components/roundedBox';

export class ZoneList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            zones: ['You do not control any zones']
        }
        
        if (props.zones !== undefined && props.zones.length > 0) {
            state.zones = props.zones;
        }
    }

    componentWillReceiveProps(newProps) {
        if (this.props.zones !== newProps.zones) {
            this.setState({zones: newProps.zones})
        }
    }

    render() {
        return (
            <RoundedBox>
                {this.state.zones.map((zone,index) => (
                    <TouchableOpacity style={styles.zone} key={index}>
                        <Text style={styles.zoneName}>{zone}</Text>
                    </TouchableOpacity>
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