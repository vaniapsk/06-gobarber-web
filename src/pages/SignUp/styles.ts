import styled from 'styled-components';

import { shade } from 'polished';

import signUpBackground from '../../assets/sign-up-background.png';

export const Container = styled.div`
  /* will make sure the height of container is 100% of visible screen */
  height: 100vh;

  display: flex; /*this maked the containers stay beside each other (login and background picture) */
  align-items: stretch; /*this maked the the items inside container (login and background picture) stretch till full page*/
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  place-content: center;

  width: 100%;
  max-width: 700px;
  align-items: center;

  form {
    margin: 80px;
    width: 340px;
    text-align: center;

    h1 {
      margin-bottom: 24px;
    }

    a {
      color: #f4ede8;
      display: block;
      margin-top: 24px;
      text-decoration: none;
      transition: color 0.2s;

      :hover {
        color: ${shade(0.2, '#f4ede8')};
      }
    }
  }

  /* apply any anchor that comes right inside content, not  anchor inside anchor  */
  > a {
    color: #f4ede8;
    display: block;
    margin-top: 24px;
    text-decoration: none;
    transition: color 0.2s;

    display: flex;
    align-items: center;

    svg {
      margin-right: 16px;
    }
    :hover {
      color: ${shade(0.2, '#f4ede8')};
    }
  }
`;

export const Background = styled.div`
  flex: 1; /* will make  image occupy all the space, minus 700px*/
  background: url(${signUpBackground}) no-repeat center;
  background-size: cover;
`;