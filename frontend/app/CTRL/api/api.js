import React from 'react';
import { SecureStore } from 'expo';

export async function getNodes() {
    try {
        let response = await fetch(
            'https://api.ctrl.nu/nodes/',
        );
        let responseJson = response.json();
        return responseJson;
    } catch (err) {
        console.error(err);
    }
}

export async function signUp(tokenId, username) {
    console.log(tokenId);
    try {
        let response = await fetch('https://api.ctrl.nu/auth/sign_up', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + tokenId,
            }, 
            body: JSON.stringify({
                'username': username, 
            }),
        });

        let responseJson = await response.json();
        SecureStore.setItemAsync('jwt', responseJson.token);
        console.log(responseJson);

    } catch (err) {
        console.error(err); // TODO ERROR HANDLING
    }
}

export async function signIn(tokenId) {
    console.log("tokenid: " + tokenId);
    try {
        let response = await fetch('https://api.ctrl.nu/auth/sign_in', {
            method: 'POST',
            headers: {
                'Accept': 'application/json', 
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + tokenId,
            },    
        });
    
        let responseJson = await response.json();
        console.log(responseJson);
        await SecureStore.setItemAsync('jwt', responseJson.token);
        // RETURN jwt

    } catch (err) {
        console.error(err);
    }
}

export async function signInWithGoogleAsync() {
    try {
        const result = await Expo.Google.logInAsync({
            androidClientId: "1091474779129-q0tspv2qechbs5mfmlhjpbortov1s1a2.apps.googleusercontent.com", // TODO move to env (or endpoint or something)
            iosClientId: "1091474779129-vuhouiv4npnn5makvj0ma5tgri9gjm4b.apps.googleusercontent.com",
            scopes: ['profile'],
        });

        if (result.type === 'success') {
            //console.log(result);
            return result.idToken;
        } else {
            return {cancelled: true};
        }
    } catch(e) {
        return {error: true};
    }
}