import { Box, Form, FormField, TextInput, Button, Heading, Anchor } from 'grommet';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { loggedIn, login } from '../../state/user';

export default () => {
    const [ username, setUsername ] = useState( '' );
    const [ password, setPassword ] = useState( '' );
    const dispatch = useDispatch();

    const history = useHistory();
    const connected = useSelector( loggedIn );

    useEffect( () => {
        if ( connected )
            history.push( "/" );
    }, [ connected ] );

    return (
        <Box animation={{ type: "slideLeft", duration: 300 }
        }>
            <Heading>Connexion</Heading>
            <Form
                onSubmit={() => { dispatch( login( { username, password } ) ); }}
                onReset={() => { setUsername( '' ); setPassword( '' ); }}
            >
                <FormField name="username" label="Pseudo">
                    <TextInput id="text-input-username" name="username" value={username} onChange={ev => setUsername( ev.target.value )} />
                </FormField>
                <FormField name="password" label="Mot de passe">
                    <TextInput id="text-input-password" name="password" value={password} onChange={ev => setPassword( ev.target.value )} type="password" />
                </FormField>
                <Link to='/forgot' >
                    <Anchor label="Mot de passe oublié ?" margin={{ vertical: "medium" }} />
                </Link>
                <Box direction="row" justify="center" gap="large" margin={{ vertical: "medium" }}>
                    <Button type="submit" primary label="Connexion" disabled={username === '' || password === ''} />
                    <Button type="reset" label="Reset" />
                </Box>
            </Form>
        </Box > );
};
