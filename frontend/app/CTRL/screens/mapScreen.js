import React from 'react';
import { StyleSheet, View} from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import Navbar from '../components/navbar';
import NodeInfo from '../components/nodeInfo';
import { getNodes, getColor, getUser } from '../api/api';
import { SecureStore } from 'expo';
import { store } from '../components/store'

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

    async nodeClick(node) {
        let response;
        try{
            let token = await SecureStore.getItemAsync('jwt');
            response = await getColor(store.uid, token);    // TODO: change getColor to get node.owner's colors
        } catch (e) {
            console.log('mapScreen.js::nodeClick::Error retrieving node info.');
        }

        this.setState({
            "selectedNode": {
                'title': node.title,
                'owner': node.owner,
                'ownerName': node.ownerName,
                "coordinates": {
                    "latitude": node.coordinates.latitude,
                    "longitude": node.coordinates.longitude,
                },
                'captured_at':  node.captured_at,
                'colors':(response) ? response : [],
            },
            showInfo: true
        })
    }

    async componentDidMount() {
        let nodes = await getNodes();
        let convertedNodes = nodes.map(async node => {
            let username = (await getUser(node.owner)).username;
            return {
                key: node._id,
                title: node.name,
                owner: node.owner,
                ownerName: username,
                coordinates: {
                    latitude: node.coordinates[0],
                    longitude: node.coordinates[1],
                },
                captured_at: node.captured_at
            }
        });
        convertedNodes = await Promise.all(convertedNodes);

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
                    {this.state.nodes.map((node, i) => (
                        <MapView.Marker
                            key={i}
                            coordinate={node.coordinates}
                            onPress={() => {this.nodeClick(node)}}
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
