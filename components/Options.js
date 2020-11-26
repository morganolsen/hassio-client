import React, {useEffect, useState} from 'react';
import {getStorage, setStorage} from '../Data';
import {TextInput} from 'react-native';
import Container from './Container';
import Navbar from './Navbar';
import styled from 'styled-components';
import {Header} from './lib';

const TextContent = styled.Text`
    font-size: 24px;
    font-weight: 500;
    color: #fff;
`;

const Input = styled.TextInput`
    min-width: 95%;
    height: 40px;
    border-color: #333;
    background-color: #222;
    border-width: 1px;
    margin: 5px;
    color: #fff;
    padding: 5px;
`;

const Options = () => {

    const [apiLink, setApiLink] = useState("");
    const [apiKey, setApiKey] = useState("");

     useEffect(() => {
        (async() => {
            const apiLink = await getStorage("api_link");
            const apiKey = await getStorage("api_key");
            if(apiLink){  
                setApiLink(apiLink);
            }
            if(apiKey){
                setApiKey(apiKey);
            }
        })() 
        
     }, []);

     async function updateApiLink(link){
        setApiLink(link);
        await setStorage("api_link", link);
     }

     async function updateApiKey(key){
        setApiKey(key);
        await setStorage("api_key", key);
     }

    return (
        <Container>
            <Header>Options</Header>
            <TextContent>API URL</TextContent>
            <Input
                onChangeText={text => updateApiLink(text)}
                value={apiLink}
            />
            <TextContent>API Key</TextContent>
            <Input
                onChangeText={text => updateApiKey(text)}
                value={apiKey}
            />
        </Container>
    );
};

export default Options;