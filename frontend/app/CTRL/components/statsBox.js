import React from 'react';
import { StyleSheet, View, TouchableOpacity  } from 'react-native';
import { Text } from 'react-native-elements';

export class StatsBox extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            rank: props.stats.rank,
            rankColor: '#23A6D5',
        }
        console.log(this.state.rankColor);
    }

    async componentWillReceiveProps(newProps) {
        if (this.props.stats.rank !== newProps.stats.rank) {
            console.log(newProps.stats.rank === 1);
            
            if (newProps.stats.rank <= 10)
                await this.setState({rankColor: '#00B233'})
            if (newProps.stats.rank === 1)
                await this.setState({rankColor: 'gold'})
            console.log(newProps);
        }
        
    }

    render() {
        return (
            <View style={styles.statsWrapper}>
                <View style={styles.stats}>
                    <TouchableOpacity style={styles.statsBox} >
                        <Text style={styles.numberLarge}>{this.props.stats.current || 0}</Text>
                        <Text style={styles.subtitle}>ZONES</Text>
                    </TouchableOpacity >
                    <TouchableOpacity style={styles.statsBox}>
                        <Text style={styles.numberLarge}>{this.props.stats.points || 0}</Text>
                        <Text style={styles.subtitle}>POINTS</Text>
                    </TouchableOpacity >
                    <TouchableOpacity style={styles.statsBox}>
                        <Text style={[styles.numberLarge, {color: this.state.rankColor}]}>{this.props.stats.rank || 0}</Text>
                        <Text style={styles.subtitle}>RANK</Text>
                    </TouchableOpacity >
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    statsWrapper: {
        width: '100%',
    },
    stats: {
        height: 110,
        flexDirection: 'row',
        backgroundColor: '#2b3d53',
        justifyContent: 'space-evenly',
    },
    statsBox: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    numberLarge: {
        color: '#23A6D5',
        fontSize: 30,
    },
    subtitle: {
        color: 'white',
        fontSize: 12,
    },
});