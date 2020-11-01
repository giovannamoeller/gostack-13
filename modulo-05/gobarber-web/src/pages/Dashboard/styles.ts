import styled from 'styled-components';

export const Container = styled.div`

`;

export const Header = styled.header`
    padding: 32px 0;
    background: #28262E;
`;

export const HeaderContent = styled.div`
    max-width: 1120px;
    margin: 0 auto;
    display: flex;
    align-items: center;

    > img { // primeira imagem apenas
        height: 80px;
    }

    button {
        margin-left: auto; // ocupar todo espaço possível
        background: transparent;
        border: 0;

        svg {
            color: #999591;
            height: 20px;
            width: 20px;
        }
    }
`;

export const Profile = styled.div`
    display: flex;
    align-items: center;
    margin-left: 80px;

    img {
        width: 56px;
        height: 56px;
        border-radius: 50%;
    }

    div {
        display: flex;
        flex-direction: column;
        margin-left: 16px;
        line-height: 24px;
        color: #F4EDE8;

        strong {
            color: #FF9000;
        }
    }
`;