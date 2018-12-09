import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Text, Avatar } from 'react-native-elements';
import Navbar from '../components/navbar';
import { RoundedButton } from '../components/roundedButton';
import { StatsBox } from '../components/statsBox';
import { ZoneList } from '../components/zoneList';
import { IdentifierBox } from '../components/identifierBox';
import { store } from '../components/store';
import { getNodes, getUser } from '../api/api'
import { SecureStore } from 'expo'
const spacerSize = 1000;

export default class ProfileScreen extends React.Component {
    
    constructor(props) {
        super(props);
        //if(!store.hasOwnProperty('myNodes')){ store.myNodes = []; }
        if(!store.hasOwnProperty('username')){ console.error(this.constructor.name+'::Error reading username from store.')}
        if(!store.hasOwnProperty('colors')){ console.error(this.constructor.name+'::Error reading colors from store.')}
        this.state = {
            username: store.username,
            stats: {
                current: 0,
                points: 0,  
                rank: 7,
            },
            nodes: [],
            identifier: store.colors, //['#c62828', '#6a1b9a', '#283593', '#0277bd', '#00695c'],
        },
        this.handleSignOut = this.handleSignOut.bind(this);
    }

    async updateUserInfo(){
        /*let nodes = await getNodes();
        let myNodes = nodes.filter(node => {
            return node.owner === store.uid;
        });

        let userInfo = await getUser(store.uid);*/

        //store.myNodes = myNodes;
        
        //this.setState({stats: {current: myNodes.length, points: userInfo.points}, nodes: myNodes});
        store.rank = 1;
        if (!store.hasOwnProperty('rank')) // temp maybe
            store.rank = 1;

        await this.setState({
            stats: {
                current: store.myNodes.length, 
                points: store.points,
                rank: store.rank,
            }, 
            nodes: store.myNodes
        });
    }

    async componentDidMount() {
        await this.updateUserInfo();
    }

    handleSignOut(){
        SecureStore.deleteItemAsync('jwt');
        SecureStore.deleteItemAsync('uid');
        this.props.navigation.navigate('LoginScreen')
    }

	render() {
		return (
            <View style={{flex: 1}}>
                <ScrollView style={{backgroundColor: '#2b3d53'}}>
                    <View style={styles.scrollColor} /> 
                    <View style={styles.container}>
                        <View style={styles.header}>
                            <Avatar
                                avatarStyle={styles.avatar}
                                containerStyle={styles.avatarContainer}
                                overlayContainerStyle={styles.avatarOverlay}
                                source={{uri: "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg"}}
                                activeOpacity={0.7}
                            />
                            <Text style={styles.username}>{this.state.username.toUpperCase()}</Text>
                        </View>
                        
                        <View style={styles.content}>
                            <StatsBox stats={this.state.stats}/>
                            <View style={styles.paddedContent}>
                                <View style={{height: 1, width: '100%', backgroundColor: 'black', marginBottom: 25}}></View>
                            
                                <IdentifierBox colors={this.state.identifier} containercolor={'transparent'}/>

                                <Text style={[styles.zoneListLabel, {marginTop: 25}]}>Controlled zones</Text>
                                <ZoneList zones={this.state.nodes.map(node => {return node.name})} />

                                <Text style={styles.zoneListLabel}>Previously controlled zones</Text>
                                <ZoneList zones={this.state.nodes.map(node => {return node.name})} />

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
        paddingBottom: 35,
        backgroundColor: 'white',
        alignItems: 'center',
        width: '100%',
    },
    avatar: {
        width: 150, 
        height: 150, 
        borderRadius: 75,
    },
    avatarContainer: {
        width: 150, 
        height: 150,
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
});

/** #737373 */
/** <Text style={{color:'white', width: '100%', marginBottom: 15, marginLeft: 20}}>Identifier</Text> */