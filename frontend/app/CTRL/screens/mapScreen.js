import React from 'react';
import { StyleSheet, View} from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import Navbar from '../components/navbar';
import NodeInfo from '../components/nodeInfo';
import { getNodes } from '../api/api';

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
            nodes: [],
            selectedNode: {
                title: "",
                coordinates: {
                    latitude: 0.0,
                    longitude: 0.0,
                },
            },
            showInfo: false,
        }
        this.nodeClick = this.nodeClick.bind(this);
        this.hideNodeInfo = this.hideNodeInfo.bind(this);
    }

    hideNodeInfo(e) {
        this.setState({
            showInfo: false
        });
    }

    nodeClick(e) {
        e.stopPropagation();
        let latitude = e.nativeEvent.coordinate.latitude;
        let longitude = e.nativeEvent.coordinate.longitude;
        this.setState({
            "selectedNode": {
                "coordinates": {
                    "latitude": latitude, 
                    "longitude": longitude
                }
            },
            showInfo: true
        })
    }

    async componentDidMount() {
        let nodes = await getNodes();
        let convertedNodes = nodes.map(node => {
            return {
                key: node._id,
                title: node.name,
                coordinates: {
                    latitude: node.coordinates[0],
                    longitude: node.coordinates[1]
                },
                captured_at: node.captured_at
            }
        });

        this.setState({
            nodes: [...convertedNodes]
        }); 
     }

	render() {
		return (
            <View style={styles.container} >
                <MapView
                    initialRegion={this.state.region}
                    provider={PROVIDER_GOOGLE}
                    style={{width: '100%', flex: 1}}
                    showsBuildings
                    showsIndoors
                    showsPointsOfInterest
                    onPress={this.hideNodeInfo}
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

                { this.state.showInfo ? <NodeInfo nodeInfo={this.state.selectedNode}/> : null }

                <Navbar navigate={this.props.navigation.navigate} active={'map'} />
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
});
