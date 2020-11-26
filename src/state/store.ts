import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import user from './user';
import location from './location';

/**
 * Combine reducers created manually or by createSlice to create a global state.
 * https://redux-toolkit.js.org/api/configureStore
 */
export const store = configureStore( {
    reducer: {
        user,
        location
    },
} );

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;