import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    padding: 0 30px;
`;

export const Title = styled.Text`
    font-size: 24px;
    color: #f4ede8;
    font-family: 'RobotoSlab-Medium';
    margin: 64px 0 24px;
`;

export const Input = styled.Text`
    font-size: 24px;
    color: #f4ede8;
    font-family: 'RobotoSlab-Medium';
    margin: 64px 0 24px;
`;

export const BackToLogin = styled.TouchableOpacity`
    flex-direction: row;
    position: absolute;
    bottom: 0;
    right: 0;
    left: 0;
    border-top-width: 1px;
    border-color: #232129;
    padding: 24px 0 32px;
    justify-content: center;
`;

export const BackToLoginText = styled.Text`
    font-size: 16px;
    color: #F4EDE8;
    font-family: 'RobotoSlab-Regular';
    justify-content: space-evenly;
    margin-left: 16px;;
`;