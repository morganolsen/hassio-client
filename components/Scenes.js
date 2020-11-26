import React, {useEffect, useState} from 'react';

import {ScrollView} from 'react-native';
import Container from './Container';
import {getScenes} from '../Data';
import SceneBox from './SceneBox';
import Navbar from './Navbar';
import styled from 'styled-components';

const TextContent = styled.Text`
    font-size: 40px;
    font-weight: 500;
    color: #fff;
    margin-top: 20px;
    margin-bottom: 20px;
    text-align: center;
`;

const Scenes = () => {

    const [scenes, setScenes] = useState([]);

    useEffect(() => {
        (async() => {
            const response = await getScenes();
            setScenes(response);
        })();
    }, []);

    let displayScenes = null;
    if(scenes){
        displayScenes = scenes.map(scene => <SceneBox key={scene.entity_id} entityid={scene.entity_id} state={scene.state} name={scene.attributes.friendly_name} />);
    }

    

    return (
        <Container>
            <TextContent>Scenes</TextContent>
            <ScrollView>
                {displayScenes}
            </ScrollView>
        </Container>
    );
};

export default Scenes;