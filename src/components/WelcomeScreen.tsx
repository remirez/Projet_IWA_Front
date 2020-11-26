import { Box, Button, Heading } from 'grommet';
import { FormNext } from 'grommet-icons';
import React from 'react';
import { Link } from 'react-router-dom';

export default () => {
    return (
        <Box>
            <Heading>Tous contre le Covid!</Heading>
            <Box direction="row" justify="center" gap="large">
                <Link to="/login">
                    <Button label="Connexion" hoverIndicator icon={<FormNext />} />
                </Link>
                <Link to="/createAccount">
                    <Button primary label="Inscription" hoverIndicator icon={<FormNext />} />
                </Link>
            </Box>
        </Box>
    );
};