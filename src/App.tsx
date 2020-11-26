import React, { useEffect, useLayoutEffect } from 'react';
import { Box, Grommet } from 'grommet';
import { BrowserRouter as Router, Redirect, Route, Switch, useHistory } from 'react-router-dom';
import LoginScreen from './components/user/LoginScreen';
import WelcomeScreen from './components/WelcomeScreen';
import CreateAccountScreen from './components/user/CreateAccountScreen';
import Navbar from './components/Navbar';
import MainScreen from './components/MainScreen';
import UserError from './components/Error';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { checkAccess, loggedIn } from './state/user';
import ConfirmAccountScreen from './components/user/ConfirmAccountScreen';
import UserLoading from './components/Loading';
import { Colors } from './globals';
import ForgotPasswordScreen from './components/user/ForgotPasswordScreen';
import { loading } from './state/location';

const theme = {
    global: {
        colors: { ...Colors },
        font: {
            family: 'Roboto',
            size: '18px',
            height: '20px',
        },
    },
};



export default () => {
    const dispatch = useDispatch();
    const connected = useSelector( loggedIn );

    useLayoutEffect( () => {
        dispatch( checkAccess() );
    }, [] );


    return (
        <Router>
            <Grommet {...{ theme }} full>
                <Box fill >
                    <Navbar />
                    <Box direction='row' flex overflow={{ horizontal: 'hidden' }}>
                        <Box flex align='center' justify='center'>
                            <UserLoading />
                            <UserError />
                            <Switch >
                                <Route exact path="/" component={!connected ? WelcomeScreen : MainScreen} />
                                {/* <Route path="/welcome" component={WelcomeScreen} /> */}
                                <Route path="/login" component={LoginScreen} />
                                <Route path="/createAccount" component={CreateAccountScreen} />
                                <Route path="/confirmAccount/:token" component={ConfirmAccountScreen} />
                                <Route path="/forgot" component={ForgotPasswordScreen} />
                            </Switch>
                        </Box>
                    </Box>
                </Box>
            </Grommet >
        </Router>
    );
};

