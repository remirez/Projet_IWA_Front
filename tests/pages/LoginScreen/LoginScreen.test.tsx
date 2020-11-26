import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import LoginScreen from '../../../src/components/user/LoginScreen';
import { shallow } from '../../setup/test-setup';
import { Box, Form, Heading } from 'grommet';
import { shallowToJson } from 'enzyme-to-json';

const mockStore = configureStore();

describe( '<LoginScreen />', () => {
    let wrapper: any;
    let form: any;

    it( 'defines the component', () => {
        wrapper = shallow(
            <Provider store={mockStore()}>
                <LoginScreen />
            </Provider>,
        );
        expect( wrapper ).toBeDefined();
    } );

    it( 'should match the snapshot', () => {
        expect( shallowToJson( wrapper ) ).toMatchSnapshot();
    } );

    it( 'renders Box component', () => {
        expect( wrapper.find( Box ).first() ).toBeDefined();
    } );
    it( 'renders Heading component', () => {
        expect( wrapper.find( Heading ).first() ).toBeDefined();
    } );

    it( 'renders Form component', () => {
        form = wrapper.find( Form ).first();
        expect( form ).toBeDefined();
    } );

    describe( 'defines login form fields', () => {
        it( 'renders username form field', () => {
            const usernameField = form.find( '[name="username"]' );
            expect( usernameField ).toBeDefined();
            expect( usernameField.find( '[name="username"]' ) ).toBeDefined();
        } );

        it( 'renders password form field', () => {
            const passwordField = form.find( '[name="password"]' );
            expect( passwordField ).toBeDefined();
            expect( passwordField.find( '[name="username"]' ) ).toBeDefined();
        } );
    } );

    describe( 'defines login form buttons', () => {
        it( 'renders submit button', () => {
            const submitButton = form.find( '[type="submit"]' );
            expect( submitButton ).toBeDefined();

        } );

        it( 'renders reset button', () => {
            const resetButton = form.find( '[type="reset"]' );
            expect( resetButton ).toBeDefined();
        } );


    } );



} );