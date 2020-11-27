import { AnyAction } from "@reduxjs/toolkit";
import { ResponsiveContext } from "grommet";
import React from "react";
import { useEffect, useState } from "react";
import appconfig from "../appconfig";
import { User, UserErrorTypes, UserState } from "../state/user/types";

export type SliceActions<T> = {
    [ K in keyof T ]: T[ K ] extends ( ...args: any[] ) => infer A ? A : never;
}[ keyof T ];


export const hasPrefix = ( action: AnyAction, prefix: string ) =>
    action.type.startsWith( prefix );

export const isPending = ( action: AnyAction ) => action.type.endsWith( "/pending" );

export const isFulfilled = ( action: AnyAction ) => action.type.endsWith( "/fulfilled" );

const isRejected = ( action: AnyAction ) => action.type.endsWith( "/rejected" );

export const isPendingAction = ( prefix: string ) => (
    action: AnyAction
): action is AnyAction => {
    return hasPrefix( action, prefix ) && isPending( action );
};

export const isRejectedAction = ( prefix: string ) => (
    action: AnyAction
): action is AnyAction => {
    return hasPrefix( action, prefix ) && isRejected( action );
};

export const isFulfilledAction = ( prefix: string ) => (
    action: AnyAction
): action is AnyAction => {
    return hasPrefix( action, prefix ) && isFulfilled( action );
};

export const getErrorMsg = ( error: UserErrorTypes | string ) => {
    switch ( error ) {
        case UserErrorTypes.USER_NOT_EXIST:
            return "Le compte avec lequel vous essayez de vous connecter n'existe pas. Veuillez créer un compte si vous en avez pas un.";
        case UserErrorTypes.BAD_CONFIRMATION:
            return "Le code de confirmation est incorrect.";
        case UserErrorTypes.BAD_EMAIL:
            return "L'adresse mail n'est pas dans le bon format.";
        case UserErrorTypes.BAD_PHONE_NUMBER:
            return "Le numéro de téléphone n'est pas dans le bon format.";
        case UserErrorTypes.EMAIL_EXIST:
            return "Il y a déjà un compte rattaché a cette adresse mail.";
        case UserErrorTypes.EMAIL_NOT_CONFIRMED:
            return "Vous devez confirmer vous adresse mail avant de pouvoir vous connecter.";
        case UserErrorTypes.FIELD_NULL:
            return "Il y a un champ vide.";
        case UserErrorTypes.INCORRECT_PASSWORD:
            return "Le mot de passe est incorrect.";
        case UserErrorTypes.TOKEN_EXPIRED:
            return "Le code de confirmation est expiré. Veuillez créer un nouveau compte.";
        case UserErrorTypes.USER_EXIST:
            return "Ce pseudo est déjà utilisé.";
        default: return JSON.stringify( error );
    }
};

export const Colors = {
    brand: '#033F63',
    brand2: '#28666E',
    brand3: '#7C9885',
    brand4: '#B5B682',
    brand5: '#FEDC97'
};

export enum Status {
    SAFE = "SAFE",
    CONTACT = "CONTACT",
    COVID = "COVID"
}


// These are the ciphers/deciphers
const cipher = ( text: string ) => {
    let textToChars = ( text: any ) => text.split( '' ).map( ( c: any ) => c.charCodeAt( 0 ) );
    let byteHex = ( n: any ) => ( "0" + Number( n ).toString( 16 ) ).substr( -2 );
    let applySaltToChar = ( code: any ) => textToChars( process.env.REACT_APP_SALT ).reduce( ( a: any, b: any ) => a ^ b, code );

    return text.split( '' )
        .map( textToChars )
        .map( applySaltToChar )
        .map( byteHex )
        .join( '' );
};

const decipher = ( encoded: string ) => {
    let textToChars = ( text: any ) => text.split( '' ).map( ( c: any ) => c.charCodeAt( 0 ) );
    let applySaltToChar = ( code: any ) => textToChars( process.env.REACT_APP_SALT ).reduce( ( a: any, b: any ) => a ^ b, code );

    return encoded.match( /.{1,2}/g )!
        .map( hex => parseInt( hex, 16 ) )
        .map( applySaltToChar )
        .map( charCode => String.fromCharCode( charCode ) )
        .join( '' );
};


export const loadUser = () => {
    try {
        const serializedObject = localStorage.getItem( "user" );
        if ( serializedObject === null ) {
            return undefined;
        }
        const res = JSON.parse( decipher( serializedObject ) );
        return res as User;
    } catch ( e ) {
        console.log( e );
        return undefined;
    }
};

export const saveUser = ( user: User ) => {
    try {
        const serializedObject = cipher( JSON.stringify( user ) );
        localStorage.setItem( "user", serializedObject );
    } catch ( e ) {
        console.log( e );
    }
};

export const removeSavedUser = () => {
    try {
        localStorage.removeItem( "user" );
    } catch ( e ) {
        console.log( e );
    }
};

export const useResponsive = () => {
    return React.useContext( ResponsiveContext );
};