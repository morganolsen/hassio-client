import React from 'react';
import styled from 'styled-components';
import { Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';

import Container from './Container';


const Content = styled.View`
    display: flex;
    margin-top: 30px;
    align-items: center;
    padding: 10px;
    margin-bottom: 10px;
`;

const Box = styled.TouchableOpacity`
    flex: 1;
    background-color: #333;
    padding: 12px;
    border-radius: 10px;
    margin: 10px;
    min-width: 95%;
    align-items: center;
`;

const TextContent = styled.Text`
    font-size: 24px;
    font-weight: 500;
    color: #fff;
`;

const Home = () => {
    function goToLights(){
        Actions.lights();
        
    }

    return (
        <Container>
                <Content>
                    <TextContent>Please select a category.</TextContent>
                    <Box onPress={Actions.lights()}>
                        <TextContent>Lights</TextContent>
                    </Box>
                    <Box onPress={Actions.scenes()}>
                        <TextContent>Scenes</TextContent>
                    </Box>
                    <Box>
                        <TextContent>Hello!</TextContent>
                    </Box>
                    <Box>
                        <TextContent>Hello!</TextContent>
                    </Box>
                    <Box>
                        <TextContent>Hello!</TextContent>
                    </Box>
                    <Box>
                        <TextContent>Hello!</TextContent>
                    </Box>
                    <Box>
                        <TextContent>Hello!</TextContent>
                    </Box>
                    

                </Content>
        </Container>
    );
};

export default Home;