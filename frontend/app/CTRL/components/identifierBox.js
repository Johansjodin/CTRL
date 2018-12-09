import React from 'react';
import { RoundedBox } from './roundedBox';
import { IdentifierRow } from './identifierRow';

export const IdentifierBox = (props) => {
    return (
        <RoundedBox color={props.containercolor ? props.containercolor : 'white'} style={{flex: 0}}>
            <IdentifierRow colors={props.colors} />
            
        </RoundedBox>
    );
}
