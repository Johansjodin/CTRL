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
export async function getNodesBy(userId) {
    let response = await fetch(
        'https://api.ctrl.nu/nodes/'+userId,
    );
    let responseJson = await response.json();
    return responseJson;
}

export async function getUser(userId) {
    let response = await fetch(
        'https://api.ctrl.nu/users/'+userId
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
    store.points = responseJson.user.points;
    if (JSON.stringify(responseJson.user.colors) == '[]') { // TODO Make a better check! (why string?)
        await setColor(responseJson.user.id, responseJson.token, ['#001100', '#002200', '#003300', '#004400', '#005500'])
    }
    await SecureStore.setItemAsync('uid', responseJson.user.id);
    await SecureStore.setItemAsync('jwt', JSON.stringify(responseJson.token));
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
    store.pointw = responseJson.user.points;
    await SecureStore.setItemAsync('uid', responseJson.user.id);
    await SecureStore.setItemAsync('jwt', JSON.stringify(responseJson.token));
}

export async function signInWithGoogleAsync() {
    try {
        const result = await Expo.Google.logInAsync({
            androidClientId: "1091474779129-q0tspv2qechbs5mfmlhjpbortov1s1a2.apps.googleusercontent.com", // TODO move to env (or endpoint or something)
            iosClientId: "1091474779129-vuhouiv4npnn5makvj0ma5tgri9gjm4b.apps.googleusercontent.com",
            scopes: ['profile'],
        });

        if (result.type === 'success') 
            return result.idToken;

        return {cancelled: true}
    } catch (e) {
        console.log(e);
        return { error: e }
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
    let response = await fetch('https://api.ctrl.nu/users/'+userId+'/colors', {
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
    let responseJson = await response.json();
    return responseJson;
}
export async function setImage(userId, tokenId, image){
    let response = await fetch('https://api.ctrl.nu/users/'+userId+'/image', {
        method:'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + tokenId,
        },
        body: JSON.stringify({
            'avatar': image,
        })
    });
    let responseJson = await response.json();
    return responseJson;
}
export async function getLeaderboard(userId) {
    let response = await fetch(
        'https://api.ctrl.nu/nodes/leaderboards',
    );
    let responseJson = await response.json();
    return responseJson;
}