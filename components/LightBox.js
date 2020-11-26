import React, {useState, useEffect, useRef} from 'react';
import styled from 'styled-components';
import {toggleLight, setAttribute} from '../Data';
import Slider from 'react-native-slider';
import {Box} from './lib';


const TextContent = styled.Text`
    font-size: 24px;
    font-weight: 500;
    color: #fff;
`;

const Options = styled.View`
    flex: 1;
    margin-top: 20px;
    align-items: center;
    justify-content: center;
`;

const LightBox = (props) => {
    const [isOptionsOpen, setIsOptionsOpen] = useState(false); 
    const brightness = props.attributes.brightness;
    const [rgb, setRgb] = useState({r: 0, g: 0, b:0, useRgb: false});

    useEffect(() => {
        if(props.attributes.rgb_color){
            setRgb({
                r: props.attributes.rgb_color[0],
                g: props.attributes.rgb_color[1],
                b: props.attributes.rgb_color[2],
                useRgb: true,
            })
        }
    }, []);
    
    

    let colorTemp = 0;
    if(props.attributes.color_temp){
        colorTemp = props.attributes.color_temp;
    }

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

    async function alterBrightness(value){
        await setAttribute(props.entityid, "brightness", value);
    }

    async function alterColorTemp(value){
        await setAttribute(props.entityid, "color_temp", value);
    }

    async function alterRgbColor({r,g,b}){
        if(!r){
            r = rgb.r;
        }
        if(!g){
            g = rgb.g;
        }
        if(!b){
            b = rgb.b;
        }
        setRgb({r,g,b, useRgb: true});
        await setAttribute(props.entityid, "rgb_color", [r,g,b]);
    }

    function toggleOptions(){
        if(isOptionsOpen){
            setIsOptionsOpen(false);
        }else{
            setIsOptionsOpen(true);
            if(props.state === "off"){
                toggle();
            }
        }
        
    }

    function rgbToHex(r, g, b) {
        return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    }

    function hexToRgb(hex) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }

    let color = "#333";
    if(props.state === 'on'){
        if(rgb.useRgb){
            color = rgbToHex(rgb.r, rgb.g, rgb.b);
        }else{
            color = "#9B870C";
        }
    }

    return (
        <>
            <Box onPress={toggle} onLongPress={toggleOptions} style={{backgroundColor:color}}>
                <TextContent>{name}</TextContent>
                {isOptionsOpen ?
                    <Options>
                        <TextContent>Brightness</TextContent>
                        <Slider 
                            value={brightness}
                            onValueChange={value => alterBrightness(value)}
                            minimumValue={0}
                            maximumValue={254}
                            step={1}
                            style={{minWidth: "100%"}}
                        />
                        {props.attributes.color_temp ?
                            <>
                                <TextContent>Color Temperature</TextContent>
                                <Slider 
                                    value={colorTemp}
                                    onValueChange={value => alterColorTemp(value)}
                                    minimumValue={250}
                                    maximumValue={454}
                                    step={1}
                                    style={{minWidth: "100%"}} 
                                />
                            </>
                        : null}
                        {props.attributes.rgb_color ?
                            <>
                                <TextContent>RGB Color</TextContent>
                                <Slider 
                                    value={rgb.r}
                                    onValueChange={value => alterRgbColor({r:value})}
                                    minimumValue={0}
                                    maximumValue={255}
                                    step={1}
                                    style={{minWidth: "100%"}}
                                />
                                <Slider 
                                    value={rgb.g}
                                    onValueChange={value => alterRgbColor({g:value})}
                                    minimumValue={0}
                                    maximumValue={255}
                                    step={1}
                                    style={{minWidth: "100%"}}
                                />
                                <Slider 
                                    value={rgb.b}
                                    onValueChange={value => alterRgbColor({b:value})}
                                    minimumValue={0}
                                    maximumValue={255}
                                    step={1}
                                    style={{minWidth: "100%"}}
                                />
                            </>
                        : null}

                    </Options>
                : null }
            </Box>
            
        </>
    );
};

export default LightBox;