import React from 'react';
//import { SecureStore } from 'expo';
import { AsyncStorage } from "react-native";
import { store } from '../components/store';
import { GoogleSignin, statusCodes } from 'react-native-google-signin';

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

export async function signUp(tokenId, username, userId) {
    console.log("signup: ", tokenId);
    console.log("signup username: ", username);
    console.log("signup: userId ", userId);
    let response = await fetch('https://api.ctrl.nu/auth/sign_up', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + tokenId,
        },
        body: JSON.stringify({
            'username': username,
            'userId': userId,
        }),
    });
    let responseJson = await response.json();
    console.log(responseJson);
    store.uid = responseJson.user.id;
    store.username = responseJson.user.username;
    store.points = responseJson.user.points;

    try {
        await AsyncStorage.setItem('uid', responseJson.user.id);
        await AsyncStorage.setItem('jwt', JSON.stringify(responseJson.token));
        console.log("sign in store success");
    } catch (error) {
        console.log("sign in store error: ", error);
    }
    //await SecureStore.setItemAsync('uid', responseJson.user.id);
    //await SecureStore.setItemAsync('jwt', JSON.stringify(responseJson.token));
    //return responseJson;
}

export async function signIn(tokenId, userId) {
    console.log("tokenid: ", tokenId);
    let response = await fetch('https://api.ctrl.nu/auth/sign_in', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + tokenId,
        },
        body: JSON.stringify({
            'userId': userId,
        }),
    });

    let responseJson = await response.json();

    console.log('responseJson signin: ', responseJson);

    store.pic = responseJson.user.image;
    store.uid = responseJson.user.id;
    store.username = responseJson.user.username;
    store.colors = responseJson.user.colors;
    store.pointw = responseJson.user.points;
    store.token = JSON.stringify(responseJson.token);

    try {
        await AsyncStorage.setItem('uid', responseJson.user.id);
        await AsyncStorage.setItem('jwt', JSON.stringify(responseJson.token));
        console.log("sign in store success");
    } catch (error) {
        console.log("sign in store error: ", error);
    }

      //console.log(JSON.stringify(responseJson.token));
    
    //await SecureStore.setItemAsync('uid', responseJson.user.id);
    //await SecureStore.setItemAsync('jwt', JSON.stringify(responseJson.token));
}

export async function signInWithGoogleAsync() {
    /*try {
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
    }*/
    try {
        await GoogleSignin.hasPlayServices();
        const userInfo = await GoogleSignin.signIn();
        return userInfo;
      } catch (error) {
        if (error.code === statusCodes.SIGN_IN_CANCELLED) {
          return {cancelled: 'cancelled'};// TODO FIXA DEN HÄR SKITEN
        } else if (error.code === statusCodes.IN_PROGRESS) {
          // operation (f.e. sign in) is in progress already
          return {error: 'in progress'}; // TODO FIXA DEN HÄR SKITEN
        } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            return {error: 'play services not available'};// TODO FIXA DEN HÄR SKITEN
          // play services not available or outdated
        } else {
          // some other error happened
          console.log(error);
          return {error: 'other error'};// TODO FIXA DEN HÄR SKITEN
        }
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
            'Authorization': 'Bearer ' + JSON.parse(tokenId),
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
            'Authorization': 'Bearer ' + JSON.parse(tokenId),
        },
        body: JSON.stringify({
            'avatar': image,
        }),
    });
    let responseJson = await response.json();
    return responseJson;
}

export async function setCard(userId, tokenId, cardId) {
    let response = await fetch('https://api.ctrl.nu/users/'+userId+'/card', {
        method:'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + JSON.parse(tokenId),
        },
        body: JSON.stringify({
            'cardId': cardId,
        }),
    });
    let responseJson = await response.json();
    console.log(responseJson);
    return responseJson;
}

export async function getLeaderboard(userId) {
    let response = await fetch(
        'https://api.ctrl.nu/leaderboards',
    );
    let responseJson = await response.json();
    console.log(responseJson);
    return responseJson;
}