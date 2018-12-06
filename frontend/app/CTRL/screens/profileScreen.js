import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Text, Avatar } from 'react-native-elements';
import Navbar from '../components/navbar';
import { RoundedButton } from '../components/roundedButton';
import { StatsBox } from '../components/statsBox';
import { ZoneList } from '../components/zoneList';
import { IdentifierBox } from '../components/identifierBox';
import { store } from '../components/store';
import { getNodes } from '../api/api'
import { SecureStore } from 'expo'
const spacerSize = 1000;

export default class ProfileScreen extends React.Component {
    
    constructor(props) {
        super(props);
        if(!store.hasOwnProperty('myNodes')){ store.myNodes = []; }
        if(!store.hasOwnProperty('allNodes')){ store.allNodes = []; }
        if(!store.hasOwnProperty('username')){ console.error(this.constructor.name+'::Error reading username from store.')}
        if(!store.hasOwnProperty('colors')){ console.error(this.constructor.name+'::Error reading username from store.')}
        this.state = {
            username: store.username,
            stats: {
                current: 5,
                total: 17,
                points: 3200,  
            },
            rank: 7,
            categories: {
                current: store.myNodes,
                total: store.allNodes,
            },
            identifier: store.colors, //['#c62828', '#6a1b9a', '#283593', '#0277bd', '#00695c'],
        },
        this.handleSignOut = this.handleSignOut.bind(this);
    }
    async updateNodes(){
        let nodes = await getNodes();
        let allNodes = [], myNodes = [];
        for(let i=0; i<nodes.length; i++){
            allNodes.push(nodes[i].name);
            if(nodes[i].id == store.uid){
                myNodes.push(nodes[i].name);
            }
        }
        store.myNodes = myNodes;
        store.allNodes = allNodes;
        await this.setState({categories: { current: myNodes, total: allNodes}} );
    }
    async componentDidMount() {
        this.updateNodes();
    }

    handleSignOut(){
        SecureStore.deleteItemAsync('jwt');
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
                            <Text style={styles.username}>{this.state.username}</Text>
                        </View>
                        
                        <View style={styles.content}>
                            <StatsBox stats={this.state.stats}/>
                            
                            <View style={styles.rank}>
                                <Text style={styles.rankNumber}>7</Text>
                                <Text style={styles.rankLabel}>RANK</Text>
                            </View>

                            <View style={styles.paddedContent}>

                                <Text style={{color:'white', width: '100%', marginBottom: 15, marginLeft: 20}}>Identifier</Text>
                                <IdentifierBox colors={this.state.identifier} />

                                <Text style={{color:'white', width: '100%', marginBottom: 15, marginLeft: 20, marginTop: 50,}}>Controlled zones</Text>
                                {store.myNodes.length==0 ? (
                                    <ZoneList empty={true} zones={['']} />
                                ) : (
                                    <ZoneList empty={false} zones={this.state.categories.current} />
                                )}

                                
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
        paddingLeft: 35,
        paddingRight: 35,
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
        fontSize: 28,
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
    rank: {
        padding: 15,
        marginTop: 0,
        marginBottom: 50,
        alignItems: 'center',
    },
    rankNumber: {
        fontSize: 70,
        color: '#218b00',
    },
    rankLabel: {
        color: 'white',
    }
});

/** #737373 */