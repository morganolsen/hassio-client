import config from './config.json';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Actions } from 'react-native-router-flux';
import { Alert } from 'react-native';

export async function setStorage(key, value){
    try{
        return await AsyncStorage.setItem(key, value);
    } catch(e) {
        return false;
    }
}

export async function getStorage(key){
    try{
        return await AsyncStorage.getItem(key);
    } catch(e){
        return false;
    }
}

async function api(path, method='GET', body=null){

    const apiKey = await getStorage("api_key");
    const options = {
        method,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
    }

    if(body){
        options.body = JSON.stringify(body);
    }
    //const url = config.api_base_url + path;
    const apiUrl = await getStorage("api_link");
    const url = apiUrl + "/api" + path;
    let failed = false;
    let response = "";
    try{
        response = await fetch(url, options);
    } catch(e){
        failed = true;
    }

    if(failed || response.status === 401 || !apiKey || !url){
        Alert.alert("Connection failed", "Please make sure your API url and key are correctly configured.", [
            { 
                text: "OK",
                onPress: () => {Actions.options}
            }
        ],
        {cancelable: false});
        return([]);
    }else{
        return response.json();
    }
}

export async function getLights(){
    const response = await api("/states");
    const lights = [];
    response.forEach(item => {
        if(item.entity_id.startsWith("light.")){
            lights.push(item);
        }
    });
    return lights;
}

export async function getScenes(){
    const response = await api("/states");
    const scenes = [];
    response.forEach(item => {
        if(item.entity_id.startsWith("scene.")){
            scenes.push(item);
        }
    });
    return scenes;
}

export async function applyScene(entityId){
    let path = "/services/scene/turn_on"
    const body = {entity_id: entityId};
    return await api(path, "POST", body);
}

export async function setState(entityId, state){
    const body = {
        state
    }
    return await api("/states/" + entityId, "POST", body);
}

export async function toggleLight(entityId, state="on"){
    let path = "/services/light/turn_"
    if(state === "on"){
        path += "on"
    }else{
        path += "off";
    }
    const body = {entity_id: entityId};
    return await api(path, "POST", body);
}

export async function setAttribute(entityid, attribute, value, domain="light"){
    const path=`/services/${domain}/turn_on`;
    const body = {
        entity_id: entityid
    }
    body[attribute] = value;
    return await api(path, "POST", body);
}