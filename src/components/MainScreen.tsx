import { Box, Heading, Image, Text, Button, Menu } from 'grommet';
import { FormNext, PowerReset, FormUp } from 'grommet-icons';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Colors, Status, useResponsive } from '../globals';
import { sendLocation } from '../state/location';
import { changeStatus, currentUser } from '../state/user';


export default () => {
    const dispatch = useDispatch();
    const user = useSelector( currentUser );
    const [ longitude, setLongitude ] = useState( 0 );
    const [ latitude, setLatitude ] = useState( 0 );
    const [ timestamp, setTimestamp ] = useState( 0 );
    const [ status, setStatus ] = useState<Status>( user?.status! );
    const [ first, setFirst ] = useState( true );

    useEffect( () => getLocation(), [] );

    useEffect( () => {
        !first && dispatch( changeStatus( status ) );
        first && setFirst( false );
    }, [ status ] );

    const getLocation = () => {
        if ( navigator.geolocation ) {
            navigator.geolocation.getCurrentPosition( position => {
                setLatitude( position.coords.latitude );
                setLongitude( position.coords.longitude );
                setTimestamp( position.timestamp );
            } );
        }
    };

    const responsive = useResponsive();

    return (
        <Box animation={{ type: "slideLeft", duration: 300 }} pad="medium">
            <Box direction="row" gap="large" align="center" justify="between" >
                <Heading>Votre localisation</Heading>
                <Box
                    responsive={false}
                    hoverIndicator={true}
                    background="brand2"
                    round="full"
                    pad="xsmall"
                    onClick={() => getLocation()}>
                    <PowerReset />
                </Box>
            </Box>
            <Image fit="cover" src={`https://open.mapquestapi.com/staticmap/v5/map?key=Rj0TSGwLALfn3RNupD0RwZ2vV2S5gcds&size=600,400&zoom=14&center=${ latitude },${ longitude }&scalebar=false&locations=${ latitude },${ longitude }|marker-${ Colors.brand }`} />
            <Box direction={responsive === "small" ? 'column' : "row"} gap="large" align="center" margin={{ vertical: "large" }} justify="between" >
                <Box direction="row" align="center"
                    round="large" pad={{ left: 'medium', right: "small" }} responsive={false}
                    background={status === Status.SAFE ? 'status-ok' : status === Status.CONTACT ? 'status-warning' : 'status-critical'}>
                    <Text>Vous êtes : </Text>
                    <Menu label={setLabel( status )} dropAlign={{ right: "right", bottom: "top" }}
                        icon={<FormUp />}
                        items={[
                            { label: 'sain', onClick: () => setStatus( Status.SAFE ) },
                            { label: 'cas contacte', onClick: () => setStatus( Status.CONTACT ) },
                            { label: 'covidé', onClick: () => setStatus( Status.COVID ) },
                        ]} />
                </Box>
                <Button primary label="Enregistrer" icon={<FormNext />} size="large"
                    onClick={() => dispatch( sendLocation( {
                        altitude: 0,
                        date: timestamp,
                        idUser: user!.userId!,
                        latitude,
                        longitude,
                        status
                    } ) )} />
            </Box>
        </Box > );

};

const setLabel = ( type: Status ) => {
    switch ( type ) {
        case Status.CONTACT: return 'cas contacte';
        case Status.COVID: return 'covidé';
        case Status.SAFE: return 'sain';
    }
};


