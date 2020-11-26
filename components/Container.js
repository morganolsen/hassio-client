import React from 'react';
import { NativeModules, Platform } from 'react-native';
import styled from 'styled-components';
const { StatusBarManager } = NativeModules;


function getStatusBarHeight(){
    let height = 0;
    if(Platform.OS === 'ios'){
      StatusBarManager.getHeight((statusBarHeight)=>{
        height = statusBarHeight.height;
      });
    }else{
      height = StatusBarManager.HEIGHT;
    }
  
    if(!height){
      height = 20;
    }
  
    return height;
}
  
  
const Container = styled.View`
    flex: 1;
    background-color: #222;
    
    align-items: center;
    padding-top: ${getStatusBarHeight()+20}px;
`;

export default Container;