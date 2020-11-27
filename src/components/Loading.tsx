import { Box, Layer, Text } from 'grommet';
import React from 'react';
import { useSelector } from 'react-redux';

import { loading as user } from '../state/user';
import { loading as location } from '../state/location';

export default () => {

    const inProgressUser = useSelector( user );
    const inProgressLocation = useSelector( location );

    return (
        <Box>
            {( inProgressLocation || inProgressUser ) && (
                <Layer
                    responsive={false}
                    animation="slide"
                    position="top"
                    plain>
                    <Box pad={{ horizontal: "xlarge", vertical: 'small' }} background="brand2" round="large" margin={{ vertical: "xlarge" }} elevation="large">
                        <Text size="medium">Loading</Text>
                    </Box>
                </Layer> )
            }
        </Box>
    );
};
