import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { stat } from "fs";
import appconfig from "../../appconfig";
import { isFulfilledAction, isPendingAction, isRejectedAction } from "../../globals";
import { RootState } from "../store";
import { LocationState, LocationSuccessTypes, LocationType } from "./types";


export const sendLocation = createAsyncThunk<{ success: LocationSuccessTypes; }, LocationType>( 'location/sendLocation',
    async ( location, thunkAPI ) => {
        const response = await axios.post( `${ appconfig.baseUrl }/location`, { ...location } )
            .then( response => response.data )
            .catch( err => { console.log( err ); return { type: err.message }; } );
        if ( response.type === LocationSuccessTypes.LOCATION_SEND )
            return response.type;
        else return thunkAPI.rejectWithValue( response.type );
    } );


const initialState: LocationState = {
    success: undefined,
    loading: false,
    error: undefined
};

const locationSlice = createSlice( {
    name: 'location',
    initialState,
    reducers: {
        removeError: ( state ) => {
            state.error = undefined;
        }
    },
    extraReducers: builder => {
        builder
            .addCase( sendLocation.fulfilled, ( state, action ) => {
                console.log( action.type );
            } )
            .addMatcher( isPendingAction( "location/" ), ( state, action ) => {
                console.log( action.type );
                state.loading = true;
            } )
            .addMatcher( isRejectedAction( "location/" ), ( state, action ) => {
                console.log( action.type );
                state.loading = false;
                state.error = action.payload;
            } )
            .addMatcher( isFulfilledAction( "location/" ), ( state, action ) => {
                console.log( action.type );
                state.loading = false;
                state.success = action.payload.success;
            } );
    }

} );

const locationReducer = locationSlice.reducer;

export const { removeError } = locationSlice.actions;

export const success = ( state: RootState ) => state.location.success;

export const loading = ( state: RootState ) => state.location.loading;

export const error = ( state: RootState ) => state.location.error;

export default locationReducer;
