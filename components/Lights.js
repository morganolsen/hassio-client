import React, {useEffect, useState} from 'react';

import {ScrollView} from 'react-native';
import Container from './Container';
import {getLights} from '../Data';
import LightBox from './LightBox';
import {Header} from './lib';

const Lights = () => {

    const [lights, setLights] = useState([]);

    useEffect(() => {
        (async() => {
            const response = await getLights();
            setLights(response);
        })();
    }, []);

    async function refresh(){
        const lights = await getLights();
        setLights(lights);
    }

    let displayLights = null;
    if(lights){
        displayLights = lights.map(light => <LightBox key={light.entity_id} attributes={light.attributes} refresh={refresh} entityid={light.entity_id} state={light.state} name={light.attributes.friendly_name} />);
    }

    

    return (
        <Container>
            <Header>Lights</Header>
            <ScrollView>
                {displayLights}
            </ScrollView>
        </Container>
    );
};

export default Lights;