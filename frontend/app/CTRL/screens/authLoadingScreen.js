import React from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
//import {SecureStore} from "expo";
import { AsyncStorage } from "react-native";
import { getUser, getNodes } from '../api/api';
import { store } from '../components/store';
import { GoogleSignin } from 'react-native-google-signin';

export default class AuthLoadingScreen extends React.Component {

    constructor(props) {
        super(props);

        GoogleSignin.configure({
            scopes: ['profile'], // what API you want to access on behalf of the user, default is email and profile
            webClientId: '599513397770-3586oft2o4btq75s695tvsl7p3r7dcmk.apps.googleusercontent.com',
            forceConsentPrompt: true,
        });
        this.verifyToken();
    }

    async componentDidMount() {
        StatusBar.setHidden(true);
    }

    async verifyToken() {
        try{
            let token = await AsyncStorage.getItem('jwt');
            let uid = await AsyncStorage.getItem('uid');
            //const token = await SecureStore.getItemAsync('jwt');
            //const uid = await SecureStore.getItemAsync('uid');
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
                throw new Error('Go to login screen.');
            }
        } catch (e) {
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