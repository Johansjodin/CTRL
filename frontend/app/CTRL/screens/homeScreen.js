import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, StatusBar } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import Navbar from '../components/navbar';

export default class LoginScreen extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            region: {
                latitude: 65.617030,
                longitude: 22.137518,
                latitudeDelta: 0.0025,
                longitudeDelta: 0.0025,
            },
            nodes: [
                {
                    title: "hej",
                    coordinates: {
                        latitude: 65.617030,
                        longitude: 22.137518,
                    },
                    key: 1,
                },
                {
                    title: "hej2",
                    coordinates: {
                        longitude: 22.137875,
                        latitude: 65.617604,
                    },
                    key: 2,
                }
            ],
            selectedNode: {
                title: "",
                coordinates: {
                    latitude: 0.0,
                    longitude: 0.0,
                },
                key: 0,
            }
        }

        this.nodeClick = this.nodeClick.bind(this);
    }

    nodeClick(e) {
        let latitude = e.nativeEvent.coordinate.latitude;
        let longitude = e.nativeEvent.coordinate.longitude;
        console.log(latitude);
        this.setState({
            "selectedNode": {
                "coordinates": {
                    "latitude": latitude, 
                    "longitude": longitude
                }
            }
        })
    }

    componentDidMount() {
        StatusBar.setHidden(true);
     }

	render() {
		return (
            <View style={styles.container}>
                <MapView
                    region={this.state.region}
                    provider={PROVIDER_GOOGLE}
                    style={{width: '100%', flex: 1}}
                    showsBuildings
                    showsIndoors
                    showsPointsOfInterest
                >
                    {this.state.nodes.map(node => (
                        <MapView.Marker
                            key={node.key}
                            coordinate={node.coordinates}
                            title={node.title}
                            key={node.key}
                            onPress={this.nodeClick}
                        />
                    ))}
                </MapView>
                <View style={styles.nodeInfo}>
                    <Text>Coordinates: {this.state.selectedNode.coordinates.latitude}</Text>
                </View>
                <Navbar navigate={this.props.navigation.navigate} />
               
            </View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		alignItems: 'center',
        justifyContent: 'space-between',
    },
    nodeInfo: {
        backgroundColor: 'white',
        height: 200,
        width: '100%',
        marginTop: -200,
        padding: 25,
    }
    
});
