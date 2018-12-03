import React from 'react';
import { StyleSheet, View, TouchableOpacity  } from 'react-native';
import { Text } from 'react-native-elements';

export const StatsBox = (props) => {
    return (
        <View style={styles.statsWrapper}>
            <View style={styles.stats}>
                <TouchableOpacity style={styles.statsBox} >
                    <Text style={styles.numberLarge}>{props.stats.current !== undefined && props.stats.current || 0}</Text>
                    <Text style={styles.subtitle}>CURRENT</Text>
                </TouchableOpacity >
                <TouchableOpacity style={styles.statsBox}>
                    <Text style={styles.numberLarge}>{props.stats.total !== undefined && props.stats.total || 0}</Text>
                    <Text style={styles.subtitle}>TOTAL</Text>
                </TouchableOpacity >
                <TouchableOpacity style={styles.statsBox}>
                    <Text style={styles.numberLarge}>{props.stats.points !== undefined && props.stats.points || 0}</Text>
                    <Text style={styles.subtitle}>POINTS</Text>
                </TouchableOpacity >
            </View>
        </View>
    );
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