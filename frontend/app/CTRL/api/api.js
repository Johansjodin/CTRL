import React from 'react';
import { SecureStore } from 'expo';
import { store } from '../components/store';

export async function getNodes() {
    let response = await fetch(
        'https://api.ctrl.nu/nodes/',
    );
    let responseJson = await response.json();
    return responseJson;
}

export async function signUp(tokenId, username) {
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

    store.uid = responseJson.user.id;
    store.username = responseJson.user.username;
    store.colors = responseJson.user.colors;
    if (JSON.stringify(responseJson.user.colors) == '[]') { // TODO Make a better check!
        await setColor(responseJson.user.id, responseJson.token, ['#001100', '#002200', '#003300', '#004400', '#005500'])
    }
    SecureStore.setItemAsync('jwt', responseJson.token);
    return responseJson;
}

export async function signIn(tokenId) {
    let response = await fetch('https://api.ctrl.nu/auth/sign_in', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + tokenId,
        },
    });
    let responseJson = await response.json();
    store.uid = responseJson.user.id;
    store.username = responseJson.user.username;
    store.colors = responseJson.user.colors;
    await SecureStore.setItemAsync('jwt', JSON.stringify(responseJson.token));
}

export async function signInWithGoogleAsync() {
    const result = await Expo.Google.logInAsync({
        androidClientId: "1091474779129-q0tspv2qechbs5mfmlhjpbortov1s1a2.apps.googleusercontent.com", // TODO move to env (or endpoint or something)
        iosClientId: "1091474779129-vuhouiv4npnn5makvj0ma5tgri9gjm4b.apps.googleusercontent.com",
        scopes: ['profile'],
    });

    if (result.type === 'success') {
        return result.idToken;
    } else {
        throw new Error('signInWithGoogleAsync failed.');
        return {cancelled: true};
    }
}
export async function getColor(userId, tokenId) {
    let response = await fetch('https://api.ctrl.nu/users/'+userId+'/colors', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + tokenId,
        },
    });
    let responseJson = await response.json();
    return responseJson;
}
export async function setColor(userId, tokenId, colors) {
    await fetch('https://api.ctrl.nu/users/'+userId+'/colors', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + tokenId,
        },
        body: JSON.stringify({
            'colors': colors,
        }),
    });
}