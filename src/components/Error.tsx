import { Box, Layer, Text } from 'grommet';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getErrorMsg } from '../globals';

import { error as user, removeError as removeErrorUser } from '../state/user';
import { error as location, removeError as removeErrorLocation } from '../state/location';

export default () => {
    const errorUser = useSelector( user );
    const errorLocation = useSelector( location );
    const dispatch = useDispatch();

    return (
        <Box>
            { ( errorUser || errorLocation ) && (
                <Layer
                    responsive={false}
                    animation="slide"
                    onEsc={() => dispatch( errorUser ? removeErrorUser() : removeErrorLocation() )}
                    onClickOutside={() => dispatch( errorUser ? removeErrorUser() : removeErrorLocation() )}
                >
                    <Box pad="medium" background="status-error">
                        <Text>{getErrorMsg( errorUser ? errorUser : errorLocation! )}</Text>
                    </Box>
                </Layer> )}
        </Box> );
};
