import React from 'react';
import {StyleSheet, View, TouchableOpacity, ScrollView} from 'react-native';
import { Text } from 'react-native-elements';
import Navbar from "../components/navbar";
import NfcManager, { ByteParser, NfcTech } from 'react-native-nfc-manager';
import { AsyncStorage } from "react-native";
import { store } from '../components/store';
import { setCard } from '../api/api'

const KeyTypes = ['A', 'B'];

export default class CaptureScreen extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            supported: false,
            enabled: false,
            isDetecting: false,
            mode: 'read',
            keyAorB: KeyTypes[1], // 'B'
            keyToUse: 'FFFFFFFFFFFF',
            sector: 0,
            tag: null,
            sectorCount: null,
            blocksInSector: null,
            parsedText: null,
            firstBlockInSector: null,
            textToWrite: 'Hello, world!',
        };
    }

    componentDidMount() {
        NfcManager.isSupported(NfcTech.MifareClassic).then(supported => {
            this.setState({ supported });
            if (supported) {
                this._startNfc();
            }
        });
      }
    
    componentWillUnmount() {
        if (this._stateChangedSubscription) {
            this._stateChangedSubscription.remove();
        }
    }

    nextScreen = async (cardId) => {
        console.log("next screen ", cardId);
        await AsyncStorage.setItem('cardId', cardId);
        let jwt = await AsyncStorage.getItem('jwt');
        await setCard(store.uid, jwt, cardId);
        this.props.navigation.navigate('ProfileScreen');
    }

    toggleRead = () => {
        if (this.state.isDetecting) {
            this._stopDetection();
            console.log("stop read");
            this.setState({isDetecting: false});
        } else {
            this._startDetection();
            console.log("start read");
            this.setState({isDetecting: true})
        }
    }

    _startDetection = () => {
        const cleanUp = () => {
            console.log("detection done, turning off");
            this.setState({ isDetecting: false });
            NfcManager.closeTechnology();
            NfcManager.unregisterTagEvent();
        };

        const read = () => {
            return NfcManager.mifareClassicGetBlockCountInSector(parseInt(this.state.sector))
            .then(blocksInSector => {
                this.setState({ blocksInSector });
            })
            .then(() =>
                NfcManager.mifareClassicReadSector(parseInt(this.state.sector)),
            )
            .then(tag => {
                let parsedText = ByteParser.byteToHexString(tag);
                this.setState({ parsedText });
            })
            .then(() =>
                NfcManager.mifareClassicSectorToBlock(parseInt(this.state.sector)),
            )
            .then(block => NfcManager.mifareClassicReadBlock(block))
            .then(data => {
                const parsedText = ByteParser.byteToString(data);
                this.setState({ firstBlockInSector: parsedText });
            })
        };

        const write = () => {
            return NfcManager.mifareClassicSectorToBlock(parseInt(this.state.sector))
                .then(block => {
                    // Create 1 block
                    let data = [];
                    for (let i = 0; i < NfcManager.MIFARE_BLOCK_SIZE; i++) {
                        data.push(0);
                    }
        
                    // Fill the block with our text, but don't exceed the block size
                    for (let i = 0; i < this.state.textToWrite.length && i < NfcManager.MIFARE_BLOCK_SIZE; i++) {
                        data[i] = parseInt(this.state.textToWrite.charCodeAt(i));
                    }
        
                    return NfcManager.mifareClassicWriteBlock(block, data);
                })
                .then(read)
        };
      
        this.setState({ isDetecting: true });
        NfcManager.registerTagEvent(tag => console.log(tag))
            .then(() => NfcManager.requestTechnology(NfcTech.MifareClassic))
            .then(() => NfcManager.getTag())
            .then(tag => {
                console.log(tag.id);
                this.nextScreen(tag.id);
                // TODO might wanna move this
                this.setState({ tag });
                return NfcManager.mifareClassicGetSectorCount();
            })
            .then(sectorCount => {
                this.setState({ sectorCount });
            })
            .then(() => {
                let sector = parseInt(this.state.sector);
                if (isNaN(sector)) {
                    this.setState({ sector: '0' });
                    sector = 0;
                }
      
                // Convert the key to a UInt8Array
                const key = [];
                for (let i = 0; i < this.state.keyToUse.length - 1; i += 2) {
                    key.push(parseInt(this.state.keyToUse.substring(i, i + 2), 16));
                }
        
                if (this.state.keyAorB === KeyTypes[0]) {
                    return NfcManager.mifareClassicAuthenticateA(sector, key);
                } else {
                    return NfcManager.mifareClassicAuthenticateB(sector, key);
                }
            })
            .then(() => { return this.state.mode === 'read' ? read() : write() })
            .then(cleanUp)
            .catch(err => {
                console.warn(err);
                cleanUp();
            });
    };

    _stopDetection = () => {
        NfcManager.cancelTechnologyRequest()
            .then(() => this.setState({ isDetecting: false }))
            .catch(err => console.warn(err));
    };
    
    _startNfc = () => {
        console.log("nfc started");
        NfcManager.start()
            .then(() => NfcManager.isEnabled())
            .then(enabled => this.setState({ enabled }))
            .catch(err => {
                console.warn(err);
                this.setState({ enabled: false });
            });
    };

    render() {
        return (
            <View style={{flex: 1}}>
                <View style={styles.container}>
                    <TouchableOpacity style={styles.circle} onPress={this.toggleRead} >
                        <Text style={styles.text}>{this.state.isDetecting ? 'Searching' : 'Scan'}</Text>
                    </TouchableOpacity>
                </View>
                <Navbar navigate={this.props.navigation.navigate} active={'capture'} />
            </View>
        );
    }
}

/*                <Text style={{ marginTop: 20 }}>{`Current tag JSON: ${JSON.stringify(this.state.tag)}`}</Text>
                <Text style={{ marginTop: 10, marginBottom: 20, fontSize: 18 }}>{`Parsed Text: ${this.state.parsedText}`}</Text>
*/

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#2b3d53',
    },
    circle: {
        width: 250,
        height: 250,
        borderRadius: 125,
        backgroundColor: '#ff5555',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: 'white',
        fontSize: 28,
    },
});