import React from 'react';
import { Box, Heading, Text } from 'grommet';
import { useDispatch, useSelector } from 'react-redux';
import { currentUser, loggedIn, logout } from '../state/user';
import { PowerShutdown } from 'grommet-icons';

const AppBar = ( props: any ) => (
    <Box
        tag='header'
        direction='row'
        align='center'
        justify='between'
        background='brand'
        pad={{ left: 'medium', right: 'small', vertical: 'small' }}
        // elevation='medium'
        style={{ zIndex: '1' }}
        {...props}
    />
);

export default () => {

    const connected = useSelector( loggedIn );
    const user = useSelector( currentUser );
    const dispatch = useDispatch();

    return (
        <AppBar>
            <Heading level='3' margin='none'>
                Alerte Covid !
            </Heading>
            {connected &&
                <Box direction="row" justify="center" align="center" gap="medium">
                    <Text>{`Bonjour, ${ user?.firstName }`}</Text>
                    <Box
                        responsive={false}
                        hoverIndicator={true}
                        background="brand2"
                        round="full"
                        pad="xsmall"
                        onClick={() => dispatch( logout() )}>
                        <PowerShutdown />
                    </Box>
                </Box>}
        </AppBar> );
};
