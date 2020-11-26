import React, {useEffect, useState} from 'react';

import {ScrollView} from 'react-native';
import Container from './Container';
import {getScenes} from '../Data';
import LightBox from './LightBox';



const Scenes = () => {

    const [scenes, setScenes] = useState([]);

    useEffect(() => {
        (async() => {
            const response = await getScenes();
            setLights(response);
        })();
    }, []);

    let displayScenes = null;
    if(lights){
        displayScenes = scenes.map(scene => <SceneBox key={scene.entity_id} entityid={scene.entity_id} state={scene.state} name={scene.attributes.friendly_name} />);
    }

    

    return (
        <Container>
            <ScrollView>
                {displayScenes}
            </ScrollView>
        </Container>
    );
};

export default Scenes;