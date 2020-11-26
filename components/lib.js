
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
  
  
export const Container = styled.View`
    flex: 1;
    background-color: #222;
    
    align-items: center;
    padding-top: ${getStatusBarHeight()+20}px;
`;

export const Header = styled.Text`
    font-size: 40px;
    font-weight: 500;
    color: #fff;
    margin-top: 20px;
    margin-bottom: 20px;
    text-align: center;
`;

export const Box = styled.TouchableOpacity`
    flex: 1;
    padding: 12px;
    border-radius: 10px;
    margin: 10px;
    min-width: 95%;
    min-height: 100px;
    align-items: center;
`;