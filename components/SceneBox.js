import React from 'react';
import styled from 'styled-components';
import {applyScene} from '../Data';

const Box = styled.TouchableOpacity`
    flex: 1;
    padding: 12px;
    border-radius: 10px;
    margin: 10px;
    min-width: 95%;
    min-height: 100px;
    align-items: center;
`;

const TextContent = styled.Text`
    font-size: 24px;
    font-weight: 500;
    color: #fff;
`;

const SceneBox = (props) => {

    let name = props.name;
    if(!name){
        name = props.entityid.replace("scene.");
    }
    async function toggle(){
        const entityId = props.entityid;
        await applyScene(entityId, "off");
    }

    let color = "#333";
    if(props.state === 'on'){
        color = "#9B870C";
    }
    return (
        <Box onPress={toggle} style={{backgroundColor:color}}>
            <TextContent>{name}</TextContent>
        </Box>
    );
};

export default SceneBox;