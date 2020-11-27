import { Box, Button, Form, FormField, Heading, Paragraph, TextInput } from 'grommet';
import { FormNext } from 'grommet-icons';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { forgotPassword, success } from '../../state/user';
import { UserSuccessTypes } from '../../state/user/types';

export default () => {
    const dispatch = useDispatch();
    const [ username, setUsername ] = useState( '' );
    const emailSent = useSelector( success );

    console.log( emailSent );
    return (
        <Box>
            { emailSent !== UserSuccessTypes.FORGOT_EMAIL ?
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
                :
                <Box align="center" justify="center" gap="large" animation={{ type: "slideLeft", duration: 300 }}>
                    <Heading>Informations envoyées !</Heading>
                    <Paragraph>Veuillez vérifier votre boite mail pour votre nouveau mot de passe.</Paragraph>
                    <Link to="/">
                        <Button primary label="Retour à l'accueil" hoverIndicator icon={<FormNext />} />
                    </Link>
                </Box>
            }
        </Box>
    );
};