import React from 'react';
import { RoundedBox } from './roundedBox';
import { IdentifierRow } from './identifierRow';
import Dialog, {DialogContent} from "react-native-popup-dialog/src";
import { ColorPicker, TriangleColorPicker, fromHsv, toHsv} from "react-native-color-picker";
import { store } from "./store";
import { setColor } from "../api/api";
import { SecureStore } from 'expo';

export class IdentifierBox extends React.Component{
    constructor(props){
        super(props);
        this.state={visible:false};
        this.showColorDialog = this.showColorDialog.bind(this);
        this.closeColorDialog = this.closeColorDialog.bind(this);
        this.setColor = this.setColor.bind(this);
    }
    showColorDialog(index) {
        if (this.props.isEditing) {
            this.setState({visible: true, editingColor:index});
        }
    }
    setColor(color){
        store.colors[this.state.editingColor] = fromHsv(color);
        this.forceUpdate();
    }
    async closeColorDialog(){
        let tokenId = await SecureStore.getItemAsync('jwt');
        await setColor(store.uid, tokenId, store.colors);
        this.setState({visible:false})
    }
    render() {
        return (
            <RoundedBox color={this.props.containercolor ? this.props.containercolor : 'white'} style={{flex: 0}}>
                <IdentifierRow colors={this.props.colors} onPress={(index) => this.showColorDialog(index)}/>
                <Dialog
                    visible={this.hasOwnProperty('state') ? this.state.visible : false}
                    onTouchOutside={() => { this.closeColorDialog(); }}
                >
                    <DialogContent
                        style={{width:300, height:300}}>
                        <TriangleColorPicker
                            defaultColor={store.colors[this.state.editingColor]}
                            onColorChange={color => this.setColor(color)}
                            style={{flex:1}}
                        />
                    </DialogContent>
                </Dialog>
            </RoundedBox>
        );
    }
}
