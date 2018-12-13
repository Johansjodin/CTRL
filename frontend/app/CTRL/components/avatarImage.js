import React from 'react';
import Dialog, {DialogContent} from "react-native-popup-dialog/src";
import { store } from "./store";
import { setImage } from "../api/api";
import { SecureStore } from 'expo';
import {Avatar} from "react-native-elements";
import { StyleSheet, TouchableOpacity } from "react-native";
const pictureLib = ['https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg', 'https://deltro.jp/images/img_freeface00.jpg', 'https://www.maybelline.co.nz/~/media/Images/MNY/en_US/Home/Products/Face/Foundation/Fit-Me-Shine-Free-Foundation/fit-me-stick_model-shot.jpg','https://static.turbosquid.com/Preview/000153/503/D9/free-asian-female-face-3d-model_D.jpg'];

export class AvatarImage extends React.Component{
    constructor(props){
        super(props);
        this.state={visible:false};
        this.showPicturesDialog = this.showPicturesDialog.bind(this);
        this.setPicture = this.setPicture.bind(this);
        this.closePicturesDialog = this.closePicturesDialog.bind(this);
    }

    async showPicturesDialog() {
        if (this.props.isEditing) {
            await this.setState({visible: true});
        }
    }
    async setPicture(picture){
        store.pic = pictureLib[picture];
        this.forceUpdate();
    }
    async closePicturesDialog(){
        let tokenId = await SecureStore.getItemAsync('jwt');
        await setImage(store.uid, tokenId, store.pic);
        await this.setState({visible:false});
    }

    render() {
        return (
            <TouchableOpacity onPress={() => {this.showPicturesDialog()}}>
                <Avatar
                    avatarStyle={styles.avatar}
                    containerStyle={styles.avatarContainer}
                    overlayContainerStyle={styles.avatarOverlay}
                    source={{uri: store.pic}}
                    activeOpacity={0.7}
                />
                <Dialog
                    visible={this.state.visible}
                    onTouchOutside={() => {this.closePicturesDialog(); }}
                >
                    <DialogContent
                        style={styles.content}>
                        {pictureLib.map((url, index) => (
                            <TouchableOpacity style={styles.avatarContainerSmall} onPress={() => {this.setPicture(index)}} key={index}>
                                <Avatar
                                    avatarStyle={styles.avatarSmall}
                                    containerStyle={styles.avatarContainerSmall}
                                    overlayContainerStyle={styles.avatarOverlay}
                                    source={{uri: url}}
                                    activeOpacity={0.7}
                                />
                            </TouchableOpacity>
                        ))}
                    </DialogContent>
                </Dialog>
            </TouchableOpacity>
        );
    }
}
const styles = StyleSheet.create({
    content : {
        width:300,
        height:300,
        padding:20,
        flexDirection:'row',
        flexWrap: 'wrap',
        alignItems:'flex-start',
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
});
