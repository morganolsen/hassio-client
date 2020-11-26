import React, {useEffect, useState} from 'react';

import {ScrollView} from 'react-native';
import Container from './Container';
import {getLights} from '../Data';
import LightBox from './LightBox';
import styled from 'styled-components';
import Navbar from './Navbar';


const TextContent = styled.Text`
    font-size: 40px;
    font-weight: 500;
    color: #fff;
    margin-top: 20px;
    margin-bottom: 20px;
    text-align: center;
`;

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
            <Navbar />
            <ScrollView>
                <TextContent>Lights</TextContent>
                {displayLights}
            </ScrollView>
        </Container>
    );
};

export default Lights;