import { Box, Button, Form, FormField, Heading, Paragraph, TextInput } from 'grommet';
import { FormNext } from 'grommet-icons';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createUser, success } from '../../state/user';
import { UserSuccessTypes } from '../../state/user/types';

export default () => {
    const [ username, setUsername ] = useState( '' );
    const [ firstName, setFirstName ] = useState( '' );
    const [ lastName, setLastName ] = useState( '' );
    const [ password, setPassword ] = useState( '' );
    const [ confirmPassword, setConfirmPassword ] = useState( '' );
    const [ email, setEmail ] = useState( '' );
    const [ phoneNumber, setPhoneNumber ] = useState( '' );
    const created = useSelector( success );

    const dispatch = useDispatch();

    return (
        <Box animation={{ type: "slideLeft", duration: 300 }} pad="large">
            {created === UserSuccessTypes.USER_CREATED ?
                <Box align="center" justify="center" gap="large" animation={{ type: "slideLeft", duration: 300 }}>
                    <Heading>Informations envoyées !</Heading>
                    <Paragraph>Veuillez vérifier votre boite mail pour confirmer votre compte.</Paragraph>
                    <Link to="/">
                        <Button primary label="Retour à l'accueil" hoverIndicator icon={<FormNext />} />
                    </Link>
                </Box>
                :
                <Box margin="medium">
                    <Heading>Créez un compte</Heading>
                    <Form
                        onSubmit={() => {
                            dispatch( createUser( { user: { username, firstName, lastName, email, phoneNumber, userId: undefined }, password, confirmPassword } ) );
                        }}
                        onReset={() => {
                            setUsername( '' );
                            setPassword( '' );
                            setFirstName( '' );
                            setLastName( '' );
                            setConfirmPassword( '' );
                            setPhoneNumber( '' );
                            setEmail( '' );
                        }}>
                        <FormField name="username" label="Pseudo">
                            <TextInput id="text-input-username" name="username" value={username} onChange={ev => setUsername( ev.target.value )} />
                        </FormField>
                        <FormField name="firstName" label="Prénom">
                            <TextInput id="text-input-firstName" name="firstName" value={firstName} onChange={ev => setFirstName( ev.target.value )} />
                        </FormField>
                        <FormField name="lastName" label="Nom">
                            <TextInput id="text-input-firstName" name="lastName" value={lastName} onChange={ev => setLastName( ev.target.value )} />
                        </FormField>
                        <FormField name="email" label="Adresse mail">
                            <TextInput id="text-input-email" name="email" value={email} onChange={ev => setEmail( ev.target.value )} />
                        </FormField>
                        <FormField name="phone" label="Numéro de téléphone">
                            <TextInput id="text-input-phone" name="phone" value={phoneNumber} onChange={ev => setPhoneNumber( ev.target.value )} />
                        </FormField>
                        <FormField name="password" label="Mot de passe">
                            <TextInput id="text-input-password" name="password" value={password} onChange={ev => setPassword( ev.target.value )} type="password" />
                        </FormField>
                        <FormField name="confirmPassword" label="Confirmer le mot de passe">
                            <TextInput id="text-input-confirm-password" name="confirmPassword" value={confirmPassword} onChange={ev => setConfirmPassword( ev.target.value )} type="password" />
                        </FormField>
                        <Box direction="row" justify="center" gap="large">
                            <Button
                                type="submit"
                                primary
                                label="S'inscrire"
                                disabled={
                                    username === '' ||
                                    firstName === '' ||
                                    lastName === '' ||
                                    email === '' ||
                                    phoneNumber === '' ||
                                    confirmPassword === '' ||
                                    password === '' ||
                                    confirmPassword !== password
                                }
                            />
                            <Button type="reset" label="Reset" />
                        </Box>
                    </Form>
                </Box>}
        </Box > );
};
