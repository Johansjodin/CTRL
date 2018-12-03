import React from 'react';

export async function getNodes() {
    try {
        let response = await fetch(
            'https://api.ctrl.nu/nodes/',
        );
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
        console.error(error);
    }
}