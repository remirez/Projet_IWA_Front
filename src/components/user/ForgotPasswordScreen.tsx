import { Box, Button, Form, FormField, Heading, TextInput } from 'grommet';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { forgotPassword } from '../../state/user';

export default () => {
    const dispatch = useDispatch();
    const [ username, setUsername ] = useState( '' );

    return (
        <Box animation={{ type: "slideLeft", duration: 300 }
        }>
            <Heading>Mot de passe oublié ?</Heading>
            <Form
                onSubmit={() => { dispatch( forgotPassword( { username, email: '', firstName: '', lastName: '', phoneNumber: '' } ) ); }}
                onReset={() => { setUsername( '' ); }}
            >
                <FormField name="username" label="Pseudo">
                    <TextInput id="text-input-username" name="username" value={username} onChange={ev => setUsername( ev.target.value )} />
                </FormField>
                <Box direction="row" justify="center" gap="large">
                    <Button type="submit" primary label="Envoyer" disabled={username === ''} />
                    <Button type="reset" label="Reset" />
                </Box>
            </Form>
        </Box >
    );
};