import { Box, Layer,Text } from 'grommet';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getErrorMsg } from '../globals';

import { error, removeError } from '../state/user';

export default () => {
    const errorType = useSelector( error );
    const dispatch = useDispatch();

    return (
        <Box>
            { errorType && <Layer
                animation="slide"
                onEsc={() => dispatch( removeError() )}
                onClickOutside={() => dispatch( removeError() )}
            >
                <Box pad="medium" background="status-error">
                    <Text>{getErrorMsg( errorType )}</Text>
                </Box>
            </Layer>}
        </Box> );
};
