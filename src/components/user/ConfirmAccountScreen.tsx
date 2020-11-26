import { Box, Button, Heading, Paragraph } from 'grommet';
import { FormNext } from 'grommet-icons';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { confirmEmail, loading } from '../../state/user';

export default ( { match }: RouteComponentProps<{ token?: string; }> ) => {
    const dispatch = useDispatch();
    const inProgress = useSelector( loading );

    useEffect( () => {
        match.params.token !== undefined && dispatch( confirmEmail( match.params.token ) );
    }, [ match.params.token ] );

    return (
        <Box animation={{ type: "slideLeft", duration: 300 }}>
            {inProgress ?
                <Paragraph>Nous confirmons votre compte</Paragraph>
                :
                <Box align="center" justify="center" animation={{ type: "slideLeft", duration: 300 }}>
                    <Heading>Votre compte est confirmé !</Heading>
                    <Link to="/login">
                        <Button primary label="Connexion" hoverIndicator icon={<FormNext />} />
                    </Link>
                </Box>
            }
        </Box>
    );

};
