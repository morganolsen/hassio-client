import React from 'react';
import styled from 'styled-components';
import { Actions } from 'react-native-router-flux';

const Nav = styled.View`
    position: absolute;
    bottom: 0px;
    left: 0px;
    right: 0px;
    background-color: #000;
    display: flex;
    flex-direction: row;
    z-index: 2;
    min-height: 90px;
    border-top-width: 1px;
    border-color: #333;
    justify-content: center;
`;

const NavItem = styled.TouchableWithoutFeedback`
    flex: 1;
    border-right-width: 1px;
    border-color: #444;
    align-items: center;
    justify-content: center;
    padding: 10px;
    width: auto;
`;

const NavTextWrapper = styled.View`
    padding: 20px;
    border-color: #333;
    border-right-width: 1px;
`;

const LastNavTextWrapper = styled(NavTextWrapper)`
    border-right-width: 0px;
`;

const NavText = styled.Text`
    color: #fff;
    font-size: 20px;
    text-align: center;
    
`;

const Navbar = () => {
    return (
        <Nav>
            <NavItem onPress={Actions.lights}>
                <NavTextWrapper><NavText>Lights</NavText></NavTextWrapper>
            </NavItem>
            <NavItem onPress={Actions.scenes}>
                <NavTextWrapper><NavText>Scenes</NavText></NavTextWrapper>
            </NavItem>
            <NavItem onPress={Actions.options}>
                <LastNavTextWrapper><NavText>Options</NavText></LastNavTextWrapper>
            </NavItem>
        </Nav>
    );
};

export default Navbar;