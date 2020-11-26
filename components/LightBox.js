import React from 'react';
import styled from 'styled-components';
import {toggleLight} from '../Data';

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

const LightBox = (props) => {

    let name = props.name;
    if(!name){
        name = props.entityid.replace("light.");
    }
    async function toggle(){
        const entityId = props.entityid;
        const currentState = props.state;
        if(currentState === 'on'){
            await toggleLight(entityId, "off");
        }else{
            await toggleLight(entityId, "on");
        }
        props.refresh();
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

export default LightBox;