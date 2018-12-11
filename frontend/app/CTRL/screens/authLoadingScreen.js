import React from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import {SecureStore} from "expo";
import { getUser, getNodes } from '../api/api';
import { store } from '../components/store';


export default class AuthLoadingScreen extends React.Component {

    constructor(props) {
        super(props);

        this.verifyToken();
    }

    async componentDidMount() {
        StatusBar.setHidden(true);
    }

    async verifyToken() {
        const token = await SecureStore.getItemAsync('jwt');
        const uid = await SecureStore.getItemAsync('uid');
        
        if (token && uid) {
            let userInfo = await getUser(uid);
            store.username = userInfo.username; // TODO lite annorlunda mot andra apierna, ändra när det läggs in i store?
            store.colors = userInfo.colors;
            store.imageId = userInfo.image;
            store.uid = uid;
            store.points = userInfo.points

            let nodes = await getNodes();
            let myNodes = nodes.filter(node => {
                return node.owner === uid;
            });

            store.myNodes = myNodes
            this.props.navigation.navigate('MapScreen');
        } else {
            this.props.navigation.navigate('LoginScreen');
        }
    };

	render() {
		return (
            <View style={styles.container}>
            
            </View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#2b3d53',
    },
});