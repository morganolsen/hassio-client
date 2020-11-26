import config from './config.json';

async function api(path, method='GET', body=null){

    const options = {
        method,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${config.hassio_api_key}`
        },
    }

    if(body){
        options.body = JSON.stringify(body);
    }
    const url = config.api_base_url + path;
    const response = await fetch(url, options);
    if(!response){
        return Alert.alert("Connection failed", "We were unable to connect to your home assistant instance.", [
            { 
                text: "OK"
            }
        ],
        {cancelable: false});
    }
    return response.json();
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