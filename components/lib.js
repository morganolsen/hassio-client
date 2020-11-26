
import React from 'react';
import styled from 'styled-components';


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
  
  
export const Container = styled.View`
    flex: 1;
    background-color: #222;
    
    align-items: center;
    padding-top: ${getStatusBarHeight()+20}px;
`;