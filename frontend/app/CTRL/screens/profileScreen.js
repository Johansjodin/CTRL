import React from 'react';
import {StyleSheet, View, ScrollView, TouchableOpacity} from 'react-native';
import { Text, Avatar, Button } from 'react-native-elements';
import Navbar from '../components/navbar';
import { RoundedButton } from '../components/roundedButton';
import { StatsBox } from '../components/statsBox';
import { ZoneList } from '../components/zoneList';
import { IdentifierBox } from '../components/identifierBox';
import { store } from '../components/store';
import { getNodesBy, getUser, setImage, getLeaderboard } from '../api/api'
//import { SecureStore } from 'expo'
import { AsyncStorage } from "react-native";
import {IconButton} from "../components/iconButton";
import {AvatarImage} from "../components/avatarImage";
import { GoogleSignin } from 'react-native-google-signin';

const spacerSize = 1000;
const pictureLib = ['https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg', 'https://deltro.jp/images/img_freeface00.jpg', 'https://www.maybelline.co.nz/~/media/Images/MNY/en_US/Home/Products/Face/Foundation/Fit-Me-Shine-Free-Foundation/fit-me-stick_model-shot.jpg','https://static.turbosquid.com/Preview/000153/503/D9/free-asian-female-face-3d-model_D.jpg'];

export default class ProfileScreen extends React.Component {
    
    constructor(props) {
        super(props);
        this.setupLocalUserInfo();
        this.state = {
            isEditing: false,
            picture: store.pic,
            username: store.username,
            stats: {
                current: store.myNodes.length,
                points: store.points,  
                rank: store.rank,
            },
            nodes: [],
            leaderboard:[],
            identifier: store.colors, //['#c62828', '#6a1b9a', '#283593', '#0277bd', '#00695c'],
            cardId: null,
        },
        this.handleSignOut = this.handleSignOut.bind(this);
    }

    setupLocalUserInfo() {
        if(!store.hasOwnProperty('pic'))
            store.pic = pictureLib[0];
        if(!store.hasOwnProperty('myNodes'))
            store.myNodes = [];
        if(!store.hasOwnProperty('points')) 
            store.points = 0;
        if(!store.hasOwnProperty('rank'))
            store.rank = -1;
        if(!store.hasOwnProperty('leaderboard'))
            store.leaderboard = [];
        if(!store.hasOwnProperty('username')) 
            store.username = 'undefined';
        if(!store.hasOwnProperty('colors')) 
            store.colors = ['#c62828', '#6a1b9a', '#283593', '#0277bd', '#00695c'];
    }

    async updateUserInfo(){
        let cardId = await AsyncStorage.getItem('cardId');

        let myNodes = await getNodesBy(store.uid);
        let userInfo = await getUser(store.uid);
        store.rank = ''; // TODO fix

        let i;
        for (i = 0; i < store.leaderboard.length; i++) {
            if (store.leaderboard[i]._id === store.uid) {
                store.rank = i+1;
            }
        }

        console.log("rank: ", store.rank);

        store.myNodes = myNodes;
        store.points = userInfo.points;

        
        this.setState({
            stats: {
                current: myNodes.length, 
                points: userInfo.points, 
                rank: store.rank, // TODO FIX
            }, 
            nodes: myNodes,
            cardId: cardId,
        });
    }

    async componentDidMount() {
        store.leaderboard = await getLeaderboard();
        await this.updateUserInfo();
    }

    async handleSignOut(){
        await AsyncStorage.removeItem('jwt'); // TODO error handling
        await AsyncStorage.removeItem('uid');
        try {
            await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut();
            this.setState({ user: null }); // Remember to remove the user from your app's state as well
        } catch (error) {
            console.error(error);
        }
        this.props.navigation.navigate('LoginScreen');
    }
	render() {
		return (
            <View style={{flex: 1}}>
                <ScrollView style={{backgroundColor: '#2b3d53'}}>
                    <View style={styles.scrollColor} /> 
                    <View style={styles.container}>
                        <View style={styles.header}>
                            <AvatarImage isEditing={this.state.isEditing}/>
                            <Text style={styles.username}>{this.state.username.toUpperCase()}</Text>
                        </View>
                        
                        <View style={[styles.content, this.state.isEditing ? {backgroundColor:'#2c532b'} : null]}>
                            <StatsBox stats={this.state.stats}/>
                            <View style={styles.paddedContent}>
                                <View style={{height: 1, width: '100%', backgroundColor: 'black', marginBottom: 25}}></View>
                                <IdentifierBox colors={this.state.identifier} containercolor={'transparent'} isEditing={this.state.isEditing}/>

                                <Text style={[styles.zoneListLabel, {marginTop: 25}]}>Controlled zones</Text>
                                <ZoneList zones={this.state.nodes.map(node => {return node.name})} />
                                
                                <RoundedButton
                                    backgroundColor='#23A6D5'
                                    title={this.state.isEditing ? 'Save' : 'Edit profile'} 
                                    width={100}
                                    onPress={() => {this.setState({isEditing:!this.state.isEditing})}}
                                    style={{marginTop: 35}}
                                />
                                <RoundedButton
                                    backgroundColor='#ff5555'
                                    title='Log out' 
                                    width={100}
                                    onPress={() => this.handleSignOut()}
                                    style={{marginTop: 35}}
                                />
                            </View>
                        </View>
                    </View>
                </ScrollView>
                <Navbar navigate={this.props.navigation.navigate} active={'profile'} />
            </View>
		);
	}
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    scrollColor: {
        backgroundColor: 'white',
        height: spacerSize,
        position: 'absolute',
        top: -spacerSize,
        left: 0,
        right: 0,
    },
    paddedContent: {
        width: '100%',
        alignItems: 'center',
        paddingLeft: 25,
        paddingRight: 25,
    },
    header: {
        flex: 1,
        paddingTop: 30,
        paddingBottom: 35,   // prev: 35
        backgroundColor: 'white',
        alignItems: 'center',
        width: '100%',
    },
    avatar: {
        width: 150,
        height: 150,
        borderRadius: 75,
    },
    avatarSmall: {
        width: '100%',
        height: '100%',
        borderRadius: 100,
    },
    avatarContainer: {
        width: 150, 
        height: 150,
    },
    avatarContainerSmall: {
        width: 100,
        height: 100,
        margin: 10,
    },
    avatarOverlay: {
        backgroundColor: 'transparent',
    },
    username: {
        marginTop: 20,
        fontSize: 32,
        textAlign: 'center',
        color: '#2b3d53',
    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#2b3d53',
        width: '100%',
        paddingBottom: 35,
    },
    zoneListLabel: {
        color:'white', 
        width: '100%', 
        marginBottom: 15, 
        marginLeft: 20, 
        marginTop: 50
    },
    editingProfile:{
        textAlignVertical:'bottom',
        fontSize:28,
        marginBottom:5,
        color:'#00bb00',
        textShadowOffset:{
            width:1,
            height:1,
        },
        textShadowColor:'#000000',

    },
});

/** #737373 */
/** <Text style={{color:'white', width: '100%', marginBottom: 15, marginLeft: 20}}>Identifier</Text> */
